# Configure a security group's user members, referencing users by UPN

This sample demonstrates use of the read-only [`Microsoft.Graph/Users` bicep type][users-ref] which allows you to
fetch `user` resources by their user principal name (UPN).

This quickstart creates a security group and adds users, referenced via their UPNs, as members.
The list of users to be added as members are in a txt file, with each user's UPN on a separate line.
Replace the UPN values in the example "userlist.txt" file with user UPN values from your tenant, before deployment.

## Details

This template sample:

1. Creates a user UPN list from a txt file.
2. Creates/updates a security group with its members set based on the user UPN list

### Prerequisites

- A valid **Azure subscription**: If you don't own an Azure subscription, [create a free account](https://azure.microsoft.com/free/) before you begin.
- An **Azure resource group** that you own under a valid Azure subscription, or [deploy without an Azure subscription][no-azure-sub].
- [Bicep tools for authoring and deployment](https://learn.microsoft.com/graph/templates/quickstart-install-bicep-tools). The minimum required Bicep version is [v0.32.4](https://github.com/Azure/bicep/releases/tag/v0.32.4).
- Have the requisite **Microsoft Entra roles** to deploy this template:

  - Permissions to create security groups. [Users have this permission by default](https://learn.microsoft.com/entra/fundamentals/users-default-permissions#compare-member-and-guest-default-permissions). However, [admins can turn off this default](https://learn.microsoft.com/entra/fundamentals/users-default-permissions#restrict-member-users-default-permissions) in which case you need to be assigned at least the [Groups Administrator](https://learn.microsoft.com/entra/identity/role-based-access-control/permissions-reference#groups-administrator) role.

### Deploy the Bicep template

Before deploying the template, you **must** replace the UPN values in the example "userlist.txt" file with user UPN values from your tenant.

##### Az CLI

```sh
az deployment group create --resource-group <resource-group> --template-file main.bicep --parameters date='2025-01-24'
```

##### Az Powershell

```powershell
New-AzResourceGroupDeployment -ResourceGroupName <resource-group> -TemplateFile .\main.bicep -date "2025-01-24"
```

[update-only]:https://learn.microsoft.com/graph/templates/known-issues-graph-bicep#deployment-behavior-group-members-and-owners-are-append-only
[20-members]:https://learn.microsoft.com/graph/templates/limitations#no-more-than-20-members-andor-owners-can-be-declared-for-a-groups-resource
[no-azure-sub]:https://learn.microsoft.com/graph/templates/how-to-deploy-without-azure-sub?view=graph-bicep-1.0&tabs=CLI
[users-ref]:https://learn.microsoft.com/graph/templates/reference/users?view=graph-bicep-1.0