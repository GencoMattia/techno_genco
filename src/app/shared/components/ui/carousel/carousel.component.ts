import { Component, Input, OnInit, OnDestroy, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalPhoto } from '../../../../core/services/data.service';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="carousel-container" #carouselContainer *ngIf="photos.length > 0">
      <div class="carousel-wrapper" [style.transform]="'translateX(-' + (currentIndex * (100 / visibleCount)) + '%)'" [style.gap.px]="gap">
        <div class="carousel-slide" *ngFor="let photo of photos; trackBy: trackByPhotoId; let i = index" [style.flex-basis]="slideWidth">
          <div class="photo-card">
            <img
              [src]="photo.source"
              [alt]="photo.name || 'Foto Tecnogenco'"
              loading="lazy"
              (error)="onImageError($event)"
            />
            <div class="photo-overlay" *ngIf="photo.name">
              <h3>{{ photo.name }}</h3>
              <p *ngIf="photo.description">{{ photo.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="carousel-controls" *ngIf="photos.length > 1">
        <button
          class="carousel-btn prev-btn"
          (click)="previousSlide()"
          aria-label="Foto precedente"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <div class="carousel-indicators">
          <span
            class="indicator"
            *ngFor="let page of getPages(); let i = index"
            [class.active]="i === currentIndex"
            (click)="goToSlide(i)"
          ></span>
        </div>

        <button
          class="carousel-btn next-btn"
          (click)="nextSlide()"
          aria-label="Foto successiva"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>

    <div class="carousel-loading" *ngIf="photos.length === 0 && !error">
      <div class="loading-spinner"></div>
      <p>Caricamento foto...</p>
    </div>

    <div class="carousel-error" *ngIf="error">
      <p>Impossibile caricare le foto. Riprova più tardi.</p>
    </div>
  `,
  styles: [`
    .carousel-container {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .carousel-wrapper {
      display: flex;
      transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      will-change: transform;
    }

    .carousel-slide {
      flex: 0 0 auto;
      min-width: 0;
    }

    .photo-card {
      position: relative;
      border-radius: 0.75rem;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      height: 250px;
      cursor: pointer;
    }

    .photo-card:hover {
      transform: translateY(-4px) scale(1.02);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
    }

    .photo-card img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.3s ease;
    }

    .photo-card:hover img {
      transform: scale(1.05);
    }

    .photo-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
      color: white;
      padding: 1.5rem 1rem 1rem;
      transform: translateY(0);
      transition: transform 0.3s ease;
    }

    .photo-card:hover .photo-overlay {
      transform: translateY(-5px);
    }

    .photo-overlay h3 {
      font-size: 1rem;
      font-weight: 600;
      margin: 0 0 0.5rem 0;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    }

    .photo-overlay p {
      font-size: 0.875rem;
      margin: 0;
      opacity: 0.9;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .carousel-controls {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      margin-top: 1.5rem;
    }

    .carousel-btn {
      background: var(--color-primary-500);
      color: var(--color-on-primary);
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .carousel-btn:hover:not(:disabled) {
      background: var(--color-primary-600);
      transform: scale(1.1);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    .carousel-btn:active:not(:disabled) {
      transform: scale(0.95);
    }

    .carousel-btn:disabled {
      background: var(--color-secondary-300);
      cursor: not-allowed;
      opacity: 0.5;
      transform: none;
    }

    .carousel-indicators {
      display: flex;
      gap: 0.5rem;
    }

    .indicator {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--color-secondary-300);
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .indicator:hover {
      transform: scale(1.2);
      background: var(--color-primary-400);
    }

    .indicator.active {
      background: var(--color-primary-500);
      transform: scale(1.3);
      box-shadow: 0 0 8px rgba(15, 136, 209, 0.4);
    }

    .carousel-loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem;
      color: var(--color-secondary-600);
    }

    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 3px solid var(--color-secondary-200);
      border-top: 3px solid var(--color-primary-500);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 1rem;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .carousel-error {
      text-align: center;
      padding: 2rem;
      color: var(--color-error, #dc3545);
      background: color-mix(in srgb, var(--color-error, #dc3545) 10%, white);
      border-radius: 0.5rem;
      border: 1px solid color-mix(in srgb, var(--color-error, #dc3545) 20%, transparent);
    }

    /* Responsive */
    @media (max-width: 768px) {
      .photo-card {
        height: 200px;
      }

      .carousel-controls {
        gap: 0.5rem;
      }
    }

    @media (max-width: 480px) {
      .photo-card {
        height: 180px;
      }

      .carousel-controls {
        gap: 0.5rem;
      }

      .photo-overlay {
        padding: 1rem 0.75rem 0.75rem;
      }

      .photo-overlay h3 {
        font-size: 0.875rem;
      }

      .photo-overlay p {
        font-size: 0.75rem;
      }
    }
  `]
})
export class CarouselComponent implements OnInit, OnDestroy {
  @Input() photos: LocalPhoto[] = [];
  @Input() visibleCount = 3;
  @Input() autoPlay = true;
  @Input() autoPlayInterval = 5000;

  currentIndex = 0;
  error = false;
  slideWidth = 'calc((100% - 32px) / 3)';
  gap = 16;
  private autoPlayTimer?: number;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    // Inizializza le impostazioni responsive dopo che il componente è pronto
    setTimeout(() => {
      this.updateResponsiveSettings();
      if (this.autoPlay && this.photos.length > 1) {
        this.startAutoPlay();
      }
    });
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.photos.length;
  }

  previousSlide() {
    this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.photos.length - 1;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
    console.warn('Errore caricamento immagine:', img.src);
  }

  getPages(): number[] {
    return Array.from({ length: this.photos.length }, (_, i) => i);
  }

  trackByPhotoId(index: number, photo: LocalPhoto): string {
    return photo.id;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateResponsiveSettings();
  }

  private updateResponsiveSettings() {
    const width = window.innerWidth;

    if (width <= 480) {
      // Mobile: 1 foto
      this.visibleCount = 1;
      this.gap = 8;
    } else if (width <= 768) {
      // Tablet: 2 foto
      this.visibleCount = 2;
      this.gap = 12;
    } else {
      // Desktop: 3 foto
      this.visibleCount = 3;
      this.gap = 16;
    }

    this.slideWidth = `calc((100% - ${this.gap * (this.visibleCount - 1)}px) / ${this.visibleCount})`;

    // Reset index se necessario
    if (this.currentIndex >= this.photos.length) {
      this.currentIndex = 0;
    }
  }  private startAutoPlay() {
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
}
