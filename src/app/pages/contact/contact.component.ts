import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { PrimaryButtonComponent } from '../../shared/components/buttons/primary-button/primary-button.component';
import { SecondaryButtonComponent } from '../../shared/components/buttons/secondary-button/secondary-button.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PrimaryButtonComponent, SecondaryButtonComponent, HttpClientModule, MatSnackBarModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  form: any;
  submitting = false;
  to = 'info@tecnogenco.it';
  // If you want to enable Google reCAPTCHA v3 set your site key here (or load from env)
  // Leave empty to disable reCAPTCHA integration
  siteKey = '';

  // Simple toast queue for feedback UX
  // removed manual toast queue — replaced by MatSnackBar

  constructor(private fb: FormBuilder, private http: HttpClient, private snack: MatSnackBar) {
    // initialize form with validators after FormBuilder is available
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      hp: ['']
    });
  }

  ngOnInit(): void {
    if (this.siteKey) {
      this.loadReCaptcha();
    }
  }

  private loadReCaptcha() {
    if ((window as any).grecaptcha) return;
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${this.siteKey}`;
    script.async = true;
    document.head.appendChild(script);
  }

  get email() { return this.form.get('email'); }
  get message() { return this.form.get('message'); }

  onSubmit() {
    // honeypot anti-spam: field 'hp' should be empty
    const honeypot = (this.form.get('hp')?.value) || '';
    if (honeypot) {
      this.snack.open('Spam rilevato: invio bloccato.', 'Chiudi', { duration: 5000 });
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.snack.open('Compila correttamente il form prima di inviare.', 'Chiudi', { duration: 5000 });
      return;
    }

    this.submitting = true;
    const userEmail = this.email?.value || '';
    const messageText = this.message?.value || '';

    const sendMail = (token?: string) => {
      // call serverless function to send email
      const url = '/.netlify/functions/send-email';
      const bodyPayload: any = { email: userEmail, message: messageText };
      if (token) bodyPayload.token = token;

      this.http.post(url, bodyPayload, { responseType: 'text' }).subscribe({
        next: (res) => {
          this.snack.open('Email inviata con successo.', 'Chiudi', { duration: 4000 });
          this.submitting = false;
        },
        error: (err) => {
          console.error('send-email error', err);
          this.snack.open('Errore invio email. Riprova più tardi.', 'Chiudi', { duration: 6000 });
          this.submitting = false;
        }
      });
    };

    if (this.siteKey && (window as any).grecaptcha) {
      // Try to get token (reCAPTCHA v3). Note: server-side validation still recommended.
      try {
        (window as any).grecaptcha.ready(() => {
          (window as any).grecaptcha.execute(this.siteKey, { action: 'contact' }).then((token: string) => {
            // pass token to serverless function for verification
            sendMail(token);
          }).catch((err: any) => {
            console.warn('reCAPTCHA execute failed', err);
            this.snack.open('reCAPTCHA non disponibile. Riprova più tardi.', 'Chiudi', { duration: 5000 });
            this.submitting = false;
          });
        });
      } catch (err) {
        console.warn('reCAPTCHA error', err);
        this.snack.open('reCAPTCHA non disponibile. Riprova più tardi.', 'Chiudi', { duration: 5000 });
        this.submitting = false;
      }
    } else {
      sendMail();
    }
  }

  // MatSnackBar is used for feedback now
}
