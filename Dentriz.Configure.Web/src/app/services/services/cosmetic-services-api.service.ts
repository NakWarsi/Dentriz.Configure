import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { COSMETIC_SERVICES_CONSTANTS } from '../constants/cosmetic-services.constants';

export interface ServiceCard {
  icon: string;
  title: string;
  description: string;
  features: string[];
}

export interface SimpleCosmeticServicesConfig {
  // Section Content
  sectionTitle: string;
  sectionSubtitle: string;
  sectionIcon: string;
  services: ServiceCard[];

  // Styling
  sectionTitleColor: string;
  sectionSubtitleColor: string;
  backgroundColor: string;
  cardTitleColor: string;
  cardDescriptionColor: string;
  cardFeaturesColor: string;

  sectionTitleFontFamily: string;
  sectionSubtitleFontFamily: string;
  cardTitleFontFamily: string;
  cardDescriptionFontFamily: string;
  cardFeaturesFontFamily: string;
}

@Injectable({
  providedIn: 'root'
})
export class CosmeticServicesApiService {
  private configUrl = 'http://localhost:5000/api/config/cosmetic-services';
  private localStorageKey = 'cosmeticServicesConfig';
  private JSON_FILE_PATH = './assets/services/cosmetic-services.json';

  constructor(private http: HttpClient) { }

  loadConfig(): Observable<SimpleCosmeticServicesConfig> {
    // Try to load from local storage first
    const localConfig = this.loadConfigFromLocalStorage();
    if (localConfig) {
      return of(localConfig);
    }

    // For now, directly use constants data instead of trying API
    console.log('Loading cosmetic services config from constants');
    const defaultConfig = this.getDefaultConfig();
    this.saveConfigToLocalStorage(defaultConfig);
    return of(defaultConfig);
  }

  saveConfig(config: SimpleCosmeticServicesConfig): Observable<any> {
    this.saveConfigToLocalStorage(config);
    return this.http.post(this.configUrl, config).pipe(
      catchError(error => {
        console.error('Error saving config to API, local storage updated:', error);
        alert('Configuration saved locally, but failed to save to server. Please check the API.');
        return of(null);
      })
    );
  }

  private loadConfigFromLocalStorage(): SimpleCosmeticServicesConfig | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      const configString = localStorage.getItem(this.localStorageKey);
      return configString ? JSON.parse(configString) : null;
    }
    return null;
  }

  private saveConfigToLocalStorage(config: SimpleCosmeticServicesConfig): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(config));
    }
  }

  private loadConfigFromJsonOrDefaults(): Observable<SimpleCosmeticServicesConfig> {
    return this.http.get(this.JSON_FILE_PATH).pipe(
      map((jsonConfig: any) => this.mapToSimpleConfig(jsonConfig)),
      catchError(error => {
        console.error('Error loading config from JSON, falling back to default constants:', error);
        return of(this.getDefaultConfig());
      })
    );
  }

  private mapToSimpleConfig(jsonConfig: any): SimpleCosmeticServicesConfig {
    return {
      // Section Content
      sectionTitle: jsonConfig.sectionTitle || COSMETIC_SERVICES_CONSTANTS.DEFAULT_SECTION_TITLE,
      sectionSubtitle: jsonConfig.sectionSubtitle || COSMETIC_SERVICES_CONSTANTS.DEFAULT_SECTION_SUBTITLE,
      sectionIcon: jsonConfig.sectionIcon || COSMETIC_SERVICES_CONSTANTS.DEFAULT_SECTION_ICON,
      services: jsonConfig.services || COSMETIC_SERVICES_CONSTANTS.DEFAULT_SERVICES,

      // Styling
      sectionTitleColor: jsonConfig.sectionTitleColor || COSMETIC_SERVICES_CONSTANTS.DEFAULT_COLORS.SECTION_TITLE,
      sectionSubtitleColor: jsonConfig.sectionSubtitleColor || COSMETIC_SERVICES_CONSTANTS.DEFAULT_COLORS.SECTION_SUBTITLE,
      backgroundColor: jsonConfig.backgroundColor || COSMETIC_SERVICES_CONSTANTS.DEFAULT_COLORS.BACKGROUND,
      cardTitleColor: jsonConfig.cardTitleColor || COSMETIC_SERVICES_CONSTANTS.DEFAULT_COLORS.CARD_TITLE,
      cardDescriptionColor: jsonConfig.cardDescriptionColor || COSMETIC_SERVICES_CONSTANTS.DEFAULT_COLORS.CARD_DESCRIPTION,
      cardFeaturesColor: jsonConfig.cardFeaturesColor || COSMETIC_SERVICES_CONSTANTS.DEFAULT_COLORS.CARD_FEATURES,

      sectionTitleFontFamily: jsonConfig.sectionTitleFontFamily || COSMETIC_SERVICES_CONSTANTS.DEFAULT_FONTS.SECTION_TITLE,
      sectionSubtitleFontFamily: jsonConfig.sectionSubtitleFontFamily || COSMETIC_SERVICES_CONSTANTS.DEFAULT_FONTS.SECTION_SUBTITLE,
      cardTitleFontFamily: jsonConfig.cardTitleFontFamily || COSMETIC_SERVICES_CONSTANTS.DEFAULT_FONTS.CARD_TITLE,
      cardDescriptionFontFamily: jsonConfig.cardDescriptionFontFamily || COSMETIC_SERVICES_CONSTANTS.DEFAULT_FONTS.CARD_DESCRIPTION,
      cardFeaturesFontFamily: jsonConfig.cardFeaturesFontFamily || COSMETIC_SERVICES_CONSTANTS.DEFAULT_FONTS.CARD_FEATURES
    };
  }

  private getDefaultConfig(): SimpleCosmeticServicesConfig {
    return this.mapToSimpleConfig({});
  }
}
