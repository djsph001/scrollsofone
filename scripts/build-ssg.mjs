import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// Read entries to derive routes
const data = JSON.parse(readFileSync(resolve(ROOT, 'src/entries.json'), 'utf-8'));
const entryIds = data.entries.filter(e => e.visibility !== 'archive').map(e => e.id);

// Generate route arguments for vite-react-ssg CLI
const routes = ['/', ...entryIds.map(id => `/scroll/${id}`)];

// Run vite-react-ssg build with these routes
import { execSync } from 'child_process';
const routeArgs = routes.join(' ');
execSync(`npx vite-react-ssg build ${routeArgs}`, {
  cwd: ROOT,
  stdio: 'inherit',
});

// --- Generate sitemap.xml + robots.txt ---
const BASE = 'https://scrollsofone.com';
const entryUrls = data.entries
  .filter(e => e.visibility !== 'archive')
  .map(e => ({
    loc: `${BASE}/scroll/${e.id}`,
    lastmod: data.stats.generated?.split('T')[0] || '2026-06-13',
    changefreq: 'monthly',
    priority: '0.7',
  }));

const urls = [
  { loc: BASE, changefreq: 'weekly', priority: '1.0', lastmod: '2026-06-13' },
  ...entryUrls,
];

const dist = resolve(ROOT, 'dist');
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

console.log(`\nDone: ${urls.length} URLs in sitemap.xml + robots.txt`);
