import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preventive-care',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preventive-care.component.html',
  styleUrls: ['./preventive-care.component.css']
})
export class PreventiveCareComponent {
  services = [
    {
      title: 'Routine Checkups & Cleanings',
      description: 'Regular dental checkups and professional cleanings are the foundation of good oral health.',
      features: [
        'Comprehensive oral examination',
        'Professional teeth cleaning',
        'Digital X-rays when needed',
        'Oral cancer screening',
        'Gum disease assessment'
      ],
      icon: '🦷'
    },
    {
      title: 'Family & Children\'s Dental Services',
      description: 'We welcome patients of all ages and provide gentle, age-appropriate care for children.',
      features: [
        'Child-friendly environment',
        'Early cavity detection',
        'Dental sealants',
        'Fluoride treatments',
        'Behavior management techniques'
      ],
      icon: '👨‍👩‍👧‍👦'
    },
    {
      title: 'Oral Health Education',
      description: 'We believe in empowering our patients with knowledge about proper oral hygiene.',
      features: [
        'Brushing and flossing techniques',
        'Nutrition guidance',
        'Preventive care tips',
        'Lifestyle recommendations',
        'Home care instructions'
      ],
      icon: '📚'
    },
    {
      title: 'Fluoride Treatments',
      description: 'Professional fluoride treatments to strengthen tooth enamel and prevent cavities.',
      features: [
        'Strengthens tooth enamel',
        'Reduces cavity risk',
        'Safe for all ages',
        'Quick and painless',
        'Long-lasting protection'
      ],
      icon: '💎'
    }
  ];
}
