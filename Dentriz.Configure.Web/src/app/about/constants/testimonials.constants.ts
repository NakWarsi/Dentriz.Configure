export const TESTIMONIALS_CONSTANTS = {
  // Section Content
  DEFAULT_SECTION_TITLE: 'What Our Patients Say',
  DEFAULT_SECTION_SUBTITLE: 'Read some of our amazing patient reviews and then contact us to experience our care for yourself!',
  
  // Default Testimonials Data
  DEFAULT_TESTIMONIALS: [
    {
      stars: '⭐⭐⭐⭐⭐',
      text: 'The staff at DentRiz Dental are friendly and efficient. Dr. Ahmed in particular is a joy to be around! The whole experience was comfortable and professional.',
      authorName: 'Aleena O.',
      authorTitle: 'Verified Patient'
    },
    {
      stars: '⭐⭐⭐⭐⭐',
      text: 'First visit to DentRiz Dental and the staff couldn\'t be more friendly! It\'s amazing how much easier visiting the dentist is these days. Highly recommended!',
      authorName: 'Mike Zita',
      authorTitle: 'Verified Patient'
    },
    {
      stars: '⭐⭐⭐⭐⭐',
      text: 'Staff here is amazing. Very knowledgeable and friendly. The office is exceptionally clean and operates efficiently. Highly recommended!',
      authorName: 'Sneha Bhosle',
      authorTitle: 'Verified Patient'
    }
  ],

  // Default Colors
  DEFAULT_COLORS: {
    SECTION_TITLE: '#2c5aa0',
    SECTION_SUBTITLE: '#666666',
    TESTIMONIAL_TEXT: '#333333',
    TESTIMONIAL_AUTHOR_NAME: '#2c5aa0',
    TESTIMONIAL_AUTHOR_TITLE: '#666666',
    TESTIMONIAL_STARS: '#ffd700',
    BACKGROUND: '#f8f9fa'
  },

  // Default Fonts
  DEFAULT_FONTS: {
    SECTION_TITLE: 'Arial, sans-serif',
    SECTION_SUBTITLE: 'Arial, sans-serif',
    TESTIMONIAL_TEXT: 'Arial, sans-serif',
    TESTIMONIAL_AUTHOR_NAME: 'Arial, sans-serif',
    TESTIMONIAL_AUTHOR_TITLE: 'Arial, sans-serif'
  }
} as const;
