import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { TECHNOLOGY_SECTION_CONSTANTS } from '../constants/technology-section.constants';
import { IDataService } from '../../core/interfaces/data-service.interface';
import { ApiConfigService } from '../../core/services/api-config.service';

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
export class TechnologySectionApiService implements IDataService<SimpleTechnologySectionConfig> {
  private localStorageKey = 'technologySectionConfig';
  private JSON_FILE_PATH = './assets/services/technology-section.json';

  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService
  ) { }

  private get configUrl(): string {
    return this.apiConfig.getEndpointUrl('ServicesTechnologySection');
  }

  loadConfig(): Observable<SimpleTechnologySectionConfig> {
    // Try to load from local storage first
    const localConfig = this.loadConfigFromLocalStorage();
    if (localConfig) {
      return of(localConfig);
    }

    // Try to load from API
    console.log('Loading technology section config from API:', this.configUrl);
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

  saveConfig(config: SimpleTechnologySectionConfig): Observable<any> {
    this.saveConfigToLocalStorage(config);
    const apiConfig = this.mapSimpleConfigToApiConfig(config);
    
    console.log('Saving technology section config to API:', apiConfig);
    
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

  private mapApiConfigToSimpleConfig(apiConfig: any): SimpleTechnologySectionConfig {
    const constants = TECHNOLOGY_SECTION_CONSTANTS;
    
    return {
      sectionTitle: apiConfig.sectionTitle || constants.DEFAULT_SECTION_TITLE,
      sectionSubtitle: apiConfig.sectionSubtitle || constants.DEFAULT_SECTION_SUBTITLE,
      technologies: apiConfig.technologies || constants.DEFAULT_TECHNOLOGIES,
      sectionTitleColor: apiConfig.sectionTitleColor || constants.DEFAULT_COLORS.SECTION_TITLE,
      sectionSubtitleColor: apiConfig.sectionSubtitleColor || constants.DEFAULT_COLORS.SECTION_SUBTITLE,
      backgroundColor: apiConfig.backgroundColor || constants.DEFAULT_COLORS.BACKGROUND,
      cardTitleColor: apiConfig.cardTitleColor || constants.DEFAULT_COLORS.CARD_TITLE,
      cardDescriptionColor: apiConfig.cardDescriptionColor || constants.DEFAULT_COLORS.CARD_DESCRIPTION,
      sectionTitleFontFamily: apiConfig.sectionTitleFontFamily || constants.DEFAULT_FONTS.SECTION_TITLE,
      sectionSubtitleFontFamily: apiConfig.sectionSubtitleFontFamily || constants.DEFAULT_FONTS.SECTION_SUBTITLE,
      cardTitleFontFamily: apiConfig.cardTitleFontFamily || constants.DEFAULT_FONTS.CARD_TITLE,
      cardDescriptionFontFamily: apiConfig.cardDescriptionFontFamily || constants.DEFAULT_FONTS.CARD_DESCRIPTION
    };
  }

  private mapSimpleConfigToApiConfig(simpleConfig: SimpleTechnologySectionConfig): any {
    return {
      sectionTitle: simpleConfig.sectionTitle,
      sectionSubtitle: simpleConfig.sectionSubtitle,
      technologies: simpleConfig.technologies,
      sectionTitleColor: simpleConfig.sectionTitleColor,
      sectionSubtitleColor: simpleConfig.sectionSubtitleColor,
      backgroundColor: simpleConfig.backgroundColor,
      cardTitleColor: simpleConfig.cardTitleColor,
      cardDescriptionColor: simpleConfig.cardDescriptionColor,
      sectionTitleFontFamily: simpleConfig.sectionTitleFontFamily,
      sectionSubtitleFontFamily: simpleConfig.sectionSubtitleFontFamily,
      cardTitleFontFamily: simpleConfig.cardTitleFontFamily,
      cardDescriptionFontFamily: simpleConfig.cardDescriptionFontFamily
    };
  }

  isEditingEnabled(): boolean {
    return true; // API mode supports editing
  }
}
