import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HOME_NEW_PATIENT_SECTION_CONSTANTS } from '../constants/home-new-patient-section.constants';

export interface SimpleNewPatientConfig {
  mainTitle: string;
  addressTitle: string;
  addressContent: string;
  parkingTitle: string;
  parkingContent: string;
  transitTitle: string;
  transitContent: string;
  metroTitle: string;
  metroContent: string;
  accessibilityTitle: string;
  accessibilityContent: string;
  hoursTitle: string;
  hoursContent: string;
  safetyTitle: string;
  safetyContent: string;
  buttonText: string;
  mapTitle: string;
  locationText: string;
  hoursText: string;
  directionsText: string;
  
  // Individual color options for each element
  mainTitleColor: string;
  addressTitleColor: string;
  addressContentColor: string;
  parkingTitleColor: string;
  parkingContentColor: string;
  transitTitleColor: string;
  transitContentColor: string;
  metroTitleColor: string;
  metroContentColor: string;
  accessibilityTitleColor: string;
  accessibilityContentColor: string;
  hoursTitleColor: string;
  hoursContentColor: string;
  safetyTitleColor: string;
  safetyContentColor: string;
  buttonTextColor: string;
  mapTitleColor: string;
  locationTextColor: string;
  hoursTextColor: string;
  directionsTextColor: string;
  
  // Individual font family options for each element
  mainTitleFontFamily: string;
  addressTitleFontFamily: string;
  addressContentFontFamily: string;
  parkingTitleFontFamily: string;
  parkingContentFontFamily: string;
  transitTitleFontFamily: string;
  transitContentFontFamily: string;
  metroTitleFontFamily: string;
  metroContentFontFamily: string;
  accessibilityTitleFontFamily: string;
  accessibilityContentFontFamily: string;
  hoursTitleFontFamily: string;
  hoursContentFontFamily: string;
  safetyTitleFontFamily: string;
  safetyContentFontFamily: string;
  buttonTextFontFamily: string;
  mapTitleFontFamily: string;
  locationTextFontFamily: string;
  hoursTextFontFamily: string;
  directionsTextFontFamily: string;
  
  // Global styling options
  backgroundColor: string;
}

@Injectable({
  providedIn: 'root'
})
export class NewPatientSectionApiService {
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
  loadConfig(): Observable<SimpleNewPatientConfig> {
    const configUrl = 'http://localhost:5208/api/HomeNewPatient';
    
    console.log('📥 Loading new patient config from API:', configUrl);
    
    return this.http.get<any>(configUrl, this.httpOptions)
      .pipe(
        map((data: any) => {
          console.log('✅ New patient config loaded successfully from API:', data);
          return this.mapApiConfigToSimpleConfig(data);
        }),
        catchError(error => {
          console.warn('⚠️ API failed, falling back to JSON file:', error);
          return this.loadFromJsonFile();
        })
      );
  }

  /**
   * Load configuration from JSON file as fallback
   */
  private loadFromJsonFile(): Observable<SimpleNewPatientConfig> {
    const configUrl = './home-new-patient-section.json';
    
    console.log('📥 Loading new patient config from JSON file:', configUrl);
    
    return this.http.get<any>(configUrl, this.httpOptions)
      .pipe(
        map((data: any) => {
          console.log('✅ New patient config loaded successfully from JSON:', data);
          return this.mapApiConfigToSimpleConfig(data);
        }),
        catchError(error => {
          console.error(`❌ Failed to load new patient config from JSON:`, error);
          return this.loadFromLocalStorage();
        })
      );
  }

  /**
   * Load configuration from localStorage as final fallback
   */
  private loadFromLocalStorage(): Observable<SimpleNewPatientConfig> {
    console.log('📥 Loading new patient config from localStorage');
    
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const savedConfig = localStorage.getItem('dentrizNewPatientSectionConfig');
        if (savedConfig) {
          const data = JSON.parse(savedConfig);
          console.log('✅ New patient config loaded from localStorage:', data);
          return of(this.mapApiConfigToSimpleConfig(data));
        }
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
    
    // Return default config if all else fails
    console.log('📥 Using default new patient config');
    return of(this.getDefaultConfig());
  }

  /**
   * Map API config to SimpleNewPatientConfig format
   */
  private mapApiConfigToSimpleConfig(data: any): SimpleNewPatientConfig {
    return {
      mainTitle: data.mainTitle || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_MAIN_TITLE,
      addressTitle: data.addressTitle || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_ADDRESS_TITLE,
      addressContent: data.addressContent || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_ADDRESS_CONTENT,
      parkingTitle: data.parkingTitle || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_PARKING_TITLE,
      parkingContent: data.parkingContent || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_PARKING_CONTENT,
      transitTitle: data.transitTitle || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_TRANSIT_TITLE,
      transitContent: data.transitContent || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_TRANSIT_CONTENT,
      metroTitle: data.metroTitle || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_METRO_TITLE,
      metroContent: data.metroContent || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_METRO_CONTENT,
      accessibilityTitle: data.accessibilityTitle || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_ACCESSIBILITY_TITLE,
      accessibilityContent: data.accessibilityContent || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_ACCESSIBILITY_CONTENT,
      hoursTitle: data.hoursTitle || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_HOURS_TITLE,
      hoursContent: data.hoursContent || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_HOURS_CONTENT,
      safetyTitle: data.safetyTitle || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_SAFETY_TITLE,
      safetyContent: data.safetyContent || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_SAFETY_CONTENT,
      buttonText: data.buttonText || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_BUTTON_TEXT,
      mapTitle: data.mapTitle || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_MAP_TITLE,
      locationText: data.locationText || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_LOCATION_TEXT,
      hoursText: data.hoursText || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_HOURS_TEXT,
      directionsText: data.directionsText || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_DIRECTIONS_TEXT,
      
      // Individual color options with defaults from constants
      mainTitleColor: data.mainTitleColor || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.MAIN_TITLE,
      addressTitleColor: data.addressTitleColor || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.ADDRESS_TITLE,
      addressContentColor: data.addressContentColor || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.ADDRESS_CONTENT,
      parkingTitleColor: data.parkingTitleColor || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.PARKING_TITLE,
      parkingContentColor: data.parkingContentColor || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.PARKING_CONTENT,
      transitTitleColor: data.transitTitleColor || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.TRANSIT_TITLE,
      transitContentColor: data.transitContentColor || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.TRANSIT_CONTENT,
      metroTitleColor: data.metroTitleColor || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.METRO_TITLE,
      metroContentColor: data.metroContentColor || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.METRO_CONTENT,
      accessibilityTitleColor: data.accessibilityTitleColor || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.ACCESSIBILITY_TITLE,
      accessibilityContentColor: data.accessibilityContentColor || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.ACCESSIBILITY_CONTENT,
      hoursTitleColor: data.hoursTitleColor || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.HOURS_TITLE,
      hoursContentColor: data.hoursContentColor || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.HOURS_CONTENT,
      safetyTitleColor: data.safetyTitleColor || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.SAFETY_TITLE,
      safetyContentColor: data.safetyContentColor || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.SAFETY_CONTENT,
      buttonTextColor: data.buttonTextColor || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.BUTTON_TEXT,
      mapTitleColor: data.mapTitleColor || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.MAP_TITLE,
      locationTextColor: data.locationTextColor || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.LOCATION_TEXT,
      hoursTextColor: data.hoursTextColor || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.HOURS_TEXT,
      directionsTextColor: data.directionsTextColor || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.DIRECTIONS_TEXT,
      
      // Individual font family options with defaults from constants
      mainTitleFontFamily: data.mainTitleFontFamily || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.MAIN_TITLE,
      addressTitleFontFamily: data.addressTitleFontFamily || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.ADDRESS_TITLE,
      addressContentFontFamily: data.addressContentFontFamily || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.ADDRESS_CONTENT,
      parkingTitleFontFamily: data.parkingTitleFontFamily || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.PARKING_TITLE,
      parkingContentFontFamily: data.parkingContentFontFamily || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.PARKING_CONTENT,
      transitTitleFontFamily: data.transitTitleFontFamily || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.TRANSIT_TITLE,
      transitContentFontFamily: data.transitContentFontFamily || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.TRANSIT_CONTENT,
      metroTitleFontFamily: data.metroTitleFontFamily || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.METRO_TITLE,
      metroContentFontFamily: data.metroContentFontFamily || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.METRO_CONTENT,
      accessibilityTitleFontFamily: data.accessibilityTitleFontFamily || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.ACCESSIBILITY_TITLE,
      accessibilityContentFontFamily: data.accessibilityContentFontFamily || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.ACCESSIBILITY_CONTENT,
      hoursTitleFontFamily: data.hoursTitleFontFamily || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.HOURS_TITLE,
      hoursContentFontFamily: data.hoursContentFontFamily || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.HOURS_CONTENT,
      safetyTitleFontFamily: data.safetyTitleFontFamily || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.SAFETY_TITLE,
      safetyContentFontFamily: data.safetyContentFontFamily || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.SAFETY_CONTENT,
      buttonTextFontFamily: data.buttonTextFontFamily || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.BUTTON_TEXT,
      mapTitleFontFamily: data.mapTitleFontFamily || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.MAP_TITLE,
      locationTextFontFamily: data.locationTextFontFamily || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.LOCATION_TEXT,
      hoursTextFontFamily: data.hoursTextFontFamily || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.HOURS_TEXT,
      directionsTextFontFamily: data.directionsTextFontFamily || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.DIRECTIONS_TEXT,
      
      // Global styling options with defaults from constants
      backgroundColor: data.backgroundColor || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.BACKGROUND
    };
  }

  /**
   * Get default configuration
   */
  private getDefaultConfig(): SimpleNewPatientConfig {
    return {
      mainTitle: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_MAIN_TITLE,
      addressTitle: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_ADDRESS_TITLE,
      addressContent: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_ADDRESS_CONTENT,
      parkingTitle: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_PARKING_TITLE,
      parkingContent: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_PARKING_CONTENT,
      transitTitle: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_TRANSIT_TITLE,
      transitContent: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_TRANSIT_CONTENT,
      metroTitle: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_METRO_TITLE,
      metroContent: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_METRO_CONTENT,
      accessibilityTitle: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_ACCESSIBILITY_TITLE,
      accessibilityContent: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_ACCESSIBILITY_CONTENT,
      hoursTitle: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_HOURS_TITLE,
      hoursContent: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_HOURS_CONTENT,
      safetyTitle: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_SAFETY_TITLE,
      safetyContent: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_SAFETY_CONTENT,
      buttonText: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_BUTTON_TEXT,
      mapTitle: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_MAP_TITLE,
      locationText: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_LOCATION_TEXT,
      hoursText: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_HOURS_TEXT,
      directionsText: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_DIRECTIONS_TEXT,
      mainTitleColor: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.MAIN_TITLE,
      addressTitleColor: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.ADDRESS_TITLE,
      addressContentColor: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.ADDRESS_CONTENT,
      parkingTitleColor: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.PARKING_TITLE,
      parkingContentColor: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.PARKING_CONTENT,
      transitTitleColor: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.TRANSIT_TITLE,
      transitContentColor: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.TRANSIT_CONTENT,
      metroTitleColor: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.METRO_TITLE,
      metroContentColor: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.METRO_CONTENT,
      accessibilityTitleColor: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.ACCESSIBILITY_TITLE,
      accessibilityContentColor: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.ACCESSIBILITY_CONTENT,
      hoursTitleColor: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.HOURS_TITLE,
      hoursContentColor: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.HOURS_CONTENT,
      safetyTitleColor: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.SAFETY_TITLE,
      safetyContentColor: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.SAFETY_CONTENT,
      buttonTextColor: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.BUTTON_TEXT,
      mapTitleColor: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.MAP_TITLE,
      locationTextColor: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.LOCATION_TEXT,
      hoursTextColor: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.HOURS_TEXT,
      directionsTextColor: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.DIRECTIONS_TEXT,
      mainTitleFontFamily: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.MAIN_TITLE,
      addressTitleFontFamily: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.ADDRESS_TITLE,
      addressContentFontFamily: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.ADDRESS_CONTENT,
      parkingTitleFontFamily: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.PARKING_TITLE,
      parkingContentFontFamily: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.PARKING_CONTENT,
      transitTitleFontFamily: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.TRANSIT_TITLE,
      transitContentFontFamily: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.TRANSIT_CONTENT,
      metroTitleFontFamily: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.METRO_TITLE,
      metroContentFontFamily: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.METRO_CONTENT,
      accessibilityTitleFontFamily: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.ACCESSIBILITY_TITLE,
      accessibilityContentFontFamily: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.ACCESSIBILITY_CONTENT,
      hoursTitleFontFamily: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.HOURS_TITLE,
      hoursContentFontFamily: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.HOURS_CONTENT,
      safetyTitleFontFamily: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.SAFETY_TITLE,
      safetyContentFontFamily: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.SAFETY_CONTENT,
      buttonTextFontFamily: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.BUTTON_TEXT,
      mapTitleFontFamily: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.MAP_TITLE,
      locationTextFontFamily: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.LOCATION_TEXT,
      hoursTextFontFamily: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.HOURS_TEXT,
      directionsTextFontFamily: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.DIRECTIONS_TEXT,
      backgroundColor: HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.BACKGROUND
    };
  }

  /**
   * Save configuration to API
   */
  saveConfig(config: SimpleNewPatientConfig): Observable<any> {
    const configUrl = 'http://localhost:5208/api/HomeNewPatient';
    const apiConfig = this.mapSimpleConfigToApiConfig(config);
    
    console.log('💾 Saving new patient config to API:', configUrl, apiConfig);
    
    return this.http.post(configUrl, apiConfig, this.httpOptions)
      .pipe(
        map((response: any) => {
          console.log('✅ New patient config saved successfully to API:', response);
          return response;
        }),
        catchError(error => {
          console.error('❌ Failed to save new patient config to API:', error);
          // Fallback to localStorage
          this.saveToLocalStorage(config);
          return throwError(() => error);
        })
      );
  }

  /**
   * Map SimpleNewPatientConfig to API format
   */
  private mapSimpleConfigToApiConfig(config: SimpleNewPatientConfig): any {
    return {
      id: 'home-new-patient',
      mainTitle: config.mainTitle,
      addressTitle: config.addressTitle,
      addressContent: config.addressContent,
      parkingTitle: config.parkingTitle,
      parkingContent: config.parkingContent,
      transitTitle: config.transitTitle,
      transitContent: config.transitContent,
      metroTitle: config.metroTitle,
      metroContent: config.metroContent,
      accessibilityTitle: config.accessibilityTitle,
      accessibilityContent: config.accessibilityContent,
      hoursTitle: config.hoursTitle,
      hoursContent: config.hoursContent,
      safetyTitle: config.safetyTitle,
      safetyContent: config.safetyContent,
      buttonText: config.buttonText,
      mapTitle: config.mapTitle,
      locationText: config.locationText,
      hoursText: config.hoursText,
      directionsText: config.directionsText,
      mainTitleColor: config.mainTitleColor,
      addressTitleColor: config.addressTitleColor,
      addressContentColor: config.addressContentColor,
      parkingTitleColor: config.parkingTitleColor,
      parkingContentColor: config.parkingContentColor,
      transitTitleColor: config.transitTitleColor,
      transitContentColor: config.transitContentColor,
      metroTitleColor: config.metroTitleColor,
      metroContentColor: config.metroContentColor,
      accessibilityTitleColor: config.accessibilityTitleColor,
      accessibilityContentColor: config.accessibilityContentColor,
      hoursTitleColor: config.hoursTitleColor,
      hoursContentColor: config.hoursContentColor,
      safetyTitleColor: config.safetyTitleColor,
      safetyContentColor: config.safetyContentColor,
      buttonTextColor: config.buttonTextColor,
      mapTitleColor: config.mapTitleColor,
      locationTextColor: config.locationTextColor,
      hoursTextColor: config.hoursTextColor,
      directionsTextColor: config.directionsTextColor,
      backgroundColor: config.backgroundColor,
      mainTitleFontFamily: config.mainTitleFontFamily,
      addressTitleFontFamily: config.addressTitleFontFamily,
      addressContentFontFamily: config.addressContentFontFamily,
      parkingTitleFontFamily: config.parkingTitleFontFamily,
      parkingContentFontFamily: config.parkingContentFontFamily,
      transitTitleFontFamily: config.transitTitleFontFamily,
      transitContentFontFamily: config.transitContentFontFamily,
      metroTitleFontFamily: config.metroTitleFontFamily,
      metroContentFontFamily: config.metroContentFontFamily,
      accessibilityTitleFontFamily: config.accessibilityTitleFontFamily,
      accessibilityContentFontFamily: config.accessibilityContentFontFamily,
      hoursTitleFontFamily: config.hoursTitleFontFamily,
      hoursContentFontFamily: config.hoursContentFontFamily,
      safetyTitleFontFamily: config.safetyTitleFontFamily,
      safetyContentFontFamily: config.safetyContentFontFamily,
      buttonTextFontFamily: config.buttonTextFontFamily,
      mapTitleFontFamily: config.mapTitleFontFamily,
      locationTextFontFamily: config.locationTextFontFamily,
      hoursTextFontFamily: config.hoursTextFontFamily,
      directionsTextFontFamily: config.directionsTextFontFamily
    };
  }

  /**
   * Save configuration to localStorage as fallback
   */
  private saveToLocalStorage(config: SimpleNewPatientConfig): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('dentrizNewPatientSectionConfig', JSON.stringify(config));
        console.log('✅ New patient config saved to localStorage');
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
