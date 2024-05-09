---
title: "Permissions and privileges to deploy Microsoft Graph Bicep templates"
description: "Learn the concepts of permissions and privileges that you need to deploy the resources in Microsoft Graph Bicep templates."
author: dkershaw10
ms.author: dkershaw
ms.subservice: non-product-specific
ms.topic: concept-article
ms.date: 05/08/2024
 
# customer intent: As a developer, I want to understand about Azure and Graph authorization so that I know what privileges are required to deploy the resources in my Bicep template.
---

# Permissions and privileges to deploy Microsoft Graph Bicep templates

To deploy a Bicep file, you need the privileges to deploy the resources declared in the Bicep file, and access to all operations on the `Microsoft.Resources/deployments` resource type. The mechanisms for getting the privileges to deploy Microsoft Azure resources and Microsoft Graph resources are different. Understanding this difference is important to successfully deploy Bicep files containing resources from Azure and Microsoft Graph. This article highlights those differences.

[!INCLUDE [preview-alert](../includes/preview-alert.md)]

## Access scenarios

Both Azure and Microsoft Graph APIs support [two access scenarios](/graph/auth/auth-concepts#access-scenarios), *delegated access* and *app-only access*. In delegated access, also called interactive access, the app calls an API on behalf of a signed-in user. In app-only access, also called non-interactive access, the app calls an API with its own identity, without a signed in user. Both access scenarios are supported to deploy a Bicep file.

## Permission types

To support delegated and app-only access scenarios, Microsoft Graph APIs use two types of permissions, *delegated permissions* and *application permissions*, respectively. Azure APIs provide only one delegated permission and no application permissions.

Learn more about the [Microsoft Graph permission types](/graph/permissions-overview#permission-types) with examples and comparisons of the two types.

## Permissions for delegated or interactive deployments

In interactive deployments, the privileges that an app has to act on behalf of a user is determined by the delegated permissions, or OAuth 2.0 scopes, that the app is granted *and* the user's own permissions. The granted OAuth 2.0 permission scopes are present as the *scp* claim in the access token that API services receive for authorizing the client app's request.

Azure Resource Manager APIs only provide one delegated permission, called *user_impersonation*. The signed-in user's own permissions are determined by the [Azure built-in roles](/azure/role-based-access-control/built-in-roles) they're assigned. The privileges that an app has to act on behalf of a user are determined by the Azure built-in roles assigned to the signed-in user.

Microsoft Graph APIs provide many [granular delegated permissions](/graph/permissions-reference#all-permissions) mainly at a resource type scope. The signed-in user's own permissions are determined by the roles that they're assigned in the services that comprise Microsoft Graph, such as [Microsoft Entra](/entra/identity/role-based-access-control/permissions-reference), Teams, Exchange, and SharePoint. The privileges that an app has to act on behalf of a user are constrained to a subset of the user's permissions based on the granted delegated permissions.

Only Azure PowerShell and Azure CLI are supported for interactive deployments. These apps have been granted the necessary Azure Resource Manager delegated permissions and Microsoft Graph delegated permissions for Microsoft Entra ID. To deploy Bicep files using Azure PowerShell or Azure CLI using interactive deployments:

- The signed-in user must be assigned the necessary [Azure built-in roles](/azure/role-based-access-control/built-in-roles) to manage the Azure resource types declared in the Bicep file.
- The signed-in user must be assigned the necessary Microsoft Graph service roles, like [Microsoft Entra built-in roles](/entra/identity/role-based-access-control/permissions-reference), to manage the Microsoft Graph resource types declared in the Bicep file.
- The signed-in user must be assigned the requisite [Azure built-in role](/azure/role-based-access-control/built-in-roles) that allows template file deployments (access to all operations on the `Microsoft.Resources/deployments` resource type).

:::image type="content" source="media/permissions-and-privileges/delegated-deployments.png" alt-text="Illustration of permissions and privileges required to deploy Azure and Microsoft Graph resources via Bicep templates in interactive scenarios":::

## Permissions for app-only or zero-touch deployments

For app-only access, the app calls the API with its own identity, without a signed in user. App-only access would typically be used for zero-touch automated deployments often driven by build pipelines or GitHub actions.

Application permissions are granted to an app by an administrator, and are present as the *roles* claim in the access token. Alternatively, application permissions might be assigned to a service's built-in or custom roles by an administrator, but don't show up as claims in the access token.

Azure Resource Manager APIs don't provide any application permissions, and authorization relies on checking which [Azure built-in roles](/azure/role-based-access-control/built-in-roles) are assigned to the client app's service principal.

Microsoft Graph APIs provide many [granular application permissions](/graph/permissions-reference#all-permissions) scoped to a resource type. When granted to the app by an administrator, those application permissions are present as *roles* claims in the access token that Microsoft Graph services use as part of their authorization flow.

To deploy Bicep files without a signed-in user:

- The app's associated service principal must be assigned the necessary [Azure built-in roles](/azure/role-based-access-control/built-in-roles) to manage the Azure resource types declared in the Bicep file.
- The app's associated service principal must be assigned the requisite [Azure built-in role](/azure/role-based-access-control/built-in-roles) that allows template file deployments (access to all operations on the `Microsoft.Resources/deployments` resource type).
- That app must be granted the requisite Microsoft Graph application permissions to manage the Microsoft Graph resource types declared in the Bicep file.

:::image type="content" source="media/permissions-and-privileges/app-only-deployments.png" alt-text="Illustration of permissions and privileges required to deploy Azure and Microsoft Graph resources via Bicep templates in app-only scenarios":::

## Enforce least privilege access

When working with Azure and Microsoft Graph APIs, it's important to follow the *principle of least privilege*. This principle states that an app should have only the permissions it needs to perform its intended function. This reduces the risk of a compromised app being able to do more damage than it should.

For Microsoft Graph Bicep resources, the least privileged permissions required for each resource type can be found in the [templates resource reference](/graph/templates/reference).

Learn more about how to [Enhance security with the principle of least privilege](/entra/identity-platform/secure-least-privileged-access).

<!--
## Related content

- [How to configure zero-touch deployments](./how-to-auth-zero-touch-deployments.md)
-->