import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface ClinicPhoto {
  id: number;
  title: string;
  area: string;
  description: string;
  image: string;
  features: string[];
}

@Component({
  selector: 'app-clinic-photos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './clinic-photos.component.html',
  styleUrls: ['./clinic-photos.component.css']
})
export class ClinicPhotosComponent {
  selectedPhoto: ClinicPhoto | null = null;
  showModal = false;

  clinicPhotos: ClinicPhoto[] = [
    {
      id: 1,
      title: "Reception Area",
      area: "reception",
      description: "Welcome to our modern, comfortable reception area designed for your relaxation",
      image: "assets/images/gallery/clinic-photos/reception1.jpg",
      features: ["Comfortable seating", "Free WiFi", "Refreshments", "Magazines & TV"]
    },
    {
      id: 2,
      title: "Reception Desk",
      area: "reception",
      description: "Our friendly staff ready to assist you with appointments and information",
      image: "assets/images/gallery/clinic-photos/reception2.jpg",
      features: ["Professional staff", "Easy check-in", "Insurance assistance", "Payment options"]
    },
    {
      id: 3,
      title: "Waiting Area",
      area: "waiting",
      description: "Spacious waiting area with modern amenities for your comfort",
      image: "assets/images/gallery/clinic-photos/waiting-area1.jpg",
      features: ["Comfortable chairs", "Entertainment", "Reading materials", "Children's area"]
    },
    {
      id: 4,
      title: "Relaxation Zone",
      area: "waiting",
      description: "Dedicated relaxation area for patients who need a quiet space",
      image: "assets/images/gallery/clinic-photos/waiting-area2.jpg",
      features: ["Quiet environment", "Comfortable seating", "Calming decor", "Privacy"]
    },
    {
      id: 5,
      title: "Treatment Room 1",
      area: "treatment",
      description: "State-of-the-art treatment room equipped with latest technology",
      image: "assets/images/gallery/clinic-photos/treatment-room1.jpg",
      features: ["Advanced equipment", "Comfortable chair", "Sterile environment", "Modern lighting"]
    },
    {
      id: 6,
      title: "Treatment Room 2",
      area: "treatment",
      description: "Another modern treatment room for various dental procedures",
      image: "assets/images/gallery/clinic-photos/treatment-room2.jpg",
      features: ["Digital X-ray", "Intraoral camera", "Comfort amenities", "Privacy curtains"]
    },
    {
      id: 7,
      title: "Dental Equipment",
      area: "equipment",
      description: "Advanced dental equipment for precise and comfortable treatment",
      image: "assets/images/gallery/clinic-photos/equipment1.jpg",
      features: ["Digital scanners", "3D imaging", "Laser technology", "Sterilization units"]
    },
    {
      id: 8,
      title: "Advanced Technology",
      area: "equipment",
      description: "Cutting-edge technology for the best possible dental care",
      image: "assets/images/gallery/clinic-photos/equipment2.jpg",
      features: ["CBCT scanner", "CAD/CAM system", "Digital impressions", "Treatment planning"]
    },
    {
      id: 9,
      title: "Staff Area",
      area: "staff",
      description: "Our dedicated team's workspace for coordination and patient care",
      image: "assets/images/gallery/clinic-photos/staff-area1.jpg",
      features: ["Team collaboration", "Patient records", "Communication center", "Professional environment"]
    },
    {
      id: 10,
      title: "Staff Lounge",
      area: "staff",
      description: "Comfortable break area for our hardworking dental team",
      image: "assets/images/gallery/clinic-photos/staff-area2.jpg",
      features: ["Break room", "Kitchen facilities", "Rest area", "Team bonding space"]
    }
  ];

  openModal(photo: ClinicPhoto) {
    this.selectedPhoto = photo;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedPhoto = null;
  }
}
