// Pre-build boundary check: no active code may reference the removed
// `src/entries.json`, and no frontend (src/) module may import the full
// manifest (generated/canon-manifest.json).
import { readFileSync, readdirSync } from 'node:fs';
import { join, resolve, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const CODE_EXT = new Set(['.js', '.jsx', '.mjs', '.ts', '.tsx', '.sh', '.html']);
const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', '.vite-react-ssg-temp', 'canon', 'archive', 'audit', 'screen', 'generated']);

// Recursively collect code files, skipping self and vendored/content dirs.
function collectFiles(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.name === 'check-boundary.mjs') continue; // this file mentions the banned string
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) collectFiles(p, out);
    } else if (CODE_EXT.has(extname(entry.name))) {
      out.push(p);
    }
  }
  return out;
}

const errors = [];
const files = collectFiles(ROOT);

for (const file of files) {
  const content = readFileSync(file, 'utf8');
  const rel = file.slice(ROOT.length + 1);

  // Case-sensitive: `entries.json` (the removed full-manifest path) must never
  // appear. `publicEntries.json` does NOT match (capital E).
  if (content.includes('entries.json')) {
    errors.push(`${rel}: still references "entries.json"`);
  }

  // No frontend module may import/reference the full manifest.
  if (rel.startsWith('src/') && (content.includes('generated/') || content.includes('canon-manifest'))) {
    errors.push(`${rel}: imports/references the full manifest (generated/)`);
  }
}

if (errors.length) {
  console.error('Bundle-boundary check FAILED:');
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`Bundle-boundary check passed: no "entries.json" refs, no generated/ imports (${files.length} files scanned).`);
