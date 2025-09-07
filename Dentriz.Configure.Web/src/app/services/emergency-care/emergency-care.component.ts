import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-emergency-care',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './emergency-care.component.html',
  styleUrls: ['./emergency-care.component.css']
})
export class EmergencyCareComponent {
  emergencies = [
    {
      title: 'Toothache Relief',
      description: 'Immediate pain relief for severe toothaches and dental pain.',
      symptoms: [
        'Severe tooth pain',
        'Sensitivity to hot/cold',
        'Pain when chewing',
        'Swelling around tooth',
        'Throbbing pain'
      ],
      icon: '🦷'
    },
    {
      title: 'Broken Tooth Repair',
      description: 'Emergency repair for chipped, cracked, or broken teeth.',
      symptoms: [
        'Visible tooth damage',
        'Sharp edges',
        'Pain when biting',
        'Sensitivity to air',
        'Bleeding from tooth'
      ],
      icon: '🔧'
    },
    {
      title: 'Lost Filling/Crown',
      description: 'Emergency replacement of lost or damaged dental restorations.',
      symptoms: [
        'Missing filling or crown',
        'Sharp edges',
        'Sensitivity to temperature',
        'Pain when eating',
        'Visible tooth damage'
      ],
      icon: '👑'
    },
    {
      title: 'Emergency Extractions',
      description: 'Urgent tooth removal for severely damaged or infected teeth.',
      symptoms: [
        'Severe infection',
        'Unbearable pain',
        'Swelling in face/jaw',
        'Fever',
        'Difficulty breathing'
      ],
      icon: '⚡'
    },
    {
      title: 'Dental Trauma',
      description: 'Emergency care for sports injuries, accidents, and dental trauma.',
      symptoms: [
        'Knocked-out tooth',
        'Bleeding from mouth',
        'Jaw pain',
        'Loose teeth',
        'Facial swelling'
      ],
      icon: '🚑'
    }
  ];

  emergencySteps = [
    {
      step: '1',
      title: 'Call Immediately',
      description: 'Contact us right away for emergency dental care.'
    },
    {
      step: '2',
      title: 'Describe Symptoms',
      description: 'Tell us about your symptoms and pain level.'
    },
    {
      step: '3',
      title: 'Get Directions',
      description: 'We\'ll provide directions to our office.'
    },
    {
      step: '4',
      title: 'Emergency Treatment',
      description: 'Receive immediate care and pain relief.'
    }
  ];
}
