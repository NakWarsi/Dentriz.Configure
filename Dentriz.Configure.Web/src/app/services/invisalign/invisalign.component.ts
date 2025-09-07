import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invisalign',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invisalign.component.html',
  styleUrls: ['./invisalign.component.css']
})
export class InvisalignComponent {
  invisalignFeatures = [
    {
      title: 'Virtually Invisible',
      description: 'Clear aligners that are barely noticeable when worn.',
      features: [
        'Transparent material',
        'Custom-fitted design',
        'Smooth edges',
        'No metal brackets',
        'Discreet treatment'
      ],
      icon: '👁️'
    },
    {
      title: 'Removable Aligners',
      description: 'Take them out for eating, drinking, and oral hygiene.',
      features: [
        'Easy to remove',
        'No food restrictions',
        'Better oral hygiene',
        'Special occasions',
        'Comfortable eating'
      ],
      icon: '🔄'
    },
    {
      title: 'Comfortable Treatment',
      description: 'Smooth, comfortable aligners that gradually move your teeth.',
      features: [
        'No sharp edges',
        'Smooth material',
        'Gradual movement',
        'Less discomfort',
        'No adjustments needed'
      ],
      icon: '😊'
    },
    {
      title: 'Digital Treatment Planning',
      description: 'Advanced 3D technology for precise treatment planning.',
      features: [
        '3D smile simulation',
        'Precise treatment plan',
        'Progress tracking',
        'Before/after preview',
        'Customized treatment'
      ],
      icon: '💻'
    }
  ];

  treatmentProcess = [
    {
      step: '1',
      title: 'Consultation',
      description: 'Free consultation to determine if Invisalign is right for you.'
    },
    {
      step: '2',
      title: 'Digital Scan',
      description: '3D digital scan of your teeth (no messy impressions).'
    },
    {
      step: '3',
      title: 'Treatment Plan',
      description: 'Custom treatment plan with 3D simulation of your results.'
    },
    {
      step: '4',
      title: 'Start Treatment',
      description: 'Receive your custom aligners and begin your journey.'
    }
  ];

  benefits = [
    {
      icon: '😁',
      title: 'Confidence',
      description: 'Straighten teeth without anyone knowing you\'re in treatment.'
    },
    {
      icon: '🍕',
      title: 'No Food Restrictions',
      description: 'Remove aligners to eat your favorite foods.'
    },
    {
      icon: '🦷',
      title: 'Better Hygiene',
      description: 'Remove aligners for thorough brushing and flossing.'
    },
    {
      icon: '📅',
      title: 'Fewer Visits',
      description: 'Less frequent office visits compared to traditional braces.'
    }
  ];

  candidacy = [
    'Crowded teeth',
    'Gaps between teeth',
    'Overbite',
    'Underbite',
    'Crossbite',
    'Open bite'
  ];
}
