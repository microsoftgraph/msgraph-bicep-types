# Create a group with members and owners

> **NOTE**:
>
> - Minimum Bicep version required to deploy this quickstart template is [v0.30.3](https://github.com/Azure/bicep/releases/tag/v0.30.3).
> - This template depends on a successful deployment of [application-serviceprincipal-create-client-resource](../application-serviceprincipal-create-client-resource/)

This template allows you to create a security group with members and owners. Both `members` and `owners` take a [MicrosoftGraphRelationship](../../generated/microsoftgraph/microsoft.graph/v1.0/0.1.10-preview/types.md#microsoftgraphrelationship) type.

- The resource service principal created in [application-serviceprincipal-create-client-resource](../application-serviceprincipal-create-client-resource/) is added to the owners
- A managed identity is created and added to the members

You can deploy the template with the following Azure CLI command (replace `<resource-group>` with the name of your resource group):

```sh
az deployment group create --resource-group <resource-group> --template-file main.bicep
```
