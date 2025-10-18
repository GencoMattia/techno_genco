import { Component, signal, computed, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from '../../shared/components/product-item/product-item.component';

interface Product {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductItemComponent],
  template: `
    <section class="container mx-auto py-12">
      <h1 class="text-3xl font-bold mb-8">Prodotti</h1>

      <div class="space-y-12">
        <ng-container *ngFor="let entry of entriesForTemplate(); trackBy: trackByEntry">
          <app-product-item [title]="entry.item.title" [subtitle]="entry.item.subtitle" [description]="entry.item.description" [image]="entry.item.image" [alt]="entry.item.title" [reverse]="entry.idx % 2 === 1"></app-product-item>
        </ng-container>
      </div>
    </section>
  `,
  styles: [``]
})
export class ProductsComponent {
  // migrate products to Signals for template-friendly control-flow
  private productsSignal = signal<Product[]>([
    {
      id: 'p1',
      title: 'Macchina Industriale X1',
      subtitle: 'Alta efficienza per produzione continua',
      description: 'La X1 è progettata per operazioni pesanti con consumi ottimizzati e manutenzione semplificata. Ideale per linee produttive moderne.',
      image: 'https://picsum.photos/seed/p1/800/600'
    },
    {
      id: 'p2',
      title: 'Sistema di Controllo G2',
      subtitle: 'Automazione e monitoraggio in tempo reale',
      description: 'G2 integra sensori intelligenti e dashboard intuitive per il controllo centralizzato degli impianti.',
      image: 'https://picsum.photos/seed/p2/800/600'
    },
    {
      id: 'p3',
      title: 'Unità Modulare A3',
      subtitle: 'Flessibilità e scalabilità',
      description: 'A3 è una soluzione modulare che permette upgrade progressivi minimizzando i downtime.',
      image: 'https://picsum.photos/seed/p3/800/600'
    }
  ]);

  // expose for template
  productsForTemplate: Signal<Product[]> = computed(() => this.productsSignal());
  productIndices: Signal<number[]> = computed(() => this.productsSignal().map((_, i) => i));
  // entries with stable track id for template iteration
  entriesForTemplate = computed(() => this.productsSignal().map((item, i) => ({ item, idx: i, trackId: item.id })));

  trackByEntry(index: number, entry: { item: Product; idx: number; trackId: string }) {
    return entry.trackId;
  }

  imageColClass(i: number) {
    // alternate image left/right on md+ screens
    return i % 2 === 0 ? 'order-1 md:order-1' : 'order-1 md:order-2';
  }

  textColClass(i: number) {
    return i % 2 === 0 ? 'order-2 md:order-2' : 'order-2 md:order-1';
  }
}
