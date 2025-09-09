export const VALUES_CONSTANTS = {
  // Section Content
  DEFAULT_SECTION_TITLE: 'Our Core Values',
  
  // Default Values Data
  DEFAULT_VALUES: [
    {
      icon: '❤️',
      title: 'Compassionate Care',
      description: 'We treat every patient with kindness, respect, and understanding, creating a comfortable environment for all.'
    },
    {
      icon: '🔬',
      title: 'Advanced Technology',
      description: 'We invest in the latest dental technology to provide precise, efficient, and comfortable treatments.'
    },
    {
      icon: '👨‍👩‍👧‍👦',
      title: 'Family Focused',
      description: 'We welcome patients of all ages and provide comprehensive care for the entire family under one roof.'
    },
    {
      icon: '🎯',
      title: 'Excellence',
      description: 'We maintain the highest standards of dental care and continuously improve our skills and techniques.'
    }
  ],

  // Default Colors
  DEFAULT_COLORS: {
    SECTION_TITLE: '#2c5aa0',
    VALUE_TITLE: '#2c5aa0',
    VALUE_DESCRIPTION: '#333333',
    BACKGROUND: '#f8f9fa'
  },

  // Default Fonts
  DEFAULT_FONTS: {
    SECTION_TITLE: 'Arial, sans-serif',
    VALUE_TITLE: 'Arial, sans-serif',
    VALUE_DESCRIPTION: 'Arial, sans-serif'
  }
} as const;
