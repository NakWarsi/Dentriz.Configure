import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dental-implants',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dental-implants.component.html',
  styleUrls: ['./dental-implants.component.css']
})
export class DentalImplantsComponent {
  implantTypes = [
    {
      title: 'Single Tooth Implants',
      description: 'Replace one missing tooth with a natural-looking dental implant.',
      features: [
        'Natural appearance',
        'Preserves bone structure',
        'No damage to adjacent teeth',
        'Long-lasting solution',
        'Easy maintenance'
      ],
      icon: '🦷'
    },
    {
      title: 'Multiple Tooth Implants',
      description: 'Replace several missing teeth with implant-supported restorations.',
      features: [
        'Implant-supported bridge',
        'Stable and secure',
        'Natural chewing function',
        'Preserves facial structure',
        'Cost-effective solution'
      ],
      icon: '🦷🦷'
    },
    {
      title: 'Full Arch Implants',
      description: 'Complete smile restoration with implant-supported full arch replacement.',
      features: [
        'All-on-4® treatment',
        'Immediate function',
        'Natural appearance',
        'Improved confidence',
        'Long-term solution'
      ],
      icon: '🦷🦷🦷'
    },
    {
      title: 'Implant-Supported Dentures',
      description: 'Secure dentures with dental implants for improved stability and comfort.',
      features: [
        'No slipping or movement',
        'Improved chewing ability',
        'Better speech',
        'Increased confidence',
        'Easy maintenance'
      ],
      icon: '🦷😁'
    }
  ];

  implantProcess = [
    {
      step: '1',
      title: 'Consultation & Planning',
      description: 'Comprehensive evaluation and treatment planning with 3D imaging.'
    },
    {
      step: '2',
      title: 'Implant Placement',
      description: 'Surgical placement of titanium implants into the jawbone.'
    },
    {
      step: '3',
      title: 'Healing Period',
      description: '3-6 months for implants to integrate with the jawbone.'
    },
    {
      step: '4',
      title: 'Final Restoration',
      description: 'Placement of custom-made crowns, bridges, or dentures.'
    }
  ];

  benefits = [
    {
      icon: '🎯',
      title: 'Natural Look',
      description: 'Implants look and feel like natural teeth.'
    },
    {
      icon: '🔄',
      title: 'Long-lasting',
      description: 'With proper care, implants can last a lifetime.'
    },
    {
      icon: '🦴',
      title: 'Bone Preservation',
      description: 'Implants prevent bone loss in the jaw.'
    },
    {
      icon: '😊',
      title: 'Improved Confidence',
      description: 'Restore your smile and boost self-confidence.'
    }
  ];
}
