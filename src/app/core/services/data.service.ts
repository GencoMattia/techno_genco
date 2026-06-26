import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface LocalPhoto {
  id: string;
  source: string;
  name?: string;
  description?: string;
}

// ---- Redesign content models (mirrors the design handoff) ----
export interface NavItem { id: string; label: string; path: string; }
export interface ServiceItem { code: string; title: string; text: string; }
export interface StatItem { value: string; label: string; }
export interface FeatureItem { code: string; title: string; text: string; }
export interface GalleryItem { code: string; title: string; image: string; span?: boolean; }
export interface ProductItem {
  code: string; title: string; subtitle: string; description: string;
  specs: string[]; image: string;
}
export interface SolutionCard { code: string; title: string; description: string; }
export interface SolutionRow {
  code: string; title: string; description: string; specs: string[]; image: string;
}
export interface TeamMember { name: string; role: string; bio: string; initials: string; }

@Injectable({
  providedIn: 'root'
})
export class DataService {

  /** Primary navigation (real Angular routes). */
  getNav(): NavItem[] {
    return [
      { id: 'home', label: 'Home', path: '/' },
      { id: 'products', label: 'Prodotti', path: '/products' },
      { id: 'solutions', label: 'Soluzioni', path: '/solutions' },
      { id: 'resources', label: 'Risorse', path: '/resources' },
      { id: 'contact', label: 'Contatti', path: '/contact' }
    ];
  }

  /** Home — "Cosa facciamo" service cards (01–04). */
  getServices(): ServiceItem[] {
    return [
      { code: '01', title: 'Programmazione PLC', text: 'Sviluppo e configurazione di controllori logici programmabili per processi complessi.' },
      { code: '02', title: 'Sistemi SCADA', text: 'Supervisione e controllo per il monitoraggio degli impianti in tempo reale.' },
      { code: '03', title: 'Automazione Industriale', text: 'Progettazione di sistemi per ottimizzare e velocizzare i processi produttivi.' },
      { code: '04', title: 'Manutenzione & Supporto', text: 'Manutenzione preventiva e assistenza tecnica continua per i tuoi impianti.' }
    ];
  }

  /** Home — "Chi siamo" statistics. */
  getStats(): StatItem[] {
    return [
      { value: '500+', label: 'Progetti completati' },
      { value: '15+', label: 'Anni di esperienza' },
      { value: '98%', label: 'Soddisfazione clienti' }
    ];
  }

  /** Home — "Punti di forza" (F.01–F.04). */
  getFeatures(): FeatureItem[] {
    return [
      { code: 'F.01', title: 'Tecnologia Avanzata', text: 'Le tecnologie più moderne per prestazioni ottimali e massima affidabilità.' },
      { code: 'F.02', title: 'Team Esperto', text: 'Professionisti qualificati con anni di esperienza nell’automazione.' },
      { code: 'F.03', title: 'Qualità Garantita', text: 'Controlli rigorosi su ogni progetto per risultati sempre eccellenti.' },
      { code: 'F.04', title: 'Supporto Continuo', text: 'Assistenza e manutenzione per un funzionamento sempre ottimale.' }
    ];
  }

  /** Home — portfolio gallery (asymmetric grid; first cell spans 2×2). */
  getGallery(): GalleryItem[] {
    return [
      { code: 'PRJ_01', title: 'Sistema di Controllo Industriale', image: 'assets/foto_1.jpg', span: true },
      { code: 'PRJ_02', title: 'Automazione di Processo', image: 'assets/foto_2.jpg' },
      { code: 'PRJ_03', title: 'Programmazione PLC Avanzata', image: 'assets/foto_3.jpg' },
      { code: 'PRJ_04', title: 'Installazione SCADA', image: 'assets/foto_4.jpg' },
      { code: 'PRJ_05', title: 'Centro di Comando', image: 'assets/foto_5.jpg' }
    ];
  }

  /** Home — capability marquee chips (looped client-side). */
  getChips(): string[] {
    return [
      'PLC', 'SCADA', 'HMI', 'IIoT', 'Industria 4.0', 'Manutenzione predittiva',
      'Edge Computing', 'Robotica', 'Sensoristica', 'Cloud',
      'Ottimizzazione energetica', 'Cybersecurity OT'
    ];
  }

  /** Image used in the "Chi siamo" block. */
  getAboutImage(): string {
    return 'assets/foto_2.jpg';
  }

  /** Prodotti — alternating product rows. */
  getProducts(): ProductItem[] {
    return [
      {
        code: 'X1', title: 'Macchina Industriale X1', subtitle: 'Alta efficienza per produzione continua',
        description: 'Progettata per operazioni pesanti con consumi ottimizzati e manutenzione semplificata. Ideale per linee produttive moderne ad alto volume.',
        specs: ['Throughput +40%', 'Uptime 99.6%', 'Manutenzione modulare'], image: 'assets/foto_1.jpg'
      },
      {
        code: 'G2', title: 'Sistema di Controllo G2', subtitle: 'Automazione e monitoraggio in tempo reale',
        description: 'Integra sensori intelligenti e dashboard intuitive per il controllo centralizzato degli impianti, con allarmi proattivi e log completi.',
        specs: ['Sensori smart', 'Dashboard live', 'Allarmi proattivi'], image: 'assets/foto_2.jpg'
      },
      {
        code: 'A3', title: 'Unità Modulare A3', subtitle: 'Flessibilità e scalabilità',
        description: 'Soluzione modulare che permette upgrade progressivi minimizzando i downtime e adattandosi alla crescita produttiva.',
        specs: ['Architettura modulare', 'Zero-downtime upgrade', 'Scalabile'], image: 'assets/foto_3.jpg'
      }
    ];
  }

  /** Soluzioni — two "CORE" cards. */
  getSolutionCards(): SolutionCard[] {
    return [
      { code: 'SOL_01', title: 'Automazione di Linea', description: 'Riduci i tempi di fermo e migliora la qualità con soluzioni end-to-end, progettate sul tuo processo.' },
      { code: 'SOL_02', title: 'Monitoraggio Remoto', description: 'Dashboard in tempo reale e notifiche proattive per interventi rapidi, ovunque tu sia.' }
    ];
  }

  /** Soluzioni — specialist service rows. */
  getSolutionRows(): SolutionRow[] {
    return [
      {
        code: 'EN', title: 'Ottimizzazione Energetica',
        description: 'Analisi dei consumi e ottimizzazione mirata per ridurre i costi energetici dell’impianto.',
        specs: ['Audit consumi', 'Report mensili', 'Risparmio misurabile'], image: 'assets/foto_4.jpg'
      },
      {
        code: 'MP', title: 'Manutenzione Predittiva',
        description: 'Algoritmi che prevedono i guasti e pianificano gli interventi prima dei fermi macchina.',
        specs: ['Modelli predittivi', 'Alert anticipati', 'Pianificazione interventi'], image: 'assets/foto_5.jpg'
      },
      {
        code: 'IoT', title: 'Integrazione IIoT',
        description: 'Connessione sicura di macchinari e sensori verso la piattaforma cloud, in tempo reale.',
        specs: ['Edge gateway', 'Cloud sicuro', 'Dati real-time'], image: 'assets/foto_1.jpg'
      }
    ];
  }

  /** Risorse — team profiles (initials avatars, no photos). */
  getTeam(): TeamMember[] {
    return [
      { name: 'Luca Romano', role: 'Ingegnere di Processo', bio: 'Specialista in automazione e ottimizzazione di linee produttive.', initials: 'LR' },
      { name: 'Giulia Ferri', role: 'Data Scientist', bio: 'Modelli predittivi e analisi dati per la manutenzione.', initials: 'GF' },
      { name: 'Marco Bianchi', role: 'Specialista IIoT', bio: 'Esperto in integrazione di sensori e protocolli industriali.', initials: 'MB' },
      { name: 'Sara Conti', role: 'Project Manager', bio: 'Coordina i progetti tra team tecnico e clienti.', initials: 'SC' },
      { name: 'Davide Russo', role: 'Software Architect', bio: 'Progetta architetture scalabili per applicazioni industriali.', initials: 'DR' },
      { name: 'Elena Moretti', role: 'UX Designer', bio: 'Dashboard e visualizzazioni pensate per gli operatori.', initials: 'EM' }
    ];
  }

  constructor() { }

  /**
   * Carica le foto dalla cartella assets
   * Cerca file foto_1.jpg, foto_2.jpg, ecc. fino a quando non trova più file
   */
  getLocalPhotos(): Observable<LocalPhoto[]> {
    const photos: LocalPhoto[] = [];
    let index = 1;
    const maxPhotos = 5; // Limitato alle foto esistenti

    // Genera un array di foto basato su file esistenti
    // In produzione, questo potrebbe essere sostituito con una chiamata API
    while (index <= maxPhotos) {
      const photo: LocalPhoto = {
        id: `foto_${index}`,
        source: `assets/foto_${index}.jpg`, // Path relativo senza slash iniziale
        name: this.getPhotoTitle(index),
        description: this.getPhotoDescription(index)
      };
      photos.push(photo);
      index++;
    }

    // Mischia le foto per varietà
    return of(this.shuffleArray(photos));
  }

  /**
   * Titoli delle foto (puoi personalizzarli)
   */
  private getPhotoTitle(index: number): string {
    const titles = [
      'Sistema di Controllo Industriale',
      'Automazione di Processo',
      'Programmazione PLC Avanzata',
      'Installazione SCADA',
      'Centro di Comando Produzione',
      'Sensori Industriali',
      'Pannello di Controllo HMI',
      'Robotica Industriale',
      'Sistema di Monitoraggio',
      'Manutenzione Preventiva',
      'Ottimizzazione Processi',
      'Integrazione Sistemi',
      'Sicurezza Industriale',
      'Formazione Tecnica',
      'Innovazione Tecnologica',
      'Qualità e Precisione',
      'Efficienza Operativa',
      'Supporto Continuativo',
      'Soluzioni Personalizzate',
      'Eccellenza nel Servizio'
    ];

    return titles[(index - 1) % titles.length] || `Foto ${index}`;
  }

  /**
   * Descrizioni delle foto (opzionali)
   */
  private getPhotoDescription(index: number): string {
    const descriptions = [
      'Implementazione di sistemi di controllo avanzati per l\'industria 4.0',
      'Automazione completa dei processi produttivi con tecnologia all\'avanguardia',
      'Programmazione specializzata di controllori logici programmabili',
      'Installazione e configurazione di sistemi SCADA per monitoraggio in tempo reale',
      'Centro nevralgico per il controllo e la supervisione della produzione',
      'Sensori di ultima generazione per misurazioni precise e affidabili',
      'Interfacce uomo-macchina intuitive e user-friendly',
      'Integrazione di robotica per processi automatizzati',
      'Monitoraggio continuo delle performance e dei parametri critici',
      'Manutenzione preventiva per garantire continuità operativa',
      'Ottimizzazione dei processi per massimizzare l\'efficienza',
      'Integrazione seamless tra diversi sistemi industriali',
      'Sistemi di sicurezza avanzati per la protezione degli operatori',
      'Formazione specialistica per tecnici e operatori',
      'Innovazione tecnologica al servizio dell\'industria',
      'Precisione e qualità nei risultati ottenuti',
      'Efficienza operativa massima attraverso l\'automazione',
      'Supporto tecnico continuativo e assistenza dedicata',
      'Soluzioni su misura per esigenze specifiche del cliente',
      'Eccellenza nel servizio e soddisfazione del cliente'
    ];

    return descriptions[(index - 1) % descriptions.length] || '';
  }

  /**
   * Mischia casualmente l'array
   */
  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}
