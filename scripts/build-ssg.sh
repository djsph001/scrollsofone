#!/usr/bin/env bash
set -e
cd "$(dirname "$0")/.."

# Refresh and verify canon data before routes or pages are generated.
node build-canon.mjs ./canon
node scripts/check-site-data.mjs

# Generate Routes.jsx with explicit paths from the public projection
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

# Verify no excluded content leaked into the JS bundle
echo "Checking bundle boundary..."
node scripts/check-bundle.mjs

echo "Build complete."
