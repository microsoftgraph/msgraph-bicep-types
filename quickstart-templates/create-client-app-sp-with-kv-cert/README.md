# Create a client app with an X509 certificate from Key Vault as the credential

> **Note**: Minimum Bicep version required to deploy this quickstart template is [v0.30.3](https://github.com/Azure/bicep/releases/tag/v0.30.3).

The template creates a Key Vault, through which the authorized managed identity can add an X509 certificate (if it doesn't exist) and get the certificate's public key (base64 encoded), along with the thumbprint and other metadata.
Finally the template creates the client application resource using the certificate public key as its credential. followed
by creation of the service principal

You can deploy the template with the following Azure CLI command (replace `<resource-group>` with the necessary values for your deployment). This deployment uses a parameter file, main.bicepparam, where default values may also be changed.  Since the parameter file references the Bicep template file, there's no need
to use the `--template-file` switch.

```sh
az deployment group create --resource-group <resource-group> --parameter main.bicepparam --verbose
```

To deploy the same template using Az Powershell, use:

```powershell
New-AzResourceGroupDeployment -ResourceGroupName bicep-deployments -TemplateFile .\main.bicep -TemplateParameterFile .\main.bicepparam -Verbose
```
