import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryButtonComponent } from '../../shared/components/buttons/primary-button/primary-button.component';
import { SecondaryButtonComponent } from '../../shared/components/buttons/secondary-button/secondary-button.component';
import { CardComponent } from '../../shared/components/ui/card/card.component';
import { CarouselComponent } from '../../shared/components/ui/carousel/carousel.component';
import { ServiceCardComponent } from '../../shared/components/service-card/service-card.component';
import { DataService, LocalPhoto } from '../../core/services/data.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, PrimaryButtonComponent, SecondaryButtonComponent, CardComponent, CarouselComponent, ServiceCardComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {
  localPhotos: LocalPhoto[] = [];
  photosLoading = true;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadLocalPhotos();
  }

  private loadLocalPhotos() {
    this.photosLoading = true;
    this.dataService.getLocalPhotos().subscribe({
      next: (photos) => {
        this.localPhotos = photos;
        this.photosLoading = false;
      },
      error: (err) => {
        console.error('Errore caricamento foto about:', err);
        this.photosLoading = false;
      }
    });
  }
}
