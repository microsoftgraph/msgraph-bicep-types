extension microsoftGraphV1

@description('Id of the application role to add to the resource app')
param appRoleId string

resource resourceApp 'Microsoft.Graph/applications@v1.0' existing = {
  uniqueName: 'ExampleResourceApp'
}

resource resourceSp 'Microsoft.Graph/servicePrincipals@v1.0' existing = {
  appId: resourceApp.appId
}

resource clientApp 'Microsoft.Graph/applications@v1.0' existing = {
  uniqueName: 'ExampleClientApp'
}

resource clientSp 'Microsoft.Graph/servicePrincipals@v1.0' existing = {
  appId: clientApp.appId
}

resource appRoleAssignment 'Microsoft.Graph/appRoleAssignedTo@v1.0' = {
  principalId: clientSp.id
  resourceId: resourceSp.id
  appRoleId: appRoleId
}
