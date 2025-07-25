# Grant a client app access to a resource app

This template allows you to grant client app access to resource application by assigning the app role (defined in the resource app) to the client app.

## Details

The id for the app role must be passed in as a parameter. It needs to be the same as the app role id deployed in the [application-serviceprincipal-create-client-resource](../application-serviceprincipal-create-client-resource/) example.

### Prerequisites

- This template depends on a successful deployment of [application-serviceprincipal-create-client-resource](../application-serviceprincipal-create-client-resource/)
- A valid **Azure subscription**: If you don't own an Azure subscription, [create a free account](https://azure.microsoft.com/free/) before you begin.
- An **Azure resource group** that you own under a valid Azure subscription, or [deploy without an Azure subscription][no-azure-sub].
- [Bicep tools for authoring and deployment](https://learn.microsoft.com/graph/templates/quickstart-install-bicep-tools). The minimum required Bicep version is [v0.36.1](https://github.com/Azure/bicep/releases/tag/v0.36.1).
- Permissions to grant app roles. [Users have this permission by default](https://learn.microsoft.com/entra/fundamentals/users-default-permissions#compare-member-and-guest-default-permissions) as long as you created the client app. If not, you need to be assigned at least the [Application Administrator](https://learn.microsoft.com/entra/identity/role-based-access-control/permissions-reference#application-administrator) role.

### Deploy the Bicep template

You can deploy the template with the following commands (replace `<resource-group>`, `<app-role-id>` with the necessary values for your deployment):

#### Az CLI

```sh
az deployment group create --resource-group <resource-group> --template-file main.bicep --parameters appRoleId='<app-role-id>'
```

#### Az PowerShell

```powershell
New-AzResourceGroupDeployment -ResourceGroupName <resource-group> -TemplateFile .\main.bicep -appRoleId "<app-role-id>"
```
