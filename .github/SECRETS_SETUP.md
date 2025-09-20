# 🔐 GitHub Secrets Setup Guide

This document outlines all the GitHub secrets required for the CI/CD pipelines.

## 📋 **Required Secrets Overview**

### **Static Deployment Secrets**
- `AZURE_STATIC_WEB_APPS_API_TOKEN`
- `STATIC_WEB_APP_URL`

### **Dynamic Deployment Secrets**
- `AZURE_WEBAPP_NAME`
- `AZURE_WEBAPP_PUBLISH_PROFILE`
- `AZURE_WEBAPP_URL`
- `API_BASE_URL`

### **API Deployment Secrets**
- `AZURE_API_APP_NAME`
- `AZURE_API_PUBLISH_PROFILE`
- `COSMOS_DB_CONNECTION_STRING`
- `FRONTEND_URLS`

---

## 🌐 **Static Web App Secrets**

### **`AZURE_STATIC_WEB_APPS_API_TOKEN`**
- **Purpose:** Authenticates GitHub Actions to deploy to Azure Static Web Apps
- **How to get:**
  1. Go to Azure Portal → Static Web Apps
  2. Select your static web app
  3. Go to "Manage deployment token"
  4. Copy the token
- **Security Level:** 🔴 **HIGH** - Full deployment access
- **Example:** `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0`

### **`STATIC_WEB_APP_URL`**
- **Purpose:** URL of the deployed static web app (for notifications)
- **How to get:**
  1. Azure Portal → Static Web Apps → Your app
  2. Copy the "URL" from the overview page
- **Security Level:** 🟢 **LOW** - Public URL
- **Example:** `https://dentriz-static.azurestaticapps.net`

---

## ⚡ **Dynamic App Service Secrets**

### **`AZURE_WEBAPP_NAME`**
- **Purpose:** Name of the Azure App Service for dynamic frontend
- **How to get:**
  1. Azure Portal → App Services
  2. Select your app service
  3. Copy the name from the overview
- **Security Level:** 🟡 **MEDIUM** - Public identifier
- **Example:** `dentriz-dynamic-app`

### **`AZURE_WEBAPP_PUBLISH_PROFILE`**
- **Purpose:** Contains deployment credentials for the App Service
- **How to get:**
  1. Azure Portal → App Services → Your app
  2. Click "Get publish profile"
  3. Download the .publishsettings file
  4. Copy the entire XML content
- **Security Level:** 🔴 **HIGH** - Contains deployment credentials
- **Example:** 
```xml
<?xml version="1.0" encoding="utf-8"?>
<publishData>
  <publishProfile profileName="dentriz-dynamic-app - Web Deploy" publishMethod="MSDeploy" publishUrl="dentriz-dynamic-app.scm.azurewebsites.net:443" msdeploySite="dentriz-dynamic-app" userName="$dentriz-dynamic-app" userPWD="abc123..." destinationAppUrl="https://dentriz-dynamic-app.azurewebsites.net" SQLServerDBConnectionString="" mySQLDBConnectionString="" hostingProviderForumLink="" controlPanelLink="https://manage.windowsazure.com" webSystem="WebSites">
    <databases />
  </publishProfile>
</publishData>
```

### **`AZURE_WEBAPP_URL`**
- **Purpose:** URL of the deployed dynamic app (for notifications)
- **How to get:**
  1. Azure Portal → App Services → Your app
  2. Copy the "URL" from the overview
- **Security Level:** 🟢 **LOW** - Public URL
- **Example:** `https://dentriz-dynamic-app.azurewebsites.net`

### **`API_BASE_URL`**
- **Purpose:** URL where the frontend can reach the API
- **How to get:**
  1. Deploy the API first
  2. Copy the API App Service URL
- **Security Level:** 🟡 **MEDIUM** - Public URL but environment-specific
- **Example:** `https://dentriz-api.azurewebsites.net`

---

## 🔧 **API App Service Secrets**

### **`AZURE_API_APP_NAME`**
- **Purpose:** Name of the Azure App Service for the .NET API
- **How to get:**
  1. Azure Portal → App Services
  2. Select your API app service
  3. Copy the name from the overview
- **Security Level:** 🟡 **MEDIUM** - Public identifier
- **Example:** `dentriz-api`

### **`AZURE_API_PUBLISH_PROFILE`**
- **Purpose:** Contains deployment credentials for the API App Service
- **How to get:**
  1. Azure Portal → App Services → Your API app
  2. Click "Get publish profile"
  3. Download the .publishsettings file
  4. Copy the entire XML content
- **Security Level:** 🔴 **HIGH** - Contains deployment credentials
- **Example:** Same format as `AZURE_WEBAPP_PUBLISH_PROFILE`

### **`COSMOS_DB_CONNECTION_STRING`**
- **Purpose:** Connection string to Azure Cosmos DB
- **How to get:**
  1. Azure Portal → Cosmos DB accounts
  2. Select your Cosmos DB account
  3. Go to "Keys" in the left menu
  4. Copy the "Primary Connection String"
- **Security Level:** 🔴 **CRITICAL** - Database access credentials
- **Example:** `AccountEndpoint=https://dentriz-cosmos.documents.azure.com:443/;AccountKey=abc123...;`

### **`FRONTEND_URLS`**
- **Purpose:** Comma-separated list of allowed frontend URLs for CORS
- **Format:** Comma-separated URLs
- **Security Level:** 🟡 **MEDIUM** - Controls API access
- **Example:** `https://dentriz-static.azurestaticapps.net,https://dentriz-dynamic-app.azurewebsites.net`

---

## 🛠️ **How to Add Secrets to GitHub**

### **Step 1: Navigate to Repository Settings**
1. Go to your GitHub repository
2. Click on "Settings" tab
3. In the left sidebar, click "Secrets and variables"
4. Click "Actions"

### **Step 2: Add Each Secret**
1. Click "New repository secret"
2. Enter the secret name (exactly as listed above)
3. Enter the secret value
4. Click "Add secret"

### **Step 3: Verify Secrets**
- All secrets should be listed in the "Repository secrets" section
- Secrets are masked in logs and cannot be viewed once saved

---

## 🔄 **Environment-Specific Secrets**

### **Production Environment**
- Use production Azure resources
- URLs point to production domains
- Database connection strings for production Cosmos DB

### **Staging Environment**
- Use staging Azure resources
- URLs point to staging domains
- Database connection strings for staging Cosmos DB

---

## 🚨 **Security Best Practices**

### **Secret Rotation**
- **Publish Profiles:** Rotate every 90 days
- **API Tokens:** Rotate every 180 days
- **Connection Strings:** Rotate when compromised

### **Access Control**
- Limit who can view/modify secrets
- Use environment protection rules
- Monitor secret usage in workflow logs

### **Monitoring**
- Set up alerts for failed deployments
- Monitor for unauthorized access attempts
- Regular security audits

---

## 📝 **Quick Setup Checklist**

- [ ] Create Azure Static Web App and get API token
- [ ] Create Azure App Services for dynamic app and API
- [ ] Get publish profiles for both App Services
- [ ] Set up Cosmos DB and get connection string
- [ ] Add all secrets to GitHub repository
- [ ] Test deployment with `release-static-test` branch
- [ ] Test deployment with `release-dynamic-test` branch
- [ ] Verify all URLs and endpoints work correctly

---

## 🆘 **Troubleshooting**

### **Common Issues:**
1. **Invalid publish profile:** Re-download from Azure Portal
2. **API token expired:** Generate new token in Azure Portal
3. **CORS errors:** Check `FRONTEND_URLS` secret format
4. **Database connection failed:** Verify `COSMOS_DB_CONNECTION_STRING`

### **Debug Steps:**
1. Check workflow logs for specific error messages
2. Verify all secrets are correctly set
3. Test Azure resources manually
4. Check network connectivity and firewall rules
