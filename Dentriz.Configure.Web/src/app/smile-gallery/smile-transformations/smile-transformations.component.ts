import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface TransformationCase {
  id: number;
  transformationType: string;
  duration: string;
  beforeImage: string;
  afterImage: string;
  description: string;
  procedures: string[];
  seoKeywords: string;
}

@Component({
  selector: 'app-smile-transformations',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './smile-transformations.component.html',
  styleUrls: ['./smile-transformations.component.css']
})
export class SmileTransformationsComponent {
  selectedCase: TransformationCase | null = null;
  showModal = false;

  // SEO-OPTIMIZED SMILE TRANSFORMATIONS - FOR SEARCH ENGINE OPTIMIZATION ONLY
  transformationCases: TransformationCase[] = [
    {
      id: 1,
      transformationType: "Complete Smile Makeover",
      duration: "6 months",
      beforeImage: "assets/images/gallery/smile-transformations/transformation1-before.jpg",
      afterImage: "assets/images/gallery/smile-transformations/transformation1-after.jpg",
      description: "Comprehensive transformation including veneers in Wakad, teeth whitening in Wakad, and gum contouring at the best dental clinic in Wakad",
      procedures: ["Porcelain Veneers", "Teeth Whitening", "Gum Contouring"],
      seoKeywords: "cosmetic dentistry in Wakad, veneers in Wakad, teeth whitening in Wakad, best dental clinic in Wakad"
    },
    {
      id: 2,
      transformationType: "Orthodontic Transformation",
      duration: "18 months",
      beforeImage: "assets/images/gallery/smile-transformations/transformation2-before.jpg",
      afterImage: "assets/images/gallery/smile-transformations/transformation2-after.jpg",
      description: "Complete orthodontic treatment with Invisalign treatment in Pune at the top dentist in Pune",
      procedures: ["Invisalign Treatment", "Teeth Whitening"],
      seoKeywords: "Invisalign treatment in Pune, orthodontist in Wakad, top dentist in Pune"
    },
    {
      id: 3,
      transformationType: "Dental Implant Transformation",
      duration: "4 months",
      beforeImage: "assets/images/gallery/smile-transformations/transformation3-before.jpg",
      afterImage: "assets/images/gallery/smile-transformations/transformation3-after.jpg",
      description: "Multiple dental implants in Pune to restore missing teeth at DentRiz Dental Clinic",
      procedures: ["Dental Implants", "Crown Placement"],
      seoKeywords: "dental implants in Pune, DentRiz Dental Clinic, best dentist in Wakad"
    },
    {
      id: 4,
      transformationType: "Cosmetic Dentistry Makeover",
      duration: "3 months",
      beforeImage: "assets/images/gallery/smile-transformations/transformation4-before.jpg",
      afterImage: "assets/images/gallery/smile-transformations/transformation4-after.jpg",
      description: "Cosmetic bonding and teeth whitening in Wakad at the best dental clinic in Hinjewadi",
      procedures: ["Composite Bonding", "Professional Whitening"],
      seoKeywords: "cosmetic dentistry in Wakad, teeth whitening in Wakad, best dental clinic in Hinjewadi"
    },
    {
      id: 5,
      transformationType: "Veneer Transformation",
      duration: "2 months",
      beforeImage: "assets/images/gallery/smile-transformations/transformation5-before.jpg",
      afterImage: "assets/images/gallery/smile-transformations/transformation5-after.jpg",
      description: "Porcelain veneers in Wakad for a perfect smile with experienced cosmetic dentist Pune",
      procedures: ["Porcelain Veneers", "Gum Contouring"],
      seoKeywords: "veneers in Wakad, cosmetic dentist Pune, dental implants in Pune"
    },
    {
      id: 6,
      transformationType: "Full Mouth Reconstruction",
      duration: "8 months",
      beforeImage: "assets/images/gallery/smile-transformations/transformation6-before.jpg",
      afterImage: "assets/images/gallery/smile-transformations/transformation6-after.jpg",
      description: "Complete reconstruction including dental implants in Pune and cosmetic work at the top dentist in Pune",
      procedures: ["Dental Implants", "Crowns", "Veneers", "Whitening"],
      seoKeywords: "dental implants in Pune, top dentist in Pune, cosmetic dentistry in Wakad"
    },
    {
      id: 7,
      transformationType: "Braces to Beautiful",
      duration: "24 months",
      beforeImage: "assets/images/gallery/smile-transformations/transformation7-before.jpg",
      afterImage: "assets/images/gallery/smile-transformations/transformation7-after.jpg",
      description: "Traditional braces treatment for severe misalignment with expert orthodontist in Wakad",
      procedures: ["Traditional Braces", "Teeth Whitening", "Retainer"],
      seoKeywords: "orthodontist in Wakad, braces in Wakad, best dentist in Wakad"
    },
    {
      id: 8,
      transformationType: "Emergency to Excellence",
      duration: "5 months",
      beforeImage: "assets/images/gallery/smile-transformations/transformation8-before.jpg",
      afterImage: "assets/images/gallery/smile-transformations/transformation8-after.jpg",
      description: "Emergency dental care in Wakad transformed into beautiful smile at DentRiz Dental Clinic",
      procedures: ["Emergency Treatment", "Implants", "Cosmetic Work"],
      seoKeywords: "emergency dental care in Wakad, DentRiz Dental Clinic, best dental clinic in Wakad"
    }
  ];

  openModal(caseItem: TransformationCase) {
    this.selectedCase = caseItem;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedCase = null;
  }
}
