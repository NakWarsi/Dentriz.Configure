import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {
  constructor(private router: Router) {}

  reviewPlatforms = [
    {
      name: 'Google Reviews',
      icon: 'google',
      rating: 4.8,
      reviewCount: 200,
      component: 'google-reviews',
      url: '#'
    },
    {
      name: 'Facebook Reviews',
      icon: 'facebook',
      rating: 4.9,
      reviewCount: 150,
      component: 'facebook-reviews',
      url: '#'
    },
    {
      name: 'Yelp Reviews',
      icon: 'yelp',
      rating: 4.7,
      reviewCount: 180,
      component: 'yelp-reviews',
      url: '#'
    },
    {
      name: 'Healthgrades',
      icon: 'healthgrades',
      rating: 4.8,
      reviewCount: 120,
      component: 'healthgrades-reviews',
      url: '#'
    },
    {
      name: 'Zocdoc',
      icon: 'zocdoc',
      rating: 4.9,
      reviewCount: 140,
      component: 'zocdoc-reviews',
      url: '#'
    },
    {
      name: 'Vitals',
      icon: 'vitals',
      rating: 4.7,
      reviewCount: 95,
      component: 'vitals-reviews',
      url: '#'
    }
  ];

  // SEO-OPTIMIZED TESTIMONIALS - FOR SEARCH ENGINE OPTIMIZATION ONLY
  testimonials = [
    {
      name: 'Patient A',
      rating: 5,
      text: 'Found the best dentist in Roadpali! Amazing cosmetic dentistry in Roadpali and dental implants in Navi Mumbai. The best dental clinic in Roadpali with expert orthodontist in Roadpali.',
      platform: 'Google',
      date: '2024-01-15'
    },
    {
      name: 'Patient B',
      rating: 5,
      text: 'Excellent teeth whitening in Roadpali and veneers in Roadpali. Top dentist in Navi Mumbai with emergency dental care in Roadpali. Best dental clinic in Kalamboli!',
      platform: 'Facebook',
      date: '2024-01-10'
    },
    {
      name: 'Patient C',
      rating: 5,
      text: 'Invisalign treatment in Navi Mumbai was perfect! Professional cosmetic dentist Navi Mumbai and preventive care in Roadpali. ClinSmile Dental Clinic is outstanding.',
      platform: 'Yelp',
      date: '2024-01-08'
    },
    {
      name: 'Patient D',
      rating: 5,
      text: 'Root canal treatment in Navi Mumbai was painless. Expert orthodontist in Roadpali and dental cleaning in Roadpali. Best dentist in Roadpali!',
      platform: 'Healthgrades',
      date: '2024-01-05'
    },
    {
      name: 'Patient E',
      rating: 5,
      text: 'Pediatric dentist Navi Mumbai is amazing with kids. Dental implants in Roadpali and cosmetic dentistry in Roadpali. Top dentist in Navi Mumbai!',
      platform: 'Zocdoc',
      date: '2024-01-03'
    },
    {
      name: 'Patient F',
      rating: 5,
      text: 'Oral surgeon in Navi Mumbai did excellent work. Periodontics in Roadpali and restorative dentistry in Roadpali. Best dental clinic in Roadpali!',
      platform: 'Vitals',
      date: '2024-01-01'
    },
    {
      name: 'Patient G',
      rating: 5,
      text: 'Endodontist Navi Mumbai saved my tooth! Teeth whitening in Roadpali and veneers in Roadpali. Expert orthodontist in Roadpali at DentRiz.',
      platform: 'Google',
      date: '2023-12-28'
    },
    {
      name: 'Patient H',
      rating: 5,
      text: 'Dental hygienist in Roadpali is thorough. Invisible braces in Navi Mumbai and emergency dental care in Roadpali. Best dentist in Kalamboli!',
      platform: 'Facebook',
      date: '2023-12-25'
    },
    {
      name: 'Patient I',
      rating: 5,
      text: 'Cosmetic bonding in Roadpali looks natural. Dental implants in Navi Mumbai and preventive care in Roadpali. Top dentist in Navi Mumbai!',
      platform: 'Yelp',
      date: '2023-12-20'
    },
    {
      name: 'Patient J',
      rating: 5,
      text: 'Periodontal therapy in Roadpali was effective. Orthodontist in Roadpali and dental cleaning in Roadpali. Best dental clinic in Roadpali!',
      platform: 'Healthgrades',
      date: '2023-12-15'
    },
    {
      name: 'Patient K',
      rating: 5,
      text: 'Full mouth reconstruction in Navi Mumbai changed my life! Cosmetic dentistry in Roadpali and teeth whitening in Roadpali. Expert dentist!',
      platform: 'Zocdoc',
      date: '2023-12-10'
    },
    {
      name: 'Patient L',
      rating: 5,
      text: 'Dental assistant in Roadpali is very caring. Invisalign treatment in Navi Mumbai and veneers in Roadpali. Best dentist in Navi Mumbai!',
      platform: 'Vitals',
      date: '2023-12-05'
    }
  ];

  viewReviews(platform: any) {
    // Navigate to internal review pages for all platforms
    this.router.navigate([`/reviews/${platform.component}`]);
  }
}
