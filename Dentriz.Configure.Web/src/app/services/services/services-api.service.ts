import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

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
export class ServicesApiService {
  private configUrl = 'http://localhost:5208/api/Services';
  private localStorageKey = 'servicesConfig';

  constructor(private http: HttpClient) { }

  loadConfig(): Observable<SimpleServicesConfig> {
    // Try to load from local storage first
    const localConfig = this.loadConfigFromLocalStorage();
    if (localConfig) {
      return of(localConfig);
    }

    // Try to load from API
    console.log('Loading services config from API:', this.configUrl);
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

  saveConfig(config: SimpleServicesConfig): Observable<any> {
    this.saveConfigToLocalStorage(config);
    const apiConfig = this.mapSimpleConfigToApiConfig(config);
    
    console.log('Saving services config to API:', apiConfig);
    
    return this.http.put(`${this.configUrl}/services`, apiConfig, {
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

  getServiceByTitle(sectionTitle: string): Observable<Service | null> {
    return this.loadConfig().pipe(
      map(config => {
        return config.serviceList.find(service => 
          service.sectionTitle.toLowerCase() === sectionTitle.toLowerCase()
        ) || null;
      })
    );
  }

  updateService(service: Service): Observable<any> {
    return this.loadConfig().pipe(
      map(config => {
        const index = config.serviceList.findIndex(s => 
          s.sectionTitle.toLowerCase() === service.sectionTitle.toLowerCase()
        );
        
        if (index >= 0) {
          config.serviceList[index] = service;
        } else {
          config.serviceList.push(service);
        }
        
        return config;
      }),
      tap(config => this.saveConfig(config).subscribe())
    );
  }

  private loadConfigFromLocalStorage(): SimpleServicesConfig | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      const configString = localStorage.getItem(this.localStorageKey);
      return configString ? JSON.parse(configString) : null;
    }
    return null;
  }

  private saveConfigToLocalStorage(config: SimpleServicesConfig): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(config));
    }
  }

  private mapApiConfigToSimpleConfig(apiConfig: any): SimpleServicesConfig {
    return {
      serviceList: apiConfig.serviceList || []
    };
  }

  private mapSimpleConfigToApiConfig(simpleConfig: SimpleServicesConfig): any {
    return {
      serviceList: simpleConfig.serviceList
    };
  }

  private getDefaultConfig(): SimpleServicesConfig {
    return {
      serviceList: [
        {
          sectionTitle: "Restorative Care",
          sectionSubtitle: "Restore your smile with our comprehensive restorative treatments",
          services: [
            {
              icon: "🦷",
              title: "Dental Crowns",
              description: "Protect and restore damaged teeth with custom-made crowns",
              features: ["Porcelain crowns", "Metal-free options", "Same-day crowns available"]
            },
            {
              icon: "🔧",
              title: "Dental Bridges",
              description: "Replace missing teeth with natural-looking bridges",
              features: ["Fixed bridges", "Removable bridges", "Implant-supported bridges"]
            },
            {
              icon: "🦷",
              title: "Root Canal Treatment",
              description: "Save infected teeth with advanced root canal therapy",
              features: ["Pain-free procedure", "Single visit treatment", "High success rate"]
            }
          ],
          sectionTitleColor: "#1e3c72",
          sectionSubtitleColor: "#666666",
          cardTitleColor: "#1e3c72",
          cardDescriptionColor: "#666666",
          cardFeaturesColor: "#888888",
          backgroundColor: "#f8f9fa",
          sectionTitleFontFamily: "Arial, sans-serif",
          sectionSubtitleFontFamily: "Arial, sans-serif",
          cardTitleFontFamily: "Arial, sans-serif",
          cardDescriptionFontFamily: "Arial, sans-serif",
          cardFeaturesFontFamily: "Arial, sans-serif"
        },
        {
          sectionTitle: "Preventive Care",
          sectionSubtitle: "Keep your smile healthy with our preventive dental care",
          services: [
            {
              icon: "🧽",
              title: "Professional Cleanings",
              description: "Regular cleanings to maintain optimal oral health",
              features: ["Plaque removal", "Tartar removal", "Fluoride treatment"]
            },
            {
              icon: "🛡️",
              title: "Dental Sealants",
              description: "Protect teeth from decay with dental sealants",
              features: ["Long-lasting protection", "Painless application", "Cost-effective"]
            },
            {
              icon: "🔍",
              title: "Oral Cancer Screening",
              description: "Early detection of oral cancer with regular screenings",
              features: ["Non-invasive", "Quick procedure", "Life-saving early detection"]
            }
          ],
          sectionTitleColor: "#1e3c72",
          sectionSubtitleColor: "#666666",
          cardTitleColor: "#1e3c72",
          cardDescriptionColor: "#666666",
          cardFeaturesColor: "#888888",
          backgroundColor: "#f8f9fa",
          sectionTitleFontFamily: "Arial, sans-serif",
          sectionSubtitleFontFamily: "Arial, sans-serif",
          cardTitleFontFamily: "Arial, sans-serif",
          cardDescriptionFontFamily: "Arial, sans-serif",
          cardFeaturesFontFamily: "Arial, sans-serif"
        },
        {
          sectionTitle: "Cosmetic Services",
          sectionSubtitle: "Transform your smile with our cosmetic dental treatments",
          services: [
            {
              icon: "✨",
              title: "Teeth Whitening",
              description: "Brighten your smile with professional whitening treatments",
              features: ["In-office whitening", "Take-home kits", "Long-lasting results"]
            },
            {
              icon: "💎",
              title: "Dental Veneers",
              description: "Perfect your smile with custom-made veneers",
              features: ["Porcelain veneers", "Composite veneers", "Natural appearance"]
            },
            {
              icon: "🎭",
              title: "Smile Makeover",
              description: "Complete smile transformation with multiple treatments",
              features: ["Comprehensive planning", "Multiple procedures", "Stunning results"]
            }
          ],
          sectionTitleColor: "#1e3c72",
          sectionSubtitleColor: "#666666",
          cardTitleColor: "#1e3c72",
          cardDescriptionColor: "#666666",
          cardFeaturesColor: "#888888",
          backgroundColor: "#f8f9fa",
          sectionTitleFontFamily: "Arial, sans-serif",
          sectionSubtitleFontFamily: "Arial, sans-serif",
          cardTitleFontFamily: "Arial, sans-serif",
          cardDescriptionFontFamily: "Arial, sans-serif",
          cardFeaturesFontFamily: "Arial, sans-serif"
        }
      ]
    };
  }
}
