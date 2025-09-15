import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicesHeroApiService, SimpleServicesHeroConfig } from './services/services-hero-api.service';
import { TechnologySectionApiService, SimpleTechnologySectionConfig } from './services/technology-section-api.service';
import { ServicesApiService, SimpleServicesConfig, Service } from './services/services-api.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements OnInit {
  // Services Hero Configuration
  servicesHeroConfig: SimpleServicesHeroConfig | null = null;
  originalServicesHeroConfig: SimpleServicesHeroConfig | null = null;
  servicesHeroLoading = false;
  servicesHeroError = false;
  isEditingServicesHero = false;
  editingServicesHeroElement: string | null = null;

  // Services Configuration (Unified)
  servicesConfig: SimpleServicesConfig | null = null;
  originalServicesConfig: SimpleServicesConfig | null = null;
  servicesLoading = false;
  servicesError = false;
  isEditingServices = false;
  editingServicesElement: string | null = null;
  currentEditingService: Service | null = null;

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

  constructor(
    private servicesHeroApiService: ServicesHeroApiService,
    private technologySectionApiService: TechnologySectionApiService,
    private servicesApiService: ServicesApiService
  ) {}

  ngOnInit() {
    this.loadServicesHeroConfig();
    this.loadServicesConfig();
    this.loadTechnologySectionConfig();
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

  // Services Configuration Methods (Unified)
  loadServicesConfig() {
    this.servicesLoading = true;
    this.servicesError = false;

    this.servicesApiService.loadConfig().subscribe({
      next: (config) => {
        this.servicesConfig = config;
        this.originalServicesConfig = JSON.parse(JSON.stringify(config));
        this.servicesLoading = false;
      },
      error: (error) => {
        console.error('Error loading services config:', error);
        this.servicesError = true;
        this.servicesLoading = false;
      }
    });
  }

  startEditingServices() {
    this.isEditingServices = true;
  }

  stopEditingServices() {
    if (this.servicesConfig) {
      this.servicesApiService.saveConfig(this.servicesConfig).subscribe({
        next: () => {
          this.originalServicesConfig = JSON.parse(JSON.stringify(this.servicesConfig!));
          this.isEditingServices = false;
          this.editingServicesElement = null;
          this.currentEditingService = null;
        },
        error: (error) => {
          console.error('Error saving services config:', error);
          alert('Error saving changes. Please try again.');
        }
      });
    }
  }

  cancelEditingServices() {
    if (this.originalServicesConfig) {
      this.servicesConfig = JSON.parse(JSON.stringify(this.originalServicesConfig));
    }
    this.isEditingServices = false;
    this.editingServicesElement = null;
    this.currentEditingService = null;
  }

  resetServicesToOriginal() {
    if (this.originalServicesConfig) {
      this.servicesConfig = JSON.parse(JSON.stringify(this.originalServicesConfig));
    }
  }

  startInlineEditServices(element: string) {
    this.editingServicesElement = element;
  }

  stopInlineEditServices() {
    this.editingServicesElement = null;
  }

  onServicesColorChange() {
    // This method is called when any color input changes
    // The actual saving happens when the user clicks "Save Changes"
  }

  onServicesFontChange() {
    // This method is called when any font input changes
    // The actual saving happens when the user clicks "Save Changes"
  }

  getServiceByTitle(title: string): Service | null {
    if (!this.servicesConfig) return null;
    return this.servicesConfig.serviceList.find(service => 
      service.sectionTitle.toLowerCase() === title.toLowerCase()
    ) || null;
  }

  addServiceItem(serviceTitle: string) {
    const service = this.getServiceByTitle(serviceTitle);
    if (service) {
      service.services.push({
        icon: '🦷',
        title: 'New Service',
        description: 'Service description',
        features: ['Feature 1', 'Feature 2']
      });
    }
  }

  removeServiceItem(serviceTitle: string, index: number) {
    const service = this.getServiceByTitle(serviceTitle);
    if (service && service.services.length > 1) {
      service.services.splice(index, 1);
    }
  }

  addServiceFeature(serviceTitle: string, serviceIndex: number) {
    const service = this.getServiceByTitle(serviceTitle);
    if (service) {
      service.services[serviceIndex].features.push('New Feature');
    }
  }

  removeServiceFeature(serviceTitle: string, serviceIndex: number, featureIndex: number) {
    const service = this.getServiceByTitle(serviceTitle);
    if (service) {
      service.services[serviceIndex].features.splice(featureIndex, 1);
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
