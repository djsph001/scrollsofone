# Final Editorial-Hygiene Checkpoint

Date: 2026-08-18
Author: Lumen (agent), per Dale's Cat A / B1 / B2 / gate rulings.
Status: EXECUTED locally; not pushed. Two rule-#5 items remain OPEN (see below).

Scope: apply all heading corrections, strip the four self-filename remnants,
de-duplicate the three concatenations per the compare-then-act rules, and
strengthen the hygiene gate. Two embedded blocks were found to contain divergent
or standalone-only prose and were STOPPED for authorial ruling, per rule #5.

---

## Cat A — heading corrections (9, done)

- scene_29 "The Sign" → "The Baptist Sends a Sign"
- scene_carmichael "Carmichael Alone" → "Carmichael Alone After Confrontation"
- scroll_ai_black_box_rule "# Scroll of Conscience" → "# Scroll of AI: Black Box Rule"
- scroll_ai_machine_and_the_boy "# Scroll of Origins / AI & Power" → "# Scroll of AI: The Machine and the Boy"
- five "Scroll on …" entries: "Scroll: On X" → "Scroll on X" (Mercy, Naming, Privacy, Returning, Warm Knife).

## Cat B1 — self-filename remnants (4, done)

Removed the "⸻" divider + own-filename line from Scene 10, Scene 51, Scene 57,
Scene 63. Literary heading + prose preserved. (Scene 57's own "(Reframed: …)"
heading annotation was also stripped so it satisfies the gate.)

## Cat B2 — concatenations (compare → act)

Removed (verified):
- Scene 57 block from Scene 56 — prose EXACT match (72/72 lines).
- Scene 59 block from Scene 56 — prose identical except one "---------"
  separator line (formatting-only; standalone controls).
- Scene 39 block from Scene 38 — prose EXACT match (98/98 lines).

STOPPED (rule #5 — do not discard without a ruling):
1. Scene 58 block inside Scene 56 is a DIFFERENT, shorter draft of "The Targeted
   Leak" (42 prose lines vs 181 in the standalone; 37 lines exist only in the
   embedded copy — e.g. "Screenshots. PDFs. Audio clips. 'Internal emails.'",
   "Rina went straight to metadata.", "'No headers,' she said. 'No message IDs.
   PDF properties are synthetic.'"). Substantive prose would be lost by removal.
2. "Scroll of Conscience III: Conscious Responsibility" embedded in
   scroll_baptist_01 has NO standalone entry anywhere — it is the only copy
   (~40 lines; "Conscience is not a feeling. It is a duty. … You do not outsource
   your moral judgment to a crowd."). Removing it would delete a whole scroll.

## Hygiene gate — strengthened (done)

check-site-data.mjs now fails a public body if an unmistakable `.md` filename line
or an explicit "(Reframed: …)" annotation appears ANYWHERE (not only at the
start). Detection is narrow; cleanup remains allowlist-driven.

## Gate results

- npm test: 50/50 pass.
- lint: clean.
- check:canon: FAILS on the two rule-#5 blocks (expected — the gate is correctly
  flagging the two unresolved embedded blocks):
  - scroll_baptist_01_first_counsel → "SCROLL_CONSCIENCE_03_CONSCIOUS_RESPONSIBILITY.md"
  - scene_56_the_compliance_patch → "SCENE_58_THE_TARGETED_LEAK.md" + "(Reframed: …)"
- build (build-ssg.sh) stops at check-site-data on the same two entries; derived
  data (canon-manifest.json, publicEntries.json) regenerated cleanly (118 heads).

## Additional finding (out of authorized scope — flagged)

Scene 10 and Scene 51 still open with an authorial transition line that was
already present before this checkpoint:
- Scene 10: "Absolutely. Next is where the horror becomes procedural—…"
- Scene 51: "Absolutely. Here are clean, fully rephrased versions of SCENE_51–
  SCENE_55 with all 'Fourth Branch' language removed…"

These are production/AI scaffolding, not prose. Not removed here (only the
divider + filename were authorized); awaiting a ruling.

## Open items for Dale

Rule on the two STOPPED blocks (scene_58 divergent draft; conscience_03 unique
scroll) and the two "Absolutely…" opening lines. Until then check:canon/build
stay red on the two blocks — intentionally, so unresolved residue cannot ship.
