// Post-build boundary check: assert no excluded content leaked into the JS
// bundle, and that the full manifest was not copied into dist/.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const DIST = resolve(ROOT, 'dist');

// IDs that must NOT appear in the browser bundle (archive / superseded /
// draft / seed / repair). Markers use the exact serialized form `"id":"<id>"`
// so one ID cannot match another as a prefix (e.g. scene_the_retaliation_move
// vs scene_the_retaliation_move_duplicate).
const EXCLUDED_IDS = [
  'core_lore_summary',
  'first_instructions',
  'meta_chapter_map_v1',
  'revised_instructions',
  'the_voice_of_one_universe_overview',
  'universe_intro_canon',
  'scroll_of_sandi_iv_when_social_media_discovered_the_pregnancy',
  'the_baptism_of_the_dollar_seed_version',
  'scene_the_retaliation_move',
  'warm_scene_version',
  'a_prophet_aint_nothing_but_a_sandwich',
  'humans',
  'prelude_to_the_trial',
  'the_coronavirus_notes',
  'the_final_debate',
];
const ID_MARKERS = EXCLUDED_IDS.map((id) => `"id":"${id}"`);

// Unique full-text sentinel from the superseded scene's body. The curly
// apostrophe (U+2019) distinguishes it from the public duplicate, which uses a
// straight apostrophe. Inlined JSON stores it as a literal character.
const BODY_SENTINEL = 'A building manager\u2019s voice over the intercom';

const leaks = [];
const assetsDir = join(DIST, 'assets');
const jsFiles = readdirSync(assetsDir).filter((f) => f.endsWith('.js'));
for (const f of jsFiles) {
  const content = readFileSync(join(assetsDir, f), 'utf8');
  for (const marker of ID_MARKERS) {
    if (content.includes(marker)) leaks.push(`${f}: excluded id ${marker}`);
  }
  if (content.includes(BODY_SENTINEL)) leaks.push(`${f}: superseded body sentinel`);
}

// The full manifest must not be copied into dist/ (it lives in generated/,
// outside both src/ and public/).
if (existsSync(join(DIST, 'canon-manifest.json'))) leaks.push('dist/canon-manifest.json present');
if (existsSync(join(DIST, 'generated'))) leaks.push('dist/generated/ present');

if (leaks.length) {
  console.error('Bundle-boundary check FAILED:');
  for (const l of leaks) console.error(`  - ${l}`);
  process.exit(1);
}
console.log(`Bundle-boundary check passed: no excluded content in ${jsFiles.length} JS file(s), manifest not copied.`);
