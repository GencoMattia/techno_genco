import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Primary button with simple variant support.
 * Uses Tailwind utility classes for styling so it matches the rest of the site.
 */
@Component({
  selector: 'app-primary-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button [type]="type" [ngClass]="buttonClass" [attr.aria-label]="ariaLabel">
      <ng-content></ng-content>
    </button>
  `
})
export class PrimaryButtonComponent {
  @Input() ariaLabel = 'Primary action';
  // variants: primary (filled), outline (border), ghost (text)
  @Input() variant: 'primary' | 'outline' | 'ghost' = 'primary';
  @Input() size: 'sm' | 'md' = 'md';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  get buttonClass() {
    const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition';
    const sizeClass = this.size === 'sm' ? 'px-3 py-1.5 text-sm' : 'px-4 py-2 text-sm';

    if (this.variant === 'outline') {
      return `${base} ${sizeClass} bg-transparent border border-primary-500 text-primary-500 hover:bg-primary-50 focus:ring-primary-400`;
    }

    if (this.variant === 'ghost') {
      return `${base} ${sizeClass} bg-transparent text-primary-500 hover:bg-primary-50 focus:ring-primary-400`;
    }

    // default primary
    return `${base} ${sizeClass} bg-primary-500 text-on-primary hover:bg-primary-600 focus:ring-primary-400`;
  }
}

