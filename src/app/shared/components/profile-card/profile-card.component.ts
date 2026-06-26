import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../ui/card/card.component';

/**
 * Team profile card (Risorse). Initials avatar (no photo), name, mono role,
 * bio and a mono footer line, on the dark `.card` surface.
 */
@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: `
    <app-card padding="30px">
      <div class="fx ac gap16" style="margin-bottom:22px">
        <span class="avatar">{{ initials }}</span>
        <div>
          <h3 class="h3" style="font-size:19px;margin-bottom:4px">{{ name }}</h3>
          <div class="mono blue" style="font-size:12px;letter-spacing:.05em">{{ role }}</div>
        </div>
      </div>
      <p class="tx2" style="font-size:14.5px;line-height:1.62">{{ bio }}</p>
      <div class="bt" style="margin-top:22px;padding-top:16px">
        <span class="mono tx3" style="font-size:11px;letter-spacing:.12em">TECNOGENCO · TEAM</span>
      </div>
    </app-card>
  `,
  styles: [':host { display: block; height: 100%; }']
})
export class ProfileCardComponent {
  @Input() name = '';
  @Input() role = '';
  @Input() bio = '';
  @Input() initials = '';
}
