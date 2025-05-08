# Create a client app with an X509 certificate from Key Vault as the credential

This template creates a client app with a key credential, created and sourced from a Key Vault.

## Details

The template creates a Key Vault, through which the authorized managed identity can add an X509 certificate (if it doesn't exist) and get the certificate's public key (base64 encoded), along with the thumbprint and other metadata. These Key Vault operations are not currently supported in Bicep, so the template file makes use of a deployment script.

Finally the template creates the client application resource using the certificate public key as its credential, followed
by creation of the service principal.

### Prerequisites

- A valid **Azure subscription**: If you don't own an Azure subscription, [create a free account](https://azure.microsoft.com/free/) before you begin.
- An **Azure resource group** that you own under the valid Azure subscription.
- [Bicep tools for authoring and deployment](https://learn.microsoft.com/graph/templates/quickstart-install-bicep-tools). The minimum required Bicep version is [v0.32.4](https://github.com/Azure/bicep/releases/tag/v0.32.4).
- Have the requisite **Microsoft Entra roles** to deploy this template:
  - Permissions to create applications. [Users have this permission by default](https://learn.microsoft.com/entra/fundamentals/users-default-permissions#compare-member-and-guest-default-permissions). However, [admins can turn off this default](https://learn.microsoft.com/entra/fundamentals/users-default-permissions#restrict-member-users-default-permissions) in which case you need to be assigned at least the [Application Developer](https://learn.microsoft.com/entra/identity/role-based-access-control/permissions-reference#application-developer) role.

### Deploy the template

#### Az CLI

You can deploy the template with the following Azure CLI command (replace `<resource-group>` with the necessary values for your deployment). This deployment uses a parameter file, main.bicepparam, where default values may also be changed.  Since the parameter file references the Bicep template file, there's no need
to use the `--template-file` switch.

```sh
az deployment group create --resource-group <resource-group> --parameter main.bicepparam --verbose
```

#### Az Powershell

```powershell
New-AzResourceGroupDeployment -ResourceGroupName bicep-deployments -TemplateFile .\main.bicep -TemplateParameterFile .\main.bicepparam -Verbose
```

[no-azure-sub]:https://learn.microsoft.com/graph/templates/how-to-deploy-without-azure-sub?view=graph-bicep-1.0&tabs=CLI