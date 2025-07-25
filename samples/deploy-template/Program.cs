using System.Text.Json;
using Azure.Core;
using Azure.Identity;
using Azure.ResourceManager;
using Azure.ResourceManager.Resources;
using Azure.ResourceManager.Resources.Models;
using Microsoft.Identity.Client;

namespace DeployTemplate
{
  class Program
  {
    // Hardcoded values
    private const string ClientId = "YOUR_APPLICATION_CLIENT_ID";
    private const string TenantId = "YOUR_TENANT_ID";
    private const string Authority = $"https://login.microsoftonline.com/{TenantId}";
    private const string SubscriptionId = "YOUR_AZURE_SUBSCRIPTION_ID";
    private const string ResourceGroupName = "YOUR_RESOURCE_GROUP_NAME";
    private const string DeploymentName = "sample-deployment";
    private const string TemplateFileName = "sample-template.json";

    static async Task Main(string[] args)
    {
      try
      {
        Console.WriteLine("ARM Template Deployment using Microsoft Entra Authentication");
        Console.WriteLine("============================================================");

        // Authenticate user
        var authResult = await AuthenticateUserAsync();
        Console.WriteLine($"Authentication successful for user: {authResult.Account.Username}");

        // Deploy ARM template
        await DeployArmTemplateAsync(authResult.AccessToken);

        Console.WriteLine("\nDeployment completed successfully!");
      }
      catch (Exception ex)
      {
        Console.WriteLine($"Error: {ex.ToString()}");
        if (ex.InnerException != null)
        {
          Console.WriteLine($"Inner Exception: {ex.InnerException.Message}");
        }
      }

      Console.WriteLine("\nPress any key to exit...");
      Console.ReadKey();
    }

    private static async Task<AuthenticationResult> AuthenticateUserAsync()
    {
      // Define the scopes we need
      string[] scopes = { "https://management.azure.com/.default" };

      try
      {
        var app = PublicClientApplicationBuilder
          .Create(ClientId)
          .WithAuthority(Authority)
          .WithRedirectUri("http://localhost")
          .Build();

        // Interactive authentication
        Console.WriteLine("Opening browser for interactive authentication...");
        var authResult = await app.AcquireTokenInteractive(scopes)
            .WithPrompt(Prompt.SelectAccount)
            .ExecuteAsync();

        return authResult;
      }
      catch (MsalException ex)
      {
        throw new InvalidOperationException($"Authentication failed: {ex.Message}", ex);
      }
    }

    private static async Task DeployArmTemplateAsync(string accessToken)
    {
      try
      {
        Console.WriteLine("\nStarting ARM template deployment...");

        // Create Azure credential from access token
        var credential = new AccessTokenCredential(accessToken);

        // Initialize Azure Resource Manager client
        var armClient = new ArmClient(credential, SubscriptionId, new ArmClientOptions()
        {
          Environment = ArmEnvironment.AzurePublicCloud
        });

        // Get subscription and resource group
        var subscription = await armClient.GetDefaultSubscriptionAsync();
        var resourceGroupResponse = await subscription.GetResourceGroupAsync(ResourceGroupName);
        var resourceGroup = resourceGroupResponse.Value;

        Console.WriteLine($"Using Resource Group: {ResourceGroupName}");

        // Read ARM template
        var templatePath = Path.Combine(Directory.GetCurrentDirectory(), TemplateFileName);
        if (!File.Exists(templatePath))
        {
          throw new FileNotFoundException($"ARM template not found at: {templatePath}");
        }

        var templateContent = await File.ReadAllTextAsync(templatePath);

        Console.WriteLine($"Starting deployment: {DeploymentName}");

        // Create deployment content
        var deploymentContent = new ArmDeploymentContent(new ArmDeploymentProperties(ArmDeploymentMode.Incremental)
        {
          Template = BinaryData.FromString(templateContent),
        });

        // Start deployment
        var deploymentResponse = await resourceGroup.GetArmDeployments().CreateOrUpdateAsync(
            Azure.WaitUntil.Completed,
            DeploymentName,
            deploymentContent);

        Console.WriteLine("Deployment operation completed...");
        
        // Get deployment result
        var deployment = deploymentResponse.Value;
        var deploymentData = deployment.Data;

        Console.WriteLine($"Deployment Status: {deploymentData.Properties.ProvisioningState}");

        if (deploymentData.Properties.Outputs != null)
        {
          Console.WriteLine("Deployment Outputs:");
          var outputsJson = deploymentData.Properties.Outputs.ToString();
          var outputs = JsonSerializer.Deserialize<Dictionary<string, JsonElement>>(outputsJson);

          if (outputs != null)
          {
            foreach (var output in outputs)
            {
              Console.WriteLine($"  {output.Key}: {output.Value.GetProperty("value").ToString()}");
            }
          }
        }
      }
      catch (Exception ex)
      {
        throw new InvalidOperationException($"ARM template deployment failed: {ex.Message}", ex);
      }
    }
  }

  // Helper class to create AccessToken from string
  public class AccessTokenCredential : TokenCredential
  {
    private readonly string _accessToken;

    public AccessTokenCredential(string accessToken)
    {
      _accessToken = accessToken;
    }

    public override AccessToken GetToken(TokenRequestContext requestContext, CancellationToken cancellationToken)
    {
      return new AccessToken(_accessToken, DateTimeOffset.UtcNow.AddHours(1));
    }

    public override ValueTask<AccessToken> GetTokenAsync(TokenRequestContext requestContext, CancellationToken cancellationToken)
    {
      return new ValueTask<AccessToken>(GetToken(requestContext, cancellationToken));
    }
  }
}
