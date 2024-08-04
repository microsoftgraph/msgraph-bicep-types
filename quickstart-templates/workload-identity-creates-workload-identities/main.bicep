targetScope = 'tenant'
extension microsoftGraph

resource azureRootManagementGroup 'Microsoft.Management/managementGroups@2023-04-01' existing = {
  scope: tenant()
  name: '<guid>'
}

@description('The owner of the organization that it assigned to a workload identity that is used by GitHub Actions to deploy further resources.')
var gitHubOwner = '<MyOrganization>'

@description('The GitHub repository that is assigned to a workload identity that is used by GitHub Actions to deploy further resources.')
var gitHubRepo = '<MyOrganizationRootProject>'

@description('Subject of the GitHub Actions workflow\'s federated identity credentials (FIC) that is checked before issuing an Entra ID access token to access Azure resources. GitHub Actions subject examples can be found in https://docs.github.com/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect#example-subject-claims.')
var gitHubActionsFederatedIdentitySubject = 'repo:${gitHubOwner}/${gitHubRepo}:ref:refs/heads/main'


var applicationIdentityRegistrationDisplayName = 'GitHub Actions Identity Application Deployer'
var applicationIdentityRegistrationName = 'root-appident-deployer'
var githubOIDCProvider = 'https://token.actions.githubusercontent.com'
var microsoftEntraAudience = 'api://AzureADTokenExchange'
resource identityGithubActionsApplication 'Microsoft.Graph/applications@v1.0' = {
uniqueName: applicationIdentityRegistrationName
displayName: applicationIdentityRegistrationDisplayName

resource githubFederatedIdentityCredential 'federatedIdentityCredentials@v1.0' = {
  name: '${identityGithubActionsApplication.uniqueName}/githubFederatedIdentityCredential'
  audiences: [microsoftEntraAudience]
  description: 'Identity for application to deploy the root identity infrastructure.'
  issuer: githubOIDCProvider
  subject: gitHubActionsFederatedIdentitySubject
  }
}

resource gitHubIdentityActionsServicePrincipal 'Microsoft.Graph/servicePrincipals@v1.0' = {
displayName: applicationIdentityRegistrationDisplayName
appId: identityGithubActionsApplication.appId
}

resource msGraphSP 'Microsoft.Graph/servicePrincipals@v1.0' existing = {
  appId: '00000003-0000-0000-c000-000000000000'
}

// search for appRole by app role permission friendly name
param appRoleName string = 'Application.ReadWrite.OwnedBy'
var graphAppRoles = msGraphSP.appRoles
var appRoleDetail = filter(graphAppRoles, graphAppRoles => graphAppRoles.value == appRoleName)

resource symbolicname 'Microsoft.Graph/appRoleAssignedTo@v1.0' = {
  appRoleId: appRoleDetail[0].id
  principalId: gitHubIdentityActionsServicePrincipal.id // Client SP being granted permission to access the resource (API)
  resourceId: msGraphSP.id // Resource here is Microsoft Graph
}
