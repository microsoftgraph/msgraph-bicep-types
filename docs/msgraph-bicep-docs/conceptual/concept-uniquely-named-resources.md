---
title: "Uniquely named resources"
description: "Uniquely named resources."
author: dkershaw10
ms.author: dkershaw
ms.service: microsoft-graph-bicep
ms.topic: concept-article
ms.date: 05/08/2024
 
# customer intent: As a developer, I want to understand how resource keys work in Microsoft Graph so that I know how to reference them.
---

# Uniquely named resources

This article compares resource unique key strategies in Microsoft Azure APIs and Microsoft Graph APIs and the changes made to Microsoft Graph APIs to enable them to be used in declarative infrastructure-as-code template files, such as Bicep files. It also explains how these changes can be used to reference existing Microsoft Graph resources created via mechanisms other than Bicep file deployment.

## Azure and Microsoft Graph resource keys

Microsoft Azure and Microsoft Graph APIs use subtly different mechanisms to create resources. These differences become more apparent when attempting to declare both these resources in the same Bicep template files.

Microsoft Azure API's standard pattern to create resources is to use the HTTP PUT method with a client-provided unique key called `name`. This idempotent operation creates the resource with the provided `name` value if it doesn't exist, or update (replace) if it does exist:

```http
PUT /resourceCollection/{nameValue}
```

Microsoft Graph API's standard pattern to create resources is to use the HTTP POST method. This method isn't idempotent and returns a service-generated unique ID key called `id`.

```http
POST /resourceCollection
```

Updates to existing resources are accomplished using the HTTP PATCH method, which unlike PUT doesn't use a replacement semantic.

The Microsoft Graph creation semantics serve most developers well, but doesn't meet two key requirements for declarative file templates:

- **Repeatability**: A template file deployment should be run multiple times with the same outcome, that the deployment environment matches the resources declared in the template file. This repeatability isn't possible for nonidempotent methods like POST.
- **Client-provided keys or names**: Authoring and maintaining a declarative template file necessitates declaring resource names (or client-provided keys) upfront. For most Microsoft Graph APIs, client-provided keys aren't possible.

## Microsoft Graph client-provided keys

In addition to the standard creation pattern, some Microsoft Graph resources can specify an alternate key property to be used as a client-provided unique name. Together with a client-provided unique name, these resources support an idempotent "upsert" mechanism to create the resource if it doesn't exist or update it if it does:

```http
PATCH /resourceCollection(uniqueName='nameValue')
```

When the resource is created, a service-generated unique ID key is also set. In most cases, for Microsoft Graph resources, this alternate key property is called `uniqueName`.

Only resources that follow this pattern are exposed as Microsoft Graph Bicep types (with a few exceptions).

## Existing Microsoft Graph resources

Microsoft Graph resources created using an HTTP POST method, don't have a unique name property set.

You might want to bring those existing resources into a Bicep file so they can be managed like the other resources declared in the Bicep file. By performing a one-time backfill of an existing resource's unique name property, you can declare that resource, in a Bicep file, so that it's redeployed. Alternatively, you can reference the resource in a Bicep file using the [**existing**](/azure/azure-resource-manager/bicep/existing-resource) keyword.

Once the alternate key property is set, it can't be changed.

## Next step

> [!div class="nextstepaction"]
> [Learn how to reference existing resources](./how-to-reference-existing-resources.md)