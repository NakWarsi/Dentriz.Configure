import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GalleryHeroApiService, SimpleGalleryHeroConfig } from './services/gallery-hero-api.service';
import { GalleryContentApiService, SimpleGalleryContentConfig, GallerySection } from './services/gallery-content-api.service';
import { GalleryStatsApiService, SimpleGalleryStatsConfig, GalleryStat } from './services/gallery-stats-api.service';
import { GlobalConfigService, GlobalConfig } from '../config/global-config.service';

@Component({
  selector: 'app-smile-gallery',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './smile-gallery.component.html',
  styleUrls: ['./smile-gallery.component.css']
})
export class SmileGalleryComponent implements OnInit, OnDestroy {
  // Gallery Hero Configuration
  galleryHeroConfig: SimpleGalleryHeroConfig | null = null;
  originalGalleryHeroConfig: SimpleGalleryHeroConfig | null = null;
  galleryHeroLoading = false;
  galleryHeroError = false;
  isEditingGalleryHero = false;
  editingGalleryHeroElement: string | null = null;

  // Gallery Content Configuration
  galleryContentConfig: SimpleGalleryContentConfig | null = null;
  originalGalleryContentConfig: SimpleGalleryContentConfig | null = null;
  galleryContentLoading = false;
  galleryContentError = false;
  isEditingGalleryContent = false;
  editingGalleryContentElement: string | null = null;

  // Gallery Stats Configuration
  galleryStatsConfig: SimpleGalleryStatsConfig | null = null;
  originalGalleryStatsConfig: SimpleGalleryStatsConfig | null = null;
  galleryStatsLoading = false;
  galleryStatsError = false;
  isEditingGalleryStats = false;
  editingGalleryStatsElement: string | null = null;

  // Global configuration properties
  globalConfig: GlobalConfig = { isEditingEnabled: true, showEditButtons: true };
  private configSubscription?: Subscription;

  constructor(
    private galleryHeroApiService: GalleryHeroApiService,
    private galleryContentApiService: GalleryContentApiService,
    private galleryStatsApiService: GalleryStatsApiService,
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

    this.loadGalleryHeroConfig();
    this.loadGalleryContentConfig();
    this.loadGalleryStatsConfig();
  }

  ngOnDestroy() {
    if (this.configSubscription) {
      this.configSubscription.unsubscribe();
    }
  }

  // Stop all editing modes
  private stopAllEditing(): void {
    this.isEditingGalleryHero = false;
    this.isEditingGalleryContent = false;
    this.isEditingGalleryStats = false;
    this.editingGalleryHeroElement = null;
    this.editingGalleryContentElement = null;
    this.editingGalleryStatsElement = null;
  }

  // Gallery Hero Configuration Methods
  loadGalleryHeroConfig() {
    this.galleryHeroLoading = true;
    this.galleryHeroError = false;

    this.galleryHeroApiService.loadConfig().subscribe({
      next: (config) => {
        this.galleryHeroConfig = config;
        this.originalGalleryHeroConfig = JSON.parse(JSON.stringify(config));
        this.galleryHeroLoading = false;
      },
      error: (error) => {
        console.error('Error loading gallery hero config:', error);
        this.galleryHeroError = true;
        this.galleryHeroLoading = false;
      }
    });
  }

  startEditingGalleryHero() {
    if (!this.globalConfig.isEditingEnabled) {
      console.log('Editing is disabled globally');
      return;
    }
    this.isEditingGalleryHero = true;
  }

  stopEditingGalleryHero() {
    if (this.galleryHeroConfig) {
      this.galleryHeroApiService.saveConfig(this.galleryHeroConfig).subscribe({
        next: () => {
          this.originalGalleryHeroConfig = JSON.parse(JSON.stringify(this.galleryHeroConfig!));
          this.isEditingGalleryHero = false;
          this.editingGalleryHeroElement = null;
        },
        error: (error) => {
          console.error('Error saving gallery hero config:', error);
          alert('Error saving changes. Please try again.');
        }
      });
    }
  }

  cancelEditingGalleryHero() {
    if (this.originalGalleryHeroConfig) {
      this.galleryHeroConfig = JSON.parse(JSON.stringify(this.originalGalleryHeroConfig));
    }
    this.isEditingGalleryHero = false;
    this.editingGalleryHeroElement = null;
  }

  resetGalleryHeroToOriginal() {
    if (this.originalGalleryHeroConfig) {
      this.galleryHeroConfig = JSON.parse(JSON.stringify(this.originalGalleryHeroConfig));
    }
  }

  startInlineEditGalleryHero(element: string) {
    if (!this.globalConfig.isEditingEnabled || !this.isEditingGalleryHero) return;
    this.editingGalleryHeroElement = element;
  }

  stopInlineEditGalleryHero() {
    this.editingGalleryHeroElement = null;
  }

  onGalleryHeroColorChange() {
    // This method is called when any color input changes
    // The actual saving happens when the user clicks "Save Changes"
  }

  onGalleryHeroFontChange() {
    // This method is called when any font input changes
    // The actual saving happens when the user clicks "Save Changes"
  }

  // Gallery Content Configuration Methods
  loadGalleryContentConfig() {
    this.galleryContentLoading = true;
    this.galleryContentError = false;

    this.galleryContentApiService.loadConfig().subscribe({
      next: (config) => {
        this.galleryContentConfig = config;
        this.originalGalleryContentConfig = JSON.parse(JSON.stringify(config));
        this.galleryContentLoading = false;
      },
      error: (error) => {
        console.error('Error loading gallery content config:', error);
        this.galleryContentError = true;
        this.galleryContentLoading = false;
      }
    });
  }

  startEditingGalleryContent() {
    if (!this.globalConfig.isEditingEnabled) {
      console.log('Editing is disabled globally');
      return;
    }
    this.isEditingGalleryContent = true;
  }

  stopEditingGalleryContent() {
    if (this.galleryContentConfig) {
      this.galleryContentApiService.saveConfig(this.galleryContentConfig).subscribe({
        next: () => {
          this.originalGalleryContentConfig = JSON.parse(JSON.stringify(this.galleryContentConfig!));
          this.isEditingGalleryContent = false;
          this.editingGalleryContentElement = null;
        },
        error: (error) => {
          console.error('Error saving gallery content config:', error);
          alert('Error saving changes. Please try again.');
        }
      });
    }
  }

  cancelEditingGalleryContent() {
    if (this.originalGalleryContentConfig) {
      this.galleryContentConfig = JSON.parse(JSON.stringify(this.originalGalleryContentConfig));
    }
    this.isEditingGalleryContent = false;
    this.editingGalleryContentElement = null;
  }

  resetGalleryContentToOriginal() {
    if (this.originalGalleryContentConfig) {
      this.galleryContentConfig = JSON.parse(JSON.stringify(this.originalGalleryContentConfig));
    }
  }

  startInlineEditGalleryContent(element: string) {
    if (!this.globalConfig.isEditingEnabled || !this.isEditingGalleryContent) return;
    this.editingGalleryContentElement = element;
  }

  stopInlineEditGalleryContent() {
    this.editingGalleryContentElement = null;
  }

  onGalleryContentColorChange() {
    // This method is called when any color input changes
    // The actual saving happens when the user clicks "Save Changes"
  }

  onGalleryContentFontChange() {
    // This method is called when any font input changes
    // The actual saving happens when the user clicks "Save Changes"
  }

  addGalleryContentSection() {
    if (this.galleryContentConfig) {
      this.galleryContentConfig.gallerySections.push({
        id: 'new-section-' + Date.now(),
        title: 'New Gallery Section',
        description: 'Gallery section description',
        route: '/smile-gallery/new-section',
        color: this.galleryContentConfig.cardBackgroundColor,
        imageCount: 0
      });
    }
  }

  removeGalleryContentSection(index: number) {
    if (this.galleryContentConfig && this.galleryContentConfig.gallerySections.length > 1) {
      this.galleryContentConfig.gallerySections.splice(index, 1);
    }
  }

  // Gallery Stats Configuration Methods
  loadGalleryStatsConfig() {
    this.galleryStatsLoading = true;
    this.galleryStatsError = false;

    this.galleryStatsApiService.loadConfig().subscribe({
      next: (config) => {
        this.galleryStatsConfig = config;
        this.originalGalleryStatsConfig = JSON.parse(JSON.stringify(config));
        this.galleryStatsLoading = false;
      },
      error: (error) => {
        console.error('Error loading gallery stats config:', error);
        this.galleryStatsError = true;
        this.galleryStatsLoading = false;
      }
    });
  }

  startEditingGalleryStats() {
    if (!this.globalConfig.isEditingEnabled) {
      console.log('Editing is disabled globally');
      return;
    }
    this.isEditingGalleryStats = true;
  }

  stopEditingGalleryStats() {
    if (this.galleryStatsConfig) {
      this.galleryStatsApiService.saveConfig(this.galleryStatsConfig).subscribe({
        next: () => {
          this.originalGalleryStatsConfig = JSON.parse(JSON.stringify(this.galleryStatsConfig!));
          this.isEditingGalleryStats = false;
          this.editingGalleryStatsElement = null;
        },
        error: (error) => {
          console.error('Error saving gallery stats config:', error);
          alert('Error saving changes. Please try again.');
        }
      });
    }
  }

  cancelEditingGalleryStats() {
    if (this.originalGalleryStatsConfig) {
      this.galleryStatsConfig = JSON.parse(JSON.stringify(this.originalGalleryStatsConfig));
    }
    this.isEditingGalleryStats = false;
    this.editingGalleryStatsElement = null;
  }

  resetGalleryStatsToOriginal() {
    if (this.originalGalleryStatsConfig) {
      this.galleryStatsConfig = JSON.parse(JSON.stringify(this.originalGalleryStatsConfig));
    }
  }

  startInlineEditGalleryStats(element: string) {
    if (!this.globalConfig.isEditingEnabled || !this.isEditingGalleryStats) return;
    this.editingGalleryStatsElement = element;
  }

  stopInlineEditGalleryStats() {
    this.editingGalleryStatsElement = null;
  }

  onGalleryStatsColorChange() {
    // This method is called when any color input changes
    // The actual saving happens when the user clicks "Save Changes"
  }

  onGalleryStatsFontChange() {
    // This method is called when any font input changes
    // The actual saving happens when the user clicks "Save Changes"
  }

  addGalleryStatsStat() {
    if (this.galleryStatsConfig) {
      this.galleryStatsConfig.galleryStats.push({
        number: '100%',
        label: 'New Stat Label'
      });
    }
  }

  removeGalleryStatsStat(index: number) {
    if (this.galleryStatsConfig && this.galleryStatsConfig.galleryStats.length > 1) {
      this.galleryStatsConfig.galleryStats.splice(index, 1);
    }
  }
  // SEO-OPTIMIZED GALLERY SECTIONS - FOR SEARCH ENGINE OPTIMIZATION ONLY
  gallerySections = [
    { 
      id: 'before-after', 
      title: 'Before & After', 
      description: 'Cosmetic dentistry transformations in Roadpali and dental implants in Navi Mumbai. Professional teeth whitening in Roadpali and veneers in Roadpali showcasing the best dental clinic in Roadpali.', 
      imageCount: 12, 
      route: '/smile-gallery/before-after',
      color: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)'
    },
    { 
      id: 'our-work', 
      title: 'Our Work', 
      description: 'Restorative dentistry in Roadpali and emergency dental care in Roadpali. Expert orthodontist in Roadpali and pediatric dentist Navi Mumbai showcasing dental work at ClinSmile Dental Clinic.', 
      imageCount: 15, 
      route: '/smile-gallery/our-work',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    { 
      id: 'smile-transformations', 
      title: 'Smile Transformations', 
      description: 'Invisalign treatment in Navi Mumbai and preventive care in Roadpali. Complete smile makeovers with cosmetic dentistry in Roadpali and dental implants in Navi Mumbai at the top dentist in Navi Mumbai.', 
      imageCount: 8, 
      route: '/smile-gallery/smile-transformations',
      color: 'linear-gradient(135deg, #2ed573 0%, #1e90ff 100%)'
    },
    { 
      id: 'smile-showcase', 
      title: 'Our Smile Showcase', 
      description: 'Periodontics in Roadpali and endodontics in Roadpali. Professional oral surgery in Navi Mumbai and teeth whitening in Roadpali showcasing the best dental clinic in Kalamboli.', 
      imageCount: 20, 
      route: '/smile-gallery/smile-showcase',
      color: 'linear-gradient(135deg, #ffa726 0%, #ff7043 100%)'
    },
    { 
      id: 'clinic-photos', 
      title: 'Clinic Photos', 
      description: 'Modern dental facility in Roadpali with advanced technology. State-of-the-art equipment for cosmetic dentistry in Roadpali and dental implants in Navi Mumbai at ClinSmile Dental Clinic.', 
      imageCount: 10, 
      route: '/smile-gallery/clinic-photos',
      color: 'linear-gradient(135deg, #42a5f5 0%, #1976d2 100%)'
    },
    { 
      id: 'events', 
      title: 'Events', 
      description: 'Dental health awareness programs in Roadpali and community events in Kalamboli. Educational seminars on preventive care in Roadpali and emergency dental care in Roadpali.', 
      imageCount: 6, 
      route: '/smile-gallery/events',
      color: 'linear-gradient(135deg, #ab47bc 0%, #8e24aa 100%)'
    },
    { 
      id: 'patient-stories', 
      title: 'Patient Stories', 
      description: 'Dental journey experiences with the best dentist in Roadpali. Success stories from cosmetic dentistry in Roadpali and dental implants in Navi Mumbai at ClinSmile Dental Clinic.', 
      imageCount: 8, 
      route: '/smile-gallery/patient-stories',
      color: 'linear-gradient(135deg, #26a69a 0%, #00897b 100%)'
    },
    { 
      id: 'technology-showcase', 
      title: 'Technology Showcase', 
      description: 'Advanced dental technology in Roadpali and modern equipment in Kalamboli. Latest tools for orthodontics in Roadpali and pediatric dentistry in Navi Mumbai at the top dentist in Navi Mumbai.', 
      imageCount: 5, 
      route: '/smile-gallery/technology-showcase',
      color: 'linear-gradient(135deg, #78909c 0%, #546e7a 100%)'
    },
    { 
      id: 'team-gallery', 
      title: 'Team Gallery', 
      description: 'Expert dental team in Roadpali and skilled professionals in Kalamboli. Experienced cosmetic dentist Navi Mumbai and orthodontist in Roadpali at ClinSmile Dental Clinic.', 
      imageCount: 7, 
      route: '/smile-gallery/team-gallery',
      color: 'linear-gradient(135deg, #ff7043 0%, #e64a19 100%)'
    },
    { 
      id: 'awards-recognition', 
      title: 'Awards & Recognition', 
      description: 'Professional recognition for the best dental clinic in Roadpali. Awards for cosmetic dentistry in Roadpali and dental implants in Navi Mumbai at ClinSmile Dental Clinic.', 
      imageCount: 4, 
      route: '/smile-gallery/awards-recognition',
      color: 'linear-gradient(135deg, #ffd54f 0%, #ffb300 100%)'
    }
  ];
}
