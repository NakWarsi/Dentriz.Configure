import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { CONTACT_INFO_CONSTANTS } from '../constants/contact-info.constants';

export interface SimpleContactInfoConfig {
  // Phone Card
  phoneTitle: string;
  phoneNote: string;
  phoneButtonText: string;
  phoneNumber: string;

  // Email Card
  emailTitle: string;
  emailNote: string;
  emailButtonText: string;
  emailAddress: string;

  // Address Card
  addressTitle: string;
  addressNote: string;
  addressButtonText: string;
  addressLink: string;

  // Emergency Card
  emergencyTitle: string;
  emergencyNote: string;
  emergencyButtonText: string;
  emergencyNumber: string;

  // Colors
  phoneTitleColor: string;
  phoneNoteColor: string;
  phoneButtonColor: string;
  emailTitleColor: string;
  emailNoteColor: string;
  emailButtonColor: string;
  addressTitleColor: string;
  addressNoteColor: string;
  addressButtonColor: string;
  emergencyTitleColor: string;
  emergencyNoteColor: string;
  emergencyButtonColor: string;
  backgroundColor: string;

  // Fonts
  phoneTitleFontFamily: string;
  phoneNoteFontFamily: string;
  phoneButtonFontFamily: string;
  emailTitleFontFamily: string;
  emailNoteFontFamily: string;
  emailButtonFontFamily: string;
  addressTitleFontFamily: string;
  addressNoteFontFamily: string;
  addressButtonFontFamily: string;
  emergencyTitleFontFamily: string;
  emergencyNoteFontFamily: string;
  emergencyButtonFontFamily: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactInfoApiService {
  private configUrl = 'http://localhost:5000/api/config/contact-info';
  private localStorageKey = 'contactInfoConfig';

  constructor(private http: HttpClient) { }

  loadConfig(): Observable<SimpleContactInfoConfig> {
    // Try to load from local storage first
    const localConfig = this.loadConfigFromLocalStorage();
    if (localConfig) {
      return of(localConfig);
    }

    // For now, directly use constants data instead of trying API
    console.log('Loading contact info config from constants');
    const defaultConfig = this.getDefaultConfig();
    this.saveConfigToLocalStorage(defaultConfig);
    return of(defaultConfig);
  }

  saveConfig(config: SimpleContactInfoConfig): Observable<any> {
    this.saveConfigToLocalStorage(config);
    return this.http.post(this.configUrl, config).pipe(
      catchError(error => {
        console.error('Error saving config to API, local storage updated:', error);
        alert('Configuration saved locally, but failed to save to server. Please check the API.');
        return of(null); // Return an observable to complete the stream
      })
    );
  }

  private loadConfigFromLocalStorage(): SimpleContactInfoConfig | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      const configString = localStorage.getItem(this.localStorageKey);
      return configString ? JSON.parse(configString) : null;
    }
    return null;
  }

  private saveConfigToLocalStorage(config: SimpleContactInfoConfig): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(config));
    }
  }

  private loadConfigFromJsonOrDefaults(): Observable<SimpleContactInfoConfig> {
    return this.http.get<any>('./assets/contact/contact-info.json').pipe(
      map(data => this.mapToSimpleConfig(data)),
      catchError(error => {
        console.error('Error loading config from JSON, falling back to default constants:', error);
        return of(this.getDefaultConfig());
      })
    );
  }

  private mapToSimpleConfig(data: any): SimpleContactInfoConfig {
    const constants = CONTACT_INFO_CONSTANTS;
    
    return {
      // Phone Card
      phoneTitle: data.phoneTitle || constants.DEFAULT_PHONE_TITLE,
      phoneNote: data.phoneNote || constants.DEFAULT_PHONE_NOTE,
      phoneButtonText: data.phoneButtonText || constants.DEFAULT_PHONE_BUTTON_TEXT,
      phoneNumber: data.phoneNumber || constants.DEFAULT_PHONE_NUMBER,

      // Email Card
      emailTitle: data.emailTitle || constants.DEFAULT_EMAIL_TITLE,
      emailNote: data.emailNote || constants.DEFAULT_EMAIL_NOTE,
      emailButtonText: data.emailButtonText || constants.DEFAULT_EMAIL_BUTTON_TEXT,
      emailAddress: data.emailAddress || constants.DEFAULT_EMAIL_ADDRESS,

      // Address Card
      addressTitle: data.addressTitle || constants.DEFAULT_ADDRESS_TITLE,
      addressNote: data.addressNote || constants.DEFAULT_ADDRESS_NOTE,
      addressButtonText: data.addressButtonText || constants.DEFAULT_ADDRESS_BUTTON_TEXT,
      addressLink: data.addressLink || constants.DEFAULT_ADDRESS_LINK,

      // Emergency Card
      emergencyTitle: data.emergencyTitle || constants.DEFAULT_EMERGENCY_TITLE,
      emergencyNote: data.emergencyNote || constants.DEFAULT_EMERGENCY_NOTE,
      emergencyButtonText: data.emergencyButtonText || constants.DEFAULT_EMERGENCY_BUTTON_TEXT,
      emergencyNumber: data.emergencyNumber || constants.DEFAULT_EMERGENCY_NUMBER,

      // Colors
      phoneTitleColor: data.phoneTitleColor || constants.DEFAULT_COLORS.PHONE_TITLE,
      phoneNoteColor: data.phoneNoteColor || constants.DEFAULT_COLORS.PHONE_NOTE,
      phoneButtonColor: data.phoneButtonColor || constants.DEFAULT_COLORS.PHONE_BUTTON,
      emailTitleColor: data.emailTitleColor || constants.DEFAULT_COLORS.EMAIL_TITLE,
      emailNoteColor: data.emailNoteColor || constants.DEFAULT_COLORS.EMAIL_NOTE,
      emailButtonColor: data.emailButtonColor || constants.DEFAULT_COLORS.EMAIL_BUTTON,
      addressTitleColor: data.addressTitleColor || constants.DEFAULT_COLORS.ADDRESS_TITLE,
      addressNoteColor: data.addressNoteColor || constants.DEFAULT_COLORS.ADDRESS_NOTE,
      addressButtonColor: data.addressButtonColor || constants.DEFAULT_COLORS.ADDRESS_BUTTON,
      emergencyTitleColor: data.emergencyTitleColor || constants.DEFAULT_COLORS.EMERGENCY_TITLE,
      emergencyNoteColor: data.emergencyNoteColor || constants.DEFAULT_COLORS.EMERGENCY_NOTE,
      emergencyButtonColor: data.emergencyButtonColor || constants.DEFAULT_COLORS.EMERGENCY_BUTTON,
      backgroundColor: data.backgroundColor || constants.DEFAULT_COLORS.BACKGROUND,

      // Fonts
      phoneTitleFontFamily: data.phoneTitleFontFamily || constants.DEFAULT_FONTS.PHONE_TITLE,
      phoneNoteFontFamily: data.phoneNoteFontFamily || constants.DEFAULT_FONTS.PHONE_NOTE,
      phoneButtonFontFamily: data.phoneButtonFontFamily || constants.DEFAULT_FONTS.PHONE_BUTTON,
      emailTitleFontFamily: data.emailTitleFontFamily || constants.DEFAULT_FONTS.EMAIL_TITLE,
      emailNoteFontFamily: data.emailNoteFontFamily || constants.DEFAULT_FONTS.EMAIL_NOTE,
      emailButtonFontFamily: data.emailButtonFontFamily || constants.DEFAULT_FONTS.EMAIL_BUTTON,
      addressTitleFontFamily: data.addressTitleFontFamily || constants.DEFAULT_FONTS.ADDRESS_TITLE,
      addressNoteFontFamily: data.addressNoteFontFamily || constants.DEFAULT_FONTS.ADDRESS_NOTE,
      addressButtonFontFamily: data.addressButtonFontFamily || constants.DEFAULT_FONTS.ADDRESS_BUTTON,
      emergencyTitleFontFamily: data.emergencyTitleFontFamily || constants.DEFAULT_FONTS.EMERGENCY_TITLE,
      emergencyNoteFontFamily: data.emergencyNoteFontFamily || constants.DEFAULT_FONTS.EMERGENCY_NOTE,
      emergencyButtonFontFamily: data.emergencyButtonFontFamily || constants.DEFAULT_FONTS.EMERGENCY_BUTTON
    };
  }

  private getDefaultConfig(): SimpleContactInfoConfig {
    return this.mapToSimpleConfig({});
  }
}
