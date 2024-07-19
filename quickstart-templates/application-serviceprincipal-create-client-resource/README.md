# Create client and resource apps

> **Note**: Minimum Bicep version required to deploy this quickstart template is [v0.29.45](https://github.com/Azure/bicep/releases/tag/v0.29.45).

This template allows you to create a client application and a resource application, along with their service principals.

* The client application is created with an optional key credential. The key can be passed in as a parameter. [Get The Certificate Key](https://learn.microsoft.com/en-us/graph/applications-how-to-add-certificate?tabs=http#get-the-certificate-key) mentions the steps to get the certificate key for a self-signed certificate. Here's a basic script:

```powershell
$certname = "AppRegTestCert"
$cert = New-SelfSignedCertificate -Subject "CN=$certname" -CertStoreLocation "Cert:\CurrentUser\My" -KeyExportPolicy Exportable -KeySpec Signature -KeyLength 2048 -KeyAlgorithm RSA -HashAlgorithm SHA256
Export-Certificate -Cert $cert -FilePath "$certname.cer"  // Exports PUBLIC cert
[convert]::ToBase64String((Get-Content "$certname.cer" -Encoding byte))  | Out-File -FilePath "20231004.$certname.txt"
```

* The resource application is created with an optional app role. The id for the app role can be passed in as a parameter.

You can deploy the template with the following Azure CLI command (replace `<resource-group>`, `<app-role-id>` and `<cert-key>` with the necessary values for your deployment):

```sh
az deployment group create --resource-group <resource-group> --template-file main.bicep --parameters appRoleId='<app-role-id>' certKey='<cert-key>'
```
