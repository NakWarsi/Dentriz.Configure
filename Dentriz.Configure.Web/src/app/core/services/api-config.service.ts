import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {
  private readonly baseUrl: string;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Use environment variable if available, otherwise fallback to environment config
    // Check if we're in browser environment to avoid SSR issues
    if (isPlatformBrowser(this.platformId)) {
      this.baseUrl = (window as any).API_BASE_URL || environment.apiBaseUrl;
    } else {
      // Server-side rendering: use environment config
      this.baseUrl = environment.apiBaseUrl;
    }
  }

  /**
   * Get the base API URL
   */
  getBaseUrl(): string {
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
    return `${cleanBaseUrl}/${cleanEndpoint}`;
  }

  /**
   * Get the API base URL without /api suffix
   */
  getApiBaseUrl(): string {
    const baseUrl = this.getBaseUrl();
    return baseUrl.endsWith('/api') ? baseUrl.replace('/api', '') : baseUrl;
  }
}
