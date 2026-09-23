// Cloudflare Pages Function: POST /api/contact
// Sends contact form submissions to contact@rugsancco.com via Resend.
// Requires environment variable RESEND_API_KEY (set in Cloudflare Pages → Settings → Environment variables).

import { Resend } from 'resend';

interface Env {
  RESEND_API_KEY: string;
}

interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  service?: string;
  subject?: string;
  message?: string;
}

const TO_EMAIL = 'contact@rugsancco.com';
const FROM_EMAIL = 'Rugsan Construction Company <contact@rugsancco.com>';
const SUBJECT = 'New Website Contact Submission';

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildHtml(p: ContactPayload): string {
  const row = (label: string, value?: string) =>
    value
      ? `<tr><td style="padding:6px 12px;font-weight:600;color:#111;vertical-align:top;">${label}</td><td style="padding:6px 12px;color:#333;white-space:pre-wrap;">${escapeHtml(value)}</td></tr>`
      : '';
  return `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;">
      <h2 style="color:#111;">${SUBJECT}</h2>
      <table style="border-collapse:collapse;width:100%;border:1px solid #eee;">
        ${row('Name', p.name)}
        ${row('Email', p.email)}
        ${row('Phone', p.phone)}
        ${row('Project location', p.location)}
        ${row('Service', p.service)}
        ${row('Subject', p.subject)}
        ${row('Message', p.message)}
      </table>
    </div>
  `;
}

export const onRequestOptions: PagesFunction = async () =>
  new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    if (!env.RESEND_API_KEY) {
      return json({ error: 'Email service not configured' }, 500);
    }

    const body = (await request.json()) as ContactPayload;
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return json({ error: 'Name, email, and message are required' }, 400);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return json({ error: 'Invalid email' }, 400);
    }

    const resend = new Resend(env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: email,
      subject: SUBJECT,
      html: buildHtml(body),
    });

    if (error) {
      console.error('Resend error', error);
      return json({ error: 'Failed to send email', details: error }, 502);
    }

    return json({ success: true, id: data?.id });
  } catch (err) {
    console.error('contact function error', err);
    return json({ error: 'Unexpected server error' }, 500);
  }
};
