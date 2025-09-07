import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // Clinic images carousel
  clinicImages = [
    {
      src: '/images/clinic/clinic-exterior.jpg',
      alt: 'DentRiz Dental Clinic Exterior',
      caption: 'Modern Dental Clinic'
    },
    {
      src: '/images/clinic/clinic-interior.jpg',
      alt: 'DentRiz Dental Clinic Interior',
      caption: 'State-of-the-Art Equipment'
    },
    // Add PNG images directly
    {
      src: '/images/clinic/1.jpg',
      alt: 'DentRiz Dental Clinic - Treatment Room',
      caption: 'Advanced Treatment Facilities'
    },
    {
      src: '/images/clinic/2.png',
      alt: 'DentRiz Dental Clinic - Waiting Area',
      caption: 'Comfortable Waiting Area'
    },
    {
      src: '/images/clinic/3.png',
      alt: 'DentRiz Dental Clinic - Modern Dental Chair',
      caption: 'State-of-the-Art Dental Equipment'
    }
  ];

  currentImageIndex = 0;

  // Navigation methods
  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.clinicImages.length;
  }

  previousImage() {
    this.currentImageIndex = this.currentImageIndex === 0 
      ? this.clinicImages.length - 1 
      : this.currentImageIndex - 1;
  }

  goToImage(index: number) {
    this.currentImageIndex = index;
  }

  // Handle image loading errors
  onImageError(event: any) {
    console.warn('Image failed to load:', event.target.src);
    // You can set a fallback image here if needed
    // event.target.src = '/images/clinic/fallback-image.jpg';
  }

  // Auto-advance carousel (optional)
  ngOnInit() {
    // Auto-advance every 5 seconds
    setInterval(() => {
      this.nextImage();
    }, 5000);
  }
}
