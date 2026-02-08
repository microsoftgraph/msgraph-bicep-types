extension microsoftGraphV1

@description('Application Id of the service principal')
param applicationId string

resource removeSPCreds 'Microsoft.Graph/servicePrincipals@v1.0' = {
  appId: applicationId
  keyCredentials: []
  passwordCredentials: []
}
