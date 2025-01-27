# Configure an app with OAuth2.0 scopes to call Microsoft Graph

This template sample creates a client application and depending on the mode parameter, either:

1. Sets required resource access on the client application definition, or
2. Grants OAuth2.0 scopes to the client application.

In either case, the target resource used is Microsoft Graph, and the deployer can select which Microsoft Graph OAuth2.0 scopes are used.

## Details

This sample operates in two modes, depending on the `mode` parameter.

1. `set-required-scopes`:

   - The sample creates a basic client application configuring the `requiredResourceAccess` property with Microsoft Graph Oauth2.0 scopes
   - This option uses the appRequiredResourceAccess.bicep module.
   - **NOTE:** The `requiredResourceAccess` configures which permissions the client application requires and this drives the **user consent experience** where those permissions can be granted. `requiredResourceAccess` itself does **not** grant any permissions to the client application.

2. `grant-scopes`:

   - The sample creates a basic client application (and does not configure `requiredResourceAccess`), creates a service principal from the application, and finally grants the desired Microsoft Graph OAuth2.0 scopes to the service principal (using the `Microsoft.Graph/oauth2PermissionGrants` bicep type).
   - This option uses the appGrantScopes.bicep module.
   - **NOTE:** Setting `requiredResourceAccess` on a client application is **not** required to grant OAuth2.0 scopes to the client application.

The `appScopes` array parameter allows the deployer to select the Microsoft Graph Oauth2.0 scopes to set for or grant to the client application. The sample validates the set of provided scopes in the array parameter against [Microsoft Graph delegated permission scopes][graph-permissions]. Any invalid scopes provided are ignored. `appScores` should contain a list of scope names (for example *User.Read.All* and *Group.ReadWrite.All*).

### Prerequisites

- A valid **Azure subscription**: If you don't own an Azure subscription, [create a free account](https://azure.microsoft.com/free/) before you begin.
- An **Azure resource group** that you own under a valid Azure subscription, or [deploy without an Azure subscription][no-azure-sub].
- [Bicep tools for authoring and deployment](https://learn.microsoft.com/graph/templates/quickstart-install-bicep-tools). The minimum required Bicep version is v0.30.3.
- Have the requisite **Microsoft Entra roles** to deploy this template:

  - Permissions to create applications. [Users have this permission by default](https://learn.microsoft.com/entra/fundamentals/users-default-permissions#compare-member-and-guest-default-permissions). However, [admins can turn off this default](https://learn.microsoft.com/entra/fundamentals/users-default-permissions#restrict-member-users-default-permissions) in which case you need to be assigned at least the [Application Developer](https://learn.microsoft.com/entra/identity/role-based-access-control/permissions-reference#application-developer) role.
  - **Additionally**, if using the `grant-scopes` mode, you'll also need the privileges to grant Microsoft Graph app roles to the application. This requires the [Privileged Role Administrator][priv-role-admin]

### Deploy the Bicep template

By default, the Bicep template (main.bicep) will operate in the `set-required-scopes` mode.

#### Az CLI

```sh
az deployment group create --resource-group <resource-group> --template-file main.bicep --parameter date='2025-01-24' appScopes="['User.Read','Application.Read.All']"
```

#### Az Powershell

```powershell
New-AzResourceGroupDeployment -ResourceGroupName <resource-group> -TemplateFile .\main.bicep -date "2025-01-24" -appScopes @('User.Read','Application.Read.All')
```

[priv-role-admin]:https://learn.microsoft.com/entra/identity/role-based-access-control/permissions-reference#privileged-role-administrator
[graph-permissions]:https://learn.microsoft.com/graph/permissions-reference
[no-azure-sub]:https://learn.microsoft.com/graph/templates/how-to-deploy-without-azure-sub?view=graph-bicep-1.0&tabs=CLI
