extension microsoftGraphV1

// TEMPLATE DESCRIPTION
/* Create a public client application and grant OAuth2.0 scopes to the application
   In thus case the permissions granted are for Microsoft Graph and ARM to enable the
   client app to deploy templates containing Microsoft Graph resources.
   
*/

@description('Supply today\'s date to deploy the template')
param date string

@description('Provide a friendly display name for the app')
param displayName string?

@description('Provide an array of Microsoft Graph scopes like "User.Read"')
param appScopes array = ['Group.ReadWrite.All','Application.ReadWrite.All']

var graphAppId = '00000003-0000-0000-c000-000000000000'
var armAppId = '797f4846-ba00-4fd7-ba43-dac1f8f63013'

// Get the Microsoft Graph service principal so that the scope names
// can be looked up and mapped to a permission ID
resource msGraphSP 'Microsoft.Graph/servicePrincipals@v1.0' existing = {
  appId: graphAppId
}

// Get the ARM service principal so that the scope names
// can be looked up and mapped to a permission ID
resource armSP 'Microsoft.Graph/servicePrincipals@v1.0' existing = {
  appId: armAppId
}

var graphScopes = msGraphSP.oauth2PermissionScopes
var filteredScopes = filter(graphScopes, scope => contains(appScopes, scope.value))

module appCreateGrantScopesModule './appGrantScopes.bicep' = {
  name: 'appScopeGrantDeploy'
  params: {
    filteredScopes: filteredScopes
    date: date
    displayName: displayName
    graphSpId: msGraphSP.id
    armSpId: armSP.id
  }
}

// outputs
output appName string = appCreateGrantScopesModule.outputs.appName
output appObjectID string = appCreateGrantScopesModule.outputs.appObjectID
output appID  string = appCreateGrantScopesModule.outputs.appID
output tenantId string = subscription().tenantId
output foundInputScopes array = appCreateGrantScopesModule.outputs.scopes
output grantedGraphScopes string = appCreateGrantScopesModule.outputs.grantedGraphScopes
output grantedArmScopes string = appCreateGrantScopesModule.outputs.grantedArmScopes
