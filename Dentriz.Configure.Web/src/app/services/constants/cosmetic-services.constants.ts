export const COSMETIC_SERVICES_CONSTANTS = {
  // Section Content
  DEFAULT_SECTION_TITLE: 'Cosmetic Services',
  DEFAULT_SECTION_SUBTITLE: 'Enhancing the beauty of your smile',
  DEFAULT_SECTION_ICON: '✨',
  
  // Service Cards
  DEFAULT_SERVICES: [
    {
      icon: '🦷',
      title: 'Dental Bonding',
      description: 'A quick and cost-effective way to improve the appearance of chipped, cracked, or discolored teeth.',
      features: [
        'Repair chipped teeth',
        'Close gaps between teeth',
        'Improve tooth shape',
        'Single visit treatment'
      ]
    },
    {
      icon: '😁',
      title: 'Teeth Whitening',
      description: 'Professional teeth whitening services to brighten your smile and boost your confidence.',
      features: [
        'In-office whitening',
        'Take-home whitening kits',
        'Custom-fitted trays',
        'Long-lasting results'
      ]
    },
    {
      icon: '🦷',
      title: 'Invisalign®',
      description: 'Straighten your teeth discreetly with clear, removable aligners that fit your lifestyle.',
      features: [
        'Virtually invisible',
        'Removable aligners',
        'Comfortable treatment',
        'Digital treatment planning'
      ]
    },
    {
      icon: '✨',
      title: 'Dental Veneers',
      description: 'Transform your smile with custom-made porcelain veneers that create a beautiful, natural-looking appearance.',
      features: [
        'Same-day veneers available',
        'Stain-resistant',
        'Natural appearance',
        'Long-lasting results'
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
