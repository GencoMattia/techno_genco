import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrimaryButtonComponent } from '../../shared/components/buttons/primary-button/primary-button.component';
import { SecondaryButtonComponent } from '../../shared/components/buttons/secondary-button/secondary-button.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, PrimaryButtonComponent, SecondaryButtonComponent, RevealDirective],
  template: `
    <div class="page">
      <!-- Hero -->
      <section class="sec-sm posrel ohide" style="padding-top:88px">
        <div class="gridbg" style="opacity:.55"></div>
        <div class="cont posrel" style="z-index:2">
          <div class="kick" style="margin-bottom:18px">// Contatti</div>
          <h1 class="h1" style="font-size:clamp(40px,5.4vw,66px)">Parliamone</h1>
          <p class="lead" style="margin-top:22px;max-width:600px">Hai un progetto o serve supporto? Scrivici: ti rispondiamo entro 24 ore lavorative.</p>
        </div>
      </section>

      <section class="cont" style="padding-bottom:110px">
        <div class="contactGrid" style="display:grid;grid-template-columns:1.3fr .9fr;gap:36px;align-items:start">

          <!-- Form card -->
          <div class="card" appReveal style="padding:36px">
            <ng-container *ngIf="sent; else formTpl">
              <div style="padding:26px 0;text-align:center">
                <div class="mono blue" style="font-size:13px;letter-spacing:.1em;margin-bottom:16px">// MESSAGGIO INVIATO</div>
                <h3 class="h3" style="font-size:23px;margin-bottom:12px">Grazie, ti ricontattiamo a breve.</h3>
                <p class="tx2" style="margin-bottom:26px">Abbiamo ricevuto la tua richiesta. Un membro del team ti risponderà al più presto.</p>
                <app-secondary-button ariaLabel="Invia un altro messaggio" (click)="reset()">Invia un altro messaggio</app-secondary-button>
              </div>
            </ng-container>

            <ng-template #formTpl>
              <form (ngSubmit)="submit()" novalidate>
                <div style="margin-bottom:22px">
                  <label class="flabel" for="cf-email">La tua email</label>
                  <input id="cf-email" class="field" type="email" name="email" [(ngModel)]="email" placeholder="tuo.nome@esempio.it" autocomplete="email" />
                </div>
                <div>
                  <label class="flabel" for="cf-msg">Messaggio</label>
                  <textarea id="cf-msg" class="field" name="message" rows="6" [(ngModel)]="message" placeholder="Raccontaci del tuo progetto..." style="resize:vertical;min-height:150px"></textarea>
                </div>
                <div *ngIf="err" class="mono" style="color:#ff8f8f;font-size:12px;margin-top:12px">{{ err }}</div>
                <div class="fx ac gap12" style="margin-top:24px">
                  <app-primary-button type="submit" [arrow]="true" ariaLabel="Invia messaggio">Invia messaggio</app-primary-button>
                  <app-secondary-button type="button" ariaLabel="Reset" (click)="reset()">Reset</app-secondary-button>
                </div>
              </form>
            </ng-template>
          </div>

          <!-- Direct contacts panel -->
          <div appReveal class="d2">
            <div class="panel" style="padding:30px">
              <span class="tick tk1"></span><span class="tick tk2"></span><span class="tick tk3"></span><span class="tick tk4"></span>
              <div class="panel-hd">
                <span>CONTATTI · DIRETTI</span>
                <span class="live"><span class="dotlive"></span>ONLINE</span>
              </div>
              <a class="footlink" href="mailto:info&#64;tecnogenco.it" style="text-decoration:none;display:block;padding:16px 0;border-top:1px solid var(--line)">
                <div class="mono tx3" style="font-size:10px;letter-spacing:.14em;margin-bottom:6px">EMAIL</div>
                <div style="font-size:16px">info&#64;tecnogenco.it</div>
              </a>
              <a class="footlink" href="tel:+391234567890" style="text-decoration:none;display:block;padding:16px 0;border-top:1px solid var(--line)">
                <div class="mono tx3" style="font-size:10px;letter-spacing:.14em;margin-bottom:6px">TELEFONO</div>
                <div style="font-size:16px">+39 123 456 7890</div>
              </a>
              <div style="padding:16px 0;border-top:1px solid var(--line)">
                <div class="mono tx3" style="font-size:10px;letter-spacing:.14em;margin-bottom:6px">SEDE</div>
                <div style="font-size:16px">Via dell'Industria 24, Italia</div>
              </div>
              <div style="padding:16px 0;border-top:1px solid var(--line)">
                <div class="mono tx3" style="font-size:10px;letter-spacing:.14em;margin-bottom:6px">ORARI</div>
                <div style="font-size:16px">Lun–Ven · 08:30–18:00</div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  `,
  styles: [':host { display: block; }']
})
export class ContactComponent {
  email = '';
  message = '';
  sent = false;
  err = '';

  submit(): void {
    const email = (this.email || '').trim();
    const msg = (this.message || '').trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.err = 'Inserisci un’email valida.';
      return;
    }
    if (msg.length < 10) {
      this.err = 'Il messaggio deve contenere almeno 10 caratteri.';
      return;
    }
    this.err = '';
    // Client-side confirmation (works on static GitHub Pages hosting).
    // To deliver mail in production, wire this to the existing serverless
    // function (see README_DEPLOY.md / FACEBOOK_INTEGRATION.md) or a mailto:.
    this.sent = true;
  }

  reset(): void {
    this.email = '';
    this.message = '';
    this.sent = false;
    this.err = '';
  }
}
