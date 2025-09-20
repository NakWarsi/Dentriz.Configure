import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { CONTACT_HERO_CONSTANTS } from '../constants/contact-hero.constants';

export interface SimpleContactHeroConfig {
  heroTitle: string;
  heroSubtitle: string;
  heroTitleColor: string;
  heroSubtitleColor: string;
  heroTitleFontFamily: string;
  heroSubtitleFontFamily: string;
  backgroundColor: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactHeroApiService {
  private get configUrl(): string {
    return this.apiConfig.getEndpointUrl('ContactHero');
  }
  private localStorageKey = 'contactHeroConfig';

  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService
  ) { }

  loadConfig(): Observable<SimpleContactHeroConfig> {
    // Try to load from local storage first
    const localConfig = this.loadConfigFromLocalStorage();
    if (localConfig) {
      return of(localConfig);
    }

    // Try to load from API
    console.log('Loading contact hero config from API:', this.configUrl);
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

  saveConfig(config: SimpleContactHeroConfig): Observable<any> {
    this.saveConfigToLocalStorage(config);
    const apiConfig = this.mapSimpleConfigToApiConfig(config);
    
    console.log('Saving contact hero config to API:', apiConfig);
    
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

  private loadConfigFromLocalStorage(): SimpleContactHeroConfig | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      const configString = localStorage.getItem(this.localStorageKey);
      return configString ? JSON.parse(configString) : null;
    }
    return null;
  }

  private saveConfigToLocalStorage(config: SimpleContactHeroConfig): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(config));
    }
  }

  private loadConfigFromJsonOrDefaults(): Observable<SimpleContactHeroConfig> {
    return this.http.get<any>('./assets/contact/contact-hero.json').pipe(
      map(data => this.mapToSimpleConfig(data)),
      catchError(error => {
        console.error('Error loading config from JSON, falling back to default constants:', error);
        return of(this.getDefaultConfig());
      })
    );
  }

  private mapToSimpleConfig(data: any): SimpleContactHeroConfig {
    const constants = CONTACT_HERO_CONSTANTS;
    
    return {
      heroTitle: data.heroTitle || constants.DEFAULT_HERO_TITLE,
      heroSubtitle: data.heroSubtitle || constants.DEFAULT_HERO_SUBTITLE,
      heroTitleColor: data.heroTitleColor || constants.DEFAULT_COLORS.HERO_TITLE,
      heroSubtitleColor: data.heroSubtitleColor || constants.DEFAULT_COLORS.HERO_SUBTITLE,
      heroTitleFontFamily: data.heroTitleFontFamily || constants.DEFAULT_FONTS.HERO_TITLE,
      heroSubtitleFontFamily: data.heroSubtitleFontFamily || constants.DEFAULT_FONTS.HERO_SUBTITLE,
      backgroundColor: data.backgroundColor || constants.DEFAULT_COLORS.BACKGROUND
    };
  }

  private getDefaultConfig(): SimpleContactHeroConfig {
    return this.mapToSimpleConfig({});
  }

  private mapApiConfigToSimpleConfig(apiConfig: any): SimpleContactHeroConfig {
    const constants = CONTACT_HERO_CONSTANTS;
    
    return {
      heroTitle: apiConfig.heroTitle || constants.DEFAULT_HERO_TITLE,
      heroSubtitle: apiConfig.heroSubtitle || constants.DEFAULT_HERO_SUBTITLE,
      heroTitleColor: apiConfig.heroTitleColor || constants.DEFAULT_COLORS.HERO_TITLE,
      heroSubtitleColor: apiConfig.heroSubtitleColor || constants.DEFAULT_COLORS.HERO_SUBTITLE,
      heroTitleFontFamily: apiConfig.heroTitleFontFamily || constants.DEFAULT_FONTS.HERO_TITLE,
      heroSubtitleFontFamily: apiConfig.heroSubtitleFontFamily || constants.DEFAULT_FONTS.HERO_SUBTITLE,
      backgroundColor: apiConfig.backgroundColor || constants.DEFAULT_COLORS.BACKGROUND
    };
  }

  private mapSimpleConfigToApiConfig(simpleConfig: SimpleContactHeroConfig): any {
    return {
      heroTitle: simpleConfig.heroTitle,
      heroSubtitle: simpleConfig.heroSubtitle,
      heroTitleColor: simpleConfig.heroTitleColor,
      heroSubtitleColor: simpleConfig.heroSubtitleColor,
      heroTitleFontFamily: simpleConfig.heroTitleFontFamily,
      heroSubtitleFontFamily: simpleConfig.heroSubtitleFontFamily,
      backgroundColor: simpleConfig.backgroundColor
    };
  }
}
