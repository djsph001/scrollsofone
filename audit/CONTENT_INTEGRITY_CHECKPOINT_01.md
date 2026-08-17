# Content-Integrity Checkpoint 01 — Visibility Rulings

**Scope:** Records the publication-visibility and drafting-wrapper rulings for content-integrity checkpoint 01. Lives in `audit/`, **outside `canon/`** — a record *about* canon, not canon itself, and deliberately not scanned by `build-canon.mjs`.

**Governing principle:** `visibility: public` means **deliberately published for readers** — not merely retained in the active canon directory. Draft history and operational material belong in the repository, not automatically on the public stage.

**Ruling authority:** Dale (authorial), 2026-08-17. Base commit: `92f9e1c` (Checkpoint 1, literary gateway).

---

## 1. Commentary and operational references removed (no prose rewriting)

| File | Removed | Disposition |
|---|---|---|
| `Humans.md` | `(cleaned + tightened, keeping your voice and mythic cadence)` | authored body preserved unchanged |
| `Prelude__to__the_-Trial.md` | `(cleaned + performance-ready)` | authored body preserved unchanged |
| `The-root_of_the_myth.md` | `(cleaned, sharper, publishable — still you)` | stays public — deliberate framing |
| `SCROLL_LEADERSHIP_07_MEANS_ARE_MESSAGE.md` | `· Transcribed by ProphetBot · Scribe of One` (byline) | "ProphetBot" is an operational canon-management tool, not an in-universe entity; retained only `Spoken in the voice of One` |

## 2. Visibility: `public` → `archive`

Status and body content preserved for every file below; only the visibility field changes.

| File | ID | Status (unchanged) | Reason |
|---|---|---|---|
| `SCROLL_SANDI_04_PREGNANCY_PUBLIC.md` | `scroll_of_sandi_iv_when_social_media_discovered_the_pregnancy` | repair | editorial notes only; no literary work to show readers |
| `Humans.md` | `humans` | draft | draft history in repo, not public stage |
| `Warm__scene_version.md` | `warm_scene_version` | draft | 〃 |
| `A__Prophet__Ain_t__Nothing__but__a_Sandwich.md` | `a_prophet_aint_nothing_but_a_sandwich` | draft | 〃 |
| `Prelude__to__the_-Trial.md` | `prelude_to_the_trial` | draft | 〃 |
| `The__Coronavirus__Notes.md` | `the_coronavirus_notes` | draft | 〃 |
| `The__final__debate.md` | `the_final_debate` | draft | 〃 |
| `SCROLL_ECONOMICS_01_BAPTISM_OF_DOLLAR.md` | `the_baptism_of_the_dollar_seed_version` | seed | 〃 |
| `FOUNDATION_04_UNIVERSE_OVERVIEW.md` | `the_voice_of_one_universe_overview` | canon | operational ProphetBot instructions |
| `FOUNDATION_03_CORE_LORE_SUMMARY.md` | `core_lore_summary` | canon | internal canon-control document |

## 3. Kept public (deliberate)

| File | ID | Notes |
|---|---|---|
| `The-root_of_the_myth.md` | `the_root_of_the_myth` | deliberate reader-facing framing; drafting wrapper removed (see §1); verified no operational commentary |

## 4. Reading path updated (downstream of the visibility rulings)

The "Start here" curated path (`check-site-data.mjs` + `CanonExplorer.jsx`) dropped the two archived IDs and was reset to a six-entry progression:

`bio_one → scroll_origins_i_basis_of_my_art → scroll_of_sandi_ii_the_file_on_one → scroll_of_the_baptist_ii → scroll_of_one_on_spectacle_and_power → the_root_of_the_myth`

(identity → artistic motive → Sandi's discovery → synthetic-voice threat → public conflict → overarching premise)

## 5. Out of scope this checkpoint

- `BIO_*` and character-reference files — unchanged; their presentation belongs with the character-page phase.
- Sandi IV body content — preserved as-is (`status: repair` retained; archived, so body is nulled in generated data but the source file keeps the notes).

## Scan method

Complete scan of all `canon/*.md` bodies for drafting-commentary patterns (drafting wrappers, editorial voice, ProphetBot references, scaffold markers). 38 matching lines triaged → 3 unmistakable wrappers removed (§1); remainder classified as diegetic (§4), already-archived, already-loader-skipped, or out-of-scope (§5).

---

*Next checkpoint: chronology register — arc → order continuity, from the clean public record.*
