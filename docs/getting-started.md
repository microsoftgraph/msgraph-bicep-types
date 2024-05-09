# Getting started

## Pre-requisites

To use the public preview you'll need to install [Bicep tools](https://learn.microsoft.com/azure/azure-resource-manager/bicep/install).

If you already have the Bicep extension for VS Code (or Visual Studio) make sure that you have the latest version ([v0.27.1](https://github.com/Azure/bicep/releases/tag/v0.27.1) or later).
We recommend you get the latest version to ensure you have the latest features, bug fixes and Microsoft Graph resource type definitions.

If you are new to [Bicep](https://learn.microsoft.com/azure/azure-resource-manager/bicep/overview?tabs=bicep), we strongly recommend that you start by getting familiar with Bicep by trying out the [Bicep quickstarts](https://learn.microsoft.com//azure/azure-resource-manager/bicep/quickstart-create-bicep-use-visual-studio-code?tabs=CLI) and [Bicep tutorials](https://learn.microsoft.com/azure/azure-resource-manager/bicep/learn-bicep).

## Creating a Bicep template with Microsoft Graph Bicep types

To get the benefit of intellisense and auto-complete for the Microsoft Graph Bicep types, you need to enable some experimental features in the Bicep config. Follow the steps in this [Bicep configuration topic](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/bicep-config), to create a Bicep config file, and add:

```json
"experimentalFeaturesEnabled": {
    "extensibility": true
}
```

When you create a Bicep template, add the following statement, to make Microsoft Graph Bicep types readily accessible to the template.

```bicep
provider microsoftGraph
```

Now, when creating a Bicep resource, the available Microsoft.Graph resource types will show up.

![image](./VS%20code%20graph%20types%20in%20bicep.jpg)

| Bicep type (beta) definitions | Microsoft Graph API (beta) reference | Bicep type (v1.0) definitions | Microsoft Graph API (v1.0) reference |
|--------------|-----------|--------------|-----------|
| [applications](../generated/microsoftgraph/microsoft.graph/beta/types.md#resource-microsoftgraphapplicationsbeta) | [application resource](https://learn.microsoft.com/graph/api/resources/application?view=graph-rest-beta) | [applications](../generated/microsoftgraph/microsoft.graph/v1.0/types.md#resource-microsoftgraphapplicationsv10) | [application resource](https://learn.microsoft.com/graph/api/resources/application?view=graph-rest-1.0) |
| [servicePrincipals](../generated/microsoftgraph/microsoft.graph/beta/types.md#resource-microsoftgraphserviceprincipalsbeta) | [servicePrincipal resource](https://learn.microsoft.com/graph/api/resources/serviceprincipal?view=graph-rest-beta) | [servicePrincipals](../generated/microsoftgraph/microsoft.graph/v1.0/types.md#resource-microsoftgraphserviceprincipalsv10) | [servicePrincipal resource](https://learn.microsoft.com/graph/api/resources/serviceprincipal?view=graph-rest-1.0) |
| [groups](../generated/microsoftgraph/microsoft.graph/beta/types.md#resource-microsoftgraphgroupsbeta) | [group resource](https://learn.microsoft.com/graph/api/resources/group?view=graph-rest-beta) | [groups](../generated/microsoftgraph/microsoft.graph/v1.0/types.md#resource-microsoftgraphgroupsv10) | [group resource](https://learn.microsoft.com/graph/api/resources/group?view=graph-rest-1.0) |
| [appRoleAssignedTo](../generated/microsoftgraph/microsoft.graph/beta/types.md#resource-microsoftgraphapproleassignedtobeta) | [appRoleAssignment resource](https://learn.microsoft.com/graph/api/resources/approleassignment?view=graph-rest-beta) | [appRoleAssignedTo](../generated/microsoftgraph/microsoft.graph/v1.0/types.md#resource-microsoftgraphapproleassignedtov10) | [appRoleAssignment resource](https://learn.microsoft.com/graph/api/resources/approleassignment?view=graph-rest-1.0) |
| [oauth2PermissionGrants](../generated/microsoftgraph/microsoft.graph/beta/types.md#resource-microsoftgraphoauth2permissiongrantsbeta) | [oauth2PermissionGrant resource](https://learn.microsoft.com/graph/api/resources/oauth2permissiongrant?view=graph-rest-beta) | [oauth2PermissionGrants](../generated/microsoftgraph/microsoft.graph/v1.0/types.md#resource-microsoftgraphoauth2permissiongrantsv10) | [oauth2PermissionGrant resource](https://learn.microsoft.com/graph/api/resources/oauth2permissiongrant?view=graph-rest-1.0) |
| [applications/federatedIdentityCredentials](../generated/microsoftgraph/microsoft.graph/beta/types.md#resource-microsoftgraphoauth2permissiongrantsbeta) | [federatedidentitycredential resource](https://learn.microsoft.com/graph/api/resources/federatedidentitycredential?view=graph-rest-beta) | [applications/federatedIdentityCredentials](../generated/microsoftgraph/microsoft.graph/v1.0/types.md#resource-microsoftgraphapplicationsfederatedidentitycredentialsv10)  | [federatedidentitycredential resource](https://learn.microsoft.com/en-us/graph/api/resources/federatedidentitycredential?view=graph-rest-1.0) |

## Deploying Bicep templates

Bicep templates can be deployed using [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) or [Azure PowerShell](https://learn.microsoft.com/powershell/azure/install-azure-powershell).

Make sure that you've updated Azure CLI and/or Azure PS to use the latest Bicep CLI - for Azure PS this is a [manual process](https://learn.microsoft.com/azure/azure-resource-manager/bicep/install#azure-powershell).
> **NOTE**: Interactive deployments - i.e. with a signed in user - will only be supported for Az PS and Az CLI (and possibly Azure Cloud Shell), for public preview, for the foreseeable future. Right-click deploy from VS Code and VS will not be supported.

## Next steps

We've created some quick-start templates to get you started.  

1. [Create an applications and service principals for a client and resource application](../quickstart-templates/application-serviceprincipal-create-client-resource/)
1. [Create an application and service principal for a client app using a key vault certificate](../quickstart-templates/create-client-app-sp-with-kv-cert/)
1. [Configure federated identity credential for GitHub Actions](../quickstart-templates/create-fic-for-github-actions/)
1. [Grant a client application access (via an app role) to a resource application](../quickstart-templates/resource-application-access-grant-to-client-application/)
1. [Create a security group with owners and members](../quickstart-templates/security-group-create-with-owners-and-members/)
1. [Assign an Azure role to a security group](../quickstart-templates/security-group-assign-azure-role/)

Feel free to contribute and share your own samples too, by creating some PRs for template examples!
