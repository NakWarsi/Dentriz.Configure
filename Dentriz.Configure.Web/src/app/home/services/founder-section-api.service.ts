import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface SimpleFounderConfig {
  subtitle: string;
  doctorName: string;
  title: string;
  description: string;
  specialties: string[];
  mission: string;
  imageSrc: string;        // Fixed - not editable
  imageAlt: string;        // Fixed - not editable
  imageName: string;       // Fixed - not editable
  credentials: string;     // Fixed - not editable
  philosophyTitle: string;
  philosophyContent: string;
  // Individual color options for each element
  subtitleColor: string;
  doctorNameColor: string;
  titleColor: string;
  descriptionColor: string;
  specialtiesColor: string;
  missionColor: string;
  philosophyTitleColor: string;
  philosophyContentColor: string;
  // Individual font family options for each element
  subtitleFontFamily: string;
  doctorNameFontFamily: string;
  titleFontFamily: string;
  descriptionFontFamily: string;
  specialtiesFontFamily: string;
  missionFontFamily: string;
  philosophyTitleFontFamily: string;
  philosophyContentFontFamily: string;
  // Global styling options
  backgroundColor: string;
}

@Injectable({
  providedIn: 'root'
})
export class FounderSectionApiService {
  private readonly baseUrl = 'https://localhost:7073/api';
  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  /**
   * Load configuration from JSON file
   */
  loadConfig(): Observable<SimpleFounderConfig> {
    const configUrl = './home-founder-section.json';
    
    console.log('📥 Loading founder config from:', configUrl);
    
    return this.http.get<any>(configUrl, this.httpOptions)
      .pipe(
        map((data: any) => {
          console.log('✅ Founder config loaded successfully:', data);
          // Transform to SimpleFounderConfig format
          return {
            subtitle: data.subtitle || 'Know your Doctor',
            doctorName: data.doctorName || 'Dr. Rizwana Khan',
            title: data.title || 'Founder & Chief Dentist',
            description: data.description || 'A proud graduate of Government Dental College, Mumbai — one of the most prestigious dental institutions in India. With around 10 years of experience, Dr. Khan has honed his expertise in a wide range of specialties including:',
            specialties: data.specialties || [
              'Cosmetic dentistry',
              'Dental implants',
              'Smile designing',
              'Root canal treatments',
              'Full-mouth rehabilitation',
              'Preventive care',
              'Pediatric dentistry'
            ],
            mission: data.mission || 'Dr. Khan\'s mission is not just to treat dental concerns but to help patients achieve lifelong oral health, confidence, and beautiful smiles.',
            imageSrc: data.image?.src || '/images/home/dr-rizwana-khan-c1.jpg?v=2',
            imageAlt: data.image?.alt || 'Dr. Rizwana Khan - Founder & Chief Dentist',
            imageName: data.image?.name || 'Dr. Rizwana Khan',
            credentials: data.image?.credentials || '(BDS. Govt. Dental College, Mumbai)',
            philosophyTitle: data.philosophy?.title || 'Our Philosophy:',
            philosophyContent: data.philosophy?.content || '"DentRiz Dental Clinic was built on the belief that dentistry should be modern, compassionate, and patient-focused. Our philosophy is to combine cutting-edge technology with a human touch, ensuring every patient receives the highest standard of care. We strive to create smiles that are not only healthy but also filled with confidence and happiness."',
            // Individual color options with defaults
            subtitleColor: data.subtitleColor || '#2c5aa0',
            doctorNameColor: data.doctorNameColor || '#000000',
            titleColor: data.titleColor || '#666666',
            descriptionColor: data.descriptionColor || '#333333',
            specialtiesColor: data.specialtiesColor || '#333333',
            missionColor: data.missionColor || '#333333',
            philosophyTitleColor: data.philosophyTitleColor || '#2c5aa0',
            philosophyContentColor: data.philosophyContentColor || '#333333',
            // Individual font family options with defaults
            subtitleFontFamily: data.subtitleFontFamily || 'Arial, sans-serif',
            doctorNameFontFamily: data.doctorNameFontFamily || 'Arial, sans-serif',
            titleFontFamily: data.titleFontFamily || 'Arial, sans-serif',
            descriptionFontFamily: data.descriptionFontFamily || 'Arial, sans-serif',
            specialtiesFontFamily: data.specialtiesFontFamily || 'Arial, sans-serif',
            missionFontFamily: data.missionFontFamily || 'Arial, sans-serif',
            philosophyTitleFontFamily: data.philosophyTitleFontFamily || 'Arial, sans-serif',
            philosophyContentFontFamily: data.philosophyContentFontFamily || 'Arial, sans-serif',
            // Global styling options with defaults
            backgroundColor: data.backgroundColor || 'rgb(231,240,234)'
          };
        }),
        catchError(error => {
          console.error(`❌ Failed to load founder config:`, error);
          return this.handleError(error);
        })
      );
  }

  /**
   * Handle HTTP errors
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    
    if (typeof window !== 'undefined' && typeof ErrorEvent !== 'undefined' && error.error instanceof ErrorEvent) {
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      errorMessage = `Server Error: ${error.status} - ${error.message}`;
      if (error.error && error.error.message) {
        errorMessage += ` - ${error.error.message}`;
      }
    }
    
    console.error('API Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
