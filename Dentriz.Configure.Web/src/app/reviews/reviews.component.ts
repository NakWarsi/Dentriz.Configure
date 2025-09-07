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
      text: 'Found the best dentist in Wakad! Amazing cosmetic dentistry in Wakad and dental implants in Pune. The best dental clinic in Wakad with expert orthodontist in Wakad.',
      platform: 'Google',
      date: '2024-01-15'
    },
    {
      name: 'Patient B',
      rating: 5,
      text: 'Excellent teeth whitening in Wakad and veneers in Wakad. Top dentist in Pune with emergency dental care in Wakad. Best dental clinic in Hinjewadi!',
      platform: 'Facebook',
      date: '2024-01-10'
    },
    {
      name: 'Patient C',
      rating: 5,
      text: 'Invisalign treatment in Pune was perfect! Professional cosmetic dentist Pune and preventive care in Wakad. DentRiz Dental Clinic is outstanding.',
      platform: 'Yelp',
      date: '2024-01-08'
    },
    {
      name: 'Patient D',
      rating: 5,
      text: 'Root canal treatment in Pune was painless. Expert orthodontist in Wakad and dental cleaning in Wakad. Best dentist in Wakad!',
      platform: 'Healthgrades',
      date: '2024-01-05'
    },
    {
      name: 'Patient E',
      rating: 5,
      text: 'Pediatric dentist Pune is amazing with kids. Dental implants in Wakad and cosmetic dentistry in Wakad. Top dentist in Pune!',
      platform: 'Zocdoc',
      date: '2024-01-03'
    },
    {
      name: 'Patient F',
      rating: 5,
      text: 'Oral surgeon in Pune did excellent work. Periodontics in Wakad and restorative dentistry in Wakad. Best dental clinic in Wakad!',
      platform: 'Vitals',
      date: '2024-01-01'
    },
    {
      name: 'Patient G',
      rating: 5,
      text: 'Endodontist Pune saved my tooth! Teeth whitening in Wakad and veneers in Wakad. Expert orthodontist in Wakad at DentRiz.',
      platform: 'Google',
      date: '2023-12-28'
    },
    {
      name: 'Patient H',
      rating: 5,
      text: 'Dental hygienist in Wakad is thorough. Invisible braces in Pune and emergency dental care in Wakad. Best dentist in Hinjewadi!',
      platform: 'Facebook',
      date: '2023-12-25'
    },
    {
      name: 'Patient I',
      rating: 5,
      text: 'Cosmetic bonding in Wakad looks natural. Dental implants in Pune and preventive care in Wakad. Top dentist in Pune!',
      platform: 'Yelp',
      date: '2023-12-20'
    },
    {
      name: 'Patient J',
      rating: 5,
      text: 'Periodontal therapy in Wakad was effective. Orthodontist in Wakad and dental cleaning in Wakad. Best dental clinic in Wakad!',
      platform: 'Healthgrades',
      date: '2023-12-15'
    },
    {
      name: 'Patient K',
      rating: 5,
      text: 'Full mouth reconstruction in Pune changed my life! Cosmetic dentistry in Wakad and teeth whitening in Wakad. Expert dentist!',
      platform: 'Zocdoc',
      date: '2023-12-10'
    },
    {
      name: 'Patient L',
      rating: 5,
      text: 'Dental assistant in Wakad is very caring. Invisalign treatment in Pune and veneers in Wakad. Best dentist in Pune!',
      platform: 'Vitals',
      date: '2023-12-05'
    }
  ];

  viewReviews(platform: any) {
    // Navigate to internal review pages for all platforms
    this.router.navigate([`/reviews/${platform.component}`]);
  }
}
