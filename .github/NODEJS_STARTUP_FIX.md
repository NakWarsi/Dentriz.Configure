# 🔧 **Node.js Startup Fix - Azure App Service Configuration**

## 🚨 **Issue Identified**

### **Problem:**
Azure App Service was running your app as a **static site** instead of a **Node.js application**, which caused:
- ❌ Using `default-static-site.js` instead of your custom server
- ❌ No support for server-side rendering (SSR)
- ❌ Potential issues with API calls and routing

### **Root Cause:**
Azure App Service didn't recognize the deployment as a Node.js app, so it defaulted to static site mode.

---

## ✅ **Complete Fix Applied**

### **1. Added Node.js Startup Configuration**
```yaml
- name: Configure startup command
  run: |
    az webapp config set \
      --name ${{ secrets.AZURE_WEBAPP_NAME }} \
      --resource-group ${{ secrets.AZURE_RESOURCE_GROUP }} \
      --startup-file "node server.js"
```

### **2. Enhanced App Settings**
```yaml
--settings \
  WEBSITE_RUN_FROM_PACKAGE=1 \
  SCM_DO_BUILD_DURING_DEPLOYMENT=false \
  WEBSITE_NODE_DEFAULT_VERSION=20.17.0
```

### **3. Included Server Files in Build**
```yaml
- name: Copy server.js to build output
  run: |
    cp Dentriz.Configure.Web/server.js Dentriz.Configure.Web/dist/DentrizWeb/browser/

- name: Create package.json for deployment
  run: |
    # Creates package.json with Express dependency
```

---

## 🎯 **What This Fixes**

### **Before (Static Site Mode):**
```
node /opt/startup/default-static-site.js  # ❌ Wrong startup
```

### **After (Node.js App Mode):**
```
node server.js  # ✅ Correct startup with Express server
```

---

## 🚀 **Expected Results After Next Deployment**

### **✅ Correct Startup Process:**
1. **Azure detects Node.js app** (via package.json)
2. **Runs `node server.js`** instead of static site handler
3. **Express server starts** on port 8080
4. **Serves Angular app** with proper routing support
5. **Handles API calls** correctly

### **✅ Logs Should Show:**
```
Server started on port 8080
Environment: production
```

Instead of:
```
node /opt/startup/default-static-site.js  # ❌ Old behavior
```

---

## 🧪 **Test the Fix**

### **Deploy the Updated Workflow:**
```bash
git checkout -b release-dynamic-fix
git push origin release-dynamic-fix
```

### **Expected Behavior:**
1. ✅ Build includes `server.js` and `package.json`
2. ✅ Azure configures as Node.js app
3. ✅ Startup command set to `node server.js`
4. ✅ Express server starts correctly
5. ✅ Angular app serves with proper routing

---

## 📋 **Key Changes Made**

### **1. Startup Command Configuration:**
- Added `--startup-file "node server.js"`
- Ensures Azure runs your custom server

### **2. App Service Settings:**
- `WEBSITE_RUN_FROM_PACKAGE=1` - Run from deployment package
- `SCM_DO_BUILD_DURING_DEPLOYMENT=false` - Skip build step
- `WEBSITE_NODE_DEFAULT_VERSION=20.17.0` - Use Node.js 20.x

### **3. Build Output Enhancement:**
- Copy `server.js` to build directory
- Create `package.json` with Express dependency
- Ensure Node.js runtime is available

---

## 🎉 **This Should Resolve**

- ❌ ~~Static site mode~~ → ✅ **Node.js app mode**
- ❌ ~~Wrong startup script~~ → ✅ **Custom Express server**
- ❌ ~~No SSR support~~ → ✅ **Full Angular SSR support**
- ❌ ~~API call issues~~ → ✅ **Proper API handling**

The next deployment should run your app as a proper Node.js application with Express server! 🚀
