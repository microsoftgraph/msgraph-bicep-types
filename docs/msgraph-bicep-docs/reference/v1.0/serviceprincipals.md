---

title: Microsoft.Graph/servicePrincipals
description: Microsoft.Graph/servicePrincipals syntax and properties to use in Bicep templates for deploying the resource.
ms.topic: reference
ms.subservice: entra-applications
ms.date: 5/8/2024
---
# Microsoft.Graph servicePrincipals


## Permissions

[!INCLUDE [permissions-intro](../../includes/permissions-intro.md)]

[!INCLUDE [permissions-table](~/../microsoft-graph/api-reference/v1.0/includes/permissions/servicePrincipal-post-servicePrincipals-permissions.md)]

## Resource format

To create a Microsoft.Graph/servicePrincipals resource, add the following Bicep to your template.

```bicep
resource symbolicname 'Microsoft.Graph/servicePrincipals@v1.0' = {
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
  customSecurityAttributes: any
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
  passwordCredentials: [
    {
      displayName: 'string'
      endDateTime: 'string'
      keyId: 'string'
      startDateTime: 'string'
    }
  ]
  preferredSingleSignOnMode: 'string'
  preferredTokenSigningKeyThumbprint: 'string'
  replyUrls: [
    'string'
  ]
  samlSingleSignOnSettings: {
    relayState: 'string'
  }
  servicePrincipalNames: [
    'string'
  ]
  servicePrincipalType: 'string'
  tags: [
    'string'
  ]
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
| accountEnabled | true if the service principal account is enabled; otherwise, false. If set to false, then no users are able to sign in to this app, even if they're assigned to it | bool |
| addIns | Defines custom behavior that a consuming service can use to call an app in specific contexts. For example, applications that can render file streams may set the addIns property for its 'FileHandler' functionality. This lets services like Microsoft 365 call the application in the context of a document the user is working on. | [MicrosoftGraphAddIn](#microsoftgraphaddin)[] |
| alternativeNames | Used to retrieve service principals by subscription, identify resource group and full resource IDs for managed identities | string[] |
| appDescription | The description exposed by the associated application. | string |
| appDisplayName | The display name exposed by the associated application. | string |
| appId | The unique identifier for the associated application (its appId property). Alternate key | string (required) |
| appOwnerOrganizationId | Contains the tenant ID where the application is registered. This is applicable only to service principals backed by applications | string<br /><br />Constraints: <br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$`<br /> |
| appRoleAssignmentRequired | Specifies whether users or other service principals need to be granted an app role assignment for this service principal before users can sign in or apps can get tokens. The default value is false. Not nullable | bool |
| appRoles | The roles exposed by the application that's linked to this service principal. For more information, see the appRoles property definition on the application entity. Not nullable. | [MicrosoftGraphAppRole](#microsoftgraphapprole)[] |
| customSecurityAttributes | An open complex type that holds the value of a custom security attribute that is assigned to a directory object. Nullable. Filter value is case sensitive. | any |
| description | Free text field to provide an internal end-user facing description of the service principal. End-user portals such MyApps displays the application description in this field. The maximum allowed size is 1,024 characters | string |
| disabledByMicrosoftStatus | Specifies whether Microsoft has disabled the registered application. Possible values are: null (default value), NotDisabled, and DisabledDueToViolationOfServicesAgreement (reasons include suspicious, abusive, or malicious activity, or a violation of the Microsoft Services Agreement) | string |
| displayName | The display name for the service principal | string |
| homepage | Home page or landing page of the application. | string |
| info | Basic profile information of the acquired application such as app's marketing, support, terms of service and privacy statement URLs. The terms of service and privacy statement are surfaced to users through the user consent experience. For more info, see How to: Add Terms of service and privacy statement for registered Microsoft Entra apps | [MicrosoftGraphInformationalUrl](#microsoftgraphinformationalurl) |
| keyCredentials | The collection of key credentials associated with the service principal. Not nullable | [MicrosoftGraphKeyCredential](#microsoftgraphkeycredential)[] |
| loginUrl | Specifies the URL where the service provider redirects the user to Microsoft Entra ID to authenticate. Microsoft Entra ID uses the URL to launch the application from Microsoft 365 or the Microsoft Entra My Apps. When blank, Microsoft Entra ID performs IdP-initiated sign-on for applications configured with SAML-based single sign-on. The user launches the application from Microsoft 365, the Microsoft Entra My Apps, or the Microsoft Entra SSO URL. | string |
| logoutUrl | Specifies the URL that the Microsoft's authorization service uses to sign out a user using OpenID Connect front-channel, back-channel, or SAML sign out protocols. | string |
| notes | Free text field to capture information about the service principal, typically used for operational purposes. Maximum allowed size is 1,024 characters. | string |
| notificationEmailAddresses | Specifies the list of email addresses where Microsoft Entra ID sends a notification when the active certificate is near the expiration date. This is only for the certificates used to sign the SAML token issued for Microsoft Entra Gallery applications. | string[] |
| oauth2PermissionScopes | The delegated permissions exposed by the application. For more information, see the oauth2PermissionScopes property on the application entity's api property. Not nullable. | [MicrosoftGraphPermissionScope](#microsoftgraphpermissionscope)[] |
| passwordCredentials | The collection of password credentials associated with the application. Not nullable. | [MicrosoftGraphPasswordCredential](#microsoftgraphpasswordcredential)[] |
| preferredSingleSignOnMode | Specifies the single sign-on mode configured for this application. Microsoft Entra ID uses the preferred single sign-on mode to launch the application from Microsoft 365 or the My Apps portal. The supported values are password, saml, notSupported, and oidc. | string |
| preferredTokenSigningKeyThumbprint | This property can be used on SAML applications (apps that have preferredSingleSignOnMode set to saml) to control which certificate is used to sign the SAML responses. For applications that aren't SAML, don't write or otherwise rely on this property. | string |
| replyUrls | The URLs that user tokens are sent to for sign in with the associated application, or the redirect URIs that OAuth 2.0 authorization codes and access tokens are sent to for the associated application. Not nullable. | string[] |
| samlSingleSignOnSettings | The collection for settings related to saml single sign-on. | [MicrosoftGraphSamlSingleSignOnSettings](#microsoftgraphsamlsinglesignonsettings) |
| servicePrincipalNames | Contains the list of identifiersUris, copied over from the associated application. Additional values can be added to hybrid applications. These values can be used to identify the permissions exposed by this app within Microsoft Entra ID. For example,Client apps can specify a resource URI that is based on the values of this property to acquire an access token, which is the URI returned in the 'aud' claim.The any operator is required for filter expressions on multi-valued properties. Not nullable | string[] |
| servicePrincipalType | Identifies whether the service principal represents an application, a managed identity, or a legacy application. This is set by Microsoft Entra ID internally. The servicePrincipalType property can be set to three different values: Application - A service principal that represents an application or service. The appId property identifies the associated app registration, and matches the appId of an application, possibly from a different tenant. If the associated app registration is missing, tokens aren't issued for the service principal.ManagedIdentity - A service principal that represents a managed identity. Service principals representing managed identities can be granted access and permissions, but can't be updated or modified directly.Legacy - A service principal that represents an app created before app registrations, or through legacy experiences. A legacy service principal can have credentials, service principal names, reply URLs, and other properties that are editable by an authorized user, but doesn't have an associated app registration. The appId value doesn't associate the service principal with an app registration. The service principal can only be used in the tenant where it was created.SocialIdp - For internal use. | string |
| tags | Custom strings that can be used to categorize and identify the service principal. Not nullable | string[] |
| tokenEncryptionKeyId | Specifies the keyId of a public key from the keyCredentials collection. When configured, Microsoft Entra ID issues tokens for this application encrypted using the key specified by this property. The application code that receives the encrypted token must use the matching private key to decrypt the token before it can be used for the signed-in user. | string<br /><br />Constraints: <br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$`<br /> |
| verifiedPublisher | Specifies the verified publisher of the application that's linked to this service principal. | [MicrosoftGraphVerifiedPublisher](#microsoftgraphverifiedpublisher) |

### MicrosoftGraphKeyValue

| Name | Description | Value |
| ---- | ----------- | ------------ |
| key | Key for the key-value pair. | string |
| value | Value for the key-value pair. | string |

### MicrosoftGraphAddIn

| Name | Description | Value |
| ---- | ----------- | ------------ |
| id |  | string<br /><br />Constraints: <br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$`<br /> |
| properties |  | [MicrosoftGraphKeyValue](#microsoftgraphkeyvalue)[] |
| type |  | string |

### MicrosoftGraphAppRole

| Name | Description | Value |
| ---- | ----------- | ------------ |
| allowedMemberTypes | Specifies whether this app role can be assigned to users and groups (by setting to ['User']), to other application's (by setting to ['Application'], or both (by setting to ['User', 'Application']). App roles supporting assignment to other applications' service principals are also known as application permissions. The 'Application' value is only supported for app roles defined on application entities. | string[] |
| description | The description for the app role. This is displayed when the app role is being assigned and, if the app role functions as an application permission, during  consent experiences. | string |
| displayName | Display name for the permission that appears in the app role assignment and consent experiences. | string |
| id | Unique role identifier inside the appRoles collection. When creating a new app role, a new GUID identifier must be provided. | string<br /><br />Constraints: <br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$`<br /> |
| isEnabled | When creating or updating an app role, this must be set to true (which is the default). To delete a role, this must first be set to false. At that point, in a subsequent call, this role may be removed. | bool |
| value | Specifies the value to include in the roles claim in ID tokens and access tokens authenticating an assigned user or service principal. Must not exceed 120 characters in length. Allowed characters are : ! # $ % & ' ( ) * + , -. / : ;  =  ? @ [ ] ^ + _  {  } ~, and characters in the ranges 0-9, A-Z and a-z. Any other character, including the space character, aren't allowed. May not begin with .. | string |

### MicrosoftGraphInformationalUrl

| Name | Description | Value |
| ---- | ----------- | ------------ |
| marketingUrl | Link to the application's marketing page. For example, https://www.contoso.com/app/marketing | string |
| privacyStatementUrl | Link to the application's privacy statement. For example, https://www.contoso.com/app/privacy | string |
| supportUrl | Link to the application's support page. For example, https://www.contoso.com/app/support | string |
| termsOfServiceUrl | Link to the application's terms of service statement. For example, https://www.contoso.com/app/termsofservice | string |

### MicrosoftGraphKeyCredential

| Name | Description | Value |
| ---- | ----------- | ------------ |
| customKeyIdentifier | A 40-character binary type that can be used to identify the credential. Optional. When not provided in the payload, defaults to the thumbprint of the certificate. | string |
| displayName | Friendly name for the key. Optional. | string |
| endDateTime | The date and time at which the credential expires. The DateTimeOffset type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z. | string |
| key | The certificate's raw data in byte array converted to Base64 string. From a .cer certificate, you can read the key using the Convert.ToBase64String() method. For more information, see Get the certificate key. | string |
| keyId | The unique identifier (GUID) for the key. | string<br /><br />Constraints: <br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$`<br /> |
| startDateTime | The date and time at which the credential becomes valid.The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z. | string |
| type | The type of key credential; for example, Symmetric, AsymmetricX509Cert. | string |
| usage | A string that describes the purpose for which the key can be used; for example, Verify. | string |

### MicrosoftGraphPermissionScope

| Name | Description | Value |
| ---- | ----------- | ------------ |
| adminConsentDescription | A description of the delegated permissions, intended to be read by an administrator granting the permission on behalf of all users. This text appears in tenant-wide admin consent experiences. | string |
| adminConsentDisplayName | The permission's title, intended to be read by an administrator granting the permission on behalf of all users. | string |
| id | Unique delegated permission identifier inside the collection of delegated permissions defined for a resource application. | string<br /><br />Constraints: <br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$`<br /> |
| isEnabled | When you create or update a permission, this property must be set to true (which is the default). To delete a permission, this property must first be set to false. At that point, in a subsequent call, the permission may be removed. | bool |
| origin |  | string |
| type | The possible values are: User and Admin. Specifies whether this delegated permission should be considered safe for non-admin users to consent to on behalf of themselves, or whether an administrator consent should always be required. While Microsoft Graph defines the default consent requirement for each permission, the tenant administrator may override the behavior in their organization (by allowing, restricting, or limiting user consent to this delegated permission). For more information, see Configure how users consent to applications. | string |
| userConsentDescription | A description of the delegated permissions, intended to be read by a user granting the permission on their own behalf. This text appears in consent experiences where the user is consenting only on behalf of themselves. | string |
| userConsentDisplayName | A title for the permission, intended to be read by a user granting the permission on their own behalf. This text appears in consent experiences where the user is consenting only on behalf of themselves. | string |
| value | Specifies the value to include in the scp (scope) claim in access tokens. Must not exceed 120 characters in length. Allowed characters are : ! # $ % & ' ( ) * + , -. / : ;  =  ? @ [ ] ^ + _  {  } ~, and characters in the ranges 0-9, A-Z and a-z. Any other character, including the space character, aren't allowed. May not begin with .. | string |

### MicrosoftGraphPasswordCredential

| Name | Description | Value |
| ---- | ----------- | ------------ |
| displayName | Friendly name for the password. Optional. | string |
| endDateTime | The date and time at which the password expires represented using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z. Optional. | string |
| keyId | The unique identifier for the password. | string<br /><br />Constraints: <br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$`<br /> |
| startDateTime | The date and time at which the password becomes valid. The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z. Optional. | string |

### MicrosoftGraphSamlSingleSignOnSettings

| Name | Description | Value |
| ---- | ----------- | ------------ |
| relayState | The relative URI the service provider would redirect to after completion of the single sign-on flow. | string |

### MicrosoftGraphVerifiedPublisher

| Name | Description | Value |
| ---- | ----------- | ------------ |
| addedDateTime | The timestamp when the verified publisher was first added or most recently updated. | string |
| displayName | The verified publisher name from the app publisher's Partner Center account. | string |
| verifiedPublisherId | The ID of the verified publisher from the app publisher's Partner Center account. | string |
