import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { VALUES_CONSTANTS } from '../constants/values.constants';

export interface Value {
  icon: string;
  title: string;
  description: string;
}

export interface SimpleValuesConfig {
  // Section Content
  sectionTitle: string;
  values: Value[];

  // Styling
  sectionTitleColor: string;
  valueTitleColor: string;
  valueDescriptionColor: string;
  backgroundColor: string;

  sectionTitleFontFamily: string;
  valueTitleFontFamily: string;
  valueDescriptionFontFamily: string;
}

@Injectable({
  providedIn: 'root'
})
export class ValuesApiService {
  private get configUrl(): string {
    return this.apiConfig.getEndpointUrl('AboutValues');
  }
  private localStorageKey = 'valuesConfig';
  private JSON_FILE_PATH = './assets/about/values.json';

  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService
  ) { }

  loadConfig(): Observable<SimpleValuesConfig> {
    // Try to load from local storage first
    const localConfig = this.loadConfigFromLocalStorage();
    if (localConfig) {
      return of(localConfig);
    }

    // Try to load from API
    console.log('Loading values config from API:', this.configUrl);
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

  saveConfig(config: SimpleValuesConfig): Observable<any> {
    this.saveConfigToLocalStorage(config);
    const apiConfig = this.mapSimpleConfigToApiConfig(config);
    
    console.log('Saving values config to API:', apiConfig);
    
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

  private loadConfigFromLocalStorage(): SimpleValuesConfig | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      const configString = localStorage.getItem(this.localStorageKey);
      return configString ? JSON.parse(configString) : null;
    }
    return null;
  }

  private saveConfigToLocalStorage(config: SimpleValuesConfig): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(config));
    }
  }

  private loadConfigFromJsonOrDefaults(): Observable<SimpleValuesConfig> {
    return this.http.get(this.JSON_FILE_PATH).pipe(
      map((jsonConfig: any) => this.mapToSimpleConfig(jsonConfig)),
      catchError(error => {
        console.error('Error loading config from JSON, falling back to default constants:', error);
        return of(this.getDefaultConfig());
      })
    );
  }

  private mapToSimpleConfig(jsonConfig: any): SimpleValuesConfig {
    return {
      // Section Content
      sectionTitle: jsonConfig.sectionTitle || VALUES_CONSTANTS.DEFAULT_SECTION_TITLE,
      values: jsonConfig.values || [...VALUES_CONSTANTS.DEFAULT_VALUES],

      // Styling
      sectionTitleColor: jsonConfig.sectionTitleColor || VALUES_CONSTANTS.DEFAULT_COLORS.SECTION_TITLE,
      valueTitleColor: jsonConfig.valueTitleColor || VALUES_CONSTANTS.DEFAULT_COLORS.VALUE_TITLE,
      valueDescriptionColor: jsonConfig.valueDescriptionColor || VALUES_CONSTANTS.DEFAULT_COLORS.VALUE_DESCRIPTION,
      backgroundColor: jsonConfig.backgroundColor || VALUES_CONSTANTS.DEFAULT_COLORS.BACKGROUND,

      sectionTitleFontFamily: jsonConfig.sectionTitleFontFamily || VALUES_CONSTANTS.DEFAULT_FONTS.SECTION_TITLE,
      valueTitleFontFamily: jsonConfig.valueTitleFontFamily || VALUES_CONSTANTS.DEFAULT_FONTS.VALUE_TITLE,
      valueDescriptionFontFamily: jsonConfig.valueDescriptionFontFamily || VALUES_CONSTANTS.DEFAULT_FONTS.VALUE_DESCRIPTION
    };
  }

  private getDefaultConfig(): SimpleValuesConfig {
    return this.mapToSimpleConfig({});
  }

  private mapApiConfigToSimpleConfig(apiConfig: any): SimpleValuesConfig {
    return {
      // Section Content
      sectionTitle: apiConfig.sectionTitle || VALUES_CONSTANTS.DEFAULT_SECTION_TITLE,
      values: apiConfig.values || [...VALUES_CONSTANTS.DEFAULT_VALUES],

      // Styling
      sectionTitleColor: apiConfig.sectionTitleColor || VALUES_CONSTANTS.DEFAULT_COLORS.SECTION_TITLE,
      valueTitleColor: apiConfig.valueTitleColor || VALUES_CONSTANTS.DEFAULT_COLORS.VALUE_TITLE,
      valueDescriptionColor: apiConfig.valueDescriptionColor || VALUES_CONSTANTS.DEFAULT_COLORS.VALUE_DESCRIPTION,
      backgroundColor: apiConfig.backgroundColor || VALUES_CONSTANTS.DEFAULT_COLORS.BACKGROUND,

      sectionTitleFontFamily: apiConfig.sectionTitleFontFamily || VALUES_CONSTANTS.DEFAULT_FONTS.SECTION_TITLE,
      valueTitleFontFamily: apiConfig.valueTitleFontFamily || VALUES_CONSTANTS.DEFAULT_FONTS.VALUE_TITLE,
      valueDescriptionFontFamily: apiConfig.valueDescriptionFontFamily || VALUES_CONSTANTS.DEFAULT_FONTS.VALUE_DESCRIPTION
    };
  }

  private mapSimpleConfigToApiConfig(simpleConfig: SimpleValuesConfig): any {
    return {
      sectionTitle: simpleConfig.sectionTitle,
      values: simpleConfig.values,
      sectionTitleColor: simpleConfig.sectionTitleColor,
      valueTitleColor: simpleConfig.valueTitleColor,
      valueDescriptionColor: simpleConfig.valueDescriptionColor,
      backgroundColor: simpleConfig.backgroundColor,
      sectionTitleFontFamily: simpleConfig.sectionTitleFontFamily,
      valueTitleFontFamily: simpleConfig.valueTitleFontFamily,
      valueDescriptionFontFamily: simpleConfig.valueDescriptionFontFamily
    };
  }
}
