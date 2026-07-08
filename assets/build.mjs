// Mode B build script — concatenates src/ into a single inline-Babel HTML file.
//
// Usage:
//   node build.mjs              # one-shot build
//   node build.mjs --watch      # rebuild on change
//   node build.mjs --serve      # rebuild + tiny static server on :5173
//
// Layout assumed:
//   src/00-…99-…/scenes/sN-…   numerically-prefixed JSX files
//   src/99-app.jsx              app/mount, runs LAST
//   assets/                     binary assets to inline
//   shell.html                  the host HTML with /*INLINE_*/ placeholders
//   teaser.html                 generated output

import { readFileSync, writeFileSync, readdirSync, existsSync, watch } from 'node:fs';
import { join, extname, basename } from 'node:path';
import { createServer } from 'node:http';

const SRC = 'src';
const ASSETS = 'assets';
const SHELL = 'shell.html';
const OUT = 'teaser.html';

function collectSources() {
  const topLevel = readdirSync(SRC)
    .filter(f => /^\d{2}-.*\.jsx$/.test(f))
    .sort();
  const scenes = existsSync(join(SRC, 'scenes'))
    ? readdirSync(join(SRC, 'scenes'))
        .filter(f => /^s\d+-.*\.jsx$/.test(f))
        .sort()
        .map(f => join('scenes', f))
    : [];
  // 9X-… is the app block, must run LAST after scenes
  const app = topLevel.filter(f => /^9\d-/.test(f));
  const pre = topLevel.filter(f => !/^9\d-/.test(f));
  return [...pre, ...scenes, ...app];
}

function inlineAssets() {
  if (!existsSync(ASSETS)) return '';
  const lines = [];
  for (const f of readdirSync(ASSETS)) {
    const ext = extname(f).toLowerCase();
    const name = basename(f, ext).replace(/[^a-zA-Z0-9_]/g, '_').toUpperCase();
    const path = join(ASSETS, f);
    if (ext === '.svg') {
      const svg = readFileSync(path, 'utf8');
      lines.push(`window.__ASSET_${name}_SVG = ${JSON.stringify(svg)};`);
    } else if (['.png', '.jpg', '.jpeg', '.gif', '.webp'].includes(ext)) {
      const mime = ext === '.jpg' ? 'jpeg' : ext.slice(1);
      const b64 = readFileSync(path).toString('base64');
      lines.push(`window.__ASSET_${name}_${mime.toUpperCase()} = "data:image/${mime};base64,${b64}";`);
    } else if (['.mp3', '.wav', '.ogg'].includes(ext)) {
      const b64 = readFileSync(path).toString('base64');
      lines.push(`window.__ASSET_${name}_AUDIO = "data:audio/${ext.slice(1)};base64,${b64}";`);
    }
  }

  // Optional: parse a brand wordmark SVG into individual paths for the
  // `WordmarkDrawIn` animation pattern (see references/branding-and-logos.md).
  // Looks for assets/brand-wordmark.svg with paths classed as
  //   <path class="brand-p brand-<color>" d="…" />
  // and exposes them on window.__BRAND_PATHS__.
  const brandPath = join(ASSETS, 'brand-wordmark.svg');
  if (existsSync(brandPath)) {
    const svg = readFileSync(brandPath, 'utf8');
    const paths = Array.from(
      svg.matchAll(/<path class="brand-p brand-(\w+)" d="([^"]+)"/g)
    ).map(m => ({ color: m[1], d: m[2] }));
    lines.push(`window.__BRAND_PATHS__ = ${JSON.stringify(paths)};`);
  }

  return lines.join('\n');
}

function build() {
  if (!existsSync(SHELL)) {
    console.error(`missing ${SHELL} — copy from skill assets/`);
    process.exit(1);
  }
  const files = collectSources();
  if (files.length === 0) {
    console.error(`no .jsx files in ${SRC}/`);
    process.exit(1);
  }
  const source = files
    .map(f => `// ──────── ${f} ────────\n${readFileSync(join(SRC, f), 'utf8')}`)
    .join('\n\n');
  const assets = inlineAssets();
  const shell = readFileSync(SHELL, 'utf8');
  const html = shell
    .replace('/*INLINE_ASSETS*/', assets)
    .replace('/*INLINE_SOURCE*/', source);
  writeFileSync(OUT, html);
  const kb = (Buffer.byteLength(html) / 1024).toFixed(0);
  console.log(`built ${OUT} (${kb}KB, ${files.length} files)`);
}

function startServer() {
  const port = 5173;
  createServer((req, res) => {
    const url = req.url === '/' ? '/teaser.html' : req.url;
    const path = '.' + url;
    if (!existsSync(path)) { res.writeHead(404).end('not found'); return; }
    const ext = extname(path);
    const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
                    '.svg': 'image/svg+xml', '.mp3': 'audio/mpeg' };
    res.writeHead(200, { 'content-type': types[ext] || 'application/octet-stream' });
    res.end(readFileSync(path));
  }).listen(port, () => console.log(`server: http://localhost:${port}/`));
}

build();

if (process.argv.includes('--watch')) {
  console.log('watching src/ and assets/ — Ctrl+C to stop');
  for (const dir of [SRC, ASSETS, SHELL]) {
    if (!existsSync(dir)) continue;
    watch(dir, { recursive: true }, () => {
      try { build(); } catch (e) { console.error('build failed:', e.message); }
    });
  }
}

if (process.argv.includes('--serve')) {
  startServer();
}
