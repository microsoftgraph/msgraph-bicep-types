---

title: Microsoft.Graph/oauth2PermissionGrants
description: Microsoft.Graph/oauth2PermissionGrants syntax and properties to use in Bicep templates for deploying the resource.
ms.topic: reference
ms.subservice: entra-applications
ms.date: 5/8/2024
---
# Microsoft.Graph oauth2PermissionGrants


## Permissions

[!INCLUDE [permissions-intro](../../includes/permissions-intro.md)]

[!INCLUDE [permissions-table](~/../microsoft-graph/api-reference/v1.0/includes/permissions/oauth2permissiongrant-post-permissions.md)]

## Resource format

To create a Microsoft.Graph/oauth2PermissionGrants resource, add the following Bicep to your template.

```bicep
resource symbolicname 'Microsoft.Graph/oauth2PermissionGrants@v1.0' = {
  clientId: 'string'
  consentType: 'string'
  principalId: 'string'
  resourceId: 'string'
  scope: 'string'
}
```

## Property values

### oauth2PermissionGrants

| Name | Description | Value |
| ---- | ----------- | ------------ |
| clientId | The object id (not appId) of the client service principal for the application which is authorized to act on behalf of a signed-in user when accessing an API. Required | string (required) |
| consentType | Indicates if authorization is granted for the client application to impersonate all users or only a specific user. AllPrincipals indicates authorization to impersonate all users. Principal indicates authorization to impersonate a specific user. Consent on behalf of all users can be granted by an administrator. Non-admin users may be authorized to consent on behalf of themselves in some cases, for some delegated permissions. Required | string (required) |
| principalId | The id of the user on behalf of whom the client is authorized to access the resource, when consentType is Principal. If consentType is AllPrincipals this value is null. Required when consentType is Principal | string |
| resourceId | The id of the resource service principal to which access is authorized. This identifies the API which the client is authorized to attempt to call on behalf of a signed-in user | string (required) |
| scope | A space-separated list of the claim values for delegated permissions which should be included in access tokens for the resource application (the API). For example, openid User.Read GroupMember.Read.All. Each claim value should match the value field of one of the delegated permissions defined by the API, listed in the oauth2PermissionScopes property of the resource service principal. Must not exceed 3850 characters in length. | string |
