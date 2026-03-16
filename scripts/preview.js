#!/usr/bin/env node
// scripts/preview.js  —  Serve the built dist folder
'use strict';
const http = require('http');
const fs   = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const PORT = 4173;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.png':  'image/png',
  '.json': 'application/json',
};

if (!fs.existsSync(DIST)) {
  console.error('❌  dist/ folder not found. Run "npm run build" first.');
  process.exit(1);
}

const server = http.createServer((req, res) => {
  let url = req.url === '/' ? '/index.html' : req.url.split('?')[0];
  const filePath = path.join(DIST, url);
  const ext = path.extname(filePath);
  const mime = MIME[ext] || 'text/plain';

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    res.writeHead(200, { 'Content-Type': mime });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    fs.createReadStream(path.join(DIST, 'index.html')).pipe(res);
  }
});

server.listen(PORT, () => {
  console.log(`\n🚀 Preview server: http://localhost:${PORT}\n`);
});
