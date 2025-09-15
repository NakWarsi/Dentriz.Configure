import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HOME_REASONS_SECTION_CONSTANTS } from '../constants/home-reasons-section.constants';

export interface SimpleReasonsConfig {
  sectionTitle: string;
  sectionIntro: string;
  
  // Reason 1
  reason1Icon: string;
  reason1Title: string;
  reason1Items: readonly string[];
  
  // Reason 2
  reason2Icon: string;
  reason2Title: string;
  reason2Items: readonly string[];
  
  // Reason 3
  reason3Icon: string;
  reason3Title: string;
  reason3Items: readonly string[];
  
  // Reason 4
  reason4Icon: string;
  reason4Title: string;
  reason4Items: readonly string[];
  
  // Reason 5
  reason5Icon: string;
  reason5Title: string;
  reason5Items: readonly string[];
  
  // Reason 6
  reason6Icon: string;
  reason6Title: string;
  reason6Items: readonly string[];
  
  // Individual color options for each element
  sectionTitleColor: string;
  sectionIntroColor: string;
  reason1TitleColor: string;
  reason1ItemsColor: string;
  reason2TitleColor: string;
  reason2ItemsColor: string;
  reason3TitleColor: string;
  reason3ItemsColor: string;
  reason4TitleColor: string;
  reason4ItemsColor: string;
  reason5TitleColor: string;
  reason5ItemsColor: string;
  reason6TitleColor: string;
  reason6ItemsColor: string;
  
  // Individual font family options for each element
  sectionTitleFontFamily: string;
  sectionIntroFontFamily: string;
  reason1TitleFontFamily: string;
  reason1ItemsFontFamily: string;
  reason2TitleFontFamily: string;
  reason2ItemsFontFamily: string;
  reason3TitleFontFamily: string;
  reason3ItemsFontFamily: string;
  reason4TitleFontFamily: string;
  reason4ItemsFontFamily: string;
  reason5TitleFontFamily: string;
  reason5ItemsFontFamily: string;
  reason6TitleFontFamily: string;
  reason6ItemsFontFamily: string;
  
  // Global styling options
  backgroundColor: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReasonsSectionApiService {
  private readonly baseUrl = 'https://localhost:7073/api';
  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  /**
   * Load configuration from API with fallback to JSON file
   */
  loadConfig(): Observable<SimpleReasonsConfig> {
    const configUrl = 'http://localhost:5208/api/HomeReasons';
    
    console.log('📥 Loading reasons config from API:', configUrl);
    
    return this.http.get<any>(configUrl, this.httpOptions)
      .pipe(
        map((data: any) => {
          console.log('✅ Reasons config loaded successfully from API:', data);
          return this.mapApiConfigToSimpleConfig(data);
        }),
        catchError(error => {
          console.warn('⚠️ API failed, falling back to localStorage:', error);
          return this.loadFromLocalStorage();
        })
      );
  }


  /**
   * Load configuration from localStorage as final fallback
   */
  private loadFromLocalStorage(): Observable<SimpleReasonsConfig> {
    console.log('📥 Loading reasons config from localStorage');
    
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const savedConfig = localStorage.getItem('dentrizReasonsSectionConfig');
        if (savedConfig) {
          const data = JSON.parse(savedConfig);
          console.log('✅ Reasons config loaded from localStorage:', data);
          return of(this.mapApiConfigToSimpleConfig(data));
        }
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
    
    // Return default config if all else fails
    console.log('📥 Using default reasons config');
    return of(this.getDefaultConfig());
  }

  /**
   * Map API config to SimpleReasonsConfig format
   */
  private mapApiConfigToSimpleConfig(data: any): SimpleReasonsConfig {
    return {
      sectionTitle: data.sectionTitle || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_SECTION_TITLE,
      sectionIntro: data.sectionIntro || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_SECTION_INTRO,
      
      // Reason 1
      reason1Icon: data.reason1Icon || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON1_ICON,
      reason1Title: data.reason1Title || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON1_TITLE,
      reason1Items: data.reason1Items || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON1_ITEMS,
      
      // Reason 2
      reason2Icon: data.reason2Icon || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON2_ICON,
      reason2Title: data.reason2Title || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON2_TITLE,
      reason2Items: data.reason2Items || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON2_ITEMS,
      
      // Reason 3
      reason3Icon: data.reason3Icon || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON3_ICON,
      reason3Title: data.reason3Title || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON3_TITLE,
      reason3Items: data.reason3Items || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON3_ITEMS,
      
      // Reason 4
      reason4Icon: data.reason4Icon || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON4_ICON,
      reason4Title: data.reason4Title || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON4_TITLE,
      reason4Items: data.reason4Items || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON4_ITEMS,
      
      // Reason 5
      reason5Icon: data.reason5Icon || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON5_ICON,
      reason5Title: data.reason5Title || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON5_TITLE,
      reason5Items: data.reason5Items || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON5_ITEMS,
      
      // Reason 6
      reason6Icon: data.reason6Icon || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON6_ICON,
      reason6Title: data.reason6Title || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON6_TITLE,
      reason6Items: data.reason6Items || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON6_ITEMS,
      
      // Individual color options with defaults from constants
      sectionTitleColor: data.sectionTitleColor || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_COLORS.SECTION_TITLE,
      sectionIntroColor: data.sectionIntroColor || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_COLORS.SECTION_INTRO,
      reason1TitleColor: data.reason1TitleColor || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_COLORS.REASON1_TITLE,
      reason1ItemsColor: data.reason1ItemsColor || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_COLORS.REASON1_ITEMS,
      reason2TitleColor: data.reason2TitleColor || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_COLORS.REASON2_TITLE,
      reason2ItemsColor: data.reason2ItemsColor || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_COLORS.REASON2_ITEMS,
      reason3TitleColor: data.reason3TitleColor || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_COLORS.REASON3_TITLE,
      reason3ItemsColor: data.reason3ItemsColor || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_COLORS.REASON3_ITEMS,
      reason4TitleColor: data.reason4TitleColor || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_COLORS.REASON4_TITLE,
      reason4ItemsColor: data.reason4ItemsColor || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_COLORS.REASON4_ITEMS,
      reason5TitleColor: data.reason5TitleColor || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_COLORS.REASON5_TITLE,
      reason5ItemsColor: data.reason5ItemsColor || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_COLORS.REASON5_ITEMS,
      reason6TitleColor: data.reason6TitleColor || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_COLORS.REASON6_TITLE,
      reason6ItemsColor: data.reason6ItemsColor || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_COLORS.REASON6_ITEMS,
      
      // Individual font family options with defaults from constants
      sectionTitleFontFamily: data.sectionTitleFontFamily || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_FONTS.SECTION_TITLE,
      sectionIntroFontFamily: data.sectionIntroFontFamily || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_FONTS.SECTION_INTRO,
      reason1TitleFontFamily: data.reason1TitleFontFamily || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_FONTS.REASON1_TITLE,
      reason1ItemsFontFamily: data.reason1ItemsFontFamily || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_FONTS.REASON1_ITEMS,
      reason2TitleFontFamily: data.reason2TitleFontFamily || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_FONTS.REASON2_TITLE,
      reason2ItemsFontFamily: data.reason2ItemsFontFamily || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_FONTS.REASON2_ITEMS,
      reason3TitleFontFamily: data.reason3TitleFontFamily || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_FONTS.REASON3_TITLE,
      reason3ItemsFontFamily: data.reason3ItemsFontFamily || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_FONTS.REASON3_ITEMS,
      reason4TitleFontFamily: data.reason4TitleFontFamily || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_FONTS.REASON4_TITLE,
      reason4ItemsFontFamily: data.reason4ItemsFontFamily || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_FONTS.REASON4_ITEMS,
      reason5TitleFontFamily: data.reason5TitleFontFamily || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_FONTS.REASON5_TITLE,
      reason5ItemsFontFamily: data.reason5ItemsFontFamily || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_FONTS.REASON5_ITEMS,
      reason6TitleFontFamily: data.reason6TitleFontFamily || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_FONTS.REASON6_TITLE,
      reason6ItemsFontFamily: data.reason6ItemsFontFamily || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_FONTS.REASON6_ITEMS,
      
      // Global styling options with defaults from constants
      backgroundColor: data.backgroundColor || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_COLORS.BACKGROUND
    };
  }

  /**
   * Get default configuration
   */
  private getDefaultConfig(): SimpleReasonsConfig {
    return {
      sectionTitle: HOME_REASONS_SECTION_CONSTANTS.DEFAULT_SECTION_TITLE,
      sectionIntro: HOME_REASONS_SECTION_CONSTANTS.DEFAULT_SECTION_INTRO,
      reason1Icon: HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON1_ICON,
      reason1Title: HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON1_TITLE,
      reason1Items: HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON1_ITEMS,
      reason2Icon: HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON2_ICON,
      reason2Title: HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON2_TITLE,
      reason2Items: HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON2_ITEMS,
      reason3Icon: HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON3_ICON,
      reason3Title: HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON3_TITLE,
      reason3Items: HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON3_ITEMS,
      reason4Icon: HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON4_ICON,
      reason4Title: HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON4_TITLE,
      reason4Items: HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON4_ITEMS,
      reason5Icon: HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON5_ICON,
      reason5Title: HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON5_TITLE,
      reason5Items: HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON5_ITEMS,
      reason6Icon: HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON6_ICON,
      reason6Title: HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON6_TITLE,
      reason6Items: HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON6_ITEMS,
      sectionTitleColor: HOME_REASONS_SECTION_CONSTANTS.DEFAULT_COLORS.SECTION_TITLE,
      sectionIntroColor: HOME_REASONS_SECTION_CONSTANTS.DEFAULT_COLORS.SECTION_INTRO,
      reason1TitleColor: HOME_REASONS_SECTION_CONSTANTS.DEFAULT_COLORS.REASON1_TITLE,
      reason1ItemsColor: HOME_REASONS_SECTION_CONSTANTS.DEFAULT_COLORS.REASON1_ITEMS,
      reason2TitleColor: HOME_REASONS_SECTION_CONSTANTS.DEFAULT_COLORS.REASON2_TITLE,
      reason2ItemsColor: HOME_REASONS_SECTION_CONSTANTS.DEFAULT_COLORS.REASON2_ITEMS,
      reason3TitleColor: HOME_REASONS_SECTION_CONSTANTS.DEFAULT_COLORS.REASON3_TITLE,
      reason3ItemsColor: HOME_REASONS_SECTION_CONSTANTS.DEFAULT_COLORS.REASON3_ITEMS,
      reason4TitleColor: HOME_REASONS_SECTION_CONSTANTS.DEFAULT_COLORS.REASON4_TITLE,
      reason4ItemsColor: HOME_REASONS_SECTION_CONSTANTS.DEFAULT_COLORS.REASON4_ITEMS,
      reason5TitleColor: HOME_REASONS_SECTION_CONSTANTS.DEFAULT_COLORS.REASON5_TITLE,
      reason5ItemsColor: HOME_REASONS_SECTION_CONSTANTS.DEFAULT_COLORS.REASON5_ITEMS,
      reason6TitleColor: HOME_REASONS_SECTION_CONSTANTS.DEFAULT_COLORS.REASON6_TITLE,
      reason6ItemsColor: HOME_REASONS_SECTION_CONSTANTS.DEFAULT_COLORS.REASON6_ITEMS,
      sectionTitleFontFamily: HOME_REASONS_SECTION_CONSTANTS.DEFAULT_FONTS.SECTION_TITLE,
      sectionIntroFontFamily: HOME_REASONS_SECTION_CONSTANTS.DEFAULT_FONTS.SECTION_INTRO,
      reason1TitleFontFamily: HOME_REASONS_SECTION_CONSTANTS.DEFAULT_FONTS.REASON1_TITLE,
      reason1ItemsFontFamily: HOME_REASONS_SECTION_CONSTANTS.DEFAULT_FONTS.REASON1_ITEMS,
      reason2TitleFontFamily: HOME_REASONS_SECTION_CONSTANTS.DEFAULT_FONTS.REASON2_TITLE,
      reason2ItemsFontFamily: HOME_REASONS_SECTION_CONSTANTS.DEFAULT_FONTS.REASON2_ITEMS,
      reason3TitleFontFamily: HOME_REASONS_SECTION_CONSTANTS.DEFAULT_FONTS.REASON3_TITLE,
      reason3ItemsFontFamily: HOME_REASONS_SECTION_CONSTANTS.DEFAULT_FONTS.REASON3_ITEMS,
      reason4TitleFontFamily: HOME_REASONS_SECTION_CONSTANTS.DEFAULT_FONTS.REASON4_TITLE,
      reason4ItemsFontFamily: HOME_REASONS_SECTION_CONSTANTS.DEFAULT_FONTS.REASON4_ITEMS,
      reason5TitleFontFamily: HOME_REASONS_SECTION_CONSTANTS.DEFAULT_FONTS.REASON5_TITLE,
      reason5ItemsFontFamily: HOME_REASONS_SECTION_CONSTANTS.DEFAULT_FONTS.REASON5_ITEMS,
      reason6TitleFontFamily: HOME_REASONS_SECTION_CONSTANTS.DEFAULT_FONTS.REASON6_TITLE,
      reason6ItemsFontFamily: HOME_REASONS_SECTION_CONSTANTS.DEFAULT_FONTS.REASON6_ITEMS,
      backgroundColor: HOME_REASONS_SECTION_CONSTANTS.DEFAULT_COLORS.BACKGROUND
    };
  }

  /**
   * Save configuration to API
   */
  saveConfig(config: SimpleReasonsConfig): Observable<any> {
    const configUrl = 'http://localhost:5208/api/HomeReasons';
    const apiConfig = this.mapSimpleConfigToApiConfig(config);
    
    console.log('💾 Saving reasons config to API:', configUrl, apiConfig);
    
    return this.http.post(configUrl, apiConfig, this.httpOptions)
      .pipe(
        map((response: any) => {
          console.log('✅ Reasons config saved successfully to API:', response);
          return response;
        }),
        catchError(error => {
          console.error('❌ Failed to save reasons config to API:', error);
          // Fallback to localStorage
          this.saveToLocalStorage(config);
          return throwError(() => error);
        })
      );
  }

  /**
   * Map SimpleReasonsConfig to API format
   */
  private mapSimpleConfigToApiConfig(config: SimpleReasonsConfig): any {
    return {
      id: 'home-reasons',
      sectionTitle: config.sectionTitle,
      sectionIntro: config.sectionIntro,
      reason1Icon: config.reason1Icon,
      reason1Title: config.reason1Title,
      reason1Items: config.reason1Items,
      reason2Icon: config.reason2Icon,
      reason2Title: config.reason2Title,
      reason2Items: config.reason2Items,
      reason3Icon: config.reason3Icon,
      reason3Title: config.reason3Title,
      reason3Items: config.reason3Items,
      reason4Icon: config.reason4Icon,
      reason4Title: config.reason4Title,
      reason4Items: config.reason4Items,
      reason5Icon: config.reason5Icon,
      reason5Title: config.reason5Title,
      reason5Items: config.reason5Items,
      reason6Icon: config.reason6Icon,
      reason6Title: config.reason6Title,
      reason6Items: config.reason6Items,
      sectionTitleColor: config.sectionTitleColor,
      sectionIntroColor: config.sectionIntroColor,
      reason1TitleColor: config.reason1TitleColor,
      reason1ItemsColor: config.reason1ItemsColor,
      reason2TitleColor: config.reason2TitleColor,
      reason2ItemsColor: config.reason2ItemsColor,
      reason3TitleColor: config.reason3TitleColor,
      reason3ItemsColor: config.reason3ItemsColor,
      reason4TitleColor: config.reason4TitleColor,
      reason4ItemsColor: config.reason4ItemsColor,
      reason5TitleColor: config.reason5TitleColor,
      reason5ItemsColor: config.reason5ItemsColor,
      reason6TitleColor: config.reason6TitleColor,
      reason6ItemsColor: config.reason6ItemsColor,
      backgroundColor: config.backgroundColor,
      sectionTitleFontFamily: config.sectionTitleFontFamily,
      sectionIntroFontFamily: config.sectionIntroFontFamily,
      reason1TitleFontFamily: config.reason1TitleFontFamily,
      reason1ItemsFontFamily: config.reason1ItemsFontFamily,
      reason2TitleFontFamily: config.reason2TitleFontFamily,
      reason2ItemsFontFamily: config.reason2ItemsFontFamily,
      reason3TitleFontFamily: config.reason3TitleFontFamily,
      reason3ItemsFontFamily: config.reason3ItemsFontFamily,
      reason4TitleFontFamily: config.reason4TitleFontFamily,
      reason4ItemsFontFamily: config.reason4ItemsFontFamily,
      reason5TitleFontFamily: config.reason5TitleFontFamily,
      reason5ItemsFontFamily: config.reason5ItemsFontFamily,
      reason6TitleFontFamily: config.reason6TitleFontFamily,
      reason6ItemsFontFamily: config.reason6ItemsFontFamily
    };
  }

  /**
   * Save configuration to localStorage as fallback
   */
  private saveToLocalStorage(config: SimpleReasonsConfig): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('dentrizReasonsSectionConfig', JSON.stringify(config));
        console.log('✅ Reasons config saved to localStorage');
      }
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  /**
   * Handle HTTP errors
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    
    if (typeof window !== 'undefined' && typeof ErrorEvent !== 'undefined' && error.error instanceof ErrorEvent) {
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      errorMessage = `Server Error: ${error.status} - ${error.message}`;
      if (error.error && error.error.message) {
        errorMessage += ` - ${error.error.message}`;
      }
    }
    
    console.error('API Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
