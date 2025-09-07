import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-facebook-reviews',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './facebook-reviews.component.html',
  styleUrl: './facebook-reviews.component.css'
})
export class FacebookReviewsComponent {
  constructor(private router: Router) {}

  facebookReviews = [
    {
      id: 1,
      author: 'Jennifer Martinez',
      rating: 5,
      date: '2024-01-14',
      text: 'Amazing dental practice! Dr. Riz is incredibly skilled and caring. The staff is friendly and the office is beautiful. Highly recommend!',
      likes: 8,
      comments: 2,
      verified: true
    },
    {
      id: 2,
      author: 'Robert Wilson',
      rating: 5,
      date: '2024-01-12',
      text: 'Best dental experience I\'ve ever had. Professional, clean, and painless. Dr. Riz explains everything clearly and makes you feel comfortable.',
      likes: 12,
      comments: 1,
      verified: true
    },
    {
      id: 3,
      author: 'Amanda Davis',
      rating: 5,
      date: '2024-01-10',
      text: 'I was terrified of dentists but Dr. Riz and his team made me feel so comfortable. The results are amazing! Thank you!',
      likes: 15,
      comments: 3,
      verified: false
    },
    {
      id: 4,
      author: 'Thomas Brown',
      rating: 4,
      date: '2024-01-08',
      text: 'Great service and friendly staff. The office is modern and clean. Would definitely recommend to friends and family.',
      likes: 6,
      comments: 0,
      verified: true
    },
    {
      id: 5,
      author: 'Lisa Garcia',
      rating: 5,
      date: '2024-01-06',
      text: 'Outstanding care! Dr. Riz is not only skilled but also very patient and kind. The entire team is wonderful.',
      likes: 10,
      comments: 1,
      verified: true
    }
  ];

  overallStats = {
    averageRating: 4.9,
    totalReviews: 89,
    fiveStar: 75,
    fourStar: 10,
    threeStar: 2,
    twoStar: 1,
    oneStar: 1
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
