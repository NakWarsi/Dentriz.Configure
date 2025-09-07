import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface AwardItem {
  id: number;
  title: string;
  type: string;
  year: string;
  description: string;
  image: string;
  organization: string;
  significance: string;
}

@Component({
  selector: 'app-awards-recognition',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './awards-recognition.component.html',
  styleUrls: ['./awards-recognition.component.css']
})
export class AwardsRecognitionComponent {
  selectedAward: AwardItem | null = null;
  showModal = false;

  awards: AwardItem[] = [
    {
      id: 1,
      title: "Excellence in Dental Care Award",
      type: "Professional Recognition",
      year: "2024",
      description: "Recognized for outstanding patient care and clinical excellence",
      image: "assets/images/gallery/awards-recognition/award1.jpg",
      organization: "American Dental Association",
      significance: "This prestigious award recognizes dental practices that demonstrate exceptional patient care, clinical excellence, and commitment to advancing the field of dentistry."
    },
    {
      id: 2,
      title: "Top Dentist Certification",
      type: "Certification",
      year: "2023",
      description: "Certified as a top dentist in the region by peer recognition",
      image: "assets/images/gallery/awards-recognition/award2.jpg",
      organization: "Local Dental Society",
      significance: "This certification is awarded based on peer nominations and recognition from fellow dental professionals, acknowledging our commitment to excellence."
    },
    {
      id: 3,
      title: "Patient Satisfaction Award",
      type: "Patient Recognition",
      year: "2023",
      description: "Highest patient satisfaction ratings in the community",
      image: "assets/images/gallery/awards-recognition/award3.jpg",
      organization: "Healthcare Consumer Reports",
      significance: "This award is based on patient feedback and satisfaction surveys, reflecting our dedication to providing exceptional patient experiences."
    },
    {
      id: 4,
      title: "Innovation in Dentistry Award",
      type: "Innovation Recognition",
      year: "2022",
      description: "Recognized for implementing cutting-edge dental technologies",
      image: "assets/images/gallery/awards-recognition/award4.jpg",
      organization: "Dental Technology Institute",
      significance: "This award recognizes our commitment to staying at the forefront of dental technology and providing patients with the most advanced treatment options."
    }
  ];

  openModal(award: AwardItem) {
    this.selectedAward = award;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedAward = null;
  }
}
