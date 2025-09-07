import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-oral-surgery',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './oral-surgery.component.html',
  styleUrl: './oral-surgery.component.css'
})
export class OralSurgeryComponent {
  services = [
    {
      title: 'Tooth Extractions',
      description: 'Safe and comfortable removal of damaged, decayed, or problematic teeth.',
      icon: '🦷',
      features: ['Simple extractions', 'Surgical extractions', 'Minimal discomfort', 'Quick recovery']
    },
    {
      title: 'Wisdom Teeth Removal',
      description: 'Specialized extraction of impacted or problematic wisdom teeth.',
      icon: '🧠',
      features: ['Impacted teeth', 'Sedation options', 'Minimal swelling', 'Expert care']
    },
    {
      title: 'Dental Implant Surgery',
      description: 'Surgical placement of dental implants for permanent tooth replacement.',
      icon: '🔩',
      features: ['Bone grafting', 'Implant placement', 'Advanced technology', 'Long-term success']
    },
    {
      title: 'Bone Grafting',
      description: 'Surgical procedures to rebuild jawbone structure for dental implants.',
      icon: '🦴',
      features: ['Bone regeneration', 'Implant preparation', 'Natural materials', 'Proven results']
    },
    {
      title: 'Oral Pathology',
      description: 'Diagnosis and treatment of oral diseases and abnormal tissue growth.',
      icon: '🔬',
      features: ['Biopsy procedures', 'Cancer screening', 'Early detection', 'Specialized care']
    },
    {
      title: 'Jaw Surgery',
      description: 'Corrective jaw surgery to improve function, appearance, and oral health.',
      icon: '🦴',
      features: ['Orthognathic surgery', 'TMJ treatment', 'Facial reconstruction', 'Improved function']
    }
  ];

  benefits = [
    {
      title: 'Expert Surgical Care',
      description: 'Experienced oral surgeons with advanced training in complex procedures.'
    },
    {
      title: 'Advanced Technology',
      description: 'State-of-the-art surgical equipment and techniques for optimal outcomes.'
    },
    {
      title: 'Comfortable Experience',
      description: 'Multiple sedation options to ensure your comfort during procedures.'
    },
    {
      title: 'Comprehensive Care',
      description: 'Complete pre and post-operative care for successful recovery.'
    }
  ];

  procedures = [
    {
      title: 'Simple Extractions',
      description: 'Removal of visible teeth that can be easily accessed',
      duration: '30-60 minutes',
      recovery: '1-3 days'
    },
    {
      title: 'Surgical Extractions',
      description: 'Complex removal of impacted or broken teeth',
      duration: '1-2 hours',
      recovery: '3-7 days'
    },
    {
      title: 'Wisdom Teeth Removal',
      description: 'Extraction of third molars, often impacted',
      duration: '1-3 hours',
      recovery: '5-10 days'
    },
    {
      title: 'Dental Implant Surgery',
      description: 'Surgical placement of titanium implants',
      duration: '1-2 hours',
      recovery: '3-6 months'
    }
  ];

  sedationOptions = [
    {
      type: 'Local Anesthesia',
      description: 'Numbing medication for the treatment area',
      level: 'Minimal sedation',
      recovery: 'Immediate'
    },
    {
      type: 'Nitrous Oxide',
      description: 'Laughing gas for relaxation during procedures',
      level: 'Mild sedation',
      recovery: 'Same day'
    },
    {
      type: 'Oral Sedation',
      description: 'Prescription medication for anxiety relief',
      level: 'Moderate sedation',
      recovery: 'Same day'
    },
    {
      type: 'IV Sedation',
      description: 'Intravenous medication for deep relaxation',
      level: 'Deep sedation',
      recovery: 'Same day'
    }
  ];
}
