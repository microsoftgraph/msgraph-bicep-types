#######################################################################
<#
Perform a 2-legged flow to acquire an access token with a managed
identity as the credential and then use it to call Microsoft Graph.

PRE-REQUISITES: 
1. An app registered with a user-assigned managed identity as a 
   federated identity credential (FIC).
2. There's a service principal for the app.
3. The service principal is is granted access to Microsoft Graph.

SCRIPT STEPS
1. Acquire a token for a user-assigned managed identity
2. Run PS as an app, using the token from step 1 as the credential
3. Call Microsoft Graph
#>
#######################################################################

param
(
    [Parameter(Mandatory=$true)]
    $managedIdentityPrincipalId,
    $applicationClientId,
    $tenantId
    $ficIssuerAudience
)

# Step 1: Acquire token for the managed identity
Connect-AzAccount -Identity -AccountId $managedIdentityPrincipalId
$token = Get-AzAccessToken -ResourceUrl $ficIssuerAudience


# Step 2: Sign in to Azure PowerShell (as the app with the FIC configuration)
Connect-AzAccount -ApplicationId $applicationClientId -FederatedToken $token.Token -Tenant $tenantId

# Step 3: Get all Entra groups in the tenant (assumes app has Group.Read.All permission)
Invoke-AzRestMethod -Method GET -Uri https://graph.microsoft.com/v1.0/groups
