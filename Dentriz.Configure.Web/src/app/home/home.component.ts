import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FounderSectionApiService, SimpleFounderConfig } from './services/founder-section-api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  // Founder section properties (following reference project pattern)
  @ViewChild('subtitleInput') subtitleInput!: ElementRef<HTMLInputElement>;
  
  founderConfig: SimpleFounderConfig | null = null;
  founderLoading = true;
  founderError = false;
  isEditingFounder = false;
  originalFounderData: any = {};
  editingElement: string | null = null;

  constructor(
    private http: HttpClient,
    private founderSectionApiService: FounderSectionApiService
  ) {}

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
    this.loadFounderSectionConfig();
    // Auto-advance every 5 seconds
    setInterval(() => {
      this.nextImage();
    }, 5000);
  }

  // Founder section methods (following reference project pattern)
  private loadFounderSectionConfig(): void {
    this.founderSectionApiService.loadConfig().subscribe({
      next: (config) => {
        console.log('Founder section config loaded successfully:', config);
        this.founderConfig = config;
        this.founderLoading = false;
      },
      error: (error) => {
        console.error('Error loading founder section configuration:', error);
        this.founderError = true;
        this.founderLoading = false;
      }
    });
  }

  startEditingFounder(): void {
    if (!this.founderConfig) return;

    this.isEditingFounder = true;
    this.originalFounderData = JSON.parse(JSON.stringify(this.founderConfig));

    // Focus the first input after the view updates
    setTimeout(() => {
      if (this.subtitleInput) {
        this.subtitleInput.nativeElement.focus();
        this.subtitleInput.nativeElement.select();
      }
    }, 0);
  }

  stopEditingFounder(): void {
    this.isEditingFounder = false;
    this.saveFounderSectionConfig();
    console.log('Founder section updated:', this.founderConfig);
  }

  private saveFounderSectionConfig(): void {
    if (!this.founderConfig) return;

    console.log('Saving founder section config:', this.founderConfig);
    
    // Save to localStorage as backup - only in browser
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('dentrizFounderSectionConfig', JSON.stringify(this.founderConfig));
      console.log('Founder section config saved to localStorage');
    }
  }

  cancelEditingFounder(): void {
    if (!this.founderConfig) return;

    this.founderConfig = { ...this.originalFounderData };
    this.isEditingFounder = false;
  }

  resetFounderToOriginal(): void {
    // Clear saved config and reload from JSON file - only in browser
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('dentrizFounderSectionConfig');
    }
    this.founderLoading = true;
    this.founderError = false;
    this.loadFounderSectionConfig();
    this.isEditingFounder = false;
  }

  addSpecialty(): void {
    if (!this.founderConfig) return;
    this.founderConfig.specialties.push('');
  }

  removeSpecialty(index: number): void {
    if (!this.founderConfig) return;
    this.founderConfig.specialties.splice(index, 1);
  }

  applyDynamicStyles(): void {
    if (!this.founderConfig || typeof document === 'undefined') return;

    const root = document.documentElement;
    root.style.setProperty('--founder-background-color', this.founderConfig.backgroundColor);
  }

  startInlineEdit(element: string): void {
    if (!this.isEditingFounder) return;
    this.editingElement = element;
  }

  stopInlineEdit(): void {
    this.editingElement = null;
  }
}
