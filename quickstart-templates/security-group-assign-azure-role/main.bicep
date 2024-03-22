provider microsoftGraph

@description('Specifies the Reader role definition ID used in the role assignment.')
param readerRoleDefinitionID string = 'acdd72a7-3385-48ef-bd42-f606fba81ae7'

resource group 'Microsoft.Graph/groups@beta' existing = {
  uniqueName: 'ExampleGroup'
}

var roleAssignmentName = guid('ExampleGroup', readerRoleDefinitionID, resourceGroup().id)
resource roleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: roleAssignmentName
  properties: {
    principalId: group.id
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', readerRoleDefinitionID)
  }
}
