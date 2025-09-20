# 🚀 Dynamic Deployment Secrets

## 📋 **Required GitHub Secrets for Dynamic Deployment**

Since you already have the API deployed at `https://dentriz-configure-api.azurewebsites.net/`, you only need these **3 secrets** for dynamic web app deployment:

### **🔑 Essential Secrets:**

#### **1. `AZURE_WEBAPP_NAME`**
- **Purpose:** Name of your Azure App Service for the dynamic frontend
- **Example:** `dentriz-dynamic-app`
- **How to get:** Azure Portal → App Services → Your app → Overview → Name

#### **2. `AZURE_WEBAPP_PUBLISH_PROFILE`**
- **Purpose:** Deployment credentials for the App Service
- **Format:** XML content from .publishsettings file
- **How to get:** 
  1. Azure Portal → App Services → Your app
  2. Click "Get publish profile"
  3. Download the .publishsettings file
  4. Copy the entire XML content

#### **3. `AZURE_WEBAPP_URL`**
- **Purpose:** URL of your deployed dynamic app (for notifications)
- **Example:** `https://dentriz-dynamic-app.azurewebsites.net`
- **How to get:** Azure Portal → App Services → Your app → Overview → URL

## 🛠️ **How to Add Secrets:**

### **Step 1: Navigate to Repository Settings**
1. Go to your GitHub repository
2. Click "Settings" tab
3. In left sidebar, click "Secrets and variables"
4. Click "Actions"

### **Step 2: Add Each Secret**
1. Click "New repository secret"
2. Enter the secret name (exactly as listed above)
3. Enter the secret value
4. Click "Add secret"

## 🚀 **Deployment Process:**

### **What Happens When You Push to `release-dynamic-*`:**

1. **Build Phase:**
   - Builds Angular app with production environment
   - Uses `https://dentriz-configure-api.azurewebsites.net/api` as API endpoint
   - Creates static files in `dist/` folder

2. **Deploy Phase:**
   - Downloads build artifacts
   - Deploys to your Azure App Service
   - Configures app settings
   - Injects API URL at runtime

3. **Result:**
   - Your dynamic web app is live at your App Service URL
   - Connected to your existing API at `https://dentriz-configure-api.azurewebsites.net/`

## 📝 **Example Secret Values:**

### **`AZURE_WEBAPP_NAME`**
```
dentriz-dynamic-app
```

### **`AZURE_WEBAPP_PUBLISH_PROFILE`**
```xml
<?xml version="1.0" encoding="utf-8"?>
<publishData>
  <publishProfile profileName="dentriz-dynamic-app - Web Deploy" publishMethod="MSDeploy" publishUrl="dentriz-dynamic-app.scm.azurewebsites.net:443" msdeploySite="dentriz-dynamic-app" userName="$dentriz-dynamic-app" userPWD="abc123..." destinationAppUrl="https://dentriz-dynamic-app.azurewebsites.net" SQLServerDBConnectionString="" mySQLDBConnectionString="" hostingProviderForumLink="" controlPanelLink="https://manage.windowsazure.com" webSystem="WebSites">
    <databases />
  </publishProfile>
</publishData>
```

### **`AZURE_WEBAPP_URL`**
```
https://dentriz-dynamic-app.azurewebsites.net
```

## ✅ **Testing Your Setup:**

### **1. Add the 3 secrets to GitHub**

### **2. Create and push a dynamic release branch:**
```bash
git checkout -b release-dynamic-v1.0.0
git push origin release-dynamic-v1.0.0
```

### **3. Monitor the deployment:**
- Go to "Actions" tab in GitHub
- Watch the "Deploy Dynamic Version" workflow
- Check for any errors in the logs

### **4. Verify deployment:**
- Visit your App Service URL
- Check that API calls work (should connect to your existing API)
- Verify dynamic content loads correctly

## 🔍 **Troubleshooting:**

### **Common Issues:**

#### **"App Service not found"**
- Verify `AZURE_WEBAPP_NAME` matches your App Service name exactly
- Check that the App Service exists in the correct Azure subscription

#### **"Publish profile invalid"**
- Re-download the publish profile from Azure Portal
- Ensure the entire XML content is copied (including the XML declaration)

#### **"API connection failed"**
- Verify your API at `https://dentriz-configure-api.azurewebsites.net/` is running
- Check CORS settings on your API
- Verify the API endpoints are accessible

### **Debug Steps:**
1. Check workflow logs in GitHub Actions
2. Verify App Service is accessible in Azure Portal
3. Test API connectivity: `curl https://dentriz-configure-api.azurewebsites.net/api/header`
4. Check browser console for API errors

## 📋 **Quick Checklist:**

- [ ] `AZURE_WEBAPP_NAME` - Your App Service name
- [ ] `AZURE_WEBAPP_PUBLISH_PROFILE` - Deployment credentials
- [ ] `AZURE_WEBAPP_URL` - Your App Service URL
- [ ] Test deployment with `release-dynamic-*` branch
- [ ] Verify API connectivity to your existing API
- [ ] Check dynamic content loading

## 🎯 **What You DON'T Need:**

- ❌ API deployment secrets (API is already deployed)
- ❌ Database connection strings
- ❌ API publish profiles
- ❌ .NET SDK setup

## 🚀 **Ready to Deploy!**

Once you've added the 3 secrets, your dynamic deployment will work automatically when you push to a `release-dynamic-*` branch! 🎉
