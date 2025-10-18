import { Component, Input, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../ui/card/card.component';
import { PrimaryButtonComponent } from '../buttons/primary-button/primary-button.component';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [CommonModule, CardComponent, PrimaryButtonComponent],
  template: `
    <app-card class="h-full">
      <div class="flex flex-col items-center text-center p-6">
        <img [src]="image" [alt]="name" class="w-28 h-28 object-cover rounded-full shadow-md" />
        <h3 class="mt-4 text-lg font-semibold">{{ name }}</h3>
        <p class="text-sm text-secondary-600">{{ role }}</p>
        <p class="mt-3 text-sm text-secondary-700">{{ bio }}</p>
        <div class="mt-4">
          <app-primary-button variant="ghost" size="sm" ariaLabel="Contatta {{ name }}">Contatta</app-primary-button>
        </div>
      </div>
    </app-card>
  `,
  styles: [``]
})
export class ProfileCardComponent {
  private _name: WritableSignal<string> = signal('');
  @Input() set name(v: string) { this._name.set(v || ''); }
  get name() { return this._name(); }

  private _role: WritableSignal<string> = signal('');
  @Input() set role(v: string) { this._role.set(v || ''); }
  get role() { return this._role(); }

  private _bio: WritableSignal<string> = signal('');
  @Input() set bio(v: string) { this._bio.set(v || ''); }
  get bio() { return this._bio(); }

  private _image: WritableSignal<string> = signal('');
  @Input() set image(v: string) { this._image.set(v || ''); }
  get image() { return this._image(); }
}
