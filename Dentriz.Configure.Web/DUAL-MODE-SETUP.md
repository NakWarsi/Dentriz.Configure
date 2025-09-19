# Dual-Mode Build System

This Angular project supports two build modes:

## 🚀 Static Mode (JSON Files)
- **Purpose**: Builds the application to use static JSON files from the assets folder
- **Use Case**: Production deployments, CDN hosting, or when API is not available
- **Data Source**: JSON files in `src/assets/` folder

## 🔄 Dynamic Mode (API Calls)
- **Purpose**: Builds the application to make API calls for dynamic content
- **Use Case**: Development, content management, or when API is available
- **Data Source**: REST API endpoints

## 📋 Available Commands

### Development Server
```bash
# Static mode (uses JSON files)
npm run serve:static
# or
ng serve --configuration static

# Dynamic mode (uses API calls)
npm run serve:dynamic
# or
ng serve --configuration dynamic

# Default (dynamic mode)
npm run serve
```

### Production Build
```bash
# Static build
npm run build:static
# or
ng build --configuration static

# Dynamic build
npm run build:dynamic
# or
ng build --configuration dynamic
```

## 🏗️ How It Works

### Environment Configuration
- **Static Mode**: Uses `src/environments/environment.static.ts`
- **Dynamic Mode**: Uses `src/environments/environment.ts`

### Data Service Factory
The `DataServiceFactory` automatically switches between:
- **API Services**: When `dataSource: 'api'`
- **JSON Services**: When `dataSource: 'json'`

### File Structure
```
src/
├── environments/
│   ├── environment.ts          # Dynamic mode config
│   ├── environment.static.ts   # Static mode config
│   └── environment.prod.ts     # Production config
├── assets/
│   ├── services/
│   │   ├── services-hero.json
│   │   └── technology-section.json
│   ├── home/
│   │   ├── home-founder-section.json
│   │   └── home-services-section.json
│   └── contact/
│       ├── contact-hero.json
│       └── contact-info.json
└── app/
    └── services/
        └── services/
            ├── services-hero.service.ts
            ├── services.service.ts
            └── technology-section.service.ts
```

## 🔧 Configuration Details

### Static Mode Environment
```typescript
export const environment = {
  production: true,
  dataSource: 'json' as 'api' | 'json',
  apiBaseUrl: '',
  enableEditing: false,
  enableApiCalls: false
};
```

### Dynamic Mode Environment
```typescript
export const environment = {
  production: false,
  dataSource: 'api' as 'api' | 'json',
  apiBaseUrl: 'http://localhost:5208/api',
  enableEditing: true,
  enableApiCalls: true
};
```

## 🚀 Deployment Scenarios

### Static Deployment (CDN/Static Hosting)
```bash
npm run build:static
# Deploy the dist/ folder to any static hosting service
```

### Dynamic Deployment (Server with API)
```bash
npm run build:dynamic
# Deploy with API backend support
```

## 📝 Adding New Content

### For Static Mode
1. Add JSON files to `src/assets/` folder
2. Create corresponding JSON service classes
3. Update the DataServiceFactory if needed

### For Dynamic Mode
1. Create API endpoints in the backend
2. Create corresponding API service classes
3. Update the DataServiceFactory if needed

## 🐛 Troubleshooting

### Build Errors
- Ensure all JSON files exist in the assets folder
- Check that environment files are properly configured
- Verify that all service files are properly imported

### Runtime Errors
- Check browser console for API connection issues
- Verify JSON file paths in static mode
- Ensure environment configuration matches your deployment

## 📚 Examples

### Running in Static Mode
```bash
# Start development server in static mode
npm run serve:static

# Build for production in static mode
npm run build:static
```

### Running in Dynamic Mode
```bash
# Start development server in dynamic mode
npm run serve:dynamic

# Build for production in dynamic mode
npm run build:dynamic
```

This dual-mode system allows you to:
- Develop with live API data
- Deploy static versions for CDN hosting
- Switch between modes without code changes
- Maintain the same codebase for both scenarios
