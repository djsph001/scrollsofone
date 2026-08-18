# Editorial Checkpoint 01 — Voice & Public-Stage Cleanup

Date: 2026-08-18
Author: Lumen (agent), per Dale's four rulings.
Status: RULED. Executed same-day; see "Execution" section and commit for the mechanical changes.

Scope: apply Dale's four controlling rulings and the F1–F14 findings from the
read-only editorial audit (scrollsofone-editorial-audit-2026-08-18.md). This is a
checkpoint — record first, execute only mechanical changes against the record,
preserve source in archive, do not invent lore, preserve stable IDs, stop before
push.

---

## Rulings (authoritative)

### R1 — "Is One the son of Jesus?" is marketing, not canon
`the_root_of_the_myth` is leaked promotional framing; it does not establish an
in-universe question. Controlling rule:
- One does not claim literal divinity.
- The story may preserve spiritual ambiguity.
- It must neither confirm divinity nor reduce One to a diagnosis.
- Marketing language cannot overrule character canon.

Action: remove from public canon and the "Start here" path; preserve in archive
as historical promotional material; do NOT rewrite into a canonical scroll.

### R2 — Archive the raw character sheets
Do not rewrite production sheets into literary works inside `canon/`. Archive:
`the_baptist_s_character_file`, `bio_baptist`, `additional_profile_for_baptist`,
`bio_sandi`. Keep `bio_one` (clean reader-facing prose). Replace any
essential/reading-path link to an archived sheet with an actual scroll/scene.

### R3 — Sandi is not "the bridge"
Controlling characterization: "Sandi is a political actor with complicity,
knowledge, and agency. She understands the regime from within and forces One's
moral abstractions to confront their human cost." Remove "the bridge between
regimes" from her role line and relationship copy; do not replace it with another
connector metaphor.

### R4 — Homepage stays spoiler-light
Match the interior Baptist posture. Introduce compromised trust without revealing
the abduction or synthetic replacement. Suggested copy:
"A trusted voice begins to fracture. The question is no longer only what was
said, but whether anyone can verify who spoke."

---

## Dispositions per finding

| # | Finding | Disposition |
|---|---|---|
| F1 | `the_root_of_the_myth` leaked blurb | EXECUTED — archived (R1); removed from "Start here" path |
| F2 | raw character sheets public | EXECUTED — 4 archived, `bio_one` kept (R2); character essentials/paths + "The Baptist & the synthetic voice" path repointed |
| F3 | "(Duplicate)" in retaliation title | EXECUTED — title fixed, ID preserved |
| F4 | `sandi_choses_silence` slug typo | DEFERRED — slug rename requires a redirect/alias mechanism; title already correct. Stable-ID rule applies. |
| F5 | Sandi "bridge" contradiction | EXECUTED — role, roleInConflict, One's relationship rewritten to R3 language |
| F6 | Carmichael Antichrist precedes power | EXECUTED — roleInConflict reordered: power arc first, Antichrist framing as culmination |
| F7 | negation over-explanation ("not a clean messiah", "not a damsel") | DEFERRED — voice refinement, needs author review of exact wording; not a contradiction or label |
| F8 | homepage entrance #3 spoiler | EXECUTED — entrance copy replaced (R4) |
| F9 | leadership VII "this is a fictional universe" disclaimer | DEFERRED — may be deliberate reader-protection; author to rule keep-vs-relocate |
| F10 | diegetic byline applied once | DEFERRED — author to rule uniform-vs-drop |
| F11 | homepage doesn't carry identity line | DEFERRED to visual phase (identity line locks there) |
| F12 | title-format split / "(Revised)" suffix / near-duplicate "Terms of Silence" | PARTIAL — "(Revised)" suffix removed (same class as F3); title-grammar normalization and "Terms of Silence" disambiguation DEFERRED |
| F13 | timeline lead "from the first counsel" | EXECUTED — lead corrected to describe the actual spine (scene 08 "The Order" → scene 67 "The Terms of Silence — Haiti") |
| F14 | homepage stats 123/123 redundant | DEFERRED — cosmetic; not a defect of record |
| F15–F17 | optional enhancements | DEFERRED |

## String-vs-concept guard (do not over-correct)

The string "son of Jesus" also appears in DIEJECTIC canon — `dream_scroll_the_first_daughter`
("the son of Jesus and the seed of the regime"), and leadership VII's "If Carmichael
is the Antichrist…". These are in-universe ambiguity the ruling explicitly preserves
(R1: "The story may preserve spiritual ambiguity"). The checkpoint touches ONLY the
marketing blurb; it does NOT touch diegetic uses of the framing.

## Execution (mechanical changes)

1. `visibility: public → archive` on 5 canon sources (bodies nulled in generated data,
   pages/sitemap dropped; sources preserved): The-root_of_the_myth.md, BIO_BAPTIST.md,
   BIO_SANDI.md, Addtional_Profile_for_Baptist, The_Baptist_s_character_file.
2. Titles: Scene__The__Retaliation__Move.md ("(Duplicate)" dropped), SCENE_04_INTERRUPTED_MEETING.md
   ("(Revised)" dropped). IDs unchanged.
3. `src/characters.js`: Sandi role/roleInConflict + One relationship (R3); Sandi &
   Baptist essentials/readingPath repointed off the archived bios; Carmichael
   roleInConflict reordered (F6).
4. `src/canonFilterParams.js`: "Start here" minus `the_root_of_the_myth`; "The Baptist
   & the synthetic voice" minus `bio_baptist`.
5. `src/LandingPage.jsx`: entrance #3 copy (R4).
6. `src/TimelinePage.jsx`: lead corrected (F13).

Expected gate result: public heads 123 → 118; check:canon green (0 editorial warnings);
reading paths resolve; "Framing" series and "Meta" who disappear from filter UI (correct).

## Execution results (2026-08-18, executed — NOT pushed)

- build-canon: 138 entries → 118 public heads (119 public, 130 canon).
- `npm run check:canon`: PASS — "118 public heads; 0 editorial warning(s)"; boundary pass.
- `npm test`: 31/31 pass. `npm run lint`: clean.
- `npm run build`: 126 URLs (was 131); sitemap 126; bundle-boundary pass.
- Verified: 5 archived IDs absent from sitemap/routes/bundle; bodies nulled in
  manifest; source files preserved; title fixes and all copy edits present in dist;
  "bridge between regimes" absent from dist; homepage stat now 118/118.
- Working tree: changes staged locally, STOP before push (per discipline).

## Open items (author rulings requested before next checkpoint)

1. F4 slug typo — authorize a redirect/alias mechanism (or leave the stable slug).
2. F7 negation language — soften, or keep as-is.
3. F9 leadership VII disclaimer — keep (deliberate), relocate to chrome, or remove.
4. F10 byline — uniform across One's first-person scrolls, or drop.
5. F12 remainder — normalize unordered-scene title grammar + disambiguate "Terms of Silence".
