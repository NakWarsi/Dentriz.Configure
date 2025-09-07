import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface ShowcaseItem {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  treatment: string;
  patientAge: string;
  satisfaction: number;
}

@Component({
  selector: 'app-smile-showcase',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './smile-showcase.component.html',
  styleUrls: ['./smile-showcase.component.css']
})
export class SmileShowcaseComponent {
  selectedItem: ShowcaseItem | null = null;
  showModal = false;
  selectedCategory = 'all';

  showcaseItems: ShowcaseItem[] = [
    { id: 1, title: "Perfect Veneers", category: "cosmetic", description: "Beautiful porcelain veneers creating a stunning smile", image: "assets/images/gallery/smile-showcase/showcase1.jpg", treatment: "Porcelain Veneers", patientAge: "28", satisfaction: 100 },
    { id: 2, title: "Natural Implants", category: "implant", description: "Natural-looking dental implants that blend seamlessly", image: "assets/images/gallery/smile-showcase/showcase2.jpg", treatment: "Dental Implants", patientAge: "45", satisfaction: 98 },
    { id: 3, title: "Whitened Perfection", category: "cosmetic", description: "Professional whitening results that brighten any smile", image: "assets/images/gallery/smile-showcase/showcase3.jpg", treatment: "Professional Whitening", patientAge: "32", satisfaction: 95 },
    { id: 4, title: "Orthodontic Success", category: "orthodontics", description: "Perfectly aligned teeth through orthodontic treatment", image: "assets/images/gallery/smile-showcase/showcase4.jpg", treatment: "Invisalign", patientAge: "24", satisfaction: 97 },
    { id: 5, title: "Bonding Beauty", category: "cosmetic", description: "Composite bonding for minor imperfections", image: "assets/images/gallery/smile-showcase/showcase5.jpg", treatment: "Composite Bonding", patientAge: "29", satisfaction: 94 },
    { id: 6, title: "Crown Excellence", category: "restoration", description: "Beautiful crowns that restore function and beauty", image: "assets/images/gallery/smile-showcase/showcase6.jpg", treatment: "Porcelain Crowns", patientAge: "38", satisfaction: 96 },
    { id: 7, title: "Gum Contouring", category: "cosmetic", description: "Perfect gum line for a balanced smile", image: "assets/images/gallery/smile-showcase/showcase7.jpg", treatment: "Gum Contouring", patientAge: "26", satisfaction: 93 },
    { id: 8, title: "Bridge Work", category: "restoration", description: "Elegant bridge work replacing missing teeth", image: "assets/images/gallery/smile-showcase/showcase8.jpg", treatment: "Dental Bridge", patientAge: "52", satisfaction: 95 },
    { id: 9, title: "Full Arch Implants", category: "implant", description: "Complete arch restoration with implants", image: "assets/images/gallery/smile-showcase/showcase9.jpg", treatment: "Full Arch Implants", patientAge: "65", satisfaction: 99 },
    { id: 10, title: "Teen Transformation", category: "orthodontics", description: "Young patient's journey to a perfect smile", image: "assets/images/gallery/smile-showcase/showcase10.jpg", treatment: "Traditional Braces", patientAge: "16", satisfaction: 96 },
    { id: 11, title: "Senior Smile", category: "restoration", description: "Restoring confidence in our senior patients", image: "assets/images/gallery/smile-showcase/showcase11.jpg", treatment: "Multiple Procedures", patientAge: "72", satisfaction: 97 },
    { id: 12, title: "Celebrity Style", category: "cosmetic", description: "Red carpet ready smile transformation", image: "assets/images/gallery/smile-showcase/showcase12.jpg", treatment: "Complete Makeover", patientAge: "35", satisfaction: 100 },
    { id: 13, title: "Athlete's Smile", category: "restoration", description: "Sports injury recovery with beautiful results", image: "assets/images/gallery/smile-showcase/showcase13.jpg", treatment: "Trauma Restoration", patientAge: "23", satisfaction: 94 },
    { id: 14, title: "Business Professional", category: "cosmetic", description: "Confidence-boosting smile for career success", image: "assets/images/gallery/smile-showcase/showcase14.jpg", treatment: "Veneers & Whitening", patientAge: "41", satisfaction: 98 },
    { id: 15, title: "Wedding Ready", category: "cosmetic", description: "Perfect smile for the special day", image: "assets/images/gallery/smile-showcase/showcase15.jpg", treatment: "Complete Cosmetic", patientAge: "27", satisfaction: 100 },
    { id: 16, title: "Model Quality", category: "cosmetic", description: "Photography-ready smile perfection", image: "assets/images/gallery/smile-showcase/showcase16.jpg", treatment: "Veneers & Contouring", patientAge: "22", satisfaction: 99 },
    { id: 17, title: "Family Smile", category: "restoration", description: "Restoring smiles for the whole family", image: "assets/images/gallery/smile-showcase/showcase17.jpg", treatment: "Family Dentistry", patientAge: "40", satisfaction: 95 },
    { id: 18, title: "Emergency Recovery", category: "restoration", description: "From emergency to excellence", image: "assets/images/gallery/smile-showcase/showcase18.jpg", treatment: "Emergency Restoration", patientAge: "31", satisfaction: 93 },
    { id: 19, title: "Minimal Invasive", category: "cosmetic", description: "Beautiful results with minimal treatment", image: "assets/images/gallery/smile-showcase/showcase19.jpg", treatment: "Minimal Prep Veneers", patientAge: "33", satisfaction: 96 },
    { id: 20, title: "Lifetime Smile", category: "restoration", description: "Long-lasting beautiful smile restoration", image: "assets/images/gallery/smile-showcase/showcase20.jpg", treatment: "Comprehensive Care", patientAge: "48", satisfaction: 97 }
  ];

  categories = [
    { id: 'all', name: 'All Smiles' },
    { id: 'cosmetic', name: 'Cosmetic' },
    { id: 'implant', name: 'Implants' },
    { id: 'orthodontics', name: 'Orthodontics' },
    { id: 'restoration', name: 'Restoration' }
  ];

  get filteredItems() {
    if (this.selectedCategory === 'all') {
      return this.showcaseItems;
    }
    return this.showcaseItems.filter(item => item.category === this.selectedCategory);
  }

  openModal(item: ShowcaseItem) {
    this.selectedItem = item;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedItem = null;
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }
}
