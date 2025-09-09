import { HOME_FOUNDER_SECTION_CONSTANTS } from '../constants/home-founder-section.constants';

export class HomeFounderSection {
  subtitle: string;
  doctorName: string;
  title: string;
  description: string;
  specialties: string[];
  mission: string;
  image: {
    src: string;
    alt: string;
    name: string;
    credentials: string;
  };
  philosophy: {
    title: string;
    content: string;
  };

  constructor(data: any = {}) {
    this.subtitle = data.subtitle || HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_SUBTITLE;
    this.doctorName = data.doctorName || HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_DOCTOR_NAME;
    this.title = data.title || HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_TITLE;
    this.description = data.description || HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_DESCRIPTION;
    this.specialties = data.specialties || HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_SPECIALTIES;
    this.mission = data.mission || HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_MISSION;
    this.image = {
      src: data.image?.src || HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_IMAGE.SRC,
      alt: data.image?.alt || HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_IMAGE.ALT,
      name: data.image?.name || HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_IMAGE.NAME,
      credentials: data.image?.credentials || HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_IMAGE.CREDENTIALS
    };
    this.philosophy = {
      title: data.philosophy?.title || HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_PHILOSOPHY.TITLE,
      content: data.philosophy?.content || HOME_FOUNDER_SECTION_CONSTANTS.DEFAULT_PHILOSOPHY.CONTENT
    };
  }
}
