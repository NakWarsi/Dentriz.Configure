export const PREVENTIVE_CARE_CONSTANTS = {
  // Section Content
  DEFAULT_SECTION_TITLE: 'Preventive Care',
  DEFAULT_SECTION_SUBTITLE: 'Keeping your smile healthy starts with prevention',
  DEFAULT_SECTION_ICON: '🦷',
  
  // Service Cards
  DEFAULT_SERVICES: [
    {
      icon: '🦷',
      title: 'Routine Checkups & Cleanings',
      description: 'Regular dental checkups and professional cleanings are the foundation of good oral health. We recommend visits every 6 months to catch issues early and keep your smile bright.',
      features: [
        'Comprehensive oral examination',
        'Professional teeth cleaning',
        'Digital X-rays when needed',
        'Oral cancer screening'
      ]
    },
    {
      icon: '👨‍👩‍👧‍👦',
      title: 'Family & Children\'s Dental Services',
      description: 'We welcome patients of all ages and provide gentle, age-appropriate care for children to help them develop positive dental habits for life.',
      features: [
        'Child-friendly environment',
        'Early cavity detection',
        'Dental sealants',
        'Fluoride treatments'
      ]
    },
    {
      icon: '📚',
      title: 'Oral Health Education',
      description: 'We believe in empowering our patients with knowledge about proper oral hygiene and dental care practices.',
      features: [
        'Brushing and flossing techniques',
        'Nutrition guidance',
        'Preventive care tips',
        'Lifestyle recommendations'
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
