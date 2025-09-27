export const HEADER_CONSTANTS = {
  // Header Logo Section
  DEFAULT_LOGO_ALT: 'ClinSmile Dental Clinic Logo',
  DEFAULT_LOGO_IMAGE: '/images/clinic/logo.png',
  DEFAULT_CLINIC_NAME: 'ClinSmile Dental Clinic',
  DEFAULT_TAGLINE: 'Multi Speciality Dental Clinic & Implant Center',

  // Navigation Items
  DEFAULT_NAV_ITEMS: [
    { label: 'Home', route: '/', exact: true },
    { label: 'Services', route: '/services', exact: false },
    { label: 'About Us', route: '/about', exact: false },
    { label: 'Our Smiles', route: '/smile-gallery', exact: false },
    { label: 'Contact', route: '/contact', exact: false }
  ],

  // Default Colors
  DEFAULT_COLORS: {
    BACKGROUND: '#ffffff',
    TEXT: '#1e3c72',
    LOGO_TEXT: '#1e3c72',
    TAGLINE: '#666666',
    NAV_LINK: '#1e3c72',
    NAV_LINK_HOVER: '#2c5aa0',
    NAV_LINK_ACTIVE: '#2c5aa0',
    MOBILE_MENU_BG: '#ffffff', // Will be synchronized with BACKGROUND
    MOBILE_MENU_TEXT: '#1e3c72'
  },

  // Default Fonts
  DEFAULT_FONTS: {
    CLINIC_NAME: 'Arial, sans-serif',
    TAGLINE: 'Arial, sans-serif',
    NAV_LINK: 'Arial, sans-serif'
  }
} as const;
