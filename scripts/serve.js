/**
 * scripts/serve.js — Servidor estático local zero-dependencies para GlucoFit
 * Soporta MIME types estándar para PWA (ES Modules, WebP, Service Worker)
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2'
};

const server = http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];
  let filePath = path.join(rootDir, urlPath === '/' ? 'index.html' : urlPath);

  // Normalizar y prevenir Directory Traversal
  const safePath = path.resolve(filePath);
  if (!safePath.startsWith(rootDir)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Prohibido');
    return;
  }

  fs.stat(safePath, (err, stats) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(`404 No encontrado: ${urlPath}`);
      return;
    }

    let finalFile = safePath;
    if (stats.isDirectory()) {
      finalFile = path.join(safePath, 'index.html');
    }

    fs.readFile(finalFile, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('500 Error interno del servidor');
        return;
      }

      const ext = path.extname(finalFile).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      const headers = {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
        'X-Content-Type-Options': 'nosniff'
      };

      // Si es Service Worker, no cachear
      if (finalFile.endsWith('sw.js')) {
        headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
      }

      res.writeHead(200, headers);
      res.end(content);
    });
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`\n🚀 [GlucoFit] Servidor local escuchando en: http://localhost:${PORT}`);
  console.log(`📁 Directorio raíz: ${rootDir}\n`);
});
