import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../ui/card/card.component';

/**
 * Service card (Home "Cosa facciamo" grid). Mono numbered tag (01–04),
 * title and description on the dark `.card` surface. Hover lift + tag glow
 * come from the global `.card` / `.card:hover .tag` styles.
 */
@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: `
    <app-card>
      <div class="fx ac jb" style="margin-bottom:24px">
        <span class="tag">{{ code }}</span>
        <span class="mono tx3" style="font-size:11px">{{ badge }}</span>
      </div>
      <h3 class="h3" style="margin-bottom:12px">{{ title }}</h3>
      <p class="tx2" style="font-size:14.5px;line-height:1.6">{{ description }}</p>
    </app-card>
  `,
  styles: [':host { display: block; height: 100%; }']
})
export class ServiceCardComponent {
  @Input() code = '01';
  @Input() title = '';
  @Input() description = '';
  @Input() badge = 'SRV';
}
