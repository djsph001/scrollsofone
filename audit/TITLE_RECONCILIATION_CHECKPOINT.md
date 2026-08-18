# Title-Reconciliation Checkpoint

Date: 2026-08-18
Author: Lumen (agent), per Dale's Cat 3 + Cat 4 rulings and the display-helper
extension ruling.
Status: CLOSED (2026-08-18). Deployed to scrollsofone.com at commit 9693ea3; all
live verifications passed.

Scope: align 10 body headings to frontmatter (Cat 3), strip 3 "(Reframed: …)"
annotations (Cat 4), and extend the V1 display helper with a structured
scene-heading comparison so all verified redundant headings disappear from entry
display while the source stays independently readable.

---

## Rulings

### Cat 3 — frontmatter controls (10 entries)
Update the body heading to match the frontmatter title; change no prose beneath
the heading. Applied exactly:

| Entry | New body heading |
|---|---|
| Scene 16 | Scene: The Baptist's Choice |
| Scene 24 | Scene: One and Sandi Go Public |
| Scene 35 | Scene: Carmichael Feels It |
| Scene 41 | Scene: Sandi Draws a Line |
| Scene 43 | Scene: One Writes the Rule |
| Scene 47 | Scene: One Refuses the Stage Again |
| Scene 49 | Scene: Sandi Chooses Silence |
| Scene 64 | Scene: Drafting the Terms of Silence |
| Conscience 04 | Scroll of Conscience: Decoy Detection |
| Black Box Rule 02 | Scroll of AI: Black Box Rule 02: Verify the Voice |

### Cat 4 — strip production annotations (3 entries)
Strip only the "(Reframed: …)" tail, retain the literary heading, touch no prose:
Scene 56, Scene 59, Scene 60.

### Display helper — structured scene-heading comparison
`src/bodyDisplay.js` now strips a leading kind label ("Scene", "Scroll of
<Series>", "Love Series"), an optional Arabic or Roman number, and a separator
(colon/dash) from BOTH the body heading and the frontmatter title, then suppresses
the body heading only on an exact core match after the existing harmless
punctuation/whitespace normalization. No semantic/fuzzy matching; suppression is
display-only — canon source headings are never altered.

## Execution

1. 13 canon source headings edited (10 Cat 3 + 3 Cat 4), prose untouched.
2. `src/bodyDisplay.js` — added `headingCore` (structured comparison) wired into
   `stripDuplicateTitle` as a third, exact-match-only check.
3. `test/bodyDisplay.test.mjs` — 7 new tests: numbered-vs-unnumbered equivalence,
   Roman/Arabic equivalence, multi-part-title equivalence, contradiction (kept),
   parenthetical near-match (kept), partial heading (kept), prose (kept).

## Gates

- `npm test`: 50/50 pass (43 + 7).
- `check:canon`: PASS — 118 heads, 0 warnings; hygiene gate clean.
- lint clean; build 126 URLs, sitemap 126.

## Verified result

- Redundant headings now suppressed from display (e.g. Scene 16 opens on prose;
  Scene 56 opens on "The portal updated on a Friday evening").
- Source files still carry their literary headings and are independently readable.
- Near-matches are NOT suppressed (Scene 67 "The Terms of Silence (Haiti)" stays).

## Additional findings (out of scope, flagged for a future pass)

- scene_56's body contains three embedded "(Reframed: …)" notes (lines ~142, 296,
  379) as internal scene summaries — authorial residue inside prose, not a leading
  heading; left untouched per "touch no scene prose."
- Pre-existing title drifts outside the 53-file audit: scene_29 ("The Sign" vs
  "The Baptist Sends a Sign") and scene_carmichael_alone ("Carmichael Alone" vs
  "Carmichael Alone After Confrontation").
- Mislabeled body headings: scroll_ai_black_box_rule ("# Scroll of Conscience")
  and scroll_ai_machine_and_the_boy ("# Scroll of Origins / AI & Power").
- Case/punctuation near-matches left visible (e.g. scroll_on_mercy "Scroll: On …"
  vs "Scroll on …") — correct conservative behavior, no fuzzy match.

## Execution results (2026-08-18 — CLOSED: pushed & deployed)

- Deploy commit: 9693ea3 (origin/master). Live fingerprint: app-OJKUhx8U.js
  (content-hash matches local build — Netlify serving the new commit).
- Live verification passed: Scene 16 and Scene 56 open directly on prose; the ten
  corrected headings match frontmatter in source; the three heading-level
  "Reframed" annotations absent; Scene 67's near-match visible; structured
  suppression matches the tested build; 50/50 tests; /canon 118 heads; sitemap
  126; working tree clean.
- Follow-up: final editorial-hygiene audit (see FINAL_EDITORIAL_HYGIENE_AUDIT.md)
  before V2 token centralization.
