import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HOME_FOUNDER_SECTION_CONSTANTS } from '../constants/home-founder-section.constants';

export interface SimpleFounderConfig {
  subtitle: string;
  doctorName: string;
  title: string;
  description: string;
  specialties: readonly string[];
  mission: string;
  imageSrc: string;        // Fixed - not editable
  imageAlt: string;        // Fixed - not editable
  imageName: string;       // Now editable
  credentials: string;     // Now editable
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
  imageNameColor: string;
  credentialsColor: string;
  // Individual font family options for each element
  subtitleFontFamily: string;
  doctorNameFontFamily: string;
  titleFontFamily: string;
  descriptionFontFamily: string;
  specialtiesFontFamily: string;
  missionFontFamily: string;
  philosophyTitleFontFamily: string;
  philosophyContentFontFamily: string;
  imageNameFontFamily: string;
  credentialsFontFamily: string;
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
   * Load configuration from API with fallback to JSON file
   */
  loadConfig(): Observable<SimpleFounderConfig> {
    const configUrl = 'http://localhost:5208/api/HomeFounder';
    
    console.log('📥 Loading founder config from API:', configUrl);
    
    return this.http.get<any>(configUrl, this.httpOptions)
      .pipe(
        map((data: any) => {
          console.log('✅ Founder config loaded successfully from API:', data);
          return this.mapApiConfigToSimpleConfig(data);
        }),
        catchError(error => {
          console.warn('⚠️ API failed, falling back to JSON file:', error);
          return this.loadFromJsonFile();
        })
      );
  }

  /**
   * Load configuration from JSON file as fallback
   */
  private loadFromJsonFile(): Observable<SimpleFounderConfig> {
    const configUrl = './home-founder-section.json';
    
    console.log('📥 Loading founder config from JSON file:', configUrl);
    
    return this.http.get<any>(configUrl, this.httpOptions)
      .pipe(
        map((data: any) => {
          console.log('✅ Founder config loaded successfully from JSON:', data);
          return this.mapApiConfigToSimpleConfig(data);
        }),
        catchError(error => {
          console.error(`❌ Failed to load founder config from JSON:`, error);
          return this.loadFromLocalStorage();
        })
      );
  }

  /**
   * Load configuration from localStorage as final fallback
   */
  private loadFromLocalStorage(): Observable<SimpleFounderConfig> {
    console.log('📥 Loading founder config from localStorage');
    
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const savedConfig = localStorage.getItem('dentrizFounderSectionConfig');
        if (savedConfig) {
          const data = JSON.parse(savedConfig);
          console.log('✅ Founder config loaded from localStorage:', data);
          return of(this.mapApiConfigToSimpleConfig(data));
        }
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
    
    // Return default config if all else fails
    console.log('📥 Using default founder config');
    return of(this.getDefaultConfig());
  }

  /**
   * Map API config to SimpleFounderConfig format
   */
  private mapApiConfigToSimpleConfig(data: any): SimpleFounderConfig {
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
      // Individual color options with defaults from constants
      subtitleColor: data.subtitleColor || HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_COLORS.SUBTITLE,
      doctorNameColor: data.doctorNameColor || HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_COLORS.DOCTOR_NAME,
      titleColor: data.titleColor || HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_COLORS.TITLE,
      descriptionColor: data.descriptionColor || HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_COLORS.DESCRIPTION,
      specialtiesColor: data.specialtiesColor || HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_COLORS.SPECIALTIES,
      missionColor: data.missionColor || HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_COLORS.MISSION,
      philosophyTitleColor: data.philosophyTitleColor || HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_COLORS.PHILOSOPHY_TITLE,
      philosophyContentColor: data.philosophyContentColor || HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_COLORS.PHILOSOPHY_CONTENT,
      imageNameColor: data.imageNameColor || HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_COLORS.IMAGE_NAME,
      credentialsColor: data.credentialsColor || HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_COLORS.CREDENTIALS,
      // Individual font family options with defaults from constants
      subtitleFontFamily: data.subtitleFontFamily || HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_FONTS.SUBTITLE,
      doctorNameFontFamily: data.doctorNameFontFamily || HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_FONTS.DOCTOR_NAME,
      titleFontFamily: data.titleFontFamily || HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_FONTS.TITLE,
      descriptionFontFamily: data.descriptionFontFamily || HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_FONTS.DESCRIPTION,
      specialtiesFontFamily: data.specialtiesFontFamily || HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_FONTS.SPECIALTIES,
      missionFontFamily: data.missionFontFamily || HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_FONTS.MISSION,
      philosophyTitleFontFamily: data.philosophyTitleFontFamily || HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_FONTS.PHILOSOPHY_TITLE,
      philosophyContentFontFamily: data.philosophyContentFontFamily || HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_FONTS.PHILOSOPHY_CONTENT,
      imageNameFontFamily: data.imageNameFontFamily || HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_FONTS.IMAGE_NAME,
      credentialsFontFamily: data.credentialsFontFamily || HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_FONTS.CREDENTIALS,
      // Global styling options with defaults from constants
      backgroundColor: data.backgroundColor || HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_COLORS.BACKGROUND
    };
  }

  /**
   * Get default configuration
   */
  private getDefaultConfig(): SimpleFounderConfig {
    return {
      subtitle: 'Know your Doctor',
      doctorName: 'Dr. Rizwana Khan',
      title: 'Founder & Chief Dentist',
      description: 'A proud graduate of Government Dental College, Mumbai — one of the most prestigious dental institutions in India. With around 10 years of experience, Dr. Khan has honed his expertise in a wide range of specialties including:',
      specialties: [
        'Cosmetic dentistry',
        'Dental implants',
        'Smile designing',
        'Root canal treatments',
        'Full-mouth rehabilitation',
        'Preventive care',
        'Pediatric dentistry'
      ],
      mission: 'Dr. Khan\'s mission is not just to treat dental concerns but to help patients achieve lifelong oral health, confidence, and beautiful smiles.',
      imageSrc: '/images/home/dr-rizwana-khan-c1.jpg?v=2',
      imageAlt: 'Dr. Rizwana Khan - Founder & Chief Dentist',
      imageName: 'Dr. Rizwana Khan',
      credentials: '(BDS. Govt. Dental College, Mumbai)',
      philosophyTitle: 'Our Philosophy:',
      philosophyContent: '"DentRiz Dental Clinic was built on the belief that dentistry should be modern, compassionate, and patient-focused. Our philosophy is to combine cutting-edge technology with a human touch, ensuring every patient receives the highest standard of care. We strive to create smiles that are not only healthy but also filled with confidence and happiness."',
      subtitleColor: HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_COLORS.SUBTITLE,
      doctorNameColor: HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_COLORS.DOCTOR_NAME,
      titleColor: HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_COLORS.TITLE,
      descriptionColor: HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_COLORS.DESCRIPTION,
      specialtiesColor: HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_COLORS.SPECIALTIES,
      missionColor: HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_COLORS.MISSION,
      philosophyTitleColor: HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_COLORS.PHILOSOPHY_TITLE,
      philosophyContentColor: HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_COLORS.PHILOSOPHY_CONTENT,
      imageNameColor: HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_COLORS.IMAGE_NAME,
      credentialsColor: HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_COLORS.CREDENTIALS,
      subtitleFontFamily: HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_FONTS.SUBTITLE,
      doctorNameFontFamily: HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_FONTS.DOCTOR_NAME,
      titleFontFamily: HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_FONTS.TITLE,
      descriptionFontFamily: HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_FONTS.DESCRIPTION,
      specialtiesFontFamily: HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_FONTS.SPECIALTIES,
      missionFontFamily: HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_FONTS.MISSION,
      philosophyTitleFontFamily: HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_FONTS.PHILOSOPHY_TITLE,
      philosophyContentFontFamily: HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_FONTS.PHILOSOPHY_CONTENT,
      imageNameFontFamily: HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_FONTS.IMAGE_NAME,
      credentialsFontFamily: HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_FONTS.CREDENTIALS,
      backgroundColor: HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_COLORS.BACKGROUND
    };
  }

  /**
   * Save configuration to API
   */
  saveConfig(config: SimpleFounderConfig): Observable<any> {
    const configUrl = 'http://localhost:5208/api/HomeFounder';
    const apiConfig = this.mapSimpleConfigToApiConfig(config);
    
    console.log('💾 Saving founder config to API:', configUrl, apiConfig);
    
    return this.http.post(configUrl, apiConfig, this.httpOptions)
      .pipe(
        map((response: any) => {
          console.log('✅ Founder config saved successfully to API:', response);
          return response;
        }),
        catchError(error => {
          console.error('❌ Failed to save founder config to API:', error);
          // Fallback to localStorage
          this.saveToLocalStorage(config);
          return throwError(() => error);
        })
      );
  }

  /**
   * Map SimpleFounderConfig to API format
   */
  private mapSimpleConfigToApiConfig(config: SimpleFounderConfig): any {
    return {
      id: 'home-founder',
      subtitle: config.subtitle,
      doctorName: config.doctorName,
      title: config.title,
      description: config.description,
      specialties: config.specialties,
      mission: config.mission,
      image: {
        src: config.imageSrc,
        alt: config.imageAlt,
        name: config.imageName,
        credentials: config.credentials
      },
      philosophy: {
        title: config.philosophyTitle,
        content: config.philosophyContent
      },
      subtitleColor: config.subtitleColor,
      doctorNameColor: config.doctorNameColor,
      titleColor: config.titleColor,
      descriptionColor: config.descriptionColor,
      specialtiesColor: config.specialtiesColor,
      missionColor: config.missionColor,
      philosophyTitleColor: config.philosophyTitleColor,
      philosophyContentColor: config.philosophyContentColor,
      imageNameColor: config.imageNameColor,
      credentialsColor: config.credentialsColor,
      backgroundColor: config.backgroundColor,
      subtitleFontFamily: config.subtitleFontFamily,
      doctorNameFontFamily: config.doctorNameFontFamily,
      titleFontFamily: config.titleFontFamily,
      descriptionFontFamily: config.descriptionFontFamily,
      specialtiesFontFamily: config.specialtiesFontFamily,
      missionFontFamily: config.missionFontFamily,
      philosophyTitleFontFamily: config.philosophyTitleFontFamily,
      philosophyContentFontFamily: config.philosophyContentFontFamily,
      imageNameFontFamily: config.imageNameFontFamily,
      credentialsFontFamily: config.credentialsFontFamily
    };
  }

  /**
   * Save configuration to localStorage as fallback
   */
  private saveToLocalStorage(config: SimpleFounderConfig): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('dentrizFounderSectionConfig', JSON.stringify(config));
        console.log('✅ Founder config saved to localStorage');
      }
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
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
