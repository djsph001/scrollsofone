# Title-Heading Reconciliation Audit (Read-Only)

Date: 2026-08-18
Author: Lumen (agent).
Status: AUDIT ONLY — no files changed. Classifies the 53 headings newly exposed by
the filename-header removal, comparing exact frontmatter title vs body heading text.
No fuzzy automatic deletion is proposed.

Context: removing the 53 leading filename lines exposed each entry's title heading
as the new first body line. V1's `stripDuplicateTitle` suppresses exactly one of
them (exact match); the remaining 52 are classified below.

---

## Classification

| Category | Count | Meaning |
|---|---|---|
| 0. Already suppressed (V1 exact match) | 1 | punctuation-only equivalence |
| 1. Equivalent — suppressible safely | 39 | same title text, number/format differs |
| 3. Contradiction — authorial ruling | 10 | body heading text ≠ frontmatter title text |
| 4. Production annotation | 3 | "(Reframed: …)" note appended to the heading |

(No entries were classifiable as Category 2 "intentional alternate" without
author input — see the note under Category 3.)

### Category 0 — already suppressed (1)
- `scroll_of_one_the_philosopher_s_eyes` — body "Scroll of One: The Philosopher's
  Eyes" ≡ frontmatter "Scroll of One — The Philosopher's Eyes" (colon vs em-dash).

### Category 1 — equivalent, suppressible safely (39)
Heading text equals the frontmatter title text; it differs only by the omitted
scene/series number or numeral format. Examples: "Scene: The Approach" vs
"Scene 09 — The Approach"; "Scene: The Terms of Silence (Haiti)" vs
"Scene 67 — The Terms of Silence — Haiti" (parenthetical vs em-dash);
"Scroll of Governance I: The Fourth Branch" vs "Scroll of Governance 01 — The
Fourth Branch" (roman vs arabic).

These are NOT contradictions — the in-scene heading and the index title agree.
Correction location: none required. If suppression is ever wanted, it belongs in
DISPLAY logic (a deterministic "number-omitted heading" extension of V1), never
fuzzy matching.

### Category 3 — contradiction, needs authorial ruling (10)
Body heading text differs from frontmatter title text. These are genuine
frontmatter/body disagreements; the canonical title must be decided by Dale.

Terse evocative headings (may be intentional alternates — Category 2 — pending
Dale's confirmation):
- `scene_16_the_baptist_s_choice` — body "The Choice" vs "The Baptist's Choice"
- `scene_35_carmichael_feels_it` — "The Feeling" vs "Carmichael Feels It"
- `scene_41_sandi_draws_a_line` — "The Line" vs "Sandi Draws a Line"
- `scene_43_one_writes_the_rule` — "The Rule" vs "One Writes the Rule"
- `scene_47_one_refuses_the_stage_again` — "The Refusal" vs "One Refuses the Stage Again"
- `scene_49_sandi_choses_silence` — "The Silence" vs "Sandi Chooses Silence"

Substantive differences (almost certainly stale working titles):
- `scene_24_one_and_sandi_go_public` — "The Minimal Appearance" vs "One and Sandi Go Public"
- `scene_64_the_terms_of_silence` — "The Terms of Silence" vs "Drafting the Terms of Silence"
- `scroll_conscience_04_decoy_detection` — "On Decoy Rooms" vs "Decoy Detection"
- `scroll_ai_black_box_rule_02_verify_the_voice` — "AI & Power: Verify the Voice"
  vs "AI — Black Box Rule 02: Verify the Voice"

Correction location: FRONTMATTER or SOURCE BODY (whichever title Dale rules
canonical), never display logic — a contradiction cannot be fixed by hiding.

### Category 4 — production annotation, must leave public display (3)
- `scene_56_the_compliance_patch` — "Scene: The Compliance Patch (Reframed:
  de-risking, not attacking)"
- `scene_59_the_pregnancy_weaponized` — "Scene: The Pregnancy Weaponized
  (Reframed: One refuses spectacle AND refuses escalation)"
- `scene_60_the_warrant_rumor` — "Scene: The Warrant Rumor (Reframed: due process
  as a stabilizer, not a weapon)"

The "(Reframed: …)" tail is an authorial note, not a title. Correction location:
SOURCE BODY (strip the parenthetical from the heading line, keeping the title) —
or, less preferably, display logic.

---

## Recommendation (for Dale's ruling)

- Categories 0/1 (40 entries) need nothing now.
- Category 4 (3 entries): strip the "(Reframed: …)" tail from the source heading —
  a small, well-scoped hygiene edit, safe to batch.
- Category 3 (10 entries): needs a per-title ruling (frontmatter vs body). The six
  terse headings may be intentional scene-names; the four substantive cases are
  almost certainly stale working titles.

No correction is proposed in this audit; V2 token centralization can proceed after
Dale rules on Category 3 and 4.
