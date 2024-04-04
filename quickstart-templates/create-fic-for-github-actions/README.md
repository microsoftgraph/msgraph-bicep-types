# Configure federated identity credential for GitHub Actions

> **Note**: This template sample **only** configures the Microsoft Entra ID portion (to enable workload identity federation). Additional configuration steps are also required on the GitHub side, to ensure that the federation works end-to-end. See [Use GitHub Actions to connect to Azure](https://learn.microsoft.com/azure/developer/github/connect-from-azure?tabs=azure-cli%2Cwindows#use-the-azure-login-action-with-openid-connect), but skip the sections on "Create a Microsoft Entra application and service principal" and "Add federated credentials", as the following Bicep template replaces those sections.

This template enables a GitHub Actions workflow to exchange a GitHub access token for a Microsoft Entra ID access token, so that the GitHub Actions workflow can access Azure resources. To enable this, the template creates an application (to represent the GitHub Action) and configures it with a federated identity credential. When the GitHub Actions workflow requests to exchange a GitHub access token for an access token, from the Microsoft identity platform, the values in the federated identity credential are checked against the provided GitHub token's claim values.

* `subject` identifies the GitHub organization, repo, branch, and environment for your GitHub Actions workflow. Refer to [GitHub Actions configuration](https://learn.microsoft.com/entra/workload-id/workload-identity-federation-create-trust?pivots=identity-wif-apps-methods-rest#github-actions) describes the `subject` value options for different scenarios.

For limitations on federated identity credentials, please refer to [Federated identity credentials considerations and limitations](https://learn.microsoft.com/entra/workload-id/workload-identity-federation-considerations).

You can deploy the template with the following Azure CLI command (replace `<resource-group>` with name of your resource group):

```sh
az deployment group create --resource-group <resource-group> --parameter main.bicepparam
```

To deploy the same template using Az Powershell, use:

```powershell
New-AzResourceGroupDeployment -ResourceGroupName bicep-deployments -TemplateFile .\main.bicep -TemplateParameterFile .\main.bicepparam
```