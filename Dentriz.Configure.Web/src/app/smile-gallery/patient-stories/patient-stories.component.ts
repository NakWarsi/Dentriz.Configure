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
      story: "Dental journey experiences with the best dentist in Roadpali. Success stories from cosmetic dentistry in Roadpali and dental implants in Navi Mumbai at ClinSmile Dental Clinic. The confidence boost has changed lives both personally and professionally.",
      image: "assets/images/gallery/patient-stories/patient1.jpg",
      rating: 5,
      duration: "6 months",
      seoKeywords: "best dentist in Roadpali, cosmetic dentistry in Roadpali, dental implants in Navi Mumbai, ClinSmile Dental Clinic"
    },
    {
      id: 2,
      treatment: "Dental Implants",
      story: "Multiple dental implants in Navi Mumbai to restore missing teeth at ClinSmile Dental Clinic. The dental implant procedure was smooth, and now patients can eat anything they want. The implants look and feel completely natural.",
      image: "assets/images/gallery/patient-stories/patient2.jpg",
      rating: 5,
      duration: "4 months",
      seoKeywords: "dental implants in Navi Mumbai, ClinSmile Dental Clinic, best dentist in Roadpali"
    },
    {
      id: 3,
      treatment: "Invisalign Treatment",
      story: "Invisalign treatment in Navi Mumbai at the top dentist in Navi Mumbai. The treatment was comfortable, discreet, and the results are amazing. Expert orthodontist in Roadpali provides exceptional care.",
      image: "assets/images/gallery/patient-stories/patient3.jpg",
      rating: 5,
      duration: "18 months",
      seoKeywords: "Invisalign treatment in Navi Mumbai, top dentist in Navi Mumbai, orthodontist in Roadpali"
    },
    {
      id: 4,
      treatment: "Emergency Dental Care",
      story: "Emergency dental care in Roadpali with the best dental clinic in Roadpali. The team was incredibly responsive and caring. They not only fixed immediate problems but also helped prevent future issues.",
      image: "assets/images/gallery/patient-stories/patient4.jpg",
      rating: 5,
      duration: "1 day",
      seoKeywords: "emergency dental care in Roadpali, best dental clinic in Roadpali, ClinSmile Dental Clinic"
    },
    {
      id: 5,
      treatment: "Teeth Whitening & Veneers",
      story: "Teeth whitening in Roadpali and veneers in Roadpali at the best dental clinic in Kalamboli. The combination of whitening and veneers provides perfect smiles. Experienced cosmetic dentist Navi Mumbai delivers exceptional results.",
      image: "assets/images/gallery/patient-stories/patient5.jpg",
      rating: 5,
      duration: "3 months",
      seoKeywords: "teeth whitening in Roadpali, veneers in Roadpali, best dental clinic in Kalamboli, cosmetic dentist Navi Mumbai"
    },
    {
      id: 6,
      treatment: "Root Canal & Crown",
      story: "Root canal treatment in Navi Mumbai and crown placement at the top dentist in Navi Mumbai. The procedure was painless and the staff was reassuring. The crown looks perfect and patients are back to normal eating.",
      image: "assets/images/gallery/patient-stories/patient6.jpg",
      rating: 5,
      duration: "2 weeks",
      seoKeywords: "root canal treatment in Navi Mumbai, top dentist in Navi Mumbai, crown placement"
    },
    {
      id: 7,
      treatment: "Cosmetic Bonding",
      story: "Cosmetic bonding in Roadpali at the best dental clinic in Roadpali. The cosmetic bonding was quick, painless, and provides perfect smiles. Professional cosmetic dentistry in Roadpali delivers excellent results.",
      image: "assets/images/gallery/patient-stories/patient7.jpg",
      rating: 5,
      duration: "1 hour",
      seoKeywords: "cosmetic bonding in Roadpali, best dental clinic in Roadpali, cosmetic dentistry in Roadpali"
    },
    {
      id: 8,
      treatment: "Full Mouth Reconstruction",
      story: "Full mouth reconstruction in Navi Mumbai at ClinSmile Dental Clinic. Complete reconstruction including dental implants in Navi Mumbai and cosmetic work at the top dentist in Navi Mumbai. Life-changing results with confidence restored.",
      image: "assets/images/gallery/patient-stories/patient8.jpg",
      rating: 5,
      duration: "8 months",
      seoKeywords: "full mouth reconstruction in Navi Mumbai, ClinSmile Dental Clinic, dental implants in Navi Mumbai, top dentist in Navi Mumbai"
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
