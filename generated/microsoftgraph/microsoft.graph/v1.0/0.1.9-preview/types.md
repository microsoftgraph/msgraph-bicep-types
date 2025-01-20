# Microsoft.Graph @ v1.0

## Resource Microsoft.Graph/applications@v1.0
* **Valid Scope(s)**: Unknown
### Properties
* **addIns**: [MicrosoftGraphAddIn](#microsoftgraphaddin)[]: Defines custom behavior that a consuming service can use to call an app in specific contexts. For example, applications that can render file streams can set the addIns property for its 'FileHandler' functionality. This lets services like Microsoft 365 call the application in the context of a document the user is working on.
* **api**: [MicrosoftGraphApiApplication](#microsoftgraphapiapplication): Specifies settings for an application that implements a web API.
* **apiVersion**: 'v1.0' (ReadOnly, DeployTimeConstant): The resource api version
* **appId**: string (ReadOnly): The unique identifier for the application that is assigned to an application by Microsoft Entra ID. Not nullable. Read-only. Alternate key
* **applicationTemplateId**: string (ReadOnly): Unique identifier of the applicationTemplate. Read-only. null if the app wasn't created from an application template.
* **appRoles**: [MicrosoftGraphAppRole](#microsoftgraphapprole)[]: The collection of roles defined for the application. With app role assignments, these roles can be assigned to users, groups, or service principals associated with other applications. Not nullable.
* **certification**: [MicrosoftGraphCertification](#microsoftgraphcertification) (ReadOnly): Specifies the certification status of the application.
* **createdDateTime**: string (ReadOnly): The date and time the application was registered. The DateTimeOffset type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z. Read-only
* **defaultRedirectUri**: string
* **deletedDateTime**: string (ReadOnly): Date and time when this object was deleted. Always null when the object hasn't been deleted.
* **description**: string: Free text field to provide a description of the application object to end users. The maximum allowed size is 1,024 characters
* **disabledByMicrosoftStatus**: string: Specifies whether Microsoft has disabled the registered application. Possible values are: null (default value), NotDisabled, and DisabledDueToViolationOfServicesAgreement (reasons include suspicious, abusive, or malicious activity, or a violation of the Microsoft Services Agreement)
* **displayName**: string (Required): The display name for the application. Maximum length is 256 characters
* **groupMembershipClaims**: string: Configures the groups claim issued in a user or OAuth 2.0 access token that the application expects. To set this attribute, use one of the following valid string values: None, SecurityGroup (for security groups and Microsoft Entra roles), All (this gets all of the security groups, distribution groups, and Microsoft Entra directory roles that the signed-in user is a member of).
* **id**: string (ReadOnly): The unique identifier for an entity. Read-only.
* **identifierUris**: string[]: Also known as App ID URI, this value is set when an application is used as a resource app. The identifierUris acts as the prefix for the scopes you reference in your API's code, and it must be globally unique. You can use the default value provided, which is in the form api://<appId>, or specify a more readable URI like https://contoso.com/api. For more information on valid identifierUris patterns and best practices, see Microsoft Entra application registration security best practices. Not nullable
* **info**: [MicrosoftGraphInformationalUrl](#microsoftgraphinformationalurl): Basic profile information of the application such as  app's marketing, support, terms of service and privacy statement URLs. The terms of service and privacy statement are surfaced to users through the user consent experience. For more info, see How to: Add Terms of service and privacy statement for registered Microsoft Entra apps
* **isDeviceOnlyAuthSupported**: bool: Specifies whether this application supports device authentication without a user. The default is false.
* **isFallbackPublicClient**: bool: Specifies the fallback application type as public client, such as an installed application running on a mobile device. The default value is false, which means the fallback application type is confidential client such as a web app. There are certain scenarios where Microsoft Entra ID can't determine the client application type. For example, the ROPC flow where it's configured without specifying a redirect URI. In those cases, Microsoft Entra ID interprets the application type based on the value of this property.
* **keyCredentials**: [MicrosoftGraphKeyCredential](#microsoftgraphkeycredential)[]: The collection of key credentials associated with the application. Not nullable
* **logo**: string: The main logo for the application. Not nullable.
* **nativeAuthenticationApisEnabled**: 'all' | 'none' | string: Specifies whether the Native Authentication APIs are enabled for the application. The possible values are: none and all. Default is none. For more information, see Native Authentication.
* **notes**: string: Notes relevant for the management of the application.
* **optionalClaims**: [MicrosoftGraphOptionalClaims](#microsoftgraphoptionalclaims): Application developers can configure optional claims in their Microsoft Entra applications to specify the claims that are sent to their application by the Microsoft security token service. For more information, see How to: Provide optional claims to your app.
* **parentalControlSettings**: [MicrosoftGraphParentalControlSettings](#microsoftgraphparentalcontrolsettings): Specifies parental control settings for an application.
* **passwordCredentials**: [MicrosoftGraphPasswordCredential](#microsoftgraphpasswordcredential)[]: The collection of password credentials associated with the application. Not nullable.
* **publicClient**: [MicrosoftGraphPublicClientApplication](#microsoftgraphpublicclientapplication): Specifies settings for installed clients such as desktop or mobile devices.
* **publisherDomain**: string (ReadOnly): The verified publisher domain for the application. Read-only. For more information, see How to: Configure an application's publisher domain
* **requestSignatureVerification**: [MicrosoftGraphRequestSignatureVerification](#microsoftgraphrequestsignatureverification): Specifies whether this application requires Microsoft Entra ID to verify the signed authentication requests.
* **requiredResourceAccess**: [MicrosoftGraphRequiredResourceAccess](#microsoftgraphrequiredresourceaccess)[]: Specifies the resources that the application needs to access. This property also specifies the set of delegated permissions and application roles that it needs for each of those resources. This configuration of access to the required resources drives the consent experience. No more than 50 resource services (APIs) can be configured. Beginning mid-October 2021, the total number of required permissions must not exceed 400. For more information, see Limits on requested permissions per app. Not nullable
* **samlMetadataUrl**: string: The URL where the service exposes SAML metadata for federation. This property is valid only for single-tenant applications. Nullable.
* **serviceManagementReference**: string: References application or service contact information from a Service or Asset Management database. Nullable.
* **servicePrincipalLockConfiguration**: [MicrosoftGraphServicePrincipalLockConfiguration](#microsoftgraphserviceprincipallockconfiguration): Specifies whether sensitive properties of a multitenant application should be locked for editing after the application is provisioned in a tenant. Nullable. null by default.
* **signInAudience**: string: Specifies the Microsoft accounts that are supported for the current application. The possible values are: AzureADMyOrg (default), AzureADMultipleOrgs, AzureADandPersonalMicrosoftAccount, and PersonalMicrosoftAccount. See more in the table. The value of this object also limits the number of permissions an app can request. For more information, see Limits on requested permissions per app. The value for this property has implications on other app object properties. As a result, if you change this property, you might need to change other properties first
* **spa**: [MicrosoftGraphSpaApplication](#microsoftgraphspaapplication): Specifies settings for a single-page application, including sign out URLs and redirect URIs for authorization codes and access tokens.
* **tags**: string[]: Custom strings that can be used to categorize and identify the application. Not nullable
* **tokenEncryptionKeyId**: string {minLength: 36, maxLength: 36, pattern: "^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$"}: Specifies the keyId of a public key from the keyCredentials collection. When configured, Microsoft Entra ID encrypts all the tokens it emits by using the key this property points to. The application code that receives the encrypted token must use the matching private key to decrypt the token before it can be used for the signed-in user.
* **type**: 'Microsoft.Graph/applications' (ReadOnly, DeployTimeConstant): The resource type
* **uniqueName**: string (Required, DeployTimeConstant, Identifier): The unique identifier that can be assigned to an application and used as an alternate key. Immutable
* **verifiedPublisher**: [MicrosoftGraphVerifiedPublisher](#microsoftgraphverifiedpublisher): Specifies the verified publisher of the application. For more information about how publisher verification helps support application security, trustworthiness, and compliance, see Publisher verification.
* **web**: [MicrosoftGraphWebApplication](#microsoftgraphwebapplication): Specifies settings for a web application.

## Resource Microsoft.Graph/applications/federatedIdentityCredentials@v1.0
* **Valid Scope(s)**: Unknown
### Properties
* **apiVersion**: 'v1.0' (ReadOnly, DeployTimeConstant): The resource api version
* **audiences**: string[] (Required): The audience that can appear in the external token. This field is mandatory and should be set to api://AzureADTokenExchange for Microsoft Entra ID. It says what Microsoft identity platform should accept in the aud claim in the incoming token. This value represents Microsoft Entra ID in your external identity provider and has no fixed value across identity providers - you might need to create a new application registration in your identity provider to serve as the audience of this token. This field can only accept a single value and has a limit of 600 characters. Required.
* **description**: string: The unvalidated description of the federated identity credential, provided by the user. It has a limit of 600 characters. Optional.
* **id**: string (ReadOnly): The unique identifier for an entity. Read-only.
* **issuer**: string (Required): The URL of the external identity provider, which must match the issuer claim of the external token being exchanged. The combination of the values of issuer and subject must be unique within the app. It has a limit of 600 characters. Required.
* **name**: string (Required, Identifier): The unique identifier for the federated identity credential, which has a limit of 120 characters and must be URL friendly. The string is immutable after it's created. Alternate key. Required. Not nullable
* **subject**: string (Required): Required. The identifier of the external software workload within the external identity provider. Like the audience value, it has no fixed format; each identity provider uses their own - sometimes a GUID, sometimes a colon delimited identifier, sometimes arbitrary strings. The value here must match the sub claim within the token presented to Microsoft Entra ID. The combination of issuer and subject must be unique within the app. It has a limit of 600 characters
* **type**: 'Microsoft.Graph/applications/federatedIdentityCredentials' (ReadOnly, DeployTimeConstant): The resource type

## Resource Microsoft.Graph/appRoleAssignedTo@v1.0
* **Valid Scope(s)**: Unknown
### Properties
* **apiVersion**: 'v1.0' (ReadOnly, DeployTimeConstant): The resource api version
* **appRoleId**: string {minLength: 36, maxLength: 36, pattern: "^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$"} (Required): The identifier (id) for the app role that's assigned to the principal. This app role must be exposed in the appRoles property on the resource application's service principal (resourceId). If the resource application hasn't declared any app roles, a default app role ID of 00000000-0000-0000-0000-000000000000 can be specified to signal that the principal is assigned to the resource app without any specific app roles. Required on create.
* **createdDateTime**: string (ReadOnly): The time when the app role assignment was created. The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z. Read-only.
* **deletedDateTime**: string (ReadOnly): Date and time when this object was deleted. Always null when the object hasn't been deleted.
* **id**: string (ReadOnly): The unique identifier for an entity. Read-only.
* **principalDisplayName**: string (ReadOnly): The display name of the user, group, or service principal that was granted the app role assignment. Maximum length is 256 characters. Read-only
* **principalId**: string {minLength: 36, maxLength: 36, pattern: "^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$"} (Required): The unique identifier (id) for the user, security group, or service principal being granted the app role. Security groups with dynamic memberships are supported. Required on create.
* **principalType**: string (ReadOnly): The type of the assigned principal. This can either be User, Group, or ServicePrincipal. Read-only.
* **resourceDisplayName**: string: The display name of the resource app's service principal to which the assignment is made. Maximum length is 256 characters.
* **resourceId**: string {minLength: 36, maxLength: 36, pattern: "^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$"} (Required): The unique identifier (id) for the resource service principal for which the assignment is made. Required on create
* **type**: 'Microsoft.Graph/appRoleAssignedTo' (ReadOnly, DeployTimeConstant): The resource type

## Resource Microsoft.Graph/groups@v1.0
* **Valid Scope(s)**: Unknown
### Properties
* **apiVersion**: 'v1.0' (ReadOnly, DeployTimeConstant): The resource api version
* **classification**: string: Describes a classification for the group (such as low, medium, or high business impact)
* **createdDateTime**: string (ReadOnly): Timestamp of when the group was created. The value can't be modified and is automatically populated when the group is created. The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on January 1, 2014 is 2014-01-01T00:00:00Z. Read-only.
* **deletedDateTime**: string (ReadOnly): Date and time when this object was deleted. Always null when the object hasn't been deleted.
* **description**: string: An optional description for the group
* **displayName**: string (Required): The display name for the group. This property is required when a group is created and can't be cleared during updates. Maximum length is 256 characters
* **expirationDateTime**: string (ReadOnly): Timestamp of when the group is set to expire. It's null for security groups, but for Microsoft 365 groups, it represents when the group is set to expire as defined in the groupLifecyclePolicy. The Timestamp type represents date and time information using ISO 8601 format and is always in UTC. For example, midnight UTC on January 1, 2014 is 2014-01-01T00:00:00Z. Read-only.
* **groupTypes**: string[]: Specifies the group type and its membership. If the collection contains Unified, the group is a Microsoft 365 group; otherwise, it's either a security group or a distribution group. For details, see groups overview.If the collection includes DynamicMembership, the group has dynamic membership; otherwise, membership is static
* **id**: string (ReadOnly): The unique identifier for an entity. Read-only.
* **isAssignableToRole**: bool: Indicates whether this group can be assigned to a Microsoft Entra role. Optional. This property can only be set while creating the group and is immutable. If set to true, the securityEnabled property must also be set to true, visibility must be Hidden, and the group can't be a dynamic group (that is, groupTypes can't contain DynamicMembership). Only callers with at least the Privileged Role Administrator role can set this property. The caller must also be assigned the RoleManagement.ReadWrite.Directory permission to set this property or update the membership of such groups. For more, see Using a group to manage Microsoft Entra role assignmentsUsing this feature requires a Microsoft Entra ID P1 license
* **isManagementRestricted**: bool
* **mail**: string (ReadOnly): The SMTP address for the group, for example, 'serviceadmins@contoso.com'. Read-only
* **mailEnabled**: bool (Required): Specifies whether the group is mail-enabled. Required
* **mailNickname**: string (Required): The mail alias for the group, unique for Microsoft 365 groups in the organization. Maximum length is 64 characters. This property can contain only characters in the ASCII character set 0 - 127 except the following characters: @ () / [] ' ; : <> , SPACE. Required
* **members**: string[]: The members of this group, who can be users, devices, other groups, or service principals. Supports the List members, Add member, and Remove member operations. Nullable
* **membershipRule**: string: The rule that determines members for this group if the group is a dynamic group (groupTypes contains DynamicMembership). For more information about the syntax of the membership rule, see Membership Rules syntax
* **membershipRuleProcessingState**: string: Indicates whether the dynamic membership processing is on or paused. Possible values are On or Paused
* **onPremisesDomainName**: string (ReadOnly): Contains the on-premises domain FQDN, also called dnsDomainName synchronized from the on-premises directory. Read-only.
* **onPremisesLastSyncDateTime**: string (ReadOnly): Indicates the last time at which the group was synced with the on-premises directory. The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on January 1, 2014 is 2014-01-01T00:00:00Z. Read-only
* **onPremisesNetBiosName**: string (ReadOnly): Contains the on-premises netBios name synchronized from the on-premises directory. Read-only.
* **onPremisesProvisioningErrors**: [MicrosoftGraphOnPremisesProvisioningError](#microsoftgraphonpremisesprovisioningerror)[] (ReadOnly): Errors when using Microsoft synchronization product during provisioning
* **onPremisesSamAccountName**: string (ReadOnly): Contains the on-premises SAM account name synchronized from the on-premises directory. Read-only.
* **onPremisesSecurityIdentifier**: string (ReadOnly): Contains the on-premises security identifier (SID) for the group synchronized from on-premises to the cloud. Read-only
* **onPremisesSyncEnabled**: bool (ReadOnly): true if this group is synced from an on-premises directory; false if this group was originally synced from an on-premises directory but is no longer synced; null if this object has never synced from an on-premises directory (default). Read-only
* **owners**: string[]: The owners of the group who can be users or service principals. Limited to 100 owners. Nullable. If this property isn't specified when creating a Microsoft 365 group the calling user (admin or non-admin) is automatically assigned as the group owner. A non-admin user can't explicitly add themselves to this collection when they're creating the group. For more information, see the related known issue. For security groups, the admin user isn't automatically added to this collection. For more information, see the related known issue
* **preferredDataLocation**: string: The preferred data location for the Microsoft 365 group. By default, the group inherits the group creator's preferred data location. To set this property, the calling app must be granted the Directory.ReadWrite.All permission and the user be assigned at least one of the following Microsoft Entra roles: User Account Administrator Directory Writer  Exchange Administrator  SharePoint Administrator  For more information about this property, see OneDrive Online Multi-Geo. Nullable
* **preferredLanguage**: string: The preferred language for a Microsoft 365 group. Should follow ISO 639-1 Code; for example, en-US
* **proxyAddresses**: string[] (ReadOnly): Email addresses for the group that direct to the same group mailbox. For example: ['SMTP: bob@contoso.com', 'smtp: bob@sales.contoso.com']. The any operator is required to filter expressions on multi-valued properties. Read-only. Not nullable
* **renewedDateTime**: string (ReadOnly): Timestamp of when the group was last renewed. This value can't be modified directly and is only updated via the renew service action. The Timestamp type represents date and time information using ISO 8601 format and is always in UTC. For example, midnight UTC on January 1, 2014 is 2014-01-01T00:00:00Z. Read-only.
* **securityEnabled**: bool (Required): Specifies whether the group is a security group. Required
* **securityIdentifier**: string (ReadOnly): Security identifier of the group, used in Windows scenarios. Read-only
* **serviceProvisioningErrors**: [MicrosoftGraphServiceProvisioningError](#microsoftgraphserviceprovisioningerror)[] (ReadOnly): Errors published by a federated service describing a nontransient, service-specific error regarding the properties or link from a group object
* **theme**: string: Specifies a Microsoft 365 group's color theme. Possible values are Teal, Purple, Green, Blue, Pink, Orange, or Red
* **type**: 'Microsoft.Graph/groups' (ReadOnly, DeployTimeConstant): The resource type
* **uniqueName**: string (Required, DeployTimeConstant, Identifier): The unique identifier that can be assigned to a group and used as an alternate key. Immutable
* **visibility**: string: Specifies the group join policy and group content visibility for groups. Possible values are: Private, Public, or HiddenMembership. HiddenMembership can be set only for Microsoft 365 groups when the groups are created. It can't be updated later. Other values of visibility can be updated after group creation. If visibility value isn't specified during group creation on Microsoft Graph, a security group is created as Private by default, and the Microsoft 365 group is Public. Groups assignable to roles are always Private. To learn more, see group visibility options. Nullable.

## Resource Microsoft.Graph/oauth2PermissionGrants@v1.0
* **Valid Scope(s)**: Unknown
### Properties
* **apiVersion**: 'v1.0' (ReadOnly, DeployTimeConstant): The resource api version
* **clientId**: string (Required): The object id (not appId) of the client service principal for the application that's authorized to act on behalf of a signed-in user when accessing an API. Required
* **consentType**: string (Required): Indicates if authorization is granted for the client application to impersonate all users or only a specific user. AllPrincipals indicates authorization to impersonate all users. Principal indicates authorization to impersonate a specific user. Consent on behalf of all users can be granted by an administrator. Nonadmin users might be authorized to consent on behalf of themselves in some cases, for some delegated permissions. Required
* **id**: string (ReadOnly): The unique identifier for an entity. Read-only.
* **principalId**: string: The id of the user on behalf of whom the client is authorized to access the resource, when consentType is Principal. If consentType is AllPrincipals this value is null. Required when consentType is Principal
* **resourceId**: string (Required): The id of the resource service principal to which access is authorized. This identifies the API that the client is authorized to attempt to call on behalf of a signed-in user
* **scope**: string: A space-separated list of the claim values for delegated permissions that should be included in access tokens for the resource application (the API). For example, openid User.Read GroupMember.Read.All. Each claim value should match the value field of one of the delegated permissions defined by the API, listed in the oauth2PermissionScopes property of the resource service principal. Must not exceed 3,850 characters in length.
* **type**: 'Microsoft.Graph/oauth2PermissionGrants' (ReadOnly, DeployTimeConstant): The resource type

## Resource Microsoft.Graph/servicePrincipals@v1.0
* **Valid Scope(s)**: Unknown
### Properties
* **accountEnabled**: bool: true if the service principal account is enabled; otherwise, false. If set to false, then no users are able to sign in to this app, even if they're assigned to it
* **addIns**: [MicrosoftGraphAddIn](#microsoftgraphaddin)[]: Defines custom behavior that a consuming service can use to call an app in specific contexts. For example, applications that can render file streams may set the addIns property for its 'FileHandler' functionality. This lets services like Microsoft 365 call the application in the context of a document the user is working on.
* **alternativeNames**: string[]: Used to retrieve service principals by subscription, identify resource group and full resource IDs for managed identities
* **apiVersion**: 'v1.0' (ReadOnly, DeployTimeConstant): The resource api version
* **appDescription**: string: The description exposed by the associated application.
* **appDisplayName**: string: The display name exposed by the associated application. Maximum length is 256 characters.
* **appId**: string (Required, Identifier): The unique identifier for the associated application (its appId property). Alternate key
* **applicationTemplateId**: string (ReadOnly): Unique identifier of the applicationTemplate. Read-only. null if the service principal wasn't created from an application template.
* **appOwnerOrganizationId**: string {minLength: 36, maxLength: 36, pattern: "^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$"} (ReadOnly): Contains the tenant ID where the application is registered. This is applicable only to service principals backed by applications
* **appRoleAssignmentRequired**: bool: Specifies whether users or other service principals need to be granted an app role assignment for this service principal before users can sign in or apps can get tokens. The default value is false. Not nullable
* **appRoles**: [MicrosoftGraphAppRole](#microsoftgraphapprole)[]: The roles exposed by the application that's linked to this service principal. For more information, see the appRoles property definition on the application entity. Not nullable.
* **customSecurityAttributes**: any: An open complex type that holds the value of a custom security attribute that is assigned to a directory object. Nullable. Filter value is case sensitive. To read this property, the calling app must be assigned the CustomSecAttributeAssignment.Read.All permission. To write this property, the calling app must be assigned the CustomSecAttributeAssignment.ReadWrite.All permissions. To read or write this property in delegated scenarios, the admin must be assigned the Attribute Assignment Administrator role.
* **deletedDateTime**: string (ReadOnly): Date and time when this object was deleted. Always null when the object hasn't been deleted.
* **description**: string: Free text field to provide an internal end-user facing description of the service principal. End-user portals such MyApps displays the application description in this field. The maximum allowed size is 1,024 characters
* **disabledByMicrosoftStatus**: string: Specifies whether Microsoft has disabled the registered application. Possible values are: null (default value), NotDisabled, and DisabledDueToViolationOfServicesAgreement (reasons include suspicious, abusive, or malicious activity, or a violation of the Microsoft Services Agreement)
* **displayName**: string: The display name for the service principal
* **homepage**: string: Home page or landing page of the application.
* **id**: string (ReadOnly): The unique identifier for an entity. Read-only.
* **info**: [MicrosoftGraphInformationalUrl](#microsoftgraphinformationalurl): Basic profile information of the acquired application such as app's marketing, support, terms of service and privacy statement URLs. The terms of service and privacy statement are surfaced to users through the user consent experience. For more info, see How to: Add Terms of service and privacy statement for registered Microsoft Entra apps
* **keyCredentials**: [MicrosoftGraphKeyCredential](#microsoftgraphkeycredential)[]: The collection of key credentials associated with the service principal. Not nullable
* **loginUrl**: string: Specifies the URL where the service provider redirects the user to Microsoft Entra ID to authenticate. Microsoft Entra ID uses the URL to launch the application from Microsoft 365 or the Microsoft Entra My Apps. When blank, Microsoft Entra ID performs IdP-initiated sign-on for applications configured with SAML-based single sign-on. The user launches the application from Microsoft 365, the Microsoft Entra My Apps, or the Microsoft Entra SSO URL.
* **logoutUrl**: string: Specifies the URL that the Microsoft's authorization service uses to sign out a user using OpenID Connect front-channel, back-channel, or SAML sign out protocols.
* **notes**: string: Free text field to capture information about the service principal, typically used for operational purposes. Maximum allowed size is 1,024 characters.
* **notificationEmailAddresses**: string[]: Specifies the list of email addresses where Microsoft Entra ID sends a notification when the active certificate is near the expiration date. This is only for the certificates used to sign the SAML token issued for Microsoft Entra Gallery applications.
* **oauth2PermissionScopes**: [MicrosoftGraphPermissionScope](#microsoftgraphpermissionscope)[]: The delegated permissions exposed by the application. For more information, see the oauth2PermissionScopes property on the application entity's api property. Not nullable.
* **passwordCredentials**: [MicrosoftGraphPasswordCredential](#microsoftgraphpasswordcredential)[]: The collection of password credentials associated with the application. Not nullable.
* **preferredSingleSignOnMode**: string: Specifies the single sign-on mode configured for this application. Microsoft Entra ID uses the preferred single sign-on mode to launch the application from Microsoft 365 or the My Apps portal. The supported values are password, saml, notSupported, and oidc. Note: This field might be null for older SAML apps and for OIDC applications where it isn't set automatically.
* **preferredTokenSigningKeyThumbprint**: string: This property can be used on SAML applications (apps that have preferredSingleSignOnMode set to saml) to control which certificate is used to sign the SAML responses. For applications that aren't SAML, don't write or otherwise rely on this property.
* **replyUrls**: string[]: The URLs that user tokens are sent to for sign in with the associated application, or the redirect URIs that OAuth 2.0 authorization codes and access tokens are sent to for the associated application. Not nullable.
* **resourceSpecificApplicationPermissions**: [MicrosoftGraphResourceSpecificPermission](#microsoftgraphresourcespecificpermission)[] (ReadOnly): The resource-specific application permissions exposed by this application. Currently, resource-specific permissions are only supported for Teams apps accessing to specific chats and teams using Microsoft Graph. Read-only.
* **samlSingleSignOnSettings**: [MicrosoftGraphSamlSingleSignOnSettings](#microsoftgraphsamlsinglesignonsettings): The collection for settings related to saml single sign-on.
* **servicePrincipalNames**: string[]: Contains the list of identifiersUris, copied over from the associated application. Additional values can be added to hybrid applications. These values can be used to identify the permissions exposed by this app within Microsoft Entra ID. For example,Client apps can specify a resource URI that is based on the values of this property to acquire an access token, which is the URI returned in the 'aud' claim.The any operator is required for filter expressions on multi-valued properties. Not nullable
* **servicePrincipalType**: string: Identifies whether the service principal represents an application, a managed identity, or a legacy application. This is set by Microsoft Entra ID internally. The servicePrincipalType property can be set to three different values: Application - A service principal that represents an application or service. The appId property identifies the associated app registration, and matches the appId of an application, possibly from a different tenant. If the associated app registration is missing, tokens aren't issued for the service principal.ManagedIdentity - A service principal that represents a managed identity. Service principals representing managed identities can be granted access and permissions, but can't be updated or modified directly.Legacy - A service principal that represents an app created before app registrations, or through legacy experiences. A legacy service principal can have credentials, service principal names, reply URLs, and other properties that are editable by an authorized user, but doesn't have an associated app registration. The appId value doesn't associate the service principal with an app registration. The service principal can only be used in the tenant where it was created.SocialIdp - For internal use.
* **signInAudience**: string (ReadOnly): Specifies the Microsoft accounts that are supported for the current application. Read-only. Supported values are:AzureADMyOrg: Users with a Microsoft work or school account in my organization's Microsoft Entra tenant (single-tenant).AzureADMultipleOrgs: Users with a Microsoft work or school account in any organization's Microsoft Entra tenant (multitenant).AzureADandPersonalMicrosoftAccount: Users with a personal Microsoft account, or a work or school account in any organization's Microsoft Entra tenant.PersonalMicrosoftAccount: Users with a personal Microsoft account only.
* **tags**: string[]: Custom strings that can be used to categorize and identify the service principal. Not nullable
* **tokenEncryptionKeyId**: string {minLength: 36, maxLength: 36, pattern: "^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$"}: Specifies the keyId of a public key from the keyCredentials collection. When configured, Microsoft Entra ID issues tokens for this application encrypted using the key specified by this property. The application code that receives the encrypted token must use the matching private key to decrypt the token before it can be used for the signed-in user.
* **type**: 'Microsoft.Graph/servicePrincipals' (ReadOnly, DeployTimeConstant): The resource type
* **verifiedPublisher**: [MicrosoftGraphVerifiedPublisher](#microsoftgraphverifiedpublisher): Specifies the verified publisher of the application that's linked to this service principal.

## Resource Microsoft.Graph/users@v1.0 (ReadOnly)
* **Valid Scope(s)**: Unknown
### Properties
* **apiVersion**: 'v1.0' (ReadOnly, DeployTimeConstant): The resource api version
* **businessPhones**: string[] (ReadOnly): The telephone numbers for the user. NOTE: Although it's a string collection, only one number can be set for this property. Read-only for users synced from the on-premises directory
* **deletedDateTime**: string (ReadOnly): Date and time when this object was deleted. Always null when the object hasn't been deleted.
* **displayName**: string (ReadOnly): The name displayed in the address book for the user. This value is usually the combination of the user's first name, middle initial, and family name. This property is required when a user is created and it can't be cleared during updates. Maximum length is 256 characters
* **givenName**: string (ReadOnly): The given name (first name) of the user. Maximum length is 64 characters
* **id**: string (ReadOnly): The unique identifier for an entity. Read-only.
* **jobTitle**: string (ReadOnly): The user's job title. Maximum length is 128 characters
* **mail**: string (ReadOnly): The SMTP address for the user, for example, jeff@contoso.com. Changes to this property update the user's proxyAddresses collection to include the value as an SMTP address. This property can't contain accent characters. NOTE: We don't recommend updating this property for Azure AD B2C user profiles. Use the otherMails property instead
* **mobilePhone**: string (ReadOnly): The primary cellular telephone number for the user. Read-only for users synced from the on-premises directory. Maximum length is 64 characters
* **officeLocation**: string (ReadOnly): The office location in the user's place of business
* **preferredLanguage**: string (ReadOnly): The preferred language for the user. The preferred language format is based on RFC 4646. The name is a combination of an ISO 639 two-letter lowercase culture code associated with the language, and an ISO 3166 two-letter uppercase subculture code associated with the country or region. Example: 'en-US', or 'es-ES'
* **surname**: string (ReadOnly): The user's surname (family name or last name). Maximum length is 64 characters
* **type**: 'Microsoft.Graph/users' (ReadOnly, DeployTimeConstant): The resource type
* **userPrincipalName**: string (Required, DeployTimeConstant, Identifier): The user principal name (UPN) of the user. The UPN is an Internet-style sign-in name for the user based on the Internet standard RFC 822. By convention, this value should map to the user's email name. The general format is alias@domain, where the domain must be present in the tenant's collection of verified domains. This property is required when a user is created. The verified domains for the tenant can be accessed from the verifiedDomains property of organization.NOTE: This property can't contain accent characters. Only the following characters are allowed A - Z, a - z, 0 - 9, '. - _ ! # ^ ~. For the complete list of allowed characters, see username policies

## MicrosoftGraphAddIn
### Properties
* **id**: string {minLength: 36, maxLength: 36, pattern: "^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$"}: The unique identifier for the addIn object.
* **properties**: [MicrosoftGraphKeyValue](#microsoftgraphkeyvalue)[]: The collection of key-value pairs that define parameters that the consuming service can use or call. You must specify this property when performing a POST or a PATCH operation on the addIns collection. Required.
* **type**: string: The unique name for the functionality exposed by the app.

## MicrosoftGraphApiApplication
### Properties
* **acceptMappedClaims**: bool: When true, allows an application to use claims mapping without specifying a custom signing key.
* **knownClientApplications**: (string {minLength: 36, maxLength: 36, pattern: "^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$"})[]: Used for bundling consent if you have a solution that contains two parts: a client app and a custom web API app. If you set the appID of the client app to this value, the user only consents once to the client app. Microsoft Entra ID knows that consenting to the client means implicitly consenting to the web API and automatically provisions service principals for both APIs at the same time. Both the client and the web API app must be registered in the same tenant.
* **oauth2PermissionScopes**: [MicrosoftGraphPermissionScope](#microsoftgraphpermissionscope)[]: The definition of the delegated permissions exposed by the web API represented by this application registration. These delegated permissions may be requested by a client application, and may be granted by users or administrators during consent. Delegated permissions are sometimes referred to as OAuth 2.0 scopes.
* **preAuthorizedApplications**: [MicrosoftGraphPreAuthorizedApplication](#microsoftgraphpreauthorizedapplication)[]: Lists the client applications that are preauthorized with the specified delegated permissions to access this application's APIs. Users aren't required to consent to any preauthorized application (for the permissions specified). However, any other permissions not listed in preAuthorizedApplications (requested through incremental consent for example) will require user consent.
* **requestedAccessTokenVersion**: int: Specifies the access token version expected by this resource. This changes the version and format of the JWT produced independent of the endpoint or client used to request the access token. The endpoint used, v1.0 or v2.0, is chosen by the client and only impacts the version of id_tokens. Resources need to explicitly configure requestedAccessTokenVersion to indicate the supported access token format. Possible values for requestedAccessTokenVersion are 1, 2, or null. If the value is null, this defaults to 1, which corresponds to the v1.0 endpoint. If signInAudience on the application is configured as AzureADandPersonalMicrosoftAccount or PersonalMicrosoftAccount, the value for this property must be 2.

## MicrosoftGraphAppRole
### Properties
* **allowedMemberTypes**: string[]: Specifies whether this app role can be assigned to users and groups (by setting to ['User']), to other application's (by setting to ['Application'], or both (by setting to ['User', 'Application']). App roles supporting assignment to other applications' service principals are also known as application permissions. The 'Application' value is only supported for app roles defined on application entities.
* **description**: string: The description for the app role. This is displayed when the app role is being assigned and, if the app role functions as an application permission, during  consent experiences.
* **displayName**: string: Display name for the permission that appears in the app role assignment and consent experiences.
* **id**: string {minLength: 36, maxLength: 36, pattern: "^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$"}: Unique role identifier inside the appRoles collection. When creating a new app role, a new GUID identifier must be provided.
* **isEnabled**: bool: When creating or updating an app role, this must be set to true (which is the default). To delete a role, this must first be set to false. At that point, in a subsequent call, this role may be removed.
* **origin**: string (ReadOnly): Specifies if the app role is defined on the application object or on the servicePrincipal entity. Must not be included in any POST or PATCH requests. Read-only.
* **value**: string: Specifies the value to include in the roles claim in ID tokens and access tokens authenticating an assigned user or service principal. Must not exceed 120 characters in length. Allowed characters are : ! # $ % & ' ( ) * + , -. / : ;  =  ? @ [ ] ^ + _  {  } ~, and characters in the ranges 0-9, A-Z and a-z. Any other character, including the space character, aren't allowed. May not begin with ..

## MicrosoftGraphCertification
### Properties
* **certificationDetailsUrl**: string: URL that shows certification details for the application.
* **certificationExpirationDateTime**: string: The timestamp when the current certification for the application expires.
* **isCertifiedByMicrosoft**: bool: Indicates whether the application is certified by Microsoft.
* **isPublisherAttested**: bool: Indicates whether the application has been self-attested by the application developer or the publisher.
* **lastCertificationDateTime**: string: The timestamp when the certification for the application was most recently added or updated.

## MicrosoftGraphImplicitGrantSettings
### Properties
* **enableAccessTokenIssuance**: bool: Specifies whether this web application can request an access token using the OAuth 2.0 implicit flow.
* **enableIdTokenIssuance**: bool: Specifies whether this web application can request an ID token using the OAuth 2.0 implicit flow.

## MicrosoftGraphInformationalUrl
### Properties
* **logoUrl**: string (ReadOnly): CDN URL to the application's logo, Read-only.
* **marketingUrl**: string: Link to the application's marketing page. For example, https://www.contoso.com/app/marketing
* **privacyStatementUrl**: string: Link to the application's privacy statement. For example, https://www.contoso.com/app/privacy
* **supportUrl**: string: Link to the application's support page. For example, https://www.contoso.com/app/support
* **termsOfServiceUrl**: string: Link to the application's terms of service statement. For example, https://www.contoso.com/app/termsofservice

## MicrosoftGraphKeyCredential
### Properties
* **customKeyIdentifier**: string: A 40-character binary type that can be used to identify the credential. Optional. When not provided in the payload, defaults to the thumbprint of the certificate.
* **displayName**: string: The friendly name for the key, with a maximum length of 90 characters. Longer values are accepted but shortened. Optional.
* **endDateTime**: string: The date and time at which the credential expires. The DateTimeOffset type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z.
* **key**: string: The certificate's raw data in byte array converted to Base64 string. From a .cer certificate, you can read the key using the Convert.ToBase64String() method. For more information, see Get the certificate key.
* **keyId**: string {minLength: 36, maxLength: 36, pattern: "^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$"}: The unique identifier (GUID) for the key.
* **startDateTime**: string: The date and time at which the credential becomes valid.The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z.
* **type**: string: The type of key credential; for example, Symmetric, AsymmetricX509Cert.
* **usage**: string: A string that describes the purpose for which the key can be used; for example, Verify.

## MicrosoftGraphKeyValue
### Properties
* **key**: string: Key for the key-value pair.
* **value**: string: Value for the key-value pair.

## MicrosoftGraphOnPremisesProvisioningError
### Properties
* **category**: string: Category of the provisioning error. Note: Currently, there is only one possible value. Possible value: PropertyConflict - indicates a property value is not unique. Other objects contain the same value for the property.
* **occurredDateTime**: string: The date and time at which the error occurred.
* **propertyCausingError**: string: Name of the directory property causing the error. Current possible values: UserPrincipalName or ProxyAddress
* **value**: string: Value of the property causing the error.

## MicrosoftGraphOptionalClaim
### Properties
* **additionalProperties**: string[]: Additional properties of the claim. If a property exists in this collection, it modifies the behavior of the optional claim specified in the name property.
* **essential**: bool: If the value is true, the claim specified by the client is necessary to ensure a smooth authorization experience for the specific task requested by the end user. The default value is false.
* **name**: string: The name of the optional claim.
* **source**: string: The source (directory object) of the claim. There are predefined claims and user-defined claims from extension properties. If the source value is null, the claim is a predefined optional claim. If the source value is user, the value in the name property is the extension property from the user object.

## MicrosoftGraphOptionalClaims
### Properties
* **accessToken**: [MicrosoftGraphOptionalClaim](#microsoftgraphoptionalclaim)[]: The optional claims returned in the JWT access token.
* **idToken**: [MicrosoftGraphOptionalClaim](#microsoftgraphoptionalclaim)[]: The optional claims returned in the JWT ID token.
* **saml2Token**: [MicrosoftGraphOptionalClaim](#microsoftgraphoptionalclaim)[]: The optional claims returned in the SAML token.

## MicrosoftGraphParentalControlSettings
### Properties
* **countriesBlockedForMinors**: string[]: Specifies the two-letter ISO country codes. Access to the application will be blocked for minors from the countries specified in this list.
* **legalAgeGroupRule**: string: Specifies the legal age group rule that applies to users of the app. Can be set to one of the following values: ValueDescriptionAllowDefault. Enforces the legal minimum. This means parental consent is required for minors in the European Union and Korea.RequireConsentForPrivacyServicesEnforces the user to specify date of birth to comply with COPPA rules. RequireConsentForMinorsRequires parental consent for ages below 18, regardless of country minor rules.RequireConsentForKidsRequires parental consent for ages below 14, regardless of country minor rules.BlockMinorsBlocks minors from using the app.

## MicrosoftGraphPasswordCredential
### Properties
* **displayName**: string: Friendly name for the password. Optional.
* **endDateTime**: string: The date and time at which the password expires represented using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z. Optional.
* **hint**: string (ReadOnly): Contains the first three characters of the password. Read-only.
* **keyId**: string {minLength: 36, maxLength: 36, pattern: "^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$"}: The unique identifier for the password.
* **secretText**: string (ReadOnly): Read-only; Contains the strong passwords generated by Microsoft Entra ID that are 16-64 characters in length. The generated password value is only returned during the initial POST request to addPassword. There is no way to retrieve this password in the future.
* **startDateTime**: string: The date and time at which the password becomes valid. The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z. Optional.

## MicrosoftGraphPermissionScope
### Properties
* **adminConsentDescription**: string: A description of the delegated permissions, intended to be read by an administrator granting the permission on behalf of all users. This text appears in tenant-wide admin consent experiences.
* **adminConsentDisplayName**: string: The permission's title, intended to be read by an administrator granting the permission on behalf of all users.
* **id**: string {minLength: 36, maxLength: 36, pattern: "^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$"}: Unique delegated permission identifier inside the collection of delegated permissions defined for a resource application.
* **isEnabled**: bool: When you create or update a permission, this property must be set to true (which is the default). To delete a permission, this property must first be set to false. At that point, in a subsequent call, the permission may be removed.
* **type**: string: The possible values are: User and Admin. Specifies whether this delegated permission should be considered safe for non-admin users to consent to on behalf of themselves, or whether an administrator consent should always be required. While Microsoft Graph defines the default consent requirement for each permission, the tenant administrator may override the behavior in their organization (by allowing, restricting, or limiting user consent to this delegated permission). For more information, see Configure how users consent to applications.
* **userConsentDescription**: string: A description of the delegated permissions, intended to be read by a user granting the permission on their own behalf. This text appears in consent experiences where the user is consenting only on behalf of themselves.
* **userConsentDisplayName**: string: A title for the permission, intended to be read by a user granting the permission on their own behalf. This text appears in consent experiences where the user is consenting only on behalf of themselves.
* **value**: string: Specifies the value to include in the scp (scope) claim in access tokens. Must not exceed 120 characters in length. Allowed characters are : ! # $ % & ' ( ) * + , -. / : ;  =  ? @ [ ] ^ + _  {  } ~, and characters in the ranges 0-9, A-Z and a-z. Any other character, including the space character, aren't allowed. May not begin with ..

## MicrosoftGraphPreAuthorizedApplication
### Properties
* **appId**: string: The unique identifier for the application.
* **delegatedPermissionIds**: string[]: The unique identifier for the oauth2PermissionScopes the application requires.

## MicrosoftGraphPublicClientApplication
### Properties
* **redirectUris**: string[]: Specifies the URLs where user tokens are sent for sign-in, or the redirect URIs where OAuth 2.0 authorization codes and access tokens are sent. For iOS and macOS apps, specify the value following the syntax msauth.{BUNDLEID}://auth, replacing '{BUNDLEID}'. For example, if the bundle ID is com.microsoft.identitysample.MSALiOS, the URI is msauth.com.microsoft.identitysample.MSALiOS://auth.

## MicrosoftGraphRedirectUriSettings
### Properties
* **index**: int
* **uri**: string

## MicrosoftGraphRequestSignatureVerification
### Properties
* **allowedWeakAlgorithms**: 'rsaSha1' | string: Specifies which weak algorithms are allowed. The possible values are: rsaSha1, unknownFutureValue.
* **isSignedRequestRequired**: bool: Specifies whether signed authentication requests for this application should be required.

## MicrosoftGraphRequiredResourceAccess
### Properties
* **resourceAccess**: [MicrosoftGraphResourceAccess](#microsoftgraphresourceaccess)[]: The list of OAuth2.0 permission scopes and app roles that the application requires from the specified resource.
* **resourceAppId**: string: The unique identifier for the resource that the application requires access to. This should be equal to the appId declared on the target resource application.

## MicrosoftGraphResourceAccess
### Properties
* **id**: string {minLength: 36, maxLength: 36, pattern: "^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$"}: The unique identifier of an app role or delegated permission exposed by the resource application. For delegated permissions, this should match the id property of one of the delegated permissions in the oauth2PermissionScopes collection of the resource application's service principal. For app roles (application permissions), this should match the id property of an app role in the appRoles collection of the resource application's service principal.
* **type**: string: Specifies whether the id property references a delegated permission or an app role (application permission). The possible values are: Scope (for delegated permissions) or Role (for app roles).

## MicrosoftGraphResourceSpecificPermission
### Properties
* **description**: string: Describes the level of access that the resource-specific permission represents.
* **displayName**: string: The display name for the resource-specific permission.
* **id**: string {minLength: 36, maxLength: 36, pattern: "^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$"}: The unique identifier for the resource-specific application permission.
* **isEnabled**: bool: Indicates whether the permission is enabled.
* **value**: string: The value of the permission.

## MicrosoftGraphSamlSingleSignOnSettings
### Properties
* **relayState**: string: The relative URI the service provider would redirect to after completion of the single sign-on flow.

## MicrosoftGraphServicePrincipalLockConfiguration
### Properties
* **allProperties**: bool: Enables locking all sensitive properties. The sensitive properties are keyCredentials, passwordCredentials, and tokenEncryptionKeyId.
* **credentialsWithUsageSign**: bool: Locks the keyCredentials and passwordCredentials properties for modification where credential usage type is Sign.
* **credentialsWithUsageVerify**: bool: Locks the keyCredentials and passwordCredentials properties for modification where credential usage type is Verify. This locks OAuth service principals.
* **isEnabled**: bool: Enables or disables service principal lock configuration. To allow the sensitive properties to be updated, update this property to false to disable the lock on the service principal.
* **tokenEncryptionKeyId**: bool: Locks the tokenEncryptionKeyId property for modification on the service principal.

## MicrosoftGraphServiceProvisioningError
### Properties
* **createdDateTime**: string: The date and time at which the error occurred.
* **isResolved**: bool: Indicates whether the error has been attended to.
* **serviceInstance**: string: Qualified service instance (for example, 'SharePoint/Dublin') that published the service error information.

## MicrosoftGraphSpaApplication
### Properties
* **redirectUris**: string[]: Specifies the URLs where user tokens are sent for sign-in, or the redirect URIs where OAuth 2.0 authorization codes and access tokens are sent.

## MicrosoftGraphVerifiedPublisher
### Properties
* **addedDateTime**: string: The timestamp when the verified publisher was first added or most recently updated.
* **displayName**: string: The verified publisher name from the app publisher's Partner Center account.
* **verifiedPublisherId**: string: The ID of the verified publisher from the app publisher's Partner Center account.

## MicrosoftGraphWebApplication
### Properties
* **homePageUrl**: string: Home page or landing page of the application.
* **implicitGrantSettings**: [MicrosoftGraphImplicitGrantSettings](#microsoftgraphimplicitgrantsettings): Specifies whether this web application can request tokens using the OAuth 2.0 implicit flow.
* **logoutUrl**: string: Specifies the URL that is used by Microsoft's authorization service to log out a user using front-channel, back-channel or SAML logout protocols.
* **redirectUris**: string[]: Specifies the URLs where user tokens are sent for sign-in, or the redirect URIs where OAuth 2.0 authorization codes and access tokens are sent.
* **redirectUriSettings**: [MicrosoftGraphRedirectUriSettings](#microsoftgraphredirecturisettings)[]

