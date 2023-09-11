import 'microsoftGraph@1.0.0' as graph

@description('location of the resource group')
param location string = resourceGroup().location

resource managedIdentity 'Microsoft.ManagedIdentity/userAssignedIdentities@2023-01-31' = {
  name: 'ExampleManagedIdentity'
  location: location
}

resource group 'Microsoft.Graph/groups@beta' = {
  name: 'ExampleGroup'
  displayName: 'Example Group'
  mailEnabled: false
  mailNickname: 'exampleGroup'
  securityEnabled: true
  members: [
    managedIdentity.properties.principalId
  ]
}
