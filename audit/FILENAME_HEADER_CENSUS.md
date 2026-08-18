# Filename-Header Census (Read-Only)

Date: 2026-08-18
Author: Lumen (agent).
Status: CENSUS ONLY — no files changed. Proves that each leading filename line in
a public entry body corresponds to its source file, so a future hygiene checkpoint
can remove verified residue without broad regex deletion.

Method: for every public head whose body's first line matches a filename shape
(`*.md`, uppercase + underscores), the line is compared against the entry's actual
source file in `canon/` (resolved by frontmatter `id`). No edits were made.

---

## Result

53 public entries carry a leading filename line in their body.

| Class | Count | Meaning |
|---|---|---|
| EXACT | 48 | leading line is byte-identical to the source filename |
| Variant — apostrophe/underscore | 1 | `…BAPTIST’S…` vs source `…BAPTIST_S…` |
| Variant — missing "SC" prefix | 1 | `ENE_18_…` vs source `SCENE_18_…` |
| Variant — SCENE/CENE | 3 | known `cene_` mangling (leading "S" dropped) |

All 53 leading lines are unmistakably production residue: uppercase underscore
filenames ending in `.md`, each corresponding to its source file either exactly or
through a single, documented mangling. None is prose.

## The 5 variant cases (proven correspondence)

- `scene_16_the_baptist_s_choice` — body `SCENE_16_THE_BAPTIST’S_CHOICE.md` vs
  source `SCENE_16_THE_BAPTIST_S_CHOICE.md` (apostrophe → underscore, standard
  filename sanitization; scene 16 "The Baptist's Choice").
- `scene_18_the_public_awakening` — body `ENE_18_THE_PUBLIC_AWAKENING.md` vs
  source `SCENE_18_THE_PUBLIC_AWAKENING.md` (leading "SC" dropped).
- `cene_20_the_safehouse` — body `SCENE_20_…` vs source `CENE_20_…` (known cene_
  mangling; the id itself is `cene_20_…`).
- `scene_22_the_turning_point` — body `CENE_22_…` vs source `SCENE_22_…`.
- `cene_62_the_process_comes_to_the_door` — body `SCENE_62_…` vs source `CENE_62_…`.

## Context for the hygiene checkpoint (not decided here)

In most of the 53 bodies, the filename line is followed by a title heading
(e.g. `Scene: The Approach`, `Scroll of Conscience: On Decoy Rooms`, `Scene: The
Minimal Appearance`). Those second-line headings are a separate residue class —
many omit the scene number, so V1's T2 (exact title duplication) intentionally
leaves them. The hygiene checkpoint should rule on:
1. remove the leading filename line only, and/or
2. also remove a following title heading when it duplicates the entry title.

Both decisions are authorial; this census only certifies the filename line.
