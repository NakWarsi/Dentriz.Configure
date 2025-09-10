import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HEADER_CONSTANTS } from '../constants/header.constants';

export interface NavItem {
  label: string;
  route: string;
  exact: boolean;
}

export interface SimpleHeaderConfig {
  // Header Logo Section
  logoAlt: string;
  logoImage: string;
  clinicName: string;
  tagline: string;

  // Navigation
  navItems: NavItem[];

  // Styling
  backgroundColor: string;
  textColor: string;
  logoTextColor: string;
  taglineColor: string;
  navLinkColor: string;
  navLinkHoverColor: string;
  navLinkActiveColor: string;
  mobileMenuBgColor: string;
  mobileMenuTextColor: string;

  clinicNameFontFamily: string;
  taglineFontFamily: string;
  navLinkFontFamily: string;
}

@Injectable({
  providedIn: 'root'
})
export class HeaderApiService {
  private configUrl = 'http://localhost:5000/api/config/header';
  private localStorageKey = 'headerConfig';
  private JSON_FILE_PATH = './assets/header/header.json';

  constructor(private http: HttpClient) { }

  loadConfig(): Observable<SimpleHeaderConfig> {
    // Try to load from local storage first
    const localConfig = this.loadConfigFromLocalStorage();
    if (localConfig) {
      return of(localConfig);
    }

    // For now, directly use constants data instead of trying API
    console.log('Loading header config from constants');
    const defaultConfig = this.getDefaultConfig();
    this.saveConfigToLocalStorage(defaultConfig);
    return of(defaultConfig);
  }

  saveConfig(config: SimpleHeaderConfig): Observable<any> {
    this.saveConfigToLocalStorage(config);
    return this.http.post(this.configUrl, config).pipe(
      catchError(error => {
        console.error('Error saving config to API, local storage updated:', error);
        alert('Configuration saved locally, but failed to save to server. Please check the API.');
        return of(null);
      })
    );
  }

  private loadConfigFromLocalStorage(): SimpleHeaderConfig | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      const configString = localStorage.getItem(this.localStorageKey);
      return configString ? JSON.parse(configString) : null;
    }
    return null;
  }

  private saveConfigToLocalStorage(config: SimpleHeaderConfig): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(config));
    }
  }

  private loadConfigFromJsonOrDefaults(): Observable<SimpleHeaderConfig> {
    return this.http.get(this.JSON_FILE_PATH).pipe(
      map((jsonConfig: any) => this.mapToSimpleConfig(jsonConfig)),
      catchError(error => {
        console.error('Error loading config from JSON, falling back to default constants:', error);
        return of(this.getDefaultConfig());
      })
    );
  }

  private mapToSimpleConfig(jsonConfig: any): SimpleHeaderConfig {
    const backgroundColor = jsonConfig.backgroundColor || HEADER_CONSTANTS.DEFAULT_COLORS.BACKGROUND;
    
    return {
      // Header Logo Section
      logoAlt: jsonConfig.logoAlt || HEADER_CONSTANTS.DEFAULT_LOGO_ALT,
      logoImage: jsonConfig.logoImage || HEADER_CONSTANTS.DEFAULT_LOGO_IMAGE,
      clinicName: jsonConfig.clinicName || HEADER_CONSTANTS.DEFAULT_CLINIC_NAME,
      tagline: jsonConfig.tagline || HEADER_CONSTANTS.DEFAULT_TAGLINE,

      // Navigation
      navItems: jsonConfig.navItems || HEADER_CONSTANTS.DEFAULT_NAV_ITEMS,

      // Styling
      backgroundColor: backgroundColor,
      textColor: jsonConfig.textColor || HEADER_CONSTANTS.DEFAULT_COLORS.TEXT,
      logoTextColor: jsonConfig.logoTextColor || HEADER_CONSTANTS.DEFAULT_COLORS.LOGO_TEXT,
      taglineColor: jsonConfig.taglineColor || HEADER_CONSTANTS.DEFAULT_COLORS.TAGLINE,
      navLinkColor: jsonConfig.navLinkColor || HEADER_CONSTANTS.DEFAULT_COLORS.NAV_LINK,
      navLinkHoverColor: jsonConfig.navLinkHoverColor || HEADER_CONSTANTS.DEFAULT_COLORS.NAV_LINK_HOVER,
      navLinkActiveColor: jsonConfig.navLinkActiveColor || HEADER_CONSTANTS.DEFAULT_COLORS.NAV_LINK_ACTIVE,
      mobileMenuBgColor: backgroundColor, // Synchronized with main background
      mobileMenuTextColor: jsonConfig.mobileMenuTextColor || HEADER_CONSTANTS.DEFAULT_COLORS.MOBILE_MENU_TEXT,

      clinicNameFontFamily: jsonConfig.clinicNameFontFamily || HEADER_CONSTANTS.DEFAULT_FONTS.CLINIC_NAME,
      taglineFontFamily: jsonConfig.taglineFontFamily || HEADER_CONSTANTS.DEFAULT_FONTS.TAGLINE,
      navLinkFontFamily: jsonConfig.navLinkFontFamily || HEADER_CONSTANTS.DEFAULT_FONTS.NAV_LINK
    };
  }

  private getDefaultConfig(): SimpleHeaderConfig {
    return this.mapToSimpleConfig({});
  }
}
