import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FounderSectionApiService, SimpleFounderConfig } from './services/founder-section-api.service';
import { NewPatientSectionApiService, SimpleNewPatientConfig } from './services/new-patient-section-api.service';

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

  // New Patient Section properties
  newPatientConfig: SimpleNewPatientConfig | null = null;
  newPatientLoading = true;
  newPatientError = false;
  isEditingNewPatient = false;
  originalNewPatientData: any = {};
  editingNewPatientElement: string | null = null;

  constructor(
    private http: HttpClient,
    private founderSectionApiService: FounderSectionApiService,
    private newPatientSectionApiService: NewPatientSectionApiService
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
    this.loadNewPatientSectionConfig();
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
        
        // Apply styles immediately after config loads
        this.applyDynamicStyles();
        
        // Force apply styles with multiple attempts to ensure they stick
        setTimeout(() => {
          this.applyElementStyles();
        }, 100);
        setTimeout(() => {
          this.applyElementStyles();
        }, 500);
      },
      error: (error) => {
        console.error('Error loading founder section configuration:', error);
        this.founderError = true;
        this.founderLoading = false;
      }
    });
  }

  startEditingFounder(): void {
    console.log('Edit button clicked, starting founder editing mode...');
    if (!this.founderConfig) {
      console.log('No founder config available');
      return;
    }

    this.isEditingFounder = true;
    this.originalFounderData = JSON.parse(JSON.stringify(this.founderConfig));
    console.log('Editing mode activated');

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

    console.log('Applying dynamic styles...', this.founderConfig);
    const root = document.documentElement;
    root.style.setProperty('--founder-background-color', this.founderConfig.backgroundColor);
    
    // Apply individual element styles directly
    this.applyElementStyles();
    
    // Force change detection
    setTimeout(() => {
      console.log('Colors applied:', {
        subtitleColor: this.founderConfig?.subtitleColor,
        doctorNameColor: this.founderConfig?.doctorNameColor,
        titleColor: this.founderConfig?.titleColor
      });
    }, 0);
  }

  private applyElementStyles(): void {
    if (!this.founderConfig || typeof document === 'undefined') return;

    console.log('Applying element styles...', this.founderConfig);

    // Apply styles to specific elements with multiple selectors for better coverage
    const elements = [
      // Subtitle
      { selectors: ['.founder-subtitle-small'], color: this.founderConfig.subtitleColor, fontFamily: this.founderConfig.subtitleFontFamily },
      // Doctor Name
      { selectors: ['.founder-info h3', 'h3'], color: this.founderConfig.doctorNameColor, fontFamily: this.founderConfig.doctorNameFontFamily },
      // Title
      { selectors: ['.founder-title'], color: this.founderConfig.titleColor, fontFamily: this.founderConfig.titleFontFamily },
      // Description
      { selectors: ['.founder-description'], color: this.founderConfig.descriptionColor, fontFamily: this.founderConfig.descriptionFontFamily },
      // Specialties
      { selectors: ['.specialties-list', '.specialties-list li'], color: this.founderConfig.specialtiesColor, fontFamily: this.founderConfig.specialtiesFontFamily },
      // Mission
      { selectors: ['.founder-description'], color: this.founderConfig.missionColor, fontFamily: this.founderConfig.missionFontFamily },
      // Philosophy Title
      { selectors: ['.founder-philosophy-full h4', 'h4'], color: this.founderConfig.philosophyTitleColor, fontFamily: this.founderConfig.philosophyTitleFontFamily },
      // Philosophy Content
      { selectors: ['.founder-philosophy-full p'], color: this.founderConfig.philosophyContentColor, fontFamily: this.founderConfig.philosophyContentFontFamily },
      // Image Name
      { selectors: ['.founder-subtitle'], color: this.founderConfig.imageNameColor, fontFamily: this.founderConfig.imageNameFontFamily },
      // Credentials
      { selectors: ['.founder-image-dubtitle-down'], color: this.founderConfig.credentialsColor, fontFamily: this.founderConfig.credentialsFontFamily }
    ];

    elements.forEach(({ selectors, color, fontFamily }) => {
      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
          if (element) {
            (element as HTMLElement).style.setProperty('color', color, 'important');
            (element as HTMLElement).style.setProperty('font-family', fontFamily, 'important');
            console.log(`Applied color ${color} and font ${fontFamily} to ${selector}[${index}]`);
          }
        });
      });
    });
  }

  startInlineEdit(element: string): void {
    if (!this.isEditingFounder) return;
    this.editingElement = element;
  }

  stopInlineEdit(): void {
    this.editingElement = null;
  }

  onColorChange(): void {
    console.log('Color changed, triggering change detection...');
    console.log('Current colors:', {
      subtitleColor: this.founderConfig?.subtitleColor,
      doctorNameColor: this.founderConfig?.doctorNameColor,
      titleColor: this.founderConfig?.titleColor,
      descriptionColor: this.founderConfig?.descriptionColor,
      specialtiesColor: this.founderConfig?.specialtiesColor,
      imageNameColor: this.founderConfig?.imageNameColor,
      credentialsColor: this.founderConfig?.credentialsColor
    });
    
    // Force Angular to detect changes and re-render
    if (this.founderConfig) {
      // Create a new object to trigger change detection
      this.founderConfig = { ...this.founderConfig };
      console.log('New config object created:', this.founderConfig);
    }
    
    // Apply styles immediately and with delays
    this.applyElementStyles();
    setTimeout(() => {
      console.log('Change detection triggered');
      this.applyDynamicStyles();
    }, 10);
    setTimeout(() => {
      this.applyElementStyles();
    }, 100);
  }

  onFontChange(): void {
    console.log('Font changed, triggering change detection...');
    console.log('Current fonts:', {
      subtitleFontFamily: this.founderConfig?.subtitleFontFamily,
      doctorNameFontFamily: this.founderConfig?.doctorNameFontFamily,
      titleFontFamily: this.founderConfig?.titleFontFamily,
      descriptionFontFamily: this.founderConfig?.descriptionFontFamily,
      specialtiesFontFamily: this.founderConfig?.specialtiesFontFamily,
      imageNameFontFamily: this.founderConfig?.imageNameFontFamily,
      credentialsFontFamily: this.founderConfig?.credentialsFontFamily
    });
    
    // Force Angular to detect changes and re-render
    if (this.founderConfig) {
      // Create a new object to trigger change detection
      this.founderConfig = { ...this.founderConfig };
      console.log('New config object created for font change:', this.founderConfig);
    }
    
    // Apply styles immediately and with delays
    this.applyElementStyles();
    setTimeout(() => {
      console.log('Font change detection triggered');
      this.applyDynamicStyles();
    }, 10);
    setTimeout(() => {
      this.applyElementStyles();
    }, 100);
  }

  // New Patient Section methods (following same pattern as founder section)
  private loadNewPatientSectionConfig(): void {
    this.newPatientSectionApiService.loadConfig().subscribe({
      next: (config) => {
        console.log('New patient section config loaded successfully:', config);
        this.newPatientConfig = config;
        this.newPatientLoading = false;
        
        // Apply styles immediately after config loads
        this.applyNewPatientDynamicStyles();
        
        // Force apply styles with multiple attempts to ensure they stick
        setTimeout(() => {
          this.applyNewPatientElementStyles();
        }, 100);
        setTimeout(() => {
          this.applyNewPatientElementStyles();
        }, 500);
      },
      error: (error) => {
        console.error('Error loading new patient section configuration:', error);
        this.newPatientError = true;
        this.newPatientLoading = false;
      }
    });
  }

  startEditingNewPatient(): void {
    console.log('Edit button clicked, starting new patient editing mode...');
    if (!this.newPatientConfig) {
      console.log('No new patient config available');
      return;
    }

    this.isEditingNewPatient = true;
    this.originalNewPatientData = JSON.parse(JSON.stringify(this.newPatientConfig));
    console.log('New patient editing mode activated');
  }

  stopEditingNewPatient(): void {
    this.isEditingNewPatient = false;
    this.saveNewPatientSectionConfig();
    console.log('New patient section updated:', this.newPatientConfig);
  }

  cancelEditingNewPatient(): void {
    this.isEditingNewPatient = false;
    this.newPatientConfig = JSON.parse(JSON.stringify(this.originalNewPatientData));
    this.applyNewPatientDynamicStyles(); // Reapply original styles
  }

  saveNewPatientSectionConfig(): void {
    if (!this.newPatientConfig) return;
    // Implement API call to save config
    console.log('Saving new patient config:', this.newPatientConfig);
    // For now, just log and exit edit mode
    this.isEditingNewPatient = false;
  }

  resetNewPatientToOriginal(): void {
    if (!this.newPatientConfig) return;
    this.newPatientConfig = JSON.parse(JSON.stringify(this.originalNewPatientData));
    this.applyNewPatientDynamicStyles(); // Reapply original styles
  }

  startInlineEditNewPatient(element: string): void {
    if (!this.isEditingNewPatient) return;
    this.editingNewPatientElement = element;
  }

  stopInlineEditNewPatient(): void {
    this.editingNewPatientElement = null;
  }

  applyNewPatientDynamicStyles(): void {
    if (!this.newPatientConfig || typeof document === 'undefined') return;

    console.log('Applying new patient dynamic styles...', this.newPatientConfig);
    const root = document.documentElement;
    root.style.setProperty('--new-patient-background-color', this.newPatientConfig.backgroundColor);

    // Apply individual element styles directly
    this.applyNewPatientElementStyles();
  }

  private applyNewPatientElementStyles(): void {
    if (!this.newPatientConfig || typeof document === 'undefined') return;

    console.log('Applying new patient element styles...', this.newPatientConfig);

    // Apply styles to specific elements with multiple selectors for better coverage
    const elements = [
      // Main Title
      { selectors: ['.new-patients h3', 'h3'], color: this.newPatientConfig.mainTitleColor, fontFamily: this.newPatientConfig.mainTitleFontFamily },
      // Address Title
      { selectors: ['.detail h4'], color: this.newPatientConfig.addressTitleColor, fontFamily: this.newPatientConfig.addressTitleFontFamily },
      // Address Content
      { selectors: ['.detail p'], color: this.newPatientConfig.addressContentColor, fontFamily: this.newPatientConfig.addressContentFontFamily },
      // Button Text
      { selectors: ['.btn-primary'], color: this.newPatientConfig.buttonTextColor, fontFamily: this.newPatientConfig.buttonTextFontFamily },
      // Map Title
      { selectors: ['.clinic-map h3'], color: this.newPatientConfig.mapTitleColor, fontFamily: this.newPatientConfig.mapTitleFontFamily },
      // Location Text
      { selectors: ['.map-info p'], color: this.newPatientConfig.locationTextColor, fontFamily: this.newPatientConfig.locationTextFontFamily },
      // Directions Text
      { selectors: ['.btn-outline'], color: this.newPatientConfig.directionsTextColor, fontFamily: this.newPatientConfig.directionsTextFontFamily }
    ];

    elements.forEach(({ selectors, color, fontFamily }) => {
      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
          if (element) {
            (element as HTMLElement).style.setProperty('color', color, 'important');
            (element as HTMLElement).style.setProperty('font-family', fontFamily, 'important');
            console.log(`Applied color ${color} and font ${fontFamily} to ${selector}[${index}]`);
          }
        });
      });
    });
  }

  onNewPatientColorChange(): void {
    console.log('New patient color changed, triggering change detection...');
    
    // Force Angular to detect changes and re-render
    if (this.newPatientConfig) {
      // Create a new object to trigger change detection
      this.newPatientConfig = { ...this.newPatientConfig };
      console.log('New patient config object created:', this.newPatientConfig);
    }
    
    // Apply styles immediately and with delays
    this.applyNewPatientElementStyles();
    setTimeout(() => {
      console.log('New patient change detection triggered');
      this.applyNewPatientDynamicStyles();
    }, 10);
    setTimeout(() => {
      this.applyNewPatientElementStyles();
    }, 100);
  }

  onNewPatientFontChange(): void {
    console.log('New patient font changed, triggering change detection...');
    
    // Force Angular to detect changes and re-render
    if (this.newPatientConfig) {
      // Create a new object to trigger change detection
      this.newPatientConfig = { ...this.newPatientConfig };
      console.log('New patient config object created for font change:', this.newPatientConfig);
    }
    
    // Apply styles immediately and with delays
    this.applyNewPatientElementStyles();
    setTimeout(() => {
      console.log('New patient font change detection triggered');
      this.applyNewPatientDynamicStyles();
    }, 10);
    setTimeout(() => {
      this.applyNewPatientElementStyles();
    }, 100);
  }
}
