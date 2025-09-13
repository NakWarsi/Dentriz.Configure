# PowerShell script to set up Azure resources for API deployment
# Run this script in Azure Cloud Shell or with Azure CLI installed

param(
    [Parameter(Mandatory=$true)]
    [string]$ResourceGroupName,
    
    [Parameter(Mandatory=$true)]
    [string]$AppServiceName,
    
    [Parameter(Mandatory=$false)]
    [string]$Location = "East US",
    
    [Parameter(Mandatory=$false)]
    [string]$AppServicePlanName = "$AppServiceName-plan",
    
    [Parameter(Mandatory=$false)]
    [string]$ServicePrincipalName = "github-actions-dentriz"
)

Write-Host "🚀 Setting up Azure resources for Dentriz.Configure.Api deployment..." -ForegroundColor Green

# Check if user is logged in to Azure
$context = az account show --query "user.name" -o tsv 2>$null
if (-not $context) {
    Write-Host "❌ Not logged in to Azure. Please run 'az login' first." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Logged in as: $context" -ForegroundColor Green

# Get subscription ID
$subscriptionId = az account show --query "id" -o tsv
Write-Host "📋 Using subscription: $subscriptionId" -ForegroundColor Yellow

try {
    # Create resource group
    Write-Host "📦 Creating resource group: $ResourceGroupName" -ForegroundColor Yellow
    az group create --name $ResourceGroupName --location $Location --output none
    
    # Create App Service plan
    Write-Host "📋 Creating App Service plan: $AppServicePlanName" -ForegroundColor Yellow
    az appservice plan create --name $AppServicePlanName --resource-group $ResourceGroupName --sku "B1" --is-linux --output none
    
    # Create App Service
    Write-Host "🌐 Creating App Service: $AppServiceName" -ForegroundColor Yellow
    az webapp create --resource-group $ResourceGroupName --plan $AppServicePlanName --name $AppServiceName --runtime "DOTNET|8.0" --output none
    
    # Configure App Service settings
    Write-Host "⚙️ Configuring App Service settings..." -ForegroundColor Yellow
    az webapp config appsettings set --resource-group $ResourceGroupName --name $AppServiceName --settings "ASPNETCORE_ENVIRONMENT=Production" --output none
    
    # Create service principal for GitHub Actions
    Write-Host "🔐 Creating service principal for GitHub Actions..." -ForegroundColor Yellow
    $spOutput = az ad sp create-for-rbac --name $ServicePrincipalName --role contributor --scopes "/subscriptions/$subscriptionId/resourceGroups/$ResourceGroupName" --sdk-auth --output json
    
    # Get publish profile
    Write-Host "📄 Getting publish profile..." -ForegroundColor Yellow
    $publishProfile = az webapp deployment list-publishing-profiles --resource-group $ResourceGroupName --name $AppServiceName --xml --output tsv
    
    Write-Host "✅ Azure resources created successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 Next steps:" -ForegroundColor Cyan
    Write-Host "1. Add the following secrets to your GitHub repository:" -ForegroundColor White
    Write-Host "   - AZURE_CREDENTIALS: $spOutput" -ForegroundColor Gray
    Write-Host "   - AZURE_WEBAPP_PUBLISH_PROFILE: [XML content from publish profile]" -ForegroundColor Gray
    Write-Host "   - AZURE_RESOURCE_GROUP: $ResourceGroupName" -ForegroundColor Gray
    Write-Host ""
    Write-Host "2. Update the workflow files with your App Service name: $AppServiceName" -ForegroundColor White
    Write-Host ""
    Write-Host "3. Create and push a tag to deploy:" -ForegroundColor White
    Write-Host "   git tag api-v1.0.0" -ForegroundColor Gray
    Write-Host "   git push origin api-v1.0.0" -ForegroundColor Gray
    Write-Host ""
    Write-Host "🌐 Your API will be available at: https://$AppServiceName.azurewebsites.net" -ForegroundColor Green
    Write-Host "📚 Swagger UI will be available at: https://$AppServiceName.azurewebsites.net/swagger" -ForegroundColor Green
    
    # Save publish profile to file
    $publishProfile | Out-File -FilePath "publish-profile.xml" -Encoding UTF8
    Write-Host ""
    Write-Host "💾 Publish profile saved to: publish-profile.xml" -ForegroundColor Yellow
    Write-Host "   Copy the content of this file to the AZURE_WEBAPP_PUBLISH_PROFILE secret" -ForegroundColor Gray
    
} catch {
    Write-Host "❌ Error creating Azure resources: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}
