import { Component, Input, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryButtonComponent } from '../buttons/primary-button/primary-button.component';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule, PrimaryButtonComponent],
  template: `
    <article class="group grid grid-cols-1 md:grid-cols-12 gap-6 items-center hover:shadow-lg transition-shadow duration-200 py-4 md:py-6" role="article" [attr.aria-label]="title">
      <div [class]="(reverse ? 'md:order-2' : 'md:order-1') + ' md:col-span-6'">
        <img [src]="image" [alt]="alt || title" class="w-full h-64 md:h-72 object-cover rounded-lg transform transition-transform duration-300 group-hover:scale-105" />
      </div>
      <div [class]="(reverse ? 'md:order-1' : 'md:order-2') + ' md:col-span-6'">
        <div class="max-w-xl px-2 md:px-6">
          <h2 class="text-2xl font-semibold">{{ title }}</h2>
          <p *ngIf="subtitle" class="text-sm text-secondary-600 mt-2">{{ subtitle }}</p>
          <p class="mt-4 text-secondary-700 leading-relaxed">{{ description }}</p>
          <div class="mt-6">
            <app-primary-button [ariaLabel]="'Scopri di più di ' + title" variant="outline" size="md">Scopri di più</app-primary-button>
          </div>
        </div>
      </div>
    </article>
  `,
  styles: [``]
})
export class ProductItemComponent {
  // keep public inputs but sync into signals for template-friendly reactive reads
  private _title: WritableSignal<string> = signal('');
  @Input() set title(v: string) { this._title.set(v || ''); }
  get title() { return this._title(); }

  private _subtitle: WritableSignal<string | undefined> = signal(undefined as any);
  @Input() set subtitle(v: string | undefined) { this._subtitle.set(v); }
  get subtitle() { return this._subtitle(); }

  private _description: WritableSignal<string> = signal('');
  @Input() set description(v: string) { this._description.set(v || ''); }
  get description() { return this._description(); }

  private _image: WritableSignal<string> = signal('');
  @Input() set image(v: string) { this._image.set(v || ''); }
  get image() { return this._image(); }

  private _alt: WritableSignal<string | undefined> = signal(undefined as any);
  @Input() set alt(v: string | undefined) { this._alt.set(v); }
  get alt() { return this._alt(); }

  private _reverse: WritableSignal<boolean> = signal(false);
  @Input() set reverse(v: boolean) { this._reverse.set(!!v); }
  get reverse() { return this._reverse(); }
}
