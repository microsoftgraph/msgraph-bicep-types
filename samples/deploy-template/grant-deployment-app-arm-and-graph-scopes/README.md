# Create an app with OAuth2.0 scopes to call Microsoft Graph and ARM APIs

This template sample automates the process of creating an application that can be used to deploy ARM templates including Microsoft Graph resources. The template also grants OAuth2.0 scopes that the application needs to deploy the resources declared in templates. 

## Details

- The sample creates a basic client application, creates a service principal from the application, and finally grants the desired Microsoft Graph OAuth2.0 scopes to the service principal (using the `Microsoft.Graph/oauth2PermissionGrants` bicep type) as well as the ARM API#s _user_impersonation_ scope (which enables both ARM deployment capability as well as being able to deploy any ARM resource as the signed-in user, as long as the signed-in user has the requisite role(s)).

The `appScopes` array parameter allows the deployer to select the Microsoft Graph Oauth2.0 scopes to grant to the client application. The sample validates the set of provided scopes in the array parameter against [Microsoft Graph delegated permission scopes][graph-permissions]. Any invalid scopes provided are ignored. `appScopes` should contain a list of scope names (for example *User.Read.All* and *Group.ReadWrite.All*).

The sample also enables the deployer to optionally set an owner of the client application, using the `userUPN` parameter.

### Prerequisites

- A valid **Azure subscription**: If you don't own an Azure subscription, [create a free account](https://azure.microsoft.com/free/) before you begin.
- An **Azure resource group** that you own under a valid Azure subscription, or [deploy without an Azure subscription][no-azure-sub].
- [Bicep tools for authoring and deployment](https://learn.microsoft.com/graph/templates/quickstart-install-bicep-tools). The minimum required Bicep version is [v0.36.1](https://github.com/Azure/bicep/releases/tag/v0.36.1).
- Have the requisite **Microsoft Entra roles** to deploy this template:

  - Permissions to create applications. [Users have this permission by default](https://learn.microsoft.com/entra/fundamentals/users-default-permissions#compare-member-and-guest-default-permissions). However, [admins can turn off this default](https://learn.microsoft.com/entra/fundamentals/users-default-permissions#restrict-member-users-default-permissions) in which case you need to be assigned at least the [Application Developer](https://learn.microsoft.com/entra/identity/role-based-access-control/permissions-reference#application-developer) role.
  - **Additionally**, you'll also need the privileges to grant Microsoft Graph permission scopes to the application. This requires the [Privileged Role Administrator][priv-role-admin]

### Deploy the Bicep template

#### Az CLI

```sh
az deployment group create --resource-group <resource-group> --template-file main.bicep --parameter date='2025-07-24' appScopes="['User.Read','Application.ReadWrite.All','Group.ReadWrite.All]"
```

#### Az Powershell

```powershell
New-AzResourceGroupDeployment -ResourceGroupName <resource-group> -TemplateFile .\main.bicep -date "2025-07-24" -appScopes @('User.Read','Application.Read.All','Group.ReadWrite.All)
```

[priv-role-admin]:https://learn.microsoft.com/entra/identity/role-based-access-control/permissions-reference#privileged-role-administrator
[graph-permissions]:https://learn.microsoft.com/graph/permissions-reference
[no-azure-sub]:https://learn.microsoft.com/graph/templates/how-to-deploy-without-azure-sub?view=graph-bicep-1.0&tabs=CLI
