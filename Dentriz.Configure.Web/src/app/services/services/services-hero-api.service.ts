import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { SERVICES_HERO_CONSTANTS } from '../constants/services-hero.constants';

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
export class ServicesHeroApiService {
  private configUrl = 'http://localhost:5000/api/config/services-hero';
  private localStorageKey = 'servicesHeroConfig';
  private JSON_FILE_PATH = './assets/services/services-hero.json';

  constructor(private http: HttpClient) { }

  loadConfig(): Observable<SimpleServicesHeroConfig> {
    // Try to load from local storage first
    const localConfig = this.loadConfigFromLocalStorage();
    if (localConfig) {
      return of(localConfig);
    }

    // For now, directly use constants data instead of trying API
    console.log('Loading services hero config from constants');
    const defaultConfig = this.getDefaultConfig();
    this.saveConfigToLocalStorage(defaultConfig);
    return of(defaultConfig);
  }

  saveConfig(config: SimpleServicesHeroConfig): Observable<any> {
    this.saveConfigToLocalStorage(config);
    return this.http.post(this.configUrl, config).pipe(
      catchError(error => {
        console.error('Error saving config to API, local storage updated:', error);
        alert('Configuration saved locally, but failed to save to server. Please check the API.');
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
}
