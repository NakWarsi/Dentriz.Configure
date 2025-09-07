import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-orthodontics',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './orthodontics.component.html',
  styleUrl: './orthodontics.component.css'
})
export class OrthodonticsComponent {
  services = [
    {
      title: 'Traditional Metal Braces',
      description: 'Classic orthodontic treatment with modern metal brackets for effective teeth alignment.',
      icon: '🦷',
      features: ['Proven effectiveness', 'Cost-effective', 'Customizable colors', 'Suitable for all ages']
    },
    {
      title: 'Ceramic Braces',
      description: 'Discreet orthodontic treatment with tooth-colored brackets for a more aesthetic appearance.',
      icon: '💎',
      features: ['Less visible', 'Tooth-colored brackets', 'Effective treatment', 'Comfortable design']
    },
    {
      title: 'Lingual Braces',
      description: 'Hidden braces placed behind your teeth for completely invisible orthodontic treatment.',
      icon: '👁️',
      features: ['Completely hidden', 'Custom-fitted', 'Effective results', 'Discreet treatment']
    },
    {
      title: 'Clear Aligners',
      description: 'Removable, transparent aligners for comfortable and convenient teeth straightening.',
      icon: '🔄',
      features: ['Removable', 'Nearly invisible', 'Comfortable', 'Easy maintenance']
    },
    {
      title: 'Early Orthodontic Treatment',
      description: 'Interceptive orthodontics for children to guide proper jaw and teeth development.',
      icon: '👶',
      features: ['Preventive care', 'Guided growth', 'Reduced treatment time', 'Better outcomes']
    },
    {
      title: 'Retainers',
      description: 'Custom retainers to maintain your beautiful smile after orthodontic treatment.',
      icon: '🛡️',
      features: ['Custom-fitted', 'Maintain results', 'Comfortable wear', 'Long-term stability']
    }
  ];

  benefits = [
    {
      title: 'Improved Oral Health',
      description: 'Straight teeth are easier to clean, reducing the risk of cavities and gum disease.'
    },
    {
      title: 'Enhanced Confidence',
      description: 'A beautiful, straight smile boosts self-esteem and improves social interactions.'
    },
    {
      title: 'Better Function',
      description: 'Properly aligned teeth improve chewing, speaking, and overall oral function.'
    },
    {
      title: 'Prevent Future Problems',
      description: 'Orthodontic treatment can prevent jaw problems and excessive tooth wear.'
    }
  ];

  treatmentOptions = [
    {
      title: 'Metal Braces',
      description: 'Traditional, effective, and cost-friendly option',
      duration: '18-24 months',
      cost: 'Most affordable'
    },
    {
      title: 'Ceramic Braces',
      description: 'Aesthetic option with tooth-colored brackets',
      duration: '18-24 months',
      cost: 'Moderate cost'
    },
    {
      title: 'Lingual Braces',
      description: 'Hidden braces behind your teeth',
      duration: '18-30 months',
      cost: 'Premium option'
    },
    {
      title: 'Clear Aligners',
      description: 'Removable, transparent aligners',
      duration: '12-18 months',
      cost: 'Varies by case'
    }
  ];

  ageGroups = [
    {
      age: 'Children (7-11)',
      description: 'Early intervention to guide jaw development and prevent future problems',
      benefits: ['Guided growth', 'Preventive care', 'Shorter treatment time']
    },
    {
      age: 'Teens (12-18)',
      description: 'Optimal time for orthodontic treatment with growing jaws',
      benefits: ['Optimal timing', 'Faster results', 'Social confidence']
    },
    {
      age: 'Adults (18+)',
      description: 'It\'s never too late to achieve a beautiful smile',
      benefits: ['Life-changing results', 'Improved confidence', 'Better oral health']
    }
  ];
}
