function requestHeader(request, name) {
  const value = request.headers?.[name.toLowerCase()] || request.headers?.[name];
  return Array.isArray(value) ? value[0] : value;
}

function applyCors(request, response) {
  const origin = String(requestHeader(request, 'origin') || '');
  const allowedOrigins = new Set([
    'https://90project.online',
    'https://www.90project.online',
    'http://127.0.0.1:3050',
    'http://localhost:3050'
  ]);
  if (allowedOrigins.has(origin)) {
    response.setHeader('Access-Control-Allow-Origin', origin);
    response.setHeader('Vary', 'Origin');
  }
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

module.exports = function handler(request, response) {
  applyCors(request, response);
  if (request.method === 'OPTIONS') return response.status(204).end();

  response.setHeader('Cache-Control', 'no-store');
  response.status(200).json({
    url: process.env.SUPABASE_URL || '',
    anonKey: process.env.SUPABASE_ANON_KEY || ''
  });
};
