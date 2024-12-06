extension microsoftGraphV1

// TEMPLATE DESCRIPTION
// Creates a secret-less client application, using a user-assigned managed identity
// as the credential (configured as part of the application's federated identity credential).
// The script optionally

@description('Specifies the name of cloud environment to run this deployment in.')
@allowed(['publicCloud','usGov','china','usNat','usSec'])
param cloudEnvironment string

// NOTE: Microsoft Graph Bicep file deployment is only supported in Public Cloud
@description('Audience uris for public and national clouds')
param audiences object = {
  publicCloud: {
    uri: 'api://AzureADTokenExchange'
  }
  usGov: {
    uri: 'api://AzureADTokenExchangeUSGov'
  }
  usNat: {
    uri: 'api://AzureADTokenExchangeUSNat'
  }
  usSec: {
    uri: 'api://AzureADTokenExchangeUSSec'
  }
  china: {
    uri: 'api://AzureADTokenExchangeChina'
  }
}

@description('Specifies the resource group location.')
param location string = resourceGroup().location

@description('Specifies the user-assigned managed identity to use as an application credential via federated identity credentials')
param myWorkloadManagedIdentity string

@description('Specified the application display name')
param applicationDisplayName string

@description('Specifies the applications unique name identifier')
param applicationName string

@description('Specifies the Microsoft Graph delegated scopes to be granted to the created application. If not specified no delegated scopes will be granted.')
param oauth2GraphScopes string?

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
resource mySp 'Microsoft.Graph/servicePrincipals@v1.0' = {
  appId: myApp.appId
}

// NOTE: This section (to grant Microsoft Graph permissions) requires an elevated role
// Grant the application the User.Read permission to Microsoft Graph
// First find the Microsoft Graph service principal
// Finally assign delegated scopes to the app (if values supplied)

// 1. find Graph based on well-known appId
resource msGraphSP 'Microsoft.Graph/servicePrincipals@v1.0' existing = {
  appId: '00000003-0000-0000-c000-000000000000'
}

// 2. Grant the client app access to Microsoft Graph using the Oauth2 scope
// which delegates the app to act as the sign-in user, constrained by the Oauth2 scope
// This step only happens if the oauth2GraphScope is specified.
resource oauth2Grant 'Microsoft.Graph/oauth2PermissionGrants@v1.0' = if(oauth2GraphScopes != null) {
  clientId: mySp.id
  consentType: 'AllPrincipals' // granted for all users in the tenant
  resourceId: msGraphSP.id
  scope: oauth2GraphScopes
}

output clientAppId string = myApp.id
output clientSPId string = mySp.id
output grantedScopes string = ((oauth2GraphScopes != null) ? 'Scopes granted:${oauth2GraphScopes}' : 'Scopes not granted')
