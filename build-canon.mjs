#!/usr/bin/env node
/**
 * build-canon.mjs — Scrolls of One canon loader
 * ----------------------------------------------
 * Walks the canon directory, parses YAML frontmatter from every file,
 * validates against SCROLL_METADATA_SPEC v1, resolves supersedes chains,
 * and emits src/entries.json for the explorer.
 *
 * Usage:
 *   node build-canon.mjs ./canon            # validate + build
 *   node build-canon.mjs ./canon --check    # validate only, no output
 *
 * Zero dependencies except js-yaml:  npm install js-yaml
 */

import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, extname, basename } from "node:path";
import yaml from "js-yaml";

// ---------- Spec v1 closed vocabularies ----------
const SERIES = ["Foundation","Characters","Origins","Conscience","Leadership",
  "Love","Baptist","Sandi","Carmichael","AI & Power","Governance","Scenes",
  "Pandemic Papers","Framing"];
const KINDS = ["scroll","scene","letter","profile","protocol","performance","reference","fragment"];
const WHO = ["One","Sandi","Baptist","Carmichael","Marise","Universal","Cosmic","Meta"];
const STATUS = ["canon","draft","seed","repair"];
const VISIBILITY = ["public","archive"];
const REQUIRED = ["id","title","series","kind","who","status","arc","order","summary","supersedes"];
// `visibility` is optional in v1 files; defaults to "public" when absent.

// Index/organizational files that intentionally carry no frontmatter:
const SKIP = new Set([
  "SCROLL_MASTER_INDEX.md","SCROLL_INDEX.md","PROJECT_FILE_CATALOG.md",
  "RENAME_MAP.md","SCROLLS_INDEX_AI_AND_POWER.md","SCROLL_METADATA_SPEC.md",
]);

const dir = process.argv[2];
const checkOnly = process.argv.includes("--check");
if (!dir) { console.error("Usage: node build-canon.mjs <canon-dir> [--check]"); process.exit(1); }

// ---------- Walk + parse ----------
const errors = [];
const warnings = [];
const entries = [];

const files = readdirSync(dir).filter((f) => {
  if (SKIP.has(f)) return false;
  // Canon files are markdown or extensionless legacy names
  return [".md", ""].includes(extname(f)) && !f.startsWith(".");
});

for (const file of files) {
  const path = join(dir, file);
  let raw;
  try { raw = readFileSync(path, "utf8"); }
  catch { errors.push(`${file}: unreadable`); continue; }

  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) { errors.push(`${file}: no frontmatter block`); continue; }

  let fm;
  try { fm = yaml.load(m[1]); }
  catch (e) { errors.push(`${file}: YAML parse error — ${e.message}`); continue; }
  const body = m[2].trim();

  // ----- Rule 5: all required fields present -----
  for (const field of REQUIRED) {
    if (!(field in fm)) errors.push(`${file}: missing field '${field}'`);
  }
  if (errors.some((e) => e.startsWith(file + ":"))) continue;

  // ----- Rule 2: closed vocabularies -----
  if (!SERIES.includes(fm.series)) errors.push(`${file}: invalid series '${fm.series}'`);
  if (!KINDS.includes(fm.kind)) errors.push(`${file}: invalid kind '${fm.kind}'`);
  if (!STATUS.includes(fm.status)) errors.push(`${file}: invalid status '${fm.status}'`);
  if (!Array.isArray(fm.who) || fm.who.length === 0) {
    errors.push(`${file}: 'who' must be a non-empty list`);
  } else {
    for (const w of fm.who) if (!WHO.includes(w)) errors.push(`${file}: invalid who '${w}'`);
  }
  const vis = fm.visibility ?? "public";
  if (!VISIBILITY.includes(vis)) errors.push(`${file}: invalid visibility '${fm.visibility}'`);

  // ----- Rule 4: arc and order ranges -----
  if (fm.arc !== null && (!Number.isInteger(fm.arc) || fm.arc < 1 || fm.arc > 8))
    errors.push(`${file}: arc must be 1–8 or null, got '${fm.arc}'`);
  if (fm.order !== null && (!Number.isInteger(fm.order) || fm.order < 1))
    errors.push(`${file}: order must be a positive integer or null`);

  // ----- id hygiene -----
  if (!/^[a-z0-9_]+$/.test(fm.id))
    errors.push(`${file}: id '${fm.id}' must be lowercase letters, digits, underscores`);

  if (!body) warnings.push(`${file}: empty body`);
  if (!fm.summary || String(fm.summary).trim().length < 20)
    warnings.push(`${file}: summary suspiciously short`);

  entries.push({
    id: fm.id, title: fm.title, series: fm.series, kind: fm.kind,
    who: fm.who, status: fm.status, arc: fm.arc, order: fm.order,
    summary: String(fm.summary).trim(), supersedes: fm.supersedes ?? null,
    visibility: vis, file, body,
  });
}

// ---------- Rule 1: unique ids ----------
const seen = new Map();
for (const e of entries) {
  if (seen.has(e.id)) errors.push(`duplicate id '${e.id}' in ${e.file} and ${seen.get(e.id)}`);
  seen.set(e.id, e.file);
}

// ---------- Rule 3: supersedes chains resolve ----------
const ids = new Set(entries.map((e) => e.id));
for (const e of entries) {
  if (e.supersedes && !ids.has(e.supersedes))
    errors.push(`${e.file}: supersedes '${e.supersedes}' — no such id`);
}
// Detect cycles
for (const e of entries) {
  let cur = e, hops = 0;
  while (cur?.supersedes && hops++ < 50) {
    cur = entries.find((x) => x.id === cur.supersedes);
    if (cur?.id === e.id) { errors.push(`supersedes cycle involving '${e.id}'`); break; }
  }
}

// ---------- Report ----------
console.log(`\nScrolls of One — canon build`);
console.log(`  scanned: ${files.length} files · parsed: ${entries.length} entries`);
if (warnings.length) {
  console.log(`\n  ⚠ ${warnings.length} warning(s):`);
  warnings.forEach((w) => console.log(`    - ${w}`));
}
if (errors.length) {
  console.log(`\n  ✗ ${errors.length} error(s):`);
  errors.forEach((e) => console.log(`    - ${e}`));
  console.log(`\nBuild blocked. The record stays clean or it doesn't ship.\n`);
  process.exit(1);
}

// ---------- Derive display set ----------
// Superseded entries and archive entries stay in the data but are marked;
// the explorer decides rendering. Archive entries ship WITHOUT body text
// (novel chapters must not leak full text into the public bundle).
const superseded = new Set(entries.map((e) => e.supersedes).filter(Boolean));
const output = entries.map((e) => ({
  ...e,
  isHead: !superseded.has(e.id),
  body: e.visibility === "archive" ? null : e.body,
}));

// Stable sort: series order, then order field, then title
output.sort((a, b) =>
  SERIES.indexOf(a.series) - SERIES.indexOf(b.series) ||
  (a.order ?? 999) - (b.order ?? 999) ||
  a.title.localeCompare(b.title)
);

const stats = {
  total: output.length,
  public: output.filter((e) => e.visibility === "public").length,
  canon: output.filter((e) => e.status === "canon").length,
  generated: new Date().toISOString(),
};

if (checkOnly) {
  console.log(`\n  ✓ Validation passed (${stats.total} entries). No output written (--check).\n`);
  process.exit(0);
}

mkdirSync("src", { recursive: true });
writeFileSync("src/entries.json", JSON.stringify({ stats, entries: output }, null, 2));
console.log(`\n  ✓ src/entries.json written — ${stats.total} entries (${stats.public} public, ${stats.canon} canon)\n`);
