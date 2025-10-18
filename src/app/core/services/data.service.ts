import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface LocalPhoto {
  id: string;
  source: string;
  name?: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

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
