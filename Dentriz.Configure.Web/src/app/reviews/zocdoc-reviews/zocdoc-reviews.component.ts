import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-zocdoc-reviews',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './zocdoc-reviews.component.html',
  styleUrl: './zocdoc-reviews.component.css'
})
export class ZocdocReviewsComponent {
  constructor(private router: Router) {}

  zocdocReviews = [
    {
      id: 1,
      author: 'Alexandra Martinez',
      rating: 5,
      date: '2024-01-14',
      text: 'Dr. Riz is absolutely wonderful! The appointment booking through Zocdoc was seamless, and the dental care was exceptional. Highly recommend!',
      helpful: 10,
      verified: true,
      appointmentType: 'Regular Checkup'
    },
    {
      id: 2,
      author: 'James Wilson',
      rating: 5,
      date: '2024-01-12',
      text: 'Great experience from booking to treatment. Dr. Riz is professional, caring, and the office is modern and clean. Will definitely return!',
      helpful: 8,
      verified: true,
      appointmentType: 'Cleaning'
    },
    {
      id: 3,
      author: 'Maria Rodriguez',
      rating: 5,
      date: '2024-01-10',
      text: 'I was nervous about my dental appointment, but Dr. Riz made me feel so comfortable. The staff is friendly and the service is excellent.',
      helpful: 12,
      verified: true,
      appointmentType: 'Root Canal'
    },
    {
      id: 4,
      author: 'David Thompson',
      rating: 4,
      date: '2024-01-08',
      text: 'Very professional and efficient. The online booking was easy and the dental work was done with care. Good experience overall.',
      helpful: 6,
      verified: true,
      appointmentType: 'Filling'
    },
    {
      id: 5,
      author: 'Jennifer Lee',
      rating: 5,
      date: '2024-01-06',
      text: 'Outstanding care and attention to detail. Dr. Riz explains everything clearly and the results are amazing. Highly recommend!',
      helpful: 15,
      verified: true,
      appointmentType: 'Cosmetic Consultation'
    }
  ];

  overallStats = {
    averageRating: 4.9,
    totalReviews: 94,
    fiveStar: 85,
    fourStar: 7,
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
