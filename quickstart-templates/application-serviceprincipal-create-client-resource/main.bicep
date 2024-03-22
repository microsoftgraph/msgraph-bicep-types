provider microsoftGraph

@description('Id of the application role to add to the resource app')
param appRoleId string

@secure()
@description('Value of the key credential')
param certKey string

resource resourceApp 'Microsoft.Graph/applications@beta' = {
  uniqueName: 'ExampleResourceApp'
  displayName: 'Example Resource Application'
  appRoles: [
    {
      id: appRoleId
      allowedMemberTypes: [ 'User', 'Application' ]
      description: 'Read access to resource app data'
      displayName: 'ResourceAppData.Read.All'
      value: 'ResourceAppData.Read.All'
      isEnabled: true
    }
  ]
}

resource resourceSp 'Microsoft.Graph/servicePrincipals@beta' = {
  appId: resourceApp.appId
}

resource clientApp 'Microsoft.Graph/applications@beta' = {
  uniqueName: 'ExampleClientApp'
  displayName: 'Example Client Application'
  keyCredentials: [
    {
      displayName: 'Example Client App Key Credential'
      usage: 'Verify'
      type: 'AsymmetricX509Cert'
      key: certKey
    }
  ]
}

resource clientSp 'Microsoft.Graph/servicePrincipals@beta' = {
  appId: clientApp.appId
}
