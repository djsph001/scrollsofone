import { readFileSync } from 'node:fs';
import { characters, characterKeys, whoToCharacterKey } from '../src/characters.js';
import { FROM } from '../src/navigation.js';
import { PATHS, toSlug, deriveSeries, deriveWho } from '../src/canonFilterParams.js';

const manifest = JSON.parse(readFileSync(new URL('../generated/canon-manifest.json', import.meta.url), 'utf8'));
const projection = JSON.parse(readFileSync(new URL('../src/publicEntries.json', import.meta.url), 'utf8'));
const entries = manifest.entries;
const errors = [];
const warnings = [];
const ids = new Set(entries.map((entry) => entry.id));
const publicHeads = entries.filter((entry) => entry.visibility === 'public' && entry.isHead);

const readingPaths = PATHS;

for (const [path, pathIds] of Object.entries(readingPaths)) {
  for (const id of pathIds) {
    if (!ids.has(id)) errors.push(`reading path "${path}" references missing id "${id}"`);
    else if (!publicHeads.some((entry) => entry.id === id)) errors.push(`reading path "${path}" references a hidden or superseded entry "${id}"`);
  }
}

const expectedCharacters = ['one', 'sandi', 'baptist', 'carmichael'];
for (const key of expectedCharacters) {
  if (!characterKeys.includes(key)) errors.push(`character route "/characters/${key}" missing — not in characters.js`);
}
for (const key of characterKeys) {
  const c = characters[key];
  if (!c || !c.name || !c.shortName || !c.role || !c.intro || !c.roleInConflict) errors.push(`character "${key}" missing name/shortName/role/intro/roleInConflict`);
  if (!c || !Array.isArray(c.relationships) || c.relationships.length === 0) errors.push(`character "${key}" has no relationships`);
  if (!c || !Array.isArray(c.essentials) || c.essentials.length === 0) errors.push(`character "${key}" has no essential entries`);
  if (!c || !Array.isArray(c.readingPath) || c.readingPath.length === 0) errors.push(`character "${key}" has no reading path`);
  const refs = [...(c?.essentials || []), ...(c?.readingPath || []).map((p) => p.id)];
  for (const id of refs) {
    if (!ids.has(id)) errors.push(`character "${key}" references missing id "${id}"`);
    else if (!publicHeads.some((entry) => entry.id === id)) errors.push(`character "${key}" references a hidden or superseded entry "${id}"`);
  }
}

// Spine validation: numbered scenes 08–67, resolved by `order` (not ID), so the
// three legacy `cene_` IDs land at their correct positions.
const spine = entries.filter((e) => e.kind === 'scene' && Number.isInteger(e.order) && e.order >= 8 && e.order <= 67);
if (spine.length !== 60) errors.push(`spine: expected 60 numbered scenes, found ${spine.length}`);
for (let o = 8; o <= 67; o++) {
  const at = spine.filter((e) => e.order === o);
  if (at.length === 0) errors.push(`spine: missing scene at order ${o}`);
  else if (at.length > 1) errors.push(`spine: duplicate scene at order ${o} (${at.map((e) => e.id).join(', ')})`);
}
for (const e of spine) {
  if (e.visibility !== 'public' || !e.isHead || e.status !== 'canon') errors.push(`spine: ${e.id} (order ${e.order}) is not a public canonical head`);
  if (!Number.isInteger(e.arc) || e.arc < 1 || e.arc > 8) errors.push(`spine: ${e.id} (order ${e.order}) has invalid arc "${e.arc}"`);
  for (const w of e.who || []) {
    const key = whoToCharacterKey[w];
    if (key && !characterKeys.includes(key)) errors.push(`spine: ${e.id} links who "${w}" to missing character "${key}"`);
  }
}

// navigation.js: `from` whitelist integrity — every value resolves to a real destination,
// and every character key has a `character-${key}` entry.
const staticRoutes = new Set(['/', '/canon', '/timeline']);
for (const [from, dest] of Object.entries(FROM)) {
  if (dest.to.startsWith('/characters/')) {
    const key = dest.to.slice('/characters/'.length);
    if (!characterKeys.includes(key)) errors.push(`navigation: from "${from}" points to missing character "${key}"`);
  } else if (!staticRoutes.has(dest.to)) {
    errors.push(`navigation: from "${from}" points to unknown destination "${dest.to}"`);
  }
}
for (const key of characterKeys) {
  const fv = `character-${key}`;
  if (!FROM[fv]) errors.push(`navigation: missing "from=${fv}" whitelist entry`);
}

// URL-filter slug maps must be injective per namespace (series / who / path),
// or a /canon filter param would be ambiguous. Route safety: every public head
// id must be a single, URL-safe path segment so /scroll/<id> routes stay clear.
for (const [label, values] of [['series', deriveSeries(entries)], ['who', deriveWho(entries)], ['path', Object.keys(PATHS)]]) {
  const seen = new Map();
  for (const value of values) {
    const slug = toSlug(value);
    if (seen.has(slug)) errors.push(`filter slug collision in ${label}: "${slug}" from "${seen.get(slug)}" and "${value}"`);
    else seen.set(slug, value);
  }
}
for (const entry of publicHeads) {
  if (!/^[A-Za-z0-9_\-]+$/.test(entry.id)) errors.push(`route safety: entry id "${entry.id}" is not a URL-safe path segment`);
}

// G1 — the browser projection must be exactly the public-head subset of the
// full manifest: same IDs, same count, nothing more or less.
const projectionIds = new Set(projection.entries.map((e) => e.id));
const eligibleIds = new Set(publicHeads.map((e) => e.id));
if (projection.entries.length !== publicHeads.length) {
  errors.push(`G1: projection has ${projection.entries.length} entries, expected ${publicHeads.length} public heads`);
}
for (const id of projectionIds) {
  if (!eligibleIds.has(id)) errors.push(`G1: projection contains non-public-head id "${id}"`);
}
for (const id of eligibleIds) {
  if (!projectionIds.has(id)) errors.push(`G1: projection missing public-head id "${id}"`);
}

// G2 — publishing policy: only canonical public heads enter the browser
// projection. Forbids archive (non-public visibility), superseded (non-head),
// and draft/seed/repair (non-canon status) IDs.
const manifestById = new Map(entries.map((e) => [e.id, e]));
for (const pe of projection.entries) {
  const full = manifestById.get(pe.id);
  if (!full) { errors.push(`G2: projection id "${pe.id}" not in manifest`); continue; }
  if (full.visibility !== 'public') errors.push(`G2: projection id "${pe.id}" is not public (${full.visibility})`);
  if (!full.isHead) errors.push(`G2: projection id "${pe.id}" is superseded`);
  if (full.status !== 'canon') errors.push(`G2: projection id "${pe.id}" has status "${full.status}" (only canon allowed)`);
}

const summaryOwners = new Map();
for (const entry of publicHeads) {
  const summary = entry.summary.trim();
  if (/^A file in The Voice of One canon\.?$/i.test(summary)) warnings.push(`${entry.id}: placeholder summary`);
  if (summaryOwners.has(summary)) warnings.push(`${entry.id}: duplicates summary used by ${summaryOwners.get(summary)}`);
  else summaryOwners.set(summary, entry.id);
}

// Hygiene gate: a public head's body must not contain a source-filename line or
// an explicit "(Reframed: …)" production annotation ANYWHERE (not just at the
// start). Narrow, unmistakable detection only — removal is done by an audited
// allowlist, never by this pattern.
const FILENAME_HEADER_RE = /^[A-Z][A-Z0-9_'\u2019]*\.md$/;
const REFRAMED_RE = /\(Reframed\s*:/;
for (const entry of publicHeads) {
  for (const line of String(entry.body ?? '')
    .replace(/\r\n/g, '\n')
    .replace(/\u2028/g, '\n')
    .split('\n')) {
    const s = line.trim();
    if (!s) continue;
    if (FILENAME_HEADER_RE.test(s)) {
      errors.push(`hygiene: ${entry.id} body contains filename residue "${s}"`);
    } else if (REFRAMED_RE.test(s)) {
      errors.push(`hygiene: ${entry.id} body contains a "(Reframed: …)" annotation`);
    }
  }
}

for (const warning of warnings) console.warn(`warning: ${warning}`);
if (errors.length) {
  for (const error of errors) console.error(`error: ${error}`);
  process.exit(1);
}
console.log(`Site data check passed: ${publicHeads.length} public heads; ${warnings.length} editorial warning(s).`);
