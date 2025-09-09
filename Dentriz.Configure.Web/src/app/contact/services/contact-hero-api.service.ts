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
  private configUrl = 'http://localhost:5000/api/config/contact-hero';
  private localStorageKey = 'contactHeroConfig';

  constructor(private http: HttpClient) { }

  loadConfig(): Observable<SimpleContactHeroConfig> {
    // Try to load from local storage first
    const localConfig = this.loadConfigFromLocalStorage();
    if (localConfig) {
      return of(localConfig);
    }

    // For now, directly use constants data instead of trying API
    console.log('Loading contact hero config from constants');
    const defaultConfig = this.getDefaultConfig();
    this.saveConfigToLocalStorage(defaultConfig);
    return of(defaultConfig);
  }

  saveConfig(config: SimpleContactHeroConfig): Observable<any> {
    this.saveConfigToLocalStorage(config);
    return this.http.post(this.configUrl, config).pipe(
      catchError(error => {
        console.error('Error saving config to API, local storage updated:', error);
        alert('Configuration saved locally, but failed to save to server. Please check the API.');
        return of(null); // Return an observable to complete the stream
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
}
