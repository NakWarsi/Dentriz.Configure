export const TECHNOLOGY_SECTION_CONSTANTS = {
  // Section Content
  DEFAULT_SECTION_TITLE: 'Advanced Technology',
  DEFAULT_SECTION_SUBTITLE: 'We invest in the latest dental technology to provide you with the best care possible',
  
  // Technology Cards
  DEFAULT_TECHNOLOGIES: [
    {
      icon: '🖥️',
      title: 'CEREC Same-Day Crowns',
      description: 'Get your crown in a single visit with our advanced CEREC technology.'
    },
    {
      icon: '📷',
      title: 'Digital X-Rays',
      description: 'Lower radiation exposure and instant results with digital imaging.'
    },
    {
      icon: '🔍',
      title: 'CBCT Scanner',
      description: '3D imaging for precise implant planning and comprehensive diagnostics.'
    },
    {
      icon: '💻',
      title: 'PrimeScan Technology',
      description: 'Cloud-based scanning for accurate digital impressions and treatment planning.'
    }
  ],

  // Default Colors
  DEFAULT_COLORS: {
    SECTION_TITLE: '#ffffff',
    SECTION_SUBTITLE: '#ffffff',
    BACKGROUND: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
    CARD_TITLE: '#ffffff',
    CARD_DESCRIPTION: '#ffffff'
  },

  // Default Fonts
  DEFAULT_FONTS: {
    SECTION_TITLE: 'Arial, sans-serif',
    SECTION_SUBTITLE: 'Arial, sans-serif',
    CARD_TITLE: 'Arial, sans-serif',
    CARD_DESCRIPTION: 'Arial, sans-serif'
  }
} as const;
