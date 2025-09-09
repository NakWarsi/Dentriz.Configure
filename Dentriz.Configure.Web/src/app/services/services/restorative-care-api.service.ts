import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { RESTORATIVE_CARE_CONSTANTS } from '../constants/restorative-care.constants';

export interface ServiceCard {
  icon: string;
  title: string;
  description: string;
  features: string[];
}

export interface SimpleRestorativeCareConfig {
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
export class RestorativeCareApiService {
  private configUrl = 'http://localhost:5000/api/config/restorative-care';
  private localStorageKey = 'restorativeCareConfig';
  private JSON_FILE_PATH = './assets/services/restorative-care.json';

  constructor(private http: HttpClient) { }

  loadConfig(): Observable<SimpleRestorativeCareConfig> {
    // Try to load from local storage first
    const localConfig = this.loadConfigFromLocalStorage();
    if (localConfig) {
      return of(localConfig);
    }

    // For now, directly use constants data instead of trying API
    console.log('Loading restorative care config from constants');
    const defaultConfig = this.getDefaultConfig();
    this.saveConfigToLocalStorage(defaultConfig);
    return of(defaultConfig);
  }

  saveConfig(config: SimpleRestorativeCareConfig): Observable<any> {
    this.saveConfigToLocalStorage(config);
    return this.http.post(this.configUrl, config).pipe(
      catchError(error => {
        console.error('Error saving config to API, local storage updated:', error);
        alert('Configuration saved locally, but failed to save to server. Please check the API.');
        return of(null);
      })
    );
  }

  private loadConfigFromLocalStorage(): SimpleRestorativeCareConfig | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      const configString = localStorage.getItem(this.localStorageKey);
      return configString ? JSON.parse(configString) : null;
    }
    return null;
  }

  private saveConfigToLocalStorage(config: SimpleRestorativeCareConfig): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(config));
    }
  }

  private loadConfigFromJsonOrDefaults(): Observable<SimpleRestorativeCareConfig> {
    return this.http.get(this.JSON_FILE_PATH).pipe(
      map((jsonConfig: any) => this.mapToSimpleConfig(jsonConfig)),
      catchError(error => {
        console.error('Error loading config from JSON, falling back to default constants:', error);
        return of(this.getDefaultConfig());
      })
    );
  }

  private mapToSimpleConfig(jsonConfig: any): SimpleRestorativeCareConfig {
    return {
      // Section Content
      sectionTitle: jsonConfig.sectionTitle || RESTORATIVE_CARE_CONSTANTS.DEFAULT_SECTION_TITLE,
      sectionSubtitle: jsonConfig.sectionSubtitle || RESTORATIVE_CARE_CONSTANTS.DEFAULT_SECTION_SUBTITLE,
      sectionIcon: jsonConfig.sectionIcon || RESTORATIVE_CARE_CONSTANTS.DEFAULT_SECTION_ICON,
      services: jsonConfig.services || RESTORATIVE_CARE_CONSTANTS.DEFAULT_SERVICES,

      // Styling
      sectionTitleColor: jsonConfig.sectionTitleColor || RESTORATIVE_CARE_CONSTANTS.DEFAULT_COLORS.SECTION_TITLE,
      sectionSubtitleColor: jsonConfig.sectionSubtitleColor || RESTORATIVE_CARE_CONSTANTS.DEFAULT_COLORS.SECTION_SUBTITLE,
      backgroundColor: jsonConfig.backgroundColor || RESTORATIVE_CARE_CONSTANTS.DEFAULT_COLORS.BACKGROUND,
      cardTitleColor: jsonConfig.cardTitleColor || RESTORATIVE_CARE_CONSTANTS.DEFAULT_COLORS.CARD_TITLE,
      cardDescriptionColor: jsonConfig.cardDescriptionColor || RESTORATIVE_CARE_CONSTANTS.DEFAULT_COLORS.CARD_DESCRIPTION,
      cardFeaturesColor: jsonConfig.cardFeaturesColor || RESTORATIVE_CARE_CONSTANTS.DEFAULT_COLORS.CARD_FEATURES,

      sectionTitleFontFamily: jsonConfig.sectionTitleFontFamily || RESTORATIVE_CARE_CONSTANTS.DEFAULT_FONTS.SECTION_TITLE,
      sectionSubtitleFontFamily: jsonConfig.sectionSubtitleFontFamily || RESTORATIVE_CARE_CONSTANTS.DEFAULT_FONTS.SECTION_SUBTITLE,
      cardTitleFontFamily: jsonConfig.cardTitleFontFamily || RESTORATIVE_CARE_CONSTANTS.DEFAULT_FONTS.CARD_TITLE,
      cardDescriptionFontFamily: jsonConfig.cardDescriptionFontFamily || RESTORATIVE_CARE_CONSTANTS.DEFAULT_FONTS.CARD_DESCRIPTION,
      cardFeaturesFontFamily: jsonConfig.cardFeaturesFontFamily || RESTORATIVE_CARE_CONSTANTS.DEFAULT_FONTS.CARD_FEATURES
    };
  }

  private getDefaultConfig(): SimpleRestorativeCareConfig {
    return this.mapToSimpleConfig({});
  }
}
