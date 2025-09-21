# 🔧 Centralized API Configuration

## 📋 **Overview**

The application now uses a centralized API configuration system that allows the API endpoint to be dynamically configured during deployment without code changes.

## 🏗️ **Architecture**

### **Core Components:**

1. **`ApiConfigService`** - Centralized service for API endpoint management
2. **Environment Files** - Different configurations for development and production
3. **GitHub Actions** - Automatic API URL injection during deployment

## 🔧 **Implementation Details**

### **1. ApiConfigService (`src/app/core/services/api-config.service.ts`)**

```typescript
@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {
  private readonly baseUrl: string;

  constructor() {
    // Use environment variable if available, otherwise fallback to environment config
    this.baseUrl = (window as any).API_BASE_URL || environment.apiBaseUrl;
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }

  getEndpointUrl(endpoint: string): string {
    const baseUrl = this.getBaseUrl();
    const cleanBaseUrl = baseUrl.endsWith('/api') ? baseUrl : `${baseUrl}/api`;
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
    return `${cleanBaseUrl}/${cleanEndpoint}`;
  }
}
```

### **2. Environment Configuration**

#### **Development (`src/environments/environment.ts`)**
```typescript
export const environment = {
  production: false,
  dataSource: 'api' as 'api' | 'json',
  apiBaseUrl: 'http://localhost:5208/api',
  enableEditing: true,
  enableApiCalls: true
};
```

#### **Production (`src/environments/environment.production.ts`)**
```typescript
export const environment = {
  production: true,
  dataSource: 'api' as 'api' | 'json',
  apiBaseUrl: 'https://dentriz-configure-api.azurewebsites.net/api',
  enableEditing: true,
  enableApiCalls: true
};
```

### **3. API Service Integration**

All API services now use the centralized configuration:

```typescript
export class HeaderApiService {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService
  ) { }

  private get configUrl(): string {
    return this.apiConfig.getEndpointUrl('header');
  }
}
```

## 🚀 **Deployment Process**

### **Static Deployment**
- Uses `environment.static.ts` (JSON mode)
- No API calls required
- Deploys to Azure Static Web Apps

### **Dynamic Deployment**
- Uses `environment.production.ts` (API mode)
- GitHub Actions injects runtime API URL
- Deploys to Azure App Service

## 🔄 **GitHub Actions Integration**

### **Dynamic Deployment Workflow**

The `deploy-dynamic.yml` workflow:

1. **Builds** the dynamic version using production environment
2. **Injects** runtime API URL via JavaScript injection
3. **Deploys** to Azure App Service
4. **Configures** app settings with API URL

```yaml
- name: Inject API URL into environment
  run: |
    # Create a script to inject API URL at runtime
    cat > ./dynamic-build/inject-api-url.js << 'EOF'
    (function() {
      if (typeof window !== 'undefined') {
        window.API_BASE_URL = 'https://dentriz-configure-api.azurewebsites.net/api';
      }
    })();
    EOF
    
    # Inject the script into index.html
    sed -i 's|</head>|  <script src="inject-api-url.js"></script>\n</head>|' ./dynamic-build/index.html
```

## 🎯 **Benefits**

### **1. Centralized Management**
- Single point of configuration for all API endpoints
- Easy to update API URL without code changes
- Consistent endpoint handling across all services

### **2. Environment Flexibility**
- Different API URLs for development and production
- Runtime configuration injection
- No hardcoded URLs in service files

### **3. Deployment Automation**
- GitHub Actions automatically injects correct API URL
- No manual configuration required
- Supports multiple environments

### **4. Maintainability**
- Easy to add new API services
- Consistent pattern across all services
- Type-safe configuration

## 🔧 **Usage Examples**

### **Adding a New API Service**

1. **Create the service file:**
```typescript
export class NewApiService {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService
  ) { }

  private get configUrl(): string {
    return this.apiConfig.getEndpointUrl('new-endpoint');
  }
}
```

2. **Use in components:**
```typescript
constructor(private newApiService: NewApiService) { }
```

### **Changing API URL**

#### **For Development:**
Update `src/environments/environment.ts`:
```typescript
apiBaseUrl: 'http://new-api-url:port/api'
```

#### **For Production:**
Update GitHub Actions workflow or environment variables.

## 🛠️ **Configuration Options**

### **Environment Variables**

The system supports multiple configuration sources:

1. **Runtime Injection** (Highest Priority)
   - `window.API_BASE_URL` - Injected by GitHub Actions

2. **Environment Files** (Fallback)
   - `environment.apiBaseUrl` - From environment files

### **Endpoint Configuration**

All endpoints are automatically constructed:
- Base URL: `https://dentriz-configure-api.azurewebsites.net/api`
- Endpoint: `header` → Full URL: `https://dentriz-configure-api.azurewebsites.net/api/header`

## 🚨 **Troubleshooting**

### **Common Issues:**

#### **API URL Not Updating**
- Check if `ApiConfigService` is properly injected
- Verify environment file configuration
- Check runtime injection script

#### **CORS Errors**
- Ensure API server allows frontend domain
- Check `FRONTEND_URLS` in API deployment secrets

#### **Build Failures**
- Verify all API services use `ApiConfigService`
- Check import statements
- Ensure constructor injection is correct

### **Debug Steps:**

1. **Check Console Logs:**
```javascript
console.log('API Base URL:', window.API_BASE_URL);
console.log('Environment API URL:', environment.apiBaseUrl);
```

2. **Verify Service Configuration:**
```typescript
// In any API service
console.log('Config URL:', this.configUrl);
```

3. **Test API Connectivity:**
```bash
curl https://dentriz-configure-api.azurewebsites.net/api/header
```

## 📈 **Future Enhancements**

### **Planned Features:**
- Multiple API endpoint support
- API versioning
- Request/response interceptors
- Caching configuration
- Error handling strategies

### **Configuration Options:**
- API timeout settings
- Retry policies
- Authentication headers
- Request logging

## 🔒 **Security Considerations**

### **API URL Security:**
- Use HTTPS for all production endpoints
- Validate API URLs before use
- Implement CORS properly
- Monitor API access logs

### **Environment Security:**
- Never commit production API URLs to code
- Use GitHub Secrets for sensitive configuration
- Rotate API keys regularly
- Monitor deployment logs

## 📝 **Best Practices**

### **Development:**
- Use localhost for development
- Test with different API URLs
- Verify fallback mechanisms

### **Production:**
- Use environment-specific URLs
- Implement proper error handling
- Monitor API performance
- Set up alerts for failures

### **Maintenance:**
- Regular security audits
- Update dependencies
- Monitor API changes
- Document configuration changes
