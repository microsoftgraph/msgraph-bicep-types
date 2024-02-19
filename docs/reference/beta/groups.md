---
title: Microsoft.Graph/groups beta
description: Azure Microsoft.Graph/groups syntax and properties to use in Azure Resource Manager templates for deploying the resource. API version beta
author: tfitzmac
zone_pivot_groups: deployment-languages-reference
ms.service: azure-resource-manager
ms.topic: reference
ms.date: 2/14/2024
ms.author: tomfitz
---
# Microsoft.Graph groups beta

> [!div class="op_single_selector" title1="API Versions:"]
> - [Latest](../groups.md)
> - [beta](../beta/groups.md)

::: zone pivot="deployment-language-bicep"

## Bicep resource definition

The groups resource type can be deployed with operations that target: 

* **Resource groups** - See [resource group deployment commands](/azure/azure-resource-manager/bicep/deploy-to-resource-group)

For a list of changed properties in each API version, see [change log](~/Microsoft.Graph/change-log/groups.md).

## Resource format

To create a Microsoft.Graph/groups resource, add the following Bicep to your template.

```bicep
resource symbolicname 'Microsoft.Graph/groups@beta' = {
  classification: 'string'
  description: 'string'
  displayName: 'string'
  groupTypes: [
    'string'
  ]
  infoCatalogs: [
    'string'
  ]
  isAssignableToRole: bool
  mailEnabled: bool
  mailNickname: 'string'
  members: [
    'string'
  ]
  membershipRule: 'string'
  membershipRuleProcessingState: 'string'
  onPremisesProvisioningErrors: [
    {
      category: 'string'
      occurredDateTime: 'string'
      propertyCausingError: 'string'
      value: 'string'
    }
  ]
  organizationId: 'string'
  owners: [
    'string'
  ]
  preferredDataLocation: 'string'
  preferredLanguage: 'string'
  resourceBehaviorOptions: [
    'string'
  ]
  resourceProvisioningOptions: [
    'string'
  ]
  securityEnabled: bool
  securityIdentifier: 'string'
  serviceProvisioningErrors: [
    {
      createdDateTime: 'string'
      isResolved: bool
      serviceInstance: 'string'
    }
  ]
  theme: 'string'
  uniqueName: 'string'
  visibility: 'string'
  writebackConfiguration: {
    isEnabled: bool
    onPremisesGroupType: 'string'
  }
}
```

## Property values

### groups

| Name | Description | Value |
| ---- | ----------- | ------------ |
| classification |  | string  |
| description |  | string  |
| displayName |  | string (required) |
| groupTypes |  | string[]  |
| infoCatalogs |  | string[]  |
| isAssignableToRole |  | bool  |
| mailEnabled |  | bool (required) |
| mailNickname |  | string (required) |
| members |  | string[]  |
| membershipRule |  | string  |
| membershipRuleProcessingState |  | string  |
| onPremisesProvisioningErrors |  | [MicrosoftGraphOnPremisesProvisioningError](#microsoftgraphonpremisesprovisioningerror)[]  |
| organizationId |  | string  |
| owners |  | string[]  |
| preferredDataLocation |  | string  |
| preferredLanguage |  | string  |
| resourceBehaviorOptions |  | string[]  |
| resourceProvisioningOptions |  | string[]  |
| securityEnabled |  | bool (required) |
| securityIdentifier |  | string  |
| serviceProvisioningErrors |  | [MicrosoftGraphServiceProvisioningError](#microsoftgraphserviceprovisioningerror)[]  |
| theme |  | string  |
| uniqueName |  | string (required) |
| visibility |  | string  |
| writebackConfiguration |  | [MicrosoftGraphGroupWritebackConfiguration](#microsoftgraphgroupwritebackconfiguration)  |

### MicrosoftGraphOnPremisesProvisioningError

| Name | Description | Value |
| ---- | ----------- | ------------ |
| category |  | string  |
| occurredDateTime |  | string  |
| propertyCausingError |  | string  |
| value |  | string  |

### MicrosoftGraphServiceProvisioningError

| Name | Description | Value |
| ---- | ----------- | ------------ |
| createdDateTime |  | string  |
| isResolved |  | bool  |
| serviceInstance |  | string  |

### MicrosoftGraphGroupWritebackConfiguration

| Name | Description | Value |
| ---- | ----------- | ------------ |
| isEnabled |  | bool  |
| onPremisesGroupType |  | string  |

::: zone-end

::: zone pivot="deployment-language-arm-template"

## ARM template resource definition

The groups resource type can be deployed with operations that target: 

* **Resource groups** - See [resource group deployment commands](/azure/azure-resource-manager/templates/deploy-to-resource-group)

For a list of changed properties in each API version, see [change log](~/Microsoft.Graph/change-log/groups.md).

## Resource format

To create a Microsoft.Graph/groups resource, add the following JSON to your template.

```json
{
  "type": "Microsoft.Graph/groups",
  "apiVersion": "beta",
  "classification": "string",
  "description": "string",
  "displayName": "string",
  "groupTypes": [ "string" ],
  "infoCatalogs": [ "string" ],
  "isAssignableToRole": "bool",
  "mailEnabled": "bool",
  "mailNickname": "string",
  "members": [ "string" ],
  "membershipRule": "string",
  "membershipRuleProcessingState": "string",
  "onPremisesProvisioningErrors": [
    {
      "category": "string",
      "occurredDateTime": "string",
      "propertyCausingError": "string",
      "value": "string"
    }
  ],
  "organizationId": "string",
  "owners": [ "string" ],
  "preferredDataLocation": "string",
  "preferredLanguage": "string",
  "resourceBehaviorOptions": [ "string" ],
  "resourceProvisioningOptions": [ "string" ],
  "securityEnabled": "bool",
  "securityIdentifier": "string",
  "serviceProvisioningErrors": [
    {
      "createdDateTime": "string",
      "isResolved": "bool",
      "serviceInstance": "string"
    }
  ],
  "theme": "string",
  "uniqueName": "string",
  "visibility": "string",
  "writebackConfiguration": {
    "isEnabled": "bool",
    "onPremisesGroupType": "string"
  }
}
```

## Property values

### groups

| Name | Description | Value |
| ---- | ----------- | ------------ |
| type | The resource type | 'Microsoft.Graph/groups' |
| apiVersion | The resource api version | 'beta' |
| classification |  | string  |
| description |  | string  |
| displayName |  | string (required) |
| groupTypes |  | string[]  |
| infoCatalogs |  | string[]  |
| isAssignableToRole |  | bool  |
| mailEnabled |  | bool (required) |
| mailNickname |  | string (required) |
| members |  | string[]  |
| membershipRule |  | string  |
| membershipRuleProcessingState |  | string  |
| onPremisesProvisioningErrors |  | [MicrosoftGraphOnPremisesProvisioningError](#microsoftgraphonpremisesprovisioningerror-1)[]  |
| organizationId |  | string  |
| owners |  | string[]  |
| preferredDataLocation |  | string  |
| preferredLanguage |  | string  |
| resourceBehaviorOptions |  | string[]  |
| resourceProvisioningOptions |  | string[]  |
| securityEnabled |  | bool (required) |
| securityIdentifier |  | string  |
| serviceProvisioningErrors |  | [MicrosoftGraphServiceProvisioningError](#microsoftgraphserviceprovisioningerror-1)[]  |
| theme |  | string  |
| uniqueName |  | string (required) |
| visibility |  | string  |
| writebackConfiguration |  | [MicrosoftGraphGroupWritebackConfiguration](#microsoftgraphgroupwritebackconfiguration-1)  |

### MicrosoftGraphOnPremisesProvisioningError

| Name | Description | Value |
| ---- | ----------- | ------------ |
| category |  | string  |
| occurredDateTime |  | string  |
| propertyCausingError |  | string  |
| value |  | string  |

### MicrosoftGraphServiceProvisioningError

| Name | Description | Value |
| ---- | ----------- | ------------ |
| createdDateTime |  | string  |
| isResolved |  | bool  |
| serviceInstance |  | string  |

### MicrosoftGraphGroupWritebackConfiguration

| Name | Description | Value |
| ---- | ----------- | ------------ |
| isEnabled |  | bool  |
| onPremisesGroupType |  | string  |

::: zone-end

::: zone pivot="deployment-language-terraform"

## Terraform (AzAPI provider) resource definition

The groups resource type can be deployed with operations that target: 

* **Resource groups**

For a list of changed properties in each API version, see [change log](~/Microsoft.Graph/change-log/groups.md).

## Resource format

To create a Microsoft.Graph/groups resource, add the following Terraform to your template.

```terraform
resource "azapi_resource" "symbolicname" {
  type = "Microsoft.Graph/groups@beta"
  parent_id = "string"
  body = jsonencode({
    classification = "string"
    description = "string"
    displayName = "string"
    groupTypes = [
      "string"
    ]
    infoCatalogs = [
      "string"
    ]
    isAssignableToRole = bool
    mailEnabled = bool
    mailNickname = "string"
    members = [
      "string"
    ]
    membershipRule = "string"
    membershipRuleProcessingState = "string"
    onPremisesProvisioningErrors = [
      {
        category = "string"
        occurredDateTime = "string"
        propertyCausingError = "string"
        value = "string"
      }
    ]
    organizationId = "string"
    owners = [
      "string"
    ]
    preferredDataLocation = "string"
    preferredLanguage = "string"
    resourceBehaviorOptions = [
      "string"
    ]
    resourceProvisioningOptions = [
      "string"
    ]
    securityEnabled = bool
    securityIdentifier = "string"
    serviceProvisioningErrors = [
      {
        createdDateTime = "string"
        isResolved = bool
        serviceInstance = "string"
      }
    ]
    theme = "string"
    uniqueName = "string"
    visibility = "string"
    writebackConfiguration = {
      isEnabled = bool
      onPremisesGroupType = "string"
    }
  })
}
```

## Property values

### groups

| Name | Description | Value |
| ---- | ----------- | ------------ |
| type | The resource type | "Microsoft.Graph/groups@beta" |
| parent_id | To deploy to a resource group, use the ID of that resource group.  | string (required) |
| classification |  | string  |
| description |  | string  |
| displayName |  | string (required) |
| groupTypes |  | string[]  |
| infoCatalogs |  | string[]  |
| isAssignableToRole |  | bool  |
| mailEnabled |  | bool (required) |
| mailNickname |  | string (required) |
| members |  | string[]  |
| membershipRule |  | string  |
| membershipRuleProcessingState |  | string  |
| onPremisesProvisioningErrors |  | [MicrosoftGraphOnPremisesProvisioningError](#microsoftgraphonpremisesprovisioningerror-2)[]  |
| organizationId |  | string  |
| owners |  | string[]  |
| preferredDataLocation |  | string  |
| preferredLanguage |  | string  |
| resourceBehaviorOptions |  | string[]  |
| resourceProvisioningOptions |  | string[]  |
| securityEnabled |  | bool (required) |
| securityIdentifier |  | string  |
| serviceProvisioningErrors |  | [MicrosoftGraphServiceProvisioningError](#microsoftgraphserviceprovisioningerror-2)[]  |
| theme |  | string  |
| uniqueName |  | string (required) |
| visibility |  | string  |
| writebackConfiguration |  | [MicrosoftGraphGroupWritebackConfiguration](#microsoftgraphgroupwritebackconfiguration-2)  |

### MicrosoftGraphOnPremisesProvisioningError

| Name | Description | Value |
| ---- | ----------- | ------------ |
| category |  | string  |
| occurredDateTime |  | string  |
| propertyCausingError |  | string  |
| value |  | string  |

### MicrosoftGraphServiceProvisioningError

| Name | Description | Value |
| ---- | ----------- | ------------ |
| createdDateTime |  | string  |
| isResolved |  | bool  |
| serviceInstance |  | string  |

### MicrosoftGraphGroupWritebackConfiguration

| Name | Description | Value |
| ---- | ----------- | ------------ |
| isEnabled |  | bool  |
| onPremisesGroupType |  | string  |

::: zone-end

