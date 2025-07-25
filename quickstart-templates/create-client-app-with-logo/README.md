# Create client app with a logo

This template creates a client Entra application with a PNG logo.

## Details

The client application is created with a logo. The logo is read from a PNG file in the same folder as the main.bicep file using the loadFileAsBase64() Bicep function.

### Prerequisites

- A valid **Azure subscription**: If you don't own an Azure subscription, [create a free account](https://azure.microsoft.com/free/) before you begin or [deploy without an Azure subscription][no-azure-sub].
  - An **Azure resource group** that you own under a valid Azure subscription.
- [Bicep tools for authoring and deployment](https://learn.microsoft.com/graph/templates/quickstart-install-bicep-tools). The minimum required Bicep version is [v0.36.1](https://github.com/Azure/bicep/releases/tag/v0.36.1).
- Have the requisite **Microsoft Entra roles** to deploy this template:
  - Permissions to create applications. [Users have this permission by default](https://learn.microsoft.com/entra/fundamentals/users-default-permissions#compare-member-and-guest-default-permissions). However, [admins can turn off this default](https://learn.microsoft.com/entra/fundamentals/users-default-permissions#restrict-member-users-default-permissions) in which case you need to be assigned at least the [Application Developer](https://learn.microsoft.com/entra/identity/role-based-access-control/permissions-reference#application-developer) role.

### Deploy the template

You can deploy the template with the following Azure CLI or PS command (replace `<date>` and the optional `<displayName>` with the necessary values for your deployment). The template loads a sample logo file which can also be replaced:

#### Az CLI

```sh
az deployment group create --resource-group <resource-group> --template-file main.bicep --parameters date='<date>' displayName='<displayName>'
```

#### Az PowerShell

```powershell
New-AzResourceGroupDeployment -ResourceGroupName <resource-group> -TemplateFile .\main.bicep -displayName="<date>" -displayName="<displayName>"
```

[no-azure-sub]:https://learn.microsoft.com/graph/templates/how-to-deploy-without-azure-sub?view=graph-bicep-1.0&tabs=CLI
