# Editorial Checkpoint 02 — Voice & Title-Grammar Standardization

Date: 2026-08-18
Author: Lumen (agent), per Dale's five rulings (F4, F7, F9, F10, F12).
Status: CLOSED (2026-08-18, amended). Checkpoint content deployed at 08b2653; the
closure commit was amended to correct Sandi's framing (proximity/entanglement ≠
complicity or culpability). Next editorial work (F11 + F14) is a separate checkpoint.

Scope: apply the five rulings to reader-facing synthesis copy and title grammar.
Boundaries are explicit: F7 touches only derived synthesis (src/characters.js), NOT
authored canon; F9/F10 touch one diegetic scroll (Leadership VII); F12 touches only
the `title:` field of public unnumbered scenes; F4 is a record-only ruling. No new
lore is invented; no IDs are renamed.

---

## Rulings (authoritative)

### F4 — Preserve the legacy typo ID
`scene_49_sandi_choses_silence` stays. Stable IDs and existing public URLs take
priority over cosmetic correction; the displayed title is already correct.
`choses` is recorded as a LEGACY IDENTIFIER. No alias machinery is added.

### F7 — Replace negation with affirmative characterization (synthesis copy only)
Remove "not a clean messiah" and "not a damsel or prop". Preserve meaning
affirmatively:
- One: a fallible conscience whose authority comes from conduct, refusal, and
  return — not claimed perfection.
- Sandi: a politically capable actor, shaped by proximity to power and forced to
  make impossible choices in real time.

Sandi characterization principle (amended 2026-08-18): being Carmichael's daughter,
understanding the regime, or benefiting from proximity to power makes Sandi
politically entangled and morally tested — it does not by itself establish
complicity or culpability. "Morally implicated" over-claimed and was replaced.

Apply ONLY to reader-facing synthesis copy (src/characters.js). Do NOT
global-replace inside authored canon (e.g. BIO_ONE.md's "Not a clean messiah" stays).

### F9 — Remove the Leadership VII disclaimer
Delete the fourth-wall "Remember as you read: This is a fictional universe…" block
from One's diegetic scroll. Do not replace it there. The fiction/real-world
boundary belongs once in a site-level colophon/About page later, not inside canon.

### F10 — Remove the unique byline
Delete "Spoken in the voice of One" from Leadership VII. A single exceptional
byline creates an unsupported document convention; do not add bylines elsewhere
to justify it.

### F12 — Standardize scene-title grammar; preserve distinct events
- Numbered scenes: "Scene NN — Title" (already the case).
- Unnumbered scenes: "Scene — Title" (replace the public "Scene:" prefix).
- Editorial suffixes "Revised"/"Duplicate" already dropped in Checkpoint 01.
- Keep both Terms of Silence scenes as distinct beats (arrangement, then
  execution): "Scene 64 — Drafting the Terms of Silence" and
  "Scene 67 — The Terms of Silence — Haiti".

## Legacy identifiers
- `scene_49_sandi_choses_silence` — "choses" is a legacy typo in the ID/slug;
  preserved permanently (F4). Display title is "Scene 49 — Sandi Chooses Silence".

## Execution (mechanical changes)

1. `src/characters.js` (F7): One intro and Sandi intro rewritten affirmatively.
   ("Sharper than both men who orbit her" removed with the Sandi negation — it
   was the same comparative-to-men construction; flag for author review.)
2. `canon/SCROLL_LEADERSHIP_07_MEANS_ARE_MESSAGE.md` (F9 + F10): "Spoken in the
   voice of One" and the "Remember as you read…" disclaimer deleted; body
   otherwise untouched.
3. 17 public unnumbered scenes (F12): `title:` prefix "Scene:" → "Scene —".
   Both Terms of Silence scenes unchanged.
4. F4: no file change (record-only).

Expected gate result: public heads stay 118; check:canon green; no title-format
collisions; titles render "Scene — X" for unnumbered scenes.

## Execution results (2026-08-18 — CLOSED: pushed & deployed, amended)

- Checkpoint content commit 08b2653 (deployed); closure commit amended to fold in
  the Sandi framing correction and the characterization principle above.
- Gates: check:canon PASS (118 public heads, 0 warnings); 31/31 tests; lint clean;
  build 126 URLs; sitemap 126.
- Live verification passed: One/Sandi affirmative intros live; negations
  ("not a clean messiah", "not a damsel", "Sharper than both men") absent from
  bundle; Leadership VII opens diegetic with disclaimer+byline gone; 17 unnumbered
  "Scene —" titles + 60 numbered "Scene NN —" titles; both Terms of Silence scenes
  distinct; Scene 49 legacy ID intact with correct display title; homepage 118/118;
  sitemap 126; working tree clean.

## Open items (carried forward)
- None in this checkpoint's scope. Fiction/real-world colophon (from F9) is a
  future site-level task, not folded in here.
