extension microsoftGraphV1

// TEMPLATE DESCRIPTION
/* Set the required resource access on a client application definition.
   The target resource used is Microsoft Graph, and the deployer can select which
   Microsoft Graph OAuth2.0 scopes are configured on the client app. The template also
   assigns an owner to the application.
   
   NOTE: requiredResourceAccess configures which permissions the client application
   requires and this drives the user consent experience where permissions are granted. 
   requiredResourceAccess itself does NOT grant any permissions to the client application.
*/

param date string
param displayName string?
param filteredScopes array
param userUPN string?

var app = 'myApp'
var graphAppId = '00000003-0000-0000-c000-000000000000'

// fetch the user's ID based on their UPN
resource userOwner 'Microsoft.Graph/users@v1.0' existing = if (!empty(userUPN)) {
  userPrincipalName: userUPN!
}

// create an application with the requiredResourceAccess property
// creates a resourceAccess scope for each Microsoft Graph scope in filteredScopes 
resource myApp 'Microsoft.Graph/applications@v1.0' = {
  displayName: displayName == null ? '${app}-${date}' :'${displayName}-${app}-${date}'
  uniqueName: uniqueString(app, date)
  owners: {
    relationships: (!empty(userUPN)) ? [userOwner.id] : []
  }
  requiredResourceAccess: [
    {
      resourceAppId: graphAppId
      resourceAccess: [ for (scope, i) in filteredScopes: {
          id: filteredScopes[i].id
          type: 'Scope'
        }
      ]
    }
  ]
} 

// output information
output appName string = myApp.displayName 
output appObjectID  string = myApp.id
output appID  string = myApp.appId
output appOwners array = myApp.owners.relationships
output scopes array = [for (scopeItem,i) in filteredScopes: filteredScopes[i].value]
output clientAppResourceAccessList array = myApp.requiredResourceAccess[0].resourceAccess
