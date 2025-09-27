import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HOME_REASONS_SECTION_CONSTANTS } from '../constants/home-reasons-section.constants';
import { reasonsData } from '../data/home-reasons-section.data';

export interface SimpleReasonsConfig {
  sectionTitle: string;
  sectionIntro: string;
  
  // Reason 1
  reason1Icon: string;
  reason1Title: string;
  reason1Items: string[];
  
  // Reason 2
  reason2Icon: string;
  reason2Title: string;
  reason2Items: string[];
  
  // Reason 3
  reason3Icon: string;
  reason3Title: string;
  reason3Items: string[];
  
  // Reason 4
  reason4Icon: string;
  reason4Title: string;
  reason4Items: string[];
  
  // Reason 5
  reason5Icon: string;
  reason5Title: string;
  reason5Items: string[];
  
  // Reason 6
  reason6Icon: string;
  reason6Title: string;
  reason6Items: string[];
  
  // Individual color options for each element
  sectionTitleColor: string;
  sectionIntroColor: string;
  reason1TitleColor: string;
  reason1ItemsColor: string;
  reason2TitleColor: string;
  reason2ItemsColor: string;
  reason3TitleColor: string;
  reason3ItemsColor: string;
  reason4TitleColor: string;
  reason4ItemsColor: string;
  reason5TitleColor: string;
  reason5ItemsColor: string;
  reason6TitleColor: string;
  reason6ItemsColor: string;
  
  // Individual font family options for each element
  sectionTitleFontFamily: string;
  sectionIntroFontFamily: string;
  reason1TitleFontFamily: string;
  reason1ItemsFontFamily: string;
  reason2TitleFontFamily: string;
  reason2ItemsFontFamily: string;
  reason3TitleFontFamily: string;
  reason3ItemsFontFamily: string;
  reason4TitleFontFamily: string;
  reason4ItemsFontFamily: string;
  reason5TitleFontFamily: string;
  reason5ItemsFontFamily: string;
  reason6TitleFontFamily: string;
  reason6ItemsFontFamily: string;
  
  // Global styling options
  backgroundColor: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReasonsSectionApiService {
  constructor() {}

  /**
   * Load configuration from JSON file
   */
  loadConfig(): Observable<SimpleReasonsConfig> {
    console.log('📥 Loading reasons config from static data');
    
    return of(reasonsData).pipe(
        map((data: any) => {
          console.log('✅ Reasons config loaded successfully:', data);
          // Transform to SimpleReasonsConfig format
          return {
            sectionTitle: data.sectionTitle || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_SECTION_TITLE,
            sectionIntro: data.sectionIntro || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_SECTION_INTRO,
            
            // Reason 1
            reason1Icon: data.reason1Icon || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON1_ICON,
            reason1Title: data.reason1Title || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON1_TITLE,
            reason1Items: data.reason1Items || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON1_ITEMS,
            
            // Reason 2
            reason2Icon: data.reason2Icon || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON2_ICON,
            reason2Title: data.reason2Title || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON2_TITLE,
            reason2Items: data.reason2Items || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON2_ITEMS,
            
            // Reason 3
            reason3Icon: data.reason3Icon || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON3_ICON,
            reason3Title: data.reason3Title || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON3_TITLE,
            reason3Items: data.reason3Items || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON3_ITEMS,
            
            // Reason 4
            reason4Icon: data.reason4Icon || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON4_ICON,
            reason4Title: data.reason4Title || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON4_TITLE,
            reason4Items: data.reason4Items || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON4_ITEMS,
            
            // Reason 5
            reason5Icon: data.reason5Icon || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON5_ICON,
            reason5Title: data.reason5Title || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON5_TITLE,
            reason5Items: data.reason5Items || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON5_ITEMS,
            
            // Reason 6
            reason6Icon: data.reason6Icon || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON6_ICON,
            reason6Title: data.reason6Title || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON6_TITLE,
            reason6Items: data.reason6Items || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_REASON6_ITEMS,
            
            // Individual color options with defaults from constants
            sectionTitleColor: data.sectionTitleColor || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_COLORS.SECTION_TITLE,
            sectionIntroColor: data.sectionIntroColor || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_COLORS.SECTION_INTRO,
            reason1TitleColor: data.reason1TitleColor || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_COLORS.REASON1_TITLE,
            reason1ItemsColor: data.reason1ItemsColor || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_COLORS.REASON1_ITEMS,
            reason2TitleColor: data.reason2TitleColor || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_COLORS.REASON2_TITLE,
            reason2ItemsColor: data.reason2ItemsColor || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_COLORS.REASON2_ITEMS,
            reason3TitleColor: data.reason3TitleColor || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_COLORS.REASON3_TITLE,
            reason3ItemsColor: data.reason3ItemsColor || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_COLORS.REASON3_ITEMS,
            reason4TitleColor: data.reason4TitleColor || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_COLORS.REASON4_TITLE,
            reason4ItemsColor: data.reason4ItemsColor || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_COLORS.REASON4_ITEMS,
            reason5TitleColor: data.reason5TitleColor || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_COLORS.REASON5_TITLE,
            reason5ItemsColor: data.reason5ItemsColor || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_COLORS.REASON5_ITEMS,
            reason6TitleColor: data.reason6TitleColor || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_COLORS.REASON6_TITLE,
            reason6ItemsColor: data.reason6ItemsColor || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_COLORS.REASON6_ITEMS,
            
            // Individual font family options with defaults from constants
            sectionTitleFontFamily: data.sectionTitleFontFamily || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_FONTS.SECTION_TITLE,
            sectionIntroFontFamily: data.sectionIntroFontFamily || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_FONTS.SECTION_INTRO,
            reason1TitleFontFamily: data.reason1TitleFontFamily || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_FONTS.REASON1_TITLE,
            reason1ItemsFontFamily: data.reason1ItemsFontFamily || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_FONTS.REASON1_ITEMS,
            reason2TitleFontFamily: data.reason2TitleFontFamily || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_FONTS.REASON2_TITLE,
            reason2ItemsFontFamily: data.reason2ItemsFontFamily || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_FONTS.REASON2_ITEMS,
            reason3TitleFontFamily: data.reason3TitleFontFamily || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_FONTS.REASON3_TITLE,
            reason3ItemsFontFamily: data.reason3ItemsFontFamily || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_FONTS.REASON3_ITEMS,
            reason4TitleFontFamily: data.reason4TitleFontFamily || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_FONTS.REASON4_TITLE,
            reason4ItemsFontFamily: data.reason4ItemsFontFamily || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_FONTS.REASON4_ITEMS,
            reason5TitleFontFamily: data.reason5TitleFontFamily || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_FONTS.REASON5_TITLE,
            reason5ItemsFontFamily: data.reason5ItemsFontFamily || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_FONTS.REASON5_ITEMS,
            reason6TitleFontFamily: data.reason6TitleFontFamily || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_FONTS.REASON6_TITLE,
            reason6ItemsFontFamily: data.reason6ItemsFontFamily || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_FONTS.REASON6_ITEMS,
            
            // Global styling options with defaults from constants
            backgroundColor: data.backgroundColor || HOME_REASONS_SECTION_CONSTANTS.DEFAULT_COLORS.BACKGROUND
          };
        })
    );
  }
}
