import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CONTACT_HERO_CONSTANTS } from './constants/contact-hero.constants';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  // Contact Hero Configuration
  contactHeroConfig = {
    heroTitle: CONTACT_HERO_CONSTANTS.DEFAULT_HERO_TITLE,
    heroSubtitle: CONTACT_HERO_CONSTANTS.DEFAULT_HERO_SUBTITLE,
    heroTitleColor: CONTACT_HERO_CONSTANTS.DEFAULT_COLORS.HERO_TITLE,
    heroSubtitleColor: CONTACT_HERO_CONSTANTS.DEFAULT_COLORS.HERO_SUBTITLE,
    heroTitleFontFamily: CONTACT_HERO_CONSTANTS.DEFAULT_FONTS.HERO_TITLE,
    heroSubtitleFontFamily: CONTACT_HERO_CONSTANTS.DEFAULT_FONTS.HERO_SUBTITLE,
    backgroundColor: CONTACT_HERO_CONSTANTS.DEFAULT_COLORS.BACKGROUND
  };

  contactForm = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

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
