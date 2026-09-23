import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/resend';
const TO_EMAIL = 'contact@rugsancco.com';
const FROM_EMAIL = 'Rugsan Construction Company <contact@rugsancco.com>';

interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  service?: string;
  subject?: string;
  message?: string;
}

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
      <h2 style="color:#111;">New Website Contact Submission</h2>
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

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!LOVABLE_API_KEY || !RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: 'Email service not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const body = (await req.json()) as ContactPayload;
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Name, email, and message are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const subjectLine = 'New Website Contact Submission';

    const resp = await fetch(`${GATEWAY_URL}/emails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        'X-Connection-Api-Key': RESEND_API_KEY,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject: subjectLine,
        html: buildHtml(body),
      }),
    });

    const data = await resp.json();
    if (!resp.ok) {
      console.error('Resend error', resp.status, data);
      return new Response(
        JSON.stringify({ error: 'Failed to send email', details: data }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    return new Response(JSON.stringify({ success: true, id: data?.id }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('send-contact-email error', err);
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
