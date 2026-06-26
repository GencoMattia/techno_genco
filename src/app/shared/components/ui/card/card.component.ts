import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Surface card — dark `.card` primitive from the redesign handoff.
 * Hover lifts the card and turns the border blue (global styles).
 * `padding` overrides the default 28px where the design uses a different value.
 */
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card" [style.padding]="padding">
      <ng-content></ng-content>
    </div>
  `,
  styles: [':host { display: block; height: 100%; }', '.card { height: 100%; }']
})
export class CardComponent {
  /** Kept for backward compatibility (no longer drives the shadow). */
  @Input() elevation: '1' | '2' | '3' = '1';
  /** Optional padding override, e.g. "34px", "30px", "36px". */
  @Input() padding?: string;
}
