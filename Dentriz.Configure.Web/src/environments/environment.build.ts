export const environment = {
  production: true,
  dataSource: 'json' as 'api' | 'json',  // Use JSON during build to avoid API calls
  apiBaseUrl: '',  // Will be injected at runtime
  enableEditing: false,  // Will be enabled at runtime
  enableApiCalls: false  // Will be enabled at runtime
};
