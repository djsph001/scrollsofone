# Visual Checkpoint 01 — Reading Fidelity (T1 + T2)

Date: 2026-08-18
Author: Lumen (agent), per Dale's visual rulings.
Status: CLOSED (2026-08-18). Deployed to scrollsofone.com at commit 6adb5d9; all
live verifications passed.

Scope: reading-fidelity change only — T1 (preserve poetic lineation) and T2
(suppress verified duplicate display headings). Explicitly OUT of scope (deferred
to V2 and later): design-token centralization, dead-CSS removal, shared footers,
font consolidation, breakpoint standardization, and texture assets.

---

## Visual rulings (authoritative)

- Texture-only imagery is approved. No portraits, character illustrations,
  cinematic scenes, or decorative AI art.
- Future assets may include restrained paper grain, archival marks, ledger rules,
  stamps, marginalia, and redaction motifs.
- Red remains reserved for warning / repair / conflict / exceptional emphasis.
- Oxidized green remains reserved for verification and confirmed status.
- Neither red nor green is to be spread decoratively.

## T1 — Preserve poetic structure

EntryPage no longer renders every source line as a separate `<p>`. New behavior:

- Split the body into blocks at blank lines (`bodyBlocks`).
- Render each block as one semantic `<p>`.
- Preserve single line breaks inside a block via `white-space: pre-line`.
- Normalize CRLF and Unicode line separators (U+2028) to `\n` at the display
  layer only — the underlying canon text is never altered.

## T2 — Suppress duplicated display headings

New pure display-layer helper `stripDuplicateTitle(body, title)` removes a leading
title block ONLY when it verifiably duplicates the frontmatter title (already
rendered as the H1). Recognized forms:

1. exact single-line title, and
2. two-line series/title followed by subtitle (e.g. "# Scroll of Origins I" +
   "## Basis of My Art").

Matching is exact modulo punctuation/whitespace normalization (curly quotes,
colon/em-dash/en-dash/hyphen treated as equivalent; whitespace collapsed). Case
is NOT folded. Nothing is removed on fuzzy similarity — an uncertain leading
block is left visible.

Duplicate counts:
- Before: 24 verified duplicates (19 single-line, 5 two-line).
- After: 0 (all 24 suppressed at render time).

Out of scope (reported, not touched): 53 entries carry a source filename as the
first body line (e.g. "SCENE_09_THE_APPROACH.md"). These are production residue,
not title duplication — T2 conservatively leaves them visible.

## Execution

1. New `src/bodyDisplay.js` — pure helpers `titleKey`, `bodyBlocks`,
   `stripDuplicateTitle`.
2. `src/pages/EntryPage.jsx` — body renders via
   `bodyBlocks(stripDuplicateTitle(body, title))`; `.body p` gains
   `white-space: pre-line`.
3. New `test/bodyDisplay.test.mjs` — 12 cases (title-key normalization, block
   splitting incl. U+2028/CRLF, single-line / two-line / markdown / no-match /
   partial-scene / empty cases).

Gates: `npm test` 43/43 pass (31 + 12); `check:canon` PASS (118 heads, 0
warnings); lint clean; build 126 URLs.

Verified on representative entries (desktop prerendered output):
- Verse (Leadership VII): 41 stanza blocks, epigraph preserved across 3 lines,
  duplicate title gone.
- Two-line markdown title (Origins I): title block stripped, opens on the body.
- Prose profile (BIO One): unchanged.
- Filename-header scene (Scene 09): filename left visible (uncertain, by design).

Mobile: T1/T2 are viewport-independent (block splitting + pre-line + title
suppression touch no breakpoint or width rule). EntryPage's fluid type
(clamp / max-width:740px) is unchanged; mobile inherits the corrected structure
at a narrower measure. (Headless viewport pinned at 1280px — mobile confirmed by
reasoning over the unchanged responsive CSS, not by a resized render.)

## Execution results (2026-08-18 — CLOSED: pushed & deployed)

- Deploy commit: 6adb5d9 (origin/master). Live fingerprint: app-C6mH4tU_.js
  (content-hash matches local build — Netlify serving the new commit).
- Live verification passed: Leadership VII opens on the epigraph with stanza
  lineation preserved and no duplicate title; Origins I no longer repeats its
  title; BIO One unchanged; Scene 09 filename header still visible (uncertain,
  by design); helper (white-space: pre-line) present in bundle; /canon 118 heads;
  sitemap 126; working tree clean.
- Follow-up (next): filename-header census, then a hygiene checkpoint (verified
  residue removal) before V2 token centralization.
