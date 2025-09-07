import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pediatric-dentistry',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pediatric-dentistry.component.html',
  styleUrl: './pediatric-dentistry.component.css'
})
export class PediatricDentistryComponent {
  services = [
    {
      title: 'First Dental Visit',
      description: 'Gentle introduction to dental care for infants and toddlers, establishing positive dental experiences.',
      icon: '👶',
      features: ['Age-appropriate care', 'Gentle approach', 'Parent education', 'Preventive guidance']
    },
    {
      title: 'Regular Checkups & Cleanings',
      description: 'Comprehensive dental examinations and professional cleanings tailored for children.',
      icon: '🦷',
      features: ['Gentle cleaning', 'Cavity detection', 'Growth monitoring', 'Oral hygiene education']
    },
    {
      title: 'Dental Sealants',
      description: 'Protective coatings applied to chewing surfaces to prevent cavities in children.',
      icon: '🛡️',
      features: ['Cavity prevention', 'Painless application', 'Long-lasting protection', 'Cost-effective']
    },
    {
      title: 'Fluoride Treatments',
      description: 'Professional fluoride applications to strengthen tooth enamel and prevent decay.',
      icon: '💎',
      features: ['Enamel strengthening', 'Cavity prevention', 'Safe application', 'Regular monitoring']
    },
    {
      title: 'Cavity Fillings',
      description: 'Gentle treatment for cavities using child-friendly materials and techniques.',
      icon: '🔧',
      features: ['Child-friendly materials', 'Minimal discomfort', 'Quick procedure', 'Long-lasting results']
    },
    {
      title: 'Emergency Dental Care',
      description: 'Immediate care for dental emergencies and injuries in children.',
      icon: '🚨',
      features: ['24/7 availability', 'Quick response', 'Gentle treatment', 'Parent support']
    }
  ];

  benefits = [
    {
      title: 'Early Prevention',
      description: 'Establishing good oral habits early prevents dental problems later in life.'
    },
    {
      title: 'Positive Experience',
      description: 'Creating a fun, comfortable environment builds lifelong positive dental attitudes.'
    },
    {
      title: 'Proper Development',
      description: 'Monitoring dental development ensures proper growth and alignment.'
    },
    {
      title: 'Parent Education',
      description: 'Teaching parents proper oral care techniques for their children.'
    }
  ];

  ageGroups = [
    {
      age: 'Infants (0-2 years)',
      description: 'Early dental care and parent education for optimal oral health',
      services: ['First dental visit', 'Oral hygiene guidance', 'Growth monitoring', 'Preventive care']
    },
    {
      age: 'Toddlers (2-5 years)',
      description: 'Building positive dental experiences and establishing good habits',
      services: ['Regular checkups', 'Dental sealants', 'Fluoride treatments', 'Cavity prevention']
    },
    {
      age: 'Children (6-12 years)',
      description: 'Comprehensive dental care during critical development years',
      services: ['Orthodontic evaluation', 'Cavity treatment', 'Sports protection', 'Hygiene education']
    },
    {
      age: 'Teens (13-18 years)',
      description: 'Advanced dental care and preparation for adult oral health',
      services: ['Orthodontic treatment', 'Wisdom teeth monitoring', 'Cosmetic options', 'Adult transition']
    }
  ];

  tips = [
    'Start dental visits by age 1 or when first tooth appears',
    'Brush twice daily with fluoride toothpaste',
    'Limit sugary snacks and drinks',
    'Use dental sealants for cavity prevention',
    'Encourage regular flossing habits',
    'Schedule checkups every 6 months',
    'Consider mouthguards for sports activities',
    'Lead by example with good oral hygiene'
  ];
}
