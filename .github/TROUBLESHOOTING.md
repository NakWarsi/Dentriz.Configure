# 🔧 Troubleshooting Guide

## 🚨 **Common Issues and Solutions**

### **1. Azure CLI Authentication Issues**

#### **Error:** `The process '/usr/bin/az' failed with exit code 1`
**Solution:** 
- ✅ Ensure `AZURE_CREDENTIALS` secret is properly formatted JSON
- ✅ Verify service principal has correct permissions
- ✅ Check that `AZURE_RESOURCE_GROUP` secret matches your actual resource group

#### **Error:** `Authentication failed`
**Solution:**
```bash
# Recreate service principal with correct scope
az ad sp create-for-rbac --name "github-actions-dentriz" --role contributor --scopes /subscriptions/{subscription-id}/resourceGroups/{resource-group-name} --sdk-auth
```

### **2. Build and Deployment Issues**

#### **Error:** `No such file or directory: ./dynamic-build/`
**Solution:** ✅ **FIXED** - Moved API injection to build step where files exist

#### **Error:** `Node.js version mismatch`
**Solution:** ✅ **FIXED** - Updated to Node.js 20.x

#### **Error:** `Missing ApiConfigService imports`
**Solution:** ✅ **FIXED** - Added all missing imports

### **3. Secret Configuration Issues**

#### **Missing Secrets Checklist:**
- [ ] `AZURE_WEBAPP_NAME` - Your App Service name
- [ ] `AZURE_WEBAPP_PUBLISH_PROFILE` - XML content from publish profile
- [ ] `AZURE_WEBAPP_URL` - Your App Service URL
- [ ] `AZURE_CREDENTIALS` - Service principal JSON
- [ ] `AZURE_RESOURCE_GROUP` - Your resource group name

#### **Secret Format Issues:**
- **AZURE_CREDENTIALS:** Must be valid JSON with all required fields
- **AZURE_WEBAPP_PUBLISH_PROFILE:** Must include complete XML content
- **AZURE_RESOURCE_GROUP:** Must match exact resource group name

### **4. API Configuration Issues**

#### **Error:** `window is not defined` (SSR)
**Solution:** ✅ **FIXED** - Added platform detection in ApiConfigService

#### **Error:** `API_BASE_URL not found`
**Solution:** ✅ **FIXED** - Runtime injection script added to build process

### **5. Workflow Structure Issues**

#### **Multiple Workflows Triggering:**
**Solution:** ✅ **FIXED** - Updated branch patterns:
- `release-static-*` → Static deployment only
- `release-dynamic-*` → Dynamic deployment only
- `release-api-*` → API deployment only

#### **Artifact Actions Deprecated:**
**Solution:** ✅ **FIXED** - Updated to v4 actions

## 🔍 **Debugging Steps**

### **1. Check Workflow Logs**
1. Go to GitHub Actions tab
2. Click on failed workflow run
3. Expand each step to see detailed logs
4. Look for specific error messages

### **2. Verify Secrets**
```bash
# Test Azure CLI locally (if you have it installed)
az login
az webapp list --resource-group {your-resource-group}
```

### **3. Test Build Locally**
```bash
cd Dentriz.Configure.Web
npm ci
npm run build:dynamic
```

### **4. Check Azure Resources**
1. Verify App Service exists and is running
2. Check resource group name matches secret
3. Verify service principal has correct permissions

## 📋 **Complete Setup Checklist**

### **Azure Resources:**
- [ ] App Service created and running
- [ ] Resource group identified
- [ ] Service principal created with contributor role
- [ ] API already deployed at `https://dentriz-configure-api.azurewebsites.net/`

### **GitHub Secrets:**
- [ ] `AZURE_WEBAPP_NAME` - App Service name
- [ ] `AZURE_WEBAPP_PUBLISH_PROFILE` - XML content
- [ ] `AZURE_WEBAPP_URL` - App Service URL
- [ ] `AZURE_CREDENTIALS` - Service principal JSON
- [ ] `AZURE_RESOURCE_GROUP` - Resource group name

### **Code Changes:**
- [ ] All API services have `ApiConfigService` imports
- [ ] `ApiConfigService` handles SSR properly
- [ ] Workflows use correct Node.js version (20.x)
- [ ] Artifact actions updated to v4

## 🚀 **Testing Deployment**

### **Test Dynamic Deployment:**
```bash
git checkout -b release-dynamic-test
git push origin release-dynamic-test
```

### **Expected Results:**
- ✅ Single workflow triggered (`deploy-dynamic.yml`)
- ✅ Build completes successfully
- ✅ API URL injected into build
- ✅ Deployment to Azure App Service succeeds
- ✅ App settings configured correctly

## 🆘 **If Still Having Issues**

### **1. Check All Secrets Are Set:**
- Go to GitHub → Settings → Secrets and variables → Actions
- Verify all 5 secrets are listed and have values

### **2. Verify Azure Resources:**
- Check App Service is running in Azure Portal
- Verify resource group name is correct
- Test service principal permissions

### **3. Check Workflow Logs:**
- Look for specific error messages
- Check if any steps are being skipped
- Verify artifact upload/download is working

### **4. Test Locally:**
```bash
# Test the build process
cd Dentriz.Configure.Web
npm ci
npm run build:dynamic

# Check if dist folder is created
ls -la dist/
```

## 📞 **Getting Help**

If you're still experiencing issues:

1. **Check the specific error message** in the workflow logs
2. **Verify all secrets are correctly set** (especially JSON format for AZURE_CREDENTIALS)
3. **Test the Azure CLI commands locally** if possible
4. **Ensure your Azure resources are properly configured**

The most common issues are:
- Missing or incorrectly formatted secrets
- Azure permissions issues
- Resource group name mismatch
- Service principal scope issues

All the major workflow issues have been fixed, so any remaining problems are likely configuration-related! 🎉
