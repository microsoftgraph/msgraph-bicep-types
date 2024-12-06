# Configure an application to trust a managed identity and go secret-less

## Details

[Public doc](https://learn.microsoft.com/entra/workload-id/workload-identity-federation-config-app-trust-managed-identity?tabs=microsoft-entra-admin-center)

### Prerequisites

TBD

* [Bicep tools for authoring and deployment](https://learn.microsoft.com/graph/templates/quickstart-install-bicep-tools). The minimum required Bicep version is v0.30.3.
* Have a **Microsoft Entra role** that assigns you permissions to create applications. [Users have this permission by default](https://learn.microsoft.com/entra/fundamentals/users-default-permissions#compare-member-and-guest-default-permissions). However, [admins can turn off this default](https://learn.microsoft.com/entra/fundamentals/users-default-permissions#restrict-member-users-default-permissions) in which case you need to be assigned at least the [Application Developer](https://learn.microsoft.com/entra/identity/role-based-access-control/permissions-reference#application-developer) role.

### Deploy the Bicep template

TBD
