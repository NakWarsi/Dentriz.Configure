import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { GALLERY_HERO_CONSTANTS } from '../constants/gallery-hero.constants';

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
  private configUrl = 'http://localhost:5000/api/config/gallery-hero';
  private localStorageKey = 'galleryHeroConfig';
  private JSON_FILE_PATH = './assets/smile-gallery/gallery-hero.json';

  constructor(private http: HttpClient) { }

  loadConfig(): Observable<SimpleGalleryHeroConfig> {
    // Try to load from local storage first
    const localConfig = this.loadConfigFromLocalStorage();
    if (localConfig) {
      return of(localConfig);
    }

    // For now, directly use constants data instead of trying API
    console.log('Loading gallery hero config from constants');
    const defaultConfig = this.getDefaultConfig();
    this.saveConfigToLocalStorage(defaultConfig);
    return of(defaultConfig);
  }

  saveConfig(config: SimpleGalleryHeroConfig): Observable<any> {
    this.saveConfigToLocalStorage(config);
    return this.http.post(this.configUrl, config).pipe(
      catchError(error => {
        console.error('Error saving config to API, local storage updated:', error);
        alert('Configuration saved locally, but failed to save to server. Please check the API.');
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
}
