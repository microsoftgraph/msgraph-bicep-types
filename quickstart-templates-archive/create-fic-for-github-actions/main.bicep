extension microsoftGraphV1

@description('Subject of the GitHub Actions workflow\'s federated identity credentials (FIC) that is checked before issuing an Entra ID access token to access Azure resources. GitHub Actions subject examples can be found in https://docs.github.com/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect#example-subject-claims')
param githubActionsFicSubject string

@description('Role definition ID to be assigned')
param roleDefinitionId string = 'b24988ac-6180-42a0-ab88-20f7382dd24c' // Contributor

var githubOIDCProvider = 'https://token.actions.githubusercontent.com'
var microsoftEntraAudience = 'api://AzureADTokenExchange'

resource githubActionsApp 'Microsoft.Graph/applications@v1.0' = {
  uniqueName: 'githubActionsApp'
  displayName: 'Github Actions App'

  resource githubFic 'federatedIdentityCredentials' = {
    name: '${githubActionsApp.uniqueName}/githubFic'
    audiences: [microsoftEntraAudience]
    description: 'FIC for Github Actions to access Entra protected resources'
    issuer: githubOIDCProvider
    subject: githubActionsFicSubject
  }
}

resource githubActionsSp 'Microsoft.Graph/servicePrincipals@v1.0' = {
  appId: githubActionsApp.appId
}

// The service principal needs to be assigned the necessary role to access the resources
// In this example, it is assigned with the `Contributor` role to the resource group
// which will allow GitHub actions to access Azure resources in the resource group via Az PS/CLI
var roleAssignmentName = guid('githubActions', roleDefinitionId, resourceGroup().id)
resource roleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: roleAssignmentName
  properties: {
    principalId: githubActionsSp.id
    principalType: 'ServicePrincipal'
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', roleDefinitionId)
  }
}
