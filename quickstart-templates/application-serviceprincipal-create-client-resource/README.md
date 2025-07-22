# Create client and resource apps

This template allows you to create a client application and a resource application, along with their service principals.

## Details

The client application is created with an optional key credential. The key can be passed in as a parameter. [Get The Certificate Key](https://learn.microsoft.com/en-us/graph/applications-how-to-add-certificate?tabs=http#get-the-certificate-key) mentions the steps to get the certificate key for a self-signed certificate. Here's a basic PowerShell script to create a self-signed certificate for use in the template file:

```powershell
$certname = "AppRegTestCert"
$cert = New-SelfSignedCertificate -Subject "CN=$certname" -CertStoreLocation "Cert:\CurrentUser\My" -KeyExportPolicy Exportable -KeySpec Signature -KeyLength 2048 -KeyAlgorithm RSA -HashAlgorithm SHA256
Export-Certificate -Cert $cert -FilePath "$certname.cer"  // Exports PUBLIC cert
[convert]::ToBase64String((Get-Content "$certname.cer" -Encoding byte))  | Out-File -FilePath "20231004.$certname.txt"
```

The resource application is created optionally with an app role, if an `appRoleId` (in the form of a GUID) is passed in as a parameter.

> NOTE: There are two other related quickstarts: You can [create a client app with an X509 certificate from Key Vault as the credential](../create-client-app-sp-with-kv-cert/README.md) or you can [configure a secretless client app using federated identity credentials](../msi-as-a-fic-secretless/README.md) .

### Prerequisites

- A valid **Azure subscription**: If you don't own an Azure subscription, [create a free account](https://azure.microsoft.com/free/) before you begin or [deploy without an Azure subscription][no-azure-sub].
  - An **Azure resource group** that you own under a valid Azure subscription.
- [Bicep tools for authoring and deployment](https://learn.microsoft.com/graph/templates/quickstart-install-bicep-tools). The minimum required Bicep version is [v0.36.1](https://github.com/Azure/bicep/releases/tag/v0.36.1).
- Have the requisite **Microsoft Entra roles** to deploy this template:
  - Permissions to create applications. [Users have this permission by default](https://learn.microsoft.com/entra/fundamentals/users-default-permissions#compare-member-and-guest-default-permissions). However, [admins can turn off this default](https://learn.microsoft.com/entra/fundamentals/users-default-permissions#restrict-member-users-default-permissions) in which case you need to be assigned at least the [Application Developer](https://learn.microsoft.com/entra/identity/role-based-access-control/permissions-reference#application-developer) role.

### Deploy the template

You can deploy the template with the following Azure CLI command (replace `<resource-group>`, `<app-role-id>` and `<cert-key>` with the necessary values for your deployment):

#### Az CLI

```sh
az deployment group create --resource-group <resource-group> --template-file main.bicep --parameters appRoleId='<app-role-id>' certKey='<cert-key>'
```

#### Az PowerShell

```powershell
New-AzResourceGroupDeployment -ResourceGroupName <resource-group> -TemplateFile .\main.bicep -appRoleId="<app-role-id>" -certKey="<cert-key>"
```

[no-azure-sub]:https://learn.microsoft.com/graph/templates/how-to-deploy-without-azure-sub?view=graph-bicep-1.0&tabs=CLI
