import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileCardComponent } from '../../shared/components/profile-card/profile-card.component';

interface Person {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [CommonModule, ProfileCardComponent],
  template: `
    <section class="container mx-auto py-12">
      <h1 class="text-3xl font-bold mb-6">Risorse</h1>
      <p class="text-secondary-600 mb-8">Scopri il nostro team e profili tecnici (personaggi fittizi a scopo demo).</p>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ng-container *ngFor="let p of people">
          <app-profile-card [name]="p.name" [role]="p.role" [bio]="p.bio" [image]="p.image"></app-profile-card>
        </ng-container>
      </div>
    </section>
  `,
  styles: [``]
})
export class ResourcesComponent {
  people: Person[] = [
    { id: 'r1', name: 'Luca Romano', role: 'Ingegnere di processo', bio: 'Specialista in automazione e ottimizzazione di linee produttive.', image: 'https://i.pravatar.cc/150?img=12' },
    { id: 'r2', name: 'Giulia Ferri', role: 'Data Scientist', bio: 'Lavora su modelli predittivi e analisi dati per manutenzione.', image: 'https://i.pravatar.cc/150?img=32' },
    { id: 'r3', name: 'Marco Bianchi', role: 'Specialista IIoT', bio: 'Esperto in integrazione di sensori e protocolli industriali.', image: 'https://i.pravatar.cc/150?img=48' },
    { id: 'r4', name: 'Sara Conti', role: 'Project Manager', bio: 'Coordina progetti e interfaccia tra team tecnico e clienti.', image: 'https://i.pravatar.cc/150?img=5' },
    { id: 'r5', name: 'Davide Russo', role: 'Software Architect', bio: 'Progetta architetture scalabili per applicazioni industriali.', image: 'https://i.pravatar.cc/150?img=18' },
    { id: 'r6', name: 'Elena Moretti', role: 'UX Designer', bio: 'Si occupa di dashboard e visualizzazioni per operatori.', image: 'https://i.pravatar.cc/150?img=24' }
  ];
}
