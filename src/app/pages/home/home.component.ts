import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryButtonComponent } from '../../shared/components/buttons/primary-button/primary-button.component';
import { SecondaryButtonComponent } from '../../shared/components/buttons/secondary-button/secondary-button.component';
import { CardComponent } from '../../shared/components/ui/card/card.component';
import { CarouselComponent } from '../../shared/components/ui/carousel/carousel.component';
import { DataService, LocalPhoto } from '../../core/services/data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    PrimaryButtonComponent,
    SecondaryButtonComponent,
    CardComponent,
    CarouselComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  localPhotos: LocalPhoto[] = [];
  photosLoading = true;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadLocalPhotos();
  }

  ngOnDestroy() {
    // Cleanup se necessario
  }

  private loadLocalPhotos() {
    this.photosLoading = true;
    this.dataService.getLocalPhotos().subscribe({
      next: (photos) => {
        this.localPhotos = photos;
        this.photosLoading = false;
      },
      error: (error) => {
        console.error('Errore caricamento foto:', error);
        this.photosLoading = false;
      }
    });
  }
}
