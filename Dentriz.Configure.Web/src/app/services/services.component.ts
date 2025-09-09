import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicesHeroApiService, SimpleServicesHeroConfig } from './services/services-hero-api.service';

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

  constructor(private servicesHeroApiService: ServicesHeroApiService) {}

  ngOnInit() {
    this.loadServicesHeroConfig();
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
}
