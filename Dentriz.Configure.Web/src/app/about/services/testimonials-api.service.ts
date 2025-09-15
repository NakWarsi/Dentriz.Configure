import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { TESTIMONIALS_CONSTANTS } from '../constants/testimonials.constants';

export interface Testimonial {
  stars: string;
  text: string;
  authorName: string;
  authorTitle: string;
}

export interface SimpleTestimonialsConfig {
  // Section Content
  sectionTitle: string;
  sectionSubtitle: string;
  testimonials: Testimonial[];

  // Styling
  sectionTitleColor: string;
  sectionSubtitleColor: string;
  testimonialTextColor: string;
  testimonialAuthorNameColor: string;
  testimonialAuthorTitleColor: string;
  testimonialStarsColor: string;
  backgroundColor: string;

  sectionTitleFontFamily: string;
  sectionSubtitleFontFamily: string;
  testimonialTextFontFamily: string;
  testimonialAuthorNameFontFamily: string;
  testimonialAuthorTitleFontFamily: string;
}

@Injectable({
  providedIn: 'root'
})
export class TestimonialsApiService {
  private configUrl = 'http://localhost:5208/api/AboutTestimonials';
  private localStorageKey = 'testimonialsConfig';
  private JSON_FILE_PATH = './assets/about/testimonials.json';

  constructor(private http: HttpClient) { }

  loadConfig(): Observable<SimpleTestimonialsConfig> {
    // Try to load from local storage first
    const localConfig = this.loadConfigFromLocalStorage();
    if (localConfig) {
      return of(localConfig);
    }

    // Try to load from API
    console.log('Loading testimonials config from API:', this.configUrl);
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

  saveConfig(config: SimpleTestimonialsConfig): Observable<any> {
    this.saveConfigToLocalStorage(config);
    const apiConfig = this.mapSimpleConfigToApiConfig(config);
    
    console.log('Saving testimonials config to API:', apiConfig);
    
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

  private loadConfigFromLocalStorage(): SimpleTestimonialsConfig | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      const configString = localStorage.getItem(this.localStorageKey);
      return configString ? JSON.parse(configString) : null;
    }
    return null;
  }

  private saveConfigToLocalStorage(config: SimpleTestimonialsConfig): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(config));
    }
  }

  private loadConfigFromJsonOrDefaults(): Observable<SimpleTestimonialsConfig> {
    return this.http.get(this.JSON_FILE_PATH).pipe(
      map((jsonConfig: any) => this.mapToSimpleConfig(jsonConfig)),
      catchError(error => {
        console.error('Error loading config from JSON, falling back to default constants:', error);
        return of(this.getDefaultConfig());
      })
    );
  }

  private mapToSimpleConfig(jsonConfig: any): SimpleTestimonialsConfig {
    return {
      // Section Content
      sectionTitle: jsonConfig.sectionTitle || TESTIMONIALS_CONSTANTS.DEFAULT_SECTION_TITLE,
      sectionSubtitle: jsonConfig.sectionSubtitle || TESTIMONIALS_CONSTANTS.DEFAULT_SECTION_SUBTITLE,
      testimonials: jsonConfig.testimonials || [...TESTIMONIALS_CONSTANTS.DEFAULT_TESTIMONIALS],

      // Styling
      sectionTitleColor: jsonConfig.sectionTitleColor || TESTIMONIALS_CONSTANTS.DEFAULT_COLORS.SECTION_TITLE,
      sectionSubtitleColor: jsonConfig.sectionSubtitleColor || TESTIMONIALS_CONSTANTS.DEFAULT_COLORS.SECTION_SUBTITLE,
      testimonialTextColor: jsonConfig.testimonialTextColor || TESTIMONIALS_CONSTANTS.DEFAULT_COLORS.TESTIMONIAL_TEXT,
      testimonialAuthorNameColor: jsonConfig.testimonialAuthorNameColor || TESTIMONIALS_CONSTANTS.DEFAULT_COLORS.TESTIMONIAL_AUTHOR_NAME,
      testimonialAuthorTitleColor: jsonConfig.testimonialAuthorTitleColor || TESTIMONIALS_CONSTANTS.DEFAULT_COLORS.TESTIMONIAL_AUTHOR_TITLE,
      testimonialStarsColor: jsonConfig.testimonialStarsColor || TESTIMONIALS_CONSTANTS.DEFAULT_COLORS.TESTIMONIAL_STARS,
      backgroundColor: jsonConfig.backgroundColor || TESTIMONIALS_CONSTANTS.DEFAULT_COLORS.BACKGROUND,

      sectionTitleFontFamily: jsonConfig.sectionTitleFontFamily || TESTIMONIALS_CONSTANTS.DEFAULT_FONTS.SECTION_TITLE,
      sectionSubtitleFontFamily: jsonConfig.sectionSubtitleFontFamily || TESTIMONIALS_CONSTANTS.DEFAULT_FONTS.SECTION_SUBTITLE,
      testimonialTextFontFamily: jsonConfig.testimonialTextFontFamily || TESTIMONIALS_CONSTANTS.DEFAULT_FONTS.TESTIMONIAL_TEXT,
      testimonialAuthorNameFontFamily: jsonConfig.testimonialAuthorNameFontFamily || TESTIMONIALS_CONSTANTS.DEFAULT_FONTS.TESTIMONIAL_AUTHOR_NAME,
      testimonialAuthorTitleFontFamily: jsonConfig.testimonialAuthorTitleFontFamily || TESTIMONIALS_CONSTANTS.DEFAULT_FONTS.TESTIMONIAL_AUTHOR_TITLE
    };
  }

  private getDefaultConfig(): SimpleTestimonialsConfig {
    return this.mapToSimpleConfig({});
  }

  private mapApiConfigToSimpleConfig(apiConfig: any): SimpleTestimonialsConfig {
    return {
      // Section Content
      sectionTitle: apiConfig.sectionTitle || TESTIMONIALS_CONSTANTS.DEFAULT_SECTION_TITLE,
      sectionSubtitle: apiConfig.sectionSubtitle || TESTIMONIALS_CONSTANTS.DEFAULT_SECTION_SUBTITLE,
      testimonials: apiConfig.testimonials || [...TESTIMONIALS_CONSTANTS.DEFAULT_TESTIMONIALS],

      // Styling
      sectionTitleColor: apiConfig.sectionTitleColor || TESTIMONIALS_CONSTANTS.DEFAULT_COLORS.SECTION_TITLE,
      sectionSubtitleColor: apiConfig.sectionSubtitleColor || TESTIMONIALS_CONSTANTS.DEFAULT_COLORS.SECTION_SUBTITLE,
      testimonialTextColor: apiConfig.testimonialTextColor || TESTIMONIALS_CONSTANTS.DEFAULT_COLORS.TESTIMONIAL_TEXT,
      testimonialAuthorNameColor: apiConfig.testimonialAuthorNameColor || TESTIMONIALS_CONSTANTS.DEFAULT_COLORS.TESTIMONIAL_AUTHOR_NAME,
      testimonialAuthorTitleColor: apiConfig.testimonialAuthorTitleColor || TESTIMONIALS_CONSTANTS.DEFAULT_COLORS.TESTIMONIAL_AUTHOR_TITLE,
      testimonialStarsColor: apiConfig.testimonialStarsColor || TESTIMONIALS_CONSTANTS.DEFAULT_COLORS.TESTIMONIAL_STARS,
      backgroundColor: apiConfig.backgroundColor || TESTIMONIALS_CONSTANTS.DEFAULT_COLORS.BACKGROUND,

      sectionTitleFontFamily: apiConfig.sectionTitleFontFamily || TESTIMONIALS_CONSTANTS.DEFAULT_FONTS.SECTION_TITLE,
      sectionSubtitleFontFamily: apiConfig.sectionSubtitleFontFamily || TESTIMONIALS_CONSTANTS.DEFAULT_FONTS.SECTION_SUBTITLE,
      testimonialTextFontFamily: apiConfig.testimonialTextFontFamily || TESTIMONIALS_CONSTANTS.DEFAULT_FONTS.TESTIMONIAL_TEXT,
      testimonialAuthorNameFontFamily: apiConfig.testimonialAuthorNameFontFamily || TESTIMONIALS_CONSTANTS.DEFAULT_FONTS.TESTIMONIAL_AUTHOR_NAME,
      testimonialAuthorTitleFontFamily: apiConfig.testimonialAuthorTitleFontFamily || TESTIMONIALS_CONSTANTS.DEFAULT_FONTS.TESTIMONIAL_AUTHOR_TITLE
    };
  }

  private mapSimpleConfigToApiConfig(simpleConfig: SimpleTestimonialsConfig): any {
    return {
      sectionTitle: simpleConfig.sectionTitle,
      sectionSubtitle: simpleConfig.sectionSubtitle,
      testimonials: simpleConfig.testimonials,
      sectionTitleColor: simpleConfig.sectionTitleColor,
      sectionSubtitleColor: simpleConfig.sectionSubtitleColor,
      testimonialTextColor: simpleConfig.testimonialTextColor,
      testimonialAuthorNameColor: simpleConfig.testimonialAuthorNameColor,
      testimonialAuthorTitleColor: simpleConfig.testimonialAuthorTitleColor,
      testimonialStarsColor: simpleConfig.testimonialStarsColor,
      backgroundColor: simpleConfig.backgroundColor,
      sectionTitleFontFamily: simpleConfig.sectionTitleFontFamily,
      sectionSubtitleFontFamily: simpleConfig.sectionSubtitleFontFamily,
      testimonialTextFontFamily: simpleConfig.testimonialTextFontFamily,
      testimonialAuthorNameFontFamily: simpleConfig.testimonialAuthorNameFontFamily,
      testimonialAuthorTitleFontFamily: simpleConfig.testimonialAuthorTitleFontFamily
    };
  }
}
