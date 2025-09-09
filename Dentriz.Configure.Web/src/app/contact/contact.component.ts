import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactHeroApiService, SimpleContactHeroConfig } from './services/contact-hero-api.service';

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

  contactForm = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  constructor(private contactHeroApiService: ContactHeroApiService) {}

  ngOnInit() {
    this.loadContactHeroConfig();
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
