import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isMenuOpen = false;
  isServicesOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  toggleServices() {
    this.isServicesOpen = !this.isServicesOpen;
  }

  closeServices() {
    this.isServicesOpen = false;
  }

  onServicesMouseEnter() {
    this.isServicesOpen = true;
  }

  onServicesMouseLeave() {
    this.isServicesOpen = false;
  }
}
