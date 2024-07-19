# Configure federated identity credential for GitHub Actions

> **Note1**: Minimum Bicep version required to deploy this quickstart template is [v0.29.45](https://github.com/Azure/bicep/releases/tag/v0.29.45).

> **Note2**: This template sample **only** configures the Microsoft Entra ID portion (to enable workload identity federation). Additional configuration steps are also required on the GitHub side, to ensure that the federation works end-to-end. See [Use GitHub Actions to connect to Azure](https://learn.microsoft.com/azure/developer/github/connect-from-azure?tabs=azure-cli%2Cwindows#use-the-azure-login-action-with-openid-connect), but skip the sections on "Create a Microsoft Entra application and service principal" and "Add federated credentials", as the following Bicep template replaces those sections.

This template enables a GitHub Actions workflow to exchange a GitHub access token for a Microsoft Entra ID access token, so that the GitHub Actions workflow can access Azure resources. To enable this, the template creates an application (to represent the GitHub Action) and configures it with a federated identity credential. When the GitHub Actions workflow requests to exchange a GitHub access token for an access token, from the Microsoft identity platform, the values in the federated identity credential are checked against the provided GitHub token's `issuer` and `subject` claim values.

* `subject` identifies the GitHub organization, repo, branch, and environment for your GitHub Actions workflow. Refer to [example subject claims](https://docs.github.com/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect#example-subject-claims) which describes the `subject` value options for different scenarios.

For limitations on federated identity credentials, please refer to [Federated identity credentials considerations and limitations](https://learn.microsoft.com/entra/workload-id/workload-identity-federation-considerations).

You can deploy the template with the following Azure CLI command (replace `<resource-group>` with name of your resource group, and `<github-actions-fic-subject>` with the `subject` based on your scenario.):

```sh
az deployment group create --resource-group <resource-group> --template-file main.bicep --parameter githubActionsFicSubject='<github-actions-fic-subject>'
```

To deploy the same template using Az Powershell, use:

```powershell
New-AzResourceGroupDeployment -ResourceGroupName <resource-group> -TemplateFile .\main.bicep -githubActionsFicSubject '<github-actions-fic-subject>'
```