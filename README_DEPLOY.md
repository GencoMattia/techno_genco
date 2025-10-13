# Deploy & Local development (Netlify functions)

Questo file descrive come eseguire in locale e distribuire il progetto con le Netlify Functions incluse (send-email).

Prerequisiti
- Node.js 18+ raccomandato
- npm
- Netlify CLI (opzionale per sviluppo locale delle functions)

1) Installare dipendenze

```powershell
npm install
npm install nodemailer node-fetch@2
```

2) Configurare variabili d'ambiente locali

Copia il file `.env.netlify` e riempi i valori:

```text
RECAPTCHA_SECRET=...
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_pass
SMTP_FROM=webmaster@example.com
SMTP_SECURE=false
TO_EMAIL=info@tecnogenco.it
```

Salva il file come `.env.netlify` nella root del progetto. Questo file è già incluso in `.gitignore`.

3) Avviare Netlify in locale (consigliato)

Installa Netlify CLI (se non lo hai)

```powershell
npm i -g netlify-cli
```

Poi:

```powershell
netlify dev
```

Netlify CLI esporrà il sito e le funzioni e mapperà `/.netlify/functions/send-email` alla function locale.

4) Testare la funzione via curl

```powershell
curl -X POST http://localhost:8888/.netlify/functions/send-email -H "Content-Type: application/json" -d "{\"email\":\"mittente@esempio.it\",\"message\":\"Test invio\",\"token\":\"<recaptcha_token_opzionale>\"}"
```

5) Deploy su Netlify

- Collega il repository a Netlify (Netlify UI) e imposta le variabili d'ambiente (RECAPTCHA_SECRET, SMTP_* ecc.) nelle Site settings > Build & deploy > Environment.
- Esegui il deploy: Netlify build e publish automatizzato al push.

Note di sicurezza
- Non committare mai le chiavi e le password: usa le Environment variables del provider (Netlify) o secret manager.
- Per reCAPTCHA v3 è raccomandata la verifica server-side (la function la esegue se `RECAPTCHA_SECRET` è impostato).

Alternative consigliate
- Uso SendGrid/Mailgun/SES: forniscono API più affidabili per l'invio, gestione bounce e analytics. Posso convertire la function per usare SendGrid se preferisci.

---
Se vuoi, applico direttamente la conversione a SendGrid (mi serve la tua preferenza) o aggiungo un file `netlify/functions/package.json` per isolare le dipendenze delle functions.
