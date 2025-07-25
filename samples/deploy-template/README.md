# Deploy Template - ARM Template Deployment Tool

A .NET console application that deploys ARM templates using Azure Resource Manager, where the deployment is made on behalf of the signed-in user using Microsoft Entra ID and MSAL (Microsoft Authentication Library). If the template declares Microsoft Graph resources, the deployment will use the Microsoft Graph Bicep extension to translate Microsoft Graph resource declarations in the template into Microsoft Graph API requests. Both the console application and the signed-in user **must** have the permissions required to deploy the resources declared in the template.

> **NOTE**: The deployment API that ARM provides *only* supports deploying ARM JSON templates. It does not support Bicep templates. To use the console application, you will need to first transpile the Bicep template into an ARM JSON template using the [Bicep CLI build command][bicep-cli-build].

## Features

- **Microsoft Entra ID Authentication**: Uses MSAL for secure user authentication with interactive login
- **Token Caching**: Implements silent token acquisition for improved performance
- **ARM Template Deployment**: Deploys Azure Resource Manager templates using authenticated tokens

## Prerequisites

- .NET 9.0 or later
- Azure subscription
- Microsoft Entra ID application registration and permissions granted to the application (see next section for a bootstrap template that performs this task)

## Microsoft Entra ID application configuration

Use the Bicep template in the _grant-deployment-app-arm-and-graph-scopes_ folder to create an application, service principal and grant the requisite permissions, by following the instructions in the folder's _README.md_ file. On successful deployment, the template outputs the `appId` (application client ID) and `tenantId` (as well as the Azure `subscriptionId` and `resourceGroupName`) which you will need later to configure the constants in the `Program.cs` file.

## .NET console application configuration

1. Open `Program.cs` and replace the hardcoded constants placeholder values with the :

```csharp
    private const string ClientId = "YOUR_APPLICATION_CLIENT_ID";
    private const string TenantId = "YOUR_TENANT_ID";
    private const string Authority = $"https://login.microsoftonline.com/{TenantId}";
    private const string SubscriptionId = "YOUR_AZURE_SUBSCRIPTION_ID";
    private const string ResourceGroupName = "YOUR_RESOURCE_GROUP_NAME";
    private const string DeploymentName = "sample-deployment";
    private const string TemplateFileName = "sample-template.json";
```

2. Ensure your resource group exists in the specified subscription

## ARM Template

The application includes a sample ARM template (`sample-template.json`) that creates an Entra ID application and security group. You can modify this template or replace it with your own ARM template.

The deployment API that ARM provides *only* supports deploying ARM JSON templates. It does not support Bicep templates. To use the console application, you will need to first transpile the Bicep template into an ARM JSON template using the [Bicep CLI build command][bicep-cli-build].

## Building and Running

### Build the application

```bash
dotnet build deploy-template.csproj
```

### Run the application

```bash
dotnet run --project deploy-template.csproj
```

## How It Works

1. **MSAL Initialization**: Initializes the MSAL public client application
1. **Authentication**: 
   - First attempts silent token acquisition (from cache)
   - Falls back to interactive authentication if needed
   - Opens a browser window for user sign-in
1. **ARM Deployment**:
   - Creates an Azure Resource Manager client using the access token
   - Reads the ARM template from the file system
   - Deploys the template to the specified resource group
   - Monitors deployment progress and reports results

## Security Best Practices

- **Token Caching**: Implements proper token caching for performance and security
- **HTTPS Only**: All communication with Azure services uses HTTPS
- **Minimal Permissions**: Requests only the necessary permissions for the operation
- **Proper Error Handling**: Implements comprehensive error handling and logging

## Troubleshooting

### Common Issues

1. **Authentication Errors**:
   - Verify your Client ID and Tenant ID are correct
   - Ensure API permissions are granted
   - Check that your app registration allows public client flows

2. **Deployment Errors**:
   - Verify your subscription ID and resource group name
   - Ensure you have deployment permissions in the target resource group
   - Check that the ARM template syntax is valid

3. **Configuration Errors**:
   - Verify all placeholder values have been replaced with actual values

### Logs and Debugging

The application provides detailed logging output including:
- MSAL authentication flow details
- ARM deployment progress and status
- Error messages with full exception details

## Extending the Application

- **Custom ARM Templates**: Replace `sample-template.json` with your own templates
- **Multiple Deployments**: Extend the code to deploy multiple templates
- **Parameter Files**: Add support for ARM template parameter files
- **Different Authentication Flows**: Implement device code flow for headless scenarios
- **Managed Identity**: Use managed identity when running in Azure environments

## Security Notes

- Use Azure Key Vault for production scenarios
- Consider using managed identity when running in Azure
- Implement proper access controls and role-based permissions

## License

This project is provided as a sample and is not intended for production use without proper security review and testing.

[bicep-cli-build]:https://learn.microsoft.com/azure/azure-resource-manager/bicep/bicep-cli?source=recommendations#build