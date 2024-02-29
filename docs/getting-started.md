# Getting started

## Pre-requisites

To use the private preview you'll need to install [Bicep tools](https://learn.microsoft.com/azure/azure-resource-manager/bicep/install).

If you already have the Bicep extension for VS Code (or Visual Studio) make sure that you have the latest version (v0.21.1 or later).
Earlier versions do not have the Microsoft Graph Bicep Extension.  We recommend you get the latest version to ensure you have the latest
features and Microsoft Graph resource type definitions.

If you are new to [Bicep](https://learn.microsoft.com/azure/azure-resource-manager/bicep/overview?tabs=bicep), we strongly recommend that you start by getting familiar with Bicep by trying out the [Bicep quickstarts](https://learn.microsoft.com//azure/azure-resource-manager/bicep/quickstart-create-bicep-use-visual-studio-code?tabs=CLI) and [Bicep tutorials](https://learn.microsoft.com/azure/azure-resource-manager/bicep/learn-bicep).

## Creating a Bicep template with Microsoft Graph Bicep types

To get the benefit of intellisense and auto-complete for the Microsoft Graph Bicep types, you need to enable some experimental features in the Bicep config. Follow the steps in this [Bicep configuration topic](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/bicep-config), to create a Bicep config file, and add:

```json
"experimentalFeaturesEnabled": {
    "extensibility": true,
    "microsoftGraphPreview": true
}
```

When you create a Bicep template, add the following statement, to make Microsoft Graph Bicep types readily accessible to the template.

```bicep
provider 'microsoftGraph@1.0.0'
```

Now, when creating a Bicep resource, the available Microsoft.Graph resource types will show up.

![image](./VS%20code%20graph%20types%20in%20bicep.jpg)

| Bicep type definitions | Microsoft Graph API (beta) reference |
|--------------|-----------|
| [applications](../generated/microsoftgraph/microsoft.graph/beta/types.md#resource-microsoftgraphapplicationsbeta) | [application resource](https://learn.microsoft.com/graph/api/resources/application?view=graph-rest-beta) |
| [servicePrincipals](../generated/microsoftgraph/microsoft.graph/beta/types.md#resource-microsoftgraphserviceprincipalsbeta) | [servicePrincipal resource](https://learn.microsoft.com/graph/api/resources/serviceprincipal?view=graph-rest-beta) |
| [groups](../generated/microsoftgraph/microsoft.graph/beta/types.md#resource-microsoftgraphgroupsbeta) | [group resource](https://learn.microsoft.com/graph/api/resources/group?view=graph-rest-beta) |
| [appRoleAssignedTo](../generated/microsoftgraph/microsoft.graph/beta/types.md#resource-microsoftgraphapproleassignedtobeta) | [appRoleAssignment resource](https://learn.microsoft.com/graph/api/resources/approleassignment?view=graph-rest-beta) |
| [oauth2PermissionGrants](../generated/microsoftgraph/microsoft.graph/beta/types.md#resource-microsoftgraphoauth2permissiongrantsbeta) | [oauth2PermissionGrant resource](https://learn.microsoft.com/graph/api/resources/oauth2permissiongrant?view=graph-rest-beta) |

## Deploying Bicep templates

Bicep templates can be deployed using [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) or [Azure PowerShell](https://learn.microsoft.com/powershell/azure/install-azure-powershell).

Make sure that you've updated Azure CLI and/or Azure PS to use the latest Bicep CLI - for Azure PS this is a [manual process](https://learn.microsoft.com/azure/azure-resource-manager/bicep/install#azure-powershell).
> **NOTE**: Deployment will only work for tenants that have been enrolled to the private preview.

## Next steps

We've created some quick-start templates to get you started.  

1. [Create an applications and service principals for a client and resource application](../quickstart-templates/application-serviceprincipal-create-client-resource/)
2. [Grant a client application access (via an app role) to a resource application](../quickstart-templates/resource-application-access-grant-to-client-application/)
3. [Create a security group with owners and members](../quickstart-templates/security-group-create-with-owners-and-members/)
4. [Assign an Azure role to a security group](../quickstart-templates/security-group-assign-azure-role/)

Feel free to contribute and share your own samples too, by creating some PRs for template examples!
