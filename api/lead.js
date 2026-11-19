const BREVO_URL = 'https://api.brevo.com/v3/smtp/email';
const LEAD_TO = process.env.LEAD_TO || 'hello@nebulyx.live';
const LEAD_FROM = process.env.LEAD_FROM || 'hello@nebulyx.live';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS = { name: 100, email: 200, service: 120, stage: 40, preferredTime: 40, message: 3000, _form: 60 };

const FIELDS = [
  ['Name', 'name'],
  ['Email', 'email'],
  ['Service', 'service'],
  ['Stage', 'stage'],
  ['Best time', 'preferredTime'],
  ['Message', 'message'],
];

function clean(value, max) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
}

function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  try {
    return JSON.parse(req.body || '{}');
  } catch {
    return {};
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const body = readBody(req);
  if (clean(body.website, 200)) return res.status(200).json({ ok: true });

  const lead = Object.fromEntries(Object.entries(LIMITS).map(([key, max]) => [key, clean(body[key], max)]));
  if (!lead.name || !EMAIL_PATTERN.test(lead.email)) {
    return res.status(400).json({ error: 'Please add your name and a valid email address.' });
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: `Our form is offline right now. Please email us at ${LEAD_TO}.` });
  }

  const rows = FIELDS.filter(([, key]) => lead[key]);
  const html = `<h2>${escapeHtml(lead._form || 'New enquiry')}</h2><table cellpadding="6">${rows
    .map(([label, key]) => `<tr><td><strong>${label}</strong></td><td>${escapeHtml(lead[key]).replace(/\n/g, '<br>')}</td></tr>`)
    .join('')}</table>`;
  const text = rows.map(([label, key]) => `${label}: ${lead[key]}`).join('\n');

  let response;
  try {
    response = await fetch(BREVO_URL, {
      method: 'POST',
      headers: { 'api-key': apiKey, 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        sender: { name: 'Nebulyx website', email: LEAD_FROM },
        to: [{ email: LEAD_TO, name: 'Nebulyx' }],
        replyTo: { email: lead.email, name: lead.name },
        subject: `New enquiry: ${lead.service || 'General'} from ${lead.name}`,
        htmlContent: html,
        textContent: text,
      }),
    });
  } catch {
    return res.status(502).json({ error: `We couldn't send your request. Please email us at ${LEAD_TO}.` });
  }

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    console.error(`Brevo send failed: ${response.status} ${detail.slice(0, 300)}`);
    return res.status(502).json({ error: `We couldn't send your request. Please email us at ${LEAD_TO}.` });
  }
  return res.status(200).json({ ok: true });
}
