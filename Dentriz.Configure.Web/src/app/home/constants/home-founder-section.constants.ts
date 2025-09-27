export const HOME_FOUNDER_SECTION_CONSTANTS = {
  DEFAULT_SUBTITLE: 'Know your Doctor',
  DEFAULT_DOCTOR_NAME: 'Dr. Akash Mankar',
  DEFAULT_TITLE: 'Founder & Chief Dentist',
  DEFAULT_DESCRIPTION: 'A proud graduate of Government Dental College, Mumbai — one of the most prestigious dental institutions in India. With around 10 years of experience, Dr. Mankar has honed his expertise in a wide range of specialties including:',
  DEFAULT_SPECIALTIES: [
    'Cosmetic dentistry',
    'Dental implants',
    'Smile designing',
    'Root canal treatments',
    'Full-mouth rehabilitation',
    'Preventive care',
    'Pediatric dentistry'
  ],
  DEFAULT_MISSION: 'Dr. Mankar\'s mission is not just to treat dental concerns but to help patients achieve lifelong oral health, confidence, and beautiful smiles.',
  DEFAULT_IMAGE: {
    SRC: '/images/home/dr-rizwana-khan-c1.jpg?v=2',
    ALT: 'Dr. Akash Mankar - Founder & Chief Dentist',
    NAME: 'Dr. Akash Mankar',
    CREDENTIALS: '(BDS. Govt. Dental College, Mumbai)'
  },
  DEFAULT_PHILOSOPHY: {
    TITLE: 'Our Philosophy:',
    CONTENT: '"ClinSmile Dental Clinic was built on the belief that dentistry should be modern, compassionate, and patient-focused. Our philosophy is to combine cutting-edge technology with a human touch, ensuring every patient receives the highest standard of care. We strive to create smiles that are not only healthy but also filled with confidence and happiness."'
  },
  // Color constants - single source of truth
  DEFAULT_COLORS: {
    SUBTITLE: '#2c5aa0',
    DOCTOR_NAME: '#000000',
    TITLE: '#666666',
    DESCRIPTION: '#333333',
    SPECIALTIES: '#333333',
    MISSION: '#333333',
    PHILOSOPHY_TITLE: '#2c5aa0',
    PHILOSOPHY_CONTENT: '#333333',
    IMAGE_NAME: '#000000',
    CREDENTIALS: '#666666',
    BACKGROUND: '#f8f9fa'
  },
  // Font family constants - single source of truth
  DEFAULT_FONTS: {
    SUBTITLE: 'Arial, sans-serif',
    DOCTOR_NAME: 'Arial, sans-serif',
    TITLE: 'Arial, sans-serif',
    DESCRIPTION: 'Arial, sans-serif',
    SPECIALTIES: 'Arial, sans-serif',
    MISSION: 'Arial, sans-serif',
    PHILOSOPHY_TITLE: 'Arial, sans-serif',
    PHILOSOPHY_CONTENT: 'Arial, sans-serif',
    IMAGE_NAME: 'Arial, sans-serif',
    CREDENTIALS: 'Arial, sans-serif'
  }
} as const;
