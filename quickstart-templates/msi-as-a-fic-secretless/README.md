# Configure a secret-less application to call Microsoft Graph

This template demonstrates how to create a secret-less client application, using a user-assigned managed identity
as the credential (configured as part of the application's federated identity credential).
It also creates other resources, that enable you to test using the application to call Microsoft Graph, all without
any application secret or certificate.

Testing involves using an Azure Automation account runbook, which uses PowerShell cmdlets to acquire an access token for the secret-less application, which is then used to call Microsoft Graph.

Further details on using a user-assigned managed identity as a federated identity credential to enable your apps
to go secret-less, including how it works and sample code to acquire access tokens using various client libraries can be found in the [public documentation][msi-as-fic].

## Details

This template sample deploys the following resources:

1. A user-assigned managed identity
2. An application registration with a federated identity credential (configured to use the user-assigned managed identity)
3. A service principal created from the application
4. \[Optional\] App role assignments to the service principal (to access Microsoft Graph) - requires additional permissions
5. \[Optional\] An Azure Automation Account and runbook to validate the newly created application can call Microsoft Graph without using a secret

### Prerequisites

* A valid **Azure subscription**: If you don't own an Azure subscription, [create a free account](https://azure.microsoft.com/free/) before you begin.
* An **Azure resource group** that you own under a valid Azure subscription.
[Bicep tools for authoring and deployment](https://learn.microsoft.com/graph/templates/quickstart-install-bicep-tools). The minimum required Bicep version is v0.30.3.
* Have the requisite **Microsoft Entra roles** to deploy this template:

  * Permissions to create applications. [Users have this permission by default](https://learn.microsoft.com/entra/fundamentals/users-default-permissions#compare-member-and-guest-default-permissions). However, [admins can turn off this default](https://learn.microsoft.com/entra/fundamentals/users-default-permissions#restrict-member-users-default-permissions) in which case you need to be assigned at least the [Application Developer](https://learn.microsoft.com/entra/identity/role-based-access-control/permissions-reference#application-developer) role.
  * \[Optional\] Permissions to grant Microsoft Graph app roles to the application. This requires the [Privileged Role Administrator][priv-role-admin]

### Deploy the Bicep template

#### Deploy all resources in the template and go on to end-to-end test

By default, the Bicep template will deploy the five resources listed earlier (managed identity, application, service principal, app role grants to Microsoft Graph, and an automation account and runbook), which will enable end-to-end testing. The default app roles granted to the application are Group.Read.All and Application.Read.All. This requires the signed-in user to have the elevated [Privileged Role Administrator][priv-role-admin] role.

##### Az CLI

```sh
az deployment group create --resource-group <resource-group> --template-file main.bicep
```

##### Az Powershell

```powershell
New-AzResourceGroupDeployment -ResourceGroupName <resource-group> -TemplateFile .\main.bicep
```

#### Deploy app and FIC resources only and forego end-to-end test

If you just want to create the managed identity, application and service principal - and **forego any end-to-end testing within the Azure Automation account**, then set the `graphRoles` parameter to an empty array - i.e. [] in CLI or @() in PowerShell.

##### Az CLI

```sh
az deployment group create --resource-group <YOUR-RESOURCE_GROUP> --template-file main.bicep --parameters graphRoles=[]
```

##### Az Powershell

```powershell
New-AzResourceGroupDeployment -ResourceGroupName <resource-group> -TemplateFile .\main.bicep -graphRoles @()
```

### Test calling Microsoft Graph with a secretless application

>**NOTE**: This testing **assumes** that you have deployed all resources described in the template, as the test relies on using Azure Automation.

Now that the template is deployed, the application can acquire a token for the managed identity and use that token as a credential assertion to acquire an access token to resources like Microsoft Graph. However, in order to acquire a token for the managed identity, the managed identity **must** be assigned in an Azure Cloud Service like a VM, App Services or in our case an Azure Automation account.

1. Sign in to the [Azure Automation Accounts page][auto-accounts] in the Azure Portal. You should see a new Automation Account that was created as part of
the Bicep template deployment.
2. Click on that account, and on the next page click on **Manage a runbook**.  This should take you to a page that contains the runbook deployed by the Bicep template. Click on the runbook.
3. On the runbook page, click on **Edit** and select **Edit in portal**. This brings up a page with an empty edit pane.
4. In this sample's GitHub folder find the **secretless-graph-request.ps1** PowerShell script and copy its contents into the empty edit pane in the portal.  Click Save. Click on **Test pane** to run and test the PowerShell script
5. The script acquires a token for the managed identity and then uses it (as a federated token) to sign in to Azure PS as the app. Finally, Azure PS, running as the app, is used to call Microsoft Graph to get the tenant's Entra groups.

If successful, you should see that the script, running as the app, successfully calls Microsoft Graph, responding with the collection of groups in the tenant.  And all without requiring the application to have a secret of a certificate.

[msi-as-fic]:https://learn.microsoft.com/entra/workload-id/workload-identity-federation-config-app-trust-managed-identity?tabs=microsoft-entra-admin-center
[priv-role-admin]:https://learn.microsoft.com/entra/identity/role-based-access-control/permissions-reference#privileged-role-administrator
[az-portal]:https://portal.azure.com
[auto-accounts]:https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.Automation%2FAutomationAccounts