import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { PREVENTIVE_CARE_CONSTANTS } from '../constants/preventive-care.constants';

export interface ServiceCard {
  icon: string;
  title: string;
  description: string;
  features: string[];
}

export interface SimplePreventiveCareConfig {
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
export class PreventiveCareApiService {
  private configUrl = 'http://localhost:5000/api/config/preventive-care';
  private localStorageKey = 'preventiveCareConfig';
  private JSON_FILE_PATH = './assets/services/preventive-care.json';

  constructor(private http: HttpClient) { }

  loadConfig(): Observable<SimplePreventiveCareConfig> {
    // Try to load from local storage first
    const localConfig = this.loadConfigFromLocalStorage();
    if (localConfig) {
      return of(localConfig);
    }

    // For now, directly use constants data instead of trying API
    console.log('Loading preventive care config from constants');
    const defaultConfig = this.getDefaultConfig();
    this.saveConfigToLocalStorage(defaultConfig);
    return of(defaultConfig);
  }

  saveConfig(config: SimplePreventiveCareConfig): Observable<any> {
    this.saveConfigToLocalStorage(config);
    return this.http.post(this.configUrl, config).pipe(
      catchError(error => {
        console.error('Error saving config to API, local storage updated:', error);
        alert('Configuration saved locally, but failed to save to server. Please check the API.');
        return of(null);
      })
    );
  }

  private loadConfigFromLocalStorage(): SimplePreventiveCareConfig | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      const configString = localStorage.getItem(this.localStorageKey);
      return configString ? JSON.parse(configString) : null;
    }
    return null;
  }

  private saveConfigToLocalStorage(config: SimplePreventiveCareConfig): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(config));
    }
  }

  private loadConfigFromJsonOrDefaults(): Observable<SimplePreventiveCareConfig> {
    return this.http.get(this.JSON_FILE_PATH).pipe(
      map((jsonConfig: any) => this.mapToSimpleConfig(jsonConfig)),
      catchError(error => {
        console.error('Error loading config from JSON, falling back to default constants:', error);
        return of(this.getDefaultConfig());
      })
    );
  }

  private mapToSimpleConfig(jsonConfig: any): SimplePreventiveCareConfig {
    return {
      // Section Content
      sectionTitle: jsonConfig.sectionTitle || PREVENTIVE_CARE_CONSTANTS.DEFAULT_SECTION_TITLE,
      sectionSubtitle: jsonConfig.sectionSubtitle || PREVENTIVE_CARE_CONSTANTS.DEFAULT_SECTION_SUBTITLE,
      sectionIcon: jsonConfig.sectionIcon || PREVENTIVE_CARE_CONSTANTS.DEFAULT_SECTION_ICON,
      services: jsonConfig.services || PREVENTIVE_CARE_CONSTANTS.DEFAULT_SERVICES,

      // Styling
      sectionTitleColor: jsonConfig.sectionTitleColor || PREVENTIVE_CARE_CONSTANTS.DEFAULT_COLORS.SECTION_TITLE,
      sectionSubtitleColor: jsonConfig.sectionSubtitleColor || PREVENTIVE_CARE_CONSTANTS.DEFAULT_COLORS.SECTION_SUBTITLE,
      backgroundColor: jsonConfig.backgroundColor || PREVENTIVE_CARE_CONSTANTS.DEFAULT_COLORS.BACKGROUND,
      cardTitleColor: jsonConfig.cardTitleColor || PREVENTIVE_CARE_CONSTANTS.DEFAULT_COLORS.CARD_TITLE,
      cardDescriptionColor: jsonConfig.cardDescriptionColor || PREVENTIVE_CARE_CONSTANTS.DEFAULT_COLORS.CARD_DESCRIPTION,
      cardFeaturesColor: jsonConfig.cardFeaturesColor || PREVENTIVE_CARE_CONSTANTS.DEFAULT_COLORS.CARD_FEATURES,

      sectionTitleFontFamily: jsonConfig.sectionTitleFontFamily || PREVENTIVE_CARE_CONSTANTS.DEFAULT_FONTS.SECTION_TITLE,
      sectionSubtitleFontFamily: jsonConfig.sectionSubtitleFontFamily || PREVENTIVE_CARE_CONSTANTS.DEFAULT_FONTS.SECTION_SUBTITLE,
      cardTitleFontFamily: jsonConfig.cardTitleFontFamily || PREVENTIVE_CARE_CONSTANTS.DEFAULT_FONTS.CARD_TITLE,
      cardDescriptionFontFamily: jsonConfig.cardDescriptionFontFamily || PREVENTIVE_CARE_CONSTANTS.DEFAULT_FONTS.CARD_DESCRIPTION,
      cardFeaturesFontFamily: jsonConfig.cardFeaturesFontFamily || PREVENTIVE_CARE_CONSTANTS.DEFAULT_FONTS.CARD_FEATURES
    };
  }

  private getDefaultConfig(): SimplePreventiveCareConfig {
    return this.mapToSimpleConfig({});
  }
}
