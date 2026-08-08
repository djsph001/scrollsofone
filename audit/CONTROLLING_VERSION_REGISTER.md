# Controlling-Version Register

**Scope:** Records which version controls where the canon contains forks, duplicates, or supersession, and which questions remain open for authorial ruling. This file lives in `audit/`, **outside `canon/`** — it is a record *about* canon, not canon itself, and is deliberately not scanned by `build-canon.mjs`.

**Governing rule:** Screen documents (anything under `screen/`) inherit from canon and may not establish new canon facts. Where this register and a screen document disagree, the register controls.

**Last validated:** `build-canon.mjs ./canon --check` → 138 entries, passed, against `master` @ `e2f82ee`. Migration complete: 45 standardized moves, 6 retained archive IDs, 131 canon-status entries.

---

## 1. Resolved by the author's own metadata (`supersedes`)

These forks are self-declaring in frontmatter; no ruling was needed beyond reading the field. The superseding file is the head; the superseded file is retained but marked non-head by the loader.

| Group | Controlling (head) | Superseded / retained | Basis |
|---|---|---|---|
| Boy Who Believed | `scroll_origins_boy_who_believed` (first-person) | `origins_the_boy_who_believed` (third-person) | B declares `supersedes: origins_the_boy_who_believed` |
| Technology / Conscience | `scroll_conscience_that_technology_shall_bow_to_life` | `scroll_conscience_technology_serves_life` | head declares supersession |
| Origins XII | `scroll_origins_xii_the_haitian_son` | `scroll_of_origins_xii` | head declares `supersedes: scroll_of_origins_xii` |

**Downstream consequence (resolved):** Prologue V2 revised 2026-08-07. Opening narration reconciles to the controlling first-person head ("Before they called me dangerous / Before they called me prophet"). Retrospective narrator labeled OLDER ONE (V.O.); THE VOICE remains a distinct, unlocated present-tense presence. Prologue now presumes One's survival to a narrating age — inherited from canon, not established by the screen doc.

---

## 2. Resolved as NOT forks (distinct by design)

| Apparent duplicate | Ruling | Basis |
|---|---|---|
| `scroll_origins_when_the_machine_spoke_back` vs `scroll_ai_machine_and_the_boy` | **Distinct scrolls.** Same event, two scroll categories: Origins (Phase 3) and AI & Power (Phase 10). `supersedes: null` correct on both — neither supersedes the other. | RENAME_MAP category assignment |
| `SCROLL_AI_TECHNOLOGY_SHALL_BOW_TO_LIFE` (arc 5) | **Distinct; scheduled for archive** (RENAME_MAP Phase 4). Not part of the Conscience fork above. | RENAME_MAP |

**Method note:** same event ≠ fork when scroll categories differ by design. `supersedes: null` on two same-arc files can be correct.

---

## 3. Resolved this audit (mechanical pass @ `1d88ea8`)

| Item | Ruling | State |
|---|---|---|
| BIO_SANDI | Was mismarked "DUPLICATE (contains One bio)"; file actually holds the Sandi profile. Promoted to `status: canon`. | Done, pushed |
| Scenes 12 / 29 / 31 | Not missing — each was **embedded** in a host file. Extracted verbatim to `arc:4` scene files; `source_extracted_from` recorded in frontmatter; cross-reference left in each parent. | Done, pushed |
| Scene 64 vs 67 (title collision) | **Two distinct scenes**, both arc 7, order-distinct, `supersedes:null`. Retitled for legibility: 64 → "Drafting the Terms of Silence"; 67 → "The Terms of Silence — Haiti". IDs and content unchanged. | Done, pushed |

Extraction sources: `scene_12_sandi_hears_it` ← `scroll_ai_black_box_rule_02_verify_the_voice`; `scene_29_the_baptist_sends_a_sign` ← `scroll_conscience_04_decoy_detection` (internal title "Scene: The Sign"); `scene_31_the_countermove` ← `scene_30_the_intern_disappears`.

**Authored prose in this pass:** three `summary:` lines only (required field). All scene bodies are verbatim. No renumbering, no rename migration, no new lore.

---

## 4. Resolved — structural rulings (authorial)

Locked by ruling, not metadata. These are the inheritance surface for the feature's structure.

| Question | Ruling |
|---|---|
| **Fourth Branch progression** | **Three-stage progression:** (1) One's private procedural method; (2) Witness Circles, mutual aid, and the Fourth Branch Ethic as decentralized civic practice; (3) eventual constitutional Fourth Branch proposal. Practice precedes proposal — One does not begin by campaigning for or preaching a new constitutional institution. |
| **Arc architecture (8 vs 9)** | **Eight arcs.** Former Arc 9 ("Contempt Weapon: Comedy as Repression") folds into Arc 8, retitled "Narrative and Contempt War." Scenes 48–50 belong to Arc 8. Validator remains limited to arcs 1–8. |
| **One's age** | **Fifties; exact age unspecified.** The manuscript controls. Already ratified: Prologue V2 corrected from 40s to 50s. |

## 5. Resolved — RENAME_MAP naming decisions (ratified @ `c237c23`)

| Item | Ruling |
|---|---|
| Origins numbering | Retain lore number `12` |
| Leadership VII | Retain `07` |
| On Spectacle and Power | Classify as a scroll |
| Love Series guide | Rename to `GUIDE_LOVE_SERIES.md` |

Migration is mechanical — file renames only, per the December 2024 plan with stale sections preserved. No prose edits, no canon changes.

## 6. Migration coverage

The rename migration closes the known malformed-extension gap by renaming `Scroll_of_the_Baptist_III_md.` to `SCROLL_BAPTIST_03_THE_DISAPPEARANCE.md`. Stable IDs remain unchanged; filenames are standardized independently of identity.

---

*This register is the certified inheritance surface. Feature treatment builds on this file, not on the scrolls directly.*
