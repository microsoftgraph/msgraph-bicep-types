---
title: "Known issues: Microsoft Graph Bicep templates"
description: Discover the known issues with Bicep templates for Microsoft Graph resources.
author: dkershaw10
ms.service: microsoft-graph-bicep
ms.topic:  troubleshooting-known-issue
ms.date: 05/08/2024
ms.author: dkershaw

# Customer intent: As a developer, I want to understand the known issues and workarounds (if they exist) for Microsoft Graph Bicep types.
---

# Known issues: Microsoft Graph Bicep templates

This article describes the known issues for Bicep templates for Microsoft Graph resources, and solutions if they exist.

## Child resources

Child resources are resources that exist only with the context of another resource. An example is [`federatedIdentityCredentials`](/graph/templates/reference/federatedidentitycredentials), which is a child resource of `applications`.

Bicep provides [three different ways to declare a child resource](/azure/azure-resource-manager/bicep/child-resource-name-type). With Bicep extensible resources like Microsoft Graph resources, not all of these mechanisms are supported.

You can resolve the authoring or deployment time child resource errors listed, by using either:

- the [within parent resource](/azure/azure-resource-manager/bicep/child-resource-name-type#within-parent-resource) mechanism (preferred), or
- the [outside parent without specifying parent property](/azure/azure-resource-manager/bicep/child-resource-name-type#full-resource-name-outside-parent) mechanism.

Whichever option you choose, the identifier property name currently only supports full resource name, like `<parent-identifier>/<child-identifier>`.

### Linting error: The property "parent" isn't allowed on objects of type "Microsoft.Graph/\<full resource name of child resource\>"

During Bicep file authoring, if you specify the `parent` property you see this linting error.
Extensible resources like Microsoft Graph resources don't have built-in support for the `parent` property like Azure resources do, so the [outside parent resource](/azure/azure-resource-manager/bicep/child-resource-name-type#outside-parent-resource) mechanism can't be supported, currently.

### Linting error: Remove unnecessary dependsOn entry '\<parent-identifier-name\>'

If the parent resource is referenced in the full resource name, then you see this linting error because the `dependsOn` property isn't necessary, as the reference implies `dependsOn`. However, if the full resource name is defined as plain text, then `dependsOn` is required, otherwise the Bicep deployment would have no idea about the dependency.

### Deployment error: Invalid identifier format for {\<parent-identifier\>/\<child-identifier\>}

This deployment error indicates that the name identifier property value for the child resource declaration isn't using the full resource name format - `<parent-identifier>/<child-identifier>`.

## Deployment Error: This application {0} isn't authorized to call Microsoft Graph using a Bicep template

When you attempt to interactively deploy a Bicep file containing Microsoft Graph resources using apps like Visual Studio Code (right-click "Deploy Bicep file...") and other custom apps, you see this error message:

```text
[{"code":"Forbidden","target":"/resources/resourceApp","message":"This application {0} is not authorized to call Microsoft Graph using a Bicep template. Currently only Azure CLI and Azure PowerShell are supported for interactive deployments using a signed-in user."}]
```

Only Azure PowerShell and Azure CLI apps are supported for interactive deployments of Microsoft Graph resources.

This restriction doesn't apply for app-only deployments (also known as zero-touch deployments or sign-in with service principals).

## Deploying with Azure PowerShell or a custom app has unexpected errors about unknown types, versions, properties, or capabilities

After you upgrade the Bicep extension for VS Code, you also need to upgrade the Bicep CLI to match the Bicep extension version to take advantage of new features or new or updated resource type definitions. If you're using Azure CLI, it warns you if a newer version is available. However, Azure PowerShell doesn't offer such a warning and the only clue you get is when the deployment fails, likely with an error to do with unknown type, version, property, or capability.

### Resolution

Upgrade your Bicep CLI version to match the Visual Studio Code Bicep extension version.

1. Check the Bicep CLI version by opening a command prompt and using:

```bicep
bicep --version
```

2. If the version number is different from the VS Code Bicep extension version number, continue to step 3 for Azure CLI and step 4 for manual install/upgrade (if you're using anything other than Azure CLI).

3. If you're using Azure CLI, you can upgrade your installed version to the latest version using the following command:

```azurecli
az bicep upgrade
```

4. If you're using Azure PowerShell or a custom app for your deployments, you need to upgrade manually. Follow the steps in [Bicep install](/azure/azure-resource-manager/bicep/install#install-manually) for your platform.

## Deployment Error: Another object with the same value for property uniqueName already exists

When redeploying a Bicep file with Microsoft Graph resources, it's possible to see this error message.

It happens if one of the Microsoft Graph resources declared in the Bicep file is deleted from the service, maybe via Microsoft Graph PowerShell, CLI, or the REST API. When the Bicep file is deployed again, the service is unable to recreate the resource because a bug in the service indicates a conflict on the unique name value between the newly created item and the one in the deleted items container.

### Resolution

There are a few options you can take:

- [Permanently delete](/graph/api/directory-deleteditems-delete) the deleted item, and then redeploy the Bicep file.
- Specify a different unique name in the Bicep file, and then redeploy.
- [Restore the deleted item](/graph/api/directory-deleteditems-restore), then redeploy the Bicep file.

## Other unsupported deployment features

The following deployment features are currently not supported for Bicep extensible resources like the Microsoft Graph resources:

- [Preview changes using the what-if check](/azure/azure-resource-manager/bicep/deploy-what-if)
- verbose output
- [Deployment stacks](/azure/azure-resource-manager/bicep/deployment-stacks.md)
- The [Azure portal deployments details](/azure/azure-resource-manager/templates/deployment-history) page only supports showing deployed Azure Resource Manager resources. Deployed Microsoft Graph resources don't appear on this page.
