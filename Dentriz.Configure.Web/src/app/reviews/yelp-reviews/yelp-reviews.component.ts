import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-yelp-reviews',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './yelp-reviews.component.html',
  styleUrl: './yelp-reviews.component.css'
})
export class YelpReviewsComponent {
  constructor(private router: Router) {}

  yelpReviews = [
    {
      id: 1,
      author: 'Jessica Kim',
      rating: 5,
      date: '2024-01-13',
      text: 'Absolutely amazing dental practice! Dr. Riz is incredibly skilled and the staff is so friendly. The office is beautiful and modern. Highly recommend!',
      useful: 8,
      funny: 2,
      cool: 5,
      verified: true
    },
    {
      id: 2,
      author: 'Mark Rodriguez',
      rating: 5,
      date: '2024-01-11',
      text: 'Best dental experience I\'ve ever had. Professional, clean, and painless. Dr. Riz explains everything clearly and makes you feel comfortable.',
      useful: 12,
      funny: 1,
      cool: 7,
      verified: true
    },
    {
      id: 3,
      author: 'Amanda Foster',
      rating: 5,
      date: '2024-01-09',
      text: 'I was terrified of dentists but Dr. Riz and his team made me feel so comfortable. The results are amazing! Thank you!',
      useful: 15,
      funny: 3,
      cool: 10,
      verified: false
    },
    {
      id: 4,
      author: 'Thomas Lee',
      rating: 4,
      date: '2024-01-07',
      text: 'Great service and friendly staff. The office is modern and clean. Would definitely recommend to friends and family.',
      useful: 6,
      funny: 0,
      cool: 3,
      verified: true
    },
    {
      id: 5,
      author: 'Lisa Chen',
      rating: 5,
      date: '2024-01-05',
      text: 'Outstanding care! Dr. Riz is not only skilled but also very patient and kind. The entire team is wonderful.',
      useful: 10,
      funny: 1,
      cool: 6,
      verified: true
    }
  ];

  overallStats = {
    averageRating: 4.7,
    totalReviews: 156,
    fiveStar: 120,
    fourStar: 25,
    threeStar: 6,
    twoStar: 3,
    oneStar: 2
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
