import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GalleryHeroApiService, SimpleGalleryHeroConfig } from './services/gallery-hero-api.service';

@Component({
  selector: 'app-smile-gallery',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './smile-gallery.component.html',
  styleUrls: ['./smile-gallery.component.css']
})
export class SmileGalleryComponent implements OnInit {
  // Gallery Hero Configuration
  galleryHeroConfig: SimpleGalleryHeroConfig | null = null;
  originalGalleryHeroConfig: SimpleGalleryHeroConfig | null = null;
  galleryHeroLoading = false;
  galleryHeroError = false;
  isEditingGalleryHero = false;
  editingGalleryHeroElement: string | null = null;

  constructor(private galleryHeroApiService: GalleryHeroApiService) {}

  ngOnInit() {
    this.loadGalleryHeroConfig();
  }

  // Gallery Hero Configuration Methods
  loadGalleryHeroConfig() {
    this.galleryHeroLoading = true;
    this.galleryHeroError = false;

    this.galleryHeroApiService.loadConfig().subscribe({
      next: (config) => {
        this.galleryHeroConfig = config;
        this.originalGalleryHeroConfig = JSON.parse(JSON.stringify(config));
        this.galleryHeroLoading = false;
      },
      error: (error) => {
        console.error('Error loading gallery hero config:', error);
        this.galleryHeroError = true;
        this.galleryHeroLoading = false;
      }
    });
  }

  startEditingGalleryHero() {
    this.isEditingGalleryHero = true;
  }

  stopEditingGalleryHero() {
    if (this.galleryHeroConfig) {
      this.galleryHeroApiService.saveConfig(this.galleryHeroConfig).subscribe({
        next: () => {
          this.originalGalleryHeroConfig = JSON.parse(JSON.stringify(this.galleryHeroConfig!));
          this.isEditingGalleryHero = false;
          this.editingGalleryHeroElement = null;
        },
        error: (error) => {
          console.error('Error saving gallery hero config:', error);
          alert('Error saving changes. Please try again.');
        }
      });
    }
  }

  cancelEditingGalleryHero() {
    if (this.originalGalleryHeroConfig) {
      this.galleryHeroConfig = JSON.parse(JSON.stringify(this.originalGalleryHeroConfig));
    }
    this.isEditingGalleryHero = false;
    this.editingGalleryHeroElement = null;
  }

  resetGalleryHeroToOriginal() {
    if (this.originalGalleryHeroConfig) {
      this.galleryHeroConfig = JSON.parse(JSON.stringify(this.originalGalleryHeroConfig));
    }
  }

  startInlineEditGalleryHero(element: string) {
    this.editingGalleryHeroElement = element;
  }

  stopInlineEditGalleryHero() {
    this.editingGalleryHeroElement = null;
  }

  onGalleryHeroColorChange() {
    // This method is called when any color input changes
    // The actual saving happens when the user clicks "Save Changes"
  }

  onGalleryHeroFontChange() {
    // This method is called when any font input changes
    // The actual saving happens when the user clicks "Save Changes"
  }
  // SEO-OPTIMIZED GALLERY SECTIONS - FOR SEARCH ENGINE OPTIMIZATION ONLY
  gallerySections = [
    { 
      id: 'before-after', 
      title: 'Before & After', 
      description: 'Cosmetic dentistry transformations in Wakad and dental implants in Pune. Professional teeth whitening in Wakad and veneers in Wakad showcasing the best dental clinic in Wakad.', 
      imageCount: 12, 
      route: '/smile-gallery/before-after',
      color: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)'
    },
    { 
      id: 'our-work', 
      title: 'Our Work', 
      description: 'Restorative dentistry in Wakad and emergency dental care in Wakad. Expert orthodontist in Wakad and pediatric dentist Pune showcasing dental work at DentRiz Dental Clinic.', 
      imageCount: 15, 
      route: '/smile-gallery/our-work',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    { 
      id: 'smile-transformations', 
      title: 'Smile Transformations', 
      description: 'Invisalign treatment in Pune and preventive care in Wakad. Complete smile makeovers with cosmetic dentistry in Wakad and dental implants in Pune at the top dentist in Pune.', 
      imageCount: 8, 
      route: '/smile-gallery/smile-transformations',
      color: 'linear-gradient(135deg, #2ed573 0%, #1e90ff 100%)'
    },
    { 
      id: 'smile-showcase', 
      title: 'Our Smile Showcase', 
      description: 'Periodontics in Wakad and endodontics in Wakad. Professional oral surgery in Pune and teeth whitening in Wakad showcasing the best dental clinic in Hinjewadi.', 
      imageCount: 20, 
      route: '/smile-gallery/smile-showcase',
      color: 'linear-gradient(135deg, #ffa726 0%, #ff7043 100%)'
    },
    { 
      id: 'clinic-photos', 
      title: 'Clinic Photos', 
      description: 'Modern dental facility in Wakad with advanced technology. State-of-the-art equipment for cosmetic dentistry in Wakad and dental implants in Pune at DentRiz Dental Clinic.', 
      imageCount: 10, 
      route: '/smile-gallery/clinic-photos',
      color: 'linear-gradient(135deg, #42a5f5 0%, #1976d2 100%)'
    },
    { 
      id: 'events', 
      title: 'Events', 
      description: 'Dental health awareness programs in Wakad and community events in Hinjewadi. Educational seminars on preventive care in Wakad and emergency dental care in Wakad.', 
      imageCount: 6, 
      route: '/smile-gallery/events',
      color: 'linear-gradient(135deg, #ab47bc 0%, #8e24aa 100%)'
    },
    { 
      id: 'patient-stories', 
      title: 'Patient Stories', 
      description: 'Dental journey experiences with the best dentist in Wakad. Success stories from cosmetic dentistry in Wakad and dental implants in Pune at DentRiz Dental Clinic.', 
      imageCount: 8, 
      route: '/smile-gallery/patient-stories',
      color: 'linear-gradient(135deg, #26a69a 0%, #00897b 100%)'
    },
    { 
      id: 'technology-showcase', 
      title: 'Technology Showcase', 
      description: 'Advanced dental technology in Wakad and modern equipment in Hinjewadi. Latest tools for orthodontics in Wakad and pediatric dentistry in Pune at the top dentist in Pune.', 
      imageCount: 5, 
      route: '/smile-gallery/technology-showcase',
      color: 'linear-gradient(135deg, #78909c 0%, #546e7a 100%)'
    },
    { 
      id: 'team-gallery', 
      title: 'Team Gallery', 
      description: 'Expert dental team in Wakad and skilled professionals in Hinjewadi. Experienced cosmetic dentist Pune and orthodontist in Wakad at DentRiz Dental Clinic.', 
      imageCount: 7, 
      route: '/smile-gallery/team-gallery',
      color: 'linear-gradient(135deg, #ff7043 0%, #e64a19 100%)'
    },
    { 
      id: 'awards-recognition', 
      title: 'Awards & Recognition', 
      description: 'Professional recognition for the best dental clinic in Wakad. Awards for cosmetic dentistry in Wakad and dental implants in Pune at DentRiz Dental Clinic.', 
      imageCount: 4, 
      route: '/smile-gallery/awards-recognition',
      color: 'linear-gradient(135deg, #ffd54f 0%, #ffb300 100%)'
    }
  ];
}
