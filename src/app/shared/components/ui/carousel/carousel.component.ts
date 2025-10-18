import { Component, Input, OnInit, OnDestroy, HostListener, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalPhoto } from '../../../../core/services/data.service';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html'
})
export class CarouselComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  @Input() photos: LocalPhoto[] = [];
  @Input() visibleCount = 3;
  @Input() autoPlay = true;
  @Input() autoPlayInterval = 7000;

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
  // Control whether the transform uses CSS transition
  animate = true;
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
        // We've moved into the cloned slides at the end. Jump back to the
        // real first slide without animation to make loop appear seamless.
        this.animate = false;
        this.currentIndex = this.padCount;
        this.updateIndicators();
        // Re-enable animation on the next frame
        requestAnimationFrame(() => {
          // Force reflow before re-enabling
          void (document.querySelector('.carousel-track-container') as HTMLElement)?.offsetHeight;
          this.animate = true;
        });
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
        // We've moved into the cloned slides at the beginning. Jump to the
        // corresponding real slide at the end without animation.
        this.animate = false;
        this.currentIndex = this.photos.length + this.padCount - 1;
        this.updateIndicators();
        requestAnimationFrame(() => {
          void (document.querySelector('.carousel-track-container') as HTMLElement)?.offsetHeight;
          this.animate = true;
        });
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
