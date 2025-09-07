import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    <main>
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
  styles: []
})
export class AppComponent {
  title = 'DentRiz Dental - Best Dentist in Wakad & Hinjewadi, Pune';

  constructor(private meta: Meta) {
    this.setMetaTags();
  }

  private setMetaTags() {
    this.meta.addTags([
      { name: 'description', content: 'Best dentist in Wakad and Hinjewadi, Pune. Top dental clinic offering cosmetic dentistry, dental implants, family dentistry, teeth cleaning, veneers, and pediatric dentistry services. Call 750-616-8095 for appointments.' },
      { name: 'keywords', content: 'best dentist in hinjewadi, cosmetic dentist in wakad, dental clinic hinjewadi, dentist hinjewadi, dentist near wakad, veneers in wakad, dental clinic wakad, cosmetic dentistry in wakad, dental cleaning in wakad, dentist in wakad, family dentist in wakad, dental clinic in hinjewadi, best dental clinic in wakad, dental crown in wakad, orthodontist in wakad, teeth cleaning in wakad, dental clinic in wakad, good dentist in wakad, dental implants in wakad, cosmetic dentistry in pune, pediatric dentistry in pune, pediatric dentist pune, dental implants in pune, best dental implants in pune, braces in pune, invisible braces in pune, teeth whitening treatment in pune, dentist in pune, best dentist in pune, top 3 dentist in pune, top 10 dentist in pune, dental clinic in pune near me, top dentist in pune, good dentist in pune, pediatric dentist pune' },
      { name: 'author', content: 'DentRiz Dental' },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:title', content: 'DentRiz Dental - Best Dentist in Wakad & Hinjewadi, Pune' },
      { property: 'og:description', content: 'Leading dental clinic in Wakad and Hinjewadi offering comprehensive dental care including cosmetic dentistry, dental implants, and family dentistry services.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://dentrizdental.com' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'DentRiz Dental - Best Dentist in Wakad & Hinjewadi, Pune' },
      { name: 'twitter:description', content: 'Top dental clinic in Pune offering cosmetic dentistry, dental implants, and family dentistry services in Wakad and Hinjewadi.' }
    ]);
  }
}
