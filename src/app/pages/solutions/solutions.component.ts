import { Component, signal, computed, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceCardComponent } from '../../shared/components/service-card/service-card.component';
import { ProductItemComponent } from '../../shared/components/product-item/product-item.component';

interface Solution {
  id: string;
  title: string;
  description: string;
  icon?: string;
  image?: string;
}

@Component({
  selector: 'app-solutions',
  standalone: true,
  imports: [CommonModule, ServiceCardComponent, ProductItemComponent],
  template: `
    <section class="container mx-auto py-12">
      <h1 class="text-3xl font-bold mb-8">Soluzioni</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <ng-container *ngFor="let entry of entriesHero(); trackBy: trackByEntry">
          <app-service-card [title]="entry.item.title" [description]="entry.item.description" [icon]="entry.item.icon || 'settings'"></app-service-card>
        </ng-container>
      </div>

      <div class="space-y-12">
        <ng-container *ngFor="let entry of entriesForTemplate(); trackBy: trackByEntry">
          <app-product-item [title]="entry.item.title" [subtitle]="''" [description]="entry.item.description" [image]="entry.item.image || 'https://picsum.photos/seed/default/800/600'" [alt]="entry.item.title" [reverse]="entry.idx % 2 === 1"></app-product-item>
        </ng-container>
      </div>
    </section>
  `,
  styles: [``]
})
export class SolutionsComponent {
  private heroSolutionsSignal = signal<Solution[]>([
    { id: 's1', title: 'Automazione di Linea', description: 'Riduci i tempi di fermo e migliora la qualità con soluzioni end-to-end.', icon: 'settings' },
    { id: 's2', title: 'Monitoraggio Remoto', description: 'Dashboard in tempo reale e notifiche proattive per interventi rapidi.', icon: 'monitor_heart' }
  ]);

  private solutionsSignal = signal<Solution[]>([
    { id: 's3', title: 'Ottimizzazione Energetica', description: 'Analisi consumi e ottimizzazione per risparmio sui costi energetici.', image: 'https://picsum.photos/seed/s3/800/600' },
    { id: 's4', title: 'Manutenzione Predittiva', description: 'Algoritmi che prevedono guasti e pianificano interventi prima dei fermi.', image: 'https://picsum.photos/seed/s4/800/600' },
    { id: 's5', title: 'Integrazione IIoT', description: 'Connessione sicura di macchinari e sensori verso la piattaforma cloud.', image: 'https://picsum.photos/seed/s5/800/600' }
  ]);

  entriesHero = computed(() => this.heroSolutionsSignal().map((item: Solution, i: number) => ({ item, idx: i, trackId: item.id })));
  entriesForTemplate = computed(() => this.solutionsSignal().map((item: Solution, i: number) => ({ item, idx: i, trackId: item.id })));

  trackByEntry(index: number, entry: { item: Solution; idx: number; trackId: string }) {
    return entry.trackId;
  }
}
