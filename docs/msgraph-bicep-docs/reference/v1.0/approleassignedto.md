---

title: Microsoft.Graph/appRoleAssignedTo
description: Microsoft.Graph/appRoleAssignedTo syntax and properties to use in Bicep templates for deploying the resource.
ms.topic: reference
ms.subservice: entra-applications
ms.date: 5/8/2024
---
# Microsoft.Graph appRoleAssignedTo


## Permissions

[!INCLUDE [permissions-intro](../../includes/permissions-intro.md)]

[!INCLUDE [permissions-table](~/../microsoft-graph/api-reference/v1.0/includes/permissions/serviceprincipal-post-approleassignedto-permissions.md)]

## Resource format

To create a Microsoft.Graph/appRoleAssignedTo resource, add the following Bicep to your template.

```bicep
resource symbolicname 'Microsoft.Graph/appRoleAssignedTo@v1.0' = {
  appRoleId: 'string'
  principalId: 'string'
  resourceDisplayName: 'string'
  resourceId: 'string'
}
```

## Property values

### appRoleAssignedTo

| Name | Description | Value |
| ---- | ----------- | ------------ |
| appRoleId | The identifier (id) for the app role which is assigned to the principal. This app role must be exposed in the appRoles property on the resource application's service principal (resourceId). If the resource application has not declared any app roles, a default app role ID of 00000000-0000-0000-0000-000000000000 can be specified to signal that the principal is assigned to the resource app without any specific app roles. Required on create. | string (required)<br /><br />Constraints: <br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$`<br /> |
| principalId | The unique identifier (id) for the user, security group, or service principal being granted the app role. Security groups with dynamic memberships are supported. Required on create. | string (required)<br /><br />Constraints: <br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$`<br /> |
| resourceDisplayName | The display name of the resource app's service principal to which the assignment is made. | string |
| resourceId | The unique identifier (id) for the resource service principal for which the assignment is made. Required on create | string (required)<br /><br />Constraints: <br />Min length = 36<br />Max length = 36<br />Pattern = `^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$`<br /> |
