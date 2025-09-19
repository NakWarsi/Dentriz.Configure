import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IDataService } from '../../core/interfaces/data-service.interface';

export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
  features: string[];
}

export interface Service {
  sectionTitle: string;
  sectionSubtitle: string;
  services: ServiceItem[];
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

export interface SimpleServicesConfig {
  serviceList: Service[];
}

@Injectable({
  providedIn: 'root'
})
export class ServicesJsonService implements IDataService<SimpleServicesConfig> {
  private configUrl = './assets/services/cosmetic-services.json';

  constructor(private http: HttpClient) { }

  loadConfig(): Observable<SimpleServicesConfig> {
    console.log('Loading services config from JSON:', this.configUrl);
    
    return this.http.get<SimpleServicesConfig>(this.configUrl).pipe(
      map((config: SimpleServicesConfig) => {
        console.log('Loaded JSON config:', config);
        return config;
      }),
      catchError(error => {
        console.error('Error loading JSON config:', error);
        // Return default config if JSON fails
        return of({
          serviceList: [
            {
              sectionTitle: 'Cosmetic Services',
              sectionSubtitle: 'Enhance your smile with our cosmetic treatments',
              services: [],
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
            },
            {
              sectionTitle: 'Preventive Care',
              sectionSubtitle: 'Keep your teeth healthy with preventive treatments',
              services: [],
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
            },
            {
              sectionTitle: 'Restorative Care',
              sectionSubtitle: 'Restore your smile with our restorative treatments',
              services: [],
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
            }
          ]
        });
      })
    );
  }

  saveConfig(config: SimpleServicesConfig): Observable<SimpleServicesConfig> {
    // In static mode, we don't actually save - just return the config
    console.log('Static mode: saveConfig called but not implemented');
    return of(config);
  }

  isEditingEnabled(): boolean {
    return false; // Static mode doesn't support editing
  }
}
