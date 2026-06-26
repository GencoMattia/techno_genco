import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Secondary button — outlined style (`.btn .btns`) from the redesign handoff.
 */
@Component({
  selector: 'app-secondary-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button [type]="type" class="btn btns" [class.btn-sm]="size === 'sm'" [class.btn-block]="block" [attr.aria-label]="ariaLabel">
      <ng-content></ng-content>
      <span *ngIf="arrow" class="arr">→</span>
    </button>
  `,
  styles: [':host { display: inline-flex; }', ':host(.full) { display: flex; width: 100%; }']
})
export class SecondaryButtonComponent {
  @Input() ariaLabel = 'Secondary action';
  @Input() size: 'sm' | 'md' = 'md';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() arrow = false;
  @Input() block = false;
}
