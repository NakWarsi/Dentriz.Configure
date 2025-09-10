import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { GALLERY_STATS_CONSTANTS } from '../constants/gallery-stats.constants';

export interface GalleryStat {
  number: string;
  label: string;
}

export interface SimpleGalleryStatsConfig {
  // Gallery Stats Section
  galleryStats: GalleryStat[];

  // Styling
  statNumberColor: string;
  statLabelColor: string;
  backgroundColor: string;

  statNumberFontFamily: string;
  statLabelFontFamily: string;
}

@Injectable({
  providedIn: 'root'
})
export class GalleryStatsApiService {
  private configUrl = 'http://localhost:5000/api/config/gallery-stats';
  private localStorageKey = 'galleryStatsConfig';
  private JSON_FILE_PATH = './assets/smile-gallery/gallery-stats.json';

  constructor(private http: HttpClient) { }

  loadConfig(): Observable<SimpleGalleryStatsConfig> {
    // Try to load from local storage first
    const localConfig = this.loadConfigFromLocalStorage();
    if (localConfig) {
      return of(localConfig);
    }

    // For now, directly use constants data instead of trying API
    console.log('Loading gallery stats config from constants');
    const defaultConfig = this.getDefaultConfig();
    this.saveConfigToLocalStorage(defaultConfig);
    return of(defaultConfig);
  }

  saveConfig(config: SimpleGalleryStatsConfig): Observable<any> {
    this.saveConfigToLocalStorage(config);
    return this.http.post(this.configUrl, config).pipe(
      catchError(error => {
        console.error('Error saving config to API, local storage updated:', error);
        alert('Configuration saved locally, but failed to save to server. Please check the API.');
        return of(null);
      })
    );
  }

  private loadConfigFromLocalStorage(): SimpleGalleryStatsConfig | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      const configString = localStorage.getItem(this.localStorageKey);
      return configString ? JSON.parse(configString) : null;
    }
    return null;
  }

  private saveConfigToLocalStorage(config: SimpleGalleryStatsConfig): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(config));
    }
  }

  private loadConfigFromJsonOrDefaults(): Observable<SimpleGalleryStatsConfig> {
    return this.http.get(this.JSON_FILE_PATH).pipe(
      map((jsonConfig: any) => this.mapToSimpleConfig(jsonConfig)),
      catchError(error => {
        console.error('Error loading config from JSON, falling back to default constants:', error);
        return of(this.getDefaultConfig());
      })
    );
  }

  private mapToSimpleConfig(jsonConfig: any): SimpleGalleryStatsConfig {
    return {
      // Gallery Stats Section
      galleryStats: jsonConfig.galleryStats || GALLERY_STATS_CONSTANTS.DEFAULT_GALLERY_STATS,

      // Styling
      statNumberColor: jsonConfig.statNumberColor || GALLERY_STATS_CONSTANTS.DEFAULT_COLORS.STAT_NUMBER,
      statLabelColor: jsonConfig.statLabelColor || GALLERY_STATS_CONSTANTS.DEFAULT_COLORS.STAT_LABEL,
      backgroundColor: jsonConfig.backgroundColor || GALLERY_STATS_CONSTANTS.DEFAULT_COLORS.BACKGROUND,

      statNumberFontFamily: jsonConfig.statNumberFontFamily || GALLERY_STATS_CONSTANTS.DEFAULT_FONTS.STAT_NUMBER,
      statLabelFontFamily: jsonConfig.statLabelFontFamily || GALLERY_STATS_CONSTANTS.DEFAULT_FONTS.STAT_LABEL
    };
  }

  private getDefaultConfig(): SimpleGalleryStatsConfig {
    return this.mapToSimpleConfig({});
  }
}
