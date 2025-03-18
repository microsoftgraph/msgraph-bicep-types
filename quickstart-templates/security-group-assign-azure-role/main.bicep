extension microsoftGraphV1

param location string = resourceGroup().location

// 3 client services per region
param clientServiceList array = ['service1', 'service2', 'service3']

param resourceName string = 'resourceServiceName'
var groupName = 'storageBlobReaders-${uniqueString(resourceName, location)}'
var storageName = 'graphbicepstorage${location}'

// create a managed identities for each service
resource managedIdentities 'Microsoft.ManagedIdentity/userAssignedIdentities@2023-01-31' = [
  for clientService in clientServiceList: {
    name: 'mi-${uniqueString(clientService, location)}'
    location: location
  }
]

// Storage resource that the client services need access to
resource storage 'Microsoft.Storage/storageAccounts@2023-05-01' existing = {
  name: storageName
}

// Create resource group and add MI as members
resource storageBlobReadersGroup 'Microsoft.Graph/groups@v1.0' = {
  displayName: groupName
  mailEnabled: false
  mailNickname: uniqueString(groupName)
  securityEnabled: true
  uniqueName: groupName
  members: {
    relationships: [for (mi, i) in clientServiceList: managedIdentities[i].properties.principalId]
  }
}

@description('Specify the storage blob reader role definition ID')
param storageBlobReaderRoleDefinitionId string = '2a2b9908-6ea1-4ae2-8e65-a410df84e7d1'

var roleAssignmentName = guid(resourceGroup().id, groupName, storageName)

// Assign the group as a storage blob reader role
resource storageBlobReadersRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: roleAssignmentName
  scope: storage
  properties: {
    principalId: storageBlobReadersGroup.id
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', storageBlobReaderRoleDefinitionId)
  }
}
