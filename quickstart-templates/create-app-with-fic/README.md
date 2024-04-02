# Create app and configure federated identity credentials

This template creates an application for GitHub Actions and configure a federated identity credential. When the GitHub Actions workflow requests Microsoft identity platform to exchange a GitHub token for an access token, the values in the federated identity credential are checked against the provided GitHub token.

* `subject` identifies the GitHub organization, repo, and environment for your GitHub Actions workflow. Refer to [this document](https://learn.microsoft.com/entra/workload-id/workload-identity-federation-create-trust?pivots=identity-wif-apps-methods-rest#github-actions-1) for value in different scenarios.


You can deploy the template with the following Azure CLI command (replace `<resource-group>` with name of your resource group):

```sh
az deployment group create --resource-group <resource-group> --template-file main.bicep
```
