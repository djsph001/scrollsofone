import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { characterKeys } from '../src/characters.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

// The sitemap derives from the browser projection (public heads only).
const data = JSON.parse(readFileSync(resolve(__dirname, '../src/publicEntries.json'), 'utf-8'));
const dist = resolve(__dirname, '../dist');
const BASE = 'https://scrollsofone.com';

// No <lastmod> is emitted: there is no trustworthy per-entry modification date,
// and a synthetic global/build timestamp is not content history.
const entryUrls = data.entries.map((e) => ({
  loc: `${BASE}/scroll/${e.id}`,
  changefreq: 'monthly',
  priority: '0.7',
}));

const characterUrls = characterKeys.map((k) => ({
  loc: `${BASE}/characters/${k}`,
  changefreq: 'monthly',
  priority: '0.6',
}));

const urls = [
  { loc: `${BASE}/`, changefreq: 'weekly', priority: '1.0' },
  { loc: `${BASE}/canon`, changefreq: 'weekly', priority: '0.8' },
  { loc: `${BASE}/timeline`, changefreq: 'weekly', priority: '0.8' },
  { loc: `${BASE}/characters`, changefreq: 'weekly', priority: '0.8' },
  ...characterUrls,
  ...entryUrls,
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

writeFileSync(resolve(dist, 'sitemap.xml'), xml);
writeFileSync(resolve(dist, 'robots.txt'), `User-agent: *
Allow: /

Sitemap: ${BASE}/sitemap.xml
`);

console.log(`Generated sitemap.xml with ${urls.length} URLs + robots.txt`);
