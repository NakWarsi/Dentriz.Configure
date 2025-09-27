import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DoctorsApiService, SimpleDoctorsConfig } from './services/doctors-api.service';
import { ValuesApiService, SimpleValuesConfig } from './services/values-api.service';
import { TechnologyApiService, SimpleTechnologyConfig } from './services/technology-api.service';
import { TestimonialsApiService, SimpleTestimonialsConfig } from './services/testimonials-api.service';
import { GlobalConfigService, GlobalConfig } from '../config/global-config.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit, OnDestroy {
  // Doctors Configuration
  doctorsConfig: SimpleDoctorsConfig | null = null;
  originalDoctorsConfig: SimpleDoctorsConfig | null = null;
  doctorsLoading = false;
  doctorsError = false;
  isEditingDoctors = false;
  editingDoctorsElement: string | null = null;

  // Values Configuration
  valuesConfig: SimpleValuesConfig | null = null;
  originalValuesConfig: SimpleValuesConfig | null = null;
  valuesLoading = false;
  valuesError = false;
  isEditingValues = false;
  editingValuesElement: string | null = null;

  // Technology Configuration
  technologyConfig: SimpleTechnologyConfig | null = null;
  originalTechnologyConfig: SimpleTechnologyConfig | null = null;
  technologyLoading = false;
  technologyError = false;
  isEditingTechnology = false;
  editingTechnologyElement: string | null = null;

  // Testimonials Configuration
  testimonialsConfig: SimpleTestimonialsConfig | null = null;
  originalTestimonialsConfig: SimpleTestimonialsConfig | null = null;
  testimonialsLoading = false;
  testimonialsError = false;
  isEditingTestimonials = false;
  editingTestimonialsElement: string | null = null;

  // Doctors carousel data (fallback)
  doctors = [
    {
      name: 'Dr. Akash Mankar, BDS',
      title: 'Founder and Chief Dentist',
      title2: 'owner',
      image: '/images/home/dr-rizwana-khan-c1.jpg',
      bio: [
        'Dr. Akash Mankar is a highly skilled dental professional with a <strong>Bachelor of Dental Surgery (BDS)</strong> degree from <strong>Government Dental College, Mumbai</strong> — one of India\'s premier dental institutions.',
        'She has over <strong>8 years of clinical experience</strong> in dentistry, including <strong>3 years of service as a government dentist at GDC Mumbai</strong>, where she gained extensive expertise in treating a wide range of dental conditions.',
        'Dr. Rizwana specializes in <strong>cosmetic dentistry, Invisalign treatment, and comprehensive family care</strong>. Known for her gentle approach, clear communication, and attention to detail, she ensures that every patient feels comfortable and confident throughout their treatment journey.'
      ],
      specialties: ['Cosmetic Dentistry', 'Invisalign', 'Family & Preventive Care', 'Restorative Dentistry']
    },
    {
      name: 'Dr. Ahmed Ameen, BDS',
      title: 'Orthodontist & Implant Specialist',      
      title2: 'visting consultant',
      image: '/images/doctors/dr-ahmed-ameen.jpg',
      bio: [
        'Dr. Ahmed Ameen is a specialized orthodontist with advanced training in dental implants and orthodontic treatments.',
        'With <strong>10+ years of experience</strong> in orthodontics, he specializes in <strong>braces, Invisalign, and dental implant procedures</strong>.',
        'Dr. Ameen is known for his precision in complex cases and his ability to create beautiful, functional smiles for patients of all ages.'
      ],
      specialties: ['Orthodontics', 'Dental Implants', 'Braces & Aligners', 'Smile Design']
    },
    {
      name: 'Dr. Sarah Johnson, MDS',
      title: 'Pediatric Dentist',     
      title2: 'visting consultant',
      image: '/images/doctors/dr-sarah-johnson.jpg',
      bio: [
        'Dr. Sarah Johnson is a dedicated pediatric dentist with a passion for making dental care enjoyable for children.',
        'She has <strong>12 years of experience</strong> in pediatric dentistry and specializes in <strong>child-friendly treatments, preventive care, and early orthodontic intervention</strong>.',
        'Dr. Johnson creates a warm, welcoming environment that helps children develop positive attitudes toward dental health from an early age.'
      ],
      specialties: ['Pediatric Dentistry', 'Preventive Care', 'Child-Friendly Treatments', 'Early Orthodontics']
    },
    {
      name: 'Dr. Michael Chen, BDS',
      title: 'Endodontist & Root Canal Specialist',     
      title2: 'visting consultant',
      image: '/images/doctors/dr-michael-chen.jpg',
      bio: [
        'Dr. Michael Chen is an experienced endodontist specializing in root canal treatments and endodontic procedures.',
        'With <strong>9 years of expertise</strong> in endodontics, he provides <strong>painless root canal treatments, endodontic surgery, and emergency dental care</strong>.',
        'Dr. Chen uses advanced technology and techniques to ensure comfortable, successful treatments for complex dental cases.'
      ],
      specialties: ['Root Canal Treatment', 'Endodontics', 'Emergency Care', 'Dental Surgery']
    }
  ];

  currentDoctorIndex = 0;

  // Global configuration properties
  globalConfig: GlobalConfig = { isEditingEnabled: true, showEditButtons: true };
  private configSubscription?: Subscription;

  constructor(
    private doctorsApiService: DoctorsApiService,
    private valuesApiService: ValuesApiService,
    private technologyApiService: TechnologyApiService,
    private testimonialsApiService: TestimonialsApiService,
    private globalConfigService: GlobalConfigService
  ) {}

  // Navigation methods
  nextDoctor() {
    this.currentDoctorIndex = (this.currentDoctorIndex + 1) % this.doctors.length;
  }

  previousDoctor() {
    this.currentDoctorIndex = this.currentDoctorIndex === 0 
      ? this.doctors.length - 1 
      : this.currentDoctorIndex - 1;
  }

  goToDoctor(index: number) {
    this.currentDoctorIndex = index;
  }

  // Handle image loading errors
  onImageError(event: any) {
    console.warn('Doctor image failed to load:', event.target.src);
    // Fallback to placeholder emoji
    event.target.style.display = 'none';
    event.target.nextElementSibling.style.display = 'flex';
  }

  // Auto-advance carousel (optional)
  ngOnInit() {
    // Subscribe to global configuration changes
    this.configSubscription = this.globalConfigService.config$.subscribe(config => {
      this.globalConfig = config;
      // If editing is disabled globally, stop all editing modes
      if (!config.isEditingEnabled) {
        this.stopAllEditing();
      }
    });

    this.loadDoctorsConfig();
    this.loadValuesConfig();
    this.loadTechnologyConfig();
    this.loadTestimonialsConfig();
    // Auto-advance every 8 seconds
    setInterval(() => {
      this.nextDoctor();
    }, 8000);
  }

  ngOnDestroy() {
    if (this.configSubscription) {
      this.configSubscription.unsubscribe();
    }
  }

  // Stop all editing modes
  private stopAllEditing(): void {
    this.isEditingDoctors = false;
    this.isEditingValues = false;
    this.isEditingTechnology = false;
    this.isEditingTestimonials = false;
    this.editingDoctorsElement = null;
    this.editingValuesElement = null;
    this.editingTechnologyElement = null;
    this.editingTestimonialsElement = null;
  }

  teamMembers = [
    {
      name: 'Dr. Sarah Johnson',
      position: 'Lead Dentist',
      description: 'With over 15 years of experience in general and cosmetic dentistry.',
      image: '👩‍⚕️'
    },
    {
      name: 'Dr. Michael Chen',
      position: 'Orthodontist',
      description: 'Specialized in braces and orthodontic treatments for all ages.',
      image: '👨‍⚕️'
    },
    {
      name: 'Dr. Emily Rodriguez',
      position: 'Pediatric Dentist',
      description: 'Dedicated to making dental visits fun and comfortable for children.',
      image: '��‍⚕️'
    }
  ];

  // Doctors Configuration Methods
  loadDoctorsConfig() {
    this.doctorsLoading = true;
    this.doctorsError = false;

    this.doctorsApiService.loadConfig().subscribe({
      next: (config) => {
        this.doctorsConfig = config;
        this.originalDoctorsConfig = JSON.parse(JSON.stringify(config));
        this.doctorsLoading = false;
      },
      error: (error) => {
        console.error('Error loading doctors config:', error);
        this.doctorsError = true;
        this.doctorsLoading = false;
      }
    });
  }

  startEditingDoctors() {
    if (!this.globalConfig.isEditingEnabled) {
      console.log('Editing is disabled globally');
      return;
    }
    this.isEditingDoctors = true;
  }

  stopEditingDoctors() {
    if (this.doctorsConfig) {
      this.doctorsApiService.saveConfig(this.doctorsConfig).subscribe({
        next: () => {
          this.originalDoctorsConfig = JSON.parse(JSON.stringify(this.doctorsConfig!));
          this.isEditingDoctors = false;
          this.editingDoctorsElement = null;
        },
        error: (error) => {
          console.error('Error saving doctors config:', error);
          alert('Error saving changes. Please try again.');
        }
      });
    }
  }

  cancelEditingDoctors() {
    if (this.originalDoctorsConfig) {
      this.doctorsConfig = JSON.parse(JSON.stringify(this.originalDoctorsConfig));
    }
    this.isEditingDoctors = false;
    this.editingDoctorsElement = null;
  }

  resetDoctorsToOriginal() {
    if (this.originalDoctorsConfig) {
      this.doctorsConfig = JSON.parse(JSON.stringify(this.originalDoctorsConfig));
    }
  }

  startInlineEditDoctors(element: string) {
    if (!this.globalConfig.isEditingEnabled || !this.isEditingDoctors) return;
    this.editingDoctorsElement = element;
  }

  stopInlineEditDoctors() {
    this.editingDoctorsElement = null;
  }

  onDoctorsColorChange() {
    // This method is called when any color input changes
    // The actual saving happens when the user clicks "Save Changes"
  }

  onDoctorsFontChange() {
    // This method is called when any font input changes
    // The actual saving happens when the user clicks "Save Changes"
  }

  addDoctor() {
    if (this.doctorsConfig) {
      this.doctorsConfig.doctors.push({
        name: 'New Doctor - click to edit',
        title: 'New Title - click to edit',
        title2: 'New Title 2 - click to edit',
        image: '/images/doctors/placeholder.jpg',
        bio: ['New bio paragraph - click to edit'],
        specialties: ['New Specialty - click to edit']
      });
    }
  }

  removeDoctor(index: number) {
    if (this.doctorsConfig && this.doctorsConfig.doctors.length > 1) {
      this.doctorsConfig.doctors.splice(index, 1);
      // Adjust current index if needed
      if (this.currentDoctorIndex >= this.doctorsConfig.doctors.length) {
        this.currentDoctorIndex = this.doctorsConfig.doctors.length - 1;
      }
    }
  }

  addBioParagraph(doctorIndex: number) {
    if (this.doctorsConfig) {
      this.doctorsConfig.doctors[doctorIndex].bio.push('New bio paragraph - click to edit');
    }
  }

  removeBioParagraph(doctorIndex: number, bioIndex: number) {
    if (this.doctorsConfig && this.doctorsConfig.doctors[doctorIndex].bio.length > 1) {
      this.doctorsConfig.doctors[doctorIndex].bio.splice(bioIndex, 1);
    }
  }

  addSpecialty(doctorIndex: number) {
    if (this.doctorsConfig) {
      this.doctorsConfig.doctors[doctorIndex].specialties.push('New Specialty - click to edit');
    }
  }

  removeSpecialty(doctorIndex: number, specialtyIndex: number) {
    if (this.doctorsConfig && this.doctorsConfig.doctors[doctorIndex].specialties.length > 1) {
      this.doctorsConfig.doctors[doctorIndex].specialties.splice(specialtyIndex, 1);
    }
  }

  // Get current doctors array (from config or fallback)
  get currentDoctors() {
    return this.doctorsConfig?.doctors || this.doctors;
  }

  // Values Configuration Methods
  loadValuesConfig() {
    this.valuesLoading = true;
    this.valuesError = false;

    this.valuesApiService.loadConfig().subscribe({
      next: (config) => {
        this.valuesConfig = config;
        this.originalValuesConfig = JSON.parse(JSON.stringify(config));
        this.valuesLoading = false;
      },
      error: (error) => {
        console.error('Error loading values config:', error);
        this.valuesError = true;
        this.valuesLoading = false;
      }
    });
  }

  startEditingValues() {
    if (!this.globalConfig.isEditingEnabled) {
      console.log('Editing is disabled globally');
      return;
    }
    this.isEditingValues = true;
  }

  stopEditingValues() {
    if (this.valuesConfig) {
      this.valuesApiService.saveConfig(this.valuesConfig).subscribe({
        next: () => {
          this.originalValuesConfig = JSON.parse(JSON.stringify(this.valuesConfig!));
          this.isEditingValues = false;
          this.editingValuesElement = null;
        },
        error: (error) => {
          console.error('Error saving values config:', error);
          alert('Error saving changes. Please try again.');
        }
      });
    }
  }

  cancelEditingValues() {
    if (this.originalValuesConfig) {
      this.valuesConfig = JSON.parse(JSON.stringify(this.originalValuesConfig));
    }
    this.isEditingValues = false;
    this.editingValuesElement = null;
  }

  resetValuesToOriginal() {
    if (this.originalValuesConfig) {
      this.valuesConfig = JSON.parse(JSON.stringify(this.originalValuesConfig));
    }
  }

  startInlineEditValues(element: string) {
    if (!this.globalConfig.isEditingEnabled || !this.isEditingValues) return;
    this.editingValuesElement = element;
  }

  stopInlineEditValues() {
    this.editingValuesElement = null;
  }

  onValuesColorChange() {
    // This method is called when any color input changes
    // The actual saving happens when the user clicks "Save Changes"
  }

  onValuesFontChange() {
    // This method is called when any font input changes
    // The actual saving happens when the user clicks "Save Changes"
  }

  addValue() {
    if (this.valuesConfig) {
      this.valuesConfig.values.push({
        icon: '⭐',
        title: 'New Value - click to edit',
        description: 'New value description - click to edit'
      });
    }
  }

  removeValue(index: number) {
    if (this.valuesConfig && this.valuesConfig.values.length > 1) {
      this.valuesConfig.values.splice(index, 1);
    }
  }

  // Technology Configuration Methods
  loadTechnologyConfig() {
    this.technologyLoading = true;
    this.technologyError = false;

    this.technologyApiService.loadConfig().subscribe({
      next: (config) => {
        this.technologyConfig = config;
        this.originalTechnologyConfig = JSON.parse(JSON.stringify(config));
        this.technologyLoading = false;
      },
      error: (error) => {
        console.error('Error loading technology config:', error);
        this.technologyError = true;
        this.technologyLoading = false;
      }
    });
  }

  startEditingTechnology() {
    if (!this.globalConfig.isEditingEnabled) {
      console.log('Editing is disabled globally');
      return;
    }
    this.isEditingTechnology = true;
  }

  stopEditingTechnology() {
    if (this.technologyConfig) {
      this.technologyApiService.saveConfig(this.technologyConfig).subscribe({
        next: () => {
          this.originalTechnologyConfig = JSON.parse(JSON.stringify(this.technologyConfig!));
          this.isEditingTechnology = false;
          this.editingTechnologyElement = null;
        },
        error: (error) => {
          console.error('Error saving technology config:', error);
          alert('Error saving changes. Please try again.');
        }
      });
    }
  }

  cancelEditingTechnology() {
    if (this.originalTechnologyConfig) {
      this.technologyConfig = JSON.parse(JSON.stringify(this.originalTechnologyConfig));
    }
    this.isEditingTechnology = false;
    this.editingTechnologyElement = null;
  }

  resetTechnologyToOriginal() {
    if (this.originalTechnologyConfig) {
      this.technologyConfig = JSON.parse(JSON.stringify(this.originalTechnologyConfig));
    }
  }

  startInlineEditTechnology(element: string) {
    if (!this.globalConfig.isEditingEnabled || !this.isEditingTechnology) return;
    this.editingTechnologyElement = element;
  }

  stopInlineEditTechnology() {
    this.editingTechnologyElement = null;
  }

  onTechnologyColorChange() {
    // This method is called when any color input changes
    // The actual saving happens when the user clicks "Save Changes"
  }

  onTechnologyFontChange() {
    // This method is called when any font input changes
    // The actual saving happens when the user clicks "Save Changes"
  }

  addTechnology() {
    if (this.technologyConfig) {
      this.technologyConfig.technologies.push({
        icon: '⚙️',
        title: 'New Technology - click to edit',
        description: 'New technology description - click to edit'
      });
    }
  }

  removeTechnology(index: number) {
    if (this.technologyConfig && this.technologyConfig.technologies.length > 1) {
      this.technologyConfig.technologies.splice(index, 1);
    }
  }

  // Testimonials Configuration Methods
  loadTestimonialsConfig() {
    this.testimonialsLoading = true;
    this.testimonialsError = false;

    this.testimonialsApiService.loadConfig().subscribe({
      next: (config) => {
        this.testimonialsConfig = config;
        this.originalTestimonialsConfig = JSON.parse(JSON.stringify(config));
        this.testimonialsLoading = false;
      },
      error: (error) => {
        console.error('Error loading testimonials config:', error);
        this.testimonialsError = true;
        this.testimonialsLoading = false;
      }
    });
  }

  startEditingTestimonials() {
    if (!this.globalConfig.isEditingEnabled) {
      console.log('Editing is disabled globally');
      return;
    }
    this.isEditingTestimonials = true;
  }

  stopEditingTestimonials() {
    if (this.testimonialsConfig) {
      this.testimonialsApiService.saveConfig(this.testimonialsConfig).subscribe({
        next: () => {
          this.originalTestimonialsConfig = JSON.parse(JSON.stringify(this.testimonialsConfig!));
          this.isEditingTestimonials = false;
          this.editingTestimonialsElement = null;
        },
        error: (error) => {
          console.error('Error saving testimonials config:', error);
          alert('Error saving changes. Please try again.');
        }
      });
    }
  }

  cancelEditingTestimonials() {
    if (this.originalTestimonialsConfig) {
      this.testimonialsConfig = JSON.parse(JSON.stringify(this.originalTestimonialsConfig));
    }
    this.isEditingTestimonials = false;
    this.editingTestimonialsElement = null;
  }

  resetTestimonialsToOriginal() {
    if (this.originalTestimonialsConfig) {
      this.testimonialsConfig = JSON.parse(JSON.stringify(this.originalTestimonialsConfig));
    }
  }

  startInlineEditTestimonials(element: string) {
    if (!this.globalConfig.isEditingEnabled || !this.isEditingTestimonials) return;
    this.editingTestimonialsElement = element;
  }

  stopInlineEditTestimonials() {
    this.editingTestimonialsElement = null;
  }

  onTestimonialsColorChange() {
    // This method is called when any color input changes
    // The actual saving happens when the user clicks "Save Changes"
  }

  onTestimonialsFontChange() {
    // This method is called when any font input changes
    // The actual saving happens when the user clicks "Save Changes"
  }

  addTestimonial() {
    if (this.testimonialsConfig) {
      this.testimonialsConfig.testimonials.push({
        stars: '⭐⭐⭐⭐⭐',
        text: 'New testimonial text - click to edit',
        authorName: 'New Author - click to edit',
        authorTitle: 'Verified Patient'
      });
    }
  }

  removeTestimonial(index: number) {
    if (this.testimonialsConfig && this.testimonialsConfig.testimonials.length > 1) {
      this.testimonialsConfig.testimonials.splice(index, 1);
    }
  }
}
