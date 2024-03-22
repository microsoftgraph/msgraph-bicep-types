provider microsoftGraph

@description('location of the resource group')
param location string = resourceGroup().location

resource resourceApp 'Microsoft.Graph/applications@beta' existing = {
  uniqueName: 'ExampleResourceApp'
}

resource resourceSp 'Microsoft.Graph/servicePrincipals@beta' existing = {
  appId: resourceApp.appId
}

resource managedIdentity 'Microsoft.ManagedIdentity/userAssignedIdentities@2023-01-31' = {
  name: 'ExampleManagedIdentity'
  location: location
}

resource group 'Microsoft.Graph/groups@beta' = {
  uniqueName: 'ExampleGroup'
  displayName: 'Example Group'
  mailEnabled: false
  mailNickname: 'exampleGroup'
  securityEnabled: true
  owners: [
    resourceSp.id
  ]
  members: [
    managedIdentity.properties.principalId
  ]
}

