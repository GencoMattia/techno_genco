import { Component, Input, OnInit, OnDestroy, HostListener, AfterViewInit, OnChanges, SimpleChanges, signal, computed, WritableSignal, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightboxComponent } from '../lightbox/lightbox.component';
import { LocalPhoto } from '../../../../core/services/data.service';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, LightboxComponent],
  templateUrl: './carousel.component.html'
})
export class CarouselComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  // use Signals for reactive state
  private photosSignal: WritableSignal<LocalPhoto[]> = signal<LocalPhoto[]>([]);
  // expose count for template use
  get photosCount(): number { return this.photosSignal().length; }
  @Input()
  set photos(value: LocalPhoto[] | undefined) {
    this.photosSignal.set(value || []);
    this.createDuplicatedPhotos();
    this.updateIndicators();
  }
  get photos(): LocalPhoto[] { return this.photosSignal(); }
  @Input() visibleCount = 3;
  @Input() autoPlay = true;
  @Input() autoPlayInterval = 7000;

  error = false;
  errorMessage = 'Impossibile caricare le foto. Riprova più tardi.';
  gap = 16;

  private autoPlayTimer?: number;

  // New properties for single card scroll (Signals)
  currentIndex: WritableSignal<number> = signal(0);
  cardWidth: WritableSignal<number> = signal(0);
  cardHeight: WritableSignal<number> = signal(0);
  padCount: WritableSignal<number> = signal(0);
  duplicatedPhotos: WritableSignal<LocalPhoto[]> = signal([]);
  isTransitioning: WritableSignal<boolean> = signal(false);
  // Control whether the transform uses CSS transition
  animate: WritableSignal<boolean> = signal(true);
  transitionDurationMs: WritableSignal<number> = signal(500);
  indicatorArray: Signal<number[]> = computed(() => Array.from({ length: this.photosSignal().length }, (_, i) => i));
  currentIndicator: Signal<number> = computed(() => {
    const photos = this.photosSignal();
    if (photos.length === 0) return 0;
    const idx = this.currentIndex() - this.padCount();
    return ((idx % photos.length) + photos.length) % photos.length;
  });
  // Drag/swipe state
  isDragging = false; // local flag (not a signal since transient)
  dragStartX = 0;
  dragOffset = 0; // px (transient)
  private dragThreshold = 0; // calculated once cardWidth known
  // pointer state to detect start vs candidate
  private pointerDown = false;
  private pointerMoveThreshold = 6; // px before starting actual drag
  // For velocity-based (inertia) swipe
  private dragStartTime = 0;
  private lastMoveX = 0;
  private lastMoveTime = 0;
  private velocityThreshold = 0.5; // px per ms (500 px/s)

  // Lightbox state
  lightboxOpen = false;
  lightboxStartIndex = 0;
  // ensure imported standalone component is considered used by static analysis
  private _ensureLightboxUsed: any = LightboxComponent;
  // click-vs-drag detection for opening lightbox
  private clickTimer?: number;
  private clickStartX = 0;
  private clickStartY = 0;
  private readonly clickThresholdMs = 200; // max duration to consider a click
  private readonly clickMoveThreshold = 8; // px max movement to consider a click
  private candidateImageIndex: number | null = null;

  openLightbox(idx: number) {
    this.lightboxStartIndex = idx - this.padCount();
    this.lightboxOpen = true;
  }

  onLightboxClose() {
    this.lightboxOpen = false;
  }

  onImagePointerDown(evt: PointerEvent, di: number) {
    // record start for click detection
    this.clickStartX = evt.clientX;
    this.clickStartY = evt.clientY;
    // start timer
    this.clickTimer = window.setTimeout(() => {
      // timeout expired -> not a quick click
      if (this.clickTimer) {
        clearTimeout(this.clickTimer);
        this.clickTimer = undefined;
      }
    }, this.clickThresholdMs);
    // mark candidate image index (use duplicated index)
    this.candidateImageIndex = di;
  }

  onImagePointerUp(evt: PointerEvent, di: number) {
    // If pointerup happens on the image, we still rely on the central onPointerUp which has pointer capture
    // so here just clear timer and candidate to avoid duplicate actions.
    if (this.clickTimer) { clearTimeout(this.clickTimer); this.clickTimer = undefined; }
    // do not open here; opening happens in onPointerUp for reliability
  }

  private normalizeIndex(idx: number): number {
    const n = this.photosSignal().length;
    if (n === 0) return idx;
    const rel = ((idx - this.padCount()) % n + n) % n;
    return rel + this.padCount();
  }

  private animateToIndex(targetIndex: number) {
    if (this.isTransitioning()) return;
    this.isTransitioning.set(true);
    // set target
    this.currentIndex.set(targetIndex);
    this.resetAutoPlay();

    // After the transition, normalize index to the real range without animation
    setTimeout(() => {
      const min = this.padCount();
      const max = this.photosSignal().length + this.padCount() - 1;
      if (this.currentIndex() < min || this.currentIndex() > max) {
        this.animate.set(false);
        this.currentIndex.set(this.normalizeIndex(this.currentIndex()));
        // re-enable animation next frame
        requestAnimationFrame(() => {
          void (document.querySelector('.carousel-track-container') as HTMLElement)?.offsetHeight;
          this.animate.set(true);
        });
      }
      this.isTransitioning.set(false);
    }, this.transitionDurationMs() + 20);
  }

  ngOnInit() {
    // createDuplicatedPhotos will be called from photos setter
    if (this.photosSignal().length) {
      this.createDuplicatedPhotos();
      // indicators are computed
    }

    if (this.autoPlay && this.photosSignal().length > 3) {
      this.startAutoPlay();
    }
  }

  ngAfterViewInit() {
    // Ensure card width is calculated after the view is rendered
    requestAnimationFrame(() => this.updateCardWidth());
  }

  ngOnChanges(changes: SimpleChanges) {
    // photos handled via setter; keep for other input changes if necessary
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
    if (this.isTransitioning()) return;
    this.isTransitioning.set(true);
    this.currentIndex.update(v => v + 1);
    this.resetAutoPlay();

    setTimeout(() => {
      if (this.currentIndex() >= this.photosSignal().length + this.padCount()) {
        this.animate.set(false);
        this.currentIndex.set(this.padCount());
        requestAnimationFrame(() => {
          void (document.querySelector('.carousel-track-container') as HTMLElement)?.offsetHeight;
          this.animate.set(true);
        });
      }
      this.isTransitioning.set(false);
    }, 500);
  }

  previousSlide() {
    if (this.isTransitioning()) return;
    this.isTransitioning.set(true);
    this.currentIndex.update(v => v - 1);
    this.resetAutoPlay();

    setTimeout(() => {
      if (this.currentIndex() < 0) {
        this.animate.set(false);
        this.currentIndex.set(this.photosSignal().length + this.padCount() - 1);
        requestAnimationFrame(() => {
          void (document.querySelector('.carousel-track-container') as HTMLElement)?.offsetHeight;
          this.animate.set(true);
        });
      }
      this.isTransitioning.set(false);
    }, 500);
  }

  goToIndicator(idx: number) {
    if (this.isTransitioning()) return;
    this.isTransitioning.set(true);
    this.currentIndex.set(this.padCount() + idx);
    this.resetAutoPlay();

    setTimeout(() => {
      this.isTransitioning.set(false);
    }, 500);
  }

  private createDuplicatedPhotos() {
    if (this.photosSignal().length === 0) {
      this.duplicatedPhotos.set([]);
      return;
    }

    const pad = Math.min(this.visibleCount, 3);
    // Duplicate photos for infinite loop: last pad + all + first pad
    const dup = [
      ...this.photosSignal().slice(-pad),
      ...this.photosSignal(),
      ...this.photosSignal().slice(0, pad)
    ];
    this.duplicatedPhotos.set(dup);
    this.padCount.set(pad);
    this.currentIndex.set(this.padCount()); // Start after the duplicates
  }

  private updateCardWidth() {
    if (this.photosSignal().length === 0) return;
    const container = document.querySelector('.carousel-track-container') as HTMLElement;
    if (!container) return;

    const containerWidth = container.offsetWidth;
    // Calculate available width (container may have padding/margins outside)
    const availableWidth = containerWidth;
    const totalGap = this.gap * (this.visibleCount - 1);
    const cw = Math.floor((availableWidth - totalGap) / this.visibleCount);
    this.cardWidth.set(cw);
    // Card height based on ratio or fixed height (use 3:2 ratio)
    this.cardHeight.set(Math.floor(cw * 0.66));
    // Set drag threshold to a fraction of card width (e.g., 25%)
    this.dragThreshold = Math.max(20, Math.floor(cw * 0.25));
  }

  // Pointer / touch handlers
  onPointerDown(event: PointerEvent) {
    if (this.isTransitioning()) return;
    // mark pointer down but don't start dragging until movement exceeds threshold
    this.pointerDown = true;
    this.isDragging = false;
    this.dragStartX = event.clientX;
    this.dragOffset = 0;
    try { (event.currentTarget as Element).setPointerCapture(event.pointerId); } catch {}
    this.dragStartTime = performance.now();
    this.lastMoveX = event.clientX;
    this.lastMoveTime = this.dragStartTime;
  }

  onPointerMove(event: PointerEvent) {
    if (!this.pointerDown) return;
    const dx = event.clientX - this.dragStartX;
    // if not yet dragging, check threshold to start
    if (!this.isDragging) {
      if (Math.abs(dx) > this.pointerMoveThreshold) {
        this.isDragging = true;
        this.animate.set(false);
      } else {
        return;
      }
    }

    this.dragOffset = dx;
    // track velocity
    this.lastMoveX = event.clientX;
    this.lastMoveTime = performance.now();
  }

  onPointerUp(event: PointerEvent) {
    if (!this.pointerDown) return;

    // If dragging wasn't started, treat as a click candidate.
    if (!this.isDragging) {
      // compute movement
      const dxClick = Math.abs(event.clientX - this.clickStartX);
      const dyClick = Math.abs(event.clientY - this.clickStartY);
      const moved = Math.sqrt(dxClick * dxClick + dyClick * dyClick);
      if (moved <= this.clickMoveThreshold && this.candidateImageIndex !== null) {
        // open lightbox for the candidate image
        this.openLightbox(this.candidateImageIndex);
      }
      this.pointerDown = false;
      this.candidateImageIndex = null;
      if (this.clickTimer) { clearTimeout(this.clickTimer); this.clickTimer = undefined; }
      return;
    }

  this.isDragging = false;
  this.pointerDown = false;
  this.animate.set(true);
    const dx = event.clientX - this.dragStartX;
    // compute velocity (px per ms)
    const now = performance.now();
    const dt = Math.max(1, now - this.lastMoveTime);
    const dxVel = (event.clientX - this.lastMoveX) / dt; // px per ms

    try { (event.currentTarget as Element).releasePointerCapture(event.pointerId); } catch {}

  // Determine how many cards the user has dragged across (positive = right)
  const pxPerCard = this.cardWidth() + this.gap;
    // Negative dragOffset means left swipe -> advance
    const totalPx = this.dragOffset;
    // target displacement in number of cards (float)
    const cardsDragged = -totalPx / pxPerCard;
    // Base target index (allow fractions)
  let targetIndexFloat = this.currentIndex() + cardsDragged;

    // Consider velocity (fling) to push one extra card in fling direction
    if (dxVel < -this.velocityThreshold) {
      // fast left fling -> advance one more
      targetIndexFloat -= 0.6;
    } else if (dxVel > this.velocityThreshold) {
      // fast right fling -> go back one more
      targetIndexFloat += 0.6;
    }

    // Round to nearest integer index to snap to the nearest card after release
  const targetIndex = Math.round(targetIndexFloat);

    // Set transition duration inversely proportional to velocity, capped
  const absVel = Math.min(3, Math.abs(dxVel)); // px/ms cap
  const baseMs = 300;
  this.transitionDurationMs.set(Math.max(160, Math.round(baseMs / (0.5 + absVel))));

  this.animateToIndex(targetIndex);

    this.dragOffset = 0;
  }

  onPointerCancel(event: PointerEvent) {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.animate.set(true);
    this.dragOffset = 0;
  }

  // indicators are computed via Signals (indicatorArray, currentIndicator)
  private updateIndicators() {
    // no-op: kept for compatibility; indicatorArray/currentIndicator are computed
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
    if (this.autoPlay && this.photosSignal().length > 3) {
      this.startAutoPlay();
    }
  }
}
