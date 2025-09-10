export const RESTORATIVE_CARE_CONSTANTS = {
  // Section Content
  DEFAULT_SECTION_TITLE: 'Restorative Care',
  DEFAULT_SECTION_SUBTITLE: 'Restoring function and beauty to your smile',
  DEFAULT_SECTION_ICON: '🔧',
  
  // Service Cards
  DEFAULT_SERVICES: [
    {
      icon: '⚡',
      title: 'Same-Day Emergencies',
      description: 'Dental emergencies don\'t wait, and neither should you. We provide prompt emergency care to relieve pain and address urgent dental issues.',
      features: [
        'Toothache relief',
        'Broken tooth repair',
        'Lost filling replacement',
        'Emergency extractions'
      ]
    },
    {
      icon: '🦷',
      title: 'Composite Fillings',
      description: 'Modern tooth-colored fillings that blend seamlessly with your natural teeth while providing strong, durable restoration.',
      features: [
        'Natural appearance',
        'Bonded to tooth structure',
        'Minimal tooth preparation',
        'Long-lasting results'
      ]
    },
    {
      icon: '👑',
      title: 'Crowns & Bridges',
      description: 'Restore damaged or missing teeth with custom-made crowns and bridges that look and function like natural teeth.',
      features: [
        'Same-day CEREC crowns',
        'Traditional porcelain crowns',
        'Fixed bridges',
        'Implant-supported crowns'
      ]
    },
    {
      icon: '🦷',
      title: 'Dental Implants',
      description: 'The gold standard for replacing missing teeth, dental implants provide a permanent solution that looks, feels, and functions like natural teeth.',
      features: [
        'Single tooth replacement',
        'Multiple tooth replacement',
        'Full arch restoration',
        'Implant-supported dentures'
      ]
    }
  ],

  // Default Colors
  DEFAULT_COLORS: {
    SECTION_TITLE: '#1e3c72',
    SECTION_SUBTITLE: '#666666',
    BACKGROUND: '#ffffff',
    CARD_TITLE: '#1e3c72',
    CARD_DESCRIPTION: '#666666',
    CARD_FEATURES: '#333333'
  },

  // Default Fonts
  DEFAULT_FONTS: {
    SECTION_TITLE: 'Arial, sans-serif',
    SECTION_SUBTITLE: 'Arial, sans-serif',
    CARD_TITLE: 'Arial, sans-serif',
    CARD_DESCRIPTION: 'Arial, sans-serif',
    CARD_FEATURES: 'Arial, sans-serif'
  }
} as const;
