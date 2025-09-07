import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
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
}
