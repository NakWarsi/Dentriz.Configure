import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface TechnologyItem {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  benefits: string[];
  specifications: string[];
}

@Component({
  selector: 'app-technology-showcase',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './technology-showcase.component.html',
  styleUrls: ['./technology-showcase.component.css']
})
export class TechnologyShowcaseComponent {
  selectedTech: TechnologyItem | null = null;
  showModal = false;

  technologyItems: TechnologyItem[] = [
    {
      id: 1,
      name: "3D CBCT Scanner",
      category: "imaging",
      description: "Advanced 3D imaging technology for precise diagnosis and treatment planning",
      image: "assets/images/gallery/technology-showcase/tech1.jpg",
      benefits: ["3D visualization", "Accurate diagnosis", "Reduced radiation", "Better treatment planning"],
      specifications: ["High resolution", "Low radiation dose", "Quick scan time", "3D reconstruction"]
    },
    {
      id: 2,
      name: "CAD/CAM System",
      category: "restoration",
      description: "Computer-aided design and manufacturing for same-day restorations",
      image: "assets/images/gallery/technology-showcase/tech2.jpg",
      benefits: ["Same-day crowns", "Precise fit", "Natural appearance", "Time saving"],
      specifications: ["Digital scanning", "3D modeling", "Ceramic milling", "Color matching"]
    },
    {
      id: 3,
      name: "Intraoral Scanner",
      category: "digital",
      description: "Digital impression technology eliminating traditional molds",
      image: "assets/images/gallery/technology-showcase/tech3.jpg",
      benefits: ["No messy impressions", "Instant results", "Better accuracy", "Patient comfort"],
      specifications: ["High accuracy", "Real-time scanning", "Color imaging", "Easy to use"]
    },
    {
      id: 4,
      name: "Laser Dentistry",
      category: "treatment",
      description: "Advanced laser technology for precise and painless procedures",
      image: "assets/images/gallery/technology-showcase/tech4.jpg",
      benefits: ["Minimal pain", "Faster healing", "Precise treatment", "Reduced bleeding"],
      specifications: ["Multiple wavelengths", "Tissue specific", "Minimal anesthesia", "Quick recovery"]
    },
    {
      id: 5,
      name: "Digital X-Ray System",
      category: "imaging",
      description: "Digital radiography for immediate results and reduced radiation",
      image: "assets/images/gallery/technology-showcase/tech5.jpg",
      benefits: ["Instant results", "Lower radiation", "Better image quality", "Easy storage"],
      specifications: ["High resolution", "Low radiation", "Digital storage", "Image enhancement"]
    }
  ];

  openModal(tech: TechnologyItem) {
    this.selectedTech = tech;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedTech = null;
  }
}
