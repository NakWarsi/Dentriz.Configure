import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { GALLERY_CONTENT_CONSTANTS } from '../constants/gallery-content.constants';
import { ApiConfigService } from '../../core/services/api-config.service';

export interface GallerySection {
  id: string;
  title: string;
  description: string;
  route: string;
  color: string;
  imageCount: number;
}

export interface SimpleGalleryContentConfig {
  // Gallery Content Section
  gallerySections: GallerySection[];

  // Styling
  cardTitleColor: string;
  cardDescriptionColor: string;
  placeholderTextColor: string;
  imageCountColor: string;
  backgroundColor: string;
  cardBackgroundColor: string;

  cardTitleFontFamily: string;
  cardDescriptionFontFamily: string;
  placeholderTextFontFamily: string;
  imageCountFontFamily: string;
}

@Injectable({
  providedIn: 'root'
})
export class GalleryContentApiService {
  private get configUrl(): string {
    return this.apiConfig.getEndpointUrl('GalleryContent');
  }
  private localStorageKey = 'galleryContentConfig';
  private JSON_FILE_PATH = './assets/smile-gallery/gallery-content.json';

  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService
  ) { }

  loadConfig(): Observable<SimpleGalleryContentConfig> {
    // Try to load from local storage first
    const localConfig = this.loadConfigFromLocalStorage();
    if (localConfig) {
      return of(localConfig);
    }

    // Try to load from API
    console.log('Loading gallery content config from API:', this.configUrl);
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

  saveConfig(config: SimpleGalleryContentConfig): Observable<any> {
    this.saveConfigToLocalStorage(config);
    const apiConfig = this.mapSimpleConfigToApiConfig(config);
    
    console.log('Saving gallery content config to API:', apiConfig);
    
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

  private loadConfigFromLocalStorage(): SimpleGalleryContentConfig | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      const configString = localStorage.getItem(this.localStorageKey);
      return configString ? JSON.parse(configString) : null;
    }
    return null;
  }

  private saveConfigToLocalStorage(config: SimpleGalleryContentConfig): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(config));
    }
  }

  private loadConfigFromJsonOrDefaults(): Observable<SimpleGalleryContentConfig> {
    return this.http.get(this.JSON_FILE_PATH).pipe(
      map((jsonConfig: any) => this.mapToSimpleConfig(jsonConfig)),
      catchError(error => {
        console.error('Error loading config from JSON, falling back to default constants:', error);
        return of(this.getDefaultConfig());
      })
    );
  }

  private mapToSimpleConfig(jsonConfig: any): SimpleGalleryContentConfig {
    return {
      // Gallery Content Section
      gallerySections: jsonConfig.gallerySections || GALLERY_CONTENT_CONSTANTS.DEFAULT_GALLERY_SECTIONS,

      // Styling
      cardTitleColor: jsonConfig.cardTitleColor || GALLERY_CONTENT_CONSTANTS.DEFAULT_COLORS.CARD_TITLE,
      cardDescriptionColor: jsonConfig.cardDescriptionColor || GALLERY_CONTENT_CONSTANTS.DEFAULT_COLORS.CARD_DESCRIPTION,
      placeholderTextColor: jsonConfig.placeholderTextColor || GALLERY_CONTENT_CONSTANTS.DEFAULT_COLORS.PLACEHOLDER_TEXT,
      imageCountColor: jsonConfig.imageCountColor || GALLERY_CONTENT_CONSTANTS.DEFAULT_COLORS.IMAGE_COUNT,
      backgroundColor: jsonConfig.backgroundColor || GALLERY_CONTENT_CONSTANTS.DEFAULT_COLORS.BACKGROUND,
      cardBackgroundColor: jsonConfig.cardBackgroundColor || GALLERY_CONTENT_CONSTANTS.DEFAULT_COLORS.CARD_BACKGROUND,

      cardTitleFontFamily: jsonConfig.cardTitleFontFamily || GALLERY_CONTENT_CONSTANTS.DEFAULT_FONTS.CARD_TITLE,
      cardDescriptionFontFamily: jsonConfig.cardDescriptionFontFamily || GALLERY_CONTENT_CONSTANTS.DEFAULT_FONTS.CARD_DESCRIPTION,
      placeholderTextFontFamily: jsonConfig.placeholderTextFontFamily || GALLERY_CONTENT_CONSTANTS.DEFAULT_FONTS.PLACEHOLDER_TEXT,
      imageCountFontFamily: jsonConfig.imageCountFontFamily || GALLERY_CONTENT_CONSTANTS.DEFAULT_FONTS.IMAGE_COUNT
    };
  }

  private getDefaultConfig(): SimpleGalleryContentConfig {
    return this.mapToSimpleConfig({});
  }

  private mapApiConfigToSimpleConfig(apiConfig: any): SimpleGalleryContentConfig {
    return {
      // Gallery Content Section
      gallerySections: apiConfig.gallerySections || GALLERY_CONTENT_CONSTANTS.DEFAULT_GALLERY_SECTIONS,

      // Styling
      cardTitleColor: apiConfig.cardTitleColor || GALLERY_CONTENT_CONSTANTS.DEFAULT_COLORS.CARD_TITLE,
      cardDescriptionColor: apiConfig.cardDescriptionColor || GALLERY_CONTENT_CONSTANTS.DEFAULT_COLORS.CARD_DESCRIPTION,
      placeholderTextColor: apiConfig.placeholderTextColor || GALLERY_CONTENT_CONSTANTS.DEFAULT_COLORS.PLACEHOLDER_TEXT,
      imageCountColor: apiConfig.imageCountColor || GALLERY_CONTENT_CONSTANTS.DEFAULT_COLORS.IMAGE_COUNT,
      backgroundColor: apiConfig.backgroundColor || GALLERY_CONTENT_CONSTANTS.DEFAULT_COLORS.BACKGROUND,
      cardBackgroundColor: apiConfig.cardBackgroundColor || GALLERY_CONTENT_CONSTANTS.DEFAULT_COLORS.CARD_BACKGROUND,

      cardTitleFontFamily: apiConfig.cardTitleFontFamily || GALLERY_CONTENT_CONSTANTS.DEFAULT_FONTS.CARD_TITLE,
      cardDescriptionFontFamily: apiConfig.cardDescriptionFontFamily || GALLERY_CONTENT_CONSTANTS.DEFAULT_FONTS.CARD_DESCRIPTION,
      placeholderTextFontFamily: apiConfig.placeholderTextFontFamily || GALLERY_CONTENT_CONSTANTS.DEFAULT_FONTS.PLACEHOLDER_TEXT,
      imageCountFontFamily: apiConfig.imageCountFontFamily || GALLERY_CONTENT_CONSTANTS.DEFAULT_FONTS.IMAGE_COUNT
    };
  }

  private mapSimpleConfigToApiConfig(simpleConfig: SimpleGalleryContentConfig): any {
    return {
      id: 'gallery-content',
      gallerySections: simpleConfig.gallerySections,
      cardTitleColor: simpleConfig.cardTitleColor,
      cardDescriptionColor: simpleConfig.cardDescriptionColor,
      placeholderTextColor: simpleConfig.placeholderTextColor,
      imageCountColor: simpleConfig.imageCountColor,
      backgroundColor: simpleConfig.backgroundColor,
      cardBackgroundColor: simpleConfig.cardBackgroundColor,
      cardTitleFontFamily: simpleConfig.cardTitleFontFamily,
      cardDescriptionFontFamily: simpleConfig.cardDescriptionFontFamily,
      placeholderTextFontFamily: simpleConfig.placeholderTextFontFamily,
      imageCountFontFamily: simpleConfig.imageCountFontFamily,
      lastUpdated: new Date().toISOString(),
      version: '1.0'
    };
  }
}
