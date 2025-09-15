import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HOME_SERVICES_SECTION_CONSTANTS } from '../constants/home-services-section.constants';

export interface SimpleServicesConfig {
  sectionTitle: string;
  
  // Service 1 - Preventive Care
  service1Title: string;
  service1Items: readonly string[];
  service1ButtonText: string;
  
  // Service 2 - Restorative Care
  service2Title: string;
  service2Items: readonly string[];
  service2ButtonText: string;
  
  // Service 3 - Cosmetic Dentistry
  service3Title: string;
  service3Items: readonly string[];
  service3ButtonText: string;
  
  // Service 4 - Orthodontics
  service4Title: string;
  service4Items: readonly string[];
  service4ButtonText: string;
  
  // Service 5 - Pediatric Dentistry
  service5Title: string;
  service5Items: readonly string[];
  service5ButtonText: string;
  
  // Service 6 - Periodontal Care
  service6Title: string;
  service6Items: readonly string[];
  service6ButtonText: string;
  
  // Service 7 - Oral Surgery
  service7Title: string;
  service7Items: readonly string[];
  service7ButtonText: string;
  
  // Service 8 - Endodontics
  service8Title: string;
  service8Items: readonly string[];
  service8ButtonText: string;
  
  // Service 9 - Emergency Dentistry
  service9Title: string;
  service9Items: readonly string[];
  service9ButtonText: string;
  
  // Individual color options for each element
  sectionTitleColor: string;
  service1TitleColor: string;
  service1ItemsColor: string;
  service1ButtonColor: string;
  service2TitleColor: string;
  service2ItemsColor: string;
  service2ButtonColor: string;
  service3TitleColor: string;
  service3ItemsColor: string;
  service3ButtonColor: string;
  service4TitleColor: string;
  service4ItemsColor: string;
  service4ButtonColor: string;
  service5TitleColor: string;
  service5ItemsColor: string;
  service5ButtonColor: string;
  service6TitleColor: string;
  service6ItemsColor: string;
  service6ButtonColor: string;
  service7TitleColor: string;
  service7ItemsColor: string;
  service7ButtonColor: string;
  service8TitleColor: string;
  service8ItemsColor: string;
  service8ButtonColor: string;
  service9TitleColor: string;
  service9ItemsColor: string;
  service9ButtonColor: string;
  
  // Individual font family options for each element
  sectionTitleFontFamily: string;
  service1TitleFontFamily: string;
  service1ItemsFontFamily: string;
  service1ButtonFontFamily: string;
  service2TitleFontFamily: string;
  service2ItemsFontFamily: string;
  service2ButtonFontFamily: string;
  service3TitleFontFamily: string;
  service3ItemsFontFamily: string;
  service3ButtonFontFamily: string;
  service4TitleFontFamily: string;
  service4ItemsFontFamily: string;
  service4ButtonFontFamily: string;
  service5TitleFontFamily: string;
  service5ItemsFontFamily: string;
  service5ButtonFontFamily: string;
  service6TitleFontFamily: string;
  service6ItemsFontFamily: string;
  service6ButtonFontFamily: string;
  service7TitleFontFamily: string;
  service7ItemsFontFamily: string;
  service7ButtonFontFamily: string;
  service8TitleFontFamily: string;
  service8ItemsFontFamily: string;
  service8ButtonFontFamily: string;
  service9TitleFontFamily: string;
  service9ItemsFontFamily: string;
  service9ButtonFontFamily: string;
  
  // Global styling options
  backgroundColor: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServicesSectionApiService {
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
  loadConfig(): Observable<SimpleServicesConfig> {
    const configUrl = 'http://localhost:5208/api/HomeServices';
    
    console.log('📥 Loading services config from API:', configUrl);
    
    return this.http.get<any>(configUrl, this.httpOptions)
      .pipe(
        map((data: any) => {
          console.log('✅ Services config loaded successfully from API:', data);
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
  private loadFromLocalStorage(): Observable<SimpleServicesConfig> {
    console.log('📥 Loading services config from localStorage');
    
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const savedConfig = localStorage.getItem('dentrizServicesSectionConfig');
        if (savedConfig) {
          const data = JSON.parse(savedConfig);
          console.log('✅ Services config loaded from localStorage:', data);
          return of(this.mapApiConfigToSimpleConfig(data));
        }
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
    
    // Return default config if all else fails
    console.log('📥 Using default services config');
    return of(this.getDefaultConfig());
  }

  /**
   * Map API config to SimpleServicesConfig format
   */
  private mapApiConfigToSimpleConfig(data: any): SimpleServicesConfig {
    return {
      sectionTitle: data.sectionTitle || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SECTION_TITLE,
      
      // Service 1
      service1Title: data.service1Title || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE1_TITLE,
      service1Items: data.service1Items || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE1_ITEMS,
      service1ButtonText: data.service1ButtonText || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE1_BUTTON_TEXT,
      
      // Service 2
      service2Title: data.service2Title || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE2_TITLE,
      service2Items: data.service2Items || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE2_ITEMS,
      service2ButtonText: data.service2ButtonText || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE2_BUTTON_TEXT,
      
      // Service 3
      service3Title: data.service3Title || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE3_TITLE,
      service3Items: data.service3Items || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE3_ITEMS,
      service3ButtonText: data.service3ButtonText || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE3_BUTTON_TEXT,
      
      // Service 4
      service4Title: data.service4Title || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE4_TITLE,
      service4Items: data.service4Items || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE4_ITEMS,
      service4ButtonText: data.service4ButtonText || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE4_BUTTON_TEXT,
      
      // Service 5
      service5Title: data.service5Title || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE5_TITLE,
      service5Items: data.service5Items || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE5_ITEMS,
      service5ButtonText: data.service5ButtonText || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE5_BUTTON_TEXT,
      
      // Service 6
      service6Title: data.service6Title || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE6_TITLE,
      service6Items: data.service6Items || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE6_ITEMS,
      service6ButtonText: data.service6ButtonText || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE6_BUTTON_TEXT,
      
      // Service 7
      service7Title: data.service7Title || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE7_TITLE,
      service7Items: data.service7Items || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE7_ITEMS,
      service7ButtonText: data.service7ButtonText || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE7_BUTTON_TEXT,
      
      // Service 8
      service8Title: data.service8Title || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE8_TITLE,
      service8Items: data.service8Items || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE8_ITEMS,
      service8ButtonText: data.service8ButtonText || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE8_BUTTON_TEXT,
      
      // Service 9
      service9Title: data.service9Title || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE9_TITLE,
      service9Items: data.service9Items || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE9_ITEMS,
      service9ButtonText: data.service9ButtonText || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE9_BUTTON_TEXT,
      
      // Individual color options with defaults from constants
      sectionTitleColor: data.sectionTitleColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SECTION_TITLE,
      service1TitleColor: data.service1TitleColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE1_TITLE,
      service1ItemsColor: data.service1ItemsColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE1_ITEMS,
      service1ButtonColor: data.service1ButtonColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE1_BUTTON,
      service2TitleColor: data.service2TitleColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE2_TITLE,
      service2ItemsColor: data.service2ItemsColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE2_ITEMS,
      service2ButtonColor: data.service2ButtonColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE2_BUTTON,
      service3TitleColor: data.service3TitleColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE3_TITLE,
      service3ItemsColor: data.service3ItemsColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE3_ITEMS,
      service3ButtonColor: data.service3ButtonColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE3_BUTTON,
      service4TitleColor: data.service4TitleColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE4_TITLE,
      service4ItemsColor: data.service4ItemsColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE4_ITEMS,
      service4ButtonColor: data.service4ButtonColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE4_BUTTON,
      service5TitleColor: data.service5TitleColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE5_TITLE,
      service5ItemsColor: data.service5ItemsColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE5_ITEMS,
      service5ButtonColor: data.service5ButtonColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE5_BUTTON,
      service6TitleColor: data.service6TitleColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE6_TITLE,
      service6ItemsColor: data.service6ItemsColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE6_ITEMS,
      service6ButtonColor: data.service6ButtonColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE6_BUTTON,
      service7TitleColor: data.service7TitleColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE7_TITLE,
      service7ItemsColor: data.service7ItemsColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE7_ITEMS,
      service7ButtonColor: data.service7ButtonColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE7_BUTTON,
      service8TitleColor: data.service8TitleColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE8_TITLE,
      service8ItemsColor: data.service8ItemsColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE8_ITEMS,
      service8ButtonColor: data.service8ButtonColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE8_BUTTON,
      service9TitleColor: data.service9TitleColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE9_TITLE,
      service9ItemsColor: data.service9ItemsColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE9_ITEMS,
      service9ButtonColor: data.service9ButtonColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE9_BUTTON,
      
      // Individual font family options with defaults from constants
      sectionTitleFontFamily: data.sectionTitleFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SECTION_TITLE,
      service1TitleFontFamily: data.service1TitleFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE1_TITLE,
      service1ItemsFontFamily: data.service1ItemsFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE1_ITEMS,
      service1ButtonFontFamily: data.service1ButtonFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE1_BUTTON,
      service2TitleFontFamily: data.service2TitleFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE2_TITLE,
      service2ItemsFontFamily: data.service2ItemsFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE2_ITEMS,
      service2ButtonFontFamily: data.service2ButtonFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE2_BUTTON,
      service3TitleFontFamily: data.service3TitleFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE3_TITLE,
      service3ItemsFontFamily: data.service3ItemsFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE3_ITEMS,
      service3ButtonFontFamily: data.service3ButtonFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE3_BUTTON,
      service4TitleFontFamily: data.service4TitleFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE4_TITLE,
      service4ItemsFontFamily: data.service4ItemsFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE4_ITEMS,
      service4ButtonFontFamily: data.service4ButtonFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE4_BUTTON,
      service5TitleFontFamily: data.service5TitleFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE5_TITLE,
      service5ItemsFontFamily: data.service5ItemsFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE5_ITEMS,
      service5ButtonFontFamily: data.service5ButtonFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE5_BUTTON,
      service6TitleFontFamily: data.service6TitleFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE6_TITLE,
      service6ItemsFontFamily: data.service6ItemsFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE6_ITEMS,
      service6ButtonFontFamily: data.service6ButtonFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE6_BUTTON,
      service7TitleFontFamily: data.service7TitleFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE7_TITLE,
      service7ItemsFontFamily: data.service7ItemsFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE7_ITEMS,
      service7ButtonFontFamily: data.service7ButtonFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE7_BUTTON,
      service8TitleFontFamily: data.service8TitleFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE8_TITLE,
      service8ItemsFontFamily: data.service8ItemsFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE8_ITEMS,
      service8ButtonFontFamily: data.service8ButtonFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE8_BUTTON,
      service9TitleFontFamily: data.service9TitleFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE9_TITLE,
      service9ItemsFontFamily: data.service9ItemsFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE9_ITEMS,
      service9ButtonFontFamily: data.service9ButtonFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE9_BUTTON,
      
      // Global styling options with defaults from constants
      backgroundColor: data.backgroundColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.BACKGROUND
    };
  }

  /**
   * Get default configuration
   */
  private getDefaultConfig(): SimpleServicesConfig {
    return {
      sectionTitle: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SECTION_TITLE,
      service1Title: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE1_TITLE,
      service1Items: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE1_ITEMS,
      service1ButtonText: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE1_BUTTON_TEXT,
      service2Title: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE2_TITLE,
      service2Items: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE2_ITEMS,
      service2ButtonText: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE2_BUTTON_TEXT,
      service3Title: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE3_TITLE,
      service3Items: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE3_ITEMS,
      service3ButtonText: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE3_BUTTON_TEXT,
      service4Title: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE4_TITLE,
      service4Items: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE4_ITEMS,
      service4ButtonText: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE4_BUTTON_TEXT,
      service5Title: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE5_TITLE,
      service5Items: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE5_ITEMS,
      service5ButtonText: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE5_BUTTON_TEXT,
      service6Title: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE6_TITLE,
      service6Items: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE6_ITEMS,
      service6ButtonText: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE6_BUTTON_TEXT,
      service7Title: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE7_TITLE,
      service7Items: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE7_ITEMS,
      service7ButtonText: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE7_BUTTON_TEXT,
      service8Title: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE8_TITLE,
      service8Items: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE8_ITEMS,
      service8ButtonText: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE8_BUTTON_TEXT,
      service9Title: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE9_TITLE,
      service9Items: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE9_ITEMS,
      service9ButtonText: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE9_BUTTON_TEXT,
      sectionTitleColor: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SECTION_TITLE,
      service1TitleColor: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE1_TITLE,
      service1ItemsColor: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE1_ITEMS,
      service1ButtonColor: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE1_BUTTON,
      service2TitleColor: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE2_TITLE,
      service2ItemsColor: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE2_ITEMS,
      service2ButtonColor: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE2_BUTTON,
      service3TitleColor: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE3_TITLE,
      service3ItemsColor: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE3_ITEMS,
      service3ButtonColor: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE3_BUTTON,
      service4TitleColor: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE4_TITLE,
      service4ItemsColor: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE4_ITEMS,
      service4ButtonColor: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE4_BUTTON,
      service5TitleColor: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE5_TITLE,
      service5ItemsColor: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE5_ITEMS,
      service5ButtonColor: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE5_BUTTON,
      service6TitleColor: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE6_TITLE,
      service6ItemsColor: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE6_ITEMS,
      service6ButtonColor: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE6_BUTTON,
      service7TitleColor: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE7_TITLE,
      service7ItemsColor: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE7_ITEMS,
      service7ButtonColor: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE7_BUTTON,
      service8TitleColor: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE8_TITLE,
      service8ItemsColor: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE8_ITEMS,
      service8ButtonColor: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE8_BUTTON,
      service9TitleColor: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE9_TITLE,
      service9ItemsColor: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE9_ITEMS,
      service9ButtonColor: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE9_BUTTON,
      sectionTitleFontFamily: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SECTION_TITLE,
      service1TitleFontFamily: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE1_TITLE,
      service1ItemsFontFamily: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE1_ITEMS,
      service1ButtonFontFamily: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE1_BUTTON,
      service2TitleFontFamily: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE2_TITLE,
      service2ItemsFontFamily: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE2_ITEMS,
      service2ButtonFontFamily: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE2_BUTTON,
      service3TitleFontFamily: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE3_TITLE,
      service3ItemsFontFamily: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE3_ITEMS,
      service3ButtonFontFamily: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE3_BUTTON,
      service4TitleFontFamily: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE4_TITLE,
      service4ItemsFontFamily: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE4_ITEMS,
      service4ButtonFontFamily: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE4_BUTTON,
      service5TitleFontFamily: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE5_TITLE,
      service5ItemsFontFamily: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE5_ITEMS,
      service5ButtonFontFamily: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE5_BUTTON,
      service6TitleFontFamily: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE6_TITLE,
      service6ItemsFontFamily: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE6_ITEMS,
      service6ButtonFontFamily: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE6_BUTTON,
      service7TitleFontFamily: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE7_TITLE,
      service7ItemsFontFamily: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE7_ITEMS,
      service7ButtonFontFamily: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE7_BUTTON,
      service8TitleFontFamily: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE8_TITLE,
      service8ItemsFontFamily: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE8_ITEMS,
      service8ButtonFontFamily: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE8_BUTTON,
      service9TitleFontFamily: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE9_TITLE,
      service9ItemsFontFamily: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE9_ITEMS,
      service9ButtonFontFamily: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE9_BUTTON,
      backgroundColor: HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.BACKGROUND
    };
  }

  /**
   * Save configuration to API
   */
  saveConfig(config: SimpleServicesConfig): Observable<any> {
    const configUrl = 'http://localhost:5208/api/HomeServices';
    const apiConfig = this.mapSimpleConfigToApiConfig(config);
    
    console.log('💾 Saving services config to API:', configUrl, apiConfig);
    
    return this.http.post(configUrl, apiConfig, this.httpOptions)
      .pipe(
        map((response: any) => {
          console.log('✅ Services config saved successfully to API:', response);
          return response;
        }),
        catchError(error => {
          console.error('❌ Failed to save services config to API:', error);
          // Fallback to localStorage
          this.saveToLocalStorage(config);
          return throwError(() => error);
        })
      );
  }

  /**
   * Map SimpleServicesConfig to API format
   */
  private mapSimpleConfigToApiConfig(config: SimpleServicesConfig): any {
    return {
      id: 'home-services',
      sectionTitle: config.sectionTitle,
      service1Title: config.service1Title,
      service1Items: config.service1Items,
      service1ButtonText: config.service1ButtonText,
      service2Title: config.service2Title,
      service2Items: config.service2Items,
      service2ButtonText: config.service2ButtonText,
      service3Title: config.service3Title,
      service3Items: config.service3Items,
      service3ButtonText: config.service3ButtonText,
      service4Title: config.service4Title,
      service4Items: config.service4Items,
      service4ButtonText: config.service4ButtonText,
      service5Title: config.service5Title,
      service5Items: config.service5Items,
      service5ButtonText: config.service5ButtonText,
      service6Title: config.service6Title,
      service6Items: config.service6Items,
      service6ButtonText: config.service6ButtonText,
      service7Title: config.service7Title,
      service7Items: config.service7Items,
      service7ButtonText: config.service7ButtonText,
      service8Title: config.service8Title,
      service8Items: config.service8Items,
      service8ButtonText: config.service8ButtonText,
      service9Title: config.service9Title,
      service9Items: config.service9Items,
      service9ButtonText: config.service9ButtonText,
      sectionTitleColor: config.sectionTitleColor,
      service1TitleColor: config.service1TitleColor,
      service1ItemsColor: config.service1ItemsColor,
      service1ButtonColor: config.service1ButtonColor,
      service2TitleColor: config.service2TitleColor,
      service2ItemsColor: config.service2ItemsColor,
      service2ButtonColor: config.service2ButtonColor,
      service3TitleColor: config.service3TitleColor,
      service3ItemsColor: config.service3ItemsColor,
      service3ButtonColor: config.service3ButtonColor,
      service4TitleColor: config.service4TitleColor,
      service4ItemsColor: config.service4ItemsColor,
      service4ButtonColor: config.service4ButtonColor,
      service5TitleColor: config.service5TitleColor,
      service5ItemsColor: config.service5ItemsColor,
      service5ButtonColor: config.service5ButtonColor,
      service6TitleColor: config.service6TitleColor,
      service6ItemsColor: config.service6ItemsColor,
      service6ButtonColor: config.service6ButtonColor,
      service7TitleColor: config.service7TitleColor,
      service7ItemsColor: config.service7ItemsColor,
      service7ButtonColor: config.service7ButtonColor,
      service8TitleColor: config.service8TitleColor,
      service8ItemsColor: config.service8ItemsColor,
      service8ButtonColor: config.service8ButtonColor,
      service9TitleColor: config.service9TitleColor,
      service9ItemsColor: config.service9ItemsColor,
      service9ButtonColor: config.service9ButtonColor,
      backgroundColor: config.backgroundColor,
      sectionTitleFontFamily: config.sectionTitleFontFamily,
      service1TitleFontFamily: config.service1TitleFontFamily,
      service1ItemsFontFamily: config.service1ItemsFontFamily,
      service1ButtonFontFamily: config.service1ButtonFontFamily,
      service2TitleFontFamily: config.service2TitleFontFamily,
      service2ItemsFontFamily: config.service2ItemsFontFamily,
      service2ButtonFontFamily: config.service2ButtonFontFamily,
      service3TitleFontFamily: config.service3TitleFontFamily,
      service3ItemsFontFamily: config.service3ItemsFontFamily,
      service3ButtonFontFamily: config.service3ButtonFontFamily,
      service4TitleFontFamily: config.service4TitleFontFamily,
      service4ItemsFontFamily: config.service4ItemsFontFamily,
      service4ButtonFontFamily: config.service4ButtonFontFamily,
      service5TitleFontFamily: config.service5TitleFontFamily,
      service5ItemsFontFamily: config.service5ItemsFontFamily,
      service5ButtonFontFamily: config.service5ButtonFontFamily,
      service6TitleFontFamily: config.service6TitleFontFamily,
      service6ItemsFontFamily: config.service6ItemsFontFamily,
      service6ButtonFontFamily: config.service6ButtonFontFamily,
      service7TitleFontFamily: config.service7TitleFontFamily,
      service7ItemsFontFamily: config.service7ItemsFontFamily,
      service7ButtonFontFamily: config.service7ButtonFontFamily,
      service8TitleFontFamily: config.service8TitleFontFamily,
      service8ItemsFontFamily: config.service8ItemsFontFamily,
      service8ButtonFontFamily: config.service8ButtonFontFamily,
      service9TitleFontFamily: config.service9TitleFontFamily,
      service9ItemsFontFamily: config.service9ItemsFontFamily,
      service9ButtonFontFamily: config.service9ButtonFontFamily
    };
  }

  /**
   * Save configuration to localStorage as fallback
   */
  private saveToLocalStorage(config: SimpleServicesConfig): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('dentrizServicesSectionConfig', JSON.stringify(config));
        console.log('✅ Services config saved to localStorage');
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
