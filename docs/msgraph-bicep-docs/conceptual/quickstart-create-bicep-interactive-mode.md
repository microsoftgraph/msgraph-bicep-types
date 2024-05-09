---
title: Create and deploy your first Bicep file with Microsoft Graph resources
description: Create a Bicep file using VS Code that declares Microsoft Graph resources and then deploy that Bicep file.
ms.topic: quickstart
ms.date: 04/29/2024
author: dkershaw10
ms.author: dkershaw

# Customer intent: As a developer, I can try something out quickly to see how to author and deploy Microsoft Graph Bicep types.
---
# Quickstart: Create and deploy your first Bicep file with Microsoft Graph resources

In this quickstart, you create a Bicep file that declares a Microsoft Entra security group and a managed service identity (MSI), representing a Microsoft Graph resource and an Azure resource respectively. You then add the MSI as an owner of the group. You also learn how the Bicep extension simplifies development by providing type safety, syntax validation, and autocompletion. Finally, you deploy the Bicep file using a signed-in user.

[!INCLUDE [preview-alert](../includes/preview-alert.md)]

## Prerequisites

- **Azure subscription**: If you don't have an Azure subscription, [create a free account](https://azure.microsoft.com/free/) before you begin.

- **Install Bicep tools**: To set up your environment for Bicep development, see [Install Bicep tools](/azure/azure-resource-manager/bicep/install).
  - This quickstart uses VS Code for authoring. So, install VS Code and the Bicep extension.
  - For deployment, you can install either Azure CLI or Azure PowerShell.
  - Alternatively for authoring, you can install Visual Studio and the Bicep extension, which offers the same authoring experience.

<!-- TBD the required least privileged Graph role -->

## Add a Microsoft Graph application group

Launch VS Code and create two new files, **main.bicep** and **bicepconfig.json** in the same folder. 

Next, to be able to declare Microsoft Graph resources in a Bicep file, you need to enable a Bicep preview feature, by configuring **bicepconfig.json**:

<!-- Until early/mid May, when the Bicep May release happens, you'll still need "microsoftGraphPreview": true -->

```json
{
    "experimentalFeaturesEnabled": {
        "extensibility": true
    }
}
```

In *main.bicep*, type `provider microsoftGraph`, to let the Bicep compiler know that you're including Microsoft Graph types. On the next line, define a resource by using the `resource` keyword. Type `resource exampleGroup`, and add a space.

```bicep
resource exampleGroup
```

When you add a space after the symbolic name, a list of resource types is displayed. Continue typing **group** until you can select **Microsoft.Graph/Groups** from the available options.

:::image type="content" source="./media/quickstart-create-bicep-interactive-mode/select-resource-type.png" alt-text="Screenshot of selecting Microsoft Graph groups for resource type.":::

> [!TIP]
> If you don't see the intellisense options in VS Code, make sure you've installed the Bicep extension as specified in [Prerequisites](#prerequisites). If you have installed the extension, give the Bicep language service some time to start after opening your Bicep file. A notification in the lower right corner indicates that the service is starting. When that notification disappears, the service is running.

After selecting **Microsoft.Graph/Groups**, you're presented with the available API versions - beta or v1.0. Always select v1.0 unless it's unavailable or the resource properties you need are only available in beta. For this quickstart, use v1.0.

:::image type="content" source="./media/quickstart-create-bicep-interactive-mode/select-api-version.png" alt-text="Screenshot of select API version for resource type.":::

After the single quote for the resource type, add **=** and a space. You're presented with options for adding properties to the resource. Select **required-properties**.

:::image type="content" source="./media/quickstart-create-bicep-interactive-mode/select-required-properties.png" alt-text="Screenshot of adding required properties.":::

This option adds all of the properties for the resource type that are required for deployment. After selecting this option, your group has the following properties:

```bicep
resource exampleGroup 'Microsoft.Graph/groups@v1.0' = {
  displayName: 
  mailEnabled: 
  mailNickname: 
  securityEnabled: 
  uniqueName: 
}
```

Provide values for those properties, setting **mailEnabled** to `false` and **securityEnabled** to `true`. **uniqueName** represents an immutable client-provided key for this group resource.

## Add a managed identity resource

VS Code with the Bicep extension simplifies development by providing predefined snippets, such as a snippet that creates a managed identity. In main.bicep, type **man**, and then select **res-managed-identity** from the list, and then press [TAB] or [ENTER].

:::image type="content" source="./media/quickstart-create-bicep-interactive-mode/add-snippet.png" alt-text="Screenshot of adding a resource snippet.":::

>**Note:** [Resource snippets](/azure/azure-resource-manager/bicep/quickstart-create-bicep-use-visual-studio-code#add-resource-snippet) for extensible resources, like Microsoft Graph resources, aren't currently supported.

Your Bicep file now contains the following code:

```bicep
resource managedIdentity 'Microsoft.ManagedIdentity/userAssignedIdentities@2018-11-30' = {
  name: 'name'
  location: location
}
```

You can fix the missing parameter definition error by adding a [parameter definition](/azure/azure-resource-manager/bicep/parameters) for `location`. Under the provider definition, add `param location string = resourceGroup().location`. For more information about the function used here, see [resourceGroup()](/azure/azure-resource-manager/bicep/bicep-functions-scope#resourcegroup). Change the name for the managed identity from `name` to `exampleManagedIdentity`.

## Make the managed identity an owner of the group resource

In the `exampleGroup` resource, create a new line under `uniqueName`, type **ow**, which shows **owners** as the only matching property option, and then press [TAB] or [ENTER].

:::image type="content" source="./media/quickstart-create-bicep-interactive-mode/add-owners.png" alt-text="Screenshot of adding an owners property.":::

The **owners** property is an array, so add `[]` and now reference the managed identity's principal ID using intellisense, by typing **m** and picking **managedIdentity** (the symbolic name for the managed identity), typing a **.** and picking **properties**, typing another **.** and picking **principalId**.

:::image type="content" source="./media/quickstart-create-bicep-interactive-mode/reference-managed-identity.png" alt-text="Screenshot of referencing the managed identity.":::

Your *main.bicep* file should now look something like:

```bicep
provider microsoftGraph

param location string = resourceGroup().location

resource exampleGroup 'Microsoft.Graph/groups@v1.0' = {
  displayName: 'My example group'
  mailEnabled: false
  mailNickname: 'my-example-group'
  securityEnabled: true
  uniqueName: 'myExampleGroup'
  owners: [managedIdentity.properties.principalId]
}

resource managedIdentity 'Microsoft.ManagedIdentity/userAssignedIdentities@2018-11-30' = {
  name: 'exampleManagedIdentity'
  location: location
}
```

## Deploy the Bicep file using a signed-in user

Deploy the Bicep file by signing in to Azure CLI or Azure PowerShell using the following examples. 

# [Azure CLI](#tab/CLI)

```azurecli-interactive
az group create --name exampleRG --location eastus

az deployment group create --resource-group exampleRG --template-file main.bicep
```

# [Azure PowerShell](#tab/PowerShell)

```azurepowershell-interactive
New-AzResourceGroup -Name exampleRG -Location eastus

New-AzResourceGroupDeployment -ResourceGroupName exampleRG -TemplateFile ./main.bicep
```

---

When the deployment finishes, you should see a message indicating the deployment succeeded.

> [!NOTE]
> Due to replication delays, adding the managed service identity (MSI) as an owner of the Microsoft Entra group may cause the deployment to fail. Wait a little and then deploy the same Bicep file again.

## Clean up resources

When the Azure resources are no longer needed, use the Azure CLI or Azure PowerShell module to delete the quickstart resource group.

> [!NOTE]
> Resource groups are an Azure concept and have no impact on Microsoft Graph resources. Microsoft Graph resources need to be cleaned up with an additional request to Microsoft Graph. For this you can use Azure CLI or Azure PowerShell, [Microsoft Graph CLI](/graph/cli/overview), or [Microsoft Graph PowerShell](/powershell/microsoftgraph/overview).

The following examples show commands to delete the Azure resource first then the Microsoft Graph resource using Azure CLI and Azure PowerShell.

# [Azure CLI](#tab/CLI)

```azurecli
az group delete --name exampleRG

az rest --method delete --url https://microsoft.graph.com/v1.0/groups(uniqueName=%27myExampleGroup%27)
```

# [Azure PowerShell](#tab/PowerShell)

```azurepowershell
Remove-AzResourceGroup -Name exampleRG

$uri = 'https://microsoft.graph.com/v1.0/groups(uniqueName=%27myExampleGroup%27)'
Invoke-RestMethod -Uri $Uri -Method Delete
```

---

## Next step

> [!div class="nextstepaction"]
> [Deploy the Bicep file from this article using app-only deployment](./quickstart-create-bicep-zero-touch-mode.md)
