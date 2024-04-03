provider microsoftGraph

@description('Name of the Github repository')
param githubRepoName string

@description('Environment of the Github action')
param githubActionsEnvironment string

@description('Role definition ID to be assigned')
param roleDefinitionId string

var githubOIDCProvider = 'https://token.actions.githubusercontent.com'
var microsoftEntraAudience = 'api://AzureADTokenExchange'

resource githubActionsApp 'Microsoft.Graph/applications@v1.0' = {
  uniqueName: 'githubActionsApp'
  displayName: 'Github Actions App'

  resource githubFic 'federatedIdentityCredentials@beta' = {
    name: '${githubActionsApp.uniqueName}/githubFic'
    audiences: [microsoftEntraAudience]
    description: 'FIC for Github Actions to access Entra protected resources'
    issuer: githubOIDCProvider
    subject: 'repo:${githubRepoName}:environment:${githubActionsEnvironment}'
  }
}

resource githubActionsSp 'Microsoft.Graph/servicePrincipals@v1.0' = {
  appId: githubActionsApp.appId
}

// The service principal needs to be assigned the necesary role to access the resources
// In this example, it is assigned with the `Contributor` role to the resource group
var roleAssignmentName = guid('githubActions', roleDefinitionId, resourceGroup().id)
resource roleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: roleAssignmentName
  properties: {
    principalId: githubActionsSp.id
    principalType: 'ServicePrincipal'
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', roleDefinitionId)
  }
}
