# Microsoft.Graph @ beta

## Resource Microsoft.Graph/applications@beta
* **Valid Scope(s)**: Unknown
### Properties
* **api**: [MicrosoftGraphApiApplication](#microsoftgraphapiapplication): Properties of an API Application.
* **apiVersion**: 'beta' (ReadOnly, DeployTimeConstant): The resource api version
* **appId**: string
* **appRoles**: [MicrosoftGraphAppRole](#microsoftgraphapprole)[]
* **authenticationBehaviors**: [MicrosoftGraphAuthenticationBehaviors](#microsoftgraphauthenticationbehaviors): Properties of authencation behaviors.
* **certification**: [MicrosoftGraphCertification](#microsoftgraphcertification) (ReadOnly): Properties of a Certification.
* **createdDateTime**: string (ReadOnly)
* **defaultRedirectUri**: string
* **description**: string
* **disabledByMicrosoftStatus**: string
* **displayName**: string (Required)
* **groupMembershipClaims**: string
* **id**: string (ReadOnly, DeployTimeConstant): The resource id
* **identifierUris**: string[]
* **info**: [MicrosoftGraphInformationalUrl](#microsoftgraphinformationalurl): Properties of an informational URL.
* **isDeviceOnlyAuthSupported**: bool
* **isFallbackPublicClient**: bool
* **keyCredentials**: [MicrosoftGraphKeyCredential](#microsoftgraphkeycredential)[]
* **logo**: string
* **name**: string (Required, DeployTimeConstant): The resource name
* **notes**: string
* **optionalClaims**: [MicrosoftGraphOptionalClaims](#microsoftgraphoptionalclaims): Properties of an optional claim.
* **parentalControlSettings**: [MicrosoftGraphParentalControlSettings](#microsoftgraphparentalcontrolsettings): Parental control settings for a device.
* **passwordCredentials**: [MicrosoftGraphPasswordCredential](#microsoftgraphpasswordcredential)[]
* **publicClient**: [MicrosoftGraphPublicClientApplication](#microsoftgraphpublicclientapplication): Properties of a public client application.
* **publisherDomain**: string
* **requestSignatureVerification**: [MicrosoftGraphRequestSignatureVerification](#microsoftgraphrequestsignatureverification): Properties of a request signature verification.
* **requiredResourceAccess**: [MicrosoftGraphRequiredResourceAccess](#microsoftgraphrequiredresourceaccess)[]
* **samlMetadataUrl**: string
* **serviceManagementReference**: string
* **servicePrincipalLockConfiguration**: [MicrosoftGraphServicePrincipalLockConfiguration](#microsoftgraphserviceprincipallockconfiguration): Specifies the sensitive properties of the app that are locked for editing on the service principal.
* **signInAudience**: string
* **spa**: [MicrosoftGraphSpaApplication](#microsoftgraphspaapplication): Properties of a spa application.
* **tags**: string[]
* **tokenEncryptionKeyId**: string
* **type**: 'Microsoft.Graph/applications' (ReadOnly, DeployTimeConstant): The resource type
* **verifiedPublisher**: [MicrosoftGraphVerifiedPublisher](#microsoftgraphverifiedpublisher): Properties of a verified publisher.
* **web**: [MicrosoftGraphWebApplication](#microsoftgraphwebapplication): Properties of a web application.
* **windows**: [MicrosoftGraphWindowsApplication](#microsoftgraphwindowsapplication): Represents settings for apps running Microsoft Windows and published in the Microsoft Store or Xbox games store.

## Resource Microsoft.Graph/appRoleAssignedTo@beta
* **Valid Scope(s)**: Unknown
### Properties
* **apiVersion**: 'beta' (ReadOnly, DeployTimeConstant): The resource api version
* **appRoleId**: string (Required)
* **creationTimestamp**: string (ReadOnly)
* **id**: string (ReadOnly, DeployTimeConstant): The resource id
* **name**: string: The resource name
* **principalDisplayName**: string (ReadOnly)
* **principalId**: string (Required)
* **principalType**: string (ReadOnly)
* **resourceDisplayName**: string
* **resourceId**: string (Required)
* **type**: 'Microsoft.Graph/appRoleAssignedTo' (ReadOnly, DeployTimeConstant): The resource type

## Resource Microsoft.Graph/groups@beta
* **Valid Scope(s)**: Unknown
### Properties
* **apiVersion**: 'beta' (ReadOnly, DeployTimeConstant): The resource api version
* **classification**: string
* **createdByAppId**: string (ReadOnly)
* **createdDateTime**: string (ReadOnly)
* **description**: string
* **displayName**: string (Required)
* **expirationDateTime**: string (ReadOnly)
* **groupTypes**: string[]
* **id**: string (ReadOnly, DeployTimeConstant): The resource id
* **infoCatalogs**: string[]
* **isAssignableToRole**: bool
* **isManagementRestricted**: bool (ReadOnly)
* **mail**: string (ReadOnly)
* **mailEnabled**: bool (Required)
* **mailNickname**: string (Required)
* **members**: string[]
* **membershipRule**: string
* **membershipRuleProcessingState**: string
* **name**: string (Required, DeployTimeConstant): The resource name
* **onPremisesDomainName**: string
* **onPremisesLastSyncDateTime**: string (ReadOnly)
* **onPremisesNetBiosName**: string
* **onPremisesProvisioningErrors**: [MicrosoftGraphOnPremisesProvisioningError](#microsoftgraphonpremisesprovisioningerror)[]
* **onPremisesSamAccountName**: string (ReadOnly)
* **onPremisesSecurityIdentifier**: string (ReadOnly)
* **onPremisesSyncEnabled**: bool (ReadOnly)
* **organizationId**: string
* **owners**: string[]
* **preferredDataLocation**: string
* **preferredLanguage**: string
* **proxyAddresses**: string[] (ReadOnly)
* **renewedDateTime**: string (ReadOnly)
* **securityEnabled**: bool (Required)
* **securityIdentifier**: string
* **serviceProvisioningErrors**: [MicrosoftGraphServiceProvisioningError](#microsoftgraphserviceprovisioningerror)[]
* **theme**: string
* **type**: 'Microsoft.Graph/groups' (ReadOnly, DeployTimeConstant): The resource type
* **visibility**: string
* **writebackConfiguration**: [MicrosoftGraphGroupWritebackConfiguration](#microsoftgraphgroupwritebackconfiguration): Indicates whether writeback of cloud groups to on-premise Active Directory is enabled and the target group type for the on-premise group.

## Resource Microsoft.Graph/oauth2PermissionGrants@beta
* **Valid Scope(s)**: Unknown
### Properties
* **apiVersion**: 'beta' (ReadOnly, DeployTimeConstant): The resource api version
* **clientId**: string (Required)
* **consentType**: string (Required)
* **id**: string (ReadOnly, DeployTimeConstant): The resource id
* **name**: string: The resource name
* **principalId**: string
* **resourceId**: string (Required)
* **scope**: string
* **type**: 'Microsoft.Graph/oauth2PermissionGrants' (ReadOnly, DeployTimeConstant): The resource type

## Resource Microsoft.Graph/servicePrincipals@beta
* **Valid Scope(s)**: Unknown
### Properties
* **accountEnabled**: bool
* **addIns**: [MicrosoftGraphAddIn](#microsoftgraphaddin)[]
* **alternativeNames**: string[]
* **apiVersion**: 'beta' (ReadOnly, DeployTimeConstant): The resource api version
* **appDescription**: string
* **appDisplayName**: string
* **appId**: string (Required)
* **applicationTemplateId**: string (ReadOnly)
* **appOwnerOrganizationId**: string
* **appRoleAssignmentRequired**: bool
* **appRoles**: [MicrosoftGraphAppRole](#microsoftgraphapprole)[]
* **customSecurityAttributes**: any: An open complex type that holds the value of a custom security attribute that is assigned to a directory object.
* **description**: string
* **disabledByMicrosoftStatus**: string
* **displayName**: string
* **homepage**: string
* **id**: string (ReadOnly, DeployTimeConstant): The resource id
* **info**: [MicrosoftGraphInformationalUrl](#microsoftgraphinformationalurl): Properties of an informational URL.
* **keyCredentials**: [MicrosoftGraphKeyCredential](#microsoftgraphkeycredential)[]
* **loginUrl**: string
* **logoutUrl**: string
* **name**: string: The resource name
* **notes**: string
* **notificationEmailAddresses**: string[]
* **passwordCredentials**: [MicrosoftGraphPasswordCredential](#microsoftgraphpasswordcredential)[]
* **preferredSingleSignOnMode**: string
* **preferredTokenSigningKeyEndDateTime**: string
* **preferredTokenSigningKeyThumbprint**: string
* **publishedPermissionScopes**: [MicrosoftGraphPermissionScope](#microsoftgraphpermissionscope)[]
* **publisherName**: string
* **replyUrls**: string[]
* **samlMetadataUrl**: string
* **samlSingleSignOnSettings**: [MicrosoftGraphSamlSingleSignOnSettings](#microsoftgraphsamlsinglesignonsettings)[]
* **servicePrincipalNames**: string[]
* **servicePrincipalType**: string
* **signInAudience**: string (ReadOnly)
* **tags**: string[]
* **tokenEncryptionKeyId**: string
* **type**: 'Microsoft.Graph/servicePrincipals' (ReadOnly, DeployTimeConstant): The resource type
* **verifiedPublisher**: [MicrosoftGraphVerifiedPublisher](#microsoftgraphverifiedpublisher): Properties of a verified publisher.

## MicrosoftGraphAddIn
### Properties
* **id**: string
* **properties**: [MicrosoftGraphKeyValue](#microsoftgraphkeyvalue)[]
* **type**: string

## MicrosoftGraphApiApplication
### Properties
* **acceptMappedClaims**: bool
* **knownClientApplications**: string[]
* **oauth2PermissionScopes**: [MicrosoftGraphPermissionScope](#microsoftgraphpermissionscope)[]
* **preAuthorizedApplications**: [MicrosoftGraphPreAuthorizedApplication](#microsoftgraphpreauthorizedapplication)[]
* **requestedAccessTokenVersion**: int

## MicrosoftGraphAppRole
### Properties
* **allowedMemberTypes**: string[]
* **description**: string
* **displayName**: string
* **id**: string
* **isEnabled**: bool
* **origin**: string (ReadOnly)
* **value**: string

## MicrosoftGraphAuthenticationBehaviors
### Properties
* **removeUnverifiedEmailClaim**: bool
* **requireClientServicePrincipal**: bool

## MicrosoftGraphCertification
### Properties
* **certificationDetailsUrl**: string
* **certificationExpirationDateTime**: string
* **isCertifiedByMicrosoft**: bool
* **isPublisherAttested**: bool
* **lastCertificationDateTime**: string

## MicrosoftGraphGroupWritebackConfiguration
### Properties
* **isEnabled**: bool
* **onPremisesGroupType**: string

## MicrosoftGraphImplicitGrantSettings
### Properties
* **enableAccessTokenIssuance**: bool
* **enableIdTokenIssuance**: bool

## MicrosoftGraphInformationalUrl
### Properties
* **logoUrl**: string (ReadOnly)
* **marketingUrl**: string
* **privacyStatementUrl**: string
* **supportUrl**: string
* **termsOfServiceUrl**: string

## MicrosoftGraphKeyCredential
### Properties
* **customKeyIdentifier**: string
* **displayName**: string
* **endDateTime**: string
* **key**: string
* **keyId**: string
* **startDateTime**: string
* **type**: string
* **usage**: string

## MicrosoftGraphKeyValue
### Properties
* **key**: string
* **value**: string

## MicrosoftGraphOnPremisesProvisioningError
### Properties
* **category**: string
* **occurredDateTime**: string
* **propertyCausingError**: string
* **value**: string

## MicrosoftGraphOptionalClaim
### Properties
* **additionalProperties**: string[]
* **essential**: bool
* **name**: string
* **source**: string

## MicrosoftGraphOptionalClaims
### Properties
* **accessToken**: [MicrosoftGraphOptionalClaim](#microsoftgraphoptionalclaim)[]
* **idToken**: [MicrosoftGraphOptionalClaim](#microsoftgraphoptionalclaim)[]
* **saml2Token**: [MicrosoftGraphOptionalClaim](#microsoftgraphoptionalclaim)[]

## MicrosoftGraphParentalControlSettings
### Properties
* **countriesBlockedForMinors**: string[]
* **legalAgeGroupRule**: string

## MicrosoftGraphPasswordCredential
### Properties
* **displayName**: string
* **endDateTime**: string
* **hint**: string (ReadOnly)
* **keyId**: string
* **secretText**: string (ReadOnly)
* **startDateTime**: string

## MicrosoftGraphPermissionScope
### Properties
* **adminConsentDescription**: string
* **adminConsentDisplayName**: string
* **id**: string
* **isEnabled**: bool
* **origin**: string
* **type**: string
* **userConsentDescription**: string
* **userConsentDisplayName**: string
* **value**: string

## MicrosoftGraphPreAuthorizedApplication
### Properties
* **appId**: string
* **delegatedPermissionIds**: string[]

## MicrosoftGraphPublicClientApplication
### Properties
* **redirectUris**: string[]

## MicrosoftGraphRedirectUriSettings
### Properties
* **index**: int
* **uri**: string

## MicrosoftGraphRequestSignatureVerification
### Properties
* **allowedWeakAlgorithms**: 'rsaSha1' | 'unknownFutureValue' | string
* **isSignedRequestRequired**: bool

## MicrosoftGraphRequiredResourceAccess
### Properties
* **resourceAccess**: [MicrosoftGraphResourceAccess](#microsoftgraphresourceaccess)[]
* **resourceAppId**: string

## MicrosoftGraphResourceAccess
### Properties
* **id**: string
* **type**: string

## MicrosoftGraphSamlSingleSignOnSettings
### Properties
* **relayState**: string

## MicrosoftGraphServicePrincipalLockConfiguration
### Properties
* **allProperties**: bool
* **credentialsWithUsageSign**: bool
* **credentialsWithUsageVerify**: bool
* **isEnabled**: bool
* **tokenEncryptionKeyId**: bool

## MicrosoftGraphServiceProvisioningError
### Properties
* **createdDateTime**: string
* **isResolved**: bool
* **serviceInstance**: string

## MicrosoftGraphSpaApplication
### Properties
* **redirectUris**: string[]

## MicrosoftGraphVerifiedPublisher
### Properties
* **addedDateTime**: string
* **displayName**: string
* **verifiedPublisherId**: string

## MicrosoftGraphWebApplication
### Properties
* **homePageUrl**: string
* **implicitGrantSettings**: [MicrosoftGraphImplicitGrantSettings](#microsoftgraphimplicitgrantsettings): Represents the implicit grant settings for OAuth2PermissionGrant.
* **logoutUrl**: string
* **oauth2AllowImplicitFlow**: bool
* **redirectUris**: string[]
* **redirectUriSettings**: [MicrosoftGraphRedirectUriSettings](#microsoftgraphredirecturisettings)[]

## MicrosoftGraphWindowsApplication
### Properties
* **packageSid**: string (ReadOnly)
* **redirectUris**: string[]

