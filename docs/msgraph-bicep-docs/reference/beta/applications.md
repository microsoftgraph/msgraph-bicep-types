---

title: Microsoft.Graph/applications
description: Microsoft.Graph/applications syntax and properties to use in Bicep templates for deploying the resource.
ms.topic: reference
ms.subservice: entra-applications
ms.date: 5/8/2024
---
# Microsoft.Graph applications

[!INCLUDE [beta-disclaimer](../../includes/beta-disclaimer.md)]

## Permissions

[!INCLUDE [permissions-intro](../../includes/permissions-intro.md)]

[!INCLUDE [permissions-table](~/../microsoft-graph/api-reference/beta/includes/permissions/application-post-applications-permissions.md)]

## Resource format

To create a Microsoft.Graph/applications resource, add the following Bicep to your template.

```bicep
resource symbolicname 'Microsoft.Graph/applications@beta' = {
  api: {
    acceptMappedClaims: bool
    knownClientApplications: 'string'
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
  tags: [
    'string'
  ]
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
| api | Specifies settings for an application that implements a web API. | [MicrosoftGraphApiApplication](#microsoftgraphapiapplication) |
| appRoles | The collection of roles defined for the application. With app role assignments, these roles can be assigned to users, groups, or service principals associated with other applications. Not nullable. | [MicrosoftGraphAppRole](#microsoftgraphapprole)[] |
| authenticationBehaviors | The collection of authentication behaviors set for the application. Authentication behaviors are unset by default and must be explicitly enabled (or disabled). For more information about authentication behaviors, see Manage application authenticationBehaviors to avoid unverified use of email claims for user identification or authorization. | [MicrosoftGraphAuthenticationBehaviors](#microsoftgraphauthenticationbehaviors) |
| defaultRedirectUri | The default redirect URI. If specified and there's no explicit redirect URI in the sign-in request for SAML and OIDC flows, Microsoft Entra ID sends the token to this redirect URI. Microsoft Entra ID also sends the token to this default URI in SAML IdP-initiated single sign-on. The value must match one of the configured redirect URIs for the application. | string |
| description | Free text field to provide a description of the application object to end users. The maximum allowed size is 1,024 characters | string |
| disabledByMicrosoftStatus | Specifies whether Microsoft has disabled the registered application. Possible values are: null (default value), NotDisabled, and DisabledDueToViolationOfServicesAgreement (reasons may include suspicious, abusive, or malicious activity, or a violation of the Microsoft Services Agreement) | string |
| displayName | The display name for the application | string (required) |
| groupMembershipClaims | Configures the groups claim issued in a user or OAuth 2.0 access token that the application expects. To set this attribute, use one of the following string values: None, SecurityGroup (for security groups and Microsoft Entra roles), All (this gets all security groups, distribution groups, and Microsoft Entra directory roles that the signed-in user is a member of). | string |
| identifierUris | Also known as App ID URI, this value is set when an application is used as a resource app. The identifierUris acts as the prefix for the scopes you reference in your API's code, and it must be globally unique. You can use the default value provided, which is in the form `api://<appId>`, or specify a more readable URI like `https://contoso.com/api`. For more information on valid identifierUris patterns and best practices, see Microsoft Entra application registration security best practices. Not nullable | string[] |
| info | Basic profile information of the application, such as it's marketing, support, terms of service, and privacy statement URLs. The terms of service and privacy statement are surfaced to users through the user consent experience. For more information, see How to: Add Terms of service and privacy statement for registered Microsoft Entra apps | [MicrosoftGraphInformationalUrl](#microsoftgraphinformationalurl) |
| isDeviceOnlyAuthSupported | Specifies whether this application supports device authentication without a user. The default is false. | bool |
| isFallbackPublicClient | Specifies the fallback application type as public client, such as an installed application running on a mobile device. The default value is false, which means the fallback application type is confidential client such as a web app. There are certain scenarios where Microsoft Entra ID can't determine the client application type. For example, the ROPC flow where the application is configured without specifying a redirect URI. In those cases Microsoft Entra ID interprets the application type based on the value of this property. | bool |
| keyCredentials | The collection of key credentials associated with the application. Not nullable | [MicrosoftGraphKeyCredential](#microsoftgraphkeycredential)[] |
| logo | The main logo for the application. Not nullable. | string |
| notes | Notes relevant for the management of the application. | string |
| optionalClaims | Application developers can configure optional claims in their Microsoft Entra applications to specify the claims that are sent to their application by the Microsoft security token service. For more information, see How to: Provide optional claims to your app. | [MicrosoftGraphOptionalClaims](#microsoftgraphoptionalclaims) |
| parentalControlSettings | Specifies parental control settings for an application. | [MicrosoftGraphParentalControlSettings](#microsoftgraphparentalcontrolsettings) |
| passwordCredentials | The collection of password credentials associated with the application. Not nullable. | [MicrosoftGraphPasswordCredential](#microsoftgraphpasswordcredential)[] |
| publicClient | Specifies settings for installed clients such as desktop or mobile devices. | [MicrosoftGraphPublicClientApplication](#microsoftgraphpublicclientapplication) |
| requestSignatureVerification | Specifies whether this application requires Microsoft Entra ID to verify the signed authentication requests. | [MicrosoftGraphRequestSignatureVerification](#microsoftgraphrequestsignatureverification) |
| requiredResourceAccess | Specifies the resources that the application needs to access. This property also specifies the set of delegated permissions and application roles that it needs for each of those resources. This configuration of access to the required resources drives the consent experience. No more than 50 resource services (APIs) can be configured. Beginning mid-October 2021, the total number of required permissions must not exceed 400. For more information, see Limits on requested permissions per app. Not nullable | [MicrosoftGraphRequiredResourceAccess](#microsoftgraphrequiredresourceaccess)[] |
| samlMetadataUrl | The URL where the service exposes SAML metadata for federation. This property is valid only for single-tenant applications. Nullable. | string |
| serviceManagementReference | References application or service contact information from a Service or Asset Management database. Nullable. | string |
| servicePrincipalLockConfiguration | Specifies whether sensitive properties of a multitenant application should be locked for editing after the application is provisioned in a tenant. Nullable. null by default. | [MicrosoftGraphServicePrincipalLockConfiguration](#microsoftgraphserviceprincipallockconfiguration) |
| signInAudience | Specifies the Microsoft accounts that are supported for the current application. The possible values are: AzureADMyOrg (default), AzureADMultipleOrgs, AzureADandPersonalMicrosoftAccount, and PersonalMicrosoftAccount. See more in the table. The value of this object also limits the number of permissions an app can request. For more information, see Limits on requested permissions per app. The value for this property has implications on other app object properties. As a result, if you change this property, you may need to change other properties first | string |
| spa | Specifies settings for a single-page application, including sign out URLs and redirect URIs for authorization codes and access tokens. | [MicrosoftGraphSpaApplication](#microsoftgraphspaapplication) |
| tags | Custom strings that can be used to categorize and identify the application. Not nullable | string[] |
| tokenEncryptionKeyId | Specifies the keyId of a public key from the keyCredentials collection. When configured, Microsoft Entra ID encrypts all the tokens it emits by using the key this property points to. The application code that receives the encrypted token must use the matching private key to decrypt the token before it can be used for the signed-in user. | string<br /><br />Constraints: <br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$`<br /> |
| uniqueName | The unique identifier that can be assigned to an application and used as an alternate key. Immutable | string (required) |
| verifiedPublisher | Specifies the verified publisher of the application. For more information about how publisher verification helps support application security, trustworthiness, and compliance, see Publisher verification. | [MicrosoftGraphVerifiedPublisher](#microsoftgraphverifiedpublisher) |
| web | Specifies settings for a web application. | [MicrosoftGraphWebApplication](#microsoftgraphwebapplication) |
| windows | Specifies settings for apps running Microsoft Windows and published in the Microsoft Store or Xbox games store. | [MicrosoftGraphWindowsApplication](#microsoftgraphwindowsapplication) |

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

### MicrosoftGraphPreAuthorizedApplication

| Name | Description | Value |
| ---- | ----------- | ------------ |
| appId | The unique identifier for the client application. | string |
| permissionIds | The unique identifier for the scopes the client application is granted. | string[] |

### MicrosoftGraphApiApplication

| Name | Description | Value |
| ---- | ----------- | ------------ |
| acceptMappedClaims | When true, allows an application to use claims mapping without specifying a custom signing key. | bool |
| knownClientApplications | Used for bundling consent if you have a solution that contains two parts: a client app and a custom web API app. If you set the appID of the client app to this value, the user only consents once to the client app. Microsoft Entra ID knows that consenting to the client means implicitly consenting to the web API and automatically provisions service principals for both APIs at the same time. Both the client and the web API app must be registered in the same tenant. | string<br /><br />Constraints: <br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$`<br /> |
| oauth2PermissionScopes | The definition of the delegated permissions exposed by the web API represented by this application registration. These delegated permissions may be requested by a client application, and may be granted by users or administrators during consent. Delegated permissions are sometimes referred to as OAuth 2.0 scopes. | [MicrosoftGraphPermissionScope](#microsoftgraphpermissionscope)[] |
| preAuthorizedApplications | Lists the client applications that are preauthorized with the specified delegated permissions to access this application's APIs. Users aren't required to consent to any preauthorized application (for the permissions specified). However, any other permissions not listed in preAuthorizedApplications (requested through incremental consent for example) will require user consent. | [MicrosoftGraphPreAuthorizedApplication](#microsoftgraphpreauthorizedapplication)[] |
| requestedAccessTokenVersion | Specifies the access token version expected by this resource. This changes the version and format of the JWT produced independent of the endpoint or client used to request the access token. The endpoint used, v1.0 or v2.0, is chosen by the client and only impacts the version of id_tokens. Resources need to explicitly configure requestedAccessTokenVersion to indicate the supported access token format. Possible values for requestedAccessTokenVersion are 1, 2, or null. If the value is null, this defaults to 1, which corresponds to the v1.0 endpoint. If signInAudience on the application is configured as AzureADandPersonalMicrosoftAccount or PersonalMicrosoftAccount, the value for this property must be 2. | int |

### MicrosoftGraphAppRole

| Name | Description | Value |
| ---- | ----------- | ------------ |
| allowedMemberTypes | Specifies whether this app role can be assigned to users and groups (by setting to ['User']), to other application's (by setting to ['Application'], or both (by setting to ['User', 'Application']). App roles supporting assignment to other applications' service principals are also known as application permissions. The 'Application' value is only supported for app roles defined on application entities. | string[] |
| description | The description for the app role. This is displayed when the app role is being assigned and, if the app role functions as an application permission, during  consent experiences. | string |
| displayName | Display name for the permission that appears in the app role assignment and consent experiences. | string |
| id | Unique role identifier inside the appRoles collection. You must specify a new GUID identifier when you create a new app role. | string<br /><br />Constraints: <br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$`<br /> |
| isEnabled | When creating or updating an app role, this must be set to true (which is the default). To delete a role, this must first be set to false. At that point, in a subsequent call, this role may be removed. | bool |
| value | Specifies the value to include in the roles claim in ID tokens and access tokens authenticating an assigned user or service principal. Must not exceed 120 characters in length. Allowed characters are : ! # $ % & ' ( ) * + , -. / : ;  =  ? @ [ ] ^ + _  {  } ~, and characters in the ranges 0-9, A-Z and a-z. Any other character, including the space character, aren't allowed. May not begin with .. | string |

### MicrosoftGraphAuthenticationBehaviors

| Name | Description | Value |
| ---- | ----------- | ------------ |
| blockAzureADGraphAccess |  | bool |
| removeUnverifiedEmailClaim | Removes the email claim from tokens sent to an application when the email address's domain can't be verified. | bool |
| requireClientServicePrincipal | Requires multitenant applications to have a service principal in the resource tenant as part of authorization checks before they're granted access tokens. This property is only modifiable for multi-tenant resource applications that rely on access from clients without a service principal and had this behavior as set to false by Microsoft. Tenant administrators should respond to security advisories sent through Azure Health Service events and the Microsoft 365 message center. | bool |

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
| key | Value for the key credential. Should be a Base64 encoded value. From a .cer certificate, you can read the key using the Convert.ToBase64String() method. For more information, see Get the certificate key. | string |
| keyId | The unique identifier for the key. | string<br /><br />Constraints: <br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$`<br /> |
| startDateTime | The date and time at which the credential becomes valid.The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z. | string |
| type | The type of key credential; for example, Symmetric, AsymmetricX509Cert, or X509CertAndPassword. | string |
| usage | A string that describes the purpose for which the key can be used; for example, None​, Verify​, PairwiseIdentifier​, Delegation​, Decrypt​, Encrypt​, HashedIdentifier​, SelfSignedTls, or Sign. If usage is Sign​, the type should be X509CertAndPassword​, and the passwordCredentials​ for signing should be defined. | string |

### MicrosoftGraphOptionalClaim

| Name | Description | Value |
| ---- | ----------- | ------------ |
| additionalProperties | Additional properties of the claim. If a property exists in this collection, it modifies the behavior of the optional claim specified in the name property. | string[] |
| essential | If the value is true, the claim specified by the client is necessary to ensure a smooth authorization experience for the specific task requested by the end user. The default value is false. | bool |
| name | The name of the optional claim. | string |
| source | The source (directory object) of the claim. There are predefined claims and user-defined claims from extension properties. If the source value is null, the claim is a predefined optional claim. If the source value is user, the value in the name property is the extension property from the user object. | string |

### MicrosoftGraphOptionalClaims

| Name | Description | Value |
| ---- | ----------- | ------------ |
| accessToken | The optional claims returned in the JWT access token. | [MicrosoftGraphOptionalClaim](#microsoftgraphoptionalclaim)[] |
| idToken | The optional claims returned in the JWT ID token. | [MicrosoftGraphOptionalClaim](#microsoftgraphoptionalclaim)[] |
| saml2Token | The optional claims returned in the SAML token. | [MicrosoftGraphOptionalClaim](#microsoftgraphoptionalclaim)[] |

### MicrosoftGraphParentalControlSettings

| Name | Description | Value |
| ---- | ----------- | ------------ |
| countriesBlockedForMinors | Specifies the two-letter ISO country codes. Access to the application will be blocked for minors from the countries specified in this list. | string[] |
| legalAgeGroupRule | Specifies the legal age group rule that applies to users of the app. Can be set to one of the following values: ValueDescriptionAllowDefault. Enforces the legal minimum. This means parental consent is required for minors in the European Union and Korea.RequireConsentForPrivacyServicesEnforces the user to specify date of birth to comply with COPPA rules. RequireConsentForMinorsRequires parental consent for ages below 18, regardless of country minor rules.RequireConsentForKidsRequires parental consent for ages below 14, regardless of country minor rules.BlockMinorsBlocks minors from using the app. | string |

### MicrosoftGraphPasswordCredential

| Name | Description | Value |
| ---- | ----------- | ------------ |
| displayName | Friendly name for the password. Optional. | string |
| endDateTime | The date and time at which the password expires represented using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z. Optional. | string |
| keyId | The unique identifier for the password. | string<br /><br />Constraints: <br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$`<br /> |
| startDateTime | The date and time at which the password becomes valid. The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z. Optional. | string |

### MicrosoftGraphPublicClientApplication

| Name | Description | Value |
| ---- | ----------- | ------------ |
| redirectUris | Specifies the URLs where user tokens are sent for sign-in, or the redirect URIs where OAuth 2.0 authorization codes and access tokens are sent. | string[] |

### MicrosoftGraphRequestSignatureVerification

| Name | Description | Value |
| ---- | ----------- | ------------ |
| allowedWeakAlgorithms | Specifies whether this application accepts weak algorithms. The possible values are: rsaSha1, unknownFutureValue. | 'rsaSha1' |
| isSignedRequestRequired | Specifies whether signed authentication requests for this application should be required. | bool |

### MicrosoftGraphResourceAccess

| Name | Description | Value |
| ---- | ----------- | ------------ |
| id | The unique identifier of an app role or delegated permission exposed by the resource application. For delegated permissions, this should match the id property of one of the delegated permissions in the oauth2PermissionScopes collection of the resource application's service principal. For app roles (application permissions), this should match the id property of an app role in the appRoles collection of the resource application's service principal. | string<br /><br />Constraints: <br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$`<br /> |
| type | Specifies whether the id property references a delegated permission or an app role (application permission). The possible values are: Scope (for delegated permissions) or Role (for app roles). | string |

### MicrosoftGraphRequiredResourceAccess

| Name | Description | Value |
| ---- | ----------- | ------------ |
| resourceAccess | The list of OAuth2.0 permission scopes and app roles that the application requires from the specified resource. | [MicrosoftGraphResourceAccess](#microsoftgraphresourceaccess)[] |
| resourceAppId | The unique identifier for the resource that the application requires access to. This should be equal to the appId declared on the target resource application. | string |

### MicrosoftGraphServicePrincipalLockConfiguration

| Name | Description | Value |
| ---- | ----------- | ------------ |
| allProperties | Enables locking all sensitive properties. The sensitive properties are keyCredentials, passwordCredentials, and tokenEncryptionKeyId. | bool |
| credentialsWithUsageSign | Locks the keyCredentials and passwordCredentials properties for modification where credential usage type is Sign. | bool |
| credentialsWithUsageVerify | Locks the keyCredentials and passwordCredentials properties for modification where credential usage type is Verify. This locks OAuth service principals. | bool |
| isEnabled | Enables or disables service principal lock configuration. To allow the sensitive properties to be updated, update this property to false to disable the lock on the service principal. | bool |
| tokenEncryptionKeyId | Locks the tokenEncryptionKeyId property for modification on the service principal. | bool |

### MicrosoftGraphSpaApplication

| Name | Description | Value |
| ---- | ----------- | ------------ |
| redirectUris | Specifies the URLs where user tokens are sent for sign-in, or the redirect URIs where OAuth 2.0 authorization codes and access tokens are sent. | string[] |

### MicrosoftGraphVerifiedPublisher

| Name | Description | Value |
| ---- | ----------- | ------------ |
| addedDateTime | The timestamp when the verified publisher was first added or most recently updated. | string |
| displayName | The verified publisher name from the app publisher's Microsoft Partner Network (MPN) account. | string |
| verifiedPublisherId | The ID of the verified publisher from the app publisher's Partner Center account. | string |

### MicrosoftGraphImplicitGrantSettings

| Name | Description | Value |
| ---- | ----------- | ------------ |
| enableAccessTokenIssuance | Specifies whether this web application can request an access token using the OAuth 2.0 implicit flow. | bool |
| enableIdTokenIssuance | Specifies whether this web application can request an ID token using the OAuth 2.0 implicit flow. | bool |

### MicrosoftGraphRedirectUriSettings

| Name | Description | Value |
| ---- | ----------- | ------------ |
| index | Identifies the specific URI within the redirectURIs collection in SAML SSO flows. Defaults to null. The index is unique across all the redirectUris for the application. | int |
| uri | Specifies the URI that tokens are sent to. | string |

### MicrosoftGraphWebApplication

| Name | Description | Value |
| ---- | ----------- | ------------ |
| homePageUrl | Home page or landing page of the application. | string |
| implicitGrantSettings | Specifies whether this web application can request tokens using the OAuth 2.0 implicit flow. | [MicrosoftGraphImplicitGrantSettings](#microsoftgraphimplicitgrantsettings) |
| logoutUrl | Specifies the URL that will be used by Microsoft's authorization service to logout a user using front-channel, back-channel or SAML logout protocols. | string |
| oauth2AllowImplicitFlow |  | bool |
| redirectUris | Specifies the URLs where user tokens are sent for sign-in, or the redirect URIs where OAuth 2.0 authorization codes and access tokens are sent. | string[] |
| redirectUriSettings | Specifies the index of the URLs where user tokens are sent for sign-in. This is only valid for applications using SAML. | [MicrosoftGraphRedirectUriSettings](#microsoftgraphredirecturisettings)[] |

### MicrosoftGraphWindowsApplication

| Name | Description | Value |
| ---- | ----------- | ------------ |
| redirectUris | Specifies the URLs where user tokens are sent for sign-in or the redirect URIs where OAuth 2.0 authorization codes and access tokens are sent. Only available for applications that support the PersonalMicrosoftAccount signInAudience. | string[] |
