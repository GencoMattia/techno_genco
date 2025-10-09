import { Component, Input, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalPhoto } from '../../../../core/services/data.service';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="carousel-container" *ngIf="photos.length > 0">
      <div class="carousel-track-container">
        <div
          class="carousel-track"
          [style.transform]="'translateX(-' + (currentPage * 100) + '%)'"
          [style.gap.px]="gap">
          <div
            class="carousel-slide"
            *ngFor="let photo of photos; trackBy: trackByPhotoId"
            [style.width]="slideWidth"
            [style.max-width]="slideWidth">
            <div class="photo-card">
              <img
                [src]="photo.source"
                [alt]="photo.name || 'Foto Tecnogenco'"
                loading="lazy"
                (error)="onImageError($event, photo)"
              />
              <div class="photo-overlay" *ngIf="photo.name">
                <h3>{{ photo.name }}</h3>
                <p *ngIf="photo.description">{{ photo.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation buttons -->
      <button
        *ngIf="totalPages > 1"
        class="carousel-btn prev-btn"
        (click)="previousPage()"
        [disabled]="currentPage === 0"
        aria-label="Pagina precedente">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <button
        *ngIf="totalPages > 1"
        class="carousel-btn next-btn"
        (click)="nextPage()"
        [disabled]="currentPage === totalPages - 1"
        aria-label="Pagina successiva">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <!-- Indicators -->
      <div class="carousel-indicators" *ngIf="totalPages > 1">
        <button
          *ngFor="let page of pages; let i = index"
          class="indicator"
          [class.active]="i === currentPage"
          (click)="goToPage(i)"
          [attr.aria-label]="'Vai alla pagina ' + (i + 1)">
        </button>
      </div>
    </div>

    <div class="carousel-loading" *ngIf="photos.length === 0 && !error">
      <div class="loading-spinner"></div>
      <p>Caricamento foto...</p>
    </div>

    <div class="carousel-error" *ngIf="error">
      <p>{{ errorMessage }}</p>
    </div>
  `,
  styles: [`
    .carousel-container {
      position: relative;
      width: 100%;
      padding: 1rem 0;
    }

    .carousel-track-container {
      overflow: hidden;
      border-radius: 0.75rem;
      padding: 0.5rem;
      margin: -0.5rem;
    }

    .carousel-track {
      display: flex;
      transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      will-change: transform;
    }

    .carousel-slide {
      flex: 0 0 auto;
      flex-shrink: 0;
      padding: 0.5rem;
      box-sizing: border-box;
    }

    .photo-card {
      position: relative;
      border-radius: 0.75rem;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      height: 300px;
      width: 100%;
      max-width: 100%;
      cursor: pointer;
      background: var(--color-secondary-100);
      box-sizing: border-box;
    }

    .photo-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    }

    .photo-card img {
      width: 100%;
      height: 100%;
      max-width: 100%;
      max-height: 100%;
      object-fit: cover;
      object-position: center;
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
      background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.6) 60%, transparent 100%);
      color: white;
      padding: 2rem 1.25rem 1.25rem;
      transition: padding 0.3s ease;
    }

    .photo-card:hover .photo-overlay {
      padding-bottom: 1.5rem;
    }

    .photo-overlay h3 {
      font-size: 1.125rem;
      font-weight: 600;
      margin: 0 0 0.5rem 0;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
      line-height: 1.3;
    }

    .photo-overlay p {
      font-size: 0.875rem;
      margin: 0;
      opacity: 0.95;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      line-height: 1.4;
    }

    .carousel-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(255, 255, 255, 0.95);
      color: var(--color-primary-500);
      border: none;
      border-radius: 50%;
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 10;
    }

    .prev-btn {
      left: 1rem;
    }

    .next-btn {
      right: 1rem;
    }

    .carousel-btn:hover:not(:disabled) {
      background: var(--color-primary-500);
      color: white;
      transform: translateY(-50%) scale(1.1);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    }

    .carousel-btn:active:not(:disabled) {
      transform: translateY(-50%) scale(0.95);
    }

    .carousel-btn:disabled {
      background: rgba(200, 200, 200, 0.5);
      color: rgba(100, 100, 100, 0.5);
      cursor: not-allowed;
      opacity: 0.5;
    }

    .carousel-indicators {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      margin-top: 1.5rem;
    }

    .indicator {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--color-secondary-300);
      border: 2px solid transparent;
      cursor: pointer;
      transition: all 0.3s ease;
      padding: 0;
    }

    .indicator:hover:not(.active) {
      background: var(--color-primary-300);
      transform: scale(1.2);
    }

    .indicator.active {
      background: var(--color-primary-500);
      transform: scale(1.4);
      box-shadow: 0 0 0 4px rgba(15, 136, 209, 0.2);
    }

    .carousel-loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 4rem 2rem;
      color: var(--color-secondary-600);
    }

    .loading-spinner {
      width: 48px;
      height: 48px;
      border: 4px solid var(--color-secondary-200);
      border-top: 4px solid var(--color-primary-500);
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
      background: rgba(220, 53, 69, 0.1);
      border-radius: 0.5rem;
      border: 1px solid rgba(220, 53, 69, 0.2);
    }

    /* Responsive */
    @media (max-width: 768px) {
      .photo-card {
        height: 250px;
      }

      .carousel-btn {
        width: 40px;
        height: 40px;
      }

      .prev-btn {
        left: 0.5rem;
      }

      .next-btn {
        right: 0.5rem;
      }

      .photo-overlay h3 {
        font-size: 1rem;
      }

      .photo-overlay p {
        font-size: 0.8125rem;
      }
    }

    @media (max-width: 480px) {
      .photo-card {
        height: 220px;
      }

      .carousel-btn {
        width: 36px;
        height: 36px;
      }

      .carousel-btn svg {
        width: 20px;
        height: 20px;
      }

      .photo-overlay {
        padding: 1.5rem 1rem 1rem;
      }

      .photo-overlay h3 {
        font-size: 0.9375rem;
      }

      .photo-overlay p {
        font-size: 0.75rem;
        -webkit-line-clamp: 1;
      }

      .carousel-indicators {
        gap: 0.5rem;
        margin-top: 1rem;
      }

      .indicator {
        width: 8px;
        height: 8px;
      }
    }
  `]
})
export class CarouselComponent implements OnInit, OnDestroy {
  @Input() photos: LocalPhoto[] = [];
  @Input() visibleCount = 3;
  @Input() autoPlay = true;
  @Input() autoPlayInterval = 5000;

  currentPage = 0;
  totalPages = 0;
  pages: number[] = [];
  error = false;
  errorMessage = 'Impossibile caricare le foto. Riprova più tardi.';
  slideWidth = '33.333%';
  gap = 16;

  private autoPlayTimer?: number;
  private responsiveVisibleCount = 3;

  ngOnInit() {
    this.updateResponsiveSettings();
    this.calculatePages();

    if (this.autoPlay && this.photos.length > this.responsiveVisibleCount) {
      this.startAutoPlay();
    }
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.resetAutoPlay();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.resetAutoPlay();
    }
  }

  goToPage(pageIndex: number) {
    this.currentPage = pageIndex;
    this.resetAutoPlay();
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

  trackByPhotoId(index: number, photo: LocalPhoto): string {
    return photo.id;
  }

  @HostListener('window:resize')
  onResize() {
    this.updateResponsiveSettings();
    this.calculatePages();

    // Assicurati che currentPage sia valido dopo il resize
    if (this.currentPage >= this.totalPages) {
      this.currentPage = Math.max(0, this.totalPages - 1);
    }
  }

  private updateResponsiveSettings() {
    const width = window.innerWidth;

    if (width <= 480) {
      this.responsiveVisibleCount = 1;
      this.gap = 0;
    } else if (width <= 768) {
      this.responsiveVisibleCount = 2;
      this.gap = 8;
    } else {
      this.responsiveVisibleCount = Math.min(this.visibleCount, 3);
      this.gap = 16;
    }

    // Calcola la larghezza della slide considerando gap E padding (0.5rem = 8px su ogni lato = 16px totali)
    const paddingPerSlide = 16; // 8px left + 8px right
    const gapTotal = this.gap * (this.responsiveVisibleCount - 1);
    const totalSpacing = gapTotal + (paddingPerSlide * this.responsiveVisibleCount);
    const slideWidthPercent = 100 / this.responsiveVisibleCount;
    this.slideWidth = `calc(${slideWidthPercent}% - ${totalSpacing / this.responsiveVisibleCount}px)`;
  }

  private calculatePages() {
    if (this.photos.length === 0) {
      this.totalPages = 0;
      this.pages = [];
      return;
    }

    this.totalPages = Math.ceil(this.photos.length / this.responsiveVisibleCount);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i);
  }

  private startAutoPlay() {
    this.stopAutoPlay();
    this.autoPlayTimer = window.setInterval(() => {
      if (this.currentPage < this.totalPages - 1) {
        this.currentPage++;
      } else {
        this.currentPage = 0;
      }
    }, this.autoPlayInterval);
  }

  private stopAutoPlay() {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = undefined;
    }
  }

  private resetAutoPlay() {
    if (this.autoPlay && this.photos.length > this.responsiveVisibleCount) {
      this.startAutoPlay();
    }
  }
}
