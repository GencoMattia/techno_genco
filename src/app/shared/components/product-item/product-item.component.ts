import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryButtonComponent } from '../buttons/primary-button/primary-button.component';
import { SecondaryButtonComponent } from '../buttons/secondary-button/secondary-button.component';
import { RevealDirective } from '../../directives/reveal.directive';

/**
 * Alternating product / solution row from the redesign handoff.
 * Left: real photo (`.shot`) with mono code + label overlays.
 * Right: code tag, kicker, title, optional mono subtitle, lead, diamond
 * spec list and a CTA. Odd rows flip with `reverse`.
 */
@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule, PrimaryButtonComponent, SecondaryButtonComponent, RevealDirective],
  template: `
    <div class="prow" [class.rev]="reverse" appReveal [attr.aria-label]="title" role="article">
      <div class="pcol-img shot" [style.height]="imageHeight">
        <img [src]="image" [alt]="alt || title" loading="lazy" />
        <span class="ph-x mono">{{ imageCode || code }}</span>
        <span class="ph-lab">{{ label || title }}</span>
      </div>
      <div>
        <div class="fx ac gap12" style="margin-bottom:18px">
          <span class="tag" [style.width]="tagSize" [style.height]="tagSize" [style.font-size]="tagFont">{{ code }}</span>
          <span class="kick">{{ kicker }}</span>
        </div>
        <h2 class="h2" [style.font-size]="titleSize" style="margin-bottom:12px">{{ title }}</h2>
        <div *ngIf="subtitle" class="blue mono" style="font-size:13px;letter-spacing:.04em;margin-bottom:18px">{{ subtitle }}</div>
        <p class="lead" style="margin-bottom:26px">{{ description }}</p>
        <div style="margin-bottom:30px">
          <div class="spec" *ngFor="let sp of specs"><span class="mk"></span>{{ sp }}</div>
        </div>
        <app-primary-button *ngIf="ctaVariant === 'primary'" [arrow]="true" [ariaLabel]="ctaLabel" (click)="cta.emit()">{{ ctaLabel }}</app-primary-button>
        <app-secondary-button *ngIf="ctaVariant === 'secondary'" [arrow]="true" [ariaLabel]="ctaLabel" (click)="cta.emit()">{{ ctaLabel }}</app-secondary-button>
      </div>
    </div>
  `,
  styles: [':host { display: block; }']
})
export class ProductItemComponent {
  @Input() code = '';
  @Input() kicker = '// Scheda prodotto';
  @Input() title = '';
  @Input() subtitle?: string;
  @Input() description = '';
  @Input() specs: string[] = [];
  @Input() image = '';
  @Input() alt?: string;
  /** Bottom-left mono label over the photo (defaults to the title). */
  @Input() label?: string;
  /** Top-right mono code over the photo (defaults to `code`). */
  @Input() imageCode?: string;
  @Input() reverse = false;
  @Input() imageHeight = '392px';
  @Input() titleSize = 'clamp(28px,3vw,38px)';
  @Input() tagSize = '54px';
  @Input() tagFont = '17px';
  @Input() ctaLabel = 'Richiedi informazioni';
  @Input() ctaVariant: 'primary' | 'secondary' = 'primary';
  @Output() cta = new EventEmitter<void>();
}
