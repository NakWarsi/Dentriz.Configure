export const FAQ_CONSTANTS = {
  // Section Content
  DEFAULT_SECTION_TITLE: 'Frequently Asked Questions',
  DEFAULT_SECTION_SUBTITLE: 'Find answers to common questions about our services',
  
  // FAQ Items
  DEFAULT_FAQ_ITEMS: [
    {
      question: 'How do I schedule an appointment?',
      answer: 'You can schedule an appointment by calling us at 97682 64663S, or you can request an appointment through our website. We\'ll work with you to find a convenient time.'
    },
    {
      question: 'What should I bring to my first appointment?',
      answer: 'Please bring your ID, insurance card (if applicable), and any relevant medical history. You can also download and fill out our new patient forms from our website.'
    },
    {
      question: 'Do you offer emergency dental care?',
      answer: 'Yes, we provide emergency dental care. If you have a dental emergency, please call us immediately at (555) 123-4567, and we\'ll help you get the care you need.'
    },
    {
      question: 'What insurance plans do you accept?',
      answer: 'We accept most major insurance plans. Please call our office to verify your specific plan coverage, and we\'ll be happy to help you understand your benefits.'
    },
    {
      question: 'Do you offer payment plans?',
      answer: 'Yes, we offer flexible payment plans to make dental care affordable. We also accept CareCredit and have an in-house dental plan for patients without insurance.'
    },
    {
      question: 'How often should I visit the dentist?',
      answer: 'We recommend visiting the dentist every 6 months for routine checkups and cleanings. However, some patients may need more frequent visits based on their oral health needs.'
    }
  ],

  // Default Colors
  DEFAULT_COLORS: {
    SECTION_TITLE: '#2c5aa0',
    SECTION_SUBTITLE: '#666666',
    QUESTION: '#2c5aa0',
    ANSWER: '#333333',
    BACKGROUND: '#f8f9fa'
  },

  // Default Fonts
  DEFAULT_FONTS: {
    SECTION_TITLE: 'Arial, sans-serif',
    SECTION_SUBTITLE: 'Arial, sans-serif',
    QUESTION: 'Arial, sans-serif',
    ANSWER: 'Arial, sans-serif'
  }
} as const;
