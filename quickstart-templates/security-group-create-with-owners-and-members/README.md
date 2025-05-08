# Create a group with members and owners

This template allows you to create a security group with members and owners.

## Details

Both `members` and `owners` take a [MicrosoftGraphRelationship](../../generated/microsoftgraph/microsoft.graph/v1.0/0.2.0-preview/types.md#microsoftgraphrelationship) type.

- The resource service principal created in [application-serviceprincipal-create-client-resource](../application-serviceprincipal-create-client-resource/) is added to the owners
- A managed identity is created and added to the members

> NOTE: Due to replication delays, deploying the template may fail when trying to add the newly created managed identity as a member.  Simply wait a few minutes and try running the deployment again.

### Prerequisites

- This template depends on a successful deployment of [application-serviceprincipal-create-client-resource](../application-serviceprincipal-create-client-resource/)
- A valid **Azure subscription**: If you don't own an Azure subscription, [create a free account](https://azure.microsoft.com/free/) before you begin.
- An **Azure resource group** that you own under the valid Azure subscription.
- [Bicep tools for authoring and deployment](https://learn.microsoft.com/graph/templates/quickstart-install-bicep-tools). The minimum required Bicep version is [v0.32.4](https://github.com/Azure/bicep/releases/tag/v0.32.4).
- Have the requisite **Microsoft Entra roles** to deploy this template:
  - A **Microsoft Entra role** that assigns you permissions to create security groups. [Users have this permission by default](https://learn.microsoft.com/entra/fundamentals/users-default-permissions#compare-member-and-guest-default-permissions). However, [admins can turn off this default](https://learn.microsoft.com/entra/fundamentals/users-default-permissions#restrict-member-users-default-permissions) in which case you need to be assigned at least the [Groups Administrator](https://learn.microsoft.com/entra/identity/role-based-access-control/permissions-reference#groups-administrator) role.

### Deploy the template

#### Az CLI

```sh
az deployment group create --resource-group <resource-group> --template-file main.bicep
```

#### Az PowerShell

```powershell
New-AzResourceGroupDeployment -ResourceGroupName <resource-group> -TemplateFile .\main.bicep
```
