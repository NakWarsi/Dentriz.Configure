import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  // Doctors carousel data
  doctors = [
    {
      name: 'Dr. Rizwana Khan, BDS',
      title: 'Founder and Chief Dentist',
      title2: 'owner',
      image: '/images/home/dr-rizwana-khan-c1.jpg',
      bio: [
        'Dr. Rizwana Khan is a highly skilled dental professional with a <strong>Bachelor of Dental Surgery (BDS)</strong> degree from <strong>Government Dental College, Mumbai</strong> — one of India\'s premier dental institutions.',
        'She has over <strong>8 years of clinical experience</strong> in dentistry, including <strong>3 years of service as a government dentist at GDC Mumbai</strong>, where she gained extensive expertise in treating a wide range of dental conditions.',
        'Dr. Rizwana specializes in <strong>cosmetic dentistry, Invisalign treatment, and comprehensive family care</strong>. Known for her gentle approach, clear communication, and attention to detail, she ensures that every patient feels comfortable and confident throughout their treatment journey.'
      ],
      specialties: ['Cosmetic Dentistry', 'Invisalign', 'Family & Preventive Care', 'Restorative Dentistry']
    },
    {
      name: 'Dr. Ahmed Ameen, BDS',
      title: 'Orthodontist & Implant Specialist',      
      title2: 'visting consultant',
      image: '/images/doctors/dr-ahmed-ameen.jpg',
      bio: [
        'Dr. Ahmed Ameen is a specialized orthodontist with advanced training in dental implants and orthodontic treatments.',
        'With <strong>10+ years of experience</strong> in orthodontics, he specializes in <strong>braces, Invisalign, and dental implant procedures</strong>.',
        'Dr. Ameen is known for his precision in complex cases and his ability to create beautiful, functional smiles for patients of all ages.'
      ],
      specialties: ['Orthodontics', 'Dental Implants', 'Braces & Aligners', 'Smile Design']
    },
    {
      name: 'Dr. Sarah Johnson, MDS',
      title: 'Pediatric Dentist',     
      title2: 'visting consultant',
      image: '/images/doctors/dr-sarah-johnson.jpg',
      bio: [
        'Dr. Sarah Johnson is a dedicated pediatric dentist with a passion for making dental care enjoyable for children.',
        'She has <strong>12 years of experience</strong> in pediatric dentistry and specializes in <strong>child-friendly treatments, preventive care, and early orthodontic intervention</strong>.',
        'Dr. Johnson creates a warm, welcoming environment that helps children develop positive attitudes toward dental health from an early age.'
      ],
      specialties: ['Pediatric Dentistry', 'Preventive Care', 'Child-Friendly Treatments', 'Early Orthodontics']
    },
    {
      name: 'Dr. Michael Chen, BDS',
      title: 'Endodontist & Root Canal Specialist',     
      title2: 'visting consultant',
      image: '/images/doctors/dr-michael-chen.jpg',
      bio: [
        'Dr. Michael Chen is an experienced endodontist specializing in root canal treatments and endodontic procedures.',
        'With <strong>9 years of expertise</strong> in endodontics, he provides <strong>painless root canal treatments, endodontic surgery, and emergency dental care</strong>.',
        'Dr. Chen uses advanced technology and techniques to ensure comfortable, successful treatments for complex dental cases.'
      ],
      specialties: ['Root Canal Treatment', 'Endodontics', 'Emergency Care', 'Dental Surgery']
    }
  ];

  currentDoctorIndex = 0;

  // Navigation methods
  nextDoctor() {
    this.currentDoctorIndex = (this.currentDoctorIndex + 1) % this.doctors.length;
  }

  previousDoctor() {
    this.currentDoctorIndex = this.currentDoctorIndex === 0 
      ? this.doctors.length - 1 
      : this.currentDoctorIndex - 1;
  }

  goToDoctor(index: number) {
    this.currentDoctorIndex = index;
  }

  // Handle image loading errors
  onImageError(event: any) {
    console.warn('Doctor image failed to load:', event.target.src);
    // Fallback to placeholder emoji
    event.target.style.display = 'none';
    event.target.nextElementSibling.style.display = 'flex';
  }

  // Auto-advance carousel (optional)
  ngOnInit() {
    // Auto-advance every 8 seconds
    setInterval(() => {
      this.nextDoctor();
    }, 8000);
  }

  teamMembers = [
    {
      name: 'Dr. Sarah Johnson',
      position: 'Lead Dentist',
      description: 'With over 15 years of experience in general and cosmetic dentistry.',
      image: '👩‍⚕️'
    },
    {
      name: 'Dr. Michael Chen',
      position: 'Orthodontist',
      description: 'Specialized in braces and orthodontic treatments for all ages.',
      image: '👨‍⚕️'
    },
    {
      name: 'Dr. Emily Rodriguez',
      position: 'Pediatric Dentist',
      description: 'Dedicated to making dental visits fun and comfortable for children.',
      image: '��‍⚕️'
    }
  ];
}
