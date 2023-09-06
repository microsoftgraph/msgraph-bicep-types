# Microsoft Graph Bicep Extension (private preview)

The "Microsoft Graph Bicep Extension" enables customers to manage a limited set of Identity/Graph resources (Entra ID, formerly known as Azure AD) in Bicep templates (alongside Azure resources) through native Microsoft Graph APIs.
This unblocks Infrastructure-as-Code/DevOps outcomes for Azure customers and will close a long-standing platform gap and pain-point.

Customers can then use [Azure CLI](https://learn.microsoft.com/cli/azure/) to [deploy Bicep templates](https://learn.microsoft.com/azure/azure-resource-manager/bicep/deploy-cli) and their set of Azure and/or Identity resources.

## Supported Microsoft Graph Bicep types

* [Group](./generated/microsoftgraph/microsoft.graph/beta/types.md#resource-microsoftgraphgroupsbeta)
  * Group membership
  * Group ownership​
* [Application​](./generated/microsoftgraph/microsoft.graph/beta/types.md#resource-microsoftgraphapplicationsbeta)
* [ServicePrincipal​](./generated/microsoftgraph/microsoft.graph/beta/types.md#resource-microsoftgraphserviceprincipalsbeta)
* [Oauth2PermissionGrant](./generated/microsoftgraph/microsoft.graph/beta/types.md#resource-microsoftgraphoauth2permissiongrantsbeta)
* [AppRoleAssignedTo](./generated/microsoftgraph/microsoft.graph/beta/types.md#resource-microsoftgraphapproleassignedtobeta)

## Limitations

* Bicep types for Microsoft Graph /beta version only​.
* Deployment requires a signed-in user (zero-touch deployment is not possible with this release)​.
* Deployment in public cloud only.
* `Oauth2PermissionGrant` and `AppRoleAssignedTo` do not have client-provided keys, so the use of "existing" is not possible for these resources.
* Group membership and ownership is a non-destructive additive operation:
  * "Create" can add a maximum of 20 "relationships" (members and/or owners).
  * "Update" can add a maximum of 20 "relationships" (members and/or owners).
* Deployment stacks are not supported (they aren't yet supported for the extension framework).

## Known issues

* Removing existing `appRoles` or `oauth2PermissionScopes` from their respective collections (on the `application` resource) and redeploying will fail, as an `appRole` or an `oauth2PermissionScope` needs to first be [disabled (via the `isEnabled` property)](https://learn.microsoft.com/graph/api/resources/approle?view=graph-rest-1.0#properties) before it can be deleted.
  * Redeploying with additional `appRoles` (or `oauth2PermissionScopes`) added to the collection (in the template) is possible.
  * If any `appRoles` or `oauth2PermissionScopes` need to be removed disable those items first in the template (and deploy), before removing those items from the collection in the template (and redeploy).
* Creating `appRoles` or `oauth2PermissionScopes` requires the client to provide a GUID identifier in the request payload.
These will need to be pre-generated and tracked in the template.
* "Preview save" (pre-flight and what-if functionality) has very limited support:
  * It has limited validation of the resource type name (and does not compare against API schema).
  * It only returns the request's resource body in the response, rather than a review of the deployed resource body.

## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Trademarks

This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft 
trademarks or logos is subject to and must follow 
[Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general).
Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship.
Any use of third-party trademarks or logos are subject to those third-party's policies.
