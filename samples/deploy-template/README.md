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
- Microsoft Entra ID application registration and permissions granted to the application.

## App configuration

### 1. Register an Application in Microsoft Entra ID

1. Go to the [Azure Portal](https://portal.azure.com)
2. Navigate to **Azure Active Directory** > **App registrations**
3. Click **New registration**
4. Provide a name for your application
5. Select **Accounts in this organizational directory only**
6. Set Redirect URI to **Public client/native (mobile & desktop)**: `http://localhost`
7. Click **Register**

### 2. Configure API Permissions

1. In your app registration, go to **API permissions**
2. Click **Add a permission**
3. Select **Azure Service Management**
4. Select **Delegated permissions**
5. Check **user_impersonation**
6. Click **Add permissions**
7. Click **Grant admin consent** (if you have admin privileges)
8. For **Microsoft Graph** permissions, repeat steps 2-6 selecting Microsoft Graph for the API in step 3 and whichever permissions you need in step 5, while thinking about a least privileged approach. Then follow this with step 7.

### 3. Note Configuration Values

From your app registration, note:

- **Application (client) ID**
- **Directory (tenant) ID**

## Configuration

1. Open `Program.cs` and replace the hardcoded constants placeholder values:

```csharp
    private const string ClientId = "YOUR_APPLICATION_CLIENT_ID";
    private const string TenantId = "YOUR_TENANT_ID";
    private const string Authority = $"https://login.microsoftonline.com/{TenantId}";
    private const string SubscriptionId = "YOUR_AZURE_SUBSCRIPTION_ID";
    private const string ResourceGroupName = "OUR_RESOURCE_GROUP_NAME";
    private const string DeploymentName = "sample-deployment";
    private const string TemplateFileName = "sample-template.json";
```

2. Ensure your resource group exists in the specified subscription

## ARM Template

The application includes a sample ARM template (`sample-template.json`) that creates an Entra ID application and security group. You can modify this template or replace it with your own ARM template.

## Building and Running

### Build the application:

```bash
dotnet build deploy-template.csproj
```

### Run the application:

```bash
dotnet run --project deploy-template.csproj
```

## How It Works

1. **Configuration Loading**: The application loads configuration from `appsettings.json`
2. **MSAL Initialization**: Initializes the MSAL public client application
3. **Authentication**: 
   - First attempts silent token acquisition (from cache)
   - Falls back to interactive authentication if needed
   - Opens a browser window for user sign-in
4. **ARM Deployment**:
   - Creates an Azure Resource Manager client using the access token
   - Reads the ARM template from the file system
   - Deploys the template to the specified resource group
   - Monitors deployment progress and reports results

## Security Best Practices

- **No Hardcoded Credentials**: All sensitive information is stored in configuration files
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
   - Ensure `appsettings.json` is copied to the output directory
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

- Never commit `appsettings.json` with real credentials to source control
- Use Azure Key Vault for production scenarios
- Consider using managed identity when running in Azure
- Implement proper access controls and role-based permissions

## License

This project is provided as a sample and is not intended for production use without proper security review and testing.

[bicep-cli-build]:https://learn.microsoft.com/azure/azure-resource-manager/bicep/bicep-cli?source=recommendations#build