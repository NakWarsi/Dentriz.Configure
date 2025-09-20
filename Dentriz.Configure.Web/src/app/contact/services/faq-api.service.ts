import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { FAQ_CONSTANTS } from '../constants/faq.constants';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SimpleFAQConfig {
  // Section Content
  sectionTitle: string;
  sectionSubtitle: string;
  faqItems: FAQItem[];

  // Styling
  sectionTitleColor: string;
  sectionSubtitleColor: string;
  questionColor: string;
  answerColor: string;
  backgroundColor: string;

  sectionTitleFontFamily: string;
  sectionSubtitleFontFamily: string;
  questionFontFamily: string;
  answerFontFamily: string;
}

@Injectable({
  providedIn: 'root'
})
export class FAQApiService {
  private get configUrl(): string {
    return this.apiConfig.getEndpointUrl('ContactFaq');
  }
  private localStorageKey = 'faqConfig';
  private JSON_FILE_PATH = './assets/contact/faq.json';

  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService
  ) { }

  loadConfig(): Observable<SimpleFAQConfig> {
    // Try to load from local storage first
    const localConfig = this.loadConfigFromLocalStorage();
    if (localConfig) {
      return of(localConfig);
    }

    // Try to load from API
    console.log('Loading FAQ config from API:', this.configUrl);
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

  saveConfig(config: SimpleFAQConfig): Observable<any> {
    this.saveConfigToLocalStorage(config);
    const apiConfig = this.mapSimpleConfigToApiConfig(config);
    
    console.log('Saving FAQ config to API:', apiConfig);
    
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

  private loadConfigFromLocalStorage(): SimpleFAQConfig | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      const configString = localStorage.getItem(this.localStorageKey);
      return configString ? JSON.parse(configString) : null;
    }
    return null;
  }

  private saveConfigToLocalStorage(config: SimpleFAQConfig): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(config));
    }
  }

  private loadConfigFromJsonOrDefaults(): Observable<SimpleFAQConfig> {
    return this.http.get(this.JSON_FILE_PATH).pipe(
      map((jsonConfig: any) => this.mapToSimpleConfig(jsonConfig)),
      catchError(error => {
        console.error('Error loading config from JSON, falling back to default constants:', error);
        return of(this.getDefaultConfig());
      })
    );
  }

  private mapToSimpleConfig(jsonConfig: any): SimpleFAQConfig {
    return {
      // Section Content
      sectionTitle: jsonConfig.sectionTitle || FAQ_CONSTANTS.DEFAULT_SECTION_TITLE,
      sectionSubtitle: jsonConfig.sectionSubtitle || FAQ_CONSTANTS.DEFAULT_SECTION_SUBTITLE,
      faqItems: jsonConfig.faqItems || [...FAQ_CONSTANTS.DEFAULT_FAQ_ITEMS],

      // Styling
      sectionTitleColor: jsonConfig.sectionTitleColor || FAQ_CONSTANTS.DEFAULT_COLORS.SECTION_TITLE,
      sectionSubtitleColor: jsonConfig.sectionSubtitleColor || FAQ_CONSTANTS.DEFAULT_COLORS.SECTION_SUBTITLE,
      questionColor: jsonConfig.questionColor || FAQ_CONSTANTS.DEFAULT_COLORS.QUESTION,
      answerColor: jsonConfig.answerColor || FAQ_CONSTANTS.DEFAULT_COLORS.ANSWER,
      backgroundColor: jsonConfig.backgroundColor || FAQ_CONSTANTS.DEFAULT_COLORS.BACKGROUND,

      sectionTitleFontFamily: jsonConfig.sectionTitleFontFamily || FAQ_CONSTANTS.DEFAULT_FONTS.SECTION_TITLE,
      sectionSubtitleFontFamily: jsonConfig.sectionSubtitleFontFamily || FAQ_CONSTANTS.DEFAULT_FONTS.SECTION_SUBTITLE,
      questionFontFamily: jsonConfig.questionFontFamily || FAQ_CONSTANTS.DEFAULT_FONTS.QUESTION,
      answerFontFamily: jsonConfig.answerFontFamily || FAQ_CONSTANTS.DEFAULT_FONTS.ANSWER
    };
  }

  private getDefaultConfig(): SimpleFAQConfig {
    return this.mapToSimpleConfig({});
  }

  private mapApiConfigToSimpleConfig(apiConfig: any): SimpleFAQConfig {
    return {
      // Section Content
      sectionTitle: apiConfig.sectionTitle || FAQ_CONSTANTS.DEFAULT_SECTION_TITLE,
      sectionSubtitle: apiConfig.sectionSubtitle || FAQ_CONSTANTS.DEFAULT_SECTION_SUBTITLE,
      faqItems: apiConfig.faqItems || [...FAQ_CONSTANTS.DEFAULT_FAQ_ITEMS],

      // Styling
      sectionTitleColor: apiConfig.sectionTitleColor || FAQ_CONSTANTS.DEFAULT_COLORS.SECTION_TITLE,
      sectionSubtitleColor: apiConfig.sectionSubtitleColor || FAQ_CONSTANTS.DEFAULT_COLORS.SECTION_SUBTITLE,
      questionColor: apiConfig.questionColor || FAQ_CONSTANTS.DEFAULT_COLORS.QUESTION,
      answerColor: apiConfig.answerColor || FAQ_CONSTANTS.DEFAULT_COLORS.ANSWER,
      backgroundColor: apiConfig.backgroundColor || FAQ_CONSTANTS.DEFAULT_COLORS.BACKGROUND,

      sectionTitleFontFamily: apiConfig.sectionTitleFontFamily || FAQ_CONSTANTS.DEFAULT_FONTS.SECTION_TITLE,
      sectionSubtitleFontFamily: apiConfig.sectionSubtitleFontFamily || FAQ_CONSTANTS.DEFAULT_FONTS.SECTION_SUBTITLE,
      questionFontFamily: apiConfig.questionFontFamily || FAQ_CONSTANTS.DEFAULT_FONTS.QUESTION,
      answerFontFamily: apiConfig.answerFontFamily || FAQ_CONSTANTS.DEFAULT_FONTS.ANSWER
    };
  }

  private mapSimpleConfigToApiConfig(simpleConfig: SimpleFAQConfig): any {
    return {
      sectionTitle: simpleConfig.sectionTitle,
      sectionSubtitle: simpleConfig.sectionSubtitle,
      faqItems: simpleConfig.faqItems,
      sectionTitleColor: simpleConfig.sectionTitleColor,
      sectionSubtitleColor: simpleConfig.sectionSubtitleColor,
      questionColor: simpleConfig.questionColor,
      answerColor: simpleConfig.answerColor,
      backgroundColor: simpleConfig.backgroundColor,
      sectionTitleFontFamily: simpleConfig.sectionTitleFontFamily,
      sectionSubtitleFontFamily: simpleConfig.sectionSubtitleFontFamily,
      questionFontFamily: simpleConfig.questionFontFamily,
      answerFontFamily: simpleConfig.answerFontFamily
    };
  }
}
