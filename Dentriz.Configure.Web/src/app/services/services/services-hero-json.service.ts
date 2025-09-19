import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IDataService } from '../../core/interfaces/data-service.interface';

export interface SimpleServicesHeroConfig {
  // Section Content
  title: string;
  subtitle: string;

  // Styling
  titleColor: string;
  subtitleColor: string;
  backgroundColor: string;

  titleFontFamily: string;
  subtitleFontFamily: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServicesHeroJsonService implements IDataService<SimpleServicesHeroConfig> {
  private configUrl = './assets/services/services-hero.json';

  constructor(private http: HttpClient) { }

  loadConfig(): Observable<SimpleServicesHeroConfig> {
    console.log('Loading services hero config from JSON:', this.configUrl);
    
    return this.http.get<SimpleServicesHeroConfig>(this.configUrl).pipe(
      map((config: SimpleServicesHeroConfig) => {
        console.log('Loaded JSON config:', config);
        return config;
      }),
      catchError(error => {
        console.error('Error loading JSON config:', error);
        // Return default config if JSON fails
        return of({
          title: 'Complete Dental Care Under One Roof',
          subtitle: 'Comprehensive dental care including cosmetic dentistry, dental implants, and family dentistry',
          titleColor: '#1e3c72',
          subtitleColor: '#666666',
          backgroundColor: 'rgb(231, 241, 235)',
          titleFontFamily: 'Arial, sans-serif',
          subtitleFontFamily: 'Arial, sans-serif'
        });
      })
    );
  }

  saveConfig(config: SimpleServicesHeroConfig): Observable<SimpleServicesHeroConfig> {
    // In static mode, we don't actually save - just return the config
    console.log('Static mode: saveConfig called but not implemented');
    return of(config);
  }

  isEditingEnabled(): boolean {
    return false; // Static mode doesn't support editing
  }
}
