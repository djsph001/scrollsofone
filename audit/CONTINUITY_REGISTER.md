# Continuity Register — Chronology (arc → order)

**Scope:** The controlling chronology document for the Voice of One canon. It maps every public canonical head by `arc → order`, separates the four chronology axes, and records authorial rulings plus any items left open. Lives in `audit/`, outside `canon/` — a record *about* canon, not canon itself.

**Status:** Read-only derivation + authorial rulings, 2026-08-17. No metadata or public-page changes were made to produce this file.

**Base:** commit `a678c7c` — 123 public canonical heads (`visibility: public`, `isHead: true`, `status: canon`).

---

## 1. The four chronology axes (controlling model)

| Axis | Source of truth | Meaning |
|---|---|---|
| **Diegetic chronology** | numbered scene spine **08–67** | event sequence — "what happens, in order." Scene numbers control; nothing else does. |
| **Thematic architecture** | **arcs 1–8** | thematic classification, **not** chronological phases. A scene's arc says which theme it serves, not where it falls in time. |
| **Collection order** | series-local **`order`** | position *within a series only*. For the Scenes series, `order` equals the scene-spine position; for every other series it orders that series' own works and is not globally unique across an arc. |
| **Unordered supporting material** | **null** order and/or null arc | profiles, references, thematic scrolls, standalone titled scenes. These are intentionally outside the spine; the chronology is a **partial ordering** here. |

Rule: a "gap" or "reversal" is only a chronology problem if it breaks the *diegetic spine*. Arc non-contiguity over the spine is thematic structure, not error.

---

## 2. Authorial rulings (2026-08-17)

1. **Scenes 48–50 belong to Arc 8.** The register's §4 ("Scenes 48–50 belong to Arc 8") was *not* a typo. These are the former Arc 9 "Contempt Weapon" scenes folded into Arc 8. Scenes 46–47 also remain in Arc 8. The eventual metadata correction is scenes 48, 49, 50: **Arc 6 → Arc 8**.
2. **Arc 8's controlling name is "Narrative and Contempt War."** "Congressional" is superseded chapter-map language.
3. **The numbered scene spine is the diegetic chronology.** Scene numbers 08–67 control event sequence. Arc numbers are thematic and must not be read as chronological phases.
4. **`order` is series-local, not globally unique within an arc.** Sandi I / Letter I, Baptist IV / Carmichael IV, and Black Box Rule / Fourth Branch are therefore **not** collisions. For Scenes, `order` = scene spine; for other series, it orders only that series.
5. **Null order is valid.** Profiles, references, thematic scrolls, and standalone scenes do not require invented positions.
6. **The two arc-null ordinals remain unchanged.** Decoy Detection 04 and Leadership VII keep their collection numbers; those describe series position, not arc placement.
7. **Preserve the three `cene_` IDs as stable public identifiers.** No ID/URL changes in the chronology checkpoint. Filenames may later be corrected independently, with clean `/scene/...` aliases redirecting to the stable legacy URLs.
8. **Arcs 1–7 use the short names** from the eight-arc scheme. Chapter-map prefixes ("The Spark", "Proof vs Flood", "Soft Repression", "The Offline Pivot") are **superseded historical labels only** — not carried forward.
9. **The eight-arc scheme is the intended successor to the nine-arc chapter map.** The archived map has no controlling authority over present scene placement; its scene→arc assignments are provenance, not current architecture.
10. **Scene 28 ("The Haitian Network") remains in Arc 7.** It is an early activation of the Haiti/Departure strand — intentionally thematic. It does not alter its diegetic position between scenes 27 and 29.

---

## 3. The eight arcs (fixed) and naming authority

Controlling scheme: **eight arcs.** Arc 8 is the folded "Narrative and Contempt War." Arcs 1–7 use the short names below (ruling 8); the fuller chapter-map labels in column 3 are superseded historical labels, not live alternatives.

| Arc | Controlling name | Superseded / alternative names |
|---|---|---|
| 1 | Reality is Editable | "The Spark: Reality is Editable" (chapter map) |
| 2 | Pregnancy Flashpoint | "The Public Flashpoint: Pregnancy becomes a battlefield" (chapter map) |
| 3 | Refusal Doctrine | "Refusal Doctrine: One rejects the stage" (chapter map) |
| 4 | Baptist Abduction | "Proof vs Flood: Verification is attacked" (chapter map) |
| 5 | Verification Culture | "The Offline Pivot: Witness Circles are born" (chapter map) |
| 6 | Regime Countermoves | "Soft Repression: Make the weather personal" (chapter map) |
| 7 | Haiti / Departure | "Fourth Branch becomes real: Mutual Aid + Ethic" (chapter map) |
| 8 | **Narrative and Contempt War** | "Congressional" (stale reference); "Narrative War" + "Contempt Weapon" (chapter map arcs 8–9) |

**Note on the chapter map:** `META_CHAPTER_MAP_V1.md` (archived) describes a **nine-arc** design whose own summary says "eight" — an internal inconsistency — and whose arcs 4–8 carry different names and a sequential scene→arc mapping. That nine-arc scheme is **superseded** by the eight-arc scheme above; the data already follows the eight-arc scheme, and the register's arc-8 ruling folds the former Arc 9 into Arc 8. The chapter map remains valuable as the source of the *thematic intent* for each scene (e.g. what "Comedy Weapon" means) but is not the controlling arc authority.

---

## 4. Full arc → order map (data as of base commit)

### Arc 1 — Reality is Editable (5)
| order | entry | series/kind |
|---|---|---|
| 1 | scroll_origins_i_basis_of_my_art | Origins/scroll |
| — | scroll_of_origins_the_artist_who_didnt_want_a_throne | Origins/scroll |
| — | scroll_origins_boy_who_believed | Origins/scroll |
| — | scroll_origins_when_the_machine_spoke_back | Origins/scroll |
| — | scroll_ai_machine_and_the_boy | AI & Power/scroll |

### Arc 2 — Pregnancy Flashpoint (9)
| order | entry | series/kind |
|---|---|---|
| 1 | love_series_letter_to_sandi_i_the_quiet_lobby | Love/letter |
| 1 | scroll_of_sandi_i | Sandi/scroll |
| 2 | scroll_of_sandi_ii_the_file_on_one | Sandi/scroll |
| 3 | scroll_of_sandi_iii | Sandi/scroll |
| 7 | love_kitchen_light | Love/letter |
| 8 | love_letter_to_sandi_viii_newsstand | Love/letter |
| — | dream_scroll_the_first_daughter | Love/scroll |
| — | scene_one_calls_his_mother | Scenes/scene |
| — | scene_public_fallout_pregnancy_discovery | Scenes/scene |

### Arc 3 — Refusal Doctrine (4)
| order | entry | series/kind |
|---|---|---|
| 1 | scroll_of_carmichael_i | Carmichael/scroll |
| 2 | scroll_of_carmichael_ii | Carmichael/scroll |
| — | scene_carmichael_alone_after_confrontation | Scenes/scene |
| — | scene_the_interrupted_meeting_revised | Scenes/scene |

### Arc 4 — Baptist Abduction (27)
| order | entry | series/kind |
|---|---|---|
| 1 | scroll_baptist_01_first_counsel | Baptist/scroll |
| 2 | scroll_of_the_baptist_ii | Baptist/scroll |
| 3 | scroll_of_the_baptist_iii | Baptist/scroll |
| 4 | scroll_of_the_baptist_iv | Baptist/scroll |
| 4 | scroll_of_carmichael_iv | Carmichael/scroll |
| 8–27 | scene_08_the_order … scene_27_the_decoy_room (20 scenes; 20 is `cene_20`) | Scenes/scene |
| 29, 31 | scene_29_the_baptist_sends_a_sign, scene_31_the_countermove | Scenes/scene |

### Arc 5 — Verification Culture (16)
| order | entry | series/kind |
|---|---|---|
| 1 | scroll_ai_black_box_rule | AI & Power/protocol |
| 1 | scroll_governance_01_the_fourth_branch | Governance/scroll |
| 2 | scroll_ai_black_box_rule_02_verify_the_voice | AI & Power/protocol |
| 30, 32–34, 37, 39, 43, 45 | scene_30 … scene_45 (8 scenes) | Scenes/scene |
| — | scroll_of_one_on_spectacle_and_power | Conscience/scroll |
| — | scroll_on_the_warm_knife_of_loyalty | Conscience/scroll |
| — | scroll_ai_on_the_fear_of_superintelligence | AI & Power/scroll |
| — | scene_carmichael_hears_the_scroll | Scenes/scene |
| — | scene_sandi_between_two_voices | Scenes/scene |

### Arc 6 — Regime Countermoves (11)
| order | entry | series/kind |
|---|---|---|
| 3 | scroll_of_carmichael_iii | Carmichael/scroll |
| 35, 36, 38, 40–42, 44, 48–50 | scene_35 … scene_50 (10 scenes) | Scenes/scene |

### Arc 7 — Haiti / Departure (21)
| order | entry | series/kind |
|---|---|---|
| 12 | scroll_origins_xii_the_haitian_son | Origins/scroll |
| 28, 51–67 | scene_28 + scene_51 … scene_67 (17 scenes; 62, 63 are `cene_62`/`cene_63`) | Scenes/scene |
| — | scroll_on_returning_without_becoming_the_story | Conscience/scroll |
| — | scene_the_letter_that_finds_them | Scenes/scene |

### Arc 8 — Narrative and Contempt War (15)
| order | entry | series/kind |
|---|---|---|
| 46, 47 | scene_46_the_first_public_hearing, scene_47_one_refuses_the_stage_again | Scenes/scene |
| — | scroll_of_one_the_scapegoat_ledger | Conscience/scroll |
| — | scroll_on_mercy_that_has_teeth | Conscience/scroll |
| — | scroll_on_naming_without_becoming_the_play | Conscience/scroll |
| — | scroll_on_privacy_when_the_record_demands_blood | Conscience/scroll |
| — | scroll_the_dagger_point | Conscience/scroll |
| — | scene_first_public_appearance | Scenes/scene |
| — | scene_the_counter_move | Scenes/scene |
| — | scene_the_counter_story | Scenes/scene |
| — | scene_the_dagger_point | Scenes/scene |
| — | scene_the_hearing_on_the_hearing | Scenes/scene |
| — | scene_the_inaugural_ballroom | Scenes/scene |
| — | scene_the_retaliation_move_duplicate | Scenes/scene |
| — | scene_the_warm_rescue | Scenes/scene |

*Per ruling 1, scenes 48–50 will move Arc 6 → Arc 8 when the metadata correction is applied (not yet done).*

### No arc (15)
| order | entry | series/kind |
|---|---|---|
| 4 | scroll_conscience_04_decoy_detection | Conscience/protocol |
| 7 | scroll_of_leadership_vii_the_means_are_the_message | Leadership/scroll |
| — | bio_one, bio_sandi, bio_baptist, additional_profile_for_baptist, the_baptist_s_character_file | Characters/profile |
| — | the_lonely_heart_of_the_prophet | Origins/scroll |
| — | scroll_of_conscience_no_one_may_summon_the_end | Conscience/scroll |
| — | scroll_conscience_that_technology_shall_bow_to_life | Conscience/scroll |
| — | scroll_of_one_the_philosopher_s_eyes | Conscience/scroll |
| — | scroll_leadership_servant_test | Leadership/scroll |
| — | scene_the_barbershop_test, scene_the_block_meeting | Scenes/scene |
| — | the_root_of_the_myth | Framing/reference |

---

## 5. Findings and dispositions

### 5a. The diegetic spine is complete and continuous
Scene numbers 08–67 are all present (60 scenes). The apparent gaps at 20, 62, 63 are the three `cene_` IDs (§5b), not missing scenes. Scenes 01–07 do not exist in the record; the spine begins at 08.

### 5b. Three mangled `cene_` IDs — ruled: preserve
`cene_20_the_safehouse`, `cene_62_the_process_comes_to_the_door`, `cene_63_the_meeting_with_the_gatekeepers` — stable public identifiers (ID and filename both drop the leading "s"). No change in this checkpoint; filenames may be corrected later with clean `/scene/...` redirects.

### 5c. Arc vs scene-number non-contiguity — ruled: thematic, not error
The numbered spine 08–67 is sliced non-contiguously by the arcs (e.g. scene 28 in Arc 7 numerically precedes Arc 4/5/6 scenes 29–50; scenes 46–47 in Arc 8 precede 48–50). Each arc's slice is internally monotonic. Per ruling 3, this is thematic structure, not chronology reversal.

### 5d. Duplicate `order` within an arc — ruled: series-local, not collision
Sandi I vs "Letter to Sandi I" (arc 2, order 1); Baptist IV vs Carmichael IV (arc 4, order 4); Black Box Rule vs Fourth Branch (arc 5, order 1). Per ruling 4, `order` is per-series; these are not collisions.

### 5e. Null orders — ruled: valid
Thematic scrolls, titled scenes, and profiles have null order by design (§1, "unordered supporting material").

### 5f. Orphaned ordinals — ruled: unchanged
`scroll_conscience_04_decoy_detection` (order 4) and `scroll_of_leadership_vii_the_means_are_the_message` (order 7) carry series-position numbers with arc null. Per ruling 6, unchanged.

### 5g. Scenes 48–50 arc placement — ruled: Arc 8, correction pending
Register §4 said "Scenes 48–50 belong to Arc 8"; the data has them in Arc 6. Ruling 1 confirms Arc 8. **Metadata correction deferred** (see §6). This is the only live divergence between the data and the controlling scheme.

---

## 6. Pending metadata corrections (deferred — do not apply in this checkpoint)

| Item | Correction | Status |
|---|---|---|
| scenes 48, 49, 50 | arc 6 → arc 8 | ruled, awaiting a future metadata pass |

No other metadata changes are authorized at this time.

---

## 7. Unresolved authorial questions

**None.** All items — the original seven and the three surfaced by the chapter-map reconciliation — are now ruled (§2). No open chronology questions remain at this commit.

---

## 8. Explicitly not done (this checkpoint)

- No renumbering, no arc/order/status/visibility changes, no public-page or route changes.
- No new connective events.
- `cene_` IDs unchanged; scene-spine unchanged.
