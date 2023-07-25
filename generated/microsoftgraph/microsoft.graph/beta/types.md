# Microsoft.Graph @ beta

## Resource Microsoft.Graph/applications@beta
* **Valid Scope(s)**: Unknown
### Properties
* **addIns**: [MicrosoftGraphAddIn](#microsoftgraphaddin)[]
* **api**: [MicrosoftGraphApiApplication](#microsoftgraphapiapplication)[]
* **apiVersion**: 'beta' (ReadOnly, DeployTimeConstant): The resource api version
* **appId**: string
* **applicationTemplateId**: string
* **appRoles**: [MicrosoftGraphAppRole](#microsoftgraphapprole)[]
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
* **oauth2RequirePostResponse**: bool
* **optionalClaims**: [MicrosoftGraphOptionalClaims](#microsoftgraphoptionalclaims): Properties of an optional claim.
* **parentalControlSettings**: [MicrosoftGraphParentalControlSettings](#microsoftgraphparentalcontrolsettings): Parental control settings for a device.
* **passwordCredentials**: [MicrosoftGraphPasswordCredential](#microsoftgraphpasswordcredential)[]
* **publicClient**: [MicrosoftGraphPublicClientApplication](#microsoftgraphpublicclientapplication): Properties of a public client application.
* **publisherDomain**: string
* **requestSignatureVerification**: [MicrosoftGraphRequestSignatureVerification](#microsoftgraphrequestsignatureverification): Properties of a request signature verification.
* **requiredResourceAccess**: [MicrosoftGraphRequiredResourceAccess](#microsoftgraphrequiredresourceaccess)[]
* **samlMetadataUrl**: string
* **serviceManagementReference**: string
* **signInAudience**: string
* **spa**: [MicrosoftGraphSpaApplication](#microsoftgraphspaapplication): Properties of a spa application.
* **tags**: string[]
* **tokenEncryptionKeyId**: string
* **type**: 'Microsoft.Graph/applications' (ReadOnly, DeployTimeConstant): The resource type
* **verifiedPublisher**: [MicrosoftGraphVerifiedPublisher](#microsoftgraphverifiedpublisher): Properties of a verified publisher.
* **web**: [MicrosoftGraphWebApplication](#microsoftgraphwebapplication): Properties of a web application.

## Resource Microsoft.Graph/groups@beta
* **Valid Scope(s)**: Unknown
### Properties
* **apiVersion**: 'beta' (ReadOnly, DeployTimeConstant): The resource api version
* **classification**: string
* **createdDateTime**: string (ReadOnly)
* **description**: string
* **displayName**: string (Required)
* **expirationDateTime**: string (ReadOnly)
* **groupTypes**: string[]
* **id**: string (ReadOnly, DeployTimeConstant): The resource id
* **isAssignableToRole**: bool
* **mail**: bool (ReadOnly)
* **mailEnabled**: bool (Required)
* **mailNickName**: string (Required)
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
* **owners**: string[]
* **preferredDataLocation**: string
* **preferredLanguage**: string
* **proxyAddresses**: string[] (ReadOnly)
* **renewedDateTime**: string (ReadOnly)
* **securityEnabled**: bool (Required)
* **securityIdentifier**: string
* **theme**: string
* **type**: 'Microsoft.Graph/groups' (ReadOnly, DeployTimeConstant): The resource type
* **visibility**: string

## Resource Microsoft.Graph/oauth2PermissionGrants@beta
* **Valid Scope(s)**: Unknown
### Properties
* **apiVersion**: 'beta' (ReadOnly, DeployTimeConstant): The resource api version
* **clientId**: string (Required)
* **consentType**: string (Required)
* **id**: string (ReadOnly, DeployTimeConstant): The resource id
* **name**: string: The resource name
* **principalId**: string
* **resourceId**: string
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
* **oauth2PermissionScopes**: [MicrosoftGraphPermissionScope](#microsoftgraphpermissionscope)[]
* **passwordCredentials**: [MicrosoftGraphPasswordCredential](#microsoftgraphpasswordcredential)[]
* **preferredSingleSignOnMode**: string
* **preferredTokenSigningKeyThumbprint**: string
* **replyUrls**: string[]
* **resourceSpecificApplicationPermissions**: [MicrosoftGraphResourceSpecificPermission](#microsoftgraphresourcespecificpermission)[] (ReadOnly)
* **samlSingleSignOnSettings**: [MicrosoftGraphSamlSingleSignOnSettings](#microsoftgraphsamlsinglesignonsettings)[]
* **servicePrincipalNames**: string[]
* **servicePrincipalType**: string
* **signInAudience**: string (ReadOnly)
* **tags**: string[]
* **tokenEncryptionKeyId**: string
* **type**: 'Microsoft.Graph/servicePrincipals' (ReadOnly, DeployTimeConstant): The resource type
* **verifiedPublisher**: [MicrosoftGraphVerifiedPublisher](#microsoftgraphverifiedpublisher): Properties of a verified publisher.

## Resource Microsoft.Graph/servicePrincipals/appRoleAssignments@beta
* **Valid Scope(s)**: Unknown
### Properties
* **apiVersion**: 'beta' (ReadOnly, DeployTimeConstant): The resource api version
* **appRoleId**: string (Required)
* **createdDateTime**: string (ReadOnly)
* **id**: string (ReadOnly, DeployTimeConstant): The resource id
* **name**: string: The resource name
* **principalDisplayName**: string (ReadOnly)
* **principalId**: string (Required)
* **principalType**: string (ReadOnly)
* **resourceDisplayName**: string
* **resourceId**: string (Required)
* **type**: 'Microsoft.Graph/servicePrincipals/appRoleAssignments' (ReadOnly, DeployTimeConstant): The resource type

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

## MicrosoftGraphCertification
### Properties
* **certificationDetailsUrl**: string
* **certificationExpirationDateTime**: string
* **isCertifiedByMicrosoft**: bool
* **isPublisherAttested**: bool
* **lastCertificationDateTime**: string

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

## MicrosoftGraphResourceSpecificPermission
### Properties
* **description**: string
* **displayName**: string
* **id**: string
* **isEnabled**: bool
* **value**: string

## MicrosoftGraphSamlSingleSignOnSettings
### Properties
* **relayState**: string

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
* **redirectUris**: string[]

