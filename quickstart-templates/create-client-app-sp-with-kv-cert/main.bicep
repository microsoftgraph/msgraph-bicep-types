extension microsoftGraphV1_0

@description('Specifies the name of environment to run this deployment in.')
param shortEnvironmentName string

@description('Specifies the name of the key vault.')
@maxLength(10)
param keyVaultNamePrefix string

@maxLength(24)
param keyVaultName string = '${keyVaultNamePrefix}-${uniqueString(shortEnvironmentName,resourceGroup().id)}'

@description('Specifies the resource group location.')
param location string = resourceGroup().location

@description('Specifies the name of the key vault tags.')
param tags object

@description('Specifies the permissions to keys in the vault. Valid values are described in https://learn.microsoft.com/azure/templates/microsoft.keyvault/vaults?pivots=deployment-language-bicep#permissions')
param keysPermissions array = [
  'list'
]

@description('Specifies the permissions to secrets in the vault. Valid values are described in https://learn.microsoft.com/azure/templates/microsoft.keyvault/vaults?pivots=deployment-language-bicep#permissions')
param secretsPermissions array = [
  'list'
  'get'
]

@description('Specifies the ID of the user-assigned managed identity.')
param identityName string

@description('Specifies the permissions to certificates in the vault. Valid values are described in https://learn.microsoft.com/azure/templates/microsoft.keyvault/vaults?pivots=deployment-language-bicep#permissions')
param certificatesPermissions array = [
  'get'
  'list'
  'update'
  'create'
]

@description('Specifies the short certificate prefix for the full certificate name')
param certificateName string

@description('Specifies the unique name for the client application')
param clientAppName string

@description('Specifies the certificate subject name')
param subjectName string

@description('Specifies the current time in utc to use in a deployment script')
param utcValue string = utcNow()

// Create MSI for managing KV and certificates
resource webIdentity 'Microsoft.ManagedIdentity/userAssignedIdentities@2023-01-31' = {
  name: identityName
  location: location
}

// Create KV and grant the webIdentity MSI access to the KV
resource keyVault 'Microsoft.KeyVault/vaults@2021-06-01-preview' = {
  name: keyVaultName
  location: location
  tags: tags
  properties: {
    tenantId: subscription().tenantId
    sku: {
      name: 'standard'
      family: 'A'
    }
    networkAcls: {
      defaultAction: 'Allow'
      bypass: 'AzureServices'
    }
    accessPolicies: [
      {
        objectId: webIdentity.properties.principalId
        tenantId: subscription().tenantId
        permissions: {
          keys: keysPermissions
          secrets: secretsPermissions
          certificates: certificatesPermissions
        }
      }
    ]

  }
}

// Deployment script run by the webIdentity MSI to create cert and get the public key and cert metadata
resource createAddCertificate 'Microsoft.Resources/deploymentScripts@2020-10-01' = {
  name: 'createAddCertificate'
  location: location
  identity: {
    type: 'UserAssigned'
    userAssignedIdentities: {
      '${webIdentity.id}': {}
    }
  }
  kind: 'AzurePowerShell'
  properties: {
    forceUpdateTag: utcValue
    azPowerShellVersion: '8.3'
    timeout: 'PT30M'
    arguments: ' -vaultName ${keyVault.name} -certificateName ${certificateName} -subjectName ${subjectName}'
    scriptContent: '''
      param(
        [string] [Parameter(Mandatory=$true)] $vaultName,
        [string] [Parameter(Mandatory=$true)] $certificateName,
        [string] [Parameter(Mandatory=$true)] $subjectName
      )
      $ErrorActionPreference = 'Stop'
      $DeploymentScriptOutputs = @{}
      $existingCert = Get-AzKeyVaultCertificate -VaultName $vaultName -Name $certificateName
      if ($existingCert -and $existingCert.Certificate.Subject -eq $subjectName) {
        Write-Host 'Certificate $certificateName in vault $vaultName is already present.'

        $certValue = (Get-AzKeyVaultSecret -VaultName $vaultName -Name $certificateName).SecretValue | ConvertFrom-SecureString -AsPlainText
        $pfxCert = New-Object System.Security.Cryptography.X509Certificates.X509Certificate2 -ArgumentList @([Convert]::FromBase64String($certValue),"",[System.Security.Cryptography.X509Certificates.X509KeyStorageFlags]::Exportable)
        $publicKey = [System.Convert]::ToBase64String($pfxCert.GetRawCertData())

        $DeploymentScriptOutputs['certStart'] = $existingCert.notBefore
        $DeploymentScriptOutputs['certEnd'] = $existingCert.expires
        $DeploymentScriptOutputs['certThumbprint'] = $existingCert.Thumbprint
        $DeploymentScriptOutputs['certKey'] = $publicKey
        $DeploymentScriptOutputs | Out-String
      }
      else {
        $policy = New-AzKeyVaultCertificatePolicy -SubjectName $subjectName -IssuerName Self -ValidityInMonths 12 -Verbose
        # private key is added as a secret that can be retrieved in the ARM template
        Add-AzKeyVaultCertificate -VaultName $vaultName -Name $certificateName -CertificatePolicy $policy -Verbose
        $newCert = Get-AzKeyVaultCertificate -VaultName $vaultName -Name $certificateName
        # it takes a few seconds for KeyVault to finish
        $tries = 0
        do {
          Write-Host 'Waiting for certificate creation completion...'
          Start-Sleep -Seconds 10
          $operation = Get-AzKeyVaultCertificateOperation -VaultName $vaultName -Name $certificateName
          $tries++
          if ($operation.Status -eq 'failed')
          {
            throw 'Creating certificate $certificateName in vault $vaultName failed with error $($operation.ErrorMessage)'
          }
          if ($tries -gt 120)
          {
            throw 'Timed out waiting for creation of certificate $certificateName in vault $vaultName'
          }
        } while ($operation.Status -ne 'completed')

        $certValue = (Get-AzKeyVaultSecret -VaultName $vaultName -Name $certificateName).SecretValue | ConvertFrom-SecureString -AsPlainText
        $pfxCert = New-Object System.Security.Cryptography.X509Certificates.X509Certificate2 -ArgumentList @([Convert]::FromBase64String($certValue),"",[System.Security.Cryptography.X509Certificates.X509KeyStorageFlags]::Exportable)
        $publicKey = [System.Convert]::ToBase64String($pfxCert.GetRawCertData())

        $DeploymentScriptOutputs['certStart'] = $newCert.notBefore
        $DeploymentScriptOutputs['certEnd'] = $newCert.expires
        $DeploymentScriptOutputs['certThumbprint'] = $newCert.Thumbprint
        $DeploymentScriptOutputs['certKey'] = $publicKey
        $DeploymentScriptOutputs| Out-String
      }
    '''
    cleanupPreference: 'OnSuccess'
    retentionInterval: 'P1D'
  }
}

// Create a client application, setting its credential to the X509 cert public key.
resource clientApp 'Microsoft.Graph/applications@v1.0' = {
  uniqueName: clientAppName
  displayName: 'Example Client Application'
  keyCredentials: [
    {
      displayName: 'Credential from KV'
      usage: 'Verify'
      type: 'AsymmetricX509Cert'
      key: createAddCertificate.properties.outputs.certKey
      startDateTime: createAddCertificate.properties.outputs.certStart
      endDateTime: createAddCertificate.properties.outputs.certEnd
    }
  ]
}

// Create a service principal for the client app
resource clientSp 'Microsoft.Graph/servicePrincipals@v1.0' = {
  appId: clientApp.appId
}

output clientAppId string = clientApp.appId
output clientSpId string = clientSp.id
output certThumbprint string = createAddCertificate.properties.outputs.certThumbprint
