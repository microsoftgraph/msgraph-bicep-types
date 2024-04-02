provider microsoftGraph

resource githubActionsApp 'Microsoft.Graph/applications@v1.0' = {
  uniqueName: 'githubActionsApp'
  displayName: 'Github Actions App'

  resource githubFic 'federatedIdentityCredentials@beta' = {
    name: '${githubActionsApp.uniqueName}/githubFic'
    audiences: ['api://AzureADTokenExchange']
    description: 'FIC for Github Actions to access Entra protected resources'
    issuer: 'https://token.actions.githubusercontent.com'
    subject: 'repo:octo-org/octo-repo:environment:Production'
  }
}
