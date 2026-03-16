#!/usr/bin/env node
'use strict';
const { spawnSync } = require('child_process');
const fs   = require('fs');
const path = require('path');

const ROOT  = path.resolve(__dirname, '..');
const SRC   = path.join(ROOT, 'src');
const DIST  = path.join(ROOT, 'dist');

function findEsbuild() {
  const candidates = [
    path.join(ROOT, 'node_modules/.bin/esbuild'),
    path.join(ROOT, 'node_modules/esbuild/bin/esbuild'),
    path.join(process.env.HOME||'', '.npm-global/lib/node_modules/.bin/esbuild'),
    path.join(process.env.HOME||'', '.npm-global/lib/node_modules/esbuild/bin/esbuild'),
    path.join(process.env.HOME||'', '.npm-global/lib/node_modules/tsx/node_modules/esbuild/bin/esbuild'),
    '/usr/local/bin/esbuild',
    '/usr/bin/esbuild',
  ];
  for (const c of candidates) if (fs.existsSync(c)) return c;
  try { require('child_process').execSync('esbuild --version',{stdio:'ignore'}); return 'esbuild'; } catch{}
  return null;
}

const log  = (m) => process.stdout.write(m+'\n');
const ok   = (m) => log('  \u2705 '+m);
const info = (m) => log('  \uD83D\uDCE6 '+m);

log('\n\uD83D\uDD28  Building Rkiza Audit Dashboard\u2026\n');
if (fs.existsSync(DIST)) fs.rmSync(DIST, {recursive:true});
fs.mkdirSync(DIST, {recursive:true});

const readSrc = (rel) => fs.readFileSync(path.join(SRC, rel), 'utf8');
let dataJS  = readSrc('data/auditData.js').replace(/^export const /gm,'const ').replace(/^export function /gm,'function ');
let i18nJS  = readSrc('utils/i18n.js').replace(/^export const /gm,'const ').replace(/^export function /gm,'function ');
let appJSX  = readSrc('App.jsx');
// Remove ALL import statements (single-line and multi-line)
appJSX = appJSX.replace(/import\s+(?:\{[^}]*\}|\w+|\*\s+as\s+\w+)\s+from\s+'[^']*';\s*/g,'');
appJSX = appJSX.replace(/import\s+'[^']*';\s*/g,'');
appJSX = appJSX.replace(/^export default function App\(\)/m,'function App()');
const css = readSrc('styles/design-system.css');

const entry = `import React,{useState,useEffect,useCallback} from 'react';
import {createRoot} from 'react-dom/client';
${dataJS}
${i18nJS}
${appJSX}
const _r=createRoot(document.getElementById('root'));
_r.render(React.createElement(App,null));
`;

const ENTRY = path.join(ROOT, '.build-entry.jsx');
fs.writeFileSync(ENTRY, entry);
info(`Entry: ${(entry.length/1024).toFixed(1)} KB`);

const esbuild = findEsbuild();
if (!esbuild) { log('  \u274C esbuild not found. Run: npm install'); process.exit(1); }

const reactDir = [
  path.join(ROOT,'node_modules/react'),
  path.join(process.env.HOME||'','.npm-global/lib/node_modules/react'),
].find(d => fs.existsSync(path.join(d,'index.js')));
const rdDir = reactDir ? reactDir.replace(/[\\/]react$/,path.sep+'react-dom') : null;
const aliases = reactDir ? [
  `--alias:react=${reactDir}`,
  `--alias:react-dom=${rdDir}`,
  `--alias:react-dom/client=${path.join(rdDir,'client.js')}`,
  `--alias:react/jsx-runtime=${path.join(reactDir,'jsx-runtime.js')}`,
] : [];

const r = spawnSync([
  esbuild, ENTRY,
  '--bundle','--minify',
  `--outfile=${path.join(DIST,'app.js')}`,
  "--define:process.env.NODE_ENV='\"production\"'",
  '--jsx=automatic','--loader:.jsx=jsx','--log-level=warning',
  ...aliases
].join(' '), {shell:true, cwd:ROOT, encoding:'utf8'});

if (r.status!==0){log(r.stdout);log(r.stderr);log('  \u274C Build failed');process.exit(1);}
ok(`app.js  ${(fs.statSync(path.join(DIST,'app.js')).size/1024).toFixed(0)} KB`);

const cssMin = css.replace(/\/\*[\s\S]*?\*\//g,'').replace(/\s{2,}/g,' ').replace(/\s*([:,;{}])\s*/g,'$1').trim();

const faviconSVG='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#0A3D6B"/><text x="16" y="22" font-family="Arial" font-size="18" font-weight="bold" fill="#E65100" text-anchor="middle">R</text></svg>';

const html=`<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<meta name="description" content="Rkiza.com E-Commerce Audit Dashboard — Bilingual AR/EN audit report for Saudi Arabia building materials store."/>
<meta property="og:title" content="Rkiza.com — E-Commerce Audit Dashboard"/>
<meta name="theme-color" content="#0A3D6B"/>
<title>Rkiza.com — Audit Dashboard 2026</title>
<link rel="icon" type="image/svg+xml" href="favicon.svg"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Cairo:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
<style>${cssMin}</style>
</head>
<body>
<div id="root"><div style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:Arial;color:#475569;background:#F4F6F9;"><div style="text-align:center"><svg width="48" height="48" viewBox="0 0 32 32" style="margin:0 auto 16px"><rect width="32" height="32" rx="8" fill="#0A3D6B"/><text x="16" y="22" font-family="Arial" font-size="18" font-weight="bold" fill="#E65100" text-anchor="middle">R</text></svg><div style="font-size:24px;font-weight:800;color:#0A3D6B">rkiza.com</div><div style="font-size:14px;color:#94A3B8;margin-top:8px">Loading audit dashboard\u2026</div></div></div></div>
<script src="app.js"></script>
</body>
</html>`;

fs.writeFileSync(path.join(DIST,'index.html'),html);
ok(`index.html  ${(fs.statSync(path.join(DIST,'index.html')).size/1024).toFixed(0)} KB`);
fs.writeFileSync(path.join(DIST,'favicon.svg'),faviconSVG);
ok('favicon.svg');
if(fs.existsSync(ENTRY)) fs.unlinkSync(ENTRY);

const total=['index.html','app.js','favicon.svg'].reduce((s,f)=>{
  const p=path.join(DIST,f); return s+(fs.existsSync(p)?fs.statSync(p).size:0);
},0);
log(`\n\uD83C\uDF89  Build complete! dist/ is ${(total/1024).toFixed(0)} KB total\n`);
