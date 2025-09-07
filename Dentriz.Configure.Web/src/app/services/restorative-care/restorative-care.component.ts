import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-restorative-care',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './restorative-care.component.html',
  styleUrls: ['./restorative-care.component.css']
})
export class RestorativeCareComponent {
  services = [
    {
      title: 'Same-Day Emergencies',
      description: 'Dental emergencies don\'t wait, and neither should you. We provide prompt emergency care.',
      features: [
        'Toothache relief',
        'Broken tooth repair',
        'Lost filling replacement',
        'Emergency extractions',
        '24/7 emergency care'
      ],
      icon: '⚡'
    },
    {
      title: 'Composite Fillings',
      description: 'Modern tooth-colored fillings that blend seamlessly with your natural teeth.',
      features: [
        'Natural appearance',
        'Bonded to tooth structure',
        'Minimal tooth preparation',
        'Long-lasting results',
        'Single visit treatment'
      ],
      icon: '🦷'
    },
    {
      title: 'Crowns & Bridges',
      description: 'Restore damaged or missing teeth with custom-made crowns and bridges.',
      features: [
        'Same-day CEREC crowns',
        'Traditional porcelain crowns',
        'Fixed bridges',
        'Implant-supported crowns',
        'Natural-looking results'
      ],
      icon: '👑'
    },
    {
      title: 'Dental Implants',
      description: 'The gold standard for replacing missing teeth with permanent solutions.',
      features: [
        'Single tooth replacement',
        'Multiple tooth replacement',
        'Full arch restoration',
        'Implant-supported dentures',
        'Lifetime solution'
      ],
      icon: '🦷'
    },
    {
      title: 'Root Canal Therapy',
      description: 'Save severely damaged teeth with advanced root canal treatment.',
      features: [
        'Pain relief',
        'Tooth preservation',
        'Advanced technology',
        'Comfortable treatment',
        'High success rate'
      ],
      icon: '🔧'
    },
    {
      title: 'Dental Bonding',
      description: 'Quick and cost-effective way to improve the appearance of damaged teeth.',
      features: [
        'Repair chipped teeth',
        'Close gaps between teeth',
        'Improve tooth shape',
        'Single visit treatment',
        'Natural appearance'
      ],
      icon: '✨'
    }
  ];
}
