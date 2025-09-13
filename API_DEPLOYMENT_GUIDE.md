# .NET API Deployment Guide

This guide explains how to deploy the Dentriz.Configure.Api to Azure using GitHub Actions with tag-based deployments.

## 🚀 Quick Start

### 1. Deploy Your API
To deploy your API, simply create and push a tag:

```bash
# Create a new tag
git tag api-v1.0.0

# Push the tag to trigger deployment
git push origin api-v1.0.0
```

### 2. Manual Deployment
You can also trigger deployment manually from GitHub Actions tab by clicking "Run workflow".

## 📋 Prerequisites

### Azure Resources Required

1. **Azure App Service** (for hosting the API)
2. **Azure Resource Group** (to organize resources)
3. **Azure Container Registry** (optional, for Docker deployments)

### GitHub Secrets Required

You need to set up the following secrets in your GitHub repository:

#### For Simple Deployment (Recommended)
- `AZURE_CREDENTIALS` - Azure service principal credentials
- `AZURE_WEBAPP_PUBLISH_PROFILE` - App Service publish profile
- `AZURE_RESOURCE_GROUP` - Your Azure resource group name

#### For Docker Deployment (Advanced)
- `ACR_USERNAME` - Azure Container Registry username
- `ACR_PASSWORD` - Azure Container Registry password

## 🛠️ Setup Instructions

### Step 1: Create Azure Resources

#### Option A: Using Azure Portal
1. Go to [Azure Portal](https://portal.azure.com)
2. Create a new Resource Group
3. Create a new App Service:
   - Name: `dentriz-configure-api` (or your preferred name)
   - Runtime: `.NET 8`
   - Operating System: `Windows` or `Linux`

#### Option B: Using Azure CLI
```bash
# Create resource group
az group create --name "dentriz-rg" --location "East US"

# Create App Service plan
az appservice plan create --name "dentriz-plan" --resource-group "dentriz-rg" --sku "B1" --is-linux

# Create App Service
az webapp create --resource-group "dentriz-rg" --plan "dentriz-plan" --name "dentriz-configure-api" --runtime "DOTNET|8.0"
```

### Step 2: Configure GitHub Secrets

#### Get Azure Credentials
```bash
# Create service principal
az ad sp create-for-rbac --name "github-actions-dentriz" --role contributor --scopes /subscriptions/{subscription-id}/resourceGroups/{resource-group} --sdk-auth
```

#### Get Publish Profile
1. Go to Azure Portal → App Service → Get publish profile
2. Copy the entire XML content

#### Set GitHub Secrets
1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. Add the following secrets:
   - `AZURE_CREDENTIALS`: The JSON output from the service principal command
   - `AZURE_WEBAPP_PUBLISH_PROFILE`: The XML content from publish profile
   - `AZURE_RESOURCE_GROUP`: Your resource group name (e.g., "dentriz-rg")

### Step 3: Update Workflow Configuration

Edit the workflow files to match your Azure resources:

#### In `.github/workflows/deploy-api-simple.yml`:
```yaml
env:
  AZURE_WEBAPP_NAME: 'your-app-service-name'  # Change this
```

#### In `.github/workflows/deploy-api.yml` (Docker version):
```yaml
env:
  AZURE_WEBAPP_NAME: 'your-app-service-name'  # Change this
  CONTAINER_REGISTRY: 'your-registry-name'    # Change this
```

## 🔄 Deployment Workflows

### Simple Deployment (Recommended)
- **File**: `.github/workflows/deploy-api-simple.yml`
- **Method**: Direct .NET deployment to App Service
- **Pros**: Simple, fast, no Docker required
- **Cons**: Less control over runtime environment

### Docker Deployment (Advanced)
- **File**: `.github/workflows/deploy-api.yml`
- **Method**: Container-based deployment
- **Pros**: Consistent environment, more control
- **Cons**: Requires Container Registry, more complex

## 🏷️ Tag Naming Convention

The workflows trigger on tags matching the pattern `api-v*`:

- ✅ `api-v1.0.0` - Major release
- ✅ `api-v1.2.3` - Patch release
- ✅ `api-v2.0.0-beta` - Beta release
- ❌ `v1.0.0` - Won't trigger (missing 'api-' prefix)
- ❌ `release-1.0.0` - Won't trigger (wrong pattern)

## 📊 Workflow Steps

### Build Phase
1. Checkout code
2. Setup .NET 8.0
3. Restore dependencies
4. Build application
5. Run tests (if any)
6. Publish application

### Deploy Phase
1. Create deployment package
2. Login to Azure
3. Deploy to App Service
4. Restart App Service
5. Health check

## 🔍 Monitoring Deployment

### GitHub Actions
- Go to your repository → Actions tab
- Look for "Deploy .NET API to Azure" workflow
- Check the logs for any errors

### Azure Portal
- Go to App Service → Deployment Center
- Check deployment history
- Monitor application logs

## 🚨 Troubleshooting

### Common Issues

#### 1. Authentication Failed
- Verify `AZURE_CREDENTIALS` secret is correctly set
- Check service principal permissions

#### 2. App Service Not Found
- Verify `AZURE_WEBAPP_NAME` matches your App Service name
- Check resource group name in secrets

#### 3. Build Failures
- Check .NET version compatibility
- Verify all dependencies are restored

#### 4. Deployment Timeout
- Increase timeout in workflow
- Check App Service configuration

### Debug Commands
```bash
# Check App Service status
az webapp show --name "your-app-name" --resource-group "your-rg"

# View application logs
az webapp log tail --name "your-app-name" --resource-group "your-rg"

# Restart App Service
az webapp restart --name "your-app-name" --resource-group "your-rg"
```

## 🔧 Customization

### Environment Variables
Add environment variables to your App Service:
```bash
az webapp config appsettings set --resource-group "your-rg" --name "your-app" --settings "ASPNETCORE_ENVIRONMENT=Production"
```

### Custom Domains
Configure custom domains in Azure Portal → App Service → Custom domains

### SSL Certificates
Enable HTTPS in Azure Portal → App Service → TLS/SSL settings

## 📚 Additional Resources

- [Azure App Service Documentation](https://docs.microsoft.com/en-us/azure/app-service/)
- [GitHub Actions for Azure](https://github.com/Azure/actions)
- [.NET Deployment Guide](https://docs.microsoft.com/en-us/dotnet/core/deploying/)

## 🆘 Support

If you encounter issues:
1. Check the GitHub Actions logs
2. Review Azure App Service logs
3. Verify all secrets are correctly configured
4. Ensure Azure resources are properly set up
