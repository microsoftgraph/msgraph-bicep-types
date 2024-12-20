extension microsoftGraphV1

// TEMPLATE DESCRIPTION
// Creates a secret-less client application, using a user-assigned managed identity
// as the credential (configured as part of the application's federated identity credential).
// The script optionally

@description('Specifies the name of cloud environment to run this deployment in.')
param cloudEnvironment string = environment().name

// NOTE: Microsoft Graph Bicep file deployment is only supported in Public Cloud
@description('Audience uris for public and national clouds')
param audiences object = {
  AzureCloud: {
    uri: 'api://AzureADTokenExchange'
  }
  AzureUSGovernment: {
    uri: 'api://AzureADTokenExchangeUSGov'
  }
  USNat: {
    uri: 'api://AzureADTokenExchangeUSNat'
  }
  USSec: {
    uri: 'api://AzureADTokenExchangeUSSec'
  }
  AzureChinaCloud: {
    uri: 'api://AzureADTokenExchangeChina'
  }
}

@description('Specifies the resource group location.')
param location string = resourceGroup().location

@description('Specifies the user-assigned managed identity name to use as an application credential via federated identity credentials')
param myWorkloadManagedIdentity string = 'myMSI-2024-12-18'

@description('Specified the application display name')
param applicationDisplayName string = 'myApp-2024-12-18'

@description('Specifies the applications unique name identifier')
param applicationName string = 'myApp-2024-12-18'

@description('Specifies the Microsoft Graph app roles to be granted to the created application. If set to empty array [], app roles will NOT be granted and no Azure Automation accounts will be created.')
param graphRoles array = ['Group.Read.All','Application.Read.All']

@description('Specifies an Azure Automation Account name for a runbook where a PS script can be run. Only created is graphRoles is not an empty array []')
param automationAccountName string = 'myAutomationAccount-2024-12-18'

// login endpoint and tenant ID and issuer
var loginEndpoint = environment().authentication.loginEndpoint
var tenantId = tenant().tenantId
var issuer = '${loginEndpoint}${tenantId}/v2.0'

// create a user assigned managed identity scoped to a resource group
resource myManagedIdentity 'Microsoft.ManagedIdentity/userAssignedIdentities@2023-01-31' = {
  name: myWorkloadManagedIdentity
  location: location
}

// Create a (client) application registration with a federated identity credential (FIC)
// The FIC is configured with the managed identity as the subject
// NOTE: app is configured with required properties only. Add the properties your app needs
resource myApp 'Microsoft.Graph/applications@v1.0' = {
  displayName: applicationDisplayName
  uniqueName: applicationName

  resource myMsiFic 'federatedIdentityCredentials@v1.0' = {
    name: '${myApp.uniqueName}/msiAsFic'
    description: 'Trust the workload\'s user-assigned MI as a credential for the app'
    audiences: [
       audiences[cloudEnvironment].uri
    ]
    issuer: issuer
    subject: myManagedIdentity.properties.principalId
  }
}

// Create a service principal for the application
resource mySP 'Microsoft.Graph/servicePrincipals@v1.0' = {
  appId: myApp.appId
}

// NOTE: This section (to grant Microsoft Graph permissions) requires an elevated role
// Grant the application only permission to Microsoft Graph
// First find the Microsoft Graph service principal
// Finally assign app roles to the app (if graphRoles is not an empty array)

// 1. find Graph based on well-known appId
resource msGraphSP 'Microsoft.Graph/servicePrincipals@v1.0' existing = {
  appId: '00000003-0000-0000-c000-000000000000'
}

// 2. Grant the client app access to Microsoft Graph using the Oauth2 scope
// which delegates the app to act as the sign-in user, constrained by the Oauth2 scope
// This step only happens if the oauth2GraphScope is specified.

// would use a for loop but that appears to be busted for some reason
var graphAppRoles = msGraphSP.appRoles

// Assign multiple app role assignments to MS Graph for the app/SP. 
// This gives the app/SP the necessary permissions to deploy this Bicep file (in app-only mode)
resource appRoleAssignments 'Microsoft.Graph/appRoleAssignedTo@v1.0' = [for (role, i) in graphRoles: {
  appRoleId: filter(graphAppRoles, graphAppRoles => graphAppRoles.value == role)[0].id 
  principalId: mySP.id // Client SP being granted permission to access the resource (API)
  resourceId: msGraphSP.id // Resource here is Microsoft Graph
  }
]

// Create an automation account and runbook to validate created application
// can call Microsoft Graph without using a secret
resource automationAccount 'Microsoft.Automation/automationAccounts@2023-11-01' = if(graphRoles != []) {
  name: automationAccountName
  identity: {
    type:'UserAssigned'
    userAssignedIdentities: {
      '${resourceGroup().id}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/${myWorkloadManagedIdentity}':{}
    }
  }
  location: location
  properties: {
    sku: {
      name: 'Basic'
    }
  }
  resource myRunbook 'runbooks@2023-11-01' = {
    name: 'msi-as-fic-test-runbook'
    location: location
    properties: {
      description: 'Runbook for msi-as-fic testing using Az PowerShell'
      runbookType: 'PowerShell72'
      logProgress: false
      logVerbose: false
    }
  }
}

// outputs
output clientAppId string = myApp.appId
output ficIssuerAudience string = audiences[cloudEnvironment].uri
output issuerURI string = issuer
output tenantId string = tenantId
output assignments array = [ for (role,i) in graphRoles: {
  appRoleIDName: appRoleAssignments[i].appRoleId
}]
output miPrincipalId string = myManagedIdentity.properties.principalId
output miClientId string = myManagedIdentity.properties.clientId
