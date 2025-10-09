import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card" [ngClass]="elevationClass">
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
    .card {
      background: var(--color-surface);
      border-radius: 0.5rem;
      padding: 1.5rem;
      border: 1px solid color-mix(in srgb, var(--color-secondary-100) 40%, transparent);
      transition: box-shadow 0.2s ease;
    }
    .card.elevation-1 { box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24); }
    .card.elevation-2 { box-shadow: 0 3px 6px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12); }
    .card.elevation-3 { box-shadow: 0 10px 20px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.10); }
    .card:hover { box-shadow: 0 5px 15px rgba(0,0,0,0.2); }
    `
  ]
})
export class CardComponent {
  @Input() elevation: '1' | '2' | '3' = '1';

  get elevationClass() {
    return `elevation-${this.elevation}`;
  }
}
