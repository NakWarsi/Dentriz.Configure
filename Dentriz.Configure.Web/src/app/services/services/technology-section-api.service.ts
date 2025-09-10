import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { TECHNOLOGY_SECTION_CONSTANTS } from '../constants/technology-section.constants';

export interface TechnologyCard {
  icon: string;
  title: string;
  description: string;
}

export interface SimpleTechnologySectionConfig {
  // Section Content
  sectionTitle: string;
  sectionSubtitle: string;
  technologies: TechnologyCard[];

  // Styling
  sectionTitleColor: string;
  sectionSubtitleColor: string;
  backgroundColor: string;
  cardTitleColor: string;
  cardDescriptionColor: string;

  sectionTitleFontFamily: string;
  sectionSubtitleFontFamily: string;
  cardTitleFontFamily: string;
  cardDescriptionFontFamily: string;
}

@Injectable({
  providedIn: 'root'
})
export class TechnologySectionApiService {
  private configUrl = 'http://localhost:5000/api/config/technology-section';
  private localStorageKey = 'technologySectionConfig';
  private JSON_FILE_PATH = './assets/services/technology-section.json';

  constructor(private http: HttpClient) { }

  loadConfig(): Observable<SimpleTechnologySectionConfig> {
    // Try to load from local storage first
    const localConfig = this.loadConfigFromLocalStorage();
    if (localConfig) {
      return of(localConfig);
    }

    // For now, directly use constants data instead of trying API
    console.log('Loading technology section config from constants');
    const defaultConfig = this.getDefaultConfig();
    this.saveConfigToLocalStorage(defaultConfig);
    return of(defaultConfig);
  }

  saveConfig(config: SimpleTechnologySectionConfig): Observable<any> {
    this.saveConfigToLocalStorage(config);
    return this.http.post(this.configUrl, config).pipe(
      catchError(error => {
        console.error('Error saving config to API, local storage updated:', error);
        alert('Configuration saved locally, but failed to save to server. Please check the API.');
        return of(null);
      })
    );
  }

  private loadConfigFromLocalStorage(): SimpleTechnologySectionConfig | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      const configString = localStorage.getItem(this.localStorageKey);
      return configString ? JSON.parse(configString) : null;
    }
    return null;
  }

  private saveConfigToLocalStorage(config: SimpleTechnologySectionConfig): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(config));
    }
  }

  private loadConfigFromJsonOrDefaults(): Observable<SimpleTechnologySectionConfig> {
    return this.http.get(this.JSON_FILE_PATH).pipe(
      map((jsonConfig: any) => this.mapToSimpleConfig(jsonConfig)),
      catchError(error => {
        console.error('Error loading config from JSON, falling back to default constants:', error);
        return of(this.getDefaultConfig());
      })
    );
  }

  private mapToSimpleConfig(jsonConfig: any): SimpleTechnologySectionConfig {
    return {
      // Section Content
      sectionTitle: jsonConfig.sectionTitle || TECHNOLOGY_SECTION_CONSTANTS.DEFAULT_SECTION_TITLE,
      sectionSubtitle: jsonConfig.sectionSubtitle || TECHNOLOGY_SECTION_CONSTANTS.DEFAULT_SECTION_SUBTITLE,
      technologies: jsonConfig.technologies || TECHNOLOGY_SECTION_CONSTANTS.DEFAULT_TECHNOLOGIES,

      // Styling
      sectionTitleColor: jsonConfig.sectionTitleColor || TECHNOLOGY_SECTION_CONSTANTS.DEFAULT_COLORS.SECTION_TITLE,
      sectionSubtitleColor: jsonConfig.sectionSubtitleColor || TECHNOLOGY_SECTION_CONSTANTS.DEFAULT_COLORS.SECTION_SUBTITLE,
      backgroundColor: jsonConfig.backgroundColor || TECHNOLOGY_SECTION_CONSTANTS.DEFAULT_COLORS.BACKGROUND,
      cardTitleColor: jsonConfig.cardTitleColor || TECHNOLOGY_SECTION_CONSTANTS.DEFAULT_COLORS.CARD_TITLE,
      cardDescriptionColor: jsonConfig.cardDescriptionColor || TECHNOLOGY_SECTION_CONSTANTS.DEFAULT_COLORS.CARD_DESCRIPTION,

      sectionTitleFontFamily: jsonConfig.sectionTitleFontFamily || TECHNOLOGY_SECTION_CONSTANTS.DEFAULT_FONTS.SECTION_TITLE,
      sectionSubtitleFontFamily: jsonConfig.sectionSubtitleFontFamily || TECHNOLOGY_SECTION_CONSTANTS.DEFAULT_FONTS.SECTION_SUBTITLE,
      cardTitleFontFamily: jsonConfig.cardTitleFontFamily || TECHNOLOGY_SECTION_CONSTANTS.DEFAULT_FONTS.CARD_TITLE,
      cardDescriptionFontFamily: jsonConfig.cardDescriptionFontFamily || TECHNOLOGY_SECTION_CONSTANTS.DEFAULT_FONTS.CARD_DESCRIPTION
    };
  }

  private getDefaultConfig(): SimpleTechnologySectionConfig {
    return this.mapToSimpleConfig({});
  }
}
