extension microsoftGraphV1

// TEMPLATE DESCRIPTION
/* Grant OAuth2.0 scopes to a client application definition,
   where the target resource used is Microsoft Graph, and the deployer can select which
   Microsoft Graph OAuth2.0 scopes are granted on the client app.
   
   NOTE: Setting requiredResourceAccess on a client application is NOT required
   to grant OAuth2.0 permissions to the client application.
*/

param date string
param displayName string?
param filteredScopes array
param graphSpId string

var app = 'myApp'

// convert scopes array into space separate scopes string
var scopeArray = [for (scopeItem,i) in filteredScopes: filteredScopes[i].value]
var scopeString = join(scopeArray, ' ')

// create basic app
resource myApp 'Microsoft.Graph/applications@v1.0' = {
  displayName: displayName == null ? '${app}-${date}' :'${displayName}-${app}-${date}'
  uniqueName: uniqueString(app, date)
}

// Create service principal for the basic app
resource mySP 'Microsoft.Graph/servicePrincipals@v1.0' = {
  appId: myApp.appId
}

// Grant the OAuth2.0 scopes (requested in parameters) to the basic app,
// for all users in the tenant
resource graphScopesAssignment 'Microsoft.Graph/oauth2PermissionGrants@v1.0' =  {
    clientId: mySP.id
    resourceId: graphSpId
    consentType: 'AllPrincipals'
    scope: scopeString
}

// output information
output appName string = myApp.displayName 
output appObjectID  string = myApp.id
output appID  string = myApp.appId
output scopes array = scopeArray
output grantedScopes string = graphScopesAssignment.scope
