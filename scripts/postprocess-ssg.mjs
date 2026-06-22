#!/usr/bin/env node
/**
 * postprocess-ssg.mjs — Post-process SSG HTML output
 * Moves Helmet tags from #root to <head>, deduplicates meta, removes generic defaults.
 */
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const DIST = resolve(ROOT, 'dist');

// The generic template description to strip from every page
const GENERIC_DESC = '<meta name="description" content="A browsable, filterable canon record for the universe of The Antichrist and the Prophet. 138 entries — every scroll, scene, and person, marked for what it is.">';

// Re-use the find logic by scanning dist for html files
import { execSync } from 'child_process';
const result = execSync('find dist -name "*.html"', { cwd: ROOT, encoding: 'utf-8' });
const files = result.trim().split('\n').filter(Boolean);

let count = 0;
for (const file of files) {
  const path = resolve(ROOT, file);
  let html = readFileSync(path, 'utf-8');

  // Extract head-bound tags from the root div
  const rootMatch = html.match(/<div[^>]*id="root"[^>]*data-server-rendered[^>]*>([\s\S]*?)<\/div>/);
  if (!rootMatch) continue;

  const inner = rootMatch[0];
  const headTags = [];

  // Extract title
  const t = inner.match(/<title>[^<]*<\/title>/);
  if (t) headTags.push(t[0]);

  // Extract meta tags (OG and description)
  const metas = inner.match(/<meta[^>]+property="og:[^"]+"[^>]*>/g) || [];
  metas.push(...inner.match(/<meta[^>]+name="description"[^>]*>/g) || []);
  headTags.push(...metas);

  // Extract canonical link
  const canon = inner.match(/<link[^>]+rel="canonical"[^>]*>/g) || [];
  headTags.push(...canon);

  if (headTags.length === 0) continue;

  // Remove them from the root div content
  let cleaned = inner;
  headTags.forEach(tag => { cleaned = cleaned.replace(tag, ''); });
  html = html.replace(inner, cleaned);

  // Remove the default template title from <head> (it's the fallback)
  html = html.replace(/<title>[^<]*<\/title>/, '');

  // Remove the generic template description (each page has its own per-entry one)
  html = html.replace(GENERIC_DESC, '');

  // Inject into <head>
  html = html.replace('</head>', headTags.join('\n    ') + '\n  </head>');

  writeFileSync(path, html, 'utf-8');
  count++;
}

console.log(`  Post-processed ${count} HTML files.`);
