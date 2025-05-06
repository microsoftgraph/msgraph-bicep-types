# Remove key and certificate credentials on a service principal

> **Note**: Minimum Bicep version required to deploy this quickstart template is [v0.32.4](https://github.com/Azure/bicep/releases/tag/v0.32.4).

This template allows you to remove credentials on a service principal.

You can deploy the template with the following Azure CLI command (replace `<resource-group>` and `<app-id-of-service-principal>` with the necessary values for your deployment):

```sh
az deployment group create --resource-group <resource-group> --template-file main.bicep --parameters applicationId=<app-id-of-service-principal>
```
