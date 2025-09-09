import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { LOCATION_MAP_CONSTANTS } from '../constants/location-map.constants';

export interface SimpleLocationMapConfig {
  // Section Content
  sectionTitle: string;
  sectionDescription: string;
  
  // Location Details
  addressTitle: string;
  addressContent: string;
  parkingTitle: string;
  parkingContent: string;
  transitTitle: string;
  transitContent: string;
  metroTitle: string;
  metroContent: string;
  
  // Map Section
  mapTitle: string;
  mapEmbedUrl: string;
  mapLocation: string;
  mapHours: string;
  directionsLink: string;
  directionsText: string;

  // Styling
  sectionTitleColor: string;
  sectionDescriptionColor: string;
  detailTitleColor: string;
  detailContentColor: string;
  mapTitleColor: string;
  mapInfoColor: string;
  mapLinkColor: string;
  backgroundColor: string;

  sectionTitleFontFamily: string;
  sectionDescriptionFontFamily: string;
  detailTitleFontFamily: string;
  detailContentFontFamily: string;
  mapTitleFontFamily: string;
  mapInfoFontFamily: string;
  mapLinkFontFamily: string;
}

@Injectable({
  providedIn: 'root'
})
export class LocationMapApiService {
  private configUrl = 'http://localhost:5000/api/config/location-map';
  private localStorageKey = 'locationMapConfig';
  private JSON_FILE_PATH = './assets/contact/location-map.json';

  constructor(private http: HttpClient) { }

  loadConfig(): Observable<SimpleLocationMapConfig> {
    // Try to load from local storage first
    const localConfig = this.loadConfigFromLocalStorage();
    if (localConfig) {
      return of(localConfig);
    }

    // For now, directly use constants data instead of trying API
    console.log('Loading location map config from constants');
    const defaultConfig = this.getDefaultConfig();
    this.saveConfigToLocalStorage(defaultConfig);
    return of(defaultConfig);
  }

  saveConfig(config: SimpleLocationMapConfig): Observable<any> {
    this.saveConfigToLocalStorage(config);
    return this.http.post(this.configUrl, config).pipe(
      catchError(error => {
        console.error('Error saving config to API, local storage updated:', error);
        alert('Configuration saved locally, but failed to save to server. Please check the API.');
        return of(null);
      })
    );
  }

  private loadConfigFromLocalStorage(): SimpleLocationMapConfig | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      const configString = localStorage.getItem(this.localStorageKey);
      return configString ? JSON.parse(configString) : null;
    }
    return null;
  }

  private saveConfigToLocalStorage(config: SimpleLocationMapConfig): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(config));
    }
  }

  private loadConfigFromJsonOrDefaults(): Observable<SimpleLocationMapConfig> {
    return this.http.get(this.JSON_FILE_PATH).pipe(
      map((jsonConfig: any) => this.mapToSimpleConfig(jsonConfig)),
      catchError(error => {
        console.error('Error loading config from JSON, falling back to default constants:', error);
        return of(this.getDefaultConfig());
      })
    );
  }

  private mapToSimpleConfig(jsonConfig: any): SimpleLocationMapConfig {
    return {
      // Section Content
      sectionTitle: jsonConfig.sectionTitle || LOCATION_MAP_CONSTANTS.DEFAULT_SECTION_TITLE,
      sectionDescription: jsonConfig.sectionDescription || LOCATION_MAP_CONSTANTS.DEFAULT_SECTION_DESCRIPTION,
      
      // Location Details
      addressTitle: jsonConfig.addressTitle || LOCATION_MAP_CONSTANTS.DEFAULT_ADDRESS_TITLE,
      addressContent: jsonConfig.addressContent || LOCATION_MAP_CONSTANTS.DEFAULT_ADDRESS_CONTENT,
      parkingTitle: jsonConfig.parkingTitle || LOCATION_MAP_CONSTANTS.DEFAULT_PARKING_TITLE,
      parkingContent: jsonConfig.parkingContent || LOCATION_MAP_CONSTANTS.DEFAULT_PARKING_CONTENT,
      transitTitle: jsonConfig.transitTitle || LOCATION_MAP_CONSTANTS.DEFAULT_TRANSIT_TITLE,
      transitContent: jsonConfig.transitContent || LOCATION_MAP_CONSTANTS.DEFAULT_TRANSIT_CONTENT,
      metroTitle: jsonConfig.metroTitle || LOCATION_MAP_CONSTANTS.DEFAULT_METRO_TITLE,
      metroContent: jsonConfig.metroContent || LOCATION_MAP_CONSTANTS.DEFAULT_METRO_CONTENT,
      
      // Map Section
      mapTitle: jsonConfig.mapTitle || LOCATION_MAP_CONSTANTS.DEFAULT_MAP_TITLE,
      mapEmbedUrl: jsonConfig.mapEmbedUrl || LOCATION_MAP_CONSTANTS.DEFAULT_MAP_EMBED_URL,
      mapLocation: jsonConfig.mapLocation || LOCATION_MAP_CONSTANTS.DEFAULT_MAP_LOCATION,
      mapHours: jsonConfig.mapHours || LOCATION_MAP_CONSTANTS.DEFAULT_MAP_HOURS,
      directionsLink: jsonConfig.directionsLink || LOCATION_MAP_CONSTANTS.DEFAULT_DIRECTIONS_LINK,
      directionsText: jsonConfig.directionsText || LOCATION_MAP_CONSTANTS.DEFAULT_DIRECTIONS_TEXT,

      // Styling
      sectionTitleColor: jsonConfig.sectionTitleColor || LOCATION_MAP_CONSTANTS.DEFAULT_COLORS.SECTION_TITLE,
      sectionDescriptionColor: jsonConfig.sectionDescriptionColor || LOCATION_MAP_CONSTANTS.DEFAULT_COLORS.SECTION_DESCRIPTION,
      detailTitleColor: jsonConfig.detailTitleColor || LOCATION_MAP_CONSTANTS.DEFAULT_COLORS.DETAIL_TITLE,
      detailContentColor: jsonConfig.detailContentColor || LOCATION_MAP_CONSTANTS.DEFAULT_COLORS.DETAIL_CONTENT,
      mapTitleColor: jsonConfig.mapTitleColor || LOCATION_MAP_CONSTANTS.DEFAULT_COLORS.MAP_TITLE,
      mapInfoColor: jsonConfig.mapInfoColor || LOCATION_MAP_CONSTANTS.DEFAULT_COLORS.MAP_INFO,
      mapLinkColor: jsonConfig.mapLinkColor || LOCATION_MAP_CONSTANTS.DEFAULT_COLORS.MAP_LINK,
      backgroundColor: jsonConfig.backgroundColor || LOCATION_MAP_CONSTANTS.DEFAULT_COLORS.BACKGROUND,

      sectionTitleFontFamily: jsonConfig.sectionTitleFontFamily || LOCATION_MAP_CONSTANTS.DEFAULT_FONTS.SECTION_TITLE,
      sectionDescriptionFontFamily: jsonConfig.sectionDescriptionFontFamily || LOCATION_MAP_CONSTANTS.DEFAULT_FONTS.SECTION_DESCRIPTION,
      detailTitleFontFamily: jsonConfig.detailTitleFontFamily || LOCATION_MAP_CONSTANTS.DEFAULT_FONTS.DETAIL_TITLE,
      detailContentFontFamily: jsonConfig.detailContentFontFamily || LOCATION_MAP_CONSTANTS.DEFAULT_FONTS.DETAIL_CONTENT,
      mapTitleFontFamily: jsonConfig.mapTitleFontFamily || LOCATION_MAP_CONSTANTS.DEFAULT_FONTS.MAP_TITLE,
      mapInfoFontFamily: jsonConfig.mapInfoFontFamily || LOCATION_MAP_CONSTANTS.DEFAULT_FONTS.MAP_INFO,
      mapLinkFontFamily: jsonConfig.mapLinkFontFamily || LOCATION_MAP_CONSTANTS.DEFAULT_FONTS.MAP_LINK
    };
  }

  private getDefaultConfig(): SimpleLocationMapConfig {
    return this.mapToSimpleConfig({});
  }
}
