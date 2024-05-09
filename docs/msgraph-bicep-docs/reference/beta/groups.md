---

title: Microsoft.Graph/groups
description: Microsoft.Graph/groups syntax and properties to use in Bicep templates for deploying the resource.
ms.topic: reference
ms.subservice: entra-groups
ms.date: 5/8/2024
---
# Microsoft.Graph groups

[!INCLUDE [beta-disclaimer](../../includes/beta-disclaimer.md)]

## Permissions

[!INCLUDE [permissions-intro](../../includes/permissions-intro.md)]

[!INCLUDE [permissions-table](~/../microsoft-graph/api-reference/beta/includes/permissions/group-post-groups-permissions.md)]

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
| classification | Describes a classification for the group (such as low, medium or high business impact) | string |
| description | An optional description for the group | string |
| displayName | The display name for the group. Required. Maximum length is 256 characters | string (required) |
| groupTypes | Specifies the group type and its membership. If the collection contains Unified, the group is a Microsoft 365 group; otherwise, it's either a security group or a distribution group. For details, see groups overview.If the collection includes DynamicMembership, the group has dynamic membership; otherwise, membership is static | string[] |
| infoCatalogs | Identifies the info segments assigned to the group | string[] |
| isAssignableToRole | Indicates whether this group can be assigned to a Microsoft Entra role. Optional. This property can only be set while creating the group and is immutable. If set to true, the securityEnabled property must also be set to true,  visibility must be Hidden, and the group cannot be a dynamic group (that is, groupTypes can't contain DynamicMembership). Only callers in Global Administrator and Privileged Role Administrator roles can set this property. The caller must also be assigned the RoleManagement.ReadWrite.Directory permission to set this property or update the membership of such groups. For more, see Using a group to manage Microsoft Entra role assignmentsUsing this feature requires a Microsoft Entra ID P1 license | bool |
| mailEnabled | Specifies whether the group is mail-enabled. Required | bool (required) |
| mailNickname | The mail alias for the group, unique for Microsoft 365 groups in the organization. Maximum length is 64 characters. This property can contain only characters in the ASCII character set 0 - 127 except the following: @ () / [] ' ; : <> , SPACE | string (required) |
| members | Direct group members, who can be users, devices, other groups, or service principals. Supports the List members, Add member, and Remove member operations. Nullable | string[] |
| membershipRule | The rule that determines members for this group if the group is a dynamic group (groupTypes contains DynamicMembership). For more information about the syntax of the membership rule, see Membership Rules syntax | string |
| membershipRuleProcessingState | Indicates whether the dynamic membership processing is on or paused. Possible values are On or Paused | string |
| onPremisesProvisioningErrors | Errors when using Microsoft synchronization product during provisioning | [MicrosoftGraphOnPremisesProvisioningError](#microsoftgraphonpremisesprovisioningerror)[] |
| organizationId |  | string |
| owners | The owners of the group who can be users or service principals. Nullable. If this property isn't specified when creating a Microsoft 365 group, the calling user is automatically assigned as the group owner | string[] |
| preferredDataLocation | The preferred data location for the Microsoft 365 group. By default, the group inherits the group creator's preferred data location. To set this property, the calling app must be granted the Directory.ReadWrite.All permission and the user be assigned one of the following Microsoft Entra roles:  Global Administrator  User Account Administrator Directory Writer  Exchange Administrator  SharePoint Administrator  For more information about this property, see OneDrive Online Multi-Geo and Create a Microsoft 365 group with a specific PDL. Nullable | string |
| preferredLanguage | The preferred language for a Microsoft 365 group. Should follow ISO 639-1 Code; for example, en-US | string |
| resourceBehaviorOptions | Specifies the group behaviors that can be set for a Microsoft 365 group during creation. This property can be set only as part of creation (POST). For the list of possible values, see Microsoft 365 group behaviors and provisioning options. | string[] |
| resourceProvisioningOptions | Specifies the group resources that are associated with the Microsoft 365 group. The possible value is Team. For more information, see Microsoft 365 group behaviors and provisioning options | string[] |
| securityEnabled | Specifies whether the group is a security group | bool (required) |
| securityIdentifier | Security identifier of the group, used in Windows scenarios | string |
| serviceProvisioningErrors | Errors published by a federated service describing a non-transient, service-specific error regarding the properties or link from a group object. | [MicrosoftGraphServiceProvisioningError](#microsoftgraphserviceprovisioningerror)[] |
| theme | Specifies a Microsoft 365 group's color theme. Possible values are Teal, Purple, Green, Blue, Pink, Orange or Red | string |
| uniqueName | The unique identifier that can be assigned to a group and used as an alternate key. Immutable | string (required) |
| visibility | Specifies the group join policy and group content visibility for groups. Possible values are: Private, Public, or HiddenMembership. HiddenMembership can be set only for Microsoft 365 groups when the groups are created. It can't be updated later. Other values of visibility can be updated after group creation. If visibility value isn't specified during group creation on Microsoft Graph, a security group is created as Private by default, and Microsoft 365 group is Public. Groups assignable to roles are always Private. To learn more, see group visibility options. Nullable. | string |
| writebackConfiguration | Specifies whether or not a group is configured to write back group object properties to on-premises Active Directory. These properties are used when group writeback is configured in the Microsoft Entra Connect sync client. | [MicrosoftGraphGroupWritebackConfiguration](#microsoftgraphgroupwritebackconfiguration) |

### MicrosoftGraphOnPremisesProvisioningError

| Name | Description | Value |
| ---- | ----------- | ------------ |
| category | Category of the provisioning error. Note: Currently, there is only one possible value. Possible value: PropertyConflict - indicates a property value is not unique. Other objects contain the same value for the property. | string |
| occurredDateTime | The date and time at which the error occurred. | string |
| propertyCausingError | Name of the directory property causing the error. Current possible values: UserPrincipalName or ProxyAddress | string |
| value | Value of the property causing the error. | string |

### MicrosoftGraphServiceProvisioningError

| Name | Description | Value |
| ---- | ----------- | ------------ |
| createdDateTime | The date and time at which the error occurred. | string |
| isResolved | Indicates whether the Error has been attended to. | bool |
| serviceInstance | Qualified service instance (for example, 'SharePoint/Dublin') that published the service error information. | string |

### MicrosoftGraphGroupWritebackConfiguration

| Name | Description | Value |
| ---- | ----------- | ------------ |
| isEnabled | Indicates whether writeback of cloud groups to on-premise Active Directory is enabled. Default value is true for Microsoft 365 groups and false for security groups. | bool |
| onPremisesGroupType | Indicates the target on-premises group type the cloud object is written back as. Nullable. The possible values are: universalDistributionGroup, universalSecurityGroup, universalMailEnabledSecurityGroup.If the cloud group is a unified (Microsoft 365) group, this property can be one of the following: universalDistributionGroup, universalSecurityGroup, universalMailEnabledSecurityGroup. Microsoft Entra security groups can be written back as universalSecurityGroup. If isEnabled or the NewUnifiedGroupWritebackDefault group setting is true but this property isn't explicitly configured: Microsoft 365 groups are written back as universalDistributionGroup by defaultSecurity groups are written back as universalSecurityGroup by default | string |
