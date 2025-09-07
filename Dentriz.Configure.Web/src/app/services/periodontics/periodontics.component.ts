import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-periodontics',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './periodontics.component.html',
  styleUrl: './periodontics.component.css'
})
export class PeriodonticsComponent {
  services = [
    {
      title: 'Gum Disease Treatment',
      description: 'Comprehensive treatment for gingivitis and periodontitis to restore gum health.',
      icon: '🦷',
      features: ['Deep cleaning', 'Scaling and root planing', 'Gum surgery', 'Laser therapy']
    },
    {
      title: 'Gum Grafting',
      description: 'Surgical procedures to restore receding gums and improve oral health.',
      icon: '🔬',
      features: ['Connective tissue grafts', 'Free gingival grafts', 'Pedicle grafts', 'Minimal discomfort']
    },
    {
      title: 'Dental Crown Lengthening',
      description: 'Surgical procedure to expose more of the tooth structure for restorative work.',
      icon: '👑',
      features: ['Excessive gum tissue removal', 'Improved tooth proportions', 'Better restoration fit', 'Enhanced smile aesthetics']
    },
    {
      title: 'Pocket Reduction Surgery',
      description: 'Surgical treatment to reduce deep gum pockets and prevent further bone loss.',
      icon: '📏',
      features: ['Flap surgery', 'Bone grafting', 'Tissue regeneration', 'Long-term stability']
    },
    {
      title: 'Laser Gum Treatment',
      description: 'Advanced laser therapy for precise and minimally invasive gum disease treatment.',
      icon: '⚡',
      features: ['Minimal discomfort', 'Faster healing', 'Precise treatment', 'Reduced bleeding']
    },
    {
      title: 'Maintenance Therapy',
      description: 'Ongoing periodontal maintenance to prevent disease recurrence.',
      icon: '🔄',
      features: ['Regular cleanings', 'Periodontal monitoring', 'Home care guidance', 'Preventive measures']
    }
  ];

  benefits = [
    {
      title: 'Prevent Tooth Loss',
      description: 'Early treatment prevents gum disease from progressing to tooth loss.'
    },
    {
      title: 'Improve Overall Health',
      description: 'Healthy gums contribute to better cardiovascular and systemic health.'
    },
    {
      title: 'Enhanced Smile',
      description: 'Treating gum disease improves smile aesthetics and confidence.'
    },
    {
      title: 'Long-term Stability',
      description: 'Proper periodontal care ensures long-term oral health and stability.'
    }
  ];

  symptoms = [
    'Bleeding gums during brushing or flossing',
    'Red, swollen, or tender gums',
    'Persistent bad breath',
    'Receding gums or longer appearing teeth',
    'Loose or shifting teeth',
    'Pain when chewing',
    'Sensitive teeth'
  ];
}
