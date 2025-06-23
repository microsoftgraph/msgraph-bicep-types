# Remove all password and certificate credentials on a service principal

> **Note**: Minimum Bicep version required to deploy this quickstart template is [v0.32.4](https://github.com/Azure/bicep/releases/tag/v0.32.4).

This Bicep template enables Infrastructure-as-Code (IaC) removal of Microsoft Entra ID service principal credentials (certificates and passwords) in alignment with secure automation practices.

## Scenario: Removing Credentials from a Service Principal
There are several reasons you might want to remove credentials from a service principal.
-  Credential Rotation: As part of regular security hygiene, credentials (certificates or secrets) should be rotated. Removing the old credential ensures it cannot be reused.
- Decommissioning or Role Change: If a service principal is no longer in use or its role has changed, removing unused credentials reduces the attack surface.
- Security Incident Response: If a credential is suspected to be compromised, it should be removed immediately to prevent unauthorized access.

## What it Means to Remove a Credential
Removing a credential (certificate or password) from a service principal means deleting the associated authentication method from the service principal object in Microsoft Entra ID. This renders the credential unusable for future authentication attempts.

## How Service Principals Authenticate
After removing credential(s) and if no credentials remain, it will be unable to authenticate until a new one is provisioned.

**Recommended authentication methods include:**
- Certificates stored in Azure Key Vault: Use Key Vault references in deployment pipelines to inject certificates securely.
- Managed Identity (MSI): For services running in Azure, MSI provides a secure, secretless authentication mechanism.
- Federated Identity Credentials (FIC): FIC enables secure, passwordless authentication.  

## Best Practices
- Avoid hardcoding secrets or certificates in templates.
- Use Key Vault references in automation pipelines to inject secrets securely.
- Validate that at least one valid credential remains before removing others to avoid service disruption.

## How to Deploy
You can deploy the template with the following Azure CLI command (replace `<resource-group>` and `<app-id-of-service-principal>` with the necessary values for your deployment):

```sh
az deployment group create --resource-group <resource-group> --template-file main.bicep --parameters applicationId=<app-id-of-service-principal>
```
