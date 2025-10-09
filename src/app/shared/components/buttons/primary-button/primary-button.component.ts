import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-primary-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="primary-btn" [attr.aria-label]="ariaLabel">
      <ng-content></ng-content>
    </button>
  `,
  styles: [
    `
    .primary-btn {
      background: var(--color-primary-500);
      color: var(--color-on-primary);
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      border: none;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      transition: transform .08s ease, box-shadow .12s ease, background .12s ease;
    }
    .primary-btn:focus {
      outline: 3px solid color-mix(in srgb, var(--color-primary-400) 30%, white);
      outline-offset: 2px;
    }
    .primary-btn:hover { transform: translateY(-1px); background: var(--color-primary-600); }
    `
  ]
})
export class PrimaryButtonComponent {
  @Input() ariaLabel = 'Primary action';
}

