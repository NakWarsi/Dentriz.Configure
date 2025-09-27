import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HOME_FOUNDER_SECTION_CONSTANTS } from '../constants/home-founder-section.constants';
import { founderData } from '../data/home-founder-section.data';

export interface SimpleFounderConfig {
  subtitle: string;
  doctorName: string;
  title: string;
  description: string;
  specialties: string[];
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

  constructor() {}

  /**
   * Load configuration from static JSON data
   */
  loadConfig(): Observable<SimpleFounderConfig> {
    console.log('📥 Loading founder config from static data');
    
    // Return the static JSON data as an Observable
    return of(founderData).pipe(
      map((data: any) => {
        console.log('✅ Founder config loaded successfully:', data);
        // Transform to SimpleFounderConfig format
        return {
          subtitle: data.subtitle || 'Know your Doctor',
          doctorName: data.doctorName || 'Dr. Akash Mankar',
          title: data.title || 'Founder & Chief Dentist',
          description: data.description || 'A proud graduate of Government Dental College, Mumbai — one of the most prestigious dental institutions in India. With around 10 years of experience, Dr. Mankar has honed his expertise in a wide range of specialties including:',
          specialties: data.specialties || [
            'Cosmetic dentistry',
            'Dental implants',
            'Smile designing',
            'Root canal treatments',
            'Full-mouth rehabilitation',
            'Preventive care',
            'Pediatric dentistry'
          ],
          mission: data.mission || 'Dr. Mankar\'s mission is not just to treat dental concerns but to help patients achieve lifelong oral health, confidence, and beautiful smiles.',
          imageSrc: data.image?.src || '/images/home/dr-rizwana-khan-c1.jpg?v=2',
          imageAlt: data.image?.alt || 'Dr. Akash Mankar - Founder & Chief Dentist',
          imageName: data.image?.name || 'Dr. Akash Mankar',
          credentials: data.image?.credentials || '(BDS. Govt. Dental College, Mumbai)',
          philosophyTitle: data.philosophy?.title || 'Our Philosophy:',
          philosophyContent: data.philosophy?.content || '"ClinSmile Dental Clinic was built on the belief that dentistry should be modern, compassionate, and patient-focused. Our philosophy is to combine cutting-edge technology with a human touch, ensuring every patient receives the highest standard of care. We strive to create smiles that are not only healthy but also filled with confidence and happiness."',
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
      })
    );
  }

}
