# Final Editorial-Hygiene Audit (Read-Only)

Date: 2026-08-18
Author: Lumen (agent).
Status: AUDIT ONLY — no files changed. This is the final decision surface before
V2 design-token centralization. It quotes residue with context and proposes exact
minimal corrections; none are applied here.

---

## 1. Scene 56's three embedded "(Reframed: …)" passages

These are AUTHORIAL ANNOTATIONS (production notes describing how each event was
reframed), not in-universe scene material. Each sits directly under an embedded
source-filename line inside a concatenated authoring sheet:

    SCENE_57_THE_BACKCHANNEL.md
    Scene: The Backchannel (Reframed: "contain the noise," not "destroy One")
    "Carmichael didn't go after One in public."

    SCENE_58_THE_TARGETED_LEAK.md
    Scene: The Targeted Leak (Reframed: "contamination attempt," One stays statesmanlike)
    "The leak hit at 6:42 a.m."

    SCENE_59_THE_PREGNANCY_WEAPONIZED.md
    Scene: The Pregnancy Weaponized (Reframed: One refuses spectacle AND refuses escalation)
    "It didn't start as cruelty."

Structural finding: scene_56's body (≈10k chars) is a concatenation of scenes
56–59. Scene 56's own prose comes first, then scenes 57, 58, 59 are embedded in
full — each with its own filename header, heading, and prose. Scenes 57–59 also
exist as separate public entries, so scene_56's body duplicates them.

## 2. Nine embedded filename lines (the leading-line census under-counted)

The hygiene census detected only LEADING filename lines (first body line). Nine
embedded `.md` lines remain, in two shapes:

A. Self-filename after a "⸻" divider (own filename as a second header block):
   - scene_10_the_harvest (line 5), scene_51_the_first_public_service (line 5),
     scene_57_the_backchannel (line 3), cene_63_the_meeting_with_the_gatekeepers
     (line 3).

B. Cross-reference concatenation (one body embeds another entry's filename +
   content):
   - scene_56_the_compliance_patch embeds scenes 57/58/59 (lines 126/280/363).
   - scene_38_the_cost embeds scene_39 (line 198).
   - scroll_baptist_01_first_counsel embeds a conscience scroll (line 96).

## 3. Four drifted/mislabeled headings (frontmatter controls)

| entry | body heading | frontmatter title | exact correction |
|---|---|---|---|
| scene_29_the_baptist_sends_a_sign | Scene: The Sign | Scene 29 — The Baptist Sends a Sign | Scene: The Baptist Sends a Sign |
| scene_carmichael_alone_after_confrontation | Scene: Carmichael Alone | Scene — Carmichael Alone After Confrontation | Scene: Carmichael Alone After Confrontation |
| scroll_ai_black_box_rule | # Scroll of Conscience | Scroll of AI — Black Box Rule | # Scroll of AI: Black Box Rule |
| scroll_ai_machine_and_the_boy | # Scroll of Origins / AI & Power | Scroll of AI — The Machine and the Boy | # Scroll of AI: The Machine and the Boy |

## 4. Mercy case — typographic

Title "Scroll on Mercy That Has Teeth" vs heading "Scroll: On Mercy That Has
Teeth": identical words, differing only by a colon after "Scroll" and "On" vs "on"
capitalization. Purely typographic. The same pattern recurs on the other four
"Scroll on …" entries (naming, privacy, returning, warm knife). Correction: heading
→ match title ("Scroll on Mercy That Has Teeth", etc.), dropping the colon and
lowercasing "on".

## 5. Proposed corrections (exact, minimal — no prose)

Cat A — heading text only (safe, batchable):
  1. scene_29: "Scene: The Sign" → "Scene: The Baptist Sends a Sign"
  2. scene_carmichael_alone: "Scene: Carmichael Alone" → "Scene: Carmichael Alone After Confrontation"
  3. scroll_ai_black_box_rule: "# Scroll of Conscience" → "# Scroll of AI: Black Box Rule"
  4. scroll_ai_machine_and_the_boy: "# Scroll of Origins / AI & Power" → "# Scroll of AI: The Machine and the Boy"
  5. five "Scroll on …" entries: "Scroll: On X" → "Scroll on X"

Cat B — embedded filename lines (needs authorial ruling, two sub-decisions):
  - B1 (self-filename after "⸻"): scene_10, scene_51, scene_57, cene_63. Propose
    stripping the redundant "⸻" + filename block so the heading is the first line,
    consistent with the 53 already cleaned.
  - B2 (cross-reference concatenation): scene_56 (embeds 57–59), scene_38 (embeds
    39), scroll_baptist_01 (embeds a conscience scroll). These bodies contain
    another entry's full text. Authorial question: are these concatenations
    intentional (the "compliance patch" is meant to gather the reframed scenes), or
    residue to be split/de-duplicated? If intentional, strip only the embedded
    filename lines + "(Reframed: …)" annotations; if residue, the embedded scenes
    should be removed from the host body.

No correction here touches prose. Each awaits Dale's ruling.
