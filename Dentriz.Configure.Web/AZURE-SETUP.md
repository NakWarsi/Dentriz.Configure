# 🚀 Azure App Service Deployment Guide

This guide will help you set up Azure App Service deployment for your DentRiz Angular application.

## 📋 Prerequisites

- Azure subscription
- Azure CLI installed (optional but recommended)
- GitHub repository with your Angular application

## 🏗️ Azure App Service Setup

### 1. Create Azure App Service

#### Option A: Using Azure Portal

1. **Sign in to Azure Portal**
   - Go to [portal.azure.com](https://portal.azure.com)
   - Sign in with your Azure account

2. **Create App Service**
   - Click **Create a resource**
   - Search for **Web App** or **Static Web App**
   - Click **Create**

3. **Configure App Service**
   - **Subscription**: Select your subscription
   - **Resource Group**: Create new or use existing
   - **Name**: Enter a unique name (e.g., `dentriz-web-app`)
   - **Publish**: Code
   - **Runtime stack**: Node.js 18 LTS
   - **Operating System**: Linux (recommended)
   - **Region**: Choose closest to your users
   - **App Service Plan**: Create new or use existing
   - Click **Review + create** then **Create**

#### Option B: Using Azure CLI

```bash
# Login to Azure
az login

# Create resource group
az group create --name DentRizRG --location eastus

# Create app service plan
az appservice plan create --name DentRizPlan --resource-group DentRizRG --sku B1 --is-linux

# Create web app
az webapp create --resource-group DentRizRG --plan DentRizPlan --name dentriz-web-app --runtime "NODE|18-lts"
```

### 2. Configure App Service Settings

1. **Go to your App Service in Azure Portal**
2. **Configure Application Settings**:
   - Go to **Settings** → **Configuration**
   - Add these application settings:
     ```
     WEBSITE_NODE_DEFAULT_VERSION = 18.17.0
     SCM_DO_BUILD_DURING_DEPLOYMENT = true
     ```

3. **Configure Build Settings** (if using Static Web App):
   - Go to **Configuration** → **Build Configuration**
   - Set **Build Preset**: `Angular`
   - Set **App Location**: `/DentrizWeb`
   - Set **Output Location**: `dist/DentrizWeb/browser`

### 3. Get Publish Profile

1. **In Azure Portal**:
   - Go to your App Service
   - Click **Get publish profile**
   - Download the `.publishsettings` file
   - Open the file and copy the content

2. **Using Azure CLI**:
   ```bash
   az webapp deployment list-publishing-profiles --resource-group DentRizRG --name dentriz-web-app
   ```

## 🔧 GitHub Configuration

### 1. Add GitHub Secrets

1. **Go to your GitHub repository**
2. **Navigate to Settings** → **Secrets and variables** → **Actions**
3. **Add these secrets**:

#### For Single Environment:
```
Name: AZURE_WEBAPP_NAME
Value: your-app-service-name

Name: AZURE_WEBAPP_PUBLISH_PROFILE
Value: [Paste the entire content of your .publishsettings file]
```

#### For Staging/Production:
```
Name: AZURE_WEBAPP_NAME_STAGING
Value: your-staging-app-service-name

Name: AZURE_WEBAPP_PUBLISH_PROFILE_STAGING
Value: [Paste staging publish profile content]

Name: AZURE_WEBAPP_NAME_PRODUCTION
Value: your-production-app-service-name

Name: AZURE_WEBAPP_PUBLISH_PROFILE_PRODUCTION
Value: [Paste production publish profile content]
```

### 2. Configure Branch Protection

1. **Go to repository Settings** → **Branches**
2. **Add rule for `main` branch**:
   - Check **"Require status checks to pass before merging"**
   - Check **"Require branches to be up to date before merging"**
   - Select **"Require deployments to succeed before merging"**

## 🚀 Deployment Workflows

### Option 1: Simple Deployment (`deploy-azure.yml`)

Use this for single environment deployment:

```yaml
# Triggers on push to main and develop
# Deploys to the same App Service for both branches
```

### Option 2: Advanced Deployment (`deploy-azure-advanced.yml`)

Use this for staging/production environments:

```yaml
# Push to develop → Deploy to staging
# Push to main → Deploy to production
```

### Option 3: Full CI/CD Pipeline (`ci-cd.yml`)

Use this for complete pipeline with testing and security scanning:

```yaml
# Includes: Build, Test, Security Scan, Deploy
# Separate environments for staging and production
```

## 🔍 Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Build fails | Check Node.js version in Azure settings |
| Routing doesn't work | Ensure `web.config` is in the root of your build output |
| 404 errors | Verify Angular routes are properly configured |
| Deployment timeout | Check build size and optimize if needed |

### Debug Commands

```bash
# Check Azure App Service logs
az webapp log tail --name your-app-name --resource-group your-rg

# Check deployment status
az webapp deployment list --name your-app-name --resource-group your-rg

# Restart App Service
az webapp restart --name your-app-name --resource-group your-rg
```

### Log Locations

- **Application logs**: `/home/LogFiles/Application/`
- **Deployment logs**: `/home/LogFiles/Git/`
- **Web server logs**: `/home/LogFiles/http/RawLogs/`

## 📊 Monitoring

### 1. Application Insights (Optional)

1. **Create Application Insights**:
   - Go to Azure Portal
   - Create **Application Insights** resource
   - Link it to your App Service

2. **Configure in Angular**:
   ```typescript
   // Add to your Angular app for performance monitoring
   ```

### 2. Azure Monitor

- **Metrics**: CPU, Memory, Response Time
- **Alerts**: Set up alerts for high CPU/memory usage
- **Logs**: Query application logs

## 🔒 Security

### 1. HTTPS Configuration

- Azure App Service provides free SSL certificates
- Enable **HTTPS Only** in App Service settings
- Configure **Custom domains** if needed

### 2. Network Security

- **IP Restrictions**: Limit access to specific IPs
- **Virtual Network**: Deploy in VNet for enhanced security
- **Private Endpoints**: For database connections

### 3. Authentication (Optional)

- **Azure AD**: Integrate with Azure Active Directory
- **Social Logins**: Configure OAuth providers
- **App Service Authentication**: Built-in auth features

## 💰 Cost Optimization

### 1. App Service Plans

- **Free**: Development/testing only
- **Basic**: Small production workloads
- **Standard**: Most production applications
- **Premium**: High-performance requirements

### 2. Scaling Options

- **Manual Scaling**: Set fixed number of instances
- **Auto Scaling**: Scale based on CPU/memory usage
- **Time-based Scaling**: Scale up/down at specific times

## 🎯 Next Steps

1. **Set up monitoring**: Configure Application Insights
2. **Add custom domain**: Configure your domain name
3. **Set up CDN**: Use Azure CDN for better performance
4. **Configure backups**: Set up automated backups
5. **Set up staging slots**: For zero-downtime deployments

## 📞 Support

- **Azure Documentation**: [docs.microsoft.com/azure](https://docs.microsoft.com/azure)
- **Azure Support**: Available through Azure Portal
- **Community**: Stack Overflow, Azure Forums

---

**Pro Tip**: Use Azure DevOps for more advanced CI/CD features like release pipelines, artifact management, and deployment approvals.
