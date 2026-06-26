import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PrimaryButtonComponent } from '../../shared/components/buttons/primary-button/primary-button.component';
import { SecondaryButtonComponent } from '../../shared/components/buttons/secondary-button/secondary-button.component';
import { ServiceCardComponent } from '../../shared/components/service-card/service-card.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import {
  DataService, ServiceItem, StatItem, FeatureItem, GalleryItem
} from '../../core/services/data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    PrimaryButtonComponent,
    SecondaryButtonComponent,
    ServiceCardComponent,
    RevealDirective
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  services: ServiceItem[];
  stats: StatItem[];
  features: FeatureItem[];
  gallery: GalleryItem[];
  chipsLoop: string[];
  aboutImage: string;

  constructor(private router: Router, data: DataService) {
    this.services = data.getServices();
    this.stats = data.getStats();
    this.features = data.getFeatures();
    this.gallery = data.getGallery();
    const chips = data.getChips();
    this.chipsLoop = [...chips, ...chips]; // duplicated for the seamless -50% marquee loop
    this.aboutImage = data.getAboutImage();
  }

  /** Stagger delay class (d1–d4) cycling per index. */
  d(i: number): string {
    return 'd' + ((i % 4) + 1);
  }

  goTo(path: string): void {
    this.router.navigate([path]);
  }
}
