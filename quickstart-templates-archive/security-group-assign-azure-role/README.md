# Assign an Azure role to a security group

> **Note1**: Minimum Bicep version required to deploy this quickstart template is [v0.30.3](https://github.com/Azure/bicep/releases/tag/v0.30.3).

> **Note2**: This template depends on a successful deployment of [security-group-create-with-owners-and-members](../security-group-create-with-owners-and-members)

This template allows you to assign an Azure Reader role to an existing security group.

* The Reader role definition ID is set as parameter in the template. You can find other Azure built-in roles [here](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles)

You can deploy the template with the following Azure CLI command (replace `<resource-group>` with the name of your resource group):

```sh
az deployment group create --resource-group <resource-group> --template-file main.bicep
```
