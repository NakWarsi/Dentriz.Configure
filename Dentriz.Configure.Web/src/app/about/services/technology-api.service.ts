import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { TECHNOLOGY_CONSTANTS } from '../constants/technology.constants';

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
  private configUrl = 'http://localhost:5000/api/config/technology';
  private localStorageKey = 'technologyConfig';
  private JSON_FILE_PATH = './assets/about/technology.json';

  constructor(private http: HttpClient) { }

  loadConfig(): Observable<SimpleTechnologyConfig> {
    // Try to load from local storage first
    const localConfig = this.loadConfigFromLocalStorage();
    if (localConfig) {
      return of(localConfig);
    }

    // For now, directly use constants data instead of trying API
    console.log('Loading technology config from constants');
    const defaultConfig = this.getDefaultConfig();
    this.saveConfigToLocalStorage(defaultConfig);
    return of(defaultConfig);
  }

  saveConfig(config: SimpleTechnologyConfig): Observable<any> {
    this.saveConfigToLocalStorage(config);
    return this.http.post(this.configUrl, config).pipe(
      catchError(error => {
        console.error('Error saving config to API, local storage updated:', error);
        alert('Configuration saved locally, but failed to save to server. Please check the API.');
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
}
