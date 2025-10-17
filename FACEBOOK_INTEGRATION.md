# Galleria Foto Locale

Il sistema di galleria è stato convertito per utilizzare foto locali dalla cartella `assets/photos/` invece dell'integrazione Facebook.

## Come Aggiungere Foto

1. **Posiziona le tue foto** nella cartella `src/assets/photos/`
2. **Rinomina i file** seguendo il pattern: `foto_1.jpg`, `foto_2.jpg`, `foto_3.jpg`, ecc.
3. **Formati supportati**: JPG, PNG, WebP
4. **Il sistema carica automaticamente** fino a 20 foto

## Esempio di Struttura File

```
src/assets/photos/
├── foto_1.jpg
├── foto_2.jpg
├── foto_3.jpg
├── foto_4.jpg
└── foto_5.jpg
```

## Personalizzazione Titoli e Descrizioni

I titoli e le descrizioni delle foto sono definiti nel file `data.service.ts`. Puoi modificarli nei metodi:

- `getPhotoTitle(index: number)`: per i titoli
- `getPhotoDescription(index: number)`: per le descrizioni

## Caratteristiche del Carousel

- **Animazioni fluide**: transizioni con easing cubic-bezier
- **Auto-play**: rotazione automatica ogni 4 secondi
- **Controlli manuali**: pulsanti prev/next e indicatori
- **Responsive**: adattamento automatico per mobile/tablet/desktop
- **Selezione random**: le foto vengono mescolate casualmente ad ogni caricamento
- **Gestione errori**: fallback graceful se un'immagine non carica

## Configurazione

Il carousel può essere configurato con queste proprietà:

```html
<app-carousel
  [photos]="localPhotos"
  [visibleCount]="3"          <!-- Numero di foto visibili -->
  [autoPlay]="true"          <!-- Attiva/disattiva autoplay -->
  [autoPlayInterval]="4000"  <!-- Intervallo autoplay in ms -->
></app-carousel>
```

## Sicurezza

- ✅ **Frontend-only**: nessuna esposizione di API keys
- ✅ **File locali**: caricamento diretto dalla cartella assets
- ✅ **Nessuna dipendenza esterna**: completamente self-contained

## Note Tecniche

- **Framework**: Angular 19 con standalone components
- **Styling**: SCSS con CSS variables e animazioni avanzate
- **Performance**: lazy loading delle immagini
- **Responsive**: supporto completo per tutti i breakpoint</content>
<parameter name="filePath">c:\Users\genco\Progetti_Personali\techno_genco\FACEBOOK_GALLERY_README.md
