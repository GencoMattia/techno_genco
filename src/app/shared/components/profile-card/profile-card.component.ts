import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../ui/card/card.component';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: `
    <app-card class="h-full">
      <div class="flex flex-col items-center text-center p-4">
        <img [src]="image" [alt]="name" class="w-28 h-28 object-cover rounded-full shadow-md" />
        <h3 class="mt-4 text-lg font-semibold">{{ name }}</h3>
        <p class="text-sm text-secondary-600">{{ role }}</p>
        <p class="mt-3 text-sm text-secondary-700">{{ bio }}</p>
      </div>
    </app-card>
  `,
  styles: [``]
})
export class ProfileCardComponent {
  @Input() name = '';
  @Input() role = '';
  @Input() bio = '';
  @Input() image = '';
}
