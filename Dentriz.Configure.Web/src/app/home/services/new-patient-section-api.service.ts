import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HOME_NEW_PATIENT_SECTION_CONSTANTS } from '../constants/home-new-patient-section.constants';
import { newPatientData } from '../data/home-new-patient-section.data';

export interface SimpleNewPatientConfig {
  mainTitle: string;
  addressTitle: string;
  addressContent: string;
  parkingTitle: string;
  parkingContent: string;
  transitTitle: string;
  transitContent: string;
  metroTitle: string;
  metroContent: string;
  accessibilityTitle: string;
  accessibilityContent: string;
  hoursTitle: string;
  hoursContent: string;
  safetyTitle: string;
  safetyContent: string;
  buttonText: string;
  mapTitle: string;
  locationText: string;
  hoursText: string;
  directionsText: string;
  
  // Individual color options for each element
  mainTitleColor: string;
  addressTitleColor: string;
  addressContentColor: string;
  parkingTitleColor: string;
  parkingContentColor: string;
  transitTitleColor: string;
  transitContentColor: string;
  metroTitleColor: string;
  metroContentColor: string;
  accessibilityTitleColor: string;
  accessibilityContentColor: string;
  hoursTitleColor: string;
  hoursContentColor: string;
  safetyTitleColor: string;
  safetyContentColor: string;
  buttonTextColor: string;
  mapTitleColor: string;
  locationTextColor: string;
  hoursTextColor: string;
  directionsTextColor: string;
  
  // Individual font family options for each element
  mainTitleFontFamily: string;
  addressTitleFontFamily: string;
  addressContentFontFamily: string;
  parkingTitleFontFamily: string;
  parkingContentFontFamily: string;
  transitTitleFontFamily: string;
  transitContentFontFamily: string;
  metroTitleFontFamily: string;
  metroContentFontFamily: string;
  accessibilityTitleFontFamily: string;
  accessibilityContentFontFamily: string;
  hoursTitleFontFamily: string;
  hoursContentFontFamily: string;
  safetyTitleFontFamily: string;
  safetyContentFontFamily: string;
  buttonTextFontFamily: string;
  mapTitleFontFamily: string;
  locationTextFontFamily: string;
  hoursTextFontFamily: string;
  directionsTextFontFamily: string;
  
  // Global styling options
  backgroundColor: string;
}

@Injectable({
  providedIn: 'root'
})
export class NewPatientSectionApiService {
  constructor() {}

  /**
   * Load configuration from JSON file
   */
  loadConfig(): Observable<SimpleNewPatientConfig> {
    console.log('📥 Loading new patient config from static data');
    
    return of(newPatientData).pipe(
        map((data: any) => {
          console.log('✅ New patient config loaded successfully:', data);
          // Transform to SimpleNewPatientConfig format
          return {
            mainTitle: data.mainTitle || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_MAIN_TITLE,
            addressTitle: data.addressTitle || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_ADDRESS_TITLE,
            addressContent: data.addressContent || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_ADDRESS_CONTENT,
            parkingTitle: data.parkingTitle || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_PARKING_TITLE,
            parkingContent: data.parkingContent || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_PARKING_CONTENT,
            transitTitle: data.transitTitle || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_TRANSIT_TITLE,
            transitContent: data.transitContent || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_TRANSIT_CONTENT,
            metroTitle: data.metroTitle || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_METRO_TITLE,
            metroContent: data.metroContent || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_METRO_CONTENT,
            accessibilityTitle: data.accessibilityTitle || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_ACCESSIBILITY_TITLE,
            accessibilityContent: data.accessibilityContent || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_ACCESSIBILITY_CONTENT,
            hoursTitle: data.hoursTitle || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_HOURS_TITLE,
            hoursContent: data.hoursContent || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_HOURS_CONTENT,
            safetyTitle: data.safetyTitle || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_SAFETY_TITLE,
            safetyContent: data.safetyContent || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_SAFETY_CONTENT,
            buttonText: data.buttonText || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_BUTTON_TEXT,
            mapTitle: data.mapTitle || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_MAP_TITLE,
            locationText: data.locationText || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_LOCATION_TEXT,
            hoursText: data.hoursText || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_HOURS_TEXT,
            directionsText: data.directionsText || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_DIRECTIONS_TEXT,
            
            // Individual color options with defaults from constants
            mainTitleColor: data.mainTitleColor || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.MAIN_TITLE,
            addressTitleColor: data.addressTitleColor || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.ADDRESS_TITLE,
            addressContentColor: data.addressContentColor || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.ADDRESS_CONTENT,
            parkingTitleColor: data.parkingTitleColor || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.PARKING_TITLE,
            parkingContentColor: data.parkingContentColor || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.PARKING_CONTENT,
            transitTitleColor: data.transitTitleColor || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.TRANSIT_TITLE,
            transitContentColor: data.transitContentColor || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.TRANSIT_CONTENT,
            metroTitleColor: data.metroTitleColor || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.METRO_TITLE,
            metroContentColor: data.metroContentColor || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.METRO_CONTENT,
            accessibilityTitleColor: data.accessibilityTitleColor || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.ACCESSIBILITY_TITLE,
            accessibilityContentColor: data.accessibilityContentColor || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.ACCESSIBILITY_CONTENT,
            hoursTitleColor: data.hoursTitleColor || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.HOURS_TITLE,
            hoursContentColor: data.hoursContentColor || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.HOURS_CONTENT,
            safetyTitleColor: data.safetyTitleColor || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.SAFETY_TITLE,
            safetyContentColor: data.safetyContentColor || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.SAFETY_CONTENT,
            buttonTextColor: data.buttonTextColor || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.BUTTON_TEXT,
            mapTitleColor: data.mapTitleColor || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.MAP_TITLE,
            locationTextColor: data.locationTextColor || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.LOCATION_TEXT,
            hoursTextColor: data.hoursTextColor || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.HOURS_TEXT,
            directionsTextColor: data.directionsTextColor || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.DIRECTIONS_TEXT,
            
            // Individual font family options with defaults from constants
            mainTitleFontFamily: data.mainTitleFontFamily || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.MAIN_TITLE,
            addressTitleFontFamily: data.addressTitleFontFamily || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.ADDRESS_TITLE,
            addressContentFontFamily: data.addressContentFontFamily || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.ADDRESS_CONTENT,
            parkingTitleFontFamily: data.parkingTitleFontFamily || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.PARKING_TITLE,
            parkingContentFontFamily: data.parkingContentFontFamily || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.PARKING_CONTENT,
            transitTitleFontFamily: data.transitTitleFontFamily || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.TRANSIT_TITLE,
            transitContentFontFamily: data.transitContentFontFamily || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.TRANSIT_CONTENT,
            metroTitleFontFamily: data.metroTitleFontFamily || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.METRO_TITLE,
            metroContentFontFamily: data.metroContentFontFamily || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.METRO_CONTENT,
            accessibilityTitleFontFamily: data.accessibilityTitleFontFamily || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.ACCESSIBILITY_TITLE,
            accessibilityContentFontFamily: data.accessibilityContentFontFamily || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.ACCESSIBILITY_CONTENT,
            hoursTitleFontFamily: data.hoursTitleFontFamily || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.HOURS_TITLE,
            hoursContentFontFamily: data.hoursContentFontFamily || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.HOURS_CONTENT,
            safetyTitleFontFamily: data.safetyTitleFontFamily || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.SAFETY_TITLE,
            safetyContentFontFamily: data.safetyContentFontFamily || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.SAFETY_CONTENT,
            buttonTextFontFamily: data.buttonTextFontFamily || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.BUTTON_TEXT,
            mapTitleFontFamily: data.mapTitleFontFamily || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.MAP_TITLE,
            locationTextFontFamily: data.locationTextFontFamily || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.LOCATION_TEXT,
            hoursTextFontFamily: data.hoursTextFontFamily || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.HOURS_TEXT,
            directionsTextFontFamily: data.directionsTextFontFamily || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_FONTS.DIRECTIONS_TEXT,
            
            // Global styling options with defaults from constants
            backgroundColor: data.backgroundColor || HOME_NEW_PATIENT_SECTION_CONSTANTS.DEFAULT_COLORS.BACKGROUND
          };
        })
    );
  }
}
