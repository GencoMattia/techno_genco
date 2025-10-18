import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalPhoto } from '../../../../core/services/data.service';

@Component({
  selector: 'app-lightbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.scss']
})
export class LightboxComponent {
  @Input() images: LocalPhoto[] = [];
  @Input() startIndex = 0;
  @Output() close = new EventEmitter<void>();

  currentIndex = 0;
  isOpen = false;

  // zoom state
  scale = 1;
  translateX = 0;
  translateY = 0;

  // pointers
  private pointers = new Map<number, { x: number; y: number; time: number }>();
  private initialPinchDistance = 0;
  private initialScale = 1;
  // max/min zoom
  private readonly minScale = 1;
  private readonly maxScale = 4;

  // High-res preload
  private highResImg?: HTMLImageElement;

  ngOnInit() {
    this.open(this.startIndex);
  }

  open(idx = 0) {
    this.currentIndex = idx;
    this.isOpen = true;
    this.scale = 1;
    this.translateX = 0;
    this.translateY = 0;
    // lock scroll
    document.body.style.overflow = 'hidden';

    // Preload high-res if available
    this.preloadHighRes();
  }

  getCurrentHighResSrc(): string | undefined {
    const p = this.images[this.currentIndex];
    return (p as any).full || (p as any).fullsize || (p as any).highRes || (p as any).srcset || p?.source;
  }

  private preloadHighRes() {
    const src = this.getCurrentHighResSrc();
    if (!src) return;
    if (this.highResImg) {
      this.highResImg.src = '';
      this.highResImg = undefined;
    }
    const img = new Image();
    img.src = src;
    this.highResImg = img;
  }

  closeLightbox() {
    this.isOpen = false;
    this.close.emit();
    document.body.style.overflow = '';
  }

  next() {
    if (this.images.length === 0) return;
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.resetTransform();
  }

  previous() {
    if (this.images.length === 0) return;
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.resetTransform();
  }

  private resetTransform() {
    this.scale = 1;
    this.translateX = 0;
    this.translateY = 0;
  }

  @HostListener('window:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (!this.isOpen) return;
    if (event.key === 'Escape') this.closeLightbox();
    if (event.key === 'ArrowRight') this.next();
    if (event.key === 'ArrowLeft') this.previous();
  }

  onBackdropClick(e: MouseEvent) {
    // close only if backdrop (not when clicking image)
    if ((e.target as HTMLElement).classList.contains('lightbox-backdrop')) {
      this.closeLightbox();
    }
  }

  // pointer handling for pan/zoom
  onPointerDown(evt: PointerEvent) {
    try { (evt.target as Element).setPointerCapture(evt.pointerId); } catch {}
    this.pointers.set(evt.pointerId, { x: evt.clientX, y: evt.clientY, time: performance.now() });
    if (this.pointers.size === 2) {
      const pts = Array.from(this.pointers.values());
      this.initialPinchDistance = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      this.initialScale = this.scale;
    }
  }

  onPointerMove(evt: PointerEvent) {
    if (!this.pointers.has(evt.pointerId)) return;
    this.pointers.set(evt.pointerId, { x: evt.clientX, y: evt.clientY, time: performance.now() });

    if (this.pointers.size === 1) {
      // pan
      if (this.scale <= 1) return; // no panning when not zoomed
      const p = this.pointers.get(evt.pointerId)!;
      const dx = evt.clientX - p.x;
      const dy = evt.clientY - p.y;
      // apply deltas
      this.translateX += dx;
      this.translateY += dy;
      // update stored point to avoid jump
      this.pointers.set(evt.pointerId, { x: evt.clientX, y: evt.clientY, time: performance.now() });
    } else if (this.pointers.size === 2) {
      const pts = Array.from(this.pointers.values());
      const d = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      if (this.initialPinchDistance > 0) {
        const ratio = d / this.initialPinchDistance;
        this.scale = Math.max(this.minScale, Math.min(this.maxScale, this.initialScale * ratio));
      }
    }
  }

  onPointerUp(evt: PointerEvent) {
    try { (evt.target as Element).releasePointerCapture(evt.pointerId); } catch {}
    this.pointers.delete(evt.pointerId);
    // clamp translate when scale <=1
    if (this.scale <= 1) this.resetTransform();
  }

  onPointerCancel(evt: PointerEvent) {
    try { (evt.target as Element).releasePointerCapture(evt.pointerId); } catch {}
    this.pointers.clear();
    if (this.scale <= 1) this.resetTransform();
  }

  // double click fallback for non-touch
  onImageDblClick() {
    this.scale = this.scale > 1 ? 1 : 2;
    if (this.scale === 1) this.resetTransform();
  }
}
