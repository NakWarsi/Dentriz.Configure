import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cosmetic-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cosmetic-services.component.html',
  styleUrls: ['./cosmetic-services.component.css']
})
export class CosmeticServicesComponent {
  services = [
    {
      title: 'Teeth Whitening',
      description: 'Professional teeth whitening services to brighten your smile and boost your confidence.',
      features: [
        'In-office whitening',
        'Take-home whitening kits',
        'Custom-fitted trays',
        'Long-lasting results',
        'Safe and effective'
      ],
      icon: '😁'
    },
    {
      title: 'Dental Veneers',
      description: 'Transform your smile with custom-made porcelain veneers for a beautiful appearance.',
      features: [
        'Same-day veneers available',
        'Stain-resistant',
        'Natural appearance',
        'Long-lasting results',
        'Minimal tooth preparation'
      ],
      icon: '✨'
    },
    {
      title: 'Invisalign®',
      description: 'Straighten your teeth discreetly with clear, removable aligners that fit your lifestyle.',
      features: [
        'Virtually invisible',
        'Removable aligners',
        'Comfortable treatment',
        'Digital treatment planning',
        'No metal brackets'
      ],
      icon: '🦷'
    },
    {
      title: 'Dental Bonding',
      description: 'Quick and cost-effective way to improve the appearance of chipped or discolored teeth.',
      features: [
        'Repair chipped teeth',
        'Close gaps between teeth',
        'Improve tooth shape',
        'Single visit treatment',
        'Natural appearance'
      ],
      icon: '🔧'
    },
    {
      title: 'Smile Makeover',
      description: 'Comprehensive cosmetic treatment plan to transform your entire smile.',
      features: [
        'Personalized treatment plan',
        'Multiple procedures combined',
        'Before and after imaging',
        'Comprehensive consultation',
        'Lifetime smile transformation'
      ],
      icon: '🌟'
    }
  ];
}
