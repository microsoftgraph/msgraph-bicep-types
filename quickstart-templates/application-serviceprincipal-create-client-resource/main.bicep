extension microsoftGraphV1

@description('ID of the application role to add to the resource app. Must be a GUID.')
param appRoleId string?

@secure()
@description('Value of the key credential.')
param certKey string?

resource resourceApp 'Microsoft.Graph/applications@v1.0' = {
  uniqueName: 'ExampleResourceApp'
  displayName: 'Example Resource Application'
  appRoles: (!empty(appRoleId)) ? [
    {
      id: appRoleId
      allowedMemberTypes: [ 'User', 'Application' ]
      description: 'Read access to resource app data'
      displayName: 'ResourceAppData.Read.All'
      value: 'ResourceAppData.Read.All'
      isEnabled: true
    }
  ] : []
}

resource resourceSp 'Microsoft.Graph/servicePrincipals@v1.0' = {
  appId: resourceApp.appId
}

resource clientApp 'Microsoft.Graph/applications@v1.0' = {
  uniqueName: 'ExampleClientApp'
  displayName: 'Example Client Application'
  keyCredentials: (!empty(certKey)) ? [
    {
      displayName: 'Example Client App Key Credential'
      usage: 'Verify'
      type: 'AsymmetricX509Cert'
      key: certKey
    }
  ] : []
}

resource clientSp 'Microsoft.Graph/servicePrincipals@v1.0' = {
  appId: clientApp.appId
}
