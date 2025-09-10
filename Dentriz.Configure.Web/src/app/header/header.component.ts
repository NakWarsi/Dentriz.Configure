import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderApiService, SimpleHeaderConfig, NavItem } from './services/header-api.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  // Header Configuration
  headerConfig: SimpleHeaderConfig | null = null;
  originalHeaderConfig: SimpleHeaderConfig | null = null;
  headerLoading = false;
  headerError = false;
  isEditingHeader = false;
  editingHeaderElement: string | null = null;

  // Menu State
  isMenuOpen = false;
  isServicesOpen = false;

  constructor(private headerApiService: HeaderApiService) {}

  ngOnInit() {
    this.loadHeaderConfig();
  }

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

  // Header Configuration Methods
  loadHeaderConfig() {
    this.headerLoading = true;
    this.headerError = false;

    this.headerApiService.loadConfig().subscribe({
      next: (config) => {
        this.headerConfig = config;
        this.originalHeaderConfig = JSON.parse(JSON.stringify(config));
        this.headerLoading = false;
        // Update CSS variables when config is loaded
        this.updateCSSVariables();
      },
      error: (error) => {
        console.error('Error loading header config:', error);
        this.headerError = true;
        this.headerLoading = false;
      }
    });
  }

  startEditingHeader() {
    this.isEditingHeader = true;
  }

  stopEditingHeader() {
    if (this.headerConfig) {
      this.headerApiService.saveConfig(this.headerConfig).subscribe({
        next: () => {
          this.originalHeaderConfig = JSON.parse(JSON.stringify(this.headerConfig!));
          this.isEditingHeader = false;
          this.editingHeaderElement = null;
        },
        error: (error) => {
          console.error('Error saving header config:', error);
          alert('Error saving changes. Please try again.');
        }
      });
    }
  }

  cancelEditingHeader() {
    if (this.originalHeaderConfig) {
      this.headerConfig = JSON.parse(JSON.stringify(this.originalHeaderConfig));
    }
    this.isEditingHeader = false;
    this.editingHeaderElement = null;
  }

  resetHeaderToOriginal() {
    if (this.originalHeaderConfig) {
      this.headerConfig = JSON.parse(JSON.stringify(this.originalHeaderConfig));
    }
  }

  startInlineEditHeader(element: string) {
    this.editingHeaderElement = element;
  }

  stopInlineEditHeader() {
    this.editingHeaderElement = null;
  }

  onHeaderColorChange() {
    // This method is called when any color input changes
    // Update CSS custom properties for dynamic colors
    this.updateCSSVariables();
  }

  onHeaderBackgroundChange() {
    // Synchronize mobile menu background with main background
    if (this.headerConfig) {
      this.headerConfig.mobileMenuBgColor = this.headerConfig.backgroundColor;
    }
    this.updateCSSVariables();
  }

  private updateCSSVariables() {
    if (this.headerConfig && typeof document !== 'undefined') {
      const root = document.documentElement;
      root.style.setProperty('--nav-link-hover-color', this.headerConfig.navLinkHoverColor);
      root.style.setProperty('--nav-link-active-color', this.headerConfig.navLinkActiveColor);
    }
  }

  onHeaderFontChange() {
    // This method is called when any font input changes
    // The actual saving happens when the user clicks "Save Changes"
  }

  addNavItem() {
    if (this.headerConfig) {
      this.headerConfig.navItems.push({
        label: 'New Item',
        route: '/new-item',
        exact: false
      });
    }
  }

  removeNavItem(index: number) {
    if (this.headerConfig && this.headerConfig.navItems.length > 1) {
      this.headerConfig.navItems.splice(index, 1);
    }
  }
}
