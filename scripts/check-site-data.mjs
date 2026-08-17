import { readFileSync } from 'node:fs';
import { characters, characterKeys, whoToCharacterKey } from '../src/characters.js';
import { FROM } from '../src/navigation.js';

const data = JSON.parse(readFileSync(new URL('../src/entries.json', import.meta.url), 'utf8'));
const entries = data.entries;
const errors = [];
const warnings = [];
const ids = new Set(entries.map((entry) => entry.id));
const publicHeads = entries.filter((entry) => entry.visibility === 'public' && entry.isHead);

const readingPaths = {
  'Start here': ['bio_one', 'scroll_origins_i_basis_of_my_art', 'scroll_of_sandi_ii_the_file_on_one', 'scroll_of_the_baptist_ii', 'scroll_of_one_on_spectacle_and_power', 'the_root_of_the_myth'],
  'One & Sandi': ['love_series_letter_to_sandi_i_the_quiet_lobby', 'love_kitchen_light', 'love_letter_to_sandi_viii_newsstand', 'scroll_of_sandi_ii_the_file_on_one', 'scene_the_dagger_point', 'scene_the_inaugural_ballroom'],
  'The Baptist & the synthetic voice': ['bio_baptist', 'scroll_of_the_baptist_ii', 'scroll_of_the_baptist_iv', 'scroll_of_carmichael_iv', 'scroll_conscience_04_decoy_detection'],
  "Carmichael's descent": ['scroll_of_carmichael_i', 'scroll_of_carmichael_ii', 'scroll_of_carmichael_iii', 'scroll_of_carmichael_iv', 'scroll_of_one_on_spectacle_and_power'],
  'Power & method': ['scroll_leadership_servant_test', 'scroll_of_leadership_vii_the_means_are_the_message', 'scroll_on_naming_without_becoming_the_play', 'scroll_of_one_the_scapegoat_ledger', 'scroll_governance_01_the_fourth_branch'],
};

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
  if (!c || !c.name || !c.intro || !c.roleInConflict) errors.push(`character "${key}" missing name/intro/roleInConflict`);
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

const summaryOwners = new Map();
for (const entry of publicHeads) {
  const summary = entry.summary.trim();
  if (/^A file in The Voice of One canon\.?$/i.test(summary)) warnings.push(`${entry.id}: placeholder summary`);
  if (summaryOwners.has(summary)) warnings.push(`${entry.id}: duplicates summary used by ${summaryOwners.get(summary)}`);
  else summaryOwners.set(summary, entry.id);
}

for (const warning of warnings) console.warn(`warning: ${warning}`);
if (errors.length) {
  for (const error of errors) console.error(`error: ${error}`);
  process.exit(1);
}
console.log(`Site data check passed: ${publicHeads.length} public heads; ${warnings.length} editorial warning(s).`);
