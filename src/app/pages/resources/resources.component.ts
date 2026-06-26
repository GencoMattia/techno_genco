import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProfileCardComponent } from '../../shared/components/profile-card/profile-card.component';
import { PrimaryButtonComponent } from '../../shared/components/buttons/primary-button/primary-button.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { DataService, TeamMember } from '../../core/services/data.service';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [CommonModule, ProfileCardComponent, PrimaryButtonComponent, RevealDirective],
  template: `
    <div class="page">
      <!-- Hero -->
      <section class="sec-sm posrel ohide" style="padding-top:88px">
        <div class="gridbg" style="opacity:.55"></div>
        <div class="cont posrel" style="z-index:2">
          <div class="kick" style="margin-bottom:18px">// Il team · 06 profili</div>
          <h1 class="h1" style="font-size:clamp(40px,5.4vw,66px)">Risorse</h1>
          <p class="lead" style="margin-top:22px;max-width:600px">Le persone dietro i progetti. Competenze tecniche e verticali, al servizio della tua produzione.</p>
        </div>
      </section>

      <!-- Team grid -->
      <section class="cont" style="padding-bottom:104px">
        <div class="g3">
          <app-profile-card
            *ngFor="let m of team; let i = index"
            appReveal [ngClass]="d(i)"
            [name]="m.name" [role]="m.role" [bio]="m.bio" [initials]="m.initials"></app-profile-card>
        </div>
      </section>

      <!-- CTA -->
      <section class="cont" style="padding-bottom:100px">
        <div class="cta" appReveal style="padding:52px 46px">
          <div class="gridbg" style="opacity:.5"></div>
          <div class="posrel fx ac jb" style="z-index:2;flex-wrap:wrap;gap:26px">
            <div style="max-width:520px">
              <h2 class="h2" style="font-size:clamp(24px,2.6vw,34px);margin-bottom:10px">Vuoi lavorare con noi?</h2>
              <p class="tx2" style="font-size:15px">Siamo sempre alla ricerca di talenti nell'automazione industriale.</p>
            </div>
            <app-primary-button [arrow]="true" ariaLabel="Scrivici" (click)="goContact()">Scrivici</app-primary-button>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [':host { display: block; }']
})
export class ResourcesComponent {
  team: TeamMember[];

  constructor(private router: Router, data: DataService) {
    this.team = data.getTeam();
  }

  d(i: number): string {
    return 'd' + ((i % 4) + 1);
  }

  goContact(): void {
    this.router.navigate(['/contact']);
  }
}
