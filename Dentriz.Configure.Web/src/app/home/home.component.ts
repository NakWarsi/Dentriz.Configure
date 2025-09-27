import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { FounderSectionApiService, SimpleFounderConfig } from './services/founder-section-api.service';
import { NewPatientSectionApiService, SimpleNewPatientConfig } from './services/new-patient-section-api.service';
import { ReasonsSectionApiService, SimpleReasonsConfig } from './services/reasons-section-api.service';
import { ServicesSectionApiService, SimpleServicesConfig } from './services/services-section-api.service';
import { GlobalConfigService, GlobalConfig } from '../config/global-config.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
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

  // Reasons Section properties
  reasonsConfig: SimpleReasonsConfig | null = null;
  reasonsLoading = true;
  reasonsError = false;
  isEditingReasons = false;
  originalReasonsData: any = {};
  editingReasonsElement: string | null = null;

  // Services Section properties
  servicesConfig: SimpleServicesConfig | null = null;
  servicesLoading = true;
  servicesError = false;
  isEditingServices = false;
  originalServicesData: any = {};
  editingServicesElement: string | null = null;

  // Global configuration properties
  globalConfig: GlobalConfig = { isEditingEnabled: true, showEditButtons: true };
  private configSubscription?: Subscription;

  constructor(
    private http: HttpClient,
    private founderSectionApiService: FounderSectionApiService,
    private newPatientSectionApiService: NewPatientSectionApiService,
    private reasonsSectionApiService: ReasonsSectionApiService,
    private servicesSectionApiService: ServicesSectionApiService,
    private globalConfigService: GlobalConfigService
  ) {}

  // Clinic images carousel
  clinicImages = [
    {
      src: '/images/clinic/clinic-exterior.jpg',
      alt: 'ClinSmile Dental Clinic Exterior',
      caption: 'Modern Dental Clinic'
    },
    {
      src: '/images/clinic/clinic-interior.jpg',
      alt: 'ClinSmile Dental Clinic Interior',
      caption: 'State-of-the-Art Equipment'
    },
    // Add PNG images directly
    {
      src: '/images/clinic/1.jpg',
      alt: 'ClinSmile Dental Clinic - Treatment Room',
      caption: 'Advanced Treatment Facilities'
    },
    {
      src: '/images/clinic/2.png',
      alt: 'ClinSmile Dental Clinic - Waiting Area',
      caption: 'Comfortable Waiting Area'
    },
    {
      src: '/images/clinic/3.png',
      alt: 'ClinSmile Dental Clinic - Modern Dental Chair',
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
    console.log('🚀 Initializing home component...');
    
    // Subscribe to global configuration changes
    this.configSubscription = this.globalConfigService.config$.subscribe(config => {
      this.globalConfig = config;
      // If editing is disabled globally, stop all editing modes
      if (!config.isEditingEnabled) {
        this.stopAllEditing();
      }
    });

    // Load all configurations from static data (no HTTP calls needed)
    console.log('📥 Loading all section configs from static data...');
    this.loadFounderSectionConfig();
    this.loadNewPatientSectionConfig();
    this.loadReasonsSectionConfig();
    this.loadServicesSectionConfig();
    
    // Auto-advance every 5 seconds
    setInterval(() => {
      this.nextImage();
    }, 5000);
  }

  ngOnDestroy() {
    if (this.configSubscription) {
      this.configSubscription.unsubscribe();
    }
  }

  // Stop all editing modes
  private stopAllEditing(): void {
    this.isEditingFounder = false;
    this.isEditingNewPatient = false;
    this.isEditingReasons = false;
    this.isEditingServices = false;
    this.editingElement = null;
    this.editingNewPatientElement = null;
    this.editingReasonsElement = null;
    this.editingServicesElement = null;
  }

  // Founder section methods (following reference project pattern)
  private loadFounderSectionConfig(): void {
    console.log('🔄 Loading founder section config from static data...');
    
    this.founderSectionApiService.loadConfig().subscribe({
      next: (config) => {
        console.log('✅ Founder section config loaded successfully:', config);
        this.founderConfig = config;
        this.founderLoading = false;
        this.founderError = false;
        
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
        console.error('❌ Error loading founder section configuration:', error);
        this.founderLoading = false;
        this.founderError = true;
      }
    });
  }


  startEditingFounder(): void {
    if (!this.globalConfig.isEditingEnabled) {
      console.log('Editing is disabled globally');
      return;
    }
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
    if (!this.globalConfig.isEditingEnabled || !this.isEditingFounder) return;
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
    console.log('🔄 Loading new patient section config from static data...');
    
    this.newPatientSectionApiService.loadConfig().subscribe({
      next: (config) => {
        console.log('✅ New patient section config loaded successfully:', config);
        this.newPatientConfig = config;
        this.newPatientLoading = false;
        this.newPatientError = false;
        
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
        console.error('❌ Error loading new patient section configuration:', error);
        this.newPatientLoading = false;
        this.newPatientError = true;
      }
    });
  }


  startEditingNewPatient(): void {
    if (!this.globalConfig.isEditingEnabled) {
      console.log('Editing is disabled globally');
      return;
    }
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
    if (!this.globalConfig.isEditingEnabled || !this.isEditingNewPatient) return;
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

  // Reasons Section methods (following same pattern as other sections)
  private loadReasonsSectionConfig(): void {
    console.log('🔄 Loading reasons section config from static data...');
    
    this.reasonsSectionApiService.loadConfig().subscribe({
      next: (config) => {
        console.log('✅ Reasons section config loaded successfully:', config);
        this.reasonsConfig = config;
        this.reasonsLoading = false;
        this.reasonsError = false;
        
        // Apply styles immediately after config loads
        this.applyReasonsDynamicStyles();
        
        // Force apply styles with multiple attempts to ensure they stick
        setTimeout(() => {
          this.applyReasonsElementStyles();
        }, 100);
        setTimeout(() => {
          this.applyReasonsElementStyles();
        }, 500);
      },
      error: (error) => {
        console.error('❌ Error loading reasons section configuration:', error);
        this.reasonsLoading = false;
        this.reasonsError = true;
      }
    });
  }


  startEditingReasons(): void {
    if (!this.globalConfig.isEditingEnabled) {
      console.log('Editing is disabled globally');
      return;
    }
    console.log('Edit button clicked, starting reasons editing mode...');
    if (!this.reasonsConfig) {
      console.log('No reasons config available');
      return;
    }

    this.isEditingReasons = true;
    this.originalReasonsData = JSON.parse(JSON.stringify(this.reasonsConfig));
    console.log('Reasons editing mode activated');
  }

  stopEditingReasons(): void {
    this.isEditingReasons = false;
    this.saveReasonsSectionConfig();
    console.log('Reasons section updated:', this.reasonsConfig);
  }

  cancelEditingReasons(): void {
    this.isEditingReasons = false;
    this.reasonsConfig = JSON.parse(JSON.stringify(this.originalReasonsData));
    this.applyReasonsDynamicStyles(); // Reapply original styles
  }

  saveReasonsSectionConfig(): void {
    if (!this.reasonsConfig) return;
    // Implement API call to save config
    console.log('Saving reasons config:', this.reasonsConfig);
    // For now, just log and exit edit mode
    this.isEditingReasons = false;
  }

  resetReasonsToOriginal(): void {
    if (!this.reasonsConfig) return;
    this.reasonsConfig = JSON.parse(JSON.stringify(this.originalReasonsData));
    this.applyReasonsDynamicStyles(); // Reapply original styles
  }

  startInlineEditReasons(element: string): void {
    if (!this.globalConfig.isEditingEnabled || !this.isEditingReasons) return;
    this.editingReasonsElement = element;
  }

  stopInlineEditReasons(): void {
    this.editingReasonsElement = null;
  }

  applyReasonsDynamicStyles(): void {
    if (!this.reasonsConfig || typeof document === 'undefined') return;

    console.log('Applying reasons dynamic styles...', this.reasonsConfig);
    const root = document.documentElement;
    root.style.setProperty('--reasons-background-color', this.reasonsConfig.backgroundColor);

    // Apply individual element styles directly
    this.applyReasonsElementStyles();
  }

  private applyReasonsElementStyles(): void {
    if (!this.reasonsConfig || typeof document === 'undefined') return;

    console.log('Applying reasons element styles...', this.reasonsConfig);

    // Apply styles to specific elements with multiple selectors for better coverage
    const elements = [
      // Section Title
      { selectors: ['.reasons .section-title', '.section-title'], color: this.reasonsConfig.sectionTitleColor, fontFamily: this.reasonsConfig.sectionTitleFontFamily },
      // Section Intro
      { selectors: ['.reasons .section-intro', '.section-intro'], color: this.reasonsConfig.sectionIntroColor, fontFamily: this.reasonsConfig.sectionIntroFontFamily },
      // Reason 1 Title
      { selectors: ['.reason-card:nth-child(1) h3'], color: this.reasonsConfig.reason1TitleColor, fontFamily: this.reasonsConfig.reason1TitleFontFamily },
      // Reason 1 Items
      { selectors: ['.reason-card:nth-child(1) li'], color: this.reasonsConfig.reason1ItemsColor, fontFamily: this.reasonsConfig.reason1ItemsFontFamily },
      // Reason 2 Title
      { selectors: ['.reason-card:nth-child(2) h3'], color: this.reasonsConfig.reason2TitleColor, fontFamily: this.reasonsConfig.reason2TitleFontFamily },
      // Reason 2 Items
      { selectors: ['.reason-card:nth-child(2) li'], color: this.reasonsConfig.reason2ItemsColor, fontFamily: this.reasonsConfig.reason2ItemsFontFamily },
      // Reason 3 Title
      { selectors: ['.reason-card:nth-child(3) h3'], color: this.reasonsConfig.reason3TitleColor, fontFamily: this.reasonsConfig.reason3TitleFontFamily },
      // Reason 3 Items
      { selectors: ['.reason-card:nth-child(3) li'], color: this.reasonsConfig.reason3ItemsColor, fontFamily: this.reasonsConfig.reason3ItemsFontFamily },
      // Reason 4 Title
      { selectors: ['.reason-card:nth-child(4) h3'], color: this.reasonsConfig.reason4TitleColor, fontFamily: this.reasonsConfig.reason4TitleFontFamily },
      // Reason 4 Items
      { selectors: ['.reason-card:nth-child(4) li'], color: this.reasonsConfig.reason4ItemsColor, fontFamily: this.reasonsConfig.reason4ItemsFontFamily },
      // Reason 5 Title
      { selectors: ['.reason-card:nth-child(5) h3'], color: this.reasonsConfig.reason5TitleColor, fontFamily: this.reasonsConfig.reason5TitleFontFamily },
      // Reason 5 Items
      { selectors: ['.reason-card:nth-child(5) li'], color: this.reasonsConfig.reason5ItemsColor, fontFamily: this.reasonsConfig.reason5ItemsFontFamily },
      // Reason 6 Title
      { selectors: ['.reason-card:nth-child(6) h3'], color: this.reasonsConfig.reason6TitleColor, fontFamily: this.reasonsConfig.reason6TitleFontFamily },
      // Reason 6 Items
      { selectors: ['.reason-card:nth-child(6) li'], color: this.reasonsConfig.reason6ItemsColor, fontFamily: this.reasonsConfig.reason6ItemsFontFamily }
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

  onReasonsColorChange(): void {
    console.log('Reasons color changed, triggering change detection...');
    
    // Force Angular to detect changes and re-render
    if (this.reasonsConfig) {
      // Create a new object to trigger change detection
      this.reasonsConfig = { ...this.reasonsConfig };
      console.log('Reasons config object created:', this.reasonsConfig);
    }
    
    // Apply styles immediately and with delays
    this.applyReasonsElementStyles();
    setTimeout(() => {
      console.log('Reasons change detection triggered');
      this.applyReasonsDynamicStyles();
    }, 10);
    setTimeout(() => {
      this.applyReasonsElementStyles();
    }, 100);
  }

  onReasonsFontChange(): void {
    console.log('Reasons font changed, triggering change detection...');
    
    // Force Angular to detect changes and re-render
    if (this.reasonsConfig) {
      // Create a new object to trigger change detection
      this.reasonsConfig = { ...this.reasonsConfig };
      console.log('Reasons config object created for font change:', this.reasonsConfig);
    }
    
    // Apply styles immediately and with delays
    this.applyReasonsElementStyles();
    setTimeout(() => {
      console.log('Reasons font change detection triggered');
      this.applyReasonsDynamicStyles();
    }, 10);
    setTimeout(() => {
      this.applyReasonsElementStyles();
    }, 100);
  }

  // Helper methods for managing reason items
  addReasonItem(reasonNumber: number): void {
    if (!this.reasonsConfig) return;
    const itemsProperty = `reason${reasonNumber}Items` as keyof SimpleReasonsConfig;
    const items = this.reasonsConfig[itemsProperty] as string[];
    items.push('');
  }

  removeReasonItem(reasonNumber: number, index: number): void {
    if (!this.reasonsConfig) return;
    const itemsProperty = `reason${reasonNumber}Items` as keyof SimpleReasonsConfig;
    const items = this.reasonsConfig[itemsProperty] as string[];
    items.splice(index, 1);
  }

  // Services Section methods (following same pattern as other sections)
  private loadServicesSectionConfig(): void {
    console.log('🔄 Loading services section config from static data...');
    
    this.servicesSectionApiService.loadConfig().subscribe({
      next: (config) => {
        console.log('✅ Services section config loaded successfully:', config);
        this.servicesConfig = config;
        this.servicesLoading = false;
        this.servicesError = false;
        
        // Apply styles immediately after config loads
        this.applyServicesDynamicStyles();
        
        // Force apply styles with multiple attempts to ensure they stick
        setTimeout(() => {
          this.applyServicesElementStyles();
        }, 100);
        setTimeout(() => {
          this.applyServicesElementStyles();
        }, 500);
      },
      error: (error) => {
        console.error('❌ Error loading services section configuration:', error);
        this.servicesLoading = false;
        this.servicesError = true;
      }
    });
  }


  startEditingServices(): void {
    if (!this.globalConfig.isEditingEnabled) {
      console.log('Editing is disabled globally');
      return;
    }
    console.log('Edit button clicked, starting services editing mode...');
    if (!this.servicesConfig) {
      console.log('No services config available');
      return;
    }

    this.isEditingServices = true;
    this.originalServicesData = JSON.parse(JSON.stringify(this.servicesConfig));
    console.log('Services editing mode activated');
  }

  stopEditingServices(): void {
    this.isEditingServices = false;
    this.saveServicesSectionConfig();
    console.log('Services section updated:', this.servicesConfig);
  }

  cancelEditingServices(): void {
    this.isEditingServices = false;
    this.servicesConfig = JSON.parse(JSON.stringify(this.originalServicesData));
    this.applyServicesDynamicStyles(); // Reapply original styles
  }

  saveServicesSectionConfig(): void {
    if (!this.servicesConfig) return;
    // Implement API call to save config
    console.log('Saving services config:', this.servicesConfig);
    // For now, just log and exit edit mode
    this.isEditingServices = false;
  }

  resetServicesToOriginal(): void {
    if (!this.servicesConfig) return;
    this.servicesConfig = JSON.parse(JSON.stringify(this.originalServicesData));
    this.applyServicesDynamicStyles(); // Reapply original styles
  }

  startInlineEditServices(element: string): void {
    if (!this.globalConfig.isEditingEnabled || !this.isEditingServices) return;
    this.editingServicesElement = element;
  }

  stopInlineEditServices(): void {
    this.editingServicesElement = null;
  }

  applyServicesDynamicStyles(): void {
    if (!this.servicesConfig || typeof document === 'undefined') return;

    console.log('Applying services dynamic styles...', this.servicesConfig);
    const root = document.documentElement;
    root.style.setProperty('--services-background-color', this.servicesConfig.backgroundColor);

    // Apply individual element styles directly
    this.applyServicesElementStyles();
  }

  private applyServicesElementStyles(): void {
    if (!this.servicesConfig || typeof document === 'undefined') return;

    console.log('Applying services element styles...', this.servicesConfig);

    // Apply styles to specific elements with multiple selectors for better coverage
    const elements = [
      // Section Title
      { selectors: ['.services-overview .section-title', '.section-title'], color: this.servicesConfig.sectionTitleColor, fontFamily: this.servicesConfig.sectionTitleFontFamily },
      // Service 1
      { selectors: ['.service-category:nth-child(1) h3'], color: this.servicesConfig.service1TitleColor, fontFamily: this.servicesConfig.service1TitleFontFamily },
      { selectors: ['.service-category:nth-child(1) li'], color: this.servicesConfig.service1ItemsColor, fontFamily: this.servicesConfig.service1ItemsFontFamily },
      { selectors: ['.service-category:nth-child(1) .btn-outline'], color: this.servicesConfig.service1ButtonColor, fontFamily: this.servicesConfig.service1ButtonFontFamily },
      // Service 2
      { selectors: ['.service-category:nth-child(2) h3'], color: this.servicesConfig.service2TitleColor, fontFamily: this.servicesConfig.service2TitleFontFamily },
      { selectors: ['.service-category:nth-child(2) li'], color: this.servicesConfig.service2ItemsColor, fontFamily: this.servicesConfig.service2ItemsFontFamily },
      { selectors: ['.service-category:nth-child(2) .btn-outline'], color: this.servicesConfig.service2ButtonColor, fontFamily: this.servicesConfig.service2ButtonFontFamily },
      // Service 3
      { selectors: ['.service-category:nth-child(3) h3'], color: this.servicesConfig.service3TitleColor, fontFamily: this.servicesConfig.service3TitleFontFamily },
      { selectors: ['.service-category:nth-child(3) li'], color: this.servicesConfig.service3ItemsColor, fontFamily: this.servicesConfig.service3ItemsFontFamily },
      { selectors: ['.service-category:nth-child(3) .btn-outline'], color: this.servicesConfig.service3ButtonColor, fontFamily: this.servicesConfig.service3ButtonFontFamily },
      // Service 4
      { selectors: ['.service-category:nth-child(4) h3'], color: this.servicesConfig.service4TitleColor, fontFamily: this.servicesConfig.service4TitleFontFamily },
      { selectors: ['.service-category:nth-child(4) li'], color: this.servicesConfig.service4ItemsColor, fontFamily: this.servicesConfig.service4ItemsFontFamily },
      { selectors: ['.service-category:nth-child(4) .btn-outline'], color: this.servicesConfig.service4ButtonColor, fontFamily: this.servicesConfig.service4ButtonFontFamily },
      // Service 5
      { selectors: ['.service-category:nth-child(5) h3'], color: this.servicesConfig.service5TitleColor, fontFamily: this.servicesConfig.service5TitleFontFamily },
      { selectors: ['.service-category:nth-child(5) li'], color: this.servicesConfig.service5ItemsColor, fontFamily: this.servicesConfig.service5ItemsFontFamily },
      { selectors: ['.service-category:nth-child(5) .btn-outline'], color: this.servicesConfig.service5ButtonColor, fontFamily: this.servicesConfig.service5ButtonFontFamily },
      // Service 6
      { selectors: ['.service-category:nth-child(6) h3'], color: this.servicesConfig.service6TitleColor, fontFamily: this.servicesConfig.service6TitleFontFamily },
      { selectors: ['.service-category:nth-child(6) li'], color: this.servicesConfig.service6ItemsColor, fontFamily: this.servicesConfig.service6ItemsFontFamily },
      { selectors: ['.service-category:nth-child(6) .btn-outline'], color: this.servicesConfig.service6ButtonColor, fontFamily: this.servicesConfig.service6ButtonFontFamily },
      // Service 7
      { selectors: ['.service-category:nth-child(7) h3'], color: this.servicesConfig.service7TitleColor, fontFamily: this.servicesConfig.service7TitleFontFamily },
      { selectors: ['.service-category:nth-child(7) li'], color: this.servicesConfig.service7ItemsColor, fontFamily: this.servicesConfig.service7ItemsFontFamily },
      { selectors: ['.service-category:nth-child(7) .btn-outline'], color: this.servicesConfig.service7ButtonColor, fontFamily: this.servicesConfig.service7ButtonFontFamily },
      // Service 8
      { selectors: ['.service-category:nth-child(8) h3'], color: this.servicesConfig.service8TitleColor, fontFamily: this.servicesConfig.service8TitleFontFamily },
      { selectors: ['.service-category:nth-child(8) li'], color: this.servicesConfig.service8ItemsColor, fontFamily: this.servicesConfig.service8ItemsFontFamily },
      { selectors: ['.service-category:nth-child(8) .btn-outline'], color: this.servicesConfig.service8ButtonColor, fontFamily: this.servicesConfig.service8ButtonFontFamily },
      // Service 9
      { selectors: ['.service-category:nth-child(9) h3'], color: this.servicesConfig.service9TitleColor, fontFamily: this.servicesConfig.service9TitleFontFamily },
      { selectors: ['.service-category:nth-child(9) li'], color: this.servicesConfig.service9ItemsColor, fontFamily: this.servicesConfig.service9ItemsFontFamily },
      { selectors: ['.service-category:nth-child(9) .btn-outline'], color: this.servicesConfig.service9ButtonColor, fontFamily: this.servicesConfig.service9ButtonFontFamily }
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

  onServicesColorChange(): void {
    console.log('Services color changed, triggering change detection...');
    
    // Force Angular to detect changes and re-render
    if (this.servicesConfig) {
      // Create a new object to trigger change detection
      this.servicesConfig = { ...this.servicesConfig };
      console.log('Services config object created:', this.servicesConfig);
    }
    
    // Apply styles immediately and with delays
    this.applyServicesElementStyles();
    setTimeout(() => {
      console.log('Services change detection triggered');
      this.applyServicesDynamicStyles();
    }, 10);
    setTimeout(() => {
      this.applyServicesElementStyles();
    }, 100);
  }

  onServicesFontChange(): void {
    console.log('Services font changed, triggering change detection...');
    
    // Force Angular to detect changes and re-render
    if (this.servicesConfig) {
      // Create a new object to trigger change detection
      this.servicesConfig = { ...this.servicesConfig };
      console.log('Services config object created for font change:', this.servicesConfig);
    }
    
    // Apply styles immediately and with delays
    this.applyServicesElementStyles();
    setTimeout(() => {
      console.log('Services font change detection triggered');
      this.applyServicesDynamicStyles();
    }, 10);
    setTimeout(() => {
      this.applyServicesElementStyles();
    }, 100);
  }

  // Helper methods for managing service items
  addServiceItem(serviceNumber: number): void {
    if (!this.servicesConfig) return;
    const itemsProperty = `service${serviceNumber}Items` as keyof SimpleServicesConfig;
    const items = this.servicesConfig[itemsProperty] as string[];
    items.push('');
  }

  removeServiceItem(serviceNumber: number, index: number): void {
    if (!this.servicesConfig) return;
    const itemsProperty = `service${serviceNumber}Items` as keyof SimpleServicesConfig;
    const items = this.servicesConfig[itemsProperty] as string[];
    items.splice(index, 1);
  }
}
