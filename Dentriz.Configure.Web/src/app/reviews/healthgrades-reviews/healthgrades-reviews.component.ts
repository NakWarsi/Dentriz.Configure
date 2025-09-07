import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-healthgrades-reviews',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './healthgrades-reviews.component.html',
  styleUrl: './healthgrades-reviews.component.css'
})
export class HealthgradesReviewsComponent {
  constructor(private router: Router) {}

  healthgradesReviews = [
    {
      id: 1,
      author: 'Dr. Sarah Williams',
      rating: 5,
      date: '2024-01-12',
      text: 'Dr. Riz is an exceptional dentist with excellent clinical skills. His attention to detail and patient care is outstanding. Highly recommend for any dental procedure.',
      helpful: 15,
      verified: true,
      specialty: 'General Dentistry'
    },
    {
      id: 2,
      author: 'Dr. Michael Johnson',
      rating: 5,
      date: '2024-01-10',
      text: 'Outstanding professional with great bedside manner. Dr. Riz takes the time to explain procedures and makes patients feel comfortable. Excellent work!',
      helpful: 12,
      verified: true,
      specialty: 'Cosmetic Dentistry'
    },
    {
      id: 3,
      author: 'Dr. Emily Davis',
      rating: 5,
      date: '2024-01-08',
      text: 'Dr. Riz demonstrates exceptional clinical expertise and patient care. His modern approach to dentistry and use of advanced technology is impressive.',
      helpful: 18,
      verified: true,
      specialty: 'Restorative Dentistry'
    },
    {
      id: 4,
      author: 'Dr. Robert Chen',
      rating: 4,
      date: '2024-01-06',
      text: 'Very professional and skilled dentist. The office is well-equipped and the staff is friendly. Would recommend to colleagues and patients.',
      helpful: 8,
      verified: true,
      specialty: 'Endodontics'
    },
    {
      id: 5,
      author: 'Dr. Lisa Thompson',
      rating: 5,
      date: '2024-01-04',
      text: 'Dr. Riz is a true professional who combines technical excellence with compassionate care. His results speak for themselves.',
      helpful: 20,
      verified: true,
      specialty: 'Periodontics'
    }
  ];

  overallStats = {
    averageRating: 4.8,
    totalReviews: 73,
    fiveStar: 65,
    fourStar: 6,
    threeStar: 1,
    twoStar: 1,
    oneStar: 0
  };

  getRatingPercentage(rating: number): number {
    const total = this.overallStats.totalReviews;
    switch(rating) {
      case 5: return (this.overallStats.fiveStar / total) * 100;
      case 4: return (this.overallStats.fourStar / total) * 100;
      case 3: return (this.overallStats.threeStar / total) * 100;
      case 2: return (this.overallStats.twoStar / total) * 100;
      case 1: return (this.overallStats.oneStar / total) * 100;
      default: return 0;
    }
  }

  backToReviews() {
    this.router.navigate(['/reviews']);
  }
}
