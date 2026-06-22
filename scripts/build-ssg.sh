#!/usr/bin/env bash
set -e
cd "$(dirname "$0")/.."

# Generate Routes.jsx with explicit paths from entries.json
echo "Generating routes..."
node scripts/generate-routes.mjs

# Build with vite-react-ssg
echo "Building SSG..."
npx vite-react-ssg build

# Post-process: move Helmet tags from #root to <head>, dedup meta
echo "Moving meta tags to <head>..."
node scripts/postprocess-ssg.mjs

# Generate sitemap
echo "Generating sitemap.xml + robots.txt..."
node scripts/generate-sitemap.mjs

echo "Build complete."
