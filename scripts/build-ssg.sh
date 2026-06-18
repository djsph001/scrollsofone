#!/usr/bin/env bash
set -e
cd "$(dirname "$0")/.."

# Generate Routes.jsx with explicit paths from entries.json
echo "Generating routes..."
node scripts/generate-routes.mjs

# Build with vite-react-ssg
echo "Building SSG..."
npx vite-react-ssg build

# Post-process: move Helmet tags from #root to <head>
echo "Moving meta tags to <head>..."
find dist -name '*.html' -exec node -e "
const fs = require('fs');
const path = process.argv[1];
let html = fs.readFileSync(path, 'utf-8');

// Extract head-bound tags from the root div
const rootMatch = html.match(/<div[^>]*id=\"root\"[^>]*data-server-rendered[^>]*>([\s\S]*?)<\/div>/);
if (!rootMatch) process.exit(0);

const inner = rootMatch[0];
const headTags = [];

// Extract title
const t = inner.match(/<title>[^<]*<\/title>/);
if (t) headTags.push(t[0]);

// Extract meta tags (exclude http-equiv, charset — keep OG and description)
const metas = inner.match(/<meta[^>]+property=\"og:[^\"]+\"[^>]*>/g) || [];
metas.push(...inner.match(/<meta[^>]+name=\"description\"[^>]*>/g) || []);
headTags.push(...metas);

// Extract canonical link
const canon = inner.match(/<link[^>]+rel=\"canonical\"[^>]*>/g) || [];
headTags.push(...canon);

if (headTags.length === 0) process.exit(0);

// Remove them from the root div content
let cleaned = inner;
headTags.forEach(tag => { cleaned = cleaned.replace(tag, ''); });
html = html.replace(inner, cleaned);

// Remove the default template title from <head> (it's the fallback)
html = html.replace(/<title>[^<]*<\/title>/, '');

// Inject into <head>
html = html.replace('</head>', headTags.join('\n    ') + '\n  </head>');

fs.writeFileSync(path, html, 'utf-8');
" {} \;

# Generate sitemap
echo "Generating sitemap.xml + robots.txt..."
node scripts/generate-sitemap.mjs

echo "Build complete."
