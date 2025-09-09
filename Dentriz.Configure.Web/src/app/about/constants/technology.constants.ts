export const TECHNOLOGY_CONSTANTS = {
  // Section Content
  DEFAULT_SECTION_TITLE: 'Advanced Technology & Facilities',
  DEFAULT_SECTION_SUBTITLE: 'We\'re proud to offer an array of leading technologies to ensure your smile receives the tailored care it deserves!',
  
  // Default Technology Data
  DEFAULT_TECHNOLOGIES: [
    {
      icon: '🖥️',
      title: 'CEREC Same-Day Crowns',
      description: 'Get your crown in a single visit with our advanced CEREC technology.'
    },
    {
      icon: '📷',
      title: 'CBCT Scanner',
      description: '3D imaging for comprehensive oral health insights and implant planning accuracy.'
    },
    {
      icon: '💻',
      title: 'PrimeScan Technology',
      description: 'Cloud-based scanning for accurate digital impressions and treatment planning.'
    },
    {
      icon: '🦷',
      title: 'Digital X-Rays',
      description: 'Lower radiation exposure and instant results with digital imaging.'
    }
  ],

  // Default Colors
  DEFAULT_COLORS: {
    SECTION_TITLE: '#2c5aa0',
    SECTION_SUBTITLE: '#666666',
    TECH_TITLE: '#2c5aa0',
    TECH_DESCRIPTION: '#333333',
    BACKGROUND: '#ffffff'
  },

  // Default Fonts
  DEFAULT_FONTS: {
    SECTION_TITLE: 'Arial, sans-serif',
    SECTION_SUBTITLE: 'Arial, sans-serif',
    TECH_TITLE: 'Arial, sans-serif',
    TECH_DESCRIPTION: 'Arial, sans-serif'
  }
} as const;
