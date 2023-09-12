# Getting started

## Pre-requisites

To use the private preview you'll need to install [Bicep tools](https://learn.microsoft.com/azure/azure-resource-manager/bicep/install).

If you already have the Bicep extension for VS Code (or Visual Studio) make sure that you have the latest version (v0.21.1 or later).
Earlier versions do not have the Microsoft Graph Bicep Extension.

## Creating a Bicep template

To get the benefit of intellisense and auto-complete for the Microsoft Graph Bicep types, you need to enable some experimental features in the Bicep config. Follow the steps in this [Bicep configuration topic](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/bicep-config), to create a Bicep config file, and add:

```json
"experimentalFeaturesEnabled": {
    "extensibility": true,
    "microsoftGraphPreview": true
}
```

When you create a Bicep template, add the following statement, to make Microsoft Graph Bicep types readily accessible to the template.

```bicep
import 'microsoftGraph@1.0.0'
```

Now, when creating a Bicep resource, the available Microsoft.Graph resource types will show up:

* [applications](../generated/microsoftgraph/microsoft.graph/beta/types.md#resource-microsoftgraphapplicationsbeta)
* [servicePrincipals](../generated/microsoftgraph/microsoft.graph/beta/types.md#resource-microsoftgraphserviceprincipalsbeta)
* [groups](../generated/microsoftgraph/microsoft.graph/beta/types.md#resource-microsoftgraphgroupsbeta)
* [appRoleAssignedTo](../generated/microsoftgraph/microsoft.graph/beta/types.md#resource-microsoftgraphapproleassignedtobeta)
* [oauth2PermissionGrants](../generated/microsoftgraph/microsoft.graph/beta/types.md#resource-microsoftgraphoauth2permissiongrantsbeta)

## Deploying a Bicep templates

Bicep templates can be deployed using Azure CLI or PowerShell.

Deployment will only work for tenants that have been enrolled to the private preview.

## Next steps

We've created some quick-start templates to get you started.  Feel free to contribute and share your own samples too!
