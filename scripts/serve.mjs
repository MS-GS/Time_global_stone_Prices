import http from 'node:http';
import { readFile, realpath, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = await realpath(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'));
const port = Number(process.argv[2] ?? process.env.PORT ?? 4173);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Port must be an integer from 1 to 65535.');
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
  '.webp': 'image/webp', '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2'
};

function reply(response, code, text) {
  response.writeHead(code, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' });
  response.end(text);
}

const server = http.createServer(async (request, response) => {
  if (!['GET', 'HEAD'].includes(request.method)) {
    response.setHeader('Allow', 'GET, HEAD');
    return reply(response, 405, 'Method not allowed');
  }
  try {
    let pathname;
    try {
      pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    } catch {
      return reply(response, 400, 'Invalid path');
    }
    if (pathname === '/') pathname = '/index.html';
    const segments = pathname.split('/').filter(Boolean);
    if (pathname.includes('\\') || pathname.includes('\0') || segments.some(segment => segment.startsWith('.'))) {
      return reply(response, 403, 'Forbidden');
    }
    // Only public files are served; scripts, research notes and repository metadata stay private.
    if (segments.length > 1 && segments[0] !== 'assets') return reply(response, 404, 'Not found');
    const extension = path.extname(pathname).toLowerCase();
    if (!types[extension]) return reply(response, 404, 'Not found');
    const candidate = path.resolve(root, `.${pathname}`);
    if (!candidate.startsWith(`${root}${path.sep}`)) return reply(response, 403, 'Forbidden');
    const resolved = await realpath(candidate);
    if (!resolved.startsWith(`${root}${path.sep}`)) return reply(response, 403, 'Forbidden');
    if (!(await stat(resolved)).isFile()) return reply(response, 404, 'Not found');
    const content = await readFile(resolved);
    response.writeHead(200, {
      'Content-Type': types[extension], 'Content-Length': content.length,
      'Cache-Control': 'no-cache', 'X-Content-Type-Options': 'nosniff'
    });
    response.end(request.method === 'HEAD' ? undefined : content);
  } catch (error) {
    reply(response, ['ENOENT', 'ENOTDIR'].includes(error.code) ? 404 : 500, 'Not found');
  }
});
server.on('error', error => {
  console.error(`Preview server: ${error.message}`);
  process.exitCode = 1;
});
server.listen(port, '127.0.0.1', () => console.log(`TIME GLOBAL preview: http://127.0.0.1:${port}`));
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close());
