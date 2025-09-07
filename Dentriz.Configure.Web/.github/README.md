# CI/CD Pipeline Documentation

This repository includes a comprehensive CI/CD pipeline using GitHub Actions for automated building, testing, and deployment of the DentRiz Angular application.

## 🚀 Pipeline Overview

### Workflows

1. **`ci-cd.yml`** - Main CI/CD pipeline
2. **`pr-checks.yml`** - Pull request validation
3. **`deploy-azure.yml`** - Azure App Service deployment
4. **`deploy-azure-advanced.yml`** - Advanced Azure deployment with staging/production

## 📋 Pipeline Stages

### 1. Build and Test
- **Node.js Setup**: Uses Node.js 18
- **Dependency Installation**: Installs npm packages
- **Linting**: Runs ESLint checks
- **Testing**: Executes unit tests with coverage
- **Building**: Creates production build
- **Artifact Upload**: Saves build artifacts

### 2. Security Scanning
- **npm Audit**: Checks for known vulnerabilities
- **Snyk Scan**: Advanced security analysis
- **Dependency Review**: Analyzes package dependencies

### 3. Deployment
- **Staging**: Deploys to staging on `develop` branch
- **Production**: Deploys to production on `main` branch

### 4. Performance Testing
- **Lighthouse CI**: Performance, accessibility, and SEO audits
- **Performance Metrics**: Core Web Vitals analysis

## 🔧 Configuration

### Environment Variables

Set these secrets in your GitHub repository:

#### For Azure App Service Deployment:
```
AZURE_WEBAPP_NAME=your-app-service-name
AZURE_WEBAPP_PUBLISH_PROFILE=your-publish-profile-content
```

#### For Azure App Service with Staging/Production:
```
AZURE_WEBAPP_NAME_STAGING=your-staging-app-service-name
AZURE_WEBAPP_PUBLISH_PROFILE_STAGING=your-staging-publish-profile-content
AZURE_WEBAPP_NAME_PRODUCTION=your-production-app-service-name
AZURE_WEBAPP_PUBLISH_PROFILE_PRODUCTION=your-production-publish-profile-content
```

#### For Security Scanning:
```
SNYK_TOKEN=your_snyk_token
```

### Branch Strategy

- **`main`**: Production deployments
- **`develop`**: Staging deployments
- **Feature branches**: Pull request checks only

## 🛠️ Setup Instructions

### 1. Enable GitHub Actions

1. Go to your repository settings
2. Navigate to "Actions" → "General"
3. Enable "Allow all actions and reusable workflows"

### 2. Configure Secrets

1. Go to repository settings
2. Navigate to "Secrets and variables" → "Actions"
3. Add the required secrets mentioned above

### 3. Set Up Environments (Optional)

1. Go to repository settings
2. Navigate to "Environments"
3. Create `staging` and `production` environments
4. Add environment-specific secrets

### 4. Configure Branch Protection

1. Go to repository settings
2. Navigate to "Branches"
3. Add branch protection rules for `main` and `develop`
4. Require status checks to pass before merging

## 📊 Monitoring and Notifications

### Status Checks
- Build status
- Test results
- Security scan results
- Performance metrics

### Notifications
- Slack integration (optional)
- Email notifications
- GitHub status updates

## 🔍 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Review build logs for specific errors

2. **Test Failures**
   - Ensure all tests pass locally
   - Check for flaky tests
   - Review test coverage requirements

3. **Deployment Issues**
   - Verify deployment tokens are valid
   - Check hosting platform configuration
   - Review deployment logs

### Debug Commands

```bash
# Run locally to test pipeline steps
npm ci
npm run lint
npm run test
npm run build
```

## 📈 Performance Optimization

### Build Optimization
- Caching npm dependencies
- Parallel job execution
- Optimized build artifacts

### Testing Optimization
- Parallel test execution
- Selective test running
- Coverage reporting

## 🔒 Security Best Practices

1. **Secret Management**
   - Use GitHub Secrets for sensitive data
   - Rotate tokens regularly
   - Limit token permissions

2. **Dependency Security**
   - Regular security audits
   - Automated vulnerability scanning
   - Dependency updates

3. **Code Quality**
   - Automated linting
   - Type checking
   - Code coverage requirements

## 📝 Customization

### Adding New Jobs

1. Create a new workflow file in `.github/workflows/`
2. Define triggers and conditions
3. Add required steps and actions

### Modifying Existing Workflows

1. Edit the workflow YAML files
2. Test changes in a feature branch
3. Update documentation

### Environment-Specific Configurations

1. Use environment variables
2. Create environment-specific workflows
3. Configure conditional deployments

## 🤝 Contributing

When contributing to the CI/CD pipeline:

1. Test changes locally first
2. Create a feature branch
3. Update documentation
4. Request review from maintainers

## 📞 Support

For issues with the CI/CD pipeline:

1. Check the GitHub Actions logs
2. Review this documentation
3. Create an issue with detailed information
4. Contact the development team
