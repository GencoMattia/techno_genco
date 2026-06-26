import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CardComponent } from '../../shared/components/ui/card/card.component';
import { ProductItemComponent } from '../../shared/components/product-item/product-item.component';
import { PrimaryButtonComponent } from '../../shared/components/buttons/primary-button/primary-button.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { DataService, SolutionCard, SolutionRow } from '../../core/services/data.service';

@Component({
  selector: 'app-solutions',
  standalone: true,
  imports: [CommonModule, CardComponent, ProductItemComponent, PrimaryButtonComponent, RevealDirective],
  template: `
    <div class="page">
      <!-- Hero -->
      <section class="sec-sm posrel ohide" style="padding-top:88px">
        <div class="gridbg" style="opacity:.55"></div>
        <div class="cont posrel" style="z-index:2">
          <div class="kick" style="margin-bottom:18px">// Soluzioni end-to-end</div>
          <h1 class="h1" style="font-size:clamp(40px,5.4vw,66px)">Soluzioni</h1>
          <p class="lead" style="margin-top:22px;max-width:600px">Dall'automazione di linea al monitoraggio remoto: progettiamo, integriamo e manteniamo i tuoi processi.</p>
        </div>
      </section>

      <!-- CORE cards -->
      <section class="cont" style="padding-bottom:40px">
        <div class="g2">
          <app-card *ngFor="let s of cards; let i = index" padding="34px" appReveal [ngClass]="d(i)">
            <div class="fx ac jb" style="margin-bottom:26px">
              <span class="mono blue" style="font-size:13px;letter-spacing:.08em">{{ s.code }}</span>
              <span class="mono tx3" style="font-size:11px">CORE</span>
            </div>
            <h3 class="h3" style="font-size:24px;margin-bottom:12px">{{ s.title }}</h3>
            <p class="tx2" style="font-size:15px;line-height:1.62">{{ s.description }}</p>
          </app-card>
        </div>
      </section>

      <!-- Specialist service rows -->
      <section class="cont" style="padding:60px 0 104px">
        <div class="fx ac gap12" appReveal style="margin-bottom:54px">
          <span class="kick">// Servizi specialistici</span>
          <span class="f1 bt" style="height:1px"></span>
        </div>
        <div style="display:flex;flex-direction:column;gap:84px">
          <app-product-item
            *ngFor="let p of rows; let i = index"
            [code]="p.code"
            kicker="// Soluzione"
            [title]="p.title"
            [description]="p.description"
            [specs]="p.specs"
            [image]="p.image"
            [imageCode]="p.code"
            [reverse]="i % 2 === 1"
            imageHeight="360px"
            tagFont="14px"
            titleSize="clamp(26px,2.8vw,36px)"
            ctaLabel="Scopri di più"
            ctaVariant="secondary"
            (cta)="goContact()"></app-product-item>
        </div>
      </section>

      <!-- CTA -->
      <section class="cont" style="padding-bottom:100px">
        <div class="cta" appReveal style="padding:52px 46px">
          <div class="gridbg" style="opacity:.5"></div>
          <div class="posrel fx ac jb" style="z-index:2;flex-wrap:wrap;gap:26px">
            <div style="max-width:520px">
              <h2 class="h2" style="font-size:clamp(24px,2.6vw,34px);margin-bottom:10px">Pronto a ottimizzare i tuoi processi?</h2>
              <p class="tx2" style="font-size:15px">Analizziamo insieme il tuo impianto e individuiamo i margini di miglioramento.</p>
            </div>
            <app-primary-button [arrow]="true" ariaLabel="Richiedi un'analisi" (click)="goContact()">Richiedi un'analisi</app-primary-button>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [':host { display: block; }']
})
export class SolutionsComponent {
  cards: SolutionCard[];
  rows: SolutionRow[];

  constructor(private router: Router, data: DataService) {
    this.cards = data.getSolutionCards();
    this.rows = data.getSolutionRows();
  }

  d(i: number): string {
    return 'd' + ((i % 4) + 1);
  }

  goContact(): void {
    this.router.navigate(['/contact']);
  }
}
