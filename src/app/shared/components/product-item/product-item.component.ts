import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryButtonComponent } from '../buttons/primary-button/primary-button.component';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule, PrimaryButtonComponent],
  template: `
    <article class="group grid grid-cols-1 md:grid-cols-12 gap-6 items-center hover:shadow-lg transition-shadow duration-200" role="article" [attr.aria-label]="title">
      <div [class]="(reverse ? 'md:order-2' : 'md:order-1') + ' md:col-span-6'">
        <img [src]="image" [alt]="alt || title" class="w-full h-64 md:h-72 object-cover rounded-lg transform transition-transform duration-300 group-hover:scale-105" />
      </div>
      <div [class]="(reverse ? 'md:order-1' : 'md:order-2') + ' md:col-span-6'">
        <div class="max-w-xl">
          <h2 class="text-2xl font-semibold">{{ title }}</h2>
          <p *ngIf="subtitle" class="text-sm text-secondary-600 mt-2">{{ subtitle }}</p>
          <p class="mt-4 text-secondary-700">{{ description }}</p>
          <div class="mt-6">
            <app-primary-button [ariaLabel]="'Scopri di più di ' + title">Scopri di più</app-primary-button>
          </div>
        </div>
      </div>
    </article>
  `,
  styles: [``]
})
export class ProductItemComponent {
  @Input() title = '';
  @Input() subtitle?: string;
  @Input() description = '';
  @Input() image = '';
  @Input() alt?: string;
  @Input() reverse = false; // when true, image is on the right for md+
}
