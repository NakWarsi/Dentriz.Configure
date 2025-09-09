import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { INSURANCE_PAYMENT_CONSTANTS } from '../constants/insurance-payment.constants';

export interface SimpleInsurancePaymentConfig {
  // Section Content
  sectionTitle: string;
  sectionSubtitle: string;
  
  // Insurance Plans Card
  insuranceIcon: string;
  insuranceTitle: string;
  insuranceDescription: string;
  insuranceItems: string[];
  
  // Payment Options Card
  paymentIcon: string;
  paymentTitle: string;
  paymentDescription: string;
  paymentItems: string[];
  
  // New Patient Special Card
  specialIcon: string;
  specialTitle: string;
  specialDescription: string;
  specialItems: string[];

  // Styling
  sectionTitleColor: string;
  sectionSubtitleColor: string;
  cardTitleColor: string;
  cardDescriptionColor: string;
  cardItemColor: string;
  backgroundColor: string;

  sectionTitleFontFamily: string;
  sectionSubtitleFontFamily: string;
  cardTitleFontFamily: string;
  cardDescriptionFontFamily: string;
  cardItemFontFamily: string;
}

@Injectable({
  providedIn: 'root'
})
export class InsurancePaymentApiService {
  private configUrl = 'http://localhost:5000/api/config/insurance-payment';
  private localStorageKey = 'insurancePaymentConfig';
  private JSON_FILE_PATH = './assets/contact/insurance-payment.json';

  constructor(private http: HttpClient) { }

  loadConfig(): Observable<SimpleInsurancePaymentConfig> {
    // Try to load from local storage first
    const localConfig = this.loadConfigFromLocalStorage();
    if (localConfig) {
      return of(localConfig);
    }

    // For now, directly use constants data instead of trying API
    console.log('Loading insurance payment config from constants');
    const defaultConfig = this.getDefaultConfig();
    this.saveConfigToLocalStorage(defaultConfig);
    return of(defaultConfig);
  }

  saveConfig(config: SimpleInsurancePaymentConfig): Observable<any> {
    this.saveConfigToLocalStorage(config);
    return this.http.post(this.configUrl, config).pipe(
      catchError(error => {
        console.error('Error saving config to API, local storage updated:', error);
        alert('Configuration saved locally, but failed to save to server. Please check the API.');
        return of(null);
      })
    );
  }

  private loadConfigFromLocalStorage(): SimpleInsurancePaymentConfig | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      const configString = localStorage.getItem(this.localStorageKey);
      return configString ? JSON.parse(configString) : null;
    }
    return null;
  }

  private saveConfigToLocalStorage(config: SimpleInsurancePaymentConfig): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(config));
    }
  }

  private loadConfigFromJsonOrDefaults(): Observable<SimpleInsurancePaymentConfig> {
    return this.http.get(this.JSON_FILE_PATH).pipe(
      map((jsonConfig: any) => this.mapToSimpleConfig(jsonConfig)),
      catchError(error => {
        console.error('Error loading config from JSON, falling back to default constants:', error);
        return of(this.getDefaultConfig());
      })
    );
  }

  private mapToSimpleConfig(jsonConfig: any): SimpleInsurancePaymentConfig {
    return {
      // Section Content
      sectionTitle: jsonConfig.sectionTitle || INSURANCE_PAYMENT_CONSTANTS.DEFAULT_SECTION_TITLE,
      sectionSubtitle: jsonConfig.sectionSubtitle || INSURANCE_PAYMENT_CONSTANTS.DEFAULT_SECTION_SUBTITLE,
      
      // Insurance Plans Card
      insuranceIcon: jsonConfig.insuranceIcon || INSURANCE_PAYMENT_CONSTANTS.DEFAULT_INSURANCE_ICON,
      insuranceTitle: jsonConfig.insuranceTitle || INSURANCE_PAYMENT_CONSTANTS.DEFAULT_INSURANCE_TITLE,
      insuranceDescription: jsonConfig.insuranceDescription || INSURANCE_PAYMENT_CONSTANTS.DEFAULT_INSURANCE_DESCRIPTION,
      insuranceItems: jsonConfig.insuranceItems || [...INSURANCE_PAYMENT_CONSTANTS.DEFAULT_INSURANCE_ITEMS],
      
      // Payment Options Card
      paymentIcon: jsonConfig.paymentIcon || INSURANCE_PAYMENT_CONSTANTS.DEFAULT_PAYMENT_ICON,
      paymentTitle: jsonConfig.paymentTitle || INSURANCE_PAYMENT_CONSTANTS.DEFAULT_PAYMENT_TITLE,
      paymentDescription: jsonConfig.paymentDescription || INSURANCE_PAYMENT_CONSTANTS.DEFAULT_PAYMENT_DESCRIPTION,
      paymentItems: jsonConfig.paymentItems || [...INSURANCE_PAYMENT_CONSTANTS.DEFAULT_PAYMENT_ITEMS],
      
      // New Patient Special Card
      specialIcon: jsonConfig.specialIcon || INSURANCE_PAYMENT_CONSTANTS.DEFAULT_SPECIAL_ICON,
      specialTitle: jsonConfig.specialTitle || INSURANCE_PAYMENT_CONSTANTS.DEFAULT_SPECIAL_TITLE,
      specialDescription: jsonConfig.specialDescription || INSURANCE_PAYMENT_CONSTANTS.DEFAULT_SPECIAL_DESCRIPTION,
      specialItems: jsonConfig.specialItems || [...INSURANCE_PAYMENT_CONSTANTS.DEFAULT_SPECIAL_ITEMS],

      // Styling
      sectionTitleColor: jsonConfig.sectionTitleColor || INSURANCE_PAYMENT_CONSTANTS.DEFAULT_COLORS.SECTION_TITLE,
      sectionSubtitleColor: jsonConfig.sectionSubtitleColor || INSURANCE_PAYMENT_CONSTANTS.DEFAULT_COLORS.SECTION_SUBTITLE,
      cardTitleColor: jsonConfig.cardTitleColor || INSURANCE_PAYMENT_CONSTANTS.DEFAULT_COLORS.CARD_TITLE,
      cardDescriptionColor: jsonConfig.cardDescriptionColor || INSURANCE_PAYMENT_CONSTANTS.DEFAULT_COLORS.CARD_DESCRIPTION,
      cardItemColor: jsonConfig.cardItemColor || INSURANCE_PAYMENT_CONSTANTS.DEFAULT_COLORS.CARD_ITEM,
      backgroundColor: jsonConfig.backgroundColor || INSURANCE_PAYMENT_CONSTANTS.DEFAULT_COLORS.BACKGROUND,

      sectionTitleFontFamily: jsonConfig.sectionTitleFontFamily || INSURANCE_PAYMENT_CONSTANTS.DEFAULT_FONTS.SECTION_TITLE,
      sectionSubtitleFontFamily: jsonConfig.sectionSubtitleFontFamily || INSURANCE_PAYMENT_CONSTANTS.DEFAULT_FONTS.SECTION_SUBTITLE,
      cardTitleFontFamily: jsonConfig.cardTitleFontFamily || INSURANCE_PAYMENT_CONSTANTS.DEFAULT_FONTS.CARD_TITLE,
      cardDescriptionFontFamily: jsonConfig.cardDescriptionFontFamily || INSURANCE_PAYMENT_CONSTANTS.DEFAULT_FONTS.CARD_DESCRIPTION,
      cardItemFontFamily: jsonConfig.cardItemFontFamily || INSURANCE_PAYMENT_CONSTANTS.DEFAULT_FONTS.CARD_ITEM
    };
  }

  private getDefaultConfig(): SimpleInsurancePaymentConfig {
    return this.mapToSimpleConfig({});
  }
}
