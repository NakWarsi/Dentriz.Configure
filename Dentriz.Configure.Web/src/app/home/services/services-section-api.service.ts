import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HOME_SERVICES_SECTION_CONSTANTS } from '../constants/home-services-section.constants';
import { servicesData } from '../data/home-services-section.data';

export interface SimpleServicesConfig {
  sectionTitle: string;
  
  // Service 1 - Preventive Care
  service1Title: string;
  service1Items: string[];
  service1ButtonText: string;
  
  // Service 2 - Restorative Care
  service2Title: string;
  service2Items: string[];
  service2ButtonText: string;
  
  // Service 3 - Cosmetic Dentistry
  service3Title: string;
  service3Items: string[];
  service3ButtonText: string;
  
  // Service 4 - Orthodontics
  service4Title: string;
  service4Items: string[];
  service4ButtonText: string;
  
  // Service 5 - Pediatric Dentistry
  service5Title: string;
  service5Items: string[];
  service5ButtonText: string;
  
  // Service 6 - Periodontal Care
  service6Title: string;
  service6Items: string[];
  service6ButtonText: string;
  
  // Service 7 - Oral Surgery
  service7Title: string;
  service7Items: string[];
  service7ButtonText: string;
  
  // Service 8 - Endodontics
  service8Title: string;
  service8Items: string[];
  service8ButtonText: string;
  
  // Service 9 - Emergency Dentistry
  service9Title: string;
  service9Items: string[];
  service9ButtonText: string;
  
  // Individual color options for each element
  sectionTitleColor: string;
  service1TitleColor: string;
  service1ItemsColor: string;
  service1ButtonColor: string;
  service2TitleColor: string;
  service2ItemsColor: string;
  service2ButtonColor: string;
  service3TitleColor: string;
  service3ItemsColor: string;
  service3ButtonColor: string;
  service4TitleColor: string;
  service4ItemsColor: string;
  service4ButtonColor: string;
  service5TitleColor: string;
  service5ItemsColor: string;
  service5ButtonColor: string;
  service6TitleColor: string;
  service6ItemsColor: string;
  service6ButtonColor: string;
  service7TitleColor: string;
  service7ItemsColor: string;
  service7ButtonColor: string;
  service8TitleColor: string;
  service8ItemsColor: string;
  service8ButtonColor: string;
  service9TitleColor: string;
  service9ItemsColor: string;
  service9ButtonColor: string;
  
  // Individual font family options for each element
  sectionTitleFontFamily: string;
  service1TitleFontFamily: string;
  service1ItemsFontFamily: string;
  service1ButtonFontFamily: string;
  service2TitleFontFamily: string;
  service2ItemsFontFamily: string;
  service2ButtonFontFamily: string;
  service3TitleFontFamily: string;
  service3ItemsFontFamily: string;
  service3ButtonFontFamily: string;
  service4TitleFontFamily: string;
  service4ItemsFontFamily: string;
  service4ButtonFontFamily: string;
  service5TitleFontFamily: string;
  service5ItemsFontFamily: string;
  service5ButtonFontFamily: string;
  service6TitleFontFamily: string;
  service6ItemsFontFamily: string;
  service6ButtonFontFamily: string;
  service7TitleFontFamily: string;
  service7ItemsFontFamily: string;
  service7ButtonFontFamily: string;
  service8TitleFontFamily: string;
  service8ItemsFontFamily: string;
  service8ButtonFontFamily: string;
  service9TitleFontFamily: string;
  service9ItemsFontFamily: string;
  service9ButtonFontFamily: string;
  
  // Global styling options
  backgroundColor: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServicesSectionApiService {
  constructor() {}

  /**
   * Load configuration from JSON file
   */
  loadConfig(): Observable<SimpleServicesConfig> {
    console.log('📥 Loading services config from static data');
    
    return of(servicesData).pipe(
        map((data: any) => {
          console.log('✅ Services config loaded successfully:', data);
          // Transform to SimpleServicesConfig format
          return {
            sectionTitle: data.sectionTitle || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SECTION_TITLE,
            
            // Service 1
            service1Title: data.service1Title || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE1_TITLE,
            service1Items: data.service1Items || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE1_ITEMS,
            service1ButtonText: data.service1ButtonText || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE1_BUTTON_TEXT,
            
            // Service 2
            service2Title: data.service2Title || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE2_TITLE,
            service2Items: data.service2Items || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE2_ITEMS,
            service2ButtonText: data.service2ButtonText || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE2_BUTTON_TEXT,
            
            // Service 3
            service3Title: data.service3Title || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE3_TITLE,
            service3Items: data.service3Items || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE3_ITEMS,
            service3ButtonText: data.service3ButtonText || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE3_BUTTON_TEXT,
            
            // Service 4
            service4Title: data.service4Title || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE4_TITLE,
            service4Items: data.service4Items || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE4_ITEMS,
            service4ButtonText: data.service4ButtonText || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE4_BUTTON_TEXT,
            
            // Service 5
            service5Title: data.service5Title || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE5_TITLE,
            service5Items: data.service5Items || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE5_ITEMS,
            service5ButtonText: data.service5ButtonText || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE5_BUTTON_TEXT,
            
            // Service 6
            service6Title: data.service6Title || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE6_TITLE,
            service6Items: data.service6Items || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE6_ITEMS,
            service6ButtonText: data.service6ButtonText || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE6_BUTTON_TEXT,
            
            // Service 7
            service7Title: data.service7Title || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE7_TITLE,
            service7Items: data.service7Items || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE7_ITEMS,
            service7ButtonText: data.service7ButtonText || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE7_BUTTON_TEXT,
            
            // Service 8
            service8Title: data.service8Title || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE8_TITLE,
            service8Items: data.service8Items || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE8_ITEMS,
            service8ButtonText: data.service8ButtonText || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE8_BUTTON_TEXT,
            
            // Service 9
            service9Title: data.service9Title || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE9_TITLE,
            service9Items: data.service9Items || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE9_ITEMS,
            service9ButtonText: data.service9ButtonText || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_SERVICE9_BUTTON_TEXT,
            
            // Individual color options with defaults from constants
            sectionTitleColor: data.sectionTitleColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SECTION_TITLE,
            service1TitleColor: data.service1TitleColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE1_TITLE,
            service1ItemsColor: data.service1ItemsColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE1_ITEMS,
            service1ButtonColor: data.service1ButtonColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE1_BUTTON,
            service2TitleColor: data.service2TitleColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE2_TITLE,
            service2ItemsColor: data.service2ItemsColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE2_ITEMS,
            service2ButtonColor: data.service2ButtonColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE2_BUTTON,
            service3TitleColor: data.service3TitleColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE3_TITLE,
            service3ItemsColor: data.service3ItemsColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE3_ITEMS,
            service3ButtonColor: data.service3ButtonColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE3_BUTTON,
            service4TitleColor: data.service4TitleColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE4_TITLE,
            service4ItemsColor: data.service4ItemsColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE4_ITEMS,
            service4ButtonColor: data.service4ButtonColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE4_BUTTON,
            service5TitleColor: data.service5TitleColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE5_TITLE,
            service5ItemsColor: data.service5ItemsColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE5_ITEMS,
            service5ButtonColor: data.service5ButtonColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE5_BUTTON,
            service6TitleColor: data.service6TitleColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE6_TITLE,
            service6ItemsColor: data.service6ItemsColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE6_ITEMS,
            service6ButtonColor: data.service6ButtonColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE6_BUTTON,
            service7TitleColor: data.service7TitleColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE7_TITLE,
            service7ItemsColor: data.service7ItemsColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE7_ITEMS,
            service7ButtonColor: data.service7ButtonColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE7_BUTTON,
            service8TitleColor: data.service8TitleColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE8_TITLE,
            service8ItemsColor: data.service8ItemsColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE8_ITEMS,
            service8ButtonColor: data.service8ButtonColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE8_BUTTON,
            service9TitleColor: data.service9TitleColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE9_TITLE,
            service9ItemsColor: data.service9ItemsColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE9_ITEMS,
            service9ButtonColor: data.service9ButtonColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.SERVICE9_BUTTON,
            
            // Individual font family options with defaults from constants
            sectionTitleFontFamily: data.sectionTitleFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SECTION_TITLE,
            service1TitleFontFamily: data.service1TitleFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE1_TITLE,
            service1ItemsFontFamily: data.service1ItemsFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE1_ITEMS,
            service1ButtonFontFamily: data.service1ButtonFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE1_BUTTON,
            service2TitleFontFamily: data.service2TitleFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE2_TITLE,
            service2ItemsFontFamily: data.service2ItemsFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE2_ITEMS,
            service2ButtonFontFamily: data.service2ButtonFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE2_BUTTON,
            service3TitleFontFamily: data.service3TitleFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE3_TITLE,
            service3ItemsFontFamily: data.service3ItemsFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE3_ITEMS,
            service3ButtonFontFamily: data.service3ButtonFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE3_BUTTON,
            service4TitleFontFamily: data.service4TitleFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE4_TITLE,
            service4ItemsFontFamily: data.service4ItemsFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE4_ITEMS,
            service4ButtonFontFamily: data.service4ButtonFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE4_BUTTON,
            service5TitleFontFamily: data.service5TitleFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE5_TITLE,
            service5ItemsFontFamily: data.service5ItemsFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE5_ITEMS,
            service5ButtonFontFamily: data.service5ButtonFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE5_BUTTON,
            service6TitleFontFamily: data.service6TitleFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE6_TITLE,
            service6ItemsFontFamily: data.service6ItemsFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE6_ITEMS,
            service6ButtonFontFamily: data.service6ButtonFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE6_BUTTON,
            service7TitleFontFamily: data.service7TitleFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE7_TITLE,
            service7ItemsFontFamily: data.service7ItemsFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE7_ITEMS,
            service7ButtonFontFamily: data.service7ButtonFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE7_BUTTON,
            service8TitleFontFamily: data.service8TitleFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE8_TITLE,
            service8ItemsFontFamily: data.service8ItemsFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE8_ITEMS,
            service8ButtonFontFamily: data.service8ButtonFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE8_BUTTON,
            service9TitleFontFamily: data.service9TitleFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE9_TITLE,
            service9ItemsFontFamily: data.service9ItemsFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE9_ITEMS,
            service9ButtonFontFamily: data.service9ButtonFontFamily || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_FONTS.SERVICE9_BUTTON,
            
            // Global styling options with defaults from constants
            backgroundColor: data.backgroundColor || HOME_SERVICES_SECTION_CONSTANTS.DEFAULT_COLORS.BACKGROUND
          };
        })
    );
  }
}
