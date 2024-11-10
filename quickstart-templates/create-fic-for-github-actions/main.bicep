extension microsoftGraphV1

@description('The owner of the Github orgniazation that is assigned to a workload identity')
param gitHubOwner string = ''

@description('The GitHub repository that is assigned to a workload identity')
param gitHubRepo string = ''

@description('Contributor role definition ID')
param contributorRoleDefinitionId string = 'b24988ac-6180-42a0-ab88-20f7382dd24c'

@description('Subject of the Github Action workflow\'s federated identity credentials')
var gitHubActionsFederatedIDentitySubject = 'repo:${gitHubOwner}/${gitHubRepo}:ref:refs/heads/main'

var applicationDisplayName = 'GitHub Actions App'
var applicationName = 'githubActionsApp'
var githubOIDCProvider = 'https://token.actions.githubusercontent.com'
var microsoftEntraAudience = 'api://AzureADTokenExchange'

resource identityGithubActionsApplications 'Microsoft.Graph/applications@v1.0' = {
  displayName: applicationDisplayName
  uniqueName: applicationName

  resource githubFederatedIdentityCredential 'federatedIdentityCredentials@v1.0' = {
    name: '${identityGithubActionsApplications.uniqueName}/githubFederatedIdentityCredential'
    audiences: [
      microsoftEntraAudience
    ]
    issuer: githubOIDCProvider
    subject: gitHubActionsFederatedIDentitySubject
  }
}

resource githubActionsSp 'Microsoft.Graph/servicePrincipals@v1.0' = {
  appId: identityGithubActionsApplications.appId
}

var roleAssignmentName = guid(resourceGroup().id, 'githubactions', contributorRoleDefinitionId)

// Assign the GitHub action service principal the Azure contributor role scoped to a resource group
resource contributorRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: roleAssignmentName
  scope: resourceGroup()
  properties: {
    principalId: githubActionsSp.id
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', contributorRoleDefinitionId)
  }
}

output githubActionsSpId string = identityGithubActionsApplications.appId
