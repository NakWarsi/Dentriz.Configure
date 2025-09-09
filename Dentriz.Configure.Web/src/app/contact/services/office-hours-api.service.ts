import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { OFFICE_HOURS_CONSTANTS } from '../constants/office-hours.constants';

export interface SimpleOfficeHoursConfig {
  // Section Content
  sectionTitle: string;
  sectionSubtitle: string;

  // Days and Times
  mondayTime: string;
  tuesdayTime: string;
  wednesdayTime: string;
  thursdayTime: string;
  fridayTime: string;
  saturdayTime: string;
  sundayTime: string;

  // Important Notes
  notesTitle: string;
  notes: string[];

  // Colors
  sectionTitleColor: string;
  sectionSubtitleColor: string;
  dayTextColor: string;
  timeTextColor: string;
  notesTitleColor: string;
  notesTextColor: string;
  backgroundColor: string;

  // Fonts
  sectionTitleFontFamily: string;
  sectionSubtitleFontFamily: string;
  dayTextFontFamily: string;
  timeTextFontFamily: string;
  notesTitleFontFamily: string;
  notesTextFontFamily: string;
}

@Injectable({
  providedIn: 'root'
})
export class OfficeHoursApiService {
  private configUrl = 'http://localhost:5000/api/config/office-hours';
  private localStorageKey = 'officeHoursConfig';

  constructor(private http: HttpClient) { }

  loadConfig(): Observable<SimpleOfficeHoursConfig> {
    // Try to load from local storage first
    const localConfig = this.loadConfigFromLocalStorage();
    if (localConfig) {
      return of(localConfig);
    }

    // For now, directly use constants data instead of trying API
    console.log('Loading office hours config from constants');
    const defaultConfig = this.getDefaultConfig();
    this.saveConfigToLocalStorage(defaultConfig);
    return of(defaultConfig);
  }

  saveConfig(config: SimpleOfficeHoursConfig): Observable<any> {
    this.saveConfigToLocalStorage(config);
    return this.http.post(this.configUrl, config).pipe(
      catchError(error => {
        console.error('Error saving config to API, local storage updated:', error);
        alert('Configuration saved locally, but failed to save to server. Please check the API.');
        return of(null);
      })
    );
  }

  private loadConfigFromLocalStorage(): SimpleOfficeHoursConfig | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      const configString = localStorage.getItem(this.localStorageKey);
      return configString ? JSON.parse(configString) : null;
    }
    return null;
  }

  private saveConfigToLocalStorage(config: SimpleOfficeHoursConfig): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(config));
    }
  }

  private loadConfigFromJsonOrDefaults(): Observable<SimpleOfficeHoursConfig> {
    return this.http.get<any>('./assets/contact/office-hours.json').pipe(
      map(data => this.mapToSimpleConfig(data)),
      catchError(error => {
        console.error('Error loading config from JSON, falling back to default constants:', error);
        return of(this.getDefaultConfig());
      })
    );
  }

  private mapToSimpleConfig(data: any): SimpleOfficeHoursConfig {
    const constants = OFFICE_HOURS_CONSTANTS;
    
    return {
      // Section Content
      sectionTitle: data.sectionTitle || constants.DEFAULT_SECTION_TITLE,
      sectionSubtitle: data.sectionSubtitle || constants.DEFAULT_SECTION_SUBTITLE,

      // Days and Times
      mondayTime: data.mondayTime || constants.DEFAULT_MONDAY_TIME,
      tuesdayTime: data.tuesdayTime || constants.DEFAULT_TUESDAY_TIME,
      wednesdayTime: data.wednesdayTime || constants.DEFAULT_WEDNESDAY_TIME,
      thursdayTime: data.thursdayTime || constants.DEFAULT_THURSDAY_TIME,
      fridayTime: data.fridayTime || constants.DEFAULT_FRIDAY_TIME,
      saturdayTime: data.saturdayTime || constants.DEFAULT_SATURDAY_TIME,
      sundayTime: data.sundayTime || constants.DEFAULT_SUNDAY_TIME,

      // Important Notes
      notesTitle: data.notesTitle || constants.DEFAULT_NOTES_TITLE,
      notes: data.notes || constants.DEFAULT_NOTES,

      // Colors
      sectionTitleColor: data.sectionTitleColor || constants.DEFAULT_COLORS.SECTION_TITLE,
      sectionSubtitleColor: data.sectionSubtitleColor || constants.DEFAULT_COLORS.SECTION_SUBTITLE,
      dayTextColor: data.dayTextColor || constants.DEFAULT_COLORS.DAY_TEXT,
      timeTextColor: data.timeTextColor || constants.DEFAULT_COLORS.TIME_TEXT,
      notesTitleColor: data.notesTitleColor || constants.DEFAULT_COLORS.NOTES_TITLE,
      notesTextColor: data.notesTextColor || constants.DEFAULT_COLORS.NOTES_TEXT,
      backgroundColor: data.backgroundColor || constants.DEFAULT_COLORS.BACKGROUND,

      // Fonts
      sectionTitleFontFamily: data.sectionTitleFontFamily || constants.DEFAULT_FONTS.SECTION_TITLE,
      sectionSubtitleFontFamily: data.sectionSubtitleFontFamily || constants.DEFAULT_FONTS.SECTION_SUBTITLE,
      dayTextFontFamily: data.dayTextFontFamily || constants.DEFAULT_FONTS.DAY_TEXT,
      timeTextFontFamily: data.timeTextFontFamily || constants.DEFAULT_FONTS.TIME_TEXT,
      notesTitleFontFamily: data.notesTitleFontFamily || constants.DEFAULT_FONTS.NOTES_TITLE,
      notesTextFontFamily: data.notesTextFontFamily || constants.DEFAULT_FONTS.NOTES_TEXT
    };
  }

  private getDefaultConfig(): SimpleOfficeHoursConfig {
    return this.mapToSimpleConfig({});
  }
}
