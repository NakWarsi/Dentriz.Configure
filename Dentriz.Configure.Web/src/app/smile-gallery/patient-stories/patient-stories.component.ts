import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface PatientStory {
  id: number;
  treatment: string;
  story: string;
  image: string;
  rating: number;
  duration: string;
  seoKeywords: string;
}

@Component({
  selector: 'app-patient-stories',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './patient-stories.component.html',
  styleUrls: ['./patient-stories.component.css']
})
export class PatientStoriesComponent {
  selectedStory: PatientStory | null = null;
  showModal = false;

  // SEO-OPTIMIZED PATIENT STORIES - FOR SEARCH ENGINE OPTIMIZATION ONLY
  patientStories: PatientStory[] = [
    {
      id: 1,
      treatment: "Complete Smile Makeover",
      story: "Dental journey experiences with the best dentist in Wakad. Success stories from cosmetic dentistry in Wakad and dental implants in Pune at DentRiz Dental Clinic. The confidence boost has changed lives both personally and professionally.",
      image: "assets/images/gallery/patient-stories/patient1.jpg",
      rating: 5,
      duration: "6 months",
      seoKeywords: "best dentist in Wakad, cosmetic dentistry in Wakad, dental implants in Pune, DentRiz Dental Clinic"
    },
    {
      id: 2,
      treatment: "Dental Implants",
      story: "Multiple dental implants in Pune to restore missing teeth at DentRiz Dental Clinic. The dental implant procedure was smooth, and now patients can eat anything they want. The implants look and feel completely natural.",
      image: "assets/images/gallery/patient-stories/patient2.jpg",
      rating: 5,
      duration: "4 months",
      seoKeywords: "dental implants in Pune, DentRiz Dental Clinic, best dentist in Wakad"
    },
    {
      id: 3,
      treatment: "Invisalign Treatment",
      story: "Invisalign treatment in Pune at the top dentist in Pune. The treatment was comfortable, discreet, and the results are amazing. Expert orthodontist in Wakad provides exceptional care.",
      image: "assets/images/gallery/patient-stories/patient3.jpg",
      rating: 5,
      duration: "18 months",
      seoKeywords: "Invisalign treatment in Pune, top dentist in Pune, orthodontist in Wakad"
    },
    {
      id: 4,
      treatment: "Emergency Dental Care",
      story: "Emergency dental care in Wakad with the best dental clinic in Wakad. The team was incredibly responsive and caring. They not only fixed immediate problems but also helped prevent future issues.",
      image: "assets/images/gallery/patient-stories/patient4.jpg",
      rating: 5,
      duration: "1 day",
      seoKeywords: "emergency dental care in Wakad, best dental clinic in Wakad, DentRiz Dental Clinic"
    },
    {
      id: 5,
      treatment: "Teeth Whitening & Veneers",
      story: "Teeth whitening in Wakad and veneers in Wakad at the best dental clinic in Hinjewadi. The combination of whitening and veneers provides perfect smiles. Experienced cosmetic dentist Pune delivers exceptional results.",
      image: "assets/images/gallery/patient-stories/patient5.jpg",
      rating: 5,
      duration: "3 months",
      seoKeywords: "teeth whitening in Wakad, veneers in Wakad, best dental clinic in Hinjewadi, cosmetic dentist Pune"
    },
    {
      id: 6,
      treatment: "Root Canal & Crown",
      story: "Root canal treatment in Pune and crown placement at the top dentist in Pune. The procedure was painless and the staff was reassuring. The crown looks perfect and patients are back to normal eating.",
      image: "assets/images/gallery/patient-stories/patient6.jpg",
      rating: 5,
      duration: "2 weeks",
      seoKeywords: "root canal treatment in Pune, top dentist in Pune, crown placement"
    },
    {
      id: 7,
      treatment: "Cosmetic Bonding",
      story: "Cosmetic bonding in Wakad at the best dental clinic in Wakad. The cosmetic bonding was quick, painless, and provides perfect smiles. Professional cosmetic dentistry in Wakad delivers excellent results.",
      image: "assets/images/gallery/patient-stories/patient7.jpg",
      rating: 5,
      duration: "1 hour",
      seoKeywords: "cosmetic bonding in Wakad, best dental clinic in Wakad, cosmetic dentistry in Wakad"
    },
    {
      id: 8,
      treatment: "Full Mouth Reconstruction",
      story: "Full mouth reconstruction in Pune at DentRiz Dental Clinic. Complete reconstruction including dental implants in Pune and cosmetic work at the top dentist in Pune. Life-changing results with confidence restored.",
      image: "assets/images/gallery/patient-stories/patient8.jpg",
      rating: 5,
      duration: "8 months",
      seoKeywords: "full mouth reconstruction in Pune, DentRiz Dental Clinic, dental implants in Pune, top dentist in Pune"
    }
  ];

  openModal(story: PatientStory) {
    this.selectedStory = story;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedStory = null;
  }
}
