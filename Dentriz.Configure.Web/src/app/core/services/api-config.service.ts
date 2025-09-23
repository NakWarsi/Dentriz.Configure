import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {
  private baseUrl: string;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Use environment variable if available, otherwise fallback to environment config
    // Check if we're in browser environment to avoid SSR issues
    if (isPlatformBrowser(this.platformId)) {
      const runtimeApiUrl = (window as any).API_BASE_URL;
      console.log('🔍 ApiConfigService - Runtime API URL:', runtimeApiUrl);
      console.log('🔍 ApiConfigService - Environment API URL:', environment.apiBaseUrl);
      this.baseUrl = runtimeApiUrl || environment.apiBaseUrl;
      console.log('🔍 ApiConfigService - Final API URL:', this.baseUrl);
    } else {
      // Server-side rendering: use environment config
      this.baseUrl = environment.apiBaseUrl;
    }
  }

  /**
   * Get the base API URL
   */
  getBaseUrl(): string {
    // Check for runtime API URL on every call (in case it was set after constructor)
    if (isPlatformBrowser(this.platformId)) {
      const runtimeApiUrl = (window as any).API_BASE_URL;
      if (runtimeApiUrl && runtimeApiUrl !== this.baseUrl) {
        console.log('🔄 ApiConfigService - Runtime API URL detected, updating base URL:', runtimeApiUrl);
        this.baseUrl = runtimeApiUrl;
      }
    }
    return this.baseUrl;
  }

  /**
   * Get full endpoint URL for a specific API endpoint
   * @param endpoint - The API endpoint (e.g., 'header', 'ServicesHero')
   */
  getEndpointUrl(endpoint: string): string {
    const baseUrl = this.getBaseUrl();
    // Ensure baseUrl ends with /api and endpoint doesn't start with /
    const cleanBaseUrl = baseUrl.endsWith('/api') ? baseUrl : `${baseUrl}/api`;
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
    const finalUrl = `${cleanBaseUrl}/${cleanEndpoint}`;
    console.log(`🔗 ApiConfigService - getEndpointUrl('${endpoint}') -> ${finalUrl}`);
    return finalUrl;
  }

  /**
   * Get the API base URL without /api suffix
   */
  getApiBaseUrl(): string {
    const baseUrl = this.getBaseUrl();
    return baseUrl.endsWith('/api') ? baseUrl.replace('/api', '') : baseUrl;
  }
}
