import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { DOCTORS_CONSTANTS } from '../constants/doctors.constants';

export interface Doctor {
  name: string;
  title: string;
  title2: string;
  image: string;
  bio: string[];
  specialties: string[];
}

export interface SimpleDoctorsConfig {
  // Section Content
  sectionTitle: string;
  sectionSubtitle: string;
  doctors: Doctor[];

  // Styling
  sectionTitleColor: string;
  sectionSubtitleColor: string;
  doctorNameColor: string;
  doctorTitleColor: string;
  doctorBioColor: string;
  specialtyColor: string;
  backgroundColor: string;

  sectionTitleFontFamily: string;
  sectionSubtitleFontFamily: string;
  doctorNameFontFamily: string;
  doctorTitleFontFamily: string;
  doctorBioFontFamily: string;
  specialtyFontFamily: string;
}

@Injectable({
  providedIn: 'root'
})
export class DoctorsApiService {
  private configUrl = 'http://localhost:5000/api/config/doctors';
  private localStorageKey = 'doctorsConfig';
  private JSON_FILE_PATH = './assets/about/doctors.json';

  constructor(private http: HttpClient) { }

  loadConfig(): Observable<SimpleDoctorsConfig> {
    // Try to load from local storage first
    const localConfig = this.loadConfigFromLocalStorage();
    if (localConfig) {
      return of(localConfig);
    }

    // For now, directly use constants data instead of trying API
    console.log('Loading doctors config from constants');
    const defaultConfig = this.getDefaultConfig();
    this.saveConfigToLocalStorage(defaultConfig);
    return of(defaultConfig);
  }

  saveConfig(config: SimpleDoctorsConfig): Observable<any> {
    this.saveConfigToLocalStorage(config);
    return this.http.post(this.configUrl, config).pipe(
      catchError(error => {
        console.error('Error saving config to API, local storage updated:', error);
        alert('Configuration saved locally, but failed to save to server. Please check the API.');
        return of(null);
      })
    );
  }

  private loadConfigFromLocalStorage(): SimpleDoctorsConfig | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      const configString = localStorage.getItem(this.localStorageKey);
      return configString ? JSON.parse(configString) : null;
    }
    return null;
  }

  private saveConfigToLocalStorage(config: SimpleDoctorsConfig): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(config));
    }
  }

  private loadConfigFromJsonOrDefaults(): Observable<SimpleDoctorsConfig> {
    return this.http.get(this.JSON_FILE_PATH).pipe(
      map((jsonConfig: any) => this.mapToSimpleConfig(jsonConfig)),
      catchError(error => {
        console.error('Error loading config from JSON, falling back to default constants:', error);
        return of(this.getDefaultConfig());
      })
    );
  }

  private mapToSimpleConfig(jsonConfig: any): SimpleDoctorsConfig {
    return {
      // Section Content
      sectionTitle: jsonConfig.sectionTitle || DOCTORS_CONSTANTS.DEFAULT_SECTION_TITLE,
      sectionSubtitle: jsonConfig.sectionSubtitle || DOCTORS_CONSTANTS.DEFAULT_SECTION_SUBTITLE,
      doctors: jsonConfig.doctors || [...DOCTORS_CONSTANTS.DEFAULT_DOCTORS],

      // Styling
      sectionTitleColor: jsonConfig.sectionTitleColor || DOCTORS_CONSTANTS.DEFAULT_COLORS.SECTION_TITLE,
      sectionSubtitleColor: jsonConfig.sectionSubtitleColor || DOCTORS_CONSTANTS.DEFAULT_COLORS.SECTION_SUBTITLE,
      doctorNameColor: jsonConfig.doctorNameColor || DOCTORS_CONSTANTS.DEFAULT_COLORS.DOCTOR_NAME,
      doctorTitleColor: jsonConfig.doctorTitleColor || DOCTORS_CONSTANTS.DEFAULT_COLORS.DOCTOR_TITLE,
      doctorBioColor: jsonConfig.doctorBioColor || DOCTORS_CONSTANTS.DEFAULT_COLORS.DOCTOR_BIO,
      specialtyColor: jsonConfig.specialtyColor || DOCTORS_CONSTANTS.DEFAULT_COLORS.SPECIALTY,
      backgroundColor: jsonConfig.backgroundColor || DOCTORS_CONSTANTS.DEFAULT_COLORS.BACKGROUND,

      sectionTitleFontFamily: jsonConfig.sectionTitleFontFamily || DOCTORS_CONSTANTS.DEFAULT_FONTS.SECTION_TITLE,
      sectionSubtitleFontFamily: jsonConfig.sectionSubtitleFontFamily || DOCTORS_CONSTANTS.DEFAULT_FONTS.SECTION_SUBTITLE,
      doctorNameFontFamily: jsonConfig.doctorNameFontFamily || DOCTORS_CONSTANTS.DEFAULT_FONTS.DOCTOR_NAME,
      doctorTitleFontFamily: jsonConfig.doctorTitleFontFamily || DOCTORS_CONSTANTS.DEFAULT_FONTS.DOCTOR_TITLE,
      doctorBioFontFamily: jsonConfig.doctorBioFontFamily || DOCTORS_CONSTANTS.DEFAULT_FONTS.DOCTOR_BIO,
      specialtyFontFamily: jsonConfig.specialtyFontFamily || DOCTORS_CONSTANTS.DEFAULT_FONTS.SPECIALTY
    };
  }

  private getDefaultConfig(): SimpleDoctorsConfig {
    return this.mapToSimpleConfig({});
  }
}
