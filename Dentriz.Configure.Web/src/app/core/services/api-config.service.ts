import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {
  private readonly baseUrl: string;

  constructor() {
    // Use environment variable if available, otherwise fallback to environment config
    this.baseUrl = (window as any).API_BASE_URL || environment.apiBaseUrl;
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
