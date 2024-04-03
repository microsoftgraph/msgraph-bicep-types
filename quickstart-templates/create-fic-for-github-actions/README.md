# Configure federated identity credential for GitHub Actions

> **Note**: For E2E, this part **only** configures the Microsoft Entra ID portion. Additional configuration steps are required on the GitHub side - see [Create GitHub secrets](https://learn.microsoft.com/azure/developer/github/connect-from-azure?tabs=azure-cli%2Cwindows#create-github-secrets).

This template enables a GitHub Actions workflow to exchange a GitHub access token for a Microsoft Entra ID access token, so that the GitHub Actions workflow can Azure resources. To enable this, the template creates an application (to represent the GitHub Action) and configures it with a federated identity credential. When the GitHub Actions workflow requests to exchange a GitHub access token for an access token, from the Microsoft identity platform, the values in the federated identity credential are checked against the provided GitHub token's claim values.

* `subject` identifies the GitHub organization, repo, and environment for your GitHub Actions workflow. Refer to [GitHub Actions configuration](https://learn.microsoft.com/entra/workload-id/workload-identity-federation-create-trust?pivots=identity-wif-apps-methods-rest#github-actions) describes the `subject` value options for different scenarios.


You can deploy the template with the following Azure CLI command (replace `<resource-group>` with name of your resource group):

```sh
az deployment group create --resource-group <resource-group> --parameter main.bicepparam
```

To deploy the same template using Az Powershell, use:

```powershell
New-AzResourceGroupDeployment -ResourceGroupName bicep-deployments -TemplateFile .\main.bicep -TemplateParameterFile .\main.bicepparam
```