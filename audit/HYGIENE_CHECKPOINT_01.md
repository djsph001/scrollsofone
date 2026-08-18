# Hygiene Checkpoint 01 — Remove Leading Filename-Header Residue

Date: 2026-08-18
Author: Lumen (agent), per Dale's hygiene ruling.
Status: EXECUTED locally; not pushed.

Scope: remove the verified leading filename line from the 53 audited canon source
files (allowlist, not regex rewrite), and add a validation gate that rejects future
filename residue. Title headings are retained in source; V1's display helper may
suppress them only on an exact frontmatter match.

---

## Ruling

- Remove the verified leading filename line from all 53 canon source files.
- Use the audited 53-file allowlist — not a repository-wide regex rewrite.
- Handle the five variants explicitly per the census.
- Remove exactly the first residue line + any immediately associated separator
  blank line; touch no authored prose.
- Retain the following literary title heading in canon source.
- Let the existing V1 display helper suppress that heading only when it safely
  matches frontmatter.
- Do not delete title headings from source merely because the site has an H1.
- Report any newly exposed second-line heading that does not pass V1's exact
  duplicate-title test.

## Execution

1. Removed the leading filename line (+ adjacent blank lines) from the 53
   allowlisted files. All 53 removals were verified filename-shaped (`^…\.md$`);
   no prose line was touched. The five census variants (1 apostrophe/underscore,
   1 missing-SC, 3 SCENE/CENE) were handled by the same exact-first-line removal.
2. Added a hygiene gate to `scripts/check-site-data.mjs`: a public head whose body
   begins with an unmistakable filename line (`^[A-Z][A-Z0-9_'\u2019]*\.md$`) is
   rejected. Detection is narrow; cleanup remains allowlist-only.

## Gates

- build-canon: 138 entries → 118 public heads (unchanged).
- check:canon: PASS — 118 heads, 0 warnings, hygiene gate clean (0 residue).
- npm test: 43/43. lint: clean. build: 126 URLs, sitemap 126 (unchanged).

## Newly exposed second-line headings (report, not changed here)

53 title headings are now the first body line. V1's exact duplicate-title test:
- Suppressed by V1 (1): `scroll_of_one_the_philosopher_s_eyes`
  ("Scroll of One: The Philosopher's Eyes" exactly matches frontmatter modulo
  punctuation).
- Remain visible (52): mostly "Scene: X" / "Scroll of X: Y" headings that omit the
  scene number or reword — retained per ruling.

Flagged for a future editorial pass (NOT touched here):

A. Title drift — body heading text differs from frontmatter title text:
  - scene_16: "The Choice" vs "The Baptist's Choice"
  - scene_24: "The Minimal Appearance" vs "One and Sandi Go Public"
  - scene_35: "The Feeling" vs "Carmichael Feels It"
  - scene_41: "The Line" vs "Sandi Draws a Line"
  - scene_43: "The Rule" vs "One Writes the Rule"
  - scene_47: "The Refusal" vs "One Refuses the Stage Again"
  - scene_49: "The Silence" vs "Sandi Chooses Silence"
  - scroll_conscience_04: "On Decoy Rooms" vs "Decoy Detection"
  - scroll_ai_black_box_rule_02: "Verify the Voice" vs "Black Box Rule 02: …"
  - scroll_governance_01: "Governance I:" vs "Governance 01 —"

B. "(Reframed: …)" production notes embedded in headings:
  - scene_56 ("…de-risking, not attacking"), scene_59 ("…One refuses spectacle
    AND …"), scene_60 ("…due process as a stabilizer, not a …")

These are authorial; the checkpoint only certifies the filename removal.
