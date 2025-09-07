# 🚀 CI/CD Pipeline Quick Setup Guide

This guide will help you set up the CI/CD pipeline for your DentRiz Angular application in under 10 minutes.

## 📋 Prerequisites

- GitHub repository with your Angular application
- Node.js 18+ installed locally
- Access to GitHub repository settings

## ⚡ Quick Setup (5 minutes)

### 1. Enable GitHub Actions

1. Go to your GitHub repository
2. Click on **Settings** tab
3. Scroll down to **Actions** → **General**
4. Select **"Allow all actions and reusable workflows"**
5. Click **Save**

### 2. Set Up Azure App Service

#### Option A: Single Environment Setup

1. Create an Azure App Service in the Azure Portal
2. Choose **Static Web App** or **Web App** (Node.js)
3. Configure your app service settings
4. Get your publish profile:
   - Go to your App Service in Azure Portal
   - Click **Get publish profile**
   - Download the `.publishsettings` file
   - Copy the content for the secret

#### Option B: Staging and Production Setup

1. Create two Azure App Services:
   - One for staging (e.g., `dentriz-staging`)
   - One for production (e.g., `dentriz-production`)
2. Get publish profiles for both services
3. Configure environment-specific settings

### 3. Configure GitHub Secrets

1. Go to your repository **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add the following secrets:

#### For Single Azure App Service:
```
Name: AZURE_WEBAPP_NAME
Value: [Your App Service name]

Name: AZURE_WEBAPP_PUBLISH_PROFILE
Value: [Your publish profile content]
```

#### For Azure with Staging/Production:
```
Name: AZURE_WEBAPP_NAME_STAGING
Value: [Your staging App Service name]

Name: AZURE_WEBAPP_PUBLISH_PROFILE_STAGING
Value: [Your staging publish profile content]

Name: AZURE_WEBAPP_NAME_PRODUCTION
Value: [Your production App Service name]

Name: AZURE_WEBAPP_PUBLISH_PROFILE_PRODUCTION
Value: [Your production publish profile content]
```

### 4. Test the Pipeline

1. Make a small change to your code
2. Commit and push to the `develop` branch
3. Go to **Actions** tab in your repository
4. Watch the pipeline run!

## 🔧 Advanced Configuration

### Branch Protection (Recommended)

1. Go to **Settings** → **Branches**
2. Click **Add rule**
3. Set branch name pattern: `main`
4. Check **"Require status checks to pass before merging"**
5. Check **"Require branches to be up to date before merging"**
6. Click **Create**

### Environment Setup

1. Go to **Settings** → **Environments**
2. Create `staging` environment
3. Create `production` environment
4. Add environment-specific secrets if needed

## 🧪 Local Testing

Before pushing to GitHub, test the pipeline locally:

### Windows (PowerShell):
```powershell
.\scripts\test-pipeline.ps1
```

### macOS/Linux:
```bash
./scripts/test-pipeline.sh
```

### Skip certain steps:
```powershell
.\scripts\test-pipeline.ps1 -SkipTests -SkipSecurity
```

## 📊 Monitoring

### Check Pipeline Status

1. Go to **Actions** tab in your repository
2. Click on any workflow run
3. View detailed logs for each step

### Common Issues

| Issue | Solution |
|-------|----------|
| Build fails | Check Node.js version and dependencies |
| Tests fail | Run tests locally first |
| Deployment fails | Verify deployment tokens |
| Security warnings | Review and update dependencies |

## 🎯 Next Steps

1. **Set up monitoring**: Configure alerts for failed deployments
2. **Add notifications**: Connect Slack or email notifications
3. **Performance monitoring**: Set up Lighthouse CI for performance tracking
4. **Security scanning**: Configure Snyk for advanced security scanning

## 📞 Need Help?

1. Check the detailed documentation in `.github/README.md`
2. Review GitHub Actions logs for specific errors
3. Create an issue with detailed information
4. Contact the development team

## 🎉 Success!

Your CI/CD pipeline is now set up! Every push to `develop` will trigger a staging deployment, and every push to `main` will trigger a production deployment.

---

**Pro Tip**: Use feature branches for development and create pull requests to merge into `develop` for better code review and testing.
