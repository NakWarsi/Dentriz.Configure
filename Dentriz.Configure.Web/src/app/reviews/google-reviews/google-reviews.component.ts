import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-google-reviews',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './google-reviews.component.html',
  styleUrl: './google-reviews.component.css'
})
export class GoogleReviewsComponent {
  constructor(private router: Router) {}

  googleReviews = [
    {
      id: 1,
      author: 'Sarah Johnson',
      rating: 5,
      date: '2024-01-15',
      text: 'Dr. Riz and his team are absolutely amazing! They made my dental experience comfortable and pain-free. The office is modern and clean, and everyone is so friendly. Highly recommend!',
      verified: true,
      helpful: 12
    },
    {
      id: 2,
      author: 'Michael Chen',
      rating: 5,
      date: '2024-01-10',
      text: 'Professional, caring, and excellent service. The staff is friendly and the facility is modern and clean. Dr. Riz took the time to explain everything clearly.',
      verified: true,
      helpful: 8
    },
    {
      id: 3,
      author: 'Emily Rodriguez',
      rating: 5,
      date: '2024-01-08',
      text: 'I was nervous about getting dental work done, but Dr. Riz put me at ease. The results exceeded my expectations! The entire team is wonderful.',
      verified: true,
      helpful: 15
    },
    {
      id: 4,
      author: 'David Thompson',
      rating: 4,
      date: '2024-01-05',
      text: 'Great experience overall. The staff is professional and the facility is clean. Would definitely recommend to friends and family.',
      verified: false,
      helpful: 5
    },
    {
      id: 5,
      author: 'Lisa Wang',
      rating: 5,
      date: '2024-01-03',
      text: 'Outstanding care and attention to detail. The entire team is knowledgeable and compassionate. My dental anxiety is completely gone!',
      verified: true,
      helpful: 20
    }
  ];

  overallStats = {
    averageRating: 4.8,
    totalReviews: 127,
    fiveStar: 98,
    fourStar: 20,
    threeStar: 5,
    twoStar: 2,
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
