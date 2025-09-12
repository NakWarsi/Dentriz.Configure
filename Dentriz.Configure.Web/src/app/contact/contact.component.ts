import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { ContactHeroApiService, SimpleContactHeroConfig } from './services/contact-hero-api.service';
import { ContactInfoApiService, SimpleContactInfoConfig } from './services/contact-info-api.service';
import { OfficeHoursApiService, SimpleOfficeHoursConfig } from './services/office-hours-api.service';
import { LocationMapApiService, SimpleLocationMapConfig } from './services/location-map-api.service';
import { InsurancePaymentApiService, SimpleInsurancePaymentConfig } from './services/insurance-payment-api.service';
import { FAQApiService, SimpleFAQConfig } from './services/faq-api.service';
import { GlobalConfigService, GlobalConfig } from '../config/global-config.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit, OnDestroy {
  // Contact Hero Configuration
  contactHeroConfig: SimpleContactHeroConfig | null = null;
  originalContactHeroConfig: SimpleContactHeroConfig | null = null;
  contactHeroLoading = false;
  contactHeroError = false;
  isEditingContactHero = false;
  editingElement: string | null = null;

  // Contact Info Configuration
  contactInfoConfig: SimpleContactInfoConfig | null = null;
  originalContactInfoConfig: SimpleContactInfoConfig | null = null;
  contactInfoLoading = false;
  contactInfoError = false;
  isEditingContactInfo = false;
  editingContactInfoElement: string | null = null;

  // Office Hours Configuration
  officeHoursConfig: SimpleOfficeHoursConfig | null = null;
  originalOfficeHoursConfig: SimpleOfficeHoursConfig | null = null;
  officeHoursLoading = false;
  officeHoursError = false;
  isEditingOfficeHours = false;
  editingOfficeHoursElement: string | null = null;

  // Location Map Configuration
  locationMapConfig: SimpleLocationMapConfig | null = null;
  originalLocationMapConfig: SimpleLocationMapConfig | null = null;
  locationMapLoading = false;
  locationMapError = false;
  isEditingLocationMap = false;
  editingLocationMapElement: string | null = null;
  safeMapUrl: SafeResourceUrl | null = null;

  // Insurance Payment Configuration
  insurancePaymentConfig: SimpleInsurancePaymentConfig | null = null;
  originalInsurancePaymentConfig: SimpleInsurancePaymentConfig | null = null;
  insurancePaymentLoading = false;
  insurancePaymentError = false;
  isEditingInsurancePayment = false;
  editingInsurancePaymentElement: string | null = null;

  // FAQ Configuration
  faqConfig: SimpleFAQConfig | null = null;
  originalFAQConfig: SimpleFAQConfig | null = null;
  faqLoading = false;
  faqError = false;
  isEditingFAQ = false;
  editingFAQElement: string | null = null;

  contactForm = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  // Global configuration properties
  globalConfig: GlobalConfig = { isEditingEnabled: true, showEditButtons: true };
  private configSubscription?: Subscription;

  constructor(
    private contactHeroApiService: ContactHeroApiService,
    private contactInfoApiService: ContactInfoApiService,
    private officeHoursApiService: OfficeHoursApiService,
    private locationMapApiService: LocationMapApiService,
    private insurancePaymentApiService: InsurancePaymentApiService,
    private faqApiService: FAQApiService,
    private sanitizer: DomSanitizer,
    private globalConfigService: GlobalConfigService
  ) {}

  ngOnInit() {
    // Subscribe to global configuration changes
    this.configSubscription = this.globalConfigService.config$.subscribe(config => {
      this.globalConfig = config;
      // If editing is disabled globally, stop all editing modes
      if (!config.isEditingEnabled) {
        this.stopAllEditing();
      }
    });

    this.loadContactHeroConfig();
    this.loadContactInfoConfig();
    this.loadOfficeHoursConfig();
    this.loadLocationMapConfig();
    this.loadInsurancePaymentConfig();
    this.loadFAQConfig();
  }

  ngOnDestroy() {
    if (this.configSubscription) {
      this.configSubscription.unsubscribe();
    }
  }

  // Stop all editing modes
  private stopAllEditing(): void {
    this.isEditingContactHero = false;
    this.isEditingContactInfo = false;
    this.isEditingOfficeHours = false;
    this.isEditingLocationMap = false;
    this.editingElement = null;
    this.editingContactInfoElement = null;
    this.editingOfficeHoursElement = null;
    this.editingLocationMapElement = null;
  }

  loadContactHeroConfig() {
    this.contactHeroLoading = true;
    this.contactHeroError = false;

    this.contactHeroApiService.loadConfig().subscribe({
      next: (config) => {
        this.contactHeroConfig = config;
        this.originalContactHeroConfig = JSON.parse(JSON.stringify(config));
        this.contactHeroLoading = false;
      },
      error: (error) => {
        console.error('Error loading contact hero config:', error);
        this.contactHeroError = true;
        this.contactHeroLoading = false;
      }
    });
  }

  startEditingContactHero() {
    if (!this.globalConfig.isEditingEnabled) {
      console.log('Editing is disabled globally');
      return;
    }
    this.isEditingContactHero = true;
  }

  stopEditingContactHero() {
    if (this.contactHeroConfig) {
      this.contactHeroApiService.saveConfig(this.contactHeroConfig).subscribe({
        next: () => {
          this.originalContactHeroConfig = JSON.parse(JSON.stringify(this.contactHeroConfig!));
          this.isEditingContactHero = false;
          this.editingElement = null;
        },
        error: (error) => {
          console.error('Error saving contact hero config:', error);
          alert('Error saving changes. Please try again.');
        }
      });
    }
  }

  cancelEditingContactHero() {
    if (this.originalContactHeroConfig) {
      this.contactHeroConfig = JSON.parse(JSON.stringify(this.originalContactHeroConfig));
    }
    this.isEditingContactHero = false;
    this.editingElement = null;
  }

  resetContactHeroToOriginal() {
    if (this.originalContactHeroConfig) {
      this.contactHeroConfig = JSON.parse(JSON.stringify(this.originalContactHeroConfig));
    }
  }

  startInlineEdit(element: string) {
    if (!this.globalConfig.isEditingEnabled || !this.isEditingContactHero) return;
    this.editingElement = element;
  }

  stopInlineEdit() {
    this.editingElement = null;
  }

  onColorChange() {
    // This method is called when any color input changes
    // The actual saving happens when the user clicks "Save Changes"
  }

  onFontChange() {
    // This method is called when any font input changes
    // The actual saving happens when the user clicks "Save Changes"
  }

  // Contact Info Methods
  loadContactInfoConfig() {
    this.contactInfoLoading = true;
    this.contactInfoError = false;

    this.contactInfoApiService.loadConfig().subscribe({
      next: (config) => {
        this.contactInfoConfig = config;
        this.originalContactInfoConfig = JSON.parse(JSON.stringify(config));
        this.contactInfoLoading = false;
      },
      error: (error) => {
        console.error('Error loading contact info config:', error);
        this.contactInfoError = true;
        this.contactInfoLoading = false;
      }
    });
  }

  startEditingContactInfo() {
    if (!this.globalConfig.isEditingEnabled) {
      console.log('Editing is disabled globally');
      return;
    }
    this.isEditingContactInfo = true;
  }

  stopEditingContactInfo() {
    if (this.contactInfoConfig) {
      this.contactInfoApiService.saveConfig(this.contactInfoConfig).subscribe({
        next: () => {
          this.originalContactInfoConfig = JSON.parse(JSON.stringify(this.contactInfoConfig!));
          this.isEditingContactInfo = false;
          this.editingContactInfoElement = null;
        },
        error: (error) => {
          console.error('Error saving contact info config:', error);
          alert('Error saving changes. Please try again.');
        }
      });
    }
  }

  cancelEditingContactInfo() {
    if (this.originalContactInfoConfig) {
      this.contactInfoConfig = JSON.parse(JSON.stringify(this.originalContactInfoConfig));
    }
    this.isEditingContactInfo = false;
    this.editingContactInfoElement = null;
  }

  resetContactInfoToOriginal() {
    if (this.originalContactInfoConfig) {
      this.contactInfoConfig = JSON.parse(JSON.stringify(this.originalContactInfoConfig));
    }
  }

  startInlineEditContactInfo(element: string) {
    if (!this.globalConfig.isEditingEnabled || !this.isEditingContactInfo) return;
    this.editingContactInfoElement = element;
  }

  stopInlineEditContactInfo() {
    this.editingContactInfoElement = null;
  }

  onContactInfoColorChange() {
    // This method is called when any color input changes
    // The actual saving happens when the user clicks "Save Changes"
  }

  onContactInfoFontChange() {
    // This method is called when any font input changes
    // The actual saving happens when the user clicks "Save Changes"
  }

  // Office Hours Methods
  loadOfficeHoursConfig() {
    this.officeHoursLoading = true;
    this.officeHoursError = false;

    this.officeHoursApiService.loadConfig().subscribe({
      next: (config) => {
        this.officeHoursConfig = config;
        this.originalOfficeHoursConfig = JSON.parse(JSON.stringify(config));
        this.officeHoursLoading = false;
      },
      error: (error) => {
        console.error('Error loading office hours config:', error);
        this.officeHoursError = true;
        this.officeHoursLoading = false;
      }
    });
  }

  startEditingOfficeHours() {
    if (!this.globalConfig.isEditingEnabled) {
      console.log('Editing is disabled globally');
      return;
    }
    this.isEditingOfficeHours = true;
  }

  stopEditingOfficeHours() {
    if (this.officeHoursConfig) {
      this.officeHoursApiService.saveConfig(this.officeHoursConfig).subscribe({
        next: () => {
          this.originalOfficeHoursConfig = JSON.parse(JSON.stringify(this.officeHoursConfig!));
          this.isEditingOfficeHours = false;
          this.editingOfficeHoursElement = null;
        },
        error: (error) => {
          console.error('Error saving office hours config:', error);
          alert('Error saving changes. Please try again.');
        }
      });
    }
  }

  cancelEditingOfficeHours() {
    if (this.originalOfficeHoursConfig) {
      this.officeHoursConfig = JSON.parse(JSON.stringify(this.originalOfficeHoursConfig));
    }
    this.isEditingOfficeHours = false;
    this.editingOfficeHoursElement = null;
  }

  resetOfficeHoursToOriginal() {
    if (this.originalOfficeHoursConfig) {
      this.officeHoursConfig = JSON.parse(JSON.stringify(this.originalOfficeHoursConfig));
    }
  }

  startInlineEditOfficeHours(element: string) {
    if (!this.globalConfig.isEditingEnabled || !this.isEditingOfficeHours) return;
    this.editingOfficeHoursElement = element;
  }

  stopInlineEditOfficeHours() {
    this.editingOfficeHoursElement = null;
  }

  onOfficeHoursColorChange() {
    // This method is called when any color input changes
    // The actual saving happens when the user clicks "Save Changes"
  }

  onOfficeHoursFontChange() {
    // This method is called when any font input changes
    // The actual saving happens when the user clicks "Save Changes"
  }

  addNote() {
    if (this.officeHoursConfig) {
      this.officeHoursConfig.notes.push('New note - click to edit');
    }
  }

  removeNote(index: number) {
    if (this.officeHoursConfig && this.officeHoursConfig.notes.length > 1) {
      this.officeHoursConfig.notes.splice(index, 1);
    }
  }

  // Location Map Methods
  loadLocationMapConfig() {
    this.locationMapLoading = true;
    this.locationMapError = false;

    this.locationMapApiService.loadConfig().subscribe({
      next: (config) => {
        this.locationMapConfig = config;
        this.originalLocationMapConfig = JSON.parse(JSON.stringify(config));
        this.safeMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(config.mapEmbedUrl);
        this.locationMapLoading = false;
      },
      error: (error) => {
        console.error('Error loading location map config:', error);
        this.locationMapError = true;
        this.locationMapLoading = false;
      }
    });
  }

  startEditingLocationMap() {
    if (!this.globalConfig.isEditingEnabled) {
      console.log('Editing is disabled globally');
      return;
    }
    this.isEditingLocationMap = true;
  }

  stopEditingLocationMap() {
    if (this.locationMapConfig) {
      this.locationMapApiService.saveConfig(this.locationMapConfig).subscribe({
        next: () => {
          this.originalLocationMapConfig = JSON.parse(JSON.stringify(this.locationMapConfig!));
          this.isEditingLocationMap = false;
          this.editingLocationMapElement = null;
        },
        error: (error) => {
          console.error('Error saving location map config:', error);
          alert('Error saving changes. Please try again.');
        }
      });
    }
  }

  cancelEditingLocationMap() {
    if (this.originalLocationMapConfig) {
      this.locationMapConfig = JSON.parse(JSON.stringify(this.originalLocationMapConfig));
    }
    this.isEditingLocationMap = false;
    this.editingLocationMapElement = null;
  }

  resetLocationMapToOriginal() {
    if (this.originalLocationMapConfig) {
      this.locationMapConfig = JSON.parse(JSON.stringify(this.originalLocationMapConfig));
    }
  }

  startInlineEditLocationMap(element: string) {
    if (!this.globalConfig.isEditingEnabled || !this.isEditingLocationMap) return;
    this.editingLocationMapElement = element;
  }

  stopInlineEditLocationMap() {
    this.editingLocationMapElement = null;
  }

  onLocationMapColorChange() {
    // This method is called when any color input changes
    // The actual saving happens when the user clicks "Save Changes"
  }

  onLocationMapFontChange() {
    // This method is called when any font input changes
    // The actual saving happens when the user clicks "Save Changes"
  }

  // Insurance Payment Methods
  loadInsurancePaymentConfig() {
    this.insurancePaymentLoading = true;
    this.insurancePaymentError = false;

    this.insurancePaymentApiService.loadConfig().subscribe({
      next: (config) => {
        this.insurancePaymentConfig = config;
        this.originalInsurancePaymentConfig = JSON.parse(JSON.stringify(config));
        this.insurancePaymentLoading = false;
      },
      error: (error) => {
        console.error('Error loading insurance payment config:', error);
        this.insurancePaymentError = true;
        this.insurancePaymentLoading = false;
      }
    });
  }

  startEditingInsurancePayment() {
    if (!this.globalConfig.isEditingEnabled) {
      console.log('Editing is disabled globally');
      return;
    }
    this.isEditingInsurancePayment = true;
  }

  stopEditingInsurancePayment() {
    if (this.insurancePaymentConfig) {
      this.insurancePaymentApiService.saveConfig(this.insurancePaymentConfig).subscribe({
        next: () => {
          this.originalInsurancePaymentConfig = JSON.parse(JSON.stringify(this.insurancePaymentConfig!));
          this.isEditingInsurancePayment = false;
          this.editingInsurancePaymentElement = null;
        },
        error: (error) => {
          console.error('Error saving insurance payment config:', error);
          alert('Error saving changes. Please try again.');
        }
      });
    }
  }

  cancelEditingInsurancePayment() {
    if (this.originalInsurancePaymentConfig) {
      this.insurancePaymentConfig = JSON.parse(JSON.stringify(this.originalInsurancePaymentConfig));
    }
    this.isEditingInsurancePayment = false;
    this.editingInsurancePaymentElement = null;
  }

  resetInsurancePaymentToOriginal() {
    if (this.originalInsurancePaymentConfig) {
      this.insurancePaymentConfig = JSON.parse(JSON.stringify(this.originalInsurancePaymentConfig));
    }
  }

  startInlineEditInsurancePayment(element: string) {
    if (!this.globalConfig.isEditingEnabled || !this.isEditingInsurancePayment) return;
    this.editingInsurancePaymentElement = element;
  }

  stopInlineEditInsurancePayment() {
    this.editingInsurancePaymentElement = null;
  }

  onInsurancePaymentColorChange() {
    // This method is called when any color input changes
    // The actual saving happens when the user clicks "Save Changes"
  }

  onInsurancePaymentFontChange() {
    // This method is called when any font input changes
    // The actual saving happens when the user clicks "Save Changes"
  }

  addInsuranceItem() {
    if (this.insurancePaymentConfig) {
      this.insurancePaymentConfig.insuranceItems.push('New insurance item - click to edit');
    }
  }

  removeInsuranceItem(index: number) {
    if (this.insurancePaymentConfig && this.insurancePaymentConfig.insuranceItems.length > 1) {
      this.insurancePaymentConfig.insuranceItems.splice(index, 1);
    }
  }

  addPaymentItem() {
    if (this.insurancePaymentConfig) {
      this.insurancePaymentConfig.paymentItems.push('New payment item - click to edit');
    }
  }

  removePaymentItem(index: number) {
    if (this.insurancePaymentConfig && this.insurancePaymentConfig.paymentItems.length > 1) {
      this.insurancePaymentConfig.paymentItems.splice(index, 1);
    }
  }

  addSpecialItem() {
    if (this.insurancePaymentConfig) {
      this.insurancePaymentConfig.specialItems.push('New special item - click to edit');
    }
  }

  removeSpecialItem(index: number) {
    if (this.insurancePaymentConfig && this.insurancePaymentConfig.specialItems.length > 1) {
      this.insurancePaymentConfig.specialItems.splice(index, 1);
    }
  }

  // FAQ Methods
  loadFAQConfig() {
    this.faqLoading = true;
    this.faqError = false;

    this.faqApiService.loadConfig().subscribe({
      next: (config) => {
        this.faqConfig = config;
        this.originalFAQConfig = JSON.parse(JSON.stringify(config));
        this.faqLoading = false;
      },
      error: (error) => {
        console.error('Error loading FAQ config:', error);
        this.faqError = true;
        this.faqLoading = false;
      }
    });
  }

  startEditingFAQ() {
    if (!this.globalConfig.isEditingEnabled) {
      console.log('Editing is disabled globally');
      return;
    }
    this.isEditingFAQ = true;
  }

  stopEditingFAQ() {
    if (this.faqConfig) {
      this.faqApiService.saveConfig(this.faqConfig).subscribe({
        next: () => {
          this.originalFAQConfig = JSON.parse(JSON.stringify(this.faqConfig!));
          this.isEditingFAQ = false;
          this.editingFAQElement = null;
        },
        error: (error) => {
          console.error('Error saving FAQ config:', error);
          alert('Error saving changes. Please try again.');
        }
      });
    }
  }

  cancelEditingFAQ() {
    if (this.originalFAQConfig) {
      this.faqConfig = JSON.parse(JSON.stringify(this.originalFAQConfig));
    }
    this.isEditingFAQ = false;
    this.editingFAQElement = null;
  }

  resetFAQToOriginal() {
    if (this.originalFAQConfig) {
      this.faqConfig = JSON.parse(JSON.stringify(this.originalFAQConfig));
    }
  }

  startInlineEditFAQ(element: string) {
    if (!this.globalConfig.isEditingEnabled || !this.isEditingFAQ) return;
    this.editingFAQElement = element;
  }

  stopInlineEditFAQ() {
    this.editingFAQElement = null;
  }

  onFAQColorChange() {
    // This method is called when any color input changes
    // The actual saving happens when the user clicks "Save Changes"
  }

  onFAQFonChange() {
    // This method is called when any font input changes
    // The actual saving happens when the user clicks "Save Changes"
  }

  addFAQItem() {
    if (this.faqConfig) {
      this.faqConfig.faqItems.push({
        question: 'New question - click to edit',
        answer: 'New answer - click to edit'
      });
    }
  }

  removeFAQItem(index: number) {
    if (this.faqConfig && this.faqConfig.faqItems.length > 1) {
      this.faqConfig.faqItems.splice(index, 1);
    }
  }

  onSubmit() {
    // Handle form submission here
    console.log('Contact form submitted:', this.contactForm);
    // You can add API call or email service here
    alert('Thank you for your message! We will get back to you soon.');
    this.resetForm();
  }

  resetForm() {
    this.contactForm = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    };
  }
}
