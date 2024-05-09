---
title: "Reference existing resources"
description: "Reference existing Microsoft Graph resources."
author: dkershaw10
ms.author: dkershaw
ms.service: microsoft-graph-bicep
ms.topic: how-to
ms.date: 05/08/2024

# customer intent: As a developer, I want to reference existing or pre-created resources so that I can manage them through Bicep.

---

# Reference existing resources

Bicep allows you to reference an existing resource by its unique name, using the [**existing**](/azure/azure-resource-manager/bicep/existing-resource) keyword. Microsoft Graph resources (like applications or groups) that were originally created **outside** of a Bicep file deployment are unlikely to have their unique name property set. This article describes how to backfill these resources' unique name property so that they can be redeployed or referenced in a Bicep file.

## Prerequisites

- Ensure you have the least privileged permissions or roles to update existing resources. Consult [Least privileged roles by task](/entra/identity/role-based-access-control/delegate-by-task) and [Default user permissions](/entra/fundamentals/users-default-permissions) to see what roles you need to be assigned.
- Install [Microsoft Graph CLI](/graph/cli/overview.md) or [Microsoft Graph PowerShell](/powershell/microsoftgraph/overview.md).

## Backfill the unique name

The following example shows how to backfill unique name for a group and an application using the following Microsoft Graph CLI or Microsoft Graph PowerShell.

# [Microsoft Graph CLI](#tab/CLI)

```bash
mgc groups patch --group-id '<replace-with-ID-of-your-group>' --body '{"uniqueName": "TestGroup-2024-04-18"}'
mgc applications patch --id '<replace-with-ID-of-your-application>' --body '{"uniqueName": "TestApp-2024-04-18"}'
```

# [Microsoft Graph PowerShell](#tab/PowerShell)

```powershell
Import-Module Microsoft.Graph.Groups

$groupParams = @{
    uniqueName = "TestGroup-2024-04-18"
}
$groupId = <replace-with-ID-of-your-group>

$applicationParams = @{
    uniqueName = "TestApp-2024-04-18"
}
$applicationId = <replace-with-ID-of-your-application>

Update-MgGroup -GroupId $groupId -BodyParameter $groupParams

Update-MgApplication -Id $applicationId -BodyParameter $applicationParams
```

---

## Use an existing resource in Bicep

1. Launch Visual Studio Code and create two new files, **main.bicep** and **bicepconfig.json**, making sure that they are in the same folder. 

2. Enable some preview features by configuring bicepconfig.json:

  ```json
    {
        "experimentalFeaturesEnabled": {
        "extensibility": true
        }
    }
  ```

3. In *main.bicep*, add the following Bicep code, which uses the `existing` keyword to reference the group by its unique name `TestGroup-2024-04-18` and the application by `TestApp-2024-04-18`:

  ```Bicep
    provider microsoftGraph

    @description('Group to use')
    param groupName string = 'TestGroup-2024-04-18'

    @description('App to use')
    param appName string = 'TestApp-2024-04-18'

    resource group 'Microsoft.Graph/groups@v1.0' existing = {
        uniqueName: groupName
    }

    resource application 'Microsoft.Graph/applications@v1.0' existing = {
        uniqueName: appName
    }

    output group-id string = group.id
    output application-id string = application.id
  ```

4. Deploy the Bicep file using Azure CLI or Azure PowerShell

  # [Azure CLI](#tab/CLI)

  ```azurecli-interactive
    az deployment group create --resource-group exampleRG --template-file main.bicep
  ```

  # [Azure PowerShell](#tab/PowerShell)

  ```azurepowershell-interactive
    New-AzResourceGroupDeployment -ResourceGroupName "exampleRG" -TemplateFile ".\main.bicep"
  ```

---

  ```output
    DeploymentName          : main
    ResourceGroupName       : exampleRG
    ProvisioningState       : Succeeded
    Timestamp               : 18/04/2024 16:16:42
    Mode                    : Incremental
    TemplateLink            :
    Parameters              :
                            Name             Type                       Value
                            ===============  =========================  ==========
                            groupName        String                     "TestGroup-2024-04-18"
                            appName          String                     "TestApp-2024-04-18"


    Outputs                 :
                            Name             Type                       Value
                            ===============  =========================  ==========
                            group-id         String                     "<ID-of-your-group>"
                            app-id           String                     "<ID-of-your-app>"
  ```

## Related content

- [Uniquely named resources](./concept-uniquely-named-resources.md)
