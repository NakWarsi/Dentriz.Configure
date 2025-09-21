# 🚀 CI/CD Pipeline Documentation

## 📋 **Overview**

This repository implements a dual-mode deployment strategy with separate CI/CD pipelines for static and dynamic versions of the Angular application.

## 🌟 **Deployment Strategy**

### **Static Version**
- **Trigger:** Branches with prefix `release-static-*`
- **Target:** Azure Static Web Apps
- **Use Case:** Static content delivery with global CDN
- **Example Branch:** `release-static-v1.0.0`

### **Dynamic Version**
- **Trigger:** Branches with prefix `release-dynamic-*`
- **Target:** Azure App Service
- **Use Case:** Full-stack application with API integration
- **Example Branch:** `release-dynamic-v1.0.0`

## 🔄 **Workflow Files**

### **1. `build.yml` - Shared Build Pipeline**
- **Purpose:** Builds both static and dynamic versions
- **Triggers:** 
  - Push to `release-static-*` or `release-dynamic-*` branches
  - Pull requests to main/develop
- **Outputs:** 
  - Static build artifacts
  - Dynamic build artifacts
  - API build artifacts

### **2. `deploy-static.yml` - Static Deployment**
- **Purpose:** Deploys static version to Azure Static Web Apps
- **Trigger:** Push to `release-static-*` branches
- **Dependencies:** Requires static build artifacts from `build.yml`

### **3. `deploy-dynamic.yml` - Dynamic Deployment**
- **Purpose:** Deploys dynamic version to Azure App Service
- **Trigger:** Push to `release-dynamic-*` branches
- **Dependencies:** Requires dynamic build artifacts from `build.yml`

### **4. `api-deploy.yml` - API Deployment**
- **Purpose:** Deploys .NET API to Azure App Service
- **Trigger:** Push to `release-dynamic-*` branches
- **Dependencies:** Requires API build artifacts from `build.yml`

## 🎯 **Branch Strategy**

### **Static Deployment Branches**
```bash
# Create static release branch
git checkout -b release-static-v1.0.0
git push origin release-static-v1.0.0
```

### **Dynamic Deployment Branches**
```bash
# Create dynamic release branch
git checkout -b release-dynamic-v1.0.0
git push origin release-dynamic-v1.0.0
```

## 🔧 **Build Process**

### **Static Build**
```bash
npm run build:static
# Output: dist/ folder with static files
```

### **Dynamic Build**
```bash
npm run build:dynamic
# Output: dist/ folder with dynamic files
```

### **API Build**
```bash
dotnet publish --configuration Release
# Output: api-publish/ folder with .NET API
```

## 🌐 **Deployment Targets**

### **Static Web App**
- **URL:** `https://dentriz-static.azurestaticapps.net`
- **Features:** Global CDN, automatic HTTPS, custom domains
- **Use Case:** Marketing pages, documentation, static content

### **Dynamic App Service**
- **URL:** `https://dentriz-dynamic-app.azurewebsites.net`
- **Features:** Full-stack application, server-side rendering
- **Use Case:** Admin panels, dynamic content, user interactions

### **API App Service**
- **URL:** `https://dentriz-api.azurewebsites.net`
- **Features:** REST API, database integration, authentication
- **Use Case:** Backend services, data processing, business logic

## 🔐 **Required Secrets**

See [SECRETS_SETUP.md](./SECRETS_SETUP.md) for detailed secret configuration.

### **Quick Secret List:**
- `AZURE_STATIC_WEB_APPS_API_TOKEN`
- `AZURE_WEBAPP_NAME`
- `AZURE_WEBAPP_PUBLISH_PROFILE`
- `AZURE_API_APP_NAME`
- `AZURE_API_PUBLISH_PROFILE`
- `COSMOS_DB_CONNECTION_STRING`
- `FRONTEND_URLS`
- `API_BASE_URL`

## 🚀 **Deployment Flow**

### **Static Deployment Flow:**
```
1. Push to release-static-* branch
2. Trigger build.yml → Create static artifacts
3. Trigger deploy-static.yml → Deploy to Static Web Apps
4. Verify deployment at Static Web App URL
```

### **Dynamic Deployment Flow:**
```
1. Push to release-dynamic-* branch
2. Trigger build.yml → Create dynamic + API artifacts
3. Trigger deploy-dynamic.yml → Deploy frontend to App Service
4. Trigger api-deploy.yml → Deploy API to App Service
5. Configure CORS and connections
6. Verify deployment at App Service URLs
```

## 🛠️ **Manual Deployment**

### **Using GitHub Actions UI:**
1. Go to "Actions" tab in GitHub
2. Select the desired workflow
3. Click "Run workflow"
4. Choose branch and environment
5. Click "Run workflow"

### **Using GitHub CLI:**
```bash
# Deploy static version
gh workflow run deploy-static.yml --ref release-static-v1.0.0

# Deploy dynamic version
gh workflow run deploy-dynamic.yml --ref release-dynamic-v1.0.0
```

## 📊 **Monitoring & Logs**

### **View Deployment Logs:**
1. Go to "Actions" tab in GitHub
2. Click on the workflow run
3. Click on individual jobs to see detailed logs
4. Check for any error messages or warnings

### **Health Checks:**
- **Static:** Verify Static Web App is accessible
- **Dynamic:** Verify App Service is running
- **API:** Check API health endpoint (`/health`)

## 🔄 **Rollback Strategy**

### **Static Rollback:**
1. Revert to previous commit
2. Push to new `release-static-*` branch
3. Deploy previous version

### **Dynamic Rollback:**
1. Use Azure App Service deployment slots
2. Swap production and staging slots
3. Or revert and redeploy

## 🚨 **Troubleshooting**

### **Common Issues:**

#### **Build Failures:**
- Check Node.js and .NET versions
- Verify package.json and .csproj files
- Check for missing dependencies

#### **Deployment Failures:**
- Verify all secrets are correctly set
- Check Azure resource permissions
- Verify publish profiles are valid

#### **Runtime Issues:**
- Check application settings
- Verify database connections
- Check CORS configuration

### **Debug Steps:**
1. Check workflow logs for specific errors
2. Verify all secrets are set correctly
3. Test Azure resources manually
4. Check network connectivity

## 📈 **Performance Optimization**

### **Static Web App:**
- Enable CDN caching
- Optimize images and assets
- Use compression

### **App Service:**
- Configure auto-scaling
- Use deployment slots for zero-downtime
- Monitor performance metrics

### **API:**
- Implement caching strategies
- Optimize database queries
- Use connection pooling

## 🔒 **Security Considerations**

### **Secrets Management:**
- Rotate secrets regularly
- Use environment-specific secrets
- Limit access to sensitive data

### **Network Security:**
- Configure CORS properly
- Use HTTPS everywhere
- Implement rate limiting

### **Monitoring:**
- Set up alerts for failures
- Monitor for security threats
- Regular security audits

## 📝 **Best Practices**

### **Branch Management:**
- Use semantic versioning
- Keep release branches clean
- Delete old release branches

### **Deployment:**
- Test in staging first
- Use blue-green deployments
- Monitor deployment health

### **Code Quality:**
- Run tests before deployment
- Use linting and formatting
- Code review process

## 🆘 **Support**

### **Documentation:**
- [Azure Static Web Apps](https://docs.microsoft.com/en-us/azure/static-web-apps/)
- [Azure App Service](https://docs.microsoft.com/en-us/azure/app-service/)
- [GitHub Actions](https://docs.github.com/en/actions)

### **Contact:**
- Create GitHub issues for bugs
- Use discussions for questions
- Check workflow logs for errors
