import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IDataService } from '../../core/interfaces/data-service.interface';

export interface TechnologyItem {
  icon: string;
  title: string;
  description: string;
  features: string[];
}

export interface SimpleTechnologySectionConfig {
  sectionTitle: string;
  sectionSubtitle: string;
  technologies: TechnologyItem[];
  sectionTitleColor: string;
  sectionSubtitleColor: string;
  cardTitleColor: string;
  cardDescriptionColor: string;
  cardFeaturesColor: string;
  backgroundColor: string;
  sectionTitleFontFamily: string;
  sectionSubtitleFontFamily: string;
  cardTitleFontFamily: string;
  cardDescriptionFontFamily: string;
  cardFeaturesFontFamily: string;
}

@Injectable({
  providedIn: 'root'
})
export class TechnologySectionJsonService implements IDataService<SimpleTechnologySectionConfig> {
  private configUrl = './assets/services/technology-section.json';

  constructor(private http: HttpClient) { }

  loadConfig(): Observable<SimpleTechnologySectionConfig> {
    console.log('Loading technology section config from JSON:', this.configUrl);
    
    return this.http.get<SimpleTechnologySectionConfig>(this.configUrl).pipe(
      map((config: SimpleTechnologySectionConfig) => {
        console.log('Loaded JSON config:', config);
        return config;
      }),
      catchError(error => {
        console.error('Error loading JSON config:', error);
        // Return default config if JSON fails
        return of({
          sectionTitle: 'Advanced Technology',
          sectionSubtitle: 'State-of-the-art equipment for better dental care',
          technologies: [],
          sectionTitleColor: '#1e3c72',
          sectionSubtitleColor: '#666666',
          cardTitleColor: '#1e3c72',
          cardDescriptionColor: '#666666',
          cardFeaturesColor: '#666666',
          backgroundColor: '#ffffff',
          sectionTitleFontFamily: 'Arial, sans-serif',
          sectionSubtitleFontFamily: 'Arial, sans-serif',
          cardTitleFontFamily: 'Arial, sans-serif',
          cardDescriptionFontFamily: 'Arial, sans-serif',
          cardFeaturesFontFamily: 'Arial, sans-serif'
        });
      })
    );
  }

  saveConfig(config: SimpleTechnologySectionConfig): Observable<SimpleTechnologySectionConfig> {
    // In static mode, we don't actually save - just return the config
    console.log('Static mode: saveConfig called but not implemented');
    return of(config);
  }

  isEditingEnabled(): boolean {
    return false; // Static mode doesn't support editing
  }
}
