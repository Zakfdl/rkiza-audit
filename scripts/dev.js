#!/usr/bin/env node
// scripts/dev.js  —  Simple dev server with file watching
'use strict';
const http = require('http');
const fs   = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const PORT = 3000;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.png':  'image/png',
  '.json': 'application/json',
};

// Initial build
console.log('🔨 Initial build…');
try {
  execSync('node scripts/build.js', { cwd: ROOT, stdio: 'inherit' });
} catch {}

const server = http.createServer((req, res) => {
  let url = req.url === '/' ? '/index.html' : req.url;
  // Strip query string
  url = url.split('?')[0];

  const filePath = path.join(ROOT, 'dist', url);
  const ext = path.extname(filePath);
  const mime = MIME[ext] || 'text/plain';

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    res.writeHead(200, { 'Content-Type': mime });
    fs.createReadStream(filePath).pipe(res);
  } else {
    // SPA fallback
    const idx = path.join(ROOT, 'dist/index.html');
    if (fs.existsSync(idx)) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      fs.createReadStream(idx).pipe(res);
    } else {
      res.writeHead(404);
      res.end('Not found');
    }
  }
});

server.listen(PORT, () => {
  console.log(`\n🚀 Dev server running at: http://localhost:${PORT}\n`);
  console.log('   Press Ctrl+C to stop.\n');
  console.log('   Re-run "npm run build" after making source changes.\n');
});
