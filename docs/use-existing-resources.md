# Use existing Microsoft Graph resources in Bicep templates

## Scenario

You want to track/reference existing Microsoft Graph resources (like applications or groups) using the `existing` keyword and manage (update) existing resources using a Bicep template (and the new Graph Bicep Extension).

## Problem

As part of the Graph Bicep Extension private preview, we've extended some Microsoft Graph API resource types like `group` to have a new
alternate key property called `uniqueName`. When defining a Microsoft Graph resource in the Bicep template,
the `name` property is mapped to the `uniqueName` property in the extension.
The `name` property therefore allows the template author to define a client-provided key for a resource, that can be referenced after deployment by the same template or other templates. In fact, you can see this usage in some of our quick-start templates like [this one](https://github.com/microsoftgraph/msgraph-bicep-types/tree/main/quickstart-templates/resource-application-access-grant-to-client-application).

The problem is that any Microsoft Graph resources created **outside** of a Bicep/ARM template typically do **not** have a client-provided key defined for them.

## Solution

If you want to use Bicep with any previously created resources (i.e. resources that have not been created using Bicep),
you'll first need to perform a one-off backfill of `uniqueName` for any resources that you want to track and manage through Bicep template.
`uniqueName` is immutable - so once set, it cannot be changed.

You can use tools like [Microsoft Graph Explorer](https://aka.ms/ge), [Microsoft Graph PowerShell](https://learn.microsoft.com/powershell/microsoftgraph/overview?view=graph-powershell-1.0), or Curl to find existing Microsoft Graph resources and update `uniqueName` with a value that you can then use in Bicep templates.

Let's use an example with an existing group, created through the Entra Portal, that has an `id` of "056b6fdc-ab19-4e91-9180-fa1f14c8f4fa"

### PowerShell

```powershell
Import-Module Microsoft.Graph.Beta.Groups

$params = @{
    uniqueName = "TestGroup-2023-10-10"
}
$groupId = "056b6fdc-ab19-4e91-9180-fa1f14c8f4fa"

Update-MgBetaGroup -GroupId $groupId -BodyParameter $params
```

### HTTP request

```http
PATCH https://graph.microsoft.com/beta/groups/056b6fdc-ab19-4e91-9180-fa1f14c8f4fa
Content-type: application/json
```

```json
{
   "uniqueName": "TestGroup-2023-10-10"
}
```

### Using an existing resource in Bicep

Once the group resource is "back-filled", it can be referenced by its unique name, using the `existing` keyword in a Bicep template:

```Bicep
provider microsoftGraph

@description('Group to use')
param groupName string = 'TestGroup-2023-10-10'

resource group 'Microsoft.Graph/groups@beta' existing = {
  name: groupName
}

output id string = group.id
```

And then deploy using Az PowerShell:

```PowerShell
> New-AzResourceGroupDeployment -ResourceGroupName "Bicep-test-resources" -TemplateFile ".\find-existing-group.bicep"
```

```text
DeploymentName          : find-existing-group
ResourceGroupName       : Bicep-test-resources
ProvisioningState       : Succeeded
Timestamp               : 10/10/2023 16:16:42
Mode                    : Incremental
TemplateLink            :
Parameters              :
                          Name             Type                       Value
                          ===============  =========================  ==========
                          groupName        String                     "TestGroup-2023-10-10"

Outputs                 :
                          Name             Type                       Value
                          ===============  =========================  ==========
                          id               String                     "056b6fdc-ab19-4e91-9180-fa1f14c8f4fa"
```
