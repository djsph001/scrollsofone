import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const data = JSON.parse(readFileSync(resolve(__dirname, '../src/entries.json'), 'utf-8'));
const dist = resolve(__dirname, '../dist');
const BASE = 'https://scrollsofone.com';

const lastmod = data.stats.generated?.split('T')[0] || '2026-06-13';

const entryUrls = data.entries
  .filter(e => e.visibility !== 'archive' && e.isHead)
  .map(e => ({
    loc: `${BASE}/scroll/${e.id}`,
    lastmod,
    changefreq: 'monthly',
    priority: '0.7',
  }));

const urls = [
  { loc: `${BASE}/`, changefreq: 'weekly', priority: '1.0', lastmod },
  { loc: `${BASE}/canon`, changefreq: 'weekly', priority: '0.8', lastmod },
  ...entryUrls,
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
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
