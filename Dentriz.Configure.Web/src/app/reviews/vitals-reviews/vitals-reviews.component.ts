import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-vitals-reviews',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './vitals-reviews.component.html',
  styleUrl: './vitals-reviews.component.css'
})
export class VitalsReviewsComponent {
  constructor(private router: Router) {}

  vitalsReviews = [
    {
      id: 1,
      author: 'Dr. Patricia Anderson',
      rating: 5,
      date: '2024-01-13',
      text: 'Dr. Riz is an exceptional dentist with outstanding clinical skills and patient care. His attention to detail and modern approach to dentistry is impressive.',
      helpful: 8,
      verified: true,
      specialty: 'General Dentistry'
    },
    {
      id: 2,
      author: 'Dr. Robert Kim',
      rating: 5,
      date: '2024-01-11',
      text: 'Excellent professional with great bedside manner. Dr. Riz takes time to explain procedures and makes patients feel comfortable. Highly recommend!',
      helpful: 6,
      verified: true,
      specialty: 'Cosmetic Dentistry'
    },
    {
      id: 3,
      author: 'Dr. Sarah Chen',
      rating: 4,
      date: '2024-01-09',
      text: 'Very professional and skilled dentist. The office is well-equipped and the staff is friendly. Good experience overall.',
      helpful: 4,
      verified: true,
      specialty: 'Restorative Dentistry'
    },
    {
      id: 4,
      author: 'Dr. Michael Davis',
      rating: 5,
      date: '2024-01-07',
      text: 'Dr. Riz demonstrates exceptional clinical expertise and patient care. His modern approach to dentistry is commendable.',
      helpful: 7,
      verified: true,
      specialty: 'Endodontics'
    },
    {
      id: 5,
      author: 'Dr. Lisa Johnson',
      rating: 5,
      date: '2024-01-05',
      text: 'Outstanding care and attention to detail. Dr. Riz combines technical excellence with compassionate care. Excellent results!',
      helpful: 9,
      verified: true,
      specialty: 'Periodontics'
    }
  ];

  overallStats = {
    averageRating: 4.7,
    totalReviews: 45,
    fiveStar: 38,
    fourStar: 5,
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
