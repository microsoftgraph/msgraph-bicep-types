extension microsoftGraphV1

// TEMPLATE DESCRIPTION
/* Create a client application and depending on the mode parameter, either:
   1. Sets required resource access on the client application definition OR
   2. Grants OAuth2.0 scopes to the client application
   
   In either case, the target resource used is Microsoft Graph, and the deployer
   can select which Microsoft Graph OAuth2.0 scopes are used.

   This bicep file utilizes two modules (one for each mode).
*/

@description('Supply today\'s date to deploy the template')
param date string

@description('Provide a friendly display name for the app')
param displayName string?

@description('Provide an array of Microsoft Graph scopes like "User.Read"')
param appScopes array = ['profile','User.Read']

@description('Configure is setting required resource access or granting scopes')
@allowed(['set-required-scopes','grant-scopes'])
param mode string = 'set-required-scopes'

var graphAppId = '00000003-0000-0000-c000-000000000000'

// Get the Microsoft Graph service principal so that the scope names
// can be looked up and mapped to a permission ID
resource msGraphSP 'Microsoft.Graph/servicePrincipals@v1.0' existing = {
  appId: graphAppId
}

var graphScopes = msGraphSP.oauth2PermissionScopes
var filteredScopes = filter(graphScopes, scope => contains(appScopes, scope.value))


module appCreateRraModule './appRequiredResourceAccess.bicep' = if(mode == 'set-required-scopes'){
  name: 'appRraDeploy'
  params: {
    filteredScopes: filteredScopes
    date: date
    displayName: displayName
  }
}

module appCreateGrantScopesModule './appGrantScopes.bicep' = if (mode == 'grant-scopes') {
  name: 'appScopeGrantDeploy'
  params: {
    filteredScopes: filteredScopes
    date: date
    displayName: displayName
    graphSpId: msGraphSP.id
  }
}

// outputs
output appName string = ((mode == 'set-required-scopes') ? appCreateRraModule.outputs.appName : appCreateGrantScopesModule.outputs.appName)
output appObjectID string = ((mode == 'set-required-scopes') ? appCreateRraModule.outputs.appObjectID : appCreateGrantScopesModule.outputs.appObjectID)
output appID  string = ((mode == 'set-required-scopes') ? appCreateRraModule.outputs.appID : appCreateGrantScopesModule.outputs.appID)
output foundInputScopes array = ((mode == 'set-required-scopes') ? appCreateRraModule.outputs.scopes: appCreateGrantScopesModule.outputs.scopes)
output clientAppResourceAccessList array = ((mode == 'set-required-scopes') ? appCreateRraModule.outputs.clientAppResourceAccessList : ['Not set'])
output grantedScopes string = ((mode == 'grant-scopes') ? appCreateGrantScopesModule.outputs.grantedScopes : 'Not set')
