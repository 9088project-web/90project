const base = String(process.argv[2] || 'https://www.90project.online').replace(/\/+$/, '');
const paths = ['/', '/catering', '/member', '/orders', '/admin', '/api/admin-content', '/api/system-health'];
let failed = false;

for (const path of paths) {
  try {
    const response = await fetch(`${base}${path}`, { redirect: 'follow' });
    const body = await response.text();
    const valid = response.ok && body.length > 20;
    process.stdout.write(`${valid ? 'OK' : 'FAIL'} ${response.status} ${path}\n`);
    failed ||= !valid;
  } catch (error) {
    process.stdout.write(`FAIL 0 ${path} ${error instanceof Error ? error.message : ''}\n`);
    failed = true;
  }
}

if (failed) process.exitCode = 1;
