---
title: Microsoft.Graph/applications beta
description: Azure Microsoft.Graph/applications syntax and properties to use in Azure Resource Manager templates for deploying the resource. API version beta
author: tfitzmac
zone_pivot_groups: deployment-languages-reference
ms.service: azure-resource-manager
ms.topic: reference
ms.date: 2/14/2024
ms.author: tomfitz
---
# Microsoft.Graph applications beta

> [!div class="op_single_selector" title1="API Versions:"]
> - [Latest](../applications.md)
> - [beta](../beta/applications.md)

::: zone pivot="deployment-language-bicep"

## Bicep resource definition

The applications resource type can be deployed with operations that target: 

* **Resource groups** - See [resource group deployment commands](/azure/azure-resource-manager/bicep/deploy-to-resource-group)

For a list of changed properties in each API version, see [change log](~/Microsoft.Graph/change-log/applications.md).

## Resource format

To create a Microsoft.Graph/applications resource, add the following Bicep to your template.

```bicep
resource symbolicname 'Microsoft.Graph/applications@beta' = {
  tags: [
    'string'
  ]
    tagName1: 'tagValue1'
    tagName2: 'tagValue2'
  }
  api: {
    acceptMappedClaims: bool
    knownClientApplications: [
      'string'
    ]
    oauth2PermissionScopes: [
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
    preAuthorizedApplications: [
      {
        appId: 'string'
        permissionIds: [
          'string'
        ]
      }
    ]
    requestedAccessTokenVersion: int
  }
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
  authenticationBehaviors: {
    blockAzureADGraphAccess: bool
    removeUnverifiedEmailClaim: bool
    requireClientServicePrincipal: bool
  }
  defaultRedirectUri: 'string'
  description: 'string'
  disabledByMicrosoftStatus: 'string'
  displayName: 'string'
  groupMembershipClaims: 'string'
  identifierUris: [
    'string'
  ]
  info: {
    marketingUrl: 'string'
    privacyStatementUrl: 'string'
    supportUrl: 'string'
    termsOfServiceUrl: 'string'
  }
  isDeviceOnlyAuthSupported: bool
  isFallbackPublicClient: bool
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
  logo: 'string'
  notes: 'string'
  optionalClaims: {
    accessToken: [
      {
        additionalProperties: [
          'string'
        ]
        essential: bool
        name: 'string'
        source: 'string'
      }
    ]
    idToken: [
      {
        additionalProperties: [
          'string'
        ]
        essential: bool
        name: 'string'
        source: 'string'
      }
    ]
    saml2Token: [
      {
        additionalProperties: [
          'string'
        ]
        essential: bool
        name: 'string'
        source: 'string'
      }
    ]
  }
  parentalControlSettings: {
    countriesBlockedForMinors: [
      'string'
    ]
    legalAgeGroupRule: 'string'
  }
  passwordCredentials: [
    {
      displayName: 'string'
      endDateTime: 'string'
      keyId: 'string'
      startDateTime: 'string'
    }
  ]
  publicClient: {
    redirectUris: [
      'string'
    ]
  }
  requestSignatureVerification: {
    allowedWeakAlgorithms: 'rsaSha1'
    isSignedRequestRequired: bool
  }
  requiredResourceAccess: [
    {
      resourceAccess: [
        {
          id: 'string'
          type: 'string'
        }
      ]
      resourceAppId: 'string'
    }
  ]
  samlMetadataUrl: 'string'
  serviceManagementReference: 'string'
  servicePrincipalLockConfiguration: {
    allProperties: bool
    credentialsWithUsageSign: bool
    credentialsWithUsageVerify: bool
    isEnabled: bool
    tokenEncryptionKeyId: bool
  }
  signInAudience: 'string'
  spa: {
    redirectUris: [
      'string'
    ]
  }
  tokenEncryptionKeyId: 'string'
  uniqueName: 'string'
  verifiedPublisher: {
    addedDateTime: 'string'
    displayName: 'string'
    verifiedPublisherId: 'string'
  }
  web: {
    homePageUrl: 'string'
    implicitGrantSettings: {
      enableAccessTokenIssuance: bool
      enableIdTokenIssuance: bool
    }
    logoutUrl: 'string'
    oauth2AllowImplicitFlow: bool
    redirectUris: [
      'string'
    ]
    redirectUriSettings: [
      {
        index: int
        uri: 'string'
      }
    ]
  }
  windows: {
    redirectUris: [
      'string'
    ]
  }
}
```

## Property values

### applications

| Name | Description | Value |
| ---- | ----------- | ------------ |
| tags |  | string[]  |
| api |  | [MicrosoftGraphApiApplication](#microsoftgraphapiapplication)  |
| appRoles |  | [MicrosoftGraphAppRole](#microsoftgraphapprole)[]  |
| authenticationBehaviors |  | [MicrosoftGraphAuthenticationBehaviors](#microsoftgraphauthenticationbehaviors)  |
| defaultRedirectUri |  | string  |
| description |  | string  |
| disabledByMicrosoftStatus |  | string  |
| displayName |  | string (required) |
| groupMembershipClaims |  | string  |
| identifierUris |  | string[]  |
| info |  | [MicrosoftGraphInformationalUrl](#microsoftgraphinformationalurl)  |
| isDeviceOnlyAuthSupported |  | bool  |
| isFallbackPublicClient |  | bool  |
| keyCredentials |  | [MicrosoftGraphKeyCredential](#microsoftgraphkeycredential)[]  |
| logo |  | string  |
| notes |  | string  |
| optionalClaims |  | [MicrosoftGraphOptionalClaims](#microsoftgraphoptionalclaims)  |
| parentalControlSettings |  | [MicrosoftGraphParentalControlSettings](#microsoftgraphparentalcontrolsettings)  |
| passwordCredentials |  | [MicrosoftGraphPasswordCredential](#microsoftgraphpasswordcredential)[]  |
| publicClient |  | [MicrosoftGraphPublicClientApplication](#microsoftgraphpublicclientapplication)  |
| requestSignatureVerification |  | [MicrosoftGraphRequestSignatureVerification](#microsoftgraphrequestsignatureverification)  |
| requiredResourceAccess |  | [MicrosoftGraphRequiredResourceAccess](#microsoftgraphrequiredresourceaccess)[]  |
| samlMetadataUrl |  | string  |
| serviceManagementReference |  | string  |
| servicePrincipalLockConfiguration |  | [MicrosoftGraphServicePrincipalLockConfiguration](#microsoftgraphserviceprincipallockconfiguration)  |
| signInAudience |  | string  |
| spa |  | [MicrosoftGraphSpaApplication](#microsoftgraphspaapplication)  |
| tokenEncryptionKeyId |  | string <br /><br />Constraints:<br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$` |
| uniqueName |  | string (required) |
| verifiedPublisher |  | [MicrosoftGraphVerifiedPublisher](#microsoftgraphverifiedpublisher)  |
| web |  | [MicrosoftGraphWebApplication](#microsoftgraphwebapplication)  |
| windows |  | [MicrosoftGraphWindowsApplication](#microsoftgraphwindowsapplication)  |

### MicrosoftGraphApiApplication

| Name | Description | Value |
| ---- | ----------- | ------------ |
| acceptMappedClaims |  | bool  |
| knownClientApplications |  | string[] <br /><br />Constraints:<br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$` |
| oauth2PermissionScopes |  | [MicrosoftGraphPermissionScope](#microsoftgraphpermissionscope)[]  |
| preAuthorizedApplications |  | [MicrosoftGraphPreAuthorizedApplication](#microsoftgraphpreauthorizedapplication)[]  |
| requestedAccessTokenVersion |  | int  |

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

### MicrosoftGraphPreAuthorizedApplication

| Name | Description | Value |
| ---- | ----------- | ------------ |
| appId |  | string  |
| permissionIds |  | string[]  |

### MicrosoftGraphAppRole

| Name | Description | Value |
| ---- | ----------- | ------------ |
| allowedMemberTypes |  | string[]  |
| description |  | string  |
| displayName |  | string  |
| id |  | string <br /><br />Constraints:<br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$` |
| isEnabled |  | bool  |
| value |  | string  |

### MicrosoftGraphAuthenticationBehaviors

| Name | Description | Value |
| ---- | ----------- | ------------ |
| blockAzureADGraphAccess |  | bool  |
| removeUnverifiedEmailClaim |  | bool  |
| requireClientServicePrincipal |  | bool  |

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

### MicrosoftGraphOptionalClaims

| Name | Description | Value |
| ---- | ----------- | ------------ |
| accessToken |  | [MicrosoftGraphOptionalClaim](#microsoftgraphoptionalclaim)[]  |
| idToken |  | [MicrosoftGraphOptionalClaim](#microsoftgraphoptionalclaim)[]  |
| saml2Token |  | [MicrosoftGraphOptionalClaim](#microsoftgraphoptionalclaim)[]  |

### MicrosoftGraphOptionalClaim

| Name | Description | Value |
| ---- | ----------- | ------------ |
| additionalProperties |  | string[]  |
| essential |  | bool  |
| name |  | string  |
| source |  | string  |

### MicrosoftGraphParentalControlSettings

| Name | Description | Value |
| ---- | ----------- | ------------ |
| countriesBlockedForMinors |  | string[]  |
| legalAgeGroupRule |  | string  |

### MicrosoftGraphPasswordCredential

| Name | Description | Value |
| ---- | ----------- | ------------ |
| displayName |  | string  |
| endDateTime |  | string  |
| keyId |  | string <br /><br />Constraints:<br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$` |
| startDateTime |  | string  |

### MicrosoftGraphPublicClientApplication

| Name | Description | Value |
| ---- | ----------- | ------------ |
| redirectUris |  | string[]  |

### MicrosoftGraphRequestSignatureVerification

| Name | Description | Value |
| ---- | ----------- | ------------ |
| allowedWeakAlgorithms |  | 'rsaSha1' |
| isSignedRequestRequired |  | bool  |

### MicrosoftGraphRequiredResourceAccess

| Name | Description | Value |
| ---- | ----------- | ------------ |
| resourceAccess |  | [MicrosoftGraphResourceAccess](#microsoftgraphresourceaccess)[]  |
| resourceAppId |  | string  |

### MicrosoftGraphResourceAccess

| Name | Description | Value |
| ---- | ----------- | ------------ |
| id |  | string <br /><br />Constraints:<br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$` |
| type |  | string  |

### MicrosoftGraphServicePrincipalLockConfiguration

| Name | Description | Value |
| ---- | ----------- | ------------ |
| allProperties |  | bool  |
| credentialsWithUsageSign |  | bool  |
| credentialsWithUsageVerify |  | bool  |
| isEnabled |  | bool  |
| tokenEncryptionKeyId |  | bool  |

### MicrosoftGraphSpaApplication

| Name | Description | Value |
| ---- | ----------- | ------------ |
| redirectUris |  | string[]  |

### MicrosoftGraphVerifiedPublisher

| Name | Description | Value |
| ---- | ----------- | ------------ |
| addedDateTime |  | string  |
| displayName |  | string  |
| verifiedPublisherId |  | string  |

### MicrosoftGraphWebApplication

| Name | Description | Value |
| ---- | ----------- | ------------ |
| homePageUrl |  | string  |
| implicitGrantSettings |  | [MicrosoftGraphImplicitGrantSettings](#microsoftgraphimplicitgrantsettings)  |
| logoutUrl |  | string  |
| oauth2AllowImplicitFlow |  | bool  |
| redirectUris |  | string[]  |
| redirectUriSettings |  | [MicrosoftGraphRedirectUriSettings](#microsoftgraphredirecturisettings)[]  |

### MicrosoftGraphImplicitGrantSettings

| Name | Description | Value |
| ---- | ----------- | ------------ |
| enableAccessTokenIssuance |  | bool  |
| enableIdTokenIssuance |  | bool  |

### MicrosoftGraphRedirectUriSettings

| Name | Description | Value |
| ---- | ----------- | ------------ |
| index |  | int  |
| uri |  | string  |

### MicrosoftGraphWindowsApplication

| Name | Description | Value |
| ---- | ----------- | ------------ |
| redirectUris |  | string[]  |

::: zone-end

::: zone pivot="deployment-language-arm-template"

## ARM template resource definition

The applications resource type can be deployed with operations that target: 

* **Resource groups** - See [resource group deployment commands](/azure/azure-resource-manager/templates/deploy-to-resource-group)

For a list of changed properties in each API version, see [change log](~/Microsoft.Graph/change-log/applications.md).

## Resource format

To create a Microsoft.Graph/applications resource, add the following JSON to your template.

```json
{
  "type": "Microsoft.Graph/applications",
  "apiVersion": "beta",
  "tags": [ "string" ],
    "tagName1": "tagValue1",
    "tagName2": "tagValue2"
  },
  "api": {
    "acceptMappedClaims": "bool",
    "knownClientApplications": [ "string" ],
    "oauth2PermissionScopes": [
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
    "preAuthorizedApplications": [
      {
        "appId": "string",
        "permissionIds": [ "string" ]
      }
    ],
    "requestedAccessTokenVersion": "int"
  },
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
  "authenticationBehaviors": {
    "blockAzureADGraphAccess": "bool",
    "removeUnverifiedEmailClaim": "bool",
    "requireClientServicePrincipal": "bool"
  },
  "defaultRedirectUri": "string",
  "description": "string",
  "disabledByMicrosoftStatus": "string",
  "displayName": "string",
  "groupMembershipClaims": "string",
  "identifierUris": [ "string" ],
  "info": {
    "marketingUrl": "string",
    "privacyStatementUrl": "string",
    "supportUrl": "string",
    "termsOfServiceUrl": "string"
  },
  "isDeviceOnlyAuthSupported": "bool",
  "isFallbackPublicClient": "bool",
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
  "logo": "string",
  "notes": "string",
  "optionalClaims": {
    "accessToken": [
      {
        "additionalProperties": [ "string" ],
        "essential": "bool",
        "name": "string",
        "source": "string"
      }
    ],
    "idToken": [
      {
        "additionalProperties": [ "string" ],
        "essential": "bool",
        "name": "string",
        "source": "string"
      }
    ],
    "saml2Token": [
      {
        "additionalProperties": [ "string" ],
        "essential": "bool",
        "name": "string",
        "source": "string"
      }
    ]
  },
  "parentalControlSettings": {
    "countriesBlockedForMinors": [ "string" ],
    "legalAgeGroupRule": "string"
  },
  "passwordCredentials": [
    {
      "displayName": "string",
      "endDateTime": "string",
      "keyId": "string",
      "startDateTime": "string"
    }
  ],
  "publicClient": {
    "redirectUris": [ "string" ]
  },
  "requestSignatureVerification": {
    "allowedWeakAlgorithms": "rsaSha1",
    "isSignedRequestRequired": "bool"
  },
  "requiredResourceAccess": [
    {
      "resourceAccess": [
        {
          "id": "string",
          "type": "string"
        }
      ],
      "resourceAppId": "string"
    }
  ],
  "samlMetadataUrl": "string",
  "serviceManagementReference": "string",
  "servicePrincipalLockConfiguration": {
    "allProperties": "bool",
    "credentialsWithUsageSign": "bool",
    "credentialsWithUsageVerify": "bool",
    "isEnabled": "bool",
    "tokenEncryptionKeyId": "bool"
  },
  "signInAudience": "string",
  "spa": {
    "redirectUris": [ "string" ]
  },
  "tokenEncryptionKeyId": "string",
  "uniqueName": "string",
  "verifiedPublisher": {
    "addedDateTime": "string",
    "displayName": "string",
    "verifiedPublisherId": "string"
  },
  "web": {
    "homePageUrl": "string",
    "implicitGrantSettings": {
      "enableAccessTokenIssuance": "bool",
      "enableIdTokenIssuance": "bool"
    },
    "logoutUrl": "string",
    "oauth2AllowImplicitFlow": "bool",
    "redirectUris": [ "string" ],
    "redirectUriSettings": [
      {
        "index": "int",
        "uri": "string"
      }
    ]
  },
  "windows": {
    "redirectUris": [ "string" ]
  }
}
```

## Property values

### applications

| Name | Description | Value |
| ---- | ----------- | ------------ |
| type | The resource type | 'Microsoft.Graph/applications' |
| apiVersion | The resource api version | 'beta' |
| tags |  | string[]  |
| api |  | [MicrosoftGraphApiApplication](#microsoftgraphapiapplication-1)  |
| appRoles |  | [MicrosoftGraphAppRole](#microsoftgraphapprole-1)[]  |
| authenticationBehaviors |  | [MicrosoftGraphAuthenticationBehaviors](#microsoftgraphauthenticationbehaviors-1)  |
| defaultRedirectUri |  | string  |
| description |  | string  |
| disabledByMicrosoftStatus |  | string  |
| displayName |  | string (required) |
| groupMembershipClaims |  | string  |
| identifierUris |  | string[]  |
| info |  | [MicrosoftGraphInformationalUrl](#microsoftgraphinformationalurl-1)  |
| isDeviceOnlyAuthSupported |  | bool  |
| isFallbackPublicClient |  | bool  |
| keyCredentials |  | [MicrosoftGraphKeyCredential](#microsoftgraphkeycredential-1)[]  |
| logo |  | string  |
| notes |  | string  |
| optionalClaims |  | [MicrosoftGraphOptionalClaims](#microsoftgraphoptionalclaims-1)  |
| parentalControlSettings |  | [MicrosoftGraphParentalControlSettings](#microsoftgraphparentalcontrolsettings-1)  |
| passwordCredentials |  | [MicrosoftGraphPasswordCredential](#microsoftgraphpasswordcredential-1)[]  |
| publicClient |  | [MicrosoftGraphPublicClientApplication](#microsoftgraphpublicclientapplication-1)  |
| requestSignatureVerification |  | [MicrosoftGraphRequestSignatureVerification](#microsoftgraphrequestsignatureverification-1)  |
| requiredResourceAccess |  | [MicrosoftGraphRequiredResourceAccess](#microsoftgraphrequiredresourceaccess-1)[]  |
| samlMetadataUrl |  | string  |
| serviceManagementReference |  | string  |
| servicePrincipalLockConfiguration |  | [MicrosoftGraphServicePrincipalLockConfiguration](#microsoftgraphserviceprincipallockconfiguration-1)  |
| signInAudience |  | string  |
| spa |  | [MicrosoftGraphSpaApplication](#microsoftgraphspaapplication-1)  |
| tokenEncryptionKeyId |  | string <br /><br />Constraints:<br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$` |
| uniqueName |  | string (required) |
| verifiedPublisher |  | [MicrosoftGraphVerifiedPublisher](#microsoftgraphverifiedpublisher-1)  |
| web |  | [MicrosoftGraphWebApplication](#microsoftgraphwebapplication-1)  |
| windows |  | [MicrosoftGraphWindowsApplication](#microsoftgraphwindowsapplication-1)  |

### MicrosoftGraphApiApplication

| Name | Description | Value |
| ---- | ----------- | ------------ |
| acceptMappedClaims |  | bool  |
| knownClientApplications |  | string[] <br /><br />Constraints:<br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$` |
| oauth2PermissionScopes |  | [MicrosoftGraphPermissionScope](#microsoftgraphpermissionscope-1)[]  |
| preAuthorizedApplications |  | [MicrosoftGraphPreAuthorizedApplication](#microsoftgraphpreauthorizedapplication-1)[]  |
| requestedAccessTokenVersion |  | int  |

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

### MicrosoftGraphPreAuthorizedApplication

| Name | Description | Value |
| ---- | ----------- | ------------ |
| appId |  | string  |
| permissionIds |  | string[]  |

### MicrosoftGraphAppRole

| Name | Description | Value |
| ---- | ----------- | ------------ |
| allowedMemberTypes |  | string[]  |
| description |  | string  |
| displayName |  | string  |
| id |  | string <br /><br />Constraints:<br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$` |
| isEnabled |  | bool  |
| value |  | string  |

### MicrosoftGraphAuthenticationBehaviors

| Name | Description | Value |
| ---- | ----------- | ------------ |
| blockAzureADGraphAccess |  | bool  |
| removeUnverifiedEmailClaim |  | bool  |
| requireClientServicePrincipal |  | bool  |

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

### MicrosoftGraphOptionalClaims

| Name | Description | Value |
| ---- | ----------- | ------------ |
| accessToken |  | [MicrosoftGraphOptionalClaim](#microsoftgraphoptionalclaim-1)[]  |
| idToken |  | [MicrosoftGraphOptionalClaim](#microsoftgraphoptionalclaim-1)[]  |
| saml2Token |  | [MicrosoftGraphOptionalClaim](#microsoftgraphoptionalclaim-1)[]  |

### MicrosoftGraphOptionalClaim

| Name | Description | Value |
| ---- | ----------- | ------------ |
| additionalProperties |  | string[]  |
| essential |  | bool  |
| name |  | string  |
| source |  | string  |

### MicrosoftGraphParentalControlSettings

| Name | Description | Value |
| ---- | ----------- | ------------ |
| countriesBlockedForMinors |  | string[]  |
| legalAgeGroupRule |  | string  |

### MicrosoftGraphPasswordCredential

| Name | Description | Value |
| ---- | ----------- | ------------ |
| displayName |  | string  |
| endDateTime |  | string  |
| keyId |  | string <br /><br />Constraints:<br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$` |
| startDateTime |  | string  |

### MicrosoftGraphPublicClientApplication

| Name | Description | Value |
| ---- | ----------- | ------------ |
| redirectUris |  | string[]  |

### MicrosoftGraphRequestSignatureVerification

| Name | Description | Value |
| ---- | ----------- | ------------ |
| allowedWeakAlgorithms |  | 'rsaSha1' |
| isSignedRequestRequired |  | bool  |

### MicrosoftGraphRequiredResourceAccess

| Name | Description | Value |
| ---- | ----------- | ------------ |
| resourceAccess |  | [MicrosoftGraphResourceAccess](#microsoftgraphresourceaccess-1)[]  |
| resourceAppId |  | string  |

### MicrosoftGraphResourceAccess

| Name | Description | Value |
| ---- | ----------- | ------------ |
| id |  | string <br /><br />Constraints:<br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$` |
| type |  | string  |

### MicrosoftGraphServicePrincipalLockConfiguration

| Name | Description | Value |
| ---- | ----------- | ------------ |
| allProperties |  | bool  |
| credentialsWithUsageSign |  | bool  |
| credentialsWithUsageVerify |  | bool  |
| isEnabled |  | bool  |
| tokenEncryptionKeyId |  | bool  |

### MicrosoftGraphSpaApplication

| Name | Description | Value |
| ---- | ----------- | ------------ |
| redirectUris |  | string[]  |

### MicrosoftGraphVerifiedPublisher

| Name | Description | Value |
| ---- | ----------- | ------------ |
| addedDateTime |  | string  |
| displayName |  | string  |
| verifiedPublisherId |  | string  |

### MicrosoftGraphWebApplication

| Name | Description | Value |
| ---- | ----------- | ------------ |
| homePageUrl |  | string  |
| implicitGrantSettings |  | [MicrosoftGraphImplicitGrantSettings](#microsoftgraphimplicitgrantsettings-1)  |
| logoutUrl |  | string  |
| oauth2AllowImplicitFlow |  | bool  |
| redirectUris |  | string[]  |
| redirectUriSettings |  | [MicrosoftGraphRedirectUriSettings](#microsoftgraphredirecturisettings-1)[]  |

### MicrosoftGraphImplicitGrantSettings

| Name | Description | Value |
| ---- | ----------- | ------------ |
| enableAccessTokenIssuance |  | bool  |
| enableIdTokenIssuance |  | bool  |

### MicrosoftGraphRedirectUriSettings

| Name | Description | Value |
| ---- | ----------- | ------------ |
| index |  | int  |
| uri |  | string  |

### MicrosoftGraphWindowsApplication

| Name | Description | Value |
| ---- | ----------- | ------------ |
| redirectUris |  | string[]  |

::: zone-end

::: zone pivot="deployment-language-terraform"

## Terraform (AzAPI provider) resource definition

The applications resource type can be deployed with operations that target: 

* **Resource groups**

For a list of changed properties in each API version, see [change log](~/Microsoft.Graph/change-log/applications.md).

## Resource format

To create a Microsoft.Graph/applications resource, add the following Terraform to your template.

```terraform
resource "azapi_resource" "symbolicname" {
  type = "Microsoft.Graph/applications@beta"
  parent_id = "string"
  tags = [
    "string"
  ]
    tagName1 = "tagValue1"
    tagName2 = "tagValue2"
  }
  body = jsonencode({
    api = {
      acceptMappedClaims = bool
      knownClientApplications = [
        "string"
      ]
      oauth2PermissionScopes = [
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
      preAuthorizedApplications = [
        {
          appId = "string"
          permissionIds = [
            "string"
          ]
        }
      ]
      requestedAccessTokenVersion = int
    }
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
    authenticationBehaviors = {
      blockAzureADGraphAccess = bool
      removeUnverifiedEmailClaim = bool
      requireClientServicePrincipal = bool
    }
    defaultRedirectUri = "string"
    description = "string"
    disabledByMicrosoftStatus = "string"
    displayName = "string"
    groupMembershipClaims = "string"
    identifierUris = [
      "string"
    ]
    info = {
      marketingUrl = "string"
      privacyStatementUrl = "string"
      supportUrl = "string"
      termsOfServiceUrl = "string"
    }
    isDeviceOnlyAuthSupported = bool
    isFallbackPublicClient = bool
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
    logo = "string"
    notes = "string"
    optionalClaims = {
      accessToken = [
        {
          additionalProperties = [
            "string"
          ]
          essential = bool
          name = "string"
          source = "string"
        }
      ]
      idToken = [
        {
          additionalProperties = [
            "string"
          ]
          essential = bool
          name = "string"
          source = "string"
        }
      ]
      saml2Token = [
        {
          additionalProperties = [
            "string"
          ]
          essential = bool
          name = "string"
          source = "string"
        }
      ]
    }
    parentalControlSettings = {
      countriesBlockedForMinors = [
        "string"
      ]
      legalAgeGroupRule = "string"
    }
    passwordCredentials = [
      {
        displayName = "string"
        endDateTime = "string"
        keyId = "string"
        startDateTime = "string"
      }
    ]
    publicClient = {
      redirectUris = [
        "string"
      ]
    }
    requestSignatureVerification = {
      allowedWeakAlgorithms = "rsaSha1"
      isSignedRequestRequired = bool
    }
    requiredResourceAccess = [
      {
        resourceAccess = [
          {
            id = "string"
            type = "string"
          }
        ]
        resourceAppId = "string"
      }
    ]
    samlMetadataUrl = "string"
    serviceManagementReference = "string"
    servicePrincipalLockConfiguration = {
      allProperties = bool
      credentialsWithUsageSign = bool
      credentialsWithUsageVerify = bool
      isEnabled = bool
      tokenEncryptionKeyId = bool
    }
    signInAudience = "string"
    spa = {
      redirectUris = [
        "string"
      ]
    }
    tokenEncryptionKeyId = "string"
    uniqueName = "string"
    verifiedPublisher = {
      addedDateTime = "string"
      displayName = "string"
      verifiedPublisherId = "string"
    }
    web = {
      homePageUrl = "string"
      implicitGrantSettings = {
        enableAccessTokenIssuance = bool
        enableIdTokenIssuance = bool
      }
      logoutUrl = "string"
      oauth2AllowImplicitFlow = bool
      redirectUris = [
        "string"
      ]
      redirectUriSettings = [
        {
          index = int
          uri = "string"
        }
      ]
    }
    windows = {
      redirectUris = [
        "string"
      ]
    }
  })
}
```

## Property values

### applications

| Name | Description | Value |
| ---- | ----------- | ------------ |
| type | The resource type | "Microsoft.Graph/applications@beta" |
| parent_id | To deploy to a resource group, use the ID of that resource group.  | string (required) |
| tags |  | string[]  |
| api |  | [MicrosoftGraphApiApplication](#microsoftgraphapiapplication-2)  |
| appRoles |  | [MicrosoftGraphAppRole](#microsoftgraphapprole-2)[]  |
| authenticationBehaviors |  | [MicrosoftGraphAuthenticationBehaviors](#microsoftgraphauthenticationbehaviors-2)  |
| defaultRedirectUri |  | string  |
| description |  | string  |
| disabledByMicrosoftStatus |  | string  |
| displayName |  | string (required) |
| groupMembershipClaims |  | string  |
| identifierUris |  | string[]  |
| info |  | [MicrosoftGraphInformationalUrl](#microsoftgraphinformationalurl-2)  |
| isDeviceOnlyAuthSupported |  | bool  |
| isFallbackPublicClient |  | bool  |
| keyCredentials |  | [MicrosoftGraphKeyCredential](#microsoftgraphkeycredential-2)[]  |
| logo |  | string  |
| notes |  | string  |
| optionalClaims |  | [MicrosoftGraphOptionalClaims](#microsoftgraphoptionalclaims-2)  |
| parentalControlSettings |  | [MicrosoftGraphParentalControlSettings](#microsoftgraphparentalcontrolsettings-2)  |
| passwordCredentials |  | [MicrosoftGraphPasswordCredential](#microsoftgraphpasswordcredential-2)[]  |
| publicClient |  | [MicrosoftGraphPublicClientApplication](#microsoftgraphpublicclientapplication-2)  |
| requestSignatureVerification |  | [MicrosoftGraphRequestSignatureVerification](#microsoftgraphrequestsignatureverification-2)  |
| requiredResourceAccess |  | [MicrosoftGraphRequiredResourceAccess](#microsoftgraphrequiredresourceaccess-2)[]  |
| samlMetadataUrl |  | string  |
| serviceManagementReference |  | string  |
| servicePrincipalLockConfiguration |  | [MicrosoftGraphServicePrincipalLockConfiguration](#microsoftgraphserviceprincipallockconfiguration-2)  |
| signInAudience |  | string  |
| spa |  | [MicrosoftGraphSpaApplication](#microsoftgraphspaapplication-2)  |
| tokenEncryptionKeyId |  | string <br /><br />Constraints:<br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$` |
| uniqueName |  | string (required) |
| verifiedPublisher |  | [MicrosoftGraphVerifiedPublisher](#microsoftgraphverifiedpublisher-2)  |
| web |  | [MicrosoftGraphWebApplication](#microsoftgraphwebapplication-2)  |
| windows |  | [MicrosoftGraphWindowsApplication](#microsoftgraphwindowsapplication-2)  |

### MicrosoftGraphApiApplication

| Name | Description | Value |
| ---- | ----------- | ------------ |
| acceptMappedClaims |  | bool  |
| knownClientApplications |  | string[] <br /><br />Constraints:<br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$` |
| oauth2PermissionScopes |  | [MicrosoftGraphPermissionScope](#microsoftgraphpermissionscope-2)[]  |
| preAuthorizedApplications |  | [MicrosoftGraphPreAuthorizedApplication](#microsoftgraphpreauthorizedapplication-2)[]  |
| requestedAccessTokenVersion |  | int  |

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

### MicrosoftGraphPreAuthorizedApplication

| Name | Description | Value |
| ---- | ----------- | ------------ |
| appId |  | string  |
| permissionIds |  | string[]  |

### MicrosoftGraphAppRole

| Name | Description | Value |
| ---- | ----------- | ------------ |
| allowedMemberTypes |  | string[]  |
| description |  | string  |
| displayName |  | string  |
| id |  | string <br /><br />Constraints:<br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$` |
| isEnabled |  | bool  |
| value |  | string  |

### MicrosoftGraphAuthenticationBehaviors

| Name | Description | Value |
| ---- | ----------- | ------------ |
| blockAzureADGraphAccess |  | bool  |
| removeUnverifiedEmailClaim |  | bool  |
| requireClientServicePrincipal |  | bool  |

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

### MicrosoftGraphOptionalClaims

| Name | Description | Value |
| ---- | ----------- | ------------ |
| accessToken |  | [MicrosoftGraphOptionalClaim](#microsoftgraphoptionalclaim-2)[]  |
| idToken |  | [MicrosoftGraphOptionalClaim](#microsoftgraphoptionalclaim-2)[]  |
| saml2Token |  | [MicrosoftGraphOptionalClaim](#microsoftgraphoptionalclaim-2)[]  |

### MicrosoftGraphOptionalClaim

| Name | Description | Value |
| ---- | ----------- | ------------ |
| additionalProperties |  | string[]  |
| essential |  | bool  |
| name |  | string  |
| source |  | string  |

### MicrosoftGraphParentalControlSettings

| Name | Description | Value |
| ---- | ----------- | ------------ |
| countriesBlockedForMinors |  | string[]  |
| legalAgeGroupRule |  | string  |

### MicrosoftGraphPasswordCredential

| Name | Description | Value |
| ---- | ----------- | ------------ |
| displayName |  | string  |
| endDateTime |  | string  |
| keyId |  | string <br /><br />Constraints:<br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$` |
| startDateTime |  | string  |

### MicrosoftGraphPublicClientApplication

| Name | Description | Value |
| ---- | ----------- | ------------ |
| redirectUris |  | string[]  |

### MicrosoftGraphRequestSignatureVerification

| Name | Description | Value |
| ---- | ----------- | ------------ |
| allowedWeakAlgorithms |  | "rsaSha1" |
| isSignedRequestRequired |  | bool  |

### MicrosoftGraphRequiredResourceAccess

| Name | Description | Value |
| ---- | ----------- | ------------ |
| resourceAccess |  | [MicrosoftGraphResourceAccess](#microsoftgraphresourceaccess-2)[]  |
| resourceAppId |  | string  |

### MicrosoftGraphResourceAccess

| Name | Description | Value |
| ---- | ----------- | ------------ |
| id |  | string <br /><br />Constraints:<br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$` |
| type |  | string  |

### MicrosoftGraphServicePrincipalLockConfiguration

| Name | Description | Value |
| ---- | ----------- | ------------ |
| allProperties |  | bool  |
| credentialsWithUsageSign |  | bool  |
| credentialsWithUsageVerify |  | bool  |
| isEnabled |  | bool  |
| tokenEncryptionKeyId |  | bool  |

### MicrosoftGraphSpaApplication

| Name | Description | Value |
| ---- | ----------- | ------------ |
| redirectUris |  | string[]  |

### MicrosoftGraphVerifiedPublisher

| Name | Description | Value |
| ---- | ----------- | ------------ |
| addedDateTime |  | string  |
| displayName |  | string  |
| verifiedPublisherId |  | string  |

### MicrosoftGraphWebApplication

| Name | Description | Value |
| ---- | ----------- | ------------ |
| homePageUrl |  | string  |
| implicitGrantSettings |  | [MicrosoftGraphImplicitGrantSettings](#microsoftgraphimplicitgrantsettings-2)  |
| logoutUrl |  | string  |
| oauth2AllowImplicitFlow |  | bool  |
| redirectUris |  | string[]  |
| redirectUriSettings |  | [MicrosoftGraphRedirectUriSettings](#microsoftgraphredirecturisettings-2)[]  |

### MicrosoftGraphImplicitGrantSettings

| Name | Description | Value |
| ---- | ----------- | ------------ |
| enableAccessTokenIssuance |  | bool  |
| enableIdTokenIssuance |  | bool  |

### MicrosoftGraphRedirectUriSettings

| Name | Description | Value |
| ---- | ----------- | ------------ |
| index |  | int  |
| uri |  | string  |

### MicrosoftGraphWindowsApplication

| Name | Description | Value |
| ---- | ----------- | ------------ |
| redirectUris |  | string[]  |

::: zone-end

