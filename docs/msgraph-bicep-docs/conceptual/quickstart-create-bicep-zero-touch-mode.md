---
title: "Deploy a Bicep file as a service principal"
description: "Deploy a Bicep file that contains Microsoft Graph resources using app-only authentication for zero-touch deployments."
ms.topic: quickstart
ms.date: 04/30/2024
ms.author: dkershaw
author: dkershaw10
 
# Customer intent: As a developer, I want deploy my Bicep template file using an app so that I can have zero-touch deployments.
---

# Quickstart: Deploy a Bicep file as a service principal

In this quickstart, you deploy a Bicep file that contains Microsoft Graph resources using app-only authentication, also known as non-interactive authentication. You can use this mechanism for zero-touch deployment integration into continuous integration and continuous delivery (CI/CD) pipelines.

To deploy using delegated or interactive authentication, see [Create a Bicep file with Microsoft Graph resources](./quickstart-create-bicep-interactive-mode.md).

[!INCLUDE [preview-alert](../includes/preview-alert.md)]

## Prerequisites

- For this quickstart, use the Bicep file created in [Create a Bicep file with Microsoft Graph resources](./quickstart-create-bicep-interactive-mode.md).
- You're an owner of an Azure subscription.
- You're an [Entra Privileged Role Admin](/entra/identity/role-based-access-control/permissions-reference#privileged-role-administrator), which enables you to assign Microsoft Graph app roles to a service principal.

## Create a service principal and assign an Azure role

Create the service principal that you use later to deploy the Bicep file. In this quickstart, the service principal is created with an application password, also known as a client secret. Also, assign the service principal the [Managed Identity Contributor role](/azure/role-based-access-control/built-in-roles/identity#managed-identity-contributor), scoped to a resource group:

> [!CAUTION]
> This quickstart is using an application password for simplicity and testing purposes only. Do not use in production environments.

# [Azure CLI](#tab/CLI)

```azurecli-interactive
az group create --name exampleRG --location eastus

az ad sp create-for-rbac --name myServicePrincipalName --role "Managed Identity Contributor" --scopes "/subscriptions/mySubscriptionId/resourceGroups/myResourceGroupName"
```

Output Console:

```output
{
  "appId": "myServicePrincipalId",
  "displayName": "myServicePrincipalName",
  "password": "myServicePrincipalPassword",
  "tenant": "myOrganizationTenantId"
}
```

The output includes the `password` key. **Make sure you copy this value** - it can't be retrieved.

# [Azure PowerShell](#tab/PowerShell)

```azurepowershell-interactive

$rg = New-AzResourceGroup -Name exammpleRG -Location "eastus"

$sp = New-AzADServicePrincipal -DisplayName myServicePrincipalName
$tenantID = (Get-AzContext).Tenant.Id

New-AzRoleAssignment -ApplicationId $sp.AppId -RoleDefinitionName 'Managed Identity Contributor' -Scope $rg.ResourceId
```

The variables created in the PowerShell are used to [sign in using this service principal](#sign-in-as-service-principal-to-deploy-the-bicep-file).

---

## Assign Microsoft Graph permissions to the service principal

Use [Microsoft Graph PowerShell](/powershell/microsoftgraph) to grant the *Group.ReadWrite.All* application-only permission to the service principal.

```powershell
Connect-MgGraph -Scopes "AppRoleAssignment.ReadWrite.All","Application.Read.All"

# Find the service principal created to run the deployment
$mySP = Get-MgServicePrincipalByAppId -AppId "myServicePrincipalId"

# Find the service principal for Microsoft Graph
$graphSP = Get-MgServicePrincipalByAppId -AppId "00000003-0000-0000-c000-000000000000"

# Assign Group.ReadWrite.All app-only permission (id = 62a82d76-70ea-41e2-9197-370581804d09)
New-MgServicePrincipalAppRoleAssignedTo -ResourceId $graphSP.Id -ServicePrincipalId $graphSP.Id -PrincipalId $mySP.Id -AppRoleId "62a82d76-70ea-41e2-9197-370581804d09" 
```

> [!TIP]
> Use the [Microsoft Graph permissions reference](/graph/permissions-reference) to look up the permission ID by
permission name (for example *User.Read.All*).

## Sign-in as service principal to deploy the Bicep file

Use either Azure CLI or Azure PowerShell to sign-in as the service principal created earlier.

# [CLI](#tab/CLI)

```azurecli-interactive

spID=$(az ad sp list --display-name myServicePrincipalName --query "[].{spID:appId}" --output tsv)
tenantID=$(az ad sp list --display-name myServicePrincipalName --query "[].{tenantID:appOwnerOrganizationId}" --output tsv)
echo "Using appId $spID in tenant $tenantID"

az login --service-principal --username $spID --password {paste your SP password here} --tenant $tenantID
```

# [PowerShell](#tab/PowerShell)

```azurepowershell-interactive
# Use the application ID as the username, and the secret as password
$credentials = Get-Credential -UserName $sp.AppId
Connect-AzAccount -ServicePrincipal -Credential $credentials -Tenant $tenantID
```

---

> [!IMPORTANT]
> If you want to avoid displaying your password on console and are using `az login` interactively, use the `read -s` command in `bash`.
>
> ```bash
> read -sp "Azure password: " AZ_PASS && echo && az login --service-principal -u <app-id> -p $AZ_PASS --tenant <tenant>
> ```

## Deploy the Bicep file

Now deploy the Bicep file using your resource group's scope.

# [CLI](#tab/CLI)

```azurecli-interactive
az deployment group create --resource-group exampleRG --template-file main.bicep
```

# [PowerShell](#tab/PowerShell)

```azurepowershell-interactive
New-AzResourceGroupDeployment -ResourceGroupName exampleRG -TemplateFile ./main.bicep
```

---

> [!NOTE]
> Due to replication delays, adding the managed service identity (MSI) as an owner of the Microsoft Entra group may cause the deployment to fail. Wait a little and then deploy the same Bicep file again.

## Clean-up

When the Azure resources are no longer needed, use the Azure CLI or Azure PowerShell module to delete the quickstart resource group.

> [!NOTE]
> Resource groups are an Azure concept and have no impact on Microsoft Graph resources. Microsoft Graph resources need to be cleaned up with an additional request to Microsoft Graph. For this you can use Azure CLI or Azure PowerShell, [Microsoft Graph CLI](/graph/cli/overview), or [Microsoft Graph PowerShell](/powershell/microsoftgraph/overview).

The following examples show commands to delete the Azure resource first then the Microsoft Graph resources using Azure CLI and Azure PowerShell.

# [CLI](#tab/CLI)

```azurecli
az group delete --name exampleRG

az rest --method delete --url https://microsoft.graph.com/v1.0/groups(uniqueName=%27myExampleGroup%27)

spID=$(az ad sp list --display-name myServicePrincipalName --query "[].{spID:id}" --output tsv)
az ad sp delete --id $spID
```

# [PowerShell](#tab/PowerShell)

```azurepowershell
Remove-AzResourceGroup -Name exampleRG

$uri = 'https://microsoft.graph.com/v1.0/groups(uniqueName=%27myExampleGroup%27)'
Invoke-RestMethod -Uri $Uri -Method Delete

Remove-AzADServicePrincipal -ApplicationId $sp.AppId
```

---

## Related content

- [Tutorial: Certificate-based authentication deployment](./tutorial-cert-based-auth-deployment.md)
