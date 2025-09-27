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
      description: "Comprehensive transformation including veneers in Roadpali, teeth whitening in Roadpali, and gum contouring at the best dental clinic in Roadpali",
      procedures: ["Porcelain Veneers", "Teeth Whitening", "Gum Contouring"],
      seoKeywords: "cosmetic dentistry in Roadpali, veneers in Roadpali, teeth whitening in Roadpali, best dental clinic in Roadpali"
    },
    {
      id: 2,
      transformationType: "Orthodontic Transformation",
      duration: "18 months",
      beforeImage: "assets/images/gallery/smile-transformations/transformation2-before.jpg",
      afterImage: "assets/images/gallery/smile-transformations/transformation2-after.jpg",
      description: "Complete orthodontic treatment with Invisalign treatment in Navi Mumbai at the top dentist in Navi Mumbai",
      procedures: ["Invisalign Treatment", "Teeth Whitening"],
      seoKeywords: "Invisalign treatment in Navi Mumbai, orthodontist in Roadpali, top dentist in Navi Mumbai"
    },
    {
      id: 3,
      transformationType: "Dental Implant Transformation",
      duration: "4 months",
      beforeImage: "assets/images/gallery/smile-transformations/transformation3-before.jpg",
      afterImage: "assets/images/gallery/smile-transformations/transformation3-after.jpg",
      description: "Multiple dental implants in Navi Mumbai to restore missing teeth at ClinSmile Dental Clinic",
      procedures: ["Dental Implants", "Crown Placement"],
      seoKeywords: "dental implants in Navi Mumbai, ClinSmile Dental Clinic, best dentist in Roadpali"
    },
    {
      id: 4,
      transformationType: "Cosmetic Dentistry Makeover",
      duration: "3 months",
      beforeImage: "assets/images/gallery/smile-transformations/transformation4-before.jpg",
      afterImage: "assets/images/gallery/smile-transformations/transformation4-after.jpg",
      description: "Cosmetic bonding and teeth whitening in Roadpali at the best dental clinic in Kalamboli",
      procedures: ["Composite Bonding", "Professional Whitening"],
      seoKeywords: "cosmetic dentistry in Roadpali, teeth whitening in Roadpali, best dental clinic in Kalamboli"
    },
    {
      id: 5,
      transformationType: "Veneer Transformation",
      duration: "2 months",
      beforeImage: "assets/images/gallery/smile-transformations/transformation5-before.jpg",
      afterImage: "assets/images/gallery/smile-transformations/transformation5-after.jpg",
      description: "Porcelain veneers in Roadpali for a perfect smile with experienced cosmetic dentist Navi Mumbai",
      procedures: ["Porcelain Veneers", "Gum Contouring"],
      seoKeywords: "veneers in Roadpali, cosmetic dentist Navi Mumbai, dental implants in Navi Mumbai"
    },
    {
      id: 6,
      transformationType: "Full Mouth Reconstruction",
      duration: "8 months",
      beforeImage: "assets/images/gallery/smile-transformations/transformation6-before.jpg",
      afterImage: "assets/images/gallery/smile-transformations/transformation6-after.jpg",
      description: "Complete reconstruction including dental implants in Navi Mumbai and cosmetic work at the top dentist in Navi Mumbai",
      procedures: ["Dental Implants", "Crowns", "Veneers", "Whitening"],
      seoKeywords: "dental implants in Navi Mumbai, top dentist in Navi Mumbai, cosmetic dentistry in Roadpali"
    },
    {
      id: 7,
      transformationType: "Braces to Beautiful",
      duration: "24 months",
      beforeImage: "assets/images/gallery/smile-transformations/transformation7-before.jpg",
      afterImage: "assets/images/gallery/smile-transformations/transformation7-after.jpg",
      description: "Traditional braces treatment for severe misalignment with expert orthodontist in Roadpali",
      procedures: ["Traditional Braces", "Teeth Whitening", "Retainer"],
      seoKeywords: "orthodontist in Roadpali, braces in Roadpali, best dentist in Roadpali"
    },
    {
      id: 8,
      transformationType: "Emergency to Excellence",
      duration: "5 months",
      beforeImage: "assets/images/gallery/smile-transformations/transformation8-before.jpg",
      afterImage: "assets/images/gallery/smile-transformations/transformation8-after.jpg",
      description: "Emergency dental care in Roadpali transformed into beautiful smile at ClinSmile Dental Clinic",
      procedures: ["Emergency Treatment", "Implants", "Cosmetic Work"],
      seoKeywords: "emergency dental care in Roadpali, ClinSmile Dental Clinic, best dental clinic in Roadpali"
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
