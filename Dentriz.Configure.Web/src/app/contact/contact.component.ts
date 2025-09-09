import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactHeroApiService, SimpleContactHeroConfig } from './services/contact-hero-api.service';
import { ContactInfoApiService, SimpleContactInfoConfig } from './services/contact-info-api.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
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

  contactForm = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  constructor(
    private contactHeroApiService: ContactHeroApiService,
    private contactInfoApiService: ContactInfoApiService
  ) {}

  ngOnInit() {
    this.loadContactHeroConfig();
    this.loadContactInfoConfig();
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
