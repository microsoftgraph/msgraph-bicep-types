---
title: Microsoft.Graph/appRoleAssignedTo beta
description: Azure Microsoft.Graph/appRoleAssignedTo syntax and properties to use in Azure Resource Manager templates for deploying the resource. API version beta
author: tfitzmac
zone_pivot_groups: deployment-languages-reference
ms.service: azure-resource-manager
ms.topic: reference
ms.date: 2/14/2024
ms.author: tomfitz
---
# Microsoft.Graph appRoleAssignedTo beta

> [!div class="op_single_selector" title1="API Versions:"]
> - [Latest](../appRoleAssignedTo.md)
> - [beta](../beta/appRoleAssignedTo.md)

::: zone pivot="deployment-language-bicep"

## Bicep resource definition

The appRoleAssignedTo resource type can be deployed with operations that target: 

* **Resource groups** - See [resource group deployment commands](/azure/azure-resource-manager/bicep/deploy-to-resource-group)

For a list of changed properties in each API version, see [change log](~/Microsoft.Graph/change-log/appRoleAssignedTo.md).

## Resource format

To create a Microsoft.Graph/appRoleAssignedTo resource, add the following Bicep to your template.

```bicep
resource symbolicname 'Microsoft.Graph/appRoleAssignedTo@beta' = {
  appRoleId: 'string'
  principalId: 'string'
  resourceDisplayName: 'string'
  resourceId: 'string'
}
```

## Property values

### appRoleAssignedTo

| Name | Description | Value |
| ---- | ----------- | ------------ |
| appRoleId |  | string (required)<br /><br />Constraints:<br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$` |
| principalId |  | string (required)<br /><br />Constraints:<br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$` |
| resourceDisplayName |  | string  |
| resourceId |  | string (required)<br /><br />Constraints:<br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$` |

::: zone-end

::: zone pivot="deployment-language-arm-template"

## ARM template resource definition

The appRoleAssignedTo resource type can be deployed with operations that target: 

* **Resource groups** - See [resource group deployment commands](/azure/azure-resource-manager/templates/deploy-to-resource-group)

For a list of changed properties in each API version, see [change log](~/Microsoft.Graph/change-log/appRoleAssignedTo.md).

## Resource format

To create a Microsoft.Graph/appRoleAssignedTo resource, add the following JSON to your template.

```json
{
  "type": "Microsoft.Graph/appRoleAssignedTo",
  "apiVersion": "beta",
  "appRoleId": "string",
  "principalId": "string",
  "resourceDisplayName": "string",
  "resourceId": "string"
}
```

## Property values

### appRoleAssignedTo

| Name | Description | Value |
| ---- | ----------- | ------------ |
| type | The resource type | 'Microsoft.Graph/appRoleAssignedTo' |
| apiVersion | The resource api version | 'beta' |
| appRoleId |  | string (required)<br /><br />Constraints:<br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$` |
| principalId |  | string (required)<br /><br />Constraints:<br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$` |
| resourceDisplayName |  | string  |
| resourceId |  | string (required)<br /><br />Constraints:<br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$` |

::: zone-end

::: zone pivot="deployment-language-terraform"

## Terraform (AzAPI provider) resource definition

The appRoleAssignedTo resource type can be deployed with operations that target: 

* **Resource groups**

For a list of changed properties in each API version, see [change log](~/Microsoft.Graph/change-log/appRoleAssignedTo.md).

## Resource format

To create a Microsoft.Graph/appRoleAssignedTo resource, add the following Terraform to your template.

```terraform
resource "azapi_resource" "symbolicname" {
  type = "Microsoft.Graph/appRoleAssignedTo@beta"
  parent_id = "string"
  body = jsonencode({
    appRoleId = "string"
    principalId = "string"
    resourceDisplayName = "string"
    resourceId = "string"
  })
}
```

## Property values

### appRoleAssignedTo

| Name | Description | Value |
| ---- | ----------- | ------------ |
| type | The resource type | "Microsoft.Graph/appRoleAssignedTo@beta" |
| parent_id | To deploy to a resource group, use the ID of that resource group.  | string (required) |
| appRoleId |  | string (required)<br /><br />Constraints:<br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$` |
| principalId |  | string (required)<br /><br />Constraints:<br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$` |
| resourceDisplayName |  | string  |
| resourceId |  | string (required)<br /><br />Constraints:<br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$` |

::: zone-end

