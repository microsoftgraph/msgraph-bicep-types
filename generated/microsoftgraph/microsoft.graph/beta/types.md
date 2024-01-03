# Microsoft.Graph @ beta

## Resource Microsoft.Graph/applications@beta
* **Valid Scope(s)**: Unknown
### Properties
* **api**: [MicrosoftGraphApiApplication](#microsoftgraphapiapplication)
* **apiVersion**: 'beta' (ReadOnly, DeployTimeConstant): The resource api version
* **appId**: string (ReadOnly)
* **appRoles**: [MicrosoftGraphAppRole](#microsoftgraphapprole)[]
* **authenticationBehaviors**: [MicrosoftGraphAuthenticationBehaviors](#microsoftgraphauthenticationbehaviors)
* **certification**: [MicrosoftGraphCertification](#microsoftgraphcertification) (ReadOnly)
* **createdDateTime**: string (ReadOnly)
* **defaultRedirectUri**: string
* **deletedDateTime**: string (ReadOnly)
* **description**: string
* **disabledByMicrosoftStatus**: string
* **displayName**: string (Required)
* **groupMembershipClaims**: string
* **id**: string (ReadOnly, DeployTimeConstant): The resource id
* **identifierUris**: string[]
* **info**: [MicrosoftGraphInformationalUrl](#microsoftgraphinformationalurl)
* **isDeviceOnlyAuthSupported**: bool
* **isFallbackPublicClient**: bool
* **keyCredentials**: [MicrosoftGraphKeyCredential](#microsoftgraphkeycredential)[]
* **logo**: string
* **notes**: string
* **optionalClaims**: [MicrosoftGraphOptionalClaims](#microsoftgraphoptionalclaims)
* **parentalControlSettings**: [MicrosoftGraphParentalControlSettings](#microsoftgraphparentalcontrolsettings)
* **passwordCredentials**: [MicrosoftGraphPasswordCredential](#microsoftgraphpasswordcredential)[]
* **publicClient**: [MicrosoftGraphPublicClientApplication](#microsoftgraphpublicclientapplication)
* **publisherDomain**: string (ReadOnly)
* **requestSignatureVerification**: [MicrosoftGraphRequestSignatureVerification](#microsoftgraphrequestsignatureverification)
* **requiredResourceAccess**: [MicrosoftGraphRequiredResourceAccess](#microsoftgraphrequiredresourceaccess)[]
* **samlMetadataUrl**: string
* **serviceManagementReference**: string
* **servicePrincipalLockConfiguration**: [MicrosoftGraphServicePrincipalLockConfiguration](#microsoftgraphserviceprincipallockconfiguration)
* **signInAudience**: string
* **spa**: [MicrosoftGraphSpaApplication](#microsoftgraphspaapplication)
* **tags**: string[]
* **tokenEncryptionKeyId**: string {minLength: 36, maxLength: 36, pattern: "^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$"}
* **type**: 'Microsoft.Graph/applications' (ReadOnly, DeployTimeConstant): The resource type
* **uniqueName**: string (Required, DeployTimeConstant)
* **verifiedPublisher**: [MicrosoftGraphVerifiedPublisher](#microsoftgraphverifiedpublisher)
* **web**: [MicrosoftGraphWebApplication](#microsoftgraphwebapplication)
* **windows**: [MicrosoftGraphWindowsApplication](#microsoftgraphwindowsapplication)

## Resource Microsoft.Graph/appRoleAssignedTo@beta
* **Valid Scope(s)**: Unknown
### Properties
* **apiVersion**: 'beta' (ReadOnly, DeployTimeConstant): The resource api version
* **appRoleId**: string {minLength: 36, maxLength: 36, pattern: "^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$"} (Required)
* **creationTimestamp**: string (ReadOnly)
* **id**: string (ReadOnly, DeployTimeConstant): The resource id
* **principalDisplayName**: string (ReadOnly)
* **principalId**: string {minLength: 36, maxLength: 36, pattern: "^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$"} (Required)
* **principalType**: string (ReadOnly)
* **resourceDisplayName**: string
* **resourceId**: string {minLength: 36, maxLength: 36, pattern: "^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$"} (Required)
* **type**: 'Microsoft.Graph/appRoleAssignedTo' (ReadOnly, DeployTimeConstant): The resource type

## Resource Microsoft.Graph/groups@beta
* **Valid Scope(s)**: Unknown
### Properties
* **apiVersion**: 'beta' (ReadOnly, DeployTimeConstant): The resource api version
* **classification**: string
* **createdByAppId**: string (ReadOnly)
* **createdDateTime**: string (ReadOnly)
* **deletedDateTime**: string (ReadOnly)
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
* **onPremisesDomainName**: string (ReadOnly)
* **onPremisesLastSyncDateTime**: string (ReadOnly)
* **onPremisesNetBiosName**: string (ReadOnly)
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
* **resourceBehaviorOptions**: string[]
* **resourceProvisioningOptions**: string[]
* **securityEnabled**: bool (Required)
* **securityIdentifier**: string
* **serviceProvisioningErrors**: [MicrosoftGraphServiceProvisioningError](#microsoftgraphserviceprovisioningerror)[]
* **theme**: string
* **type**: 'Microsoft.Graph/groups' (ReadOnly, DeployTimeConstant): The resource type
* **uniqueName**: string (Required, DeployTimeConstant)
* **visibility**: string
* **writebackConfiguration**: [MicrosoftGraphGroupWritebackConfiguration](#microsoftgraphgroupwritebackconfiguration)

## Resource Microsoft.Graph/oauth2PermissionGrants@beta
* **Valid Scope(s)**: Unknown
### Properties
* **apiVersion**: 'beta' (ReadOnly, DeployTimeConstant): The resource api version
* **clientId**: string (Required)
* **consentType**: string (Required)
* **id**: string (ReadOnly, DeployTimeConstant): The resource id
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
* **appOwnerOrganizationId**: string {minLength: 36, maxLength: 36, pattern: "^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$"}
* **appRoleAssignmentRequired**: bool
* **appRoles**: [MicrosoftGraphAppRole](#microsoftgraphapprole)[]
* **deletedDateTime**: string (ReadOnly)
* **description**: string
* **disabledByMicrosoftStatus**: string
* **displayName**: string
* **homepage**: string
* **id**: string (ReadOnly, DeployTimeConstant): The resource id
* **info**: [MicrosoftGraphInformationalUrl](#microsoftgraphinformationalurl)
* **keyCredentials**: [MicrosoftGraphKeyCredential](#microsoftgraphkeycredential)[]
* **loginUrl**: string
* **logoutUrl**: string
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
* **samlSingleSignOnSettings**: [MicrosoftGraphSamlSingleSignOnSettings](#microsoftgraphsamlsinglesignonsettings)
* **servicePrincipalNames**: string[]
* **servicePrincipalType**: string
* **signInAudience**: string (ReadOnly)
* **tags**: string[]
* **tokenEncryptionKeyId**: string {minLength: 36, maxLength: 36, pattern: "^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$"}
* **type**: 'Microsoft.Graph/servicePrincipals' (ReadOnly, DeployTimeConstant): The resource type
* **verifiedPublisher**: [MicrosoftGraphVerifiedPublisher](#microsoftgraphverifiedpublisher)

## MicrosoftGraphAddIn
### Properties
* **id**: string {minLength: 36, maxLength: 36, pattern: "^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$"}
* **properties**: [MicrosoftGraphKeyValue](#microsoftgraphkeyvalue)[]
* **type**: string

## MicrosoftGraphApiApplication
### Properties
* **acceptMappedClaims**: bool
* **knownClientApplications**: (string {minLength: 36, maxLength: 36, pattern: "^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$"})[]
* **oauth2PermissionScopes**: [MicrosoftGraphPermissionScope](#microsoftgraphpermissionscope)[]
* **preAuthorizedApplications**: [MicrosoftGraphPreAuthorizedApplication](#microsoftgraphpreauthorizedapplication)[]
* **requestedAccessTokenVersion**: int

## MicrosoftGraphAppRole
### Properties
* **allowedMemberTypes**: string[]
* **description**: string
* **displayName**: string
* **id**: string {minLength: 36, maxLength: 36, pattern: "^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$"}
* **isEnabled**: bool
* **origin**: string (ReadOnly)
* **value**: string

## MicrosoftGraphAuthenticationBehaviors
### Properties
* **blockAzureADGraphAccess**: bool
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
* **keyId**: string {minLength: 36, maxLength: 36, pattern: "^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$"}
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
* **keyId**: string {minLength: 36, maxLength: 36, pattern: "^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$"}
* **secretText**: string (ReadOnly)
* **startDateTime**: string

## MicrosoftGraphPermissionScope
### Properties
* **adminConsentDescription**: string
* **adminConsentDisplayName**: string
* **id**: string {minLength: 36, maxLength: 36, pattern: "^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$"}
* **isEnabled**: bool
* **origin**: string
* **type**: string
* **userConsentDescription**: string
* **userConsentDisplayName**: string
* **value**: string

## MicrosoftGraphPreAuthorizedApplication
### Properties
* **appId**: string
* **permissionIds**: string[]

## MicrosoftGraphPublicClientApplication
### Properties
* **redirectUris**: string[]

## MicrosoftGraphRedirectUriSettings
### Properties
* **index**: int
* **uri**: string

## MicrosoftGraphRequestSignatureVerification
### Properties
* **allowedWeakAlgorithms**: 'rsaSha1' | string
* **isSignedRequestRequired**: bool

## MicrosoftGraphRequiredResourceAccess
### Properties
* **resourceAccess**: [MicrosoftGraphResourceAccess](#microsoftgraphresourceaccess)[]
* **resourceAppId**: string

## MicrosoftGraphResourceAccess
### Properties
* **id**: string {minLength: 36, maxLength: 36, pattern: "^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$"}
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
* **implicitGrantSettings**: [MicrosoftGraphImplicitGrantSettings](#microsoftgraphimplicitgrantsettings)
* **logoutUrl**: string
* **oauth2AllowImplicitFlow**: bool
* **redirectUris**: string[]
* **redirectUriSettings**: [MicrosoftGraphRedirectUriSettings](#microsoftgraphredirecturisettings)[]

## MicrosoftGraphWindowsApplication
### Properties
* **packageSid**: string (ReadOnly)
* **redirectUris**: string[]

