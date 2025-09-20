import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { GALLERY_HERO_CONSTANTS } from '../constants/gallery-hero.constants';
import { ApiConfigService } from '../../core/services/api-config.service';

export interface SimpleGalleryHeroConfig {
  // Gallery Hero Section
  galleryTitle: string;
  gallerySubtitle: string;

  // Styling
  galleryTitleColor: string;
  gallerySubtitleColor: string;
  backgroundColor: string;

  galleryTitleFontFamily: string;
  gallerySubtitleFontFamily: string;
}

@Injectable({
  providedIn: 'root'
})
export class GalleryHeroApiService {
  private get configUrl(): string {
    return this.apiConfig.getEndpointUrl('GalleryHero');
  }
  private localStorageKey = 'galleryHeroConfig';
  private JSON_FILE_PATH = './assets/smile-gallery/gallery-hero.json';

  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService
  ) { }

  loadConfig(): Observable<SimpleGalleryHeroConfig> {
    // Try to load from local storage first
    const localConfig = this.loadConfigFromLocalStorage();
    if (localConfig) {
      return of(localConfig);
    }

    // Try to load from API
    console.log('Loading gallery hero config from API');
    return this.http.get(this.configUrl).pipe(
      map((apiConfig: any) => this.mapApiConfigToSimpleConfig(apiConfig)),
      tap(config => this.saveConfigToLocalStorage(config)),
      catchError(error => {
        console.error('Error loading config from API, falling back to default constants:', error);
        const defaultConfig = this.getDefaultConfig();
        this.saveConfigToLocalStorage(defaultConfig);
        return of(defaultConfig);
      })
    );
  }

  saveConfig(config: SimpleGalleryHeroConfig): Observable<any> {
    this.saveConfigToLocalStorage(config);
    const apiConfig = this.mapSimpleConfigToApiConfig(config);
    
    console.log('Saving gallery hero config to API:', apiConfig);
    
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

  private loadConfigFromLocalStorage(): SimpleGalleryHeroConfig | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      const configString = localStorage.getItem(this.localStorageKey);
      return configString ? JSON.parse(configString) : null;
    }
    return null;
  }

  private saveConfigToLocalStorage(config: SimpleGalleryHeroConfig): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(config));
    }
  }

  private loadConfigFromJsonOrDefaults(): Observable<SimpleGalleryHeroConfig> {
    return this.http.get(this.JSON_FILE_PATH).pipe(
      map((jsonConfig: any) => this.mapToSimpleConfig(jsonConfig)),
      catchError(error => {
        console.error('Error loading config from JSON, falling back to default constants:', error);
        return of(this.getDefaultConfig());
      })
    );
  }

  private mapToSimpleConfig(jsonConfig: any): SimpleGalleryHeroConfig {
    return {
      // Gallery Hero Section
      galleryTitle: jsonConfig.galleryTitle || GALLERY_HERO_CONSTANTS.DEFAULT_GALLERY_TITLE,
      gallerySubtitle: jsonConfig.gallerySubtitle || GALLERY_HERO_CONSTANTS.DEFAULT_GALLERY_SUBTITLE,

      // Styling
      galleryTitleColor: jsonConfig.galleryTitleColor || GALLERY_HERO_CONSTANTS.DEFAULT_COLORS.GALLERY_TITLE,
      gallerySubtitleColor: jsonConfig.gallerySubtitleColor || GALLERY_HERO_CONSTANTS.DEFAULT_COLORS.GALLERY_SUBTITLE,
      backgroundColor: jsonConfig.backgroundColor || GALLERY_HERO_CONSTANTS.DEFAULT_COLORS.BACKGROUND,

      galleryTitleFontFamily: jsonConfig.galleryTitleFontFamily || GALLERY_HERO_CONSTANTS.DEFAULT_FONTS.GALLERY_TITLE,
      gallerySubtitleFontFamily: jsonConfig.gallerySubtitleFontFamily || GALLERY_HERO_CONSTANTS.DEFAULT_FONTS.GALLERY_SUBTITLE
    };
  }

  private getDefaultConfig(): SimpleGalleryHeroConfig {
    return this.mapToSimpleConfig({});
  }

  private mapApiConfigToSimpleConfig(apiConfig: any): SimpleGalleryHeroConfig {
    return {
      // Gallery Hero Section
      galleryTitle: apiConfig.galleryTitle || GALLERY_HERO_CONSTANTS.DEFAULT_GALLERY_TITLE,
      gallerySubtitle: apiConfig.gallerySubtitle || GALLERY_HERO_CONSTANTS.DEFAULT_GALLERY_SUBTITLE,

      // Styling
      galleryTitleColor: apiConfig.galleryTitleColor || GALLERY_HERO_CONSTANTS.DEFAULT_COLORS.GALLERY_TITLE,
      gallerySubtitleColor: apiConfig.gallerySubtitleColor || GALLERY_HERO_CONSTANTS.DEFAULT_COLORS.GALLERY_SUBTITLE,
      backgroundColor: apiConfig.backgroundColor || GALLERY_HERO_CONSTANTS.DEFAULT_COLORS.BACKGROUND,

      galleryTitleFontFamily: apiConfig.galleryTitleFontFamily || GALLERY_HERO_CONSTANTS.DEFAULT_FONTS.GALLERY_TITLE,
      gallerySubtitleFontFamily: apiConfig.gallerySubtitleFontFamily || GALLERY_HERO_CONSTANTS.DEFAULT_FONTS.GALLERY_SUBTITLE
    };
  }

  private mapSimpleConfigToApiConfig(simpleConfig: SimpleGalleryHeroConfig): any {
    return {
      id: 'gallery-hero',
      galleryTitle: simpleConfig.galleryTitle,
      gallerySubtitle: simpleConfig.gallerySubtitle,
      galleryTitleColor: simpleConfig.galleryTitleColor,
      gallerySubtitleColor: simpleConfig.gallerySubtitleColor,
      backgroundColor: simpleConfig.backgroundColor,
      galleryTitleFontFamily: simpleConfig.galleryTitleFontFamily,
      gallerySubtitleFontFamily: simpleConfig.gallerySubtitleFontFamily,
      lastUpdated: new Date().toISOString(),
      version: '1.0'
    };
  }
}
