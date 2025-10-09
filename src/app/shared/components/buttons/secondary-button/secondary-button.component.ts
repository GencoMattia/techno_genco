import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-secondary-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="secondary-btn" [attr.aria-label]="ariaLabel">
      <ng-content></ng-content>
    </button>
  `,
  styles: [
    `
    .secondary-btn {
      background: transparent;
      color: var(--color-primary);
      padding: 0.45rem 0.9rem;
      border-radius: 0.375rem;
      border: 1px solid color-mix(in srgb, var(--color-primary) 20%, black);
      font-weight: 600;
      cursor: pointer;
      transition: background .12s ease, transform .08s ease;
    }
    .secondary-btn:hover { background: color-mix(in srgb, var(--color-primary) 8%, transparent); transform: translateY(-1px); }
    .secondary-btn:focus { outline: 3px solid color-mix(in srgb, var(--color-primary) 20%, white); outline-offset: 2px; }
    `
  ]
})
export class SecondaryButtonComponent {
  @Input() ariaLabel = 'Secondary action';
}

