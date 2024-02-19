---
title: Microsoft.Graph/servicePrincipals beta
description: Azure Microsoft.Graph/servicePrincipals syntax and properties to use in Azure Resource Manager templates for deploying the resource. API version beta
author: tfitzmac
zone_pivot_groups: deployment-languages-reference
ms.service: azure-resource-manager
ms.topic: reference
ms.date: 2/14/2024
ms.author: tomfitz
---
# Microsoft.Graph servicePrincipals beta

> [!div class="op_single_selector" title1="API Versions:"]
> - [Latest](../servicePrincipals.md)
> - [beta](../beta/servicePrincipals.md)

::: zone pivot="deployment-language-bicep"

## Bicep resource definition

The servicePrincipals resource type can be deployed with operations that target: 

* **Resource groups** - See [resource group deployment commands](/azure/azure-resource-manager/bicep/deploy-to-resource-group)

For a list of changed properties in each API version, see [change log](~/Microsoft.Graph/change-log/servicePrincipals.md).

## Resource format

To create a Microsoft.Graph/servicePrincipals resource, add the following Bicep to your template.

```bicep
resource symbolicname 'Microsoft.Graph/servicePrincipals@beta' = {
  tags: [
    'string'
  ]
    tagName1: 'tagValue1'
    tagName2: 'tagValue2'
  }
  accountEnabled: bool
  addIns: [
    {
      id: 'string'
      properties: [
        {
          key: 'string'
          value: 'string'
        }
      ]
      type: 'string'
    }
  ]
  alternativeNames: [
    'string'
  ]
  appDescription: 'string'
  appDisplayName: 'string'
  appId: 'string'
  appOwnerOrganizationId: 'string'
  appRoleAssignmentRequired: bool
  appRoles: [
    {
      allowedMemberTypes: [
        'string'
      ]
      description: 'string'
      displayName: 'string'
      id: 'string'
      isEnabled: bool
      value: 'string'
    }
  ]
  description: 'string'
  disabledByMicrosoftStatus: 'string'
  displayName: 'string'
  homepage: 'string'
  info: {
    marketingUrl: 'string'
    privacyStatementUrl: 'string'
    supportUrl: 'string'
    termsOfServiceUrl: 'string'
  }
  keyCredentials: [
    {
      customKeyIdentifier: 'string'
      displayName: 'string'
      endDateTime: 'string'
      key: 'string'
      keyId: 'string'
      startDateTime: 'string'
      type: 'string'
      usage: 'string'
    }
  ]
  loginUrl: 'string'
  logoutUrl: 'string'
  notes: 'string'
  notificationEmailAddresses: [
    'string'
  ]
  passwordCredentials: [
    {
      displayName: 'string'
      endDateTime: 'string'
      keyId: 'string'
      startDateTime: 'string'
    }
  ]
  preferredSingleSignOnMode: 'string'
  preferredTokenSigningKeyEndDateTime: 'string'
  preferredTokenSigningKeyThumbprint: 'string'
  publishedPermissionScopes: [
    {
      adminConsentDescription: 'string'
      adminConsentDisplayName: 'string'
      id: 'string'
      isEnabled: bool
      origin: 'string'
      type: 'string'
      userConsentDescription: 'string'
      userConsentDisplayName: 'string'
      value: 'string'
    }
  ]
  publisherName: 'string'
  replyUrls: [
    'string'
  ]
  samlMetadataUrl: 'string'
  samlSingleSignOnSettings: {
    relayState: 'string'
  }
  servicePrincipalNames: [
    'string'
  ]
  servicePrincipalType: 'string'
  tokenEncryptionKeyId: 'string'
  verifiedPublisher: {
    addedDateTime: 'string'
    displayName: 'string'
    verifiedPublisherId: 'string'
  }
}
```

## Property values

### servicePrincipals

| Name | Description | Value |
| ---- | ----------- | ------------ |
| tags |  | string[]  |
| accountEnabled |  | bool  |
| addIns |  | [MicrosoftGraphAddIn](#microsoftgraphaddin)[]  |
| alternativeNames |  | string[]  |
| appDescription |  | string  |
| appDisplayName |  | string  |
| appId |  | string (required) |
| appOwnerOrganizationId |  | string <br /><br />Constraints:<br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$` |
| appRoleAssignmentRequired |  | bool  |
| appRoles |  | [MicrosoftGraphAppRole](#microsoftgraphapprole)[]  |
| description |  | string  |
| disabledByMicrosoftStatus |  | string  |
| displayName |  | string  |
| homepage |  | string  |
| info |  | [MicrosoftGraphInformationalUrl](#microsoftgraphinformationalurl)  |
| keyCredentials |  | [MicrosoftGraphKeyCredential](#microsoftgraphkeycredential)[]  |
| loginUrl |  | string  |
| logoutUrl |  | string  |
| notes |  | string  |
| notificationEmailAddresses |  | string[]  |
| passwordCredentials |  | [MicrosoftGraphPasswordCredential](#microsoftgraphpasswordcredential)[]  |
| preferredSingleSignOnMode |  | string  |
| preferredTokenSigningKeyEndDateTime |  | string  |
| preferredTokenSigningKeyThumbprint |  | string  |
| publishedPermissionScopes |  | [MicrosoftGraphPermissionScope](#microsoftgraphpermissionscope)[]  |
| publisherName |  | string  |
| replyUrls |  | string[]  |
| samlMetadataUrl |  | string  |
| samlSingleSignOnSettings |  | [MicrosoftGraphSamlSingleSignOnSettings](#microsoftgraphsamlsinglesignonsettings)  |
| servicePrincipalNames |  | string[]  |
| servicePrincipalType |  | string  |
| tokenEncryptionKeyId |  | string <br /><br />Constraints:<br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$` |
| verifiedPublisher |  | [MicrosoftGraphVerifiedPublisher](#microsoftgraphverifiedpublisher)  |

### MicrosoftGraphAddIn

| Name | Description | Value |
| ---- | ----------- | ------------ |
| id |  | string <br /><br />Constraints:<br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$` |
| properties |  | [MicrosoftGraphKeyValue](#microsoftgraphkeyvalue)[]  |
| type |  | string  |

### MicrosoftGraphKeyValue

| Name | Description | Value |
| ---- | ----------- | ------------ |
| key |  | string  |
| value |  | string  |

### MicrosoftGraphAppRole

| Name | Description | Value |
| ---- | ----------- | ------------ |
| allowedMemberTypes |  | string[]  |
| description |  | string  |
| displayName |  | string  |
| id |  | string <br /><br />Constraints:<br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$` |
| isEnabled |  | bool  |
| value |  | string  |

### MicrosoftGraphInformationalUrl

| Name | Description | Value |
| ---- | ----------- | ------------ |
| marketingUrl |  | string  |
| privacyStatementUrl |  | string  |
| supportUrl |  | string  |
| termsOfServiceUrl |  | string  |

### MicrosoftGraphKeyCredential

| Name | Description | Value |
| ---- | ----------- | ------------ |
| customKeyIdentifier |  | string  |
| displayName |  | string  |
| endDateTime |  | string  |
| key |  | string  |
| keyId |  | string <br /><br />Constraints:<br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$` |
| startDateTime |  | string  |
| type |  | string  |
| usage |  | string  |

### MicrosoftGraphPasswordCredential

| Name | Description | Value |
| ---- | ----------- | ------------ |
| displayName |  | string  |
| endDateTime |  | string  |
| keyId |  | string <br /><br />Constraints:<br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$` |
| startDateTime |  | string  |

### MicrosoftGraphPermissionScope

| Name | Description | Value |
| ---- | ----------- | ------------ |
| adminConsentDescription |  | string  |
| adminConsentDisplayName |  | string  |
| id |  | string <br /><br />Constraints:<br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$` |
| isEnabled |  | bool  |
| origin |  | string  |
| type |  | string  |
| userConsentDescription |  | string  |
| userConsentDisplayName |  | string  |
| value |  | string  |

### MicrosoftGraphSamlSingleSignOnSettings

| Name | Description | Value |
| ---- | ----------- | ------------ |
| relayState |  | string  |

### MicrosoftGraphVerifiedPublisher

| Name | Description | Value |
| ---- | ----------- | ------------ |
| addedDateTime |  | string  |
| displayName |  | string  |
| verifiedPublisherId |  | string  |

::: zone-end

::: zone pivot="deployment-language-arm-template"

## ARM template resource definition

The servicePrincipals resource type can be deployed with operations that target: 

* **Resource groups** - See [resource group deployment commands](/azure/azure-resource-manager/templates/deploy-to-resource-group)

For a list of changed properties in each API version, see [change log](~/Microsoft.Graph/change-log/servicePrincipals.md).

## Resource format

To create a Microsoft.Graph/servicePrincipals resource, add the following JSON to your template.

```json
{
  "type": "Microsoft.Graph/servicePrincipals",
  "apiVersion": "beta",
  "tags": [ "string" ],
    "tagName1": "tagValue1",
    "tagName2": "tagValue2"
  },
  "accountEnabled": "bool",
  "addIns": [
    {
      "id": "string",
      "properties": [
        {
          "key": "string",
          "value": "string"
        }
      ],
      "type": "string"
    }
  ],
  "alternativeNames": [ "string" ],
  "appDescription": "string",
  "appDisplayName": "string",
  "appId": "string",
  "appOwnerOrganizationId": "string",
  "appRoleAssignmentRequired": "bool",
  "appRoles": [
    {
      "allowedMemberTypes": [ "string" ],
      "description": "string",
      "displayName": "string",
      "id": "string",
      "isEnabled": "bool",
      "value": "string"
    }
  ],
  "description": "string",
  "disabledByMicrosoftStatus": "string",
  "displayName": "string",
  "homepage": "string",
  "info": {
    "marketingUrl": "string",
    "privacyStatementUrl": "string",
    "supportUrl": "string",
    "termsOfServiceUrl": "string"
  },
  "keyCredentials": [
    {
      "customKeyIdentifier": "string",
      "displayName": "string",
      "endDateTime": "string",
      "key": "string",
      "keyId": "string",
      "startDateTime": "string",
      "type": "string",
      "usage": "string"
    }
  ],
  "loginUrl": "string",
  "logoutUrl": "string",
  "notes": "string",
  "notificationEmailAddresses": [ "string" ],
  "passwordCredentials": [
    {
      "displayName": "string",
      "endDateTime": "string",
      "keyId": "string",
      "startDateTime": "string"
    }
  ],
  "preferredSingleSignOnMode": "string",
  "preferredTokenSigningKeyEndDateTime": "string",
  "preferredTokenSigningKeyThumbprint": "string",
  "publishedPermissionScopes": [
    {
      "adminConsentDescription": "string",
      "adminConsentDisplayName": "string",
      "id": "string",
      "isEnabled": "bool",
      "origin": "string",
      "type": "string",
      "userConsentDescription": "string",
      "userConsentDisplayName": "string",
      "value": "string"
    }
  ],
  "publisherName": "string",
  "replyUrls": [ "string" ],
  "samlMetadataUrl": "string",
  "samlSingleSignOnSettings": {
    "relayState": "string"
  },
  "servicePrincipalNames": [ "string" ],
  "servicePrincipalType": "string",
  "tokenEncryptionKeyId": "string",
  "verifiedPublisher": {
    "addedDateTime": "string",
    "displayName": "string",
    "verifiedPublisherId": "string"
  }
}
```

## Property values

### servicePrincipals

| Name | Description | Value |
| ---- | ----------- | ------------ |
| type | The resource type | 'Microsoft.Graph/servicePrincipals' |
| apiVersion | The resource api version | 'beta' |
| tags |  | string[]  |
| accountEnabled |  | bool  |
| addIns |  | [MicrosoftGraphAddIn](#microsoftgraphaddin-1)[]  |
| alternativeNames |  | string[]  |
| appDescription |  | string  |
| appDisplayName |  | string  |
| appId |  | string (required) |
| appOwnerOrganizationId |  | string <br /><br />Constraints:<br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$` |
| appRoleAssignmentRequired |  | bool  |
| appRoles |  | [MicrosoftGraphAppRole](#microsoftgraphapprole-1)[]  |
| description |  | string  |
| disabledByMicrosoftStatus |  | string  |
| displayName |  | string  |
| homepage |  | string  |
| info |  | [MicrosoftGraphInformationalUrl](#microsoftgraphinformationalurl-1)  |
| keyCredentials |  | [MicrosoftGraphKeyCredential](#microsoftgraphkeycredential-1)[]  |
| loginUrl |  | string  |
| logoutUrl |  | string  |
| notes |  | string  |
| notificationEmailAddresses |  | string[]  |
| passwordCredentials |  | [MicrosoftGraphPasswordCredential](#microsoftgraphpasswordcredential-1)[]  |
| preferredSingleSignOnMode |  | string  |
| preferredTokenSigningKeyEndDateTime |  | string  |
| preferredTokenSigningKeyThumbprint |  | string  |
| publishedPermissionScopes |  | [MicrosoftGraphPermissionScope](#microsoftgraphpermissionscope-1)[]  |
| publisherName |  | string  |
| replyUrls |  | string[]  |
| samlMetadataUrl |  | string  |
| samlSingleSignOnSettings |  | [MicrosoftGraphSamlSingleSignOnSettings](#microsoftgraphsamlsinglesignonsettings-1)  |
| servicePrincipalNames |  | string[]  |
| servicePrincipalType |  | string  |
| tokenEncryptionKeyId |  | string <br /><br />Constraints:<br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$` |
| verifiedPublisher |  | [MicrosoftGraphVerifiedPublisher](#microsoftgraphverifiedpublisher-1)  |

### MicrosoftGraphAddIn

| Name | Description | Value |
| ---- | ----------- | ------------ |
| id |  | string <br /><br />Constraints:<br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$` |
| properties |  | [MicrosoftGraphKeyValue](#microsoftgraphkeyvalue-1)[]  |
| type |  | string  |

### MicrosoftGraphKeyValue

| Name | Description | Value |
| ---- | ----------- | ------------ |
| key |  | string  |
| value |  | string  |

### MicrosoftGraphAppRole

| Name | Description | Value |
| ---- | ----------- | ------------ |
| allowedMemberTypes |  | string[]  |
| description |  | string  |
| displayName |  | string  |
| id |  | string <br /><br />Constraints:<br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$` |
| isEnabled |  | bool  |
| value |  | string  |

### MicrosoftGraphInformationalUrl

| Name | Description | Value |
| ---- | ----------- | ------------ |
| marketingUrl |  | string  |
| privacyStatementUrl |  | string  |
| supportUrl |  | string  |
| termsOfServiceUrl |  | string  |

### MicrosoftGraphKeyCredential

| Name | Description | Value |
| ---- | ----------- | ------------ |
| customKeyIdentifier |  | string  |
| displayName |  | string  |
| endDateTime |  | string  |
| key |  | string  |
| keyId |  | string <br /><br />Constraints:<br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$` |
| startDateTime |  | string  |
| type |  | string  |
| usage |  | string  |

### MicrosoftGraphPasswordCredential

| Name | Description | Value |
| ---- | ----------- | ------------ |
| displayName |  | string  |
| endDateTime |  | string  |
| keyId |  | string <br /><br />Constraints:<br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$` |
| startDateTime |  | string  |

### MicrosoftGraphPermissionScope

| Name | Description | Value |
| ---- | ----------- | ------------ |
| adminConsentDescription |  | string  |
| adminConsentDisplayName |  | string  |
| id |  | string <br /><br />Constraints:<br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$` |
| isEnabled |  | bool  |
| origin |  | string  |
| type |  | string  |
| userConsentDescription |  | string  |
| userConsentDisplayName |  | string  |
| value |  | string  |

### MicrosoftGraphSamlSingleSignOnSettings

| Name | Description | Value |
| ---- | ----------- | ------------ |
| relayState |  | string  |

### MicrosoftGraphVerifiedPublisher

| Name | Description | Value |
| ---- | ----------- | ------------ |
| addedDateTime |  | string  |
| displayName |  | string  |
| verifiedPublisherId |  | string  |

::: zone-end

::: zone pivot="deployment-language-terraform"

## Terraform (AzAPI provider) resource definition

The servicePrincipals resource type can be deployed with operations that target: 

* **Resource groups**

For a list of changed properties in each API version, see [change log](~/Microsoft.Graph/change-log/servicePrincipals.md).

## Resource format

To create a Microsoft.Graph/servicePrincipals resource, add the following Terraform to your template.

```terraform
resource "azapi_resource" "symbolicname" {
  type = "Microsoft.Graph/servicePrincipals@beta"
  parent_id = "string"
  tags = [
    "string"
  ]
    tagName1 = "tagValue1"
    tagName2 = "tagValue2"
  }
  body = jsonencode({
    accountEnabled = bool
    addIns = [
      {
        id = "string"
        properties = [
          {
            key = "string"
            value = "string"
          }
        ]
        type = "string"
      }
    ]
    alternativeNames = [
      "string"
    ]
    appDescription = "string"
    appDisplayName = "string"
    appId = "string"
    appOwnerOrganizationId = "string"
    appRoleAssignmentRequired = bool
    appRoles = [
      {
        allowedMemberTypes = [
          "string"
        ]
        description = "string"
        displayName = "string"
        id = "string"
        isEnabled = bool
        value = "string"
      }
    ]
    description = "string"
    disabledByMicrosoftStatus = "string"
    displayName = "string"
    homepage = "string"
    info = {
      marketingUrl = "string"
      privacyStatementUrl = "string"
      supportUrl = "string"
      termsOfServiceUrl = "string"
    }
    keyCredentials = [
      {
        customKeyIdentifier = "string"
        displayName = "string"
        endDateTime = "string"
        key = "string"
        keyId = "string"
        startDateTime = "string"
        type = "string"
        usage = "string"
      }
    ]
    loginUrl = "string"
    logoutUrl = "string"
    notes = "string"
    notificationEmailAddresses = [
      "string"
    ]
    passwordCredentials = [
      {
        displayName = "string"
        endDateTime = "string"
        keyId = "string"
        startDateTime = "string"
      }
    ]
    preferredSingleSignOnMode = "string"
    preferredTokenSigningKeyEndDateTime = "string"
    preferredTokenSigningKeyThumbprint = "string"
    publishedPermissionScopes = [
      {
        adminConsentDescription = "string"
        adminConsentDisplayName = "string"
        id = "string"
        isEnabled = bool
        origin = "string"
        type = "string"
        userConsentDescription = "string"
        userConsentDisplayName = "string"
        value = "string"
      }
    ]
    publisherName = "string"
    replyUrls = [
      "string"
    ]
    samlMetadataUrl = "string"
    samlSingleSignOnSettings = {
      relayState = "string"
    }
    servicePrincipalNames = [
      "string"
    ]
    servicePrincipalType = "string"
    tokenEncryptionKeyId = "string"
    verifiedPublisher = {
      addedDateTime = "string"
      displayName = "string"
      verifiedPublisherId = "string"
    }
  })
}
```

## Property values

### servicePrincipals

| Name | Description | Value |
| ---- | ----------- | ------------ |
| type | The resource type | "Microsoft.Graph/servicePrincipals@beta" |
| parent_id | To deploy to a resource group, use the ID of that resource group.  | string (required) |
| tags |  | string[]  |
| accountEnabled |  | bool  |
| addIns |  | [MicrosoftGraphAddIn](#microsoftgraphaddin-2)[]  |
| alternativeNames |  | string[]  |
| appDescription |  | string  |
| appDisplayName |  | string  |
| appId |  | string (required) |
| appOwnerOrganizationId |  | string <br /><br />Constraints:<br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$` |
| appRoleAssignmentRequired |  | bool  |
| appRoles |  | [MicrosoftGraphAppRole](#microsoftgraphapprole-2)[]  |
| description |  | string  |
| disabledByMicrosoftStatus |  | string  |
| displayName |  | string  |
| homepage |  | string  |
| info |  | [MicrosoftGraphInformationalUrl](#microsoftgraphinformationalurl-2)  |
| keyCredentials |  | [MicrosoftGraphKeyCredential](#microsoftgraphkeycredential-2)[]  |
| loginUrl |  | string  |
| logoutUrl |  | string  |
| notes |  | string  |
| notificationEmailAddresses |  | string[]  |
| passwordCredentials |  | [MicrosoftGraphPasswordCredential](#microsoftgraphpasswordcredential-2)[]  |
| preferredSingleSignOnMode |  | string  |
| preferredTokenSigningKeyEndDateTime |  | string  |
| preferredTokenSigningKeyThumbprint |  | string  |
| publishedPermissionScopes |  | [MicrosoftGraphPermissionScope](#microsoftgraphpermissionscope-2)[]  |
| publisherName |  | string  |
| replyUrls |  | string[]  |
| samlMetadataUrl |  | string  |
| samlSingleSignOnSettings |  | [MicrosoftGraphSamlSingleSignOnSettings](#microsoftgraphsamlsinglesignonsettings-2)  |
| servicePrincipalNames |  | string[]  |
| servicePrincipalType |  | string  |
| tokenEncryptionKeyId |  | string <br /><br />Constraints:<br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$` |
| verifiedPublisher |  | [MicrosoftGraphVerifiedPublisher](#microsoftgraphverifiedpublisher-2)  |

### MicrosoftGraphAddIn

| Name | Description | Value |
| ---- | ----------- | ------------ |
| id |  | string <br /><br />Constraints:<br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$` |
| properties |  | [MicrosoftGraphKeyValue](#microsoftgraphkeyvalue-2)[]  |
| type |  | string  |

### MicrosoftGraphKeyValue

| Name | Description | Value |
| ---- | ----------- | ------------ |
| key |  | string  |
| value |  | string  |

### MicrosoftGraphAppRole

| Name | Description | Value |
| ---- | ----------- | ------------ |
| allowedMemberTypes |  | string[]  |
| description |  | string  |
| displayName |  | string  |
| id |  | string <br /><br />Constraints:<br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$` |
| isEnabled |  | bool  |
| value |  | string  |

### MicrosoftGraphInformationalUrl

| Name | Description | Value |
| ---- | ----------- | ------------ |
| marketingUrl |  | string  |
| privacyStatementUrl |  | string  |
| supportUrl |  | string  |
| termsOfServiceUrl |  | string  |

### MicrosoftGraphKeyCredential

| Name | Description | Value |
| ---- | ----------- | ------------ |
| customKeyIdentifier |  | string  |
| displayName |  | string  |
| endDateTime |  | string  |
| key |  | string  |
| keyId |  | string <br /><br />Constraints:<br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$` |
| startDateTime |  | string  |
| type |  | string  |
| usage |  | string  |

### MicrosoftGraphPasswordCredential

| Name | Description | Value |
| ---- | ----------- | ------------ |
| displayName |  | string  |
| endDateTime |  | string  |
| keyId |  | string <br /><br />Constraints:<br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$` |
| startDateTime |  | string  |

### MicrosoftGraphPermissionScope

| Name | Description | Value |
| ---- | ----------- | ------------ |
| adminConsentDescription |  | string  |
| adminConsentDisplayName |  | string  |
| id |  | string <br /><br />Constraints:<br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$` |
| isEnabled |  | bool  |
| origin |  | string  |
| type |  | string  |
| userConsentDescription |  | string  |
| userConsentDisplayName |  | string  |
| value |  | string  |

### MicrosoftGraphSamlSingleSignOnSettings

| Name | Description | Value |
| ---- | ----------- | ------------ |
| relayState |  | string  |

### MicrosoftGraphVerifiedPublisher

| Name | Description | Value |
| ---- | ----------- | ------------ |
| addedDateTime |  | string  |
| displayName |  | string  |
| verifiedPublisherId |  | string  |

::: zone-end

