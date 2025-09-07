import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface WorkItem {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  procedure: string;
  duration: string;
  difficulty: string;
}

@Component({
  selector: 'app-our-work',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './our-work.component.html',
  styleUrls: ['./our-work.component.css']
})
export class OurWorkComponent {
  selectedWork: WorkItem | null = null;
  showModal = false;
  selectedCategory = 'all';

  workItems: WorkItem[] = [
    {
      id: 1,
      title: "Dental Restoration",
      category: "restoration",
      description: "Comprehensive dental restoration work using advanced materials",
      image: "assets/images/gallery/our-work/work1.jpg",
      procedure: "Composite Filling",
      duration: "45 minutes",
      difficulty: "Moderate"
    },
    {
      id: 2,
      title: "Cosmetic Dentistry",
      category: "cosmetic",
      description: "Beautiful cosmetic dentistry transformation",
      image: "assets/images/gallery/our-work/work2.jpg",
      procedure: "Porcelain Veneers",
      duration: "2 hours",
      difficulty: "Advanced"
    },
    {
      id: 3,
      title: "Dental Implant",
      category: "implant",
      description: "Single dental implant placement with crown",
      image: "assets/images/gallery/our-work/work3.jpg",
      procedure: "Implant Surgery",
      duration: "1.5 hours",
      difficulty: "Advanced"
    },
    {
      id: 4,
      title: "Veneer Work",
      category: "cosmetic",
      description: "Porcelain veneer application for smile enhancement",
      image: "assets/images/gallery/our-work/work4.jpg",
      procedure: "Veneer Application",
      duration: "2.5 hours",
      difficulty: "Advanced"
    },
    {
      id: 5,
      title: "Crown Work",
      category: "restoration",
      description: "Ceramic crown placement for damaged tooth",
      image: "assets/images/gallery/our-work/work5.jpg",
      procedure: "Crown Placement",
      duration: "1 hour",
      difficulty: "Moderate"
    },
    {
      id: 6,
      title: "Bridge Work",
      category: "restoration",
      description: "Dental bridge to replace missing teeth",
      image: "assets/images/gallery/our-work/work6.jpg",
      procedure: "Bridge Installation",
      duration: "2 hours",
      difficulty: "Advanced"
    },
    {
      id: 7,
      title: "Filling Work",
      category: "restoration",
      description: "Composite filling for cavity treatment",
      image: "assets/images/gallery/our-work/work7.jpg",
      procedure: "Composite Filling",
      duration: "30 minutes",
      difficulty: "Basic"
    },
    {
      id: 8,
      title: "Root Canal",
      category: "endodontics",
      description: "Root canal treatment to save infected tooth",
      image: "assets/images/gallery/our-work/work8.jpg",
      procedure: "Root Canal Therapy",
      duration: "1.5 hours",
      difficulty: "Advanced"
    },
    {
      id: 9,
      title: "Tooth Extraction",
      category: "surgery",
      description: "Surgical extraction of impacted tooth",
      image: "assets/images/gallery/our-work/work9.jpg",
      procedure: "Surgical Extraction",
      duration: "45 minutes",
      difficulty: "Advanced"
    },
    {
      id: 10,
      title: "Dental Cleaning",
      category: "preventive",
      description: "Professional dental cleaning and scaling",
      image: "assets/images/gallery/our-work/work10.jpg",
      procedure: "Deep Cleaning",
      duration: "1 hour",
      difficulty: "Basic"
    },
    {
      id: 11,
      title: "Teeth Whitening",
      category: "cosmetic",
      description: "Professional in-office teeth whitening",
      image: "assets/images/gallery/our-work/work11.jpg",
      procedure: "Professional Whitening",
      duration: "1 hour",
      difficulty: "Basic"
    },
    {
      id: 12,
      title: "Dental Bonding",
      category: "cosmetic",
      description: "Composite bonding for minor imperfections",
      image: "assets/images/gallery/our-work/work12.jpg",
      procedure: "Composite Bonding",
      duration: "1 hour",
      difficulty: "Moderate"
    },
    {
      id: 13,
      title: "Gum Treatment",
      category: "periodontics",
      description: "Periodontal treatment for gum disease",
      image: "assets/images/gallery/our-work/work13.jpg",
      procedure: "Gum Therapy",
      duration: "1.5 hours",
      difficulty: "Advanced"
    },
    {
      id: 14,
      title: "Orthodontic Work",
      category: "orthodontics",
      description: "Braces and orthodontic treatment",
      image: "assets/images/gallery/our-work/work14.jpg",
      procedure: "Braces Installation",
      duration: "2 hours",
      difficulty: "Advanced"
    },
    {
      id: 15,
      title: "Oral Surgery",
      category: "surgery",
      description: "Complex oral surgery procedure",
      image: "assets/images/gallery/our-work/work15.jpg",
      procedure: "Oral Surgery",
      duration: "3 hours",
      difficulty: "Advanced"
    }
  ];

  categories = [
    { id: 'all', name: 'All Work' },
    { id: 'restoration', name: 'Restoration' },
    { id: 'cosmetic', name: 'Cosmetic' },
    { id: 'implant', name: 'Implants' },
    { id: 'endodontics', name: 'Endodontics' },
    { id: 'surgery', name: 'Surgery' },
    { id: 'preventive', name: 'Preventive' },
    { id: 'periodontics', name: 'Periodontics' },
    { id: 'orthodontics', name: 'Orthodontics' }
  ];

  get filteredWork() {
    if (this.selectedCategory === 'all') {
      return this.workItems;
    }
    return this.workItems.filter(item => item.category === this.selectedCategory);
  }

  openModal(work: WorkItem) {
    this.selectedWork = work;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedWork = null;
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }
}
