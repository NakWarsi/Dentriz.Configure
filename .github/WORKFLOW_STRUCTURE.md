# 🔄 GitHub Workflows Structure

## 📋 **Current Workflow Configuration**

### **🎯 Single Workflow Per Deployment Type**

#### **1. Static Deployment**
- **Trigger:** `release-static-*` branches
- **Workflow:** `build.yml` + `deploy-static.yml`
- **Process:** Build → Deploy to Azure Static Web Apps

#### **2. Dynamic Deployment** 
- **Trigger:** `release-dynamic-*` branches
- **Workflow:** `deploy-dynamic.yml` (includes build + deploy)
- **Process:** Build → Deploy to Azure App Service

#### **3. API Deployment** (Optional)
- **Trigger:** `release-api-*` branches
- **Workflow:** `api-deploy.yml`
- **Process:** Build → Deploy .NET API to Azure App Service

## 🔧 **Workflow Details**

### **Static Deployment Flow:**
```
release-static-* branch push
    ↓
build.yml (builds static version)
    ↓
deploy-static.yml (deploys to Static Web Apps)
```

### **Dynamic Deployment Flow:**
```
release-dynamic-* branch push
    ↓
deploy-dynamic.yml (builds + deploys to App Service)
```

### **API Deployment Flow:**
```
release-api-* branch push
    ↓
api-deploy.yml (builds + deploys .NET API)
```

## 🚀 **Usage Examples**

### **Deploy Static Version:**
```bash
git checkout -b release-static-v1.0.0
git push origin release-static-v1.0.0
# Triggers: build.yml → deploy-static.yml
```

### **Deploy Dynamic Version:**
```bash
git checkout -b release-dynamic-v1.0.0
git push origin release-dynamic-v1.0.0
# Triggers: deploy-dynamic.yml (single workflow)
```

### **Deploy API Only:**
```bash
git checkout -b release-api-v1.0.0
git push origin release-api-v1.0.0
# Triggers: api-deploy.yml (single workflow)
```

## ✅ **Benefits of This Structure**

### **1. Single Workflow Per Deployment**
- No more multiple workflows triggering
- Clear separation of concerns
- Easier to debug and monitor

### **2. Optimized for Your Use Case**
- Dynamic deployment includes build process
- No unnecessary API deployment for dynamic branches
- Static deployment remains separate

### **3. Flexible Deployment Options**
- Deploy static version independently
- Deploy dynamic version independently  
- Deploy API independently (if needed)

## 📝 **Workflow Files Summary**

| Workflow File | Triggers | Purpose |
|---------------|----------|---------|
| `build.yml` | `release-static-*` | Builds static version |
| `deploy-static.yml` | `release-static-*` | Deploys to Static Web Apps |
| `deploy-dynamic.yml` | `release-dynamic-*` | Builds + deploys dynamic version |
| `api-deploy.yml` | `release-api-*` | Builds + deploys API |

## 🔍 **Troubleshooting**

### **If Multiple Workflows Still Trigger:**

1. **Check branch naming:**
   - Static: `release-static-*`
   - Dynamic: `release-dynamic-*`
   - API: `release-api-*`

2. **Check workflow files:**
   - Ensure only one workflow per branch pattern
   - Remove any duplicate triggers

3. **Verify workflow syntax:**
   - Check YAML indentation
   - Validate trigger patterns

## 🎯 **Recommended Branch Strategy**

### **For Static Deployment:**
```bash
git checkout -b release-static-v1.0.0
git push origin release-static-v1.0.0
```

### **For Dynamic Deployment:**
```bash
git checkout -b release-dynamic-v1.0.0
git push origin release-dynamic-v1.0.0
```

### **For API Deployment (if needed):**
```bash
git checkout -b release-api-v1.0.0
git push origin release-api-v1.0.0
```

## 🚨 **Important Notes**

### **Dynamic Deployment:**
- Only triggers `deploy-dynamic.yml`
- Includes build process within the workflow
- Connects to your existing API
- No separate build workflow needed

### **Static Deployment:**
- Triggers `build.yml` then `deploy-static.yml`
- Uses JSON files from assets
- No API calls required

### **API Deployment:**
- Only triggers `api-deploy.yml`
- Deploys .NET API to Azure App Service
- Separate from web app deployment

## ✅ **Verification Steps**

### **Test Dynamic Deployment:**
1. Create branch: `release-dynamic-test`
2. Push to trigger workflow
3. Check Actions tab - should see only 1 workflow
4. Verify deployment success

### **Test Static Deployment:**
1. Create branch: `release-static-test`
2. Push to trigger workflow
3. Check Actions tab - should see 2 workflows (build + deploy)
4. Verify deployment success

This structure ensures you get exactly one workflow per deployment type! 🎉
