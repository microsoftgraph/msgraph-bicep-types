---
title: Microsoft.Graph/oauth2PermissionGrants beta
description: Azure Microsoft.Graph/oauth2PermissionGrants syntax and properties to use in Azure Resource Manager templates for deploying the resource. API version beta
author: tfitzmac
zone_pivot_groups: deployment-languages-reference
ms.service: azure-resource-manager
ms.topic: reference
ms.date: 2/14/2024
ms.author: tomfitz
---
# Microsoft.Graph oauth2PermissionGrants beta

> [!div class="op_single_selector" title1="API Versions:"]
> - [Latest](../oauth2PermissionGrants.md)
> - [beta](../beta/oauth2PermissionGrants.md)

::: zone pivot="deployment-language-bicep"

## Bicep resource definition

The oauth2PermissionGrants resource type can be deployed with operations that target: 

* **Resource groups** - See [resource group deployment commands](/azure/azure-resource-manager/bicep/deploy-to-resource-group)

For a list of changed properties in each API version, see [change log](~/Microsoft.Graph/change-log/oauth2PermissionGrants.md).

## Resource format

To create a Microsoft.Graph/oauth2PermissionGrants resource, add the following Bicep to your template.

```bicep
resource symbolicname 'Microsoft.Graph/oauth2PermissionGrants@beta' = {
  scope: 'string'
  clientId: 'string'
  consentType: 'string'
  principalId: 'string'
  resourceId: 'string'
}
```

## Property values

### oauth2PermissionGrants

| Name | Description | Value |
| ---- | ----------- | ------------ |
| scope |  | string  |
| clientId |  | string (required) |
| consentType |  | string (required) |
| principalId |  | string  |
| resourceId |  | string (required) |

::: zone-end

::: zone pivot="deployment-language-arm-template"

## ARM template resource definition

The oauth2PermissionGrants resource type can be deployed with operations that target: 

* **Resource groups** - See [resource group deployment commands](/azure/azure-resource-manager/templates/deploy-to-resource-group)

For a list of changed properties in each API version, see [change log](~/Microsoft.Graph/change-log/oauth2PermissionGrants.md).

## Resource format

To create a Microsoft.Graph/oauth2PermissionGrants resource, add the following JSON to your template.

```json
{
  "type": "Microsoft.Graph/oauth2PermissionGrants",
  "apiVersion": "beta",
  "scope": "string",
  "clientId": "string",
  "consentType": "string",
  "principalId": "string",
  "resourceId": "string"
}
```

## Property values

### oauth2PermissionGrants

| Name | Description | Value |
| ---- | ----------- | ------------ |
| type | The resource type | 'Microsoft.Graph/oauth2PermissionGrants' |
| apiVersion | The resource api version | 'beta' |
| scope |  | string  |
| clientId |  | string (required) |
| consentType |  | string (required) |
| principalId |  | string  |
| resourceId |  | string (required) |

::: zone-end

::: zone pivot="deployment-language-terraform"

## Terraform (AzAPI provider) resource definition

The oauth2PermissionGrants resource type can be deployed with operations that target: 

* **Resource groups**

For a list of changed properties in each API version, see [change log](~/Microsoft.Graph/change-log/oauth2PermissionGrants.md).

## Resource format

To create a Microsoft.Graph/oauth2PermissionGrants resource, add the following Terraform to your template.

```terraform
resource "azapi_resource" "symbolicname" {
  type = "Microsoft.Graph/oauth2PermissionGrants@beta"
  parent_id = "string"
  body = jsonencode({
    scope = "string"
    clientId = "string"
    consentType = "string"
    principalId = "string"
    resourceId = "string"
  })
}
```

## Property values

### oauth2PermissionGrants

| Name | Description | Value |
| ---- | ----------- | ------------ |
| type | The resource type | "Microsoft.Graph/oauth2PermissionGrants@beta" |
| parent_id | To deploy to a resource group, use the ID of that resource group.  | string (required) |
| clientId |  | string (required) |
| consentType |  | string (required) |
| principalId |  | string  |
| resourceId |  | string (required) |

::: zone-end

