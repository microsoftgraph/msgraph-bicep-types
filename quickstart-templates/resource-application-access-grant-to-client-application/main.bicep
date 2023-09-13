import 'microsoftGraph@1.0.0'

@description('Id of the application role to add to the resource app')
param appRoleId string

resource resourceApp 'Microsoft.Graph/applications@beta' existing = {
  name: 'ExampleResourceApp'
}

resource resourceSp 'Microsoft.Graph/servicePrincipals@beta' existing = {
  appId: resourceApp.appId
}

resource clientApp 'Microsoft.Graph/applications@beta' existing = {
  name: 'ExampleClientApp'
}

resource clientSp 'Microsoft.Graph/servicePrincipals@beta' existing = {
  appId: clientApp.appId
}

resource appRoleAssignment 'Microsoft.Graph/appRoleAssignedTo@beta' = {
  principalId: clientSp.id
  resourceId: resourceSp.id
  appRoleId: appRoleId
}
