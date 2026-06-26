import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductItemComponent } from '../../shared/components/product-item/product-item.component';
import { PrimaryButtonComponent } from '../../shared/components/buttons/primary-button/primary-button.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { DataService, ProductItem } from '../../core/services/data.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductItemComponent, PrimaryButtonComponent, RevealDirective],
  template: `
    <div class="page">
      <!-- Hero -->
      <section class="sec-sm posrel ohide" style="padding-top:88px">
        <div class="gridbg" style="opacity:.55"></div>
        <div class="cont posrel" style="z-index:2">
          <div class="kick" style="margin-bottom:18px">// Catalogo · 03 unità</div>
          <h1 class="h1" style="font-size:clamp(40px,5.4vw,66px)">Prodotti</h1>
          <p class="lead" style="margin-top:22px;max-width:600px">Hardware e sistemi di controllo progettati per l'industria moderna. Affidabili, scalabili, monitorabili in ogni fase.</p>
        </div>
      </section>

      <!-- Product rows -->
      <section class="cont" style="padding-bottom:104px">
        <div style="display:flex;flex-direction:column;gap:84px">
          <app-product-item
            *ngFor="let p of products; let i = index"
            [code]="p.code"
            kicker="// Scheda prodotto"
            [title]="p.title"
            [subtitle]="p.subtitle"
            [description]="p.description"
            [specs]="p.specs"
            [image]="p.image"
            [imageCode]="p.code + ' · 4K'"
            [reverse]="i % 2 === 1"
            ctaLabel="Richiedi informazioni"
            ctaVariant="primary"
            (cta)="goContact()"></app-product-item>
        </div>
      </section>

      <!-- CTA -->
      <section class="cont" style="padding-bottom:100px">
        <div class="cta" appReveal style="padding:52px 46px">
          <div class="gridbg" style="opacity:.5"></div>
          <div class="posrel fx ac jb" style="z-index:2;flex-wrap:wrap;gap:26px">
            <div style="max-width:520px">
              <h2 class="h2" style="font-size:clamp(24px,2.6vw,34px);margin-bottom:10px">Non trovi quello che cerchi?</h2>
              <p class="tx2" style="font-size:15px">Progettiamo soluzioni su misura per le tue esigenze produttive.</p>
            </div>
            <app-primary-button [arrow]="true" ariaLabel="Parliamone" (click)="goContact()">Parliamone</app-primary-button>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [':host { display: block; }']
})
export class ProductsComponent {
  products: ProductItem[];

  constructor(private router: Router, data: DataService) {
    this.products = data.getProducts();
  }

  goContact(): void {
    this.router.navigate(['/contact']);
  }
}
