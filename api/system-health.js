const EXPECTED_WHATSAPP = '60189490908';
const CHECK_PATHS = ['/', '/catering', '/member', '/orders', '/admin', '/js/app.js', '/api/admin-content'];

function baseUrl(request) {
  const host = String(request.headers?.['x-forwarded-host'] || request.headers?.host || 'www.90project.online');
  const allowedHosts = new Set(['www.90project.online', '90project.online', '127.0.0.1:3050', '127.0.0.1:3060', 'localhost:3050', 'localhost:3060']);
  const safeHost = allowedHosts.has(host) ? host : 'www.90project.online';
  const protocol = /^(?:localhost|127\.0\.0\.1)/.test(safeHost) ? 'http' : 'https';
  return `${protocol}://${safeHost}`;
}

async function checkPath(base, path) {
  const startedAt = Date.now();
  try {
    const response = await fetch(`${base}${path}${path.includes('?') ? '&' : '?'}health=${Date.now()}`, {
      headers: { 'User-Agent': '90project-health-check/1.0' },
      redirect: 'follow'
    });
    const text = await response.text();
    let detail = '';
    if (!response.ok) detail = `HTTP ${response.status}`;
    if (path === '/' && !text.includes(`wa.me/${EXPECTED_WHATSAPP}`)) detail = 'WhatsApp link mismatch';
    if (path === '/api/admin-content') {
      try {
        const payload = JSON.parse(text);
        if (!payload.ok || !payload.content) detail = 'Cloud content unavailable';
      } catch {
        detail = 'Cloud content response is invalid';
      }
    }
    return { path, ok: !detail, status: response.status, durationMs: Date.now() - startedAt, detail };
  } catch (error) {
    return { path, ok: false, status: 0, durationMs: Date.now() - startedAt, detail: error instanceof Error ? error.message : 'Connection failed' };
  }
}

async function sendEmail(message) {
  const apiKey = String(process.env.RESEND_API_KEY || '');
  const recipient = String(process.env.ADMIN_ALERT_EMAIL || '');
  if (!apiKey || !recipient) return false;
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.ADMIN_ALERT_FROM || '90 PROJECT Monitor <onboarding@resend.dev>',
      to: [recipient],
      subject: '90 PROJECT 网站健康异常',
      text: message
    })
  });
  return response.ok;
}

async function sendWhatsApp(message) {
  const token = String(process.env.WHATSAPP_ACCESS_TOKEN || '');
  const phoneId = String(process.env.WHATSAPP_PHONE_NUMBER_ID || '');
  const recipient = String(process.env.ADMIN_ALERT_WHATSAPP || '').replace(/\D/g, '');
  if (!token || !phoneId || !recipient) return false;
  const response = await fetch(`https://graph.facebook.com/v22.0/${encodeURIComponent(phoneId)}/messages`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ messaging_product: 'whatsapp', to: recipient, type: 'text', text: { body: message, preview_url: false } })
  });
  return response.ok;
}

async function sendWebhook(payload) {
  const url = String(process.env.ADMIN_ALERT_WEBHOOK_URL || '');
  if (!url) return false;
  const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  return response.ok;
}

module.exports = async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');
  if (request.method !== 'GET') return response.status(405).json({ ok: false, message: 'Method not allowed.' });
  const checkedAt = new Date().toISOString();
  const checks = await Promise.all(CHECK_PATHS.map(path => checkPath(baseUrl(request), path)));
  const failures = checks.filter(item => !item.ok);
  const report = { ok: failures.length === 0, checkedAt, checks, failures: failures.length };
  const isCron = /vercel-cron/i.test(String(request.headers?.['user-agent'] || ''))
    || (process.env.CRON_SECRET && request.headers?.authorization === `Bearer ${process.env.CRON_SECRET}`);
  if (failures.length && isCron) {
    const message = `90 PROJECT 网站健康异常 (${checkedAt})\n${failures.map(item => `${item.path}: ${item.detail}`).join('\n')}`;
    const results = await Promise.allSettled([sendEmail(message), sendWhatsApp(message), sendWebhook({ ...report, message })]);
    report.notifications = results.map((item, index) => ({ channel: ['email', 'whatsapp', 'webhook'][index], sent: item.status === 'fulfilled' && item.value === true }));
  }
  return response.status(report.ok ? 200 : 503).json(report);
};
