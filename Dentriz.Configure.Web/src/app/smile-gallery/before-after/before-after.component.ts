import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface BeforeAfterCase {
  id: number;
  treatment: string;
  duration: string;
  beforeImage: string;
  afterImage: string;
  description: string;
  seoKeywords: string;
}

@Component({
  selector: 'app-before-after',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './before-after.component.html',
  styleUrls: ['./before-after.component.css']
})
export class BeforeAfterComponent {
  selectedCase: BeforeAfterCase | null = null;
  showModal = false;

  // SEO-OPTIMIZED BEFORE & AFTER CASES - FOR SEARCH ENGINE OPTIMIZATION ONLY
  beforeAfterCases: BeforeAfterCase[] = [
    {
      id: 1,
      treatment: "Complete Smile Makeover",
      duration: "6 months",
      beforeImage: "assets/images/gallery/before-after/case1-before.jpg",
      afterImage: "assets/images/gallery/before-after/case1-after.jpg",
      description: "Comprehensive treatment including veneers in Wakad, teeth whitening in Wakad, and gum contouring at the best dental clinic in Wakad",
      seoKeywords: "cosmetic dentistry in Wakad, veneers in Wakad, teeth whitening in Wakad, best dental clinic in Wakad"
    },
    {
      id: 2,
      treatment: "Dental Implants",
      duration: "4 months",
      beforeImage: "assets/images/gallery/before-after/case2-before.jpg",
      afterImage: "assets/images/gallery/before-after/case2-after.jpg",
      description: "Multiple dental implants in Pune to restore missing teeth at DentRiz Dental Clinic",
      seoKeywords: "dental implants in Pune, top dentist in Pune, DentRiz Dental Clinic"
    },
    {
      id: 3,
      treatment: "Orthodontic Treatment",
      duration: "18 months",
      beforeImage: "assets/images/gallery/before-after/case3-before.jpg",
      afterImage: "assets/images/gallery/before-after/case3-after.jpg",
      description: "Invisalign treatment in Pune to straighten teeth and improve alignment with expert orthodontist in Wakad",
      seoKeywords: "Invisalign treatment in Pune, orthodontist in Wakad, best dentist in Wakad"
    },
    {
      id: 4,
      treatment: "Teeth Whitening & Bonding",
      duration: "2 weeks",
      beforeImage: "assets/images/gallery/before-after/case4-before.jpg",
      afterImage: "assets/images/gallery/before-after/case4-after.jpg",
      description: "Professional teeth whitening in Wakad and dental bonding for minor imperfections at the best dental clinic in Hinjewadi",
      seoKeywords: "teeth whitening in Wakad, best dental clinic in Hinjewadi, cosmetic dentistry in Wakad"
    },
    {
      id: 5,
      treatment: "Porcelain Veneers",
      duration: "3 months",
      beforeImage: "assets/images/gallery/before-after/case5-before.jpg",
      afterImage: "assets/images/gallery/before-after/case5-after.jpg",
      description: "Porcelain veneers in Wakad to transform smile appearance with experienced cosmetic dentist Pune",
      seoKeywords: "veneers in Wakad, cosmetic dentist Pune, dental implants in Pune"
    },
    {
      id: 6,
      treatment: "Full Mouth Reconstruction",
      duration: "8 months",
      beforeImage: "assets/images/gallery/before-after/case6-before.jpg",
      afterImage: "assets/images/gallery/before-after/case6-after.jpg",
      description: "Complete reconstruction including dental implants in Pune, crowns, and cosmetic work at the top dentist in Pune",
      seoKeywords: "dental implants in Pune, top dentist in Pune, cosmetic dentistry in Wakad"
    }
  ];

  openModal(caseItem: BeforeAfterCase) {
    this.selectedCase = caseItem;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedCase = null;
  }
}
