# 🚀 Deployment Checklist

## ✅ Pre-Deployment Checklist

### 1. Environment Configuration
- [x] `environment.prod.ts` has `ENABLE_EDITING: false` (production is non-editable)
- [x] `environment.ts` has `ENABLE_EDITING: false` (development is non-editable)
- [x] Global configuration service is properly configured

### 2. Build Configuration
- [x] Angular build configuration is correct
- [x] Output path is set to `dist/DentrizWeb/browser`
- [x] All components are updated with global configuration

### 3. GitHub Actions Workflow
- [x] Workflow file created: `.github/workflows/azure-static-web-apps.yml`
- [x] Branch name updated to: `no-edit`
- [x] Paths updated to match project structure: `Dentriz.Configure.Web`
- [x] Node.js version set to 20
- [x] Build and deploy jobs configured

### 4. Azure Configuration
- [ ] Azure Static Web App created
- [ ] GitHub repository connected to Azure
- [ ] `AZURE_STATIC_WEB_APPS_API_TOKEN` secret added to GitHub repository

## 🔧 Deployment Steps

### Step 1: Commit and Push Changes
```bash
git add .
git commit -m "feat: Add global editing control and deployment configuration"
git push origin no-edit
```

### Step 2: Verify GitHub Actions
1. Go to your GitHub repository
2. Click on "Actions" tab
3. Verify the workflow runs successfully
4. Check that the build completes without errors

### Step 3: Azure Static Web App Setup
1. Go to Azure Portal
2. Create a new Static Web App
3. Connect it to your GitHub repository
4. Set the branch to `no-edit`
5. Set the app location to `Dentriz.Configure.Web`
6. Set the output location to `dist/DentrizWeb/browser`

### Step 4: Configure GitHub Secrets
1. Go to your GitHub repository
2. Click on "Settings" → "Secrets and variables" → "Actions"
3. Add the following secret:
   - Name: `AZURE_STATIC_WEB_APPS_API_TOKEN`
   - Value: (Get this from Azure Static Web App deployment token)

## 🎯 Post-Deployment Verification

### 1. Website Functionality
- [ ] Website loads correctly
- [ ] All pages are accessible
- [ ] No edit buttons are visible (✏️)
- [ ] All content is read-only
- [ ] Navigation works properly

### 2. Performance Check
- [ ] Page load times are acceptable
- [ ] Images load correctly
- [ ] No console errors
- [ ] Mobile responsiveness works

### 3. Security Check
- [ ] No editing functionality is accessible
- [ ] Admin panel is not accessible without `?admin=true`
- [ ] All forms are disabled

## 🔄 Rollback Plan

If deployment fails:
1. Check GitHub Actions logs for errors
2. Verify Azure Static Web App configuration
3. Check that all secrets are properly configured
4. Ensure the branch name matches in both GitHub and Azure

## 📝 Notes

- **Production Environment**: Always has `ENABLE_EDITING: false`
- **Development Environment**: Currently set to `ENABLE_EDITING: false` for testing
- **Branch**: `no-edit` (matches the current branch)
- **Build Output**: `dist/DentrizWeb/browser`
- **Node Version**: 20 (as specified in workflow)

## 🆘 Troubleshooting

### Common Issues:
1. **Build Fails**: Check Node.js version and dependencies
2. **Deploy Fails**: Verify Azure token and repository connection
3. **Edit Buttons Still Show**: Check environment configuration
4. **404 Errors**: Verify output location path

### Support:
- Check GitHub Actions logs
- Verify Azure Static Web App logs
- Ensure all paths are correct in the workflow file
