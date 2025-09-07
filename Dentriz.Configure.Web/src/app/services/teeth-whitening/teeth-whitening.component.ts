import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teeth-whitening',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teeth-whitening.component.html',
  styleUrls: ['./teeth-whitening.component.css']
})
export class TeethWhiteningComponent {
  whiteningOptions = [
    {
      title: 'In-Office Whitening',
      description: 'Professional whitening treatment performed in our office for immediate results.',
      features: [
        'Immediate results',
        'Professional supervision',
        'Customized treatment',
        'Safe and effective',
        'Long-lasting results'
      ],
      duration: '1-2 hours',
      results: '3-8 shades brighter',
      icon: '💡'
    },
    {
      title: 'Take-Home Whitening',
      description: 'Custom-fitted trays with professional whitening gel for at-home treatment.',
      features: [
        'Custom-fitted trays',
        'Professional whitening gel',
        'Convenient at-home use',
        'Gradual whitening',
        'Maintenance treatment'
      ],
      duration: '2-4 weeks',
      results: '2-6 shades brighter',
      icon: '🏠'
    },
    {
      title: 'Combination Treatment',
      description: 'Best results with in-office treatment followed by take-home maintenance.',
      features: [
        'Immediate in-office results',
        'Take-home maintenance',
        'Longest-lasting results',
        'Customized treatment plan',
        'Professional guidance'
      ],
      duration: '1-2 hours + 2 weeks',
      results: '5-10 shades brighter',
      icon: '🌟'
    }
  ];

  whiteningProcess = [
    {
      step: '1',
      title: 'Consultation',
      description: 'Evaluate your teeth and discuss whitening goals.'
    },
    {
      step: '2',
      title: 'Preparation',
      description: 'Clean teeth and protect gums before treatment.'
    },
    {
      step: '3',
      title: 'Whitening',
      description: 'Apply professional whitening gel and activate with light.'
    },
    {
      step: '4',
      title: 'Results',
      description: 'See immediate results and receive maintenance instructions.'
    }
  ];

  benefits = [
    {
      icon: '😁',
      title: 'Boost Confidence',
      description: 'A brighter smile can significantly improve your self-confidence.'
    },
    {
      icon: '⚡',
      title: 'Quick Results',
      description: 'See noticeable results in just one office visit.'
    },
    {
      icon: '🛡️',
      title: 'Safe Treatment',
      description: 'Professional supervision ensures safe and effective treatment.'
    },
    {
      icon: '💎',
      title: 'Long-lasting',
      description: 'Results can last for months with proper maintenance.'
    }
  ];

  maintenance = [
    'Avoid staining foods and drinks',
    'Use whitening toothpaste',
    'Regular dental cleanings',
    'Touch-up treatments as needed',
    'Good oral hygiene habits'
  ];
}
