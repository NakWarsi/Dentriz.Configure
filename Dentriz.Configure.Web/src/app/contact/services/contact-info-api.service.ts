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
  private get configUrl(): string {
    return this.apiConfig.getEndpointUrl('ContactInfo');
  }
  private localStorageKey = 'contactInfoConfig';

  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService
  ) { }

  loadConfig(): Observable<SimpleContactInfoConfig> {
    // Try to load from local storage first
    const localConfig = this.loadConfigFromLocalStorage();
    if (localConfig) {
      return of(localConfig);
    }

    // Try to load from API
    console.log('Loading contact info config from API:', this.configUrl);
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

  saveConfig(config: SimpleContactInfoConfig): Observable<any> {
    this.saveConfigToLocalStorage(config);
    const apiConfig = this.mapSimpleConfigToApiConfig(config);
    
    console.log('Saving contact info config to API:', apiConfig);
    
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

  private mapApiConfigToSimpleConfig(apiConfig: any): SimpleContactInfoConfig {
    const constants = CONTACT_INFO_CONSTANTS;
    
    return {
      // Phone Card
      phoneTitle: apiConfig.phoneTitle || constants.DEFAULT_PHONE_TITLE,
      phoneNote: apiConfig.phoneNote || constants.DEFAULT_PHONE_NOTE,
      phoneButtonText: apiConfig.phoneButtonText || constants.DEFAULT_PHONE_BUTTON_TEXT,
      phoneNumber: apiConfig.phoneNumber || constants.DEFAULT_PHONE_NUMBER,

      // Email Card
      emailTitle: apiConfig.emailTitle || constants.DEFAULT_EMAIL_TITLE,
      emailNote: apiConfig.emailNote || constants.DEFAULT_EMAIL_NOTE,
      emailButtonText: apiConfig.emailButtonText || constants.DEFAULT_EMAIL_BUTTON_TEXT,
      emailAddress: apiConfig.emailAddress || constants.DEFAULT_EMAIL_ADDRESS,

      // Address Card
      addressTitle: apiConfig.addressTitle || constants.DEFAULT_ADDRESS_TITLE,
      addressNote: apiConfig.addressNote || constants.DEFAULT_ADDRESS_NOTE,
      addressButtonText: apiConfig.addressButtonText || constants.DEFAULT_ADDRESS_BUTTON_TEXT,
      addressLink: apiConfig.addressLink || constants.DEFAULT_ADDRESS_LINK,

      // Emergency Card
      emergencyTitle: apiConfig.emergencyTitle || constants.DEFAULT_EMERGENCY_TITLE,
      emergencyNote: apiConfig.emergencyNote || constants.DEFAULT_EMERGENCY_NOTE,
      emergencyButtonText: apiConfig.emergencyButtonText || constants.DEFAULT_EMERGENCY_BUTTON_TEXT,
      emergencyNumber: apiConfig.emergencyNumber || constants.DEFAULT_EMERGENCY_NUMBER,

      // Colors
      phoneTitleColor: apiConfig.phoneTitleColor || constants.DEFAULT_COLORS.PHONE_TITLE,
      phoneNoteColor: apiConfig.phoneNoteColor || constants.DEFAULT_COLORS.PHONE_NOTE,
      phoneButtonColor: apiConfig.phoneButtonColor || constants.DEFAULT_COLORS.PHONE_BUTTON,
      emailTitleColor: apiConfig.emailTitleColor || constants.DEFAULT_COLORS.EMAIL_TITLE,
      emailNoteColor: apiConfig.emailNoteColor || constants.DEFAULT_COLORS.EMAIL_NOTE,
      emailButtonColor: apiConfig.emailButtonColor || constants.DEFAULT_COLORS.EMAIL_BUTTON,
      addressTitleColor: apiConfig.addressTitleColor || constants.DEFAULT_COLORS.ADDRESS_TITLE,
      addressNoteColor: apiConfig.addressNoteColor || constants.DEFAULT_COLORS.ADDRESS_NOTE,
      addressButtonColor: apiConfig.addressButtonColor || constants.DEFAULT_COLORS.ADDRESS_BUTTON,
      emergencyTitleColor: apiConfig.emergencyTitleColor || constants.DEFAULT_COLORS.EMERGENCY_TITLE,
      emergencyNoteColor: apiConfig.emergencyNoteColor || constants.DEFAULT_COLORS.EMERGENCY_NOTE,
      emergencyButtonColor: apiConfig.emergencyButtonColor || constants.DEFAULT_COLORS.EMERGENCY_BUTTON,
      backgroundColor: apiConfig.backgroundColor || constants.DEFAULT_COLORS.BACKGROUND,

      // Fonts
      phoneTitleFontFamily: apiConfig.phoneTitleFontFamily || constants.DEFAULT_FONTS.PHONE_TITLE,
      phoneNoteFontFamily: apiConfig.phoneNoteFontFamily || constants.DEFAULT_FONTS.PHONE_NOTE,
      phoneButtonFontFamily: apiConfig.phoneButtonFontFamily || constants.DEFAULT_FONTS.PHONE_BUTTON,
      emailTitleFontFamily: apiConfig.emailTitleFontFamily || constants.DEFAULT_FONTS.EMAIL_TITLE,
      emailNoteFontFamily: apiConfig.emailNoteFontFamily || constants.DEFAULT_FONTS.EMAIL_NOTE,
      emailButtonFontFamily: apiConfig.emailButtonFontFamily || constants.DEFAULT_FONTS.EMAIL_BUTTON,
      addressTitleFontFamily: apiConfig.addressTitleFontFamily || constants.DEFAULT_FONTS.ADDRESS_TITLE,
      addressNoteFontFamily: apiConfig.addressNoteFontFamily || constants.DEFAULT_FONTS.ADDRESS_NOTE,
      addressButtonFontFamily: apiConfig.addressButtonFontFamily || constants.DEFAULT_FONTS.ADDRESS_BUTTON,
      emergencyTitleFontFamily: apiConfig.emergencyTitleFontFamily || constants.DEFAULT_FONTS.EMERGENCY_TITLE,
      emergencyNoteFontFamily: apiConfig.emergencyNoteFontFamily || constants.DEFAULT_FONTS.EMERGENCY_NOTE,
      emergencyButtonFontFamily: apiConfig.emergencyButtonFontFamily || constants.DEFAULT_FONTS.EMERGENCY_BUTTON
    };
  }

  private mapSimpleConfigToApiConfig(simpleConfig: SimpleContactInfoConfig): any {
    return {
      phoneTitle: simpleConfig.phoneTitle,
      phoneNote: simpleConfig.phoneNote,
      phoneButtonText: simpleConfig.phoneButtonText,
      phoneNumber: simpleConfig.phoneNumber,
      emailTitle: simpleConfig.emailTitle,
      emailNote: simpleConfig.emailNote,
      emailButtonText: simpleConfig.emailButtonText,
      emailAddress: simpleConfig.emailAddress,
      addressTitle: simpleConfig.addressTitle,
      addressNote: simpleConfig.addressNote,
      addressButtonText: simpleConfig.addressButtonText,
      addressLink: simpleConfig.addressLink,
      emergencyTitle: simpleConfig.emergencyTitle,
      emergencyNote: simpleConfig.emergencyNote,
      emergencyButtonText: simpleConfig.emergencyButtonText,
      emergencyNumber: simpleConfig.emergencyNumber,
      phoneTitleColor: simpleConfig.phoneTitleColor,
      phoneNoteColor: simpleConfig.phoneNoteColor,
      phoneButtonColor: simpleConfig.phoneButtonColor,
      emailTitleColor: simpleConfig.emailTitleColor,
      emailNoteColor: simpleConfig.emailNoteColor,
      emailButtonColor: simpleConfig.emailButtonColor,
      addressTitleColor: simpleConfig.addressTitleColor,
      addressNoteColor: simpleConfig.addressNoteColor,
      addressButtonColor: simpleConfig.addressButtonColor,
      emergencyTitleColor: simpleConfig.emergencyTitleColor,
      emergencyNoteColor: simpleConfig.emergencyNoteColor,
      emergencyButtonColor: simpleConfig.emergencyButtonColor,
      backgroundColor: simpleConfig.backgroundColor,
      phoneTitleFontFamily: simpleConfig.phoneTitleFontFamily,
      phoneNoteFontFamily: simpleConfig.phoneNoteFontFamily,
      phoneButtonFontFamily: simpleConfig.phoneButtonFontFamily,
      emailTitleFontFamily: simpleConfig.emailTitleFontFamily,
      emailNoteFontFamily: simpleConfig.emailNoteFontFamily,
      emailButtonFontFamily: simpleConfig.emailButtonFontFamily,
      addressTitleFontFamily: simpleConfig.addressTitleFontFamily,
      addressNoteFontFamily: simpleConfig.addressNoteFontFamily,
      addressButtonFontFamily: simpleConfig.addressButtonFontFamily,
      emergencyTitleFontFamily: simpleConfig.emergencyTitleFontFamily,
      emergencyNoteFontFamily: simpleConfig.emergencyNoteFontFamily,
      emergencyButtonFontFamily: simpleConfig.emergencyButtonFontFamily
    };
  }
}
