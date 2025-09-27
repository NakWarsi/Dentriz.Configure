import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { GlobalConfigToggleComponent } from './config/global-config-toggle.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HeaderComponent, FooterComponent, GlobalConfigToggleComponent],
  template: `
    <app-header></app-header>
    <main>
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
    <app-global-config-toggle></app-global-config-toggle>
  `,
  styles: []
})
export class AppComponent {
  title = 'DentRiz Dental - Best Dentist in Roadpali & Kalamboli, Navi Mumbai';

  constructor(private meta: Meta) {
    this.setMetaTags();
  }

  private setMetaTags() {
    this.meta.addTags([
      { name: 'description', content: 'Best dentist in Roadpali and Kalamboli, Navi Mumbai. Top dental clinic offering cosmetic dentistry, dental implants, family dentistry, teeth cleaning, veneers, and pediatric dentistry services. Call 97682 64663 for appointments.' },
      { name: 'keywords', content: 'best dentist in Kalamboli, cosmetic dentist in Roadpali, dental clinic Kalamboli, dentist Kalamboli, dentist near Roadpali, veneers in Roadpali, dental clinic Roadpali, cosmetic dentistry in Roadpali, dental cleaning in Roadpali, dentist in Roadpali, family dentist in Roadpali, dental clinic in Kalamboli, best dental clinic in Roadpali, dental crown in Roadpali, orthodontist in Roadpali, teeth cleaning in Roadpali, dental clinic in Roadpali, good dentist in Roadpali, dental implants in Roadpali, cosmetic dentistry in Navi Mumbai, pediatric dentistry in Navi Mumbai, pediatric dentist Navi Mumbai, dental implants in Navi Mumbai, best dental implants in Navi Mumbai, braces in Navi Mumbai, invisible braces in Navi Mumbai, teeth whitening treatment in Navi Mumbai, dentist in Navi Mumbai, best dentist in Navi Mumbai, top 3 dentist in Navi Mumbai, top 10 dentist in Navi Mumbai, dental clinic in Navi Mumbai near me, top dentist in Navi Mumbai, good dentist in Navi Mumbai, pediatric dentist Navi Mumbai' },
      { name: 'author', content: 'DentRiz Dental' },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:title', content: 'DentRiz Dental - Best Dentist in Roadpali & Kalamboli, Navi Mumbai' },
      { property: 'og:description', content: 'Leading dental clinic in Roadpali and Kalamboli offering comprehensive dental care including cosmetic dentistry, dental implants, and family dentistry services.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://dentrizdental.com' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'DentRiz Dental - Best Dentist in Roadpali & Kalamboli, Navi Mumbai' },
      { name: 'twitter:description', content: 'Top dental clinic in Navi Mumbai offering cosmetic dentistry, dental implants, and family dentistry services in Roadpali and Kalamboli.' }
    ]);
  }
}
