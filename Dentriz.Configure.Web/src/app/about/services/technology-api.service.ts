import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { TECHNOLOGY_CONSTANTS } from '../constants/technology.constants';
import { ApiConfigService } from '../../core/services/api-config.service';

export interface Technology {
  icon: string;
  title: string;
  description: string;
}

export interface SimpleTechnologyConfig {
  // Section Content
  sectionTitle: string;
  sectionSubtitle: string;
  technologies: Technology[];

  // Styling
  sectionTitleColor: string;
  sectionSubtitleColor: string;
  techTitleColor: string;
  techDescriptionColor: string;
  backgroundColor: string;

  sectionTitleFontFamily: string;
  sectionSubtitleFontFamily: string;
  techTitleFontFamily: string;
  techDescriptionFontFamily: string;
}

@Injectable({
  providedIn: 'root'
})
export class TechnologyApiService {
  private get configUrl(): string {
    return this.apiConfig.getEndpointUrl('AboutTechnology');
  }
  private localStorageKey = 'technologyConfig';
  private JSON_FILE_PATH = './assets/about/technology.json';

  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService
  ) { }

  loadConfig(): Observable<SimpleTechnologyConfig> {
    // Try to load from local storage first
    const localConfig = this.loadConfigFromLocalStorage();
    if (localConfig) {
      return of(localConfig);
    }

    // Try to load from API
    console.log('Loading technology config from API:', this.configUrl);
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

  saveConfig(config: SimpleTechnologyConfig): Observable<any> {
    this.saveConfigToLocalStorage(config);
    const apiConfig = this.mapSimpleConfigToApiConfig(config);
    
    console.log('Saving technology config to API:', apiConfig);
    
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

  private loadConfigFromLocalStorage(): SimpleTechnologyConfig | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      const configString = localStorage.getItem(this.localStorageKey);
      return configString ? JSON.parse(configString) : null;
    }
    return null;
  }

  private saveConfigToLocalStorage(config: SimpleTechnologyConfig): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(config));
    }
  }

  private loadConfigFromJsonOrDefaults(): Observable<SimpleTechnologyConfig> {
    return this.http.get(this.JSON_FILE_PATH).pipe(
      map((jsonConfig: any) => this.mapToSimpleConfig(jsonConfig)),
      catchError(error => {
        console.error('Error loading config from JSON, falling back to default constants:', error);
        return of(this.getDefaultConfig());
      })
    );
  }

  private mapToSimpleConfig(jsonConfig: any): SimpleTechnologyConfig {
    return {
      // Section Content
      sectionTitle: jsonConfig.sectionTitle || TECHNOLOGY_CONSTANTS.DEFAULT_SECTION_TITLE,
      sectionSubtitle: jsonConfig.sectionSubtitle || TECHNOLOGY_CONSTANTS.DEFAULT_SECTION_SUBTITLE,
      technologies: jsonConfig.technologies || [...TECHNOLOGY_CONSTANTS.DEFAULT_TECHNOLOGIES],

      // Styling
      sectionTitleColor: jsonConfig.sectionTitleColor || TECHNOLOGY_CONSTANTS.DEFAULT_COLORS.SECTION_TITLE,
      sectionSubtitleColor: jsonConfig.sectionSubtitleColor || TECHNOLOGY_CONSTANTS.DEFAULT_COLORS.SECTION_SUBTITLE,
      techTitleColor: jsonConfig.techTitleColor || TECHNOLOGY_CONSTANTS.DEFAULT_COLORS.TECH_TITLE,
      techDescriptionColor: jsonConfig.techDescriptionColor || TECHNOLOGY_CONSTANTS.DEFAULT_COLORS.TECH_DESCRIPTION,
      backgroundColor: jsonConfig.backgroundColor || TECHNOLOGY_CONSTANTS.DEFAULT_COLORS.BACKGROUND,

      sectionTitleFontFamily: jsonConfig.sectionTitleFontFamily || TECHNOLOGY_CONSTANTS.DEFAULT_FONTS.SECTION_TITLE,
      sectionSubtitleFontFamily: jsonConfig.sectionSubtitleFontFamily || TECHNOLOGY_CONSTANTS.DEFAULT_FONTS.SECTION_SUBTITLE,
      techTitleFontFamily: jsonConfig.techTitleFontFamily || TECHNOLOGY_CONSTANTS.DEFAULT_FONTS.TECH_TITLE,
      techDescriptionFontFamily: jsonConfig.techDescriptionFontFamily || TECHNOLOGY_CONSTANTS.DEFAULT_FONTS.TECH_DESCRIPTION
    };
  }

  private getDefaultConfig(): SimpleTechnologyConfig {
    return this.mapToSimpleConfig({});
  }

  private mapApiConfigToSimpleConfig(apiConfig: any): SimpleTechnologyConfig {
    return {
      // Section Content
      sectionTitle: apiConfig.sectionTitle || TECHNOLOGY_CONSTANTS.DEFAULT_SECTION_TITLE,
      sectionSubtitle: apiConfig.sectionSubtitle || TECHNOLOGY_CONSTANTS.DEFAULT_SECTION_SUBTITLE,
      technologies: apiConfig.technologies || [...TECHNOLOGY_CONSTANTS.DEFAULT_TECHNOLOGIES],

      // Styling
      sectionTitleColor: apiConfig.sectionTitleColor || TECHNOLOGY_CONSTANTS.DEFAULT_COLORS.SECTION_TITLE,
      sectionSubtitleColor: apiConfig.sectionSubtitleColor || TECHNOLOGY_CONSTANTS.DEFAULT_COLORS.SECTION_SUBTITLE,
      techTitleColor: apiConfig.techTitleColor || TECHNOLOGY_CONSTANTS.DEFAULT_COLORS.TECH_TITLE,
      techDescriptionColor: apiConfig.techDescriptionColor || TECHNOLOGY_CONSTANTS.DEFAULT_COLORS.TECH_DESCRIPTION,
      backgroundColor: apiConfig.backgroundColor || TECHNOLOGY_CONSTANTS.DEFAULT_COLORS.BACKGROUND,

      sectionTitleFontFamily: apiConfig.sectionTitleFontFamily || TECHNOLOGY_CONSTANTS.DEFAULT_FONTS.SECTION_TITLE,
      sectionSubtitleFontFamily: apiConfig.sectionSubtitleFontFamily || TECHNOLOGY_CONSTANTS.DEFAULT_FONTS.SECTION_SUBTITLE,
      techTitleFontFamily: apiConfig.techTitleFontFamily || TECHNOLOGY_CONSTANTS.DEFAULT_FONTS.TECH_TITLE,
      techDescriptionFontFamily: apiConfig.techDescriptionFontFamily || TECHNOLOGY_CONSTANTS.DEFAULT_FONTS.TECH_DESCRIPTION
    };
  }

  private mapSimpleConfigToApiConfig(simpleConfig: SimpleTechnologyConfig): any {
    return {
      sectionTitle: simpleConfig.sectionTitle,
      sectionSubtitle: simpleConfig.sectionSubtitle,
      technologies: simpleConfig.technologies,
      sectionTitleColor: simpleConfig.sectionTitleColor,
      sectionSubtitleColor: simpleConfig.sectionSubtitleColor,
      techTitleColor: simpleConfig.techTitleColor,
      techDescriptionColor: simpleConfig.techDescriptionColor,
      backgroundColor: simpleConfig.backgroundColor,
      sectionTitleFontFamily: simpleConfig.sectionTitleFontFamily,
      sectionSubtitleFontFamily: simpleConfig.sectionSubtitleFontFamily,
      techTitleFontFamily: simpleConfig.techTitleFontFamily,
      techDescriptionFontFamily: simpleConfig.techDescriptionFontFamily
    };
  }
}
