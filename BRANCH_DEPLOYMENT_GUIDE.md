# Branch-Based Web App Deployment Guide

This guide explains how to deploy your Angular web application to Azure using GitHub Actions with branch-based triggers.

## 🚀 How to Deploy

### Create a Release Branch
To deploy your web app, simply create a branch with the suffix `release-web`:

```bash
# Create a new release branch
git checkout -b feature-v1.0.0-release-web

# Make your changes and commit them
git add .
git commit -m "Add new features for v1.0.0"

# Push the branch to trigger deployment
git push origin feature-v1.0.0-release-web
```

### Branch Naming Examples
The workflow triggers on any branch ending with `release-web`:

- ✅ `main-release-web` - Deploy from main branch
- ✅ `feature-v1.0.0-release-web` - Deploy feature branch
- ✅ `hotfix-bug-fix-release-web` - Deploy hotfix
- ✅ `develop-release-web` - Deploy from develop branch
- ❌ `release-web` - Won't trigger (needs prefix)
- ❌ `web-release` - Won't trigger (wrong suffix)

## 📋 Prerequisites

### Azure Resources Required
1. **Azure App Service** (for hosting the web app)
2. **Azure Resource Group** (to organize resources)

### GitHub Secrets Required
Set up these secrets in your GitHub repository:

- `AZURE_CREDENTIALS` - Azure service principal credentials
- `AZURE_WEBAPP_PUBLISH_PROFILE` - App Service publish profile
- `AZURE_RESOURCE_GROUP` - Your Azure resource group name

## 🛠️ Setup Instructions

### Step 1: Create Azure Resources

#### Using Azure CLI
```bash
# Create resource group
az group create --name "dentriz-web-rg" --location "East US"

# Create App Service plan
az appservice plan create --name "dentriz-web-plan" --resource-group "dentriz-web-rg" --sku "B1" --is-linux

# Create App Service
az webapp create --resource-group "dentriz-web-rg" --plan "dentriz-web-plan" --name "dentriz-configure-web" --runtime "NODE|18-lts"
```

### Step 2: Configure GitHub Secrets

#### Get Azure Credentials
```bash
# Create service principal
az ad sp create-for-rbac --name "github-actions-dentriz-web" --role contributor --scopes /subscriptions/{subscription-id}/resourceGroups/{resource-group} --sdk-auth
```

#### Get Publish Profile
1. Go to Azure Portal → App Service → Get publish profile
2. Copy the entire XML content

#### Set GitHub Secrets
1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. Add the secrets mentioned above

### Step 3: Update Workflow Configuration

Edit `.github/workflows/deploy-web-branch.yml`:

```yaml
env:
  AZURE_WEBAPP_NAME: 'your-app-service-name'  # Change this
```

## 🔄 Workflow Process

### Build Phase
1. Checkout code from the release branch
2. Setup Node.js 18.x
3. Install dependencies with npm ci
4. Build Angular application
5. Verify build output structure
6. Create deployment package

### Deploy Phase
1. Login to Azure
2. Deploy to App Service
3. Restart App Service
4. Health check

## 🎯 Benefits of Branch-Based Deployment

- ✅ **Easy to use** - Just create a branch with the right suffix
- ✅ **Flexible naming** - Any branch name ending with `release-web`
- ✅ **No tag management** - No need to create and manage tags
- ✅ **Automatic triggers** - Deploys immediately when branch is pushed
- ✅ **Branch-specific deployments** - Each branch can be deployed independently

## 🔍 Monitoring Deployment

### GitHub Actions
- Go to your repository → Actions tab
- Look for "Deploy Angular Web App to Azure (Branch Trigger)" workflow
- Check the logs for any errors

### Azure Portal
- Go to App Service → Deployment Center
- Check deployment history
- Monitor application logs

## 🚨 Troubleshooting

### Common Issues

#### 1. Workflow Not Triggering
- Ensure branch name ends with `release-web`
- Check if the branch was pushed to the correct repository
- Verify the workflow file is in the correct location

#### 2. Build Failures
- Check Node.js version compatibility
- Verify all dependencies are installed
- Check Angular build configuration

#### 3. Deployment Failures
- Verify Azure credentials and publish profile
- Check App Service configuration
- Ensure App Service supports Node.js 18

### Debug Commands
```bash
# Check if branch exists
git branch -a | grep release-web

# Check branch naming
git branch --show-current

# View recent commits
git log --oneline -5
```

## 🔧 Customization

### Change Branch Suffix
To use a different suffix, modify the workflow:

```yaml
on:
  push:
    branches:
      - '**/deploy-web'  # Change this to your preferred suffix
```

### Add Environment Variables
Add environment variables to your App Service:

```bash
az webapp config appsettings set --resource-group "your-rg" --name "your-app" --settings "NODE_ENV=production"
```

## 📚 Additional Resources

- [Azure App Service Documentation](https://docs.microsoft.com/en-us/azure/app-service/)
- [Angular Deployment Guide](https://angular.io/guide/deployment)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## 🆘 Support

If you encounter issues:
1. Check the GitHub Actions logs
2. Review Azure App Service logs
3. Verify all secrets are correctly configured
4. Ensure Azure resources are properly set up
5. Test the build process locally first
