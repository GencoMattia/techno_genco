import { Component, Input, OnInit, OnDestroy, HostListener, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalPhoto } from '../../../../core/services/data.service';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative w-full py-4" *ngIf="photos.length > 0">
      <!-- Slider (adapted from the provided model) -->
      <div class="relative">
        <div class="w-full overflow-hidden bg-white rounded-lg carousel-track-container">
          <div class="relative min-h-72 -mx-1">
            <div class="absolute top-0 bottom-0 left-0 flex flex-nowrap cursor-grab transition-transform duration-500" [style.transform]="'translateX(-' + (currentIndex * (cardWidth + gap)) + 'px)'" [style.gap.px]="gap">
              <div class="flex-none px-1 min-w-0" *ngFor="let photo of duplicatedPhotos; trackBy: trackByPhotoId" [style.width.px]="cardWidth" [style.min-width.px]="cardWidth" [style.max-width.px]="cardWidth">
                <div class="flex justify-center h-full bg-gray-100 p-6 w-full min-w-0 overflow-hidden" [style.height.px]="cardHeight">
                  <img [src]="photo.source" [alt]="photo.name || 'Foto Tecnogenco'" loading="lazy" class="object-cover w-full h-full rounded-lg min-w-0" (error)="onImageError($event, photo)" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Prev -->
        <button type="button" class="absolute inset-y-0 left-0 inline-flex justify-center items-center w-12 h-full text-gray-800 hover:bg-gray-800/10 rounded-l-lg z-10" (click)="previousSlide()" [attr.aria-label]="'Previous'">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"></path></svg>
        </button>

        <!-- Next -->
        <button type="button" class="absolute inset-y-0 right-0 inline-flex justify-center items-center w-12 h-full text-gray-800 hover:bg-gray-800/10 rounded-r-lg z-10" (click)="nextSlide()" [attr.aria-label]="'Next'">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"></path></svg>
        </button>

        <!-- Pagination -->
        <div class="flex justify-center absolute bottom-3 left-0 right-0 gap-x-2">
          <button *ngFor="let i of indicatorArray; let idx = index" (click)="goToIndicator(idx)" [attr.aria-label]="'Vai alla slide ' + (idx + 1)" class="w-3 h-3 rounded-full border border-gray-300 disabled:opacity-50" [ngClass]="{'bg-primary-500': idx === currentIndicator, 'bg-secondary-300': idx !== currentIndicator}"></button>
        </div>
      </div>
    </div>

    <div class="flex flex-col items-center justify-center py-16 px-8 text-secondary-600" *ngIf="photos.length === 0 && !error">
      <div class="w-12 h-12 border-4 border-secondary-200 border-t-primary-500 rounded-full animate-spin mb-4"></div>
      <p>Caricamento foto...</p>
    </div>

    <div class="text-center py-8 px-4 text-red-600 bg-red-50 rounded-lg border border-red-200" *ngIf="error">
      <p>{{ errorMessage }}</p>
    </div>
  `,
  styles: []
})
export class CarouselComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  @Input() photos: LocalPhoto[] = [];
  @Input() visibleCount = 3;
  @Input() autoPlay = true;
  @Input() autoPlayInterval = 5000;

  error = false;
  errorMessage = 'Impossibile caricare le foto. Riprova più tardi.';
  gap = 16;

  private autoPlayTimer?: number;

  // New properties for single card scroll
  currentIndex = 0;
  cardWidth = 0;
  cardHeight = 0;
  padCount = 0;
  duplicatedPhotos: LocalPhoto[] = [];
  isTransitioning = false;
  indicatorArray: number[] = [];
  currentIndicator = 0;

  ngOnInit() {
    // createDuplicatedPhotos will be called also from ngOnChanges when input arrives
    if (this.photos && this.photos.length) {
      this.createDuplicatedPhotos();
      this.updateIndicators();
    }

    if (this.autoPlay && this.photos.length > 3) {
      this.startAutoPlay();
    }
  }

  ngAfterViewInit() {
    // Ensure card width is calculated after the view is rendered
    requestAnimationFrame(() => this.updateCardWidth());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['photos'] && !changes['photos'].firstChange) {
      // Rebuild duplicated array and recalc sizes when photos input changes
      this.createDuplicatedPhotos();
      // Wait next frame for DOM to update
      requestAnimationFrame(() => {
        this.updateCardWidth();
        this.updateIndicators();
      });
    }
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  onImageError(event: Event, photo: LocalPhoto) {
    const img = event.target as HTMLImageElement;
    console.error('Errore caricamento immagine:', photo.source);

    // Prova con percorso alternativo
    if (!photo.source.startsWith('/')) {
      img.src = '/' + photo.source;
    } else {
      // Se fallisce anche il secondo tentativo, mostra placeholder
      img.style.display = 'none';
      this.error = true;
      this.errorMessage = `Impossibile caricare l'immagine: ${photo.name || photo.id}`;
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.updateCardWidth();
  }

  trackByPhotoId(index: number, photo: LocalPhoto): string {
    return photo.id;
  }

  nextSlide() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    this.currentIndex++;
    this.updateIndicators();
    this.resetAutoPlay();

    setTimeout(() => {
      if (this.currentIndex >= this.photos.length + this.padCount) {
        this.currentIndex = this.padCount;
        this.updateIndicators();
      }
      this.isTransitioning = false;
    }, 500);
  }

  previousSlide() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    this.currentIndex--;
    this.updateIndicators();
    this.resetAutoPlay();

    setTimeout(() => {
      if (this.currentIndex < 0) {
        this.currentIndex = this.photos.length + this.padCount - 1;
        this.updateIndicators();
      }
      this.isTransitioning = false;
    }, 500);
  }

  goToIndicator(idx: number) {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
  this.currentIndex = this.padCount + idx;
    this.updateIndicators();
    this.resetAutoPlay();

    setTimeout(() => {
      this.isTransitioning = false;
    }, 500);
  }

  private createDuplicatedPhotos() {
    if (this.photos.length === 0) {
      this.duplicatedPhotos = [];
      return;
    }

    const pad = Math.min(this.visibleCount, 3);
    // Duplicate photos for infinite loop: last pad + all + first pad
    this.duplicatedPhotos = [
      ...this.photos.slice(-pad),
      ...this.photos,
      ...this.photos.slice(0, pad)
    ];
    this.padCount = pad;
    this.currentIndex = this.padCount; // Start after the duplicates
  }

  private updateCardWidth() {
    if (this.photos.length === 0) return;
    const container = document.querySelector('.carousel-track-container') as HTMLElement;
    if (!container) return;

    const containerWidth = container.offsetWidth;
    // Calculate available width (container may have padding/margins outside)
    const availableWidth = containerWidth;
    const totalGap = this.gap * (this.visibleCount - 1);
    this.cardWidth = Math.floor((availableWidth - totalGap) / this.visibleCount);
    // Card height based on ratio or fixed height (use 3:2 ratio)
    this.cardHeight = Math.floor(this.cardWidth * 0.66);
  }

  private updateIndicators() {
    this.indicatorArray = Array.from({ length: this.photos.length }, (_, i) => i);
    this.currentIndicator = (this.currentIndex - this.padCount + this.photos.length) % this.photos.length;
  }

  private startAutoPlay() {
    this.stopAutoPlay();
    this.autoPlayTimer = window.setInterval(() => {
      this.nextSlide();
    }, this.autoPlayInterval);
  }

  private stopAutoPlay() {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = undefined;
    }
  }

  private resetAutoPlay() {
    if (this.autoPlay && this.photos.length > 3) {
      this.startAutoPlay();
    }
  }
}
