import { readFileSync } from 'node:fs';

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

const landingEntrances = [
  'bio_one',
  'scroll_of_sandi_ii_the_file_on_one',
  'scroll_of_the_baptist_iii',
  'scroll_of_carmichael_i',
];

for (const [path, pathIds] of Object.entries(readingPaths)) {
  for (const id of pathIds) {
    if (!ids.has(id)) errors.push(`reading path "${path}" references missing id "${id}"`);
    else if (!publicHeads.some((entry) => entry.id === id)) errors.push(`reading path "${path}" references a hidden or superseded entry "${id}"`);
  }
}

for (const id of landingEntrances) {
  if (!ids.has(id)) errors.push(`landing entrance references missing id "${id}"`);
  else if (!publicHeads.some((entry) => entry.id === id)) errors.push(`landing entrance references a hidden or superseded entry "${id}"`);
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
