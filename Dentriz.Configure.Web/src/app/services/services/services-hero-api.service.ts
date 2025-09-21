import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { SERVICES_HERO_CONSTANTS } from '../constants/services-hero.constants';
import { IDataService } from '../../core/interfaces/data-service.interface';
import { ApiConfigService } from '../../core/services/api-config.service';

export interface SimpleServicesHeroConfig {
  // Section Content
  title: string;
  subtitle: string;

  // Styling
  titleColor: string;
  subtitleColor: string;
  backgroundColor: string;

  titleFontFamily: string;
  subtitleFontFamily: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServicesHeroApiService implements IDataService<SimpleServicesHeroConfig> {
  private localStorageKey = 'servicesHeroConfig';
  private JSON_FILE_PATH = './assets/services/services-hero.json';

  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService
  ) { }

  private get configUrl(): string {
    return this.apiConfig.getEndpointUrl('ServicesHero');
  }

  loadConfig(): Observable<SimpleServicesHeroConfig> {
    // Try to load from local storage first
    const localConfig = this.loadConfigFromLocalStorage();
    if (localConfig) {
      return of(localConfig);
    }

    // Try to load from API
    console.log('Loading services hero config from API:', this.configUrl);
    return this.http.get(this.configUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
      map((apiConfig: any) => {
        console.log('Received API config:', apiConfig);
        return this.mapApiConfigToSimpleConfig(apiConfig);
      }),
      tap(config => {
        console.log('Mapped config:', config);
        this.saveConfigToLocalStorage(config);
      }),
      catchError(error => {
        console.error('Error loading config from API, falling back to default constants:', error);
        console.error('Error details:', {
          status: error.status,
          statusText: error.statusText,
          message: error.message,
          url: error.url
        });
        const defaultConfig = this.getDefaultConfig();
        this.saveConfigToLocalStorage(defaultConfig);
        return of(defaultConfig);
      })
    );
  }

  saveConfig(config: SimpleServicesHeroConfig): Observable<any> {
    this.saveConfigToLocalStorage(config);
    const apiConfig = this.mapSimpleConfigToApiConfig(config);
    
    console.log('Saving services hero config to API:', apiConfig);
    
    return this.http.post(this.configUrl, apiConfig, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
      tap((response) => {
        console.log('Configuration saved successfully to API:', response);
        alert('Configuration saved successfully to server!');
      }),
      catchError(error => {
        console.error('Error saving config to API, local storage updated:', error);
        console.error('Error details:', {
          status: error.status,
          statusText: error.statusText,
          message: error.message,
          url: error.url
        });
        alert(`Configuration saved locally, but failed to save to server. Error: ${error.status} - ${error.statusText}`);
        return of(null);
      })
    );
  }

  private loadConfigFromLocalStorage(): SimpleServicesHeroConfig | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      const configString = localStorage.getItem(this.localStorageKey);
      return configString ? JSON.parse(configString) : null;
    }
    return null;
  }

  private saveConfigToLocalStorage(config: SimpleServicesHeroConfig): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(config));
    }
  }

  private loadConfigFromJsonOrDefaults(): Observable<SimpleServicesHeroConfig> {
    return this.http.get(this.JSON_FILE_PATH).pipe(
      map((jsonConfig: any) => this.mapToSimpleConfig(jsonConfig)),
      catchError(error => {
        console.error('Error loading config from JSON, falling back to default constants:', error);
        return of(this.getDefaultConfig());
      })
    );
  }

  private mapToSimpleConfig(jsonConfig: any): SimpleServicesHeroConfig {
    return {
      // Section Content
      title: jsonConfig.title || SERVICES_HERO_CONSTANTS.DEFAULT_TITLE,
      subtitle: jsonConfig.subtitle || SERVICES_HERO_CONSTANTS.DEFAULT_SUBTITLE,

      // Styling
      titleColor: jsonConfig.titleColor || SERVICES_HERO_CONSTANTS.DEFAULT_COLORS.TITLE,
      subtitleColor: jsonConfig.subtitleColor || SERVICES_HERO_CONSTANTS.DEFAULT_COLORS.SUBTITLE,
      backgroundColor: jsonConfig.backgroundColor || SERVICES_HERO_CONSTANTS.DEFAULT_COLORS.BACKGROUND,

      titleFontFamily: jsonConfig.titleFontFamily || SERVICES_HERO_CONSTANTS.DEFAULT_FONTS.TITLE,
      subtitleFontFamily: jsonConfig.subtitleFontFamily || SERVICES_HERO_CONSTANTS.DEFAULT_FONTS.SUBTITLE
    };
  }

  private getDefaultConfig(): SimpleServicesHeroConfig {
    return this.mapToSimpleConfig({});
  }

  private mapApiConfigToSimpleConfig(apiConfig: any): SimpleServicesHeroConfig {
    const constants = SERVICES_HERO_CONSTANTS;
    
    return {
      title: apiConfig.title || constants.DEFAULT_TITLE,
      subtitle: apiConfig.subtitle || constants.DEFAULT_SUBTITLE,
      titleColor: apiConfig.titleColor || constants.DEFAULT_COLORS.TITLE,
      subtitleColor: apiConfig.subtitleColor || constants.DEFAULT_COLORS.SUBTITLE,
      backgroundColor: apiConfig.backgroundColor || constants.DEFAULT_COLORS.BACKGROUND,
      titleFontFamily: apiConfig.titleFontFamily || constants.DEFAULT_FONTS.TITLE,
      subtitleFontFamily: apiConfig.subtitleFontFamily || constants.DEFAULT_FONTS.SUBTITLE
    };
  }

  private mapSimpleConfigToApiConfig(simpleConfig: SimpleServicesHeroConfig): any {
    return {
      title: simpleConfig.title,
      subtitle: simpleConfig.subtitle,
      titleColor: simpleConfig.titleColor,
      subtitleColor: simpleConfig.subtitleColor,
      backgroundColor: simpleConfig.backgroundColor,
      titleFontFamily: simpleConfig.titleFontFamily,
      subtitleFontFamily: simpleConfig.subtitleFontFamily
    };
  }

  isEditingEnabled(): boolean {
    return true; // API mode supports editing
  }
}
