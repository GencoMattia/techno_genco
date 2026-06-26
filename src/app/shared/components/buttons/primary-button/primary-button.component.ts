import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Primary button — filled blue CTA (`.btn .btnp`) from the redesign handoff.
 * Navigation/handlers are wired by the parent via (click) on the host
 * (DOM click bubbles from the inner <button>).
 */
@Component({
  selector: 'app-primary-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button [type]="type" class="btn btnp" [class.btn-sm]="size === 'sm'" [class.btn-block]="block" [attr.aria-label]="ariaLabel">
      <ng-content></ng-content>
      <span *ngIf="arrow" class="arr">→</span>
    </button>
  `,
  styles: [':host { display: inline-flex; }', ':host(.full) { display: flex; width: 100%; }']
})
export class PrimaryButtonComponent {
  @Input() ariaLabel = 'Primary action';
  /** Kept for backward compatibility; the redesign uses a single filled style. */
  @Input() variant: 'primary' | 'outline' | 'ghost' = 'primary';
  @Input() size: 'sm' | 'md' = 'md';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  /** Append the animated `→` arrow used across the design. */
  @Input() arrow = false;
  @Input() block = false;
}
