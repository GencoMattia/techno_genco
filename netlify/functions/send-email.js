const nodemailer = require('nodemailer');
const fetch = require('node-fetch');

// Netlify function to verify reCAPTCHA v3 token and send email via SMTP
// Expects environment variables:
// RECAPTCHA_SECRET, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, TO_EMAIL

exports.handler = async function (event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch (err) {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const { email, message, token } = payload;

  if (!email || !message) {
    return { statusCode: 400, body: 'Missing fields' };
  }

  // verify recaptcha if token present and secret available
  const secret = process.env.RECAPTCHA_SECRET;
  if (secret) {
    if (!token) return { statusCode: 400, body: 'Missing reCAPTCHA token' };
    try {
      const params = new URLSearchParams();
      params.append('secret', secret);
      params.append('response', token);
      const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        body: params
      });
      const data = await res.json();
      if (!data.success || (data.score !== undefined && data.score < 0.3)) {
        return { statusCode: 403, body: 'reCAPTCHA verification failed' };
      }
    } catch (err) {
      console.error('reCAPTCHA verify error', err);
      return { statusCode: 500, body: 'reCAPTCHA verification error' };
    }
  }

  // send email using nodemailer
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const to = process.env.TO_EMAIL || 'info@tecnogenco.it';
  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to,
    subject: `Risposta a: ${email}`,
    text: `${message}\n\nContatto: ${email}`
  };

  try {
    await transporter.sendMail(mailOptions);
    return { statusCode: 200, body: 'Email sent' };
  } catch (err) {
    console.error('sendMail error', err);
    return { statusCode: 500, body: 'Failed to send email' };
  }
};
