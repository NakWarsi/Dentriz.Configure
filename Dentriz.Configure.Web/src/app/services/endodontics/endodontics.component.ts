import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-endodontics',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './endodontics.component.html',
  styleUrl: './endodontics.component.css'
})
export class EndodonticsComponent {
  services = [
    {
      title: 'Root Canal Therapy',
      description: 'Advanced endodontic treatment to save severely damaged or infected teeth.',
      icon: '🦷',
      features: ['Pain relief', 'Tooth preservation', 'Advanced technology', 'Minimal discomfort']
    },
    {
      title: 'Endodontic Retreatment',
      description: 'Specialized treatment for previously treated teeth that require additional care.',
      icon: '🔄',
      features: ['Complex case management', 'Microscopic treatment', 'Advanced techniques', 'Improved outcomes']
    },
    {
      title: 'Apicoectomy',
      description: 'Surgical procedure to remove infection from the root tip when conventional treatment fails.',
      icon: '🔬',
      features: ['Surgical precision', 'Infection removal', 'Tissue preservation', 'Faster healing']
    },
    {
      title: 'Cracked Tooth Treatment',
      description: 'Specialized diagnosis and treatment for teeth with cracks or fractures.',
      icon: '🔍',
      features: ['Advanced diagnosis', 'Crack detection', 'Preventive treatment', 'Tooth stabilization']
    },
    {
      title: 'Trauma Treatment',
      description: 'Emergency endodontic care for teeth damaged by accidents or injuries.',
      icon: '🚨',
      features: ['Emergency care', 'Trauma assessment', 'Immediate treatment', 'Follow-up care']
    },
    {
      title: 'Pulp Therapy',
      description: 'Treatment to preserve and protect the dental pulp in compromised teeth.',
      icon: '💊',
      features: ['Pulp preservation', 'Vitality maintenance', 'Preventive care', 'Long-term health']
    }
  ];

  benefits = [
    {
      title: 'Save Natural Teeth',
      description: 'Endodontic treatment preserves your natural teeth, maintaining oral function and appearance.'
    },
    {
      title: 'Relieve Pain',
      description: 'Advanced techniques provide effective pain relief and restore oral comfort.'
    },
    {
      title: 'Prevent Further Damage',
      description: 'Timely treatment prevents infection spread and protects surrounding tissues.'
    },
    {
      title: 'Maintain Oral Health',
      description: 'Preserving natural teeth contributes to overall oral health and function.'
    }
  ];

  symptoms = [
    'Severe toothache, especially when chewing or applying pressure',
    'Prolonged sensitivity to hot or cold temperatures',
    'Discoloration of the tooth',
    'Swelling and tenderness in nearby gums',
    'A persistent or recurring pimple on the gums',
    'Sharp pain when biting down',
    'Dull ache in the jaw or face'
  ];

  treatmentSteps = [
    {
      step: 1,
      title: 'Diagnosis & Consultation',
      description: 'Comprehensive examination including X-rays and advanced imaging to assess the condition.'
    },
    {
      step: 2,
      title: 'Treatment Planning',
      description: 'Personalized treatment plan based on your specific condition and oral health goals.'
    },
    {
      step: 3,
      title: 'Root Canal Procedure',
      description: 'Advanced endodontic treatment using microscopic technology for precise results.'
    },
    {
      step: 4,
      title: 'Restoration & Follow-up',
      description: 'Tooth restoration and ongoing care to ensure long-term success and oral health.'
    }
  ];
}
