import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ServicesHeroApiService, SimpleServicesHeroConfig } from './services/services-hero-api.service';
import { PreventiveCareApiService, SimplePreventiveCareConfig } from './services/preventive-care-api.service';
import { RestorativeCareApiService, SimpleRestorativeCareConfig } from './services/restorative-care-api.service';
import { CosmeticServicesApiService, SimpleCosmeticServicesConfig } from './services/cosmetic-services-api.service';
import { TechnologySectionApiService, SimpleTechnologySectionConfig } from './services/technology-section-api.service';
import { GlobalConfigService, GlobalConfig } from '../config/global-config.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements OnInit, OnDestroy {
  // Services Hero Configuration
  servicesHeroConfig: SimpleServicesHeroConfig | null = null;
  originalServicesHeroConfig: SimpleServicesHeroConfig | null = null;
  servicesHeroLoading = false;
  servicesHeroError = false;
  isEditingServicesHero = false;
  editingServicesHeroElement: string | null = null;

  // Preventive Care Configuration
  preventiveCareConfig: SimplePreventiveCareConfig | null = null;
  originalPreventiveCareConfig: SimplePreventiveCareConfig | null = null;
  preventiveCareLoading = false;
  preventiveCareError = false;
  isEditingPreventiveCare = false;
  editingPreventiveCareElement: string | null = null;

  // Restorative Care Configuration
  restorativeCareConfig: SimpleRestorativeCareConfig | null = null;
  originalRestorativeCareConfig: SimpleRestorativeCareConfig | null = null;
  restorativeCareLoading = false;
  restorativeCareError = false;
  isEditingRestorativeCare = false;
  editingRestorativeCareElement: string | null = null;

  // Cosmetic Services Configuration
  cosmeticServicesConfig: SimpleCosmeticServicesConfig | null = null;
  originalCosmeticServicesConfig: SimpleCosmeticServicesConfig | null = null;
  cosmeticServicesLoading = false;
  cosmeticServicesError = false;
  isEditingCosmeticServices = false;
  editingCosmeticServicesElement: string | null = null;

  // Technology Section Configuration
  technologySectionConfig: SimpleTechnologySectionConfig | null = null;
  originalTechnologySectionConfig: SimpleTechnologySectionConfig | null = null;
  technologySectionLoading = false;
  technologySectionError = false;
  isEditingTechnologySection = false;
  editingTechnologySectionElement: string | null = null;
  services = [
    {
      title: 'General Dentistry',
      description: 'Comprehensive dental care including cleanings, fillings, and preventive treatments.',
      icon: '🦷'
    },
    {
      title: 'Cosmetic Dentistry',
      description: 'Transform your smile with whitening, veneers, and other cosmetic procedures.',
      icon: '✨'
    },
    {
      title: 'Emergency Care',
      description: '24/7 emergency dental services for urgent dental problems.',
      icon: '🚨'
    },
    {
      title: 'Orthodontics',
      description: 'Braces, aligners, and other orthodontic treatments for a perfect smile.',
      icon: '🦿'
    }
  ];

  // Global configuration properties
  globalConfig: GlobalConfig = { isEditingEnabled: true, showEditButtons: true };
  private configSubscription?: Subscription;

  constructor(
    private servicesHeroApiService: ServicesHeroApiService,
    private preventiveCareApiService: PreventiveCareApiService,
    private restorativeCareApiService: RestorativeCareApiService,
    private cosmeticServicesApiService: CosmeticServicesApiService,
    private technologySectionApiService: TechnologySectionApiService,
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

    this.loadServicesHeroConfig();
    this.loadPreventiveCareConfig();
    this.loadRestorativeCareConfig();
    this.loadCosmeticServicesConfig();
    this.loadTechnologySectionConfig();
  }

  ngOnDestroy() {
    if (this.configSubscription) {
      this.configSubscription.unsubscribe();
    }
  }

  // Stop all editing modes
  private stopAllEditing(): void {
    this.isEditingServicesHero = false;
    this.isEditingPreventiveCare = false;
    this.isEditingRestorativeCare = false;
    this.isEditingCosmeticServices = false;
    this.isEditingTechnologySection = false;
    this.editingServicesHeroElement = null;
    this.editingPreventiveCareElement = null;
    this.editingRestorativeCareElement = null;
    this.editingCosmeticServicesElement = null;
    this.editingTechnologySectionElement = null;
  }

  // Services Hero Configuration Methods
  loadServicesHeroConfig() {
    this.servicesHeroLoading = true;
    this.servicesHeroError = false;

    this.servicesHeroApiService.loadConfig().subscribe({
      next: (config) => {
        this.servicesHeroConfig = config;
        this.originalServicesHeroConfig = JSON.parse(JSON.stringify(config));
        this.servicesHeroLoading = false;
      },
      error: (error) => {
        console.error('Error loading services hero config:', error);
        this.servicesHeroError = true;
        this.servicesHeroLoading = false;
      }
    });
  }

  startEditingServicesHero() {
    if (!this.globalConfig.isEditingEnabled) {
      console.log('Editing is disabled globally');
      return;
    }
    this.isEditingServicesHero = true;
  }

  stopEditingServicesHero() {
    if (this.servicesHeroConfig) {
      this.servicesHeroApiService.saveConfig(this.servicesHeroConfig).subscribe({
        next: () => {
          this.originalServicesHeroConfig = JSON.parse(JSON.stringify(this.servicesHeroConfig!));
          this.isEditingServicesHero = false;
          this.editingServicesHeroElement = null;
        },
        error: (error) => {
          console.error('Error saving services hero config:', error);
          alert('Error saving changes. Please try again.');
        }
      });
    }
  }

  cancelEditingServicesHero() {
    if (this.originalServicesHeroConfig) {
      this.servicesHeroConfig = JSON.parse(JSON.stringify(this.originalServicesHeroConfig));
    }
    this.isEditingServicesHero = false;
    this.editingServicesHeroElement = null;
  }

  resetServicesHeroToOriginal() {
    if (this.originalServicesHeroConfig) {
      this.servicesHeroConfig = JSON.parse(JSON.stringify(this.originalServicesHeroConfig));
    }
  }

  startInlineEditServicesHero(element: string) {
    if (!this.globalConfig.isEditingEnabled || !this.isEditingServicesHero) return;
    this.editingServicesHeroElement = element;
  }

  stopInlineEditServicesHero() {
    this.editingServicesHeroElement = null;
  }

  onServicesHeroColorChange() {
    // This method is called when any color input changes
    // The actual saving happens when the user clicks "Save Changes"
  }

  onServicesHeroFontChange() {
    // This method is called when any font input changes
    // The actual saving happens when the user clicks "Save Changes"
  }

  // Preventive Care Configuration Methods
  loadPreventiveCareConfig() {
    this.preventiveCareLoading = true;
    this.preventiveCareError = false;

    this.preventiveCareApiService.loadConfig().subscribe({
      next: (config) => {
        this.preventiveCareConfig = config;
        this.originalPreventiveCareConfig = JSON.parse(JSON.stringify(config));
        this.preventiveCareLoading = false;
      },
      error: (error) => {
        console.error('Error loading preventive care config:', error);
        this.preventiveCareError = true;
        this.preventiveCareLoading = false;
      }
    });
  }

  startEditingPreventiveCare() {
    if (!this.globalConfig.isEditingEnabled) {
      console.log('Editing is disabled globally');
      return;
    }
    this.isEditingPreventiveCare = true;
  }

  stopEditingPreventiveCare() {
    if (this.preventiveCareConfig) {
      this.preventiveCareApiService.saveConfig(this.preventiveCareConfig).subscribe({
        next: () => {
          this.originalPreventiveCareConfig = JSON.parse(JSON.stringify(this.preventiveCareConfig!));
          this.isEditingPreventiveCare = false;
          this.editingPreventiveCareElement = null;
        },
        error: (error) => {
          console.error('Error saving preventive care config:', error);
          alert('Error saving changes. Please try again.');
        }
      });
    }
  }

  cancelEditingPreventiveCare() {
    if (this.originalPreventiveCareConfig) {
      this.preventiveCareConfig = JSON.parse(JSON.stringify(this.originalPreventiveCareConfig));
    }
    this.isEditingPreventiveCare = false;
    this.editingPreventiveCareElement = null;
  }

  resetPreventiveCareToOriginal() {
    if (this.originalPreventiveCareConfig) {
      this.preventiveCareConfig = JSON.parse(JSON.stringify(this.originalPreventiveCareConfig));
    }
  }

  startInlineEditPreventiveCare(element: string) {
    if (!this.globalConfig.isEditingEnabled || !this.isEditingPreventiveCare) return;
    this.editingPreventiveCareElement = element;
  }

  stopInlineEditPreventiveCare() {
    this.editingPreventiveCareElement = null;
  }

  onPreventiveCareColorChange() {
    // This method is called when any color input changes
    // The actual saving happens when the user clicks "Save Changes"
  }

  onPreventiveCareFontChange() {
    // This method is called when any font input changes
    // The actual saving happens when the user clicks "Save Changes"
  }

  addPreventiveCareService() {
    if (this.preventiveCareConfig) {
      this.preventiveCareConfig.services.push({
        icon: '🦷',
        title: 'New Service',
        description: 'Service description',
        features: ['Feature 1', 'Feature 2']
      });
    }
  }

  removePreventiveCareService(index: number) {
    if (this.preventiveCareConfig && this.preventiveCareConfig.services.length > 1) {
      this.preventiveCareConfig.services.splice(index, 1);
    }
  }

  addPreventiveCareFeature(serviceIndex: number) {
    if (this.preventiveCareConfig) {
      this.preventiveCareConfig.services[serviceIndex].features.push('New Feature');
    }
  }

  removePreventiveCareFeature(serviceIndex: number, featureIndex: number) {
    if (this.preventiveCareConfig) {
      this.preventiveCareConfig.services[serviceIndex].features.splice(featureIndex, 1);
    }
  }

  // Restorative Care Configuration Methods
  loadRestorativeCareConfig() {
    this.restorativeCareLoading = true;
    this.restorativeCareError = false;

    this.restorativeCareApiService.loadConfig().subscribe({
      next: (config) => {
        this.restorativeCareConfig = config;
        this.originalRestorativeCareConfig = JSON.parse(JSON.stringify(config));
        this.restorativeCareLoading = false;
      },
      error: (error) => {
        console.error('Error loading restorative care config:', error);
        this.restorativeCareError = true;
        this.restorativeCareLoading = false;
      }
    });
  }

  startEditingRestorativeCare() {
    if (!this.globalConfig.isEditingEnabled) {
      console.log('Editing is disabled globally');
      return;
    }
    this.isEditingRestorativeCare = true;
  }

  stopEditingRestorativeCare() {
    if (this.restorativeCareConfig) {
      this.restorativeCareApiService.saveConfig(this.restorativeCareConfig).subscribe({
        next: () => {
          this.originalRestorativeCareConfig = JSON.parse(JSON.stringify(this.restorativeCareConfig!));
          this.isEditingRestorativeCare = false;
          this.editingRestorativeCareElement = null;
        },
        error: (error) => {
          console.error('Error saving restorative care config:', error);
          alert('Error saving changes. Please try again.');
        }
      });
    }
  }

  cancelEditingRestorativeCare() {
    if (this.originalRestorativeCareConfig) {
      this.restorativeCareConfig = JSON.parse(JSON.stringify(this.originalRestorativeCareConfig));
    }
    this.isEditingRestorativeCare = false;
    this.editingRestorativeCareElement = null;
  }

  resetRestorativeCareToOriginal() {
    if (this.originalRestorativeCareConfig) {
      this.restorativeCareConfig = JSON.parse(JSON.stringify(this.originalRestorativeCareConfig));
    }
  }

  startInlineEditRestorativeCare(element: string) {
    if (!this.globalConfig.isEditingEnabled || !this.isEditingRestorativeCare) return;
    this.editingRestorativeCareElement = element;
  }

  stopInlineEditRestorativeCare() {
    this.editingRestorativeCareElement = null;
  }

  onRestorativeCareColorChange() {
    // This method is called when any color input changes
    // The actual saving happens when the user clicks "Save Changes"
  }

  onRestorativeCareFontChange() {
    // This method is called when any font input changes
    // The actual saving happens when the user clicks "Save Changes"
  }

  addRestorativeCareService() {
    if (this.restorativeCareConfig) {
      this.restorativeCareConfig.services.push({
        icon: '🦷',
        title: 'New Service',
        description: 'Service description',
        features: ['Feature 1', 'Feature 2']
      });
    }
  }

  removeRestorativeCareService(index: number) {
    if (this.restorativeCareConfig && this.restorativeCareConfig.services.length > 1) {
      this.restorativeCareConfig.services.splice(index, 1);
    }
  }

  addRestorativeCareFeature(serviceIndex: number) {
    if (this.restorativeCareConfig) {
      this.restorativeCareConfig.services[serviceIndex].features.push('New Feature');
    }
  }

  removeRestorativeCareFeature(serviceIndex: number, featureIndex: number) {
    if (this.restorativeCareConfig) {
      this.restorativeCareConfig.services[serviceIndex].features.splice(featureIndex, 1);
    }
  }

  // Cosmetic Services Configuration Methods
  loadCosmeticServicesConfig() {
    this.cosmeticServicesLoading = true;
    this.cosmeticServicesError = false;

    this.cosmeticServicesApiService.loadConfig().subscribe({
      next: (config) => {
        this.cosmeticServicesConfig = config;
        this.originalCosmeticServicesConfig = JSON.parse(JSON.stringify(config));
        this.cosmeticServicesLoading = false;
      },
      error: (error) => {
        console.error('Error loading cosmetic services config:', error);
        this.cosmeticServicesError = true;
        this.cosmeticServicesLoading = false;
      }
    });
  }

  startEditingCosmeticServices() {
    if (!this.globalConfig.isEditingEnabled) {
      console.log('Editing is disabled globally');
      return;
    }
    this.isEditingCosmeticServices = true;
  }

  stopEditingCosmeticServices() {
    if (this.cosmeticServicesConfig) {
      this.cosmeticServicesApiService.saveConfig(this.cosmeticServicesConfig).subscribe({
        next: () => {
          this.originalCosmeticServicesConfig = JSON.parse(JSON.stringify(this.cosmeticServicesConfig!));
          this.isEditingCosmeticServices = false;
          this.editingCosmeticServicesElement = null;
        },
        error: (error) => {
          console.error('Error saving cosmetic services config:', error);
          alert('Error saving changes. Please try again.');
        }
      });
    }
  }

  cancelEditingCosmeticServices() {
    if (this.originalCosmeticServicesConfig) {
      this.cosmeticServicesConfig = JSON.parse(JSON.stringify(this.originalCosmeticServicesConfig));
    }
    this.isEditingCosmeticServices = false;
    this.editingCosmeticServicesElement = null;
  }

  resetCosmeticServicesToOriginal() {
    if (this.originalCosmeticServicesConfig) {
      this.cosmeticServicesConfig = JSON.parse(JSON.stringify(this.originalCosmeticServicesConfig));
    }
  }

  startInlineEditCosmeticServices(element: string) {
    if (!this.globalConfig.isEditingEnabled || !this.isEditingCosmeticServices) return;
    this.editingCosmeticServicesElement = element;
  }

  stopInlineEditCosmeticServices() {
    this.editingCosmeticServicesElement = null;
  }

  onCosmeticServicesColorChange() {
    // This method is called when any color input changes
    // The actual saving happens when the user clicks "Save Changes"
  }

  onCosmeticServicesFontChange() {
    // This method is called when any font input changes
    // The actual saving happens when the user clicks "Save Changes"
  }

  addCosmeticServicesService() {
    if (this.cosmeticServicesConfig) {
      this.cosmeticServicesConfig.services.push({
        icon: '🦷',
        title: 'New Service',
        description: 'Service description',
        features: ['Feature 1', 'Feature 2']
      });
    }
  }

  removeCosmeticServicesService(index: number) {
    if (this.cosmeticServicesConfig && this.cosmeticServicesConfig.services.length > 1) {
      this.cosmeticServicesConfig.services.splice(index, 1);
    }
  }

  addCosmeticServicesFeature(serviceIndex: number) {
    if (this.cosmeticServicesConfig) {
      this.cosmeticServicesConfig.services[serviceIndex].features.push('New Feature');
    }
  }

  removeCosmeticServicesFeature(serviceIndex: number, featureIndex: number) {
    if (this.cosmeticServicesConfig) {
      this.cosmeticServicesConfig.services[serviceIndex].features.splice(featureIndex, 1);
    }
  }

  // Technology Section Configuration Methods
  loadTechnologySectionConfig() {
    this.technologySectionLoading = true;
    this.technologySectionError = false;

    this.technologySectionApiService.loadConfig().subscribe({
      next: (config) => {
        this.technologySectionConfig = config;
        this.originalTechnologySectionConfig = JSON.parse(JSON.stringify(config));
        this.technologySectionLoading = false;
      },
      error: (error) => {
        console.error('Error loading technology section config:', error);
        this.technologySectionError = true;
        this.technologySectionLoading = false;
      }
    });
  }

  startEditingTechnologySection() {
    if (!this.globalConfig.isEditingEnabled) {
      console.log('Editing is disabled globally');
      return;
    }
    this.isEditingTechnologySection = true;
  }

  stopEditingTechnologySection() {
    if (this.technologySectionConfig) {
      this.technologySectionApiService.saveConfig(this.technologySectionConfig).subscribe({
        next: () => {
          this.originalTechnologySectionConfig = JSON.parse(JSON.stringify(this.technologySectionConfig!));
          this.isEditingTechnologySection = false;
          this.editingTechnologySectionElement = null;
        },
        error: (error) => {
          console.error('Error saving technology section config:', error);
          alert('Error saving changes. Please try again.');
        }
      });
    }
  }

  cancelEditingTechnologySection() {
    if (this.originalTechnologySectionConfig) {
      this.technologySectionConfig = JSON.parse(JSON.stringify(this.originalTechnologySectionConfig));
    }
    this.isEditingTechnologySection = false;
    this.editingTechnologySectionElement = null;
  }

  resetTechnologySectionToOriginal() {
    if (this.originalTechnologySectionConfig) {
      this.technologySectionConfig = JSON.parse(JSON.stringify(this.originalTechnologySectionConfig));
    }
  }

  startInlineEditTechnologySection(element: string) {
    if (!this.globalConfig.isEditingEnabled || !this.isEditingTechnologySection) return;
    this.editingTechnologySectionElement = element;
  }

  stopInlineEditTechnologySection() {
    this.editingTechnologySectionElement = null;
  }

  onTechnologySectionColorChange() {
    // This method is called when any color input changes
    // The actual saving happens when the user clicks "Save Changes"
  }

  onTechnologySectionFontChange() {
    // This method is called when any font input changes
    // The actual saving happens when the user clicks "Save Changes"
  }

  addTechnologySectionTechnology() {
    if (this.technologySectionConfig) {
      this.technologySectionConfig.technologies.push({
        icon: '🖥️',
        title: 'New Technology',
        description: 'Technology description'
      });
    }
  }

  removeTechnologySectionTechnology(index: number) {
    if (this.technologySectionConfig && this.technologySectionConfig.technologies.length > 1) {
      this.technologySectionConfig.technologies.splice(index, 1);
    }
  }
}
