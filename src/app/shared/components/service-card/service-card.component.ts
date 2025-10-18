import { Component, Input, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="w-full h-full p-6 bg-surface rounded-lg border border-secondary-100/40 shadow-sm transition-transform transform hover:-translate-y-1 hover:scale-[1.01] duration-200">
      <div class="flex items-start gap-4">
        <div class="flex items-center justify-center w-12 h-12 text-white rounded-md bg-primary-600 shrink-0">
          <span class="material-icons">{{ icon }}</span>
        </div>
        <div>
          <h4 class="text-lg font-semibold text-on-surface">{{ title }}</h4>
          <p class="mt-1 text-sm text-secondary-600">{{ description }}</p>
        </div>
      </div>
    </article>
  `,
  styles: [``]
})
export class ServiceCardComponent {
  private _title: WritableSignal<string> = signal('');
  @Input() set title(v: string) { this._title.set(v || ''); }
  get title() { return this._title(); }

  private _description: WritableSignal<string> = signal('');
  @Input() set description(v: string) { this._description.set(v || ''); }
  get description() { return this._description(); }

  private _icon: WritableSignal<string> = signal('build');
  @Input() set icon(v: string) { this._icon.set(v || 'build'); }
  get icon() { return this._icon(); }
}
