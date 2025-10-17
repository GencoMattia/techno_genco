import { Component } from '@angular/core';
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
        <ng-container *ngFor="let p of products; let i = index">
          <app-product-item [title]="p.title" [subtitle]="p.subtitle" [description]="p.description" [image]="p.image" [alt]="p.title" [reverse]="i % 2 === 1"></app-product-item>
        </ng-container>
      </div>
    </section>
  `,
  styles: [``]
})
export class ProductsComponent {
  products: Product[] = [
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
  ];

  imageColClass(i: number) {
    // alternate image left/right on md+ screens
    return i % 2 === 0 ? 'order-1 md:order-1' : 'order-1 md:order-2';
  }

  textColClass(i: number) {
    return i % 2 === 0 ? 'order-2 md:order-2' : 'order-2 md:order-1';
  }
}
