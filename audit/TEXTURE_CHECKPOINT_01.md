# Texture Checkpoint 01 — Evidence-Block & Verse Grain

Date: 2026-08-18
Author: Lumen (agent), per Dale's texture rulings.
Status: EXECUTED locally; not pushed.

Scope: minimal, restrained texture — grain + ledger rules on the homepage
evidence block (`.one-evidence`) and extremely faint grain on the EntryPage
reading surface (`.body`). No new palette, no raster assets, no motion, no
typography/layout changes, no representational imagery (no portraits,
illustrations, cinematic scenes, or decorative AI art).

---

## Rulings (verbatim in effect)

1. Scope minimal: texture `.one-evidence` + EntryPage `.body` only. Canon cards
   and Timeline untouched.
2. Intensity restrained: evidence block ≤4%; EntryPage grain 1–2%. Ledger rules
   belong ONLY in the evidence block, not behind long-form verse.
3. Redaction motif: SKIPPED (suggests censorship; could add unintended meaning).
4. Stamp: refine lightly — thin border, modest padding, ~-1deg rotation. Keep
   existing wording and the green verification color. No distressed-ink.

## Texture design (all code-generated — no raster, no image tool)

- Grain: a monochrome SVG `feTurbulence` data-URI (grayscale via
  `feColorMatrix type='saturate' values='0'`). NO hex color inside the SVG —
  it is pure grayscale. The fixed neutral ends map to the tokens:
  white `#ffffff` ↔ `--paper` `#eee6d5` (ivory highlight); black `#000000` ↔
  `--bg` `#11100c` (near-black shadow). CSS `opacity` tints/attenuates the
  monochrome grain (ruling option B — no interpolation inside the data URI).
- Ledger rules (evidence block only): `repeating-linear-gradient(0deg,
  var(--paper) 0 1px, transparent 1px 28px)` at the shared low opacity.
- Stamp: `border:1px solid var(--green); padding:4px 10px;
  transform:rotate(-1deg); display:inline-block` — keeps "● Canon verified"
  wording and the reserved verification green.

## Token / color mapping (for the bundle sanity check)

| Texture element | Value | Token / meaning |
|---|---|---|
| Grain SVG | grayscale `#ffffff`/`#000000` | white↔`--paper` `#eee6d5`, black↔`--bg` `#11100c` |
| Ledger rule | `var(--paper)` `#eee6d5` | aged-ivory ruled line |
| Stamp border | `var(--green)` `#829a7a` | verification (reserved) |

No new palette value is introduced; red `--rust` and green `--green` stay
reserved (green appears only as the stamp's verification border/ink).

## Files changed

- `src/LandingPage.jsx` — `.one-evidence::after` (grain + ledger at 4%),
  `.one-stamp` (border/padding/rotate).
- `src/pages/EntryPage.jsx` — `.body::before` (grain at 1.5%).
- `scripts/check-bundle.mjs` — added texture sanity: no raster assets in
  `dist/assets`, and the grain SVG data-URI must be monochrome (no hex).

## Verification (executed — results)

- Gates: 50/50 tests; check:canon 119 heads/0 warnings; lint clean; build 127
  URLs / sitemap 127; bundle-boundary + texture sanity PASS.
- Bundle sanity (now enforced in `check-bundle.mjs`): no raster assets in
  `dist/`; grain SVG data-URI is monochrome — `feTurbulence` present ×2
  (evidence + verse), zero `#` hex inside the URI.
- Screenshots (headless Chrome, genuine viewports):
  - desktop 1280×800 — evidence block shows the faint ruled-ledger texture and
    a bordered "● Canon verified" stamp; palette intact.
  - mobile 375×812 — single-column, no horizontal overflow, text wraps cleanly.
  - verse 1280×800 — verse fully legible; grain imperceptible at 1.5% opacity
    (correct per the "extremely faint" ruling).
- Stamp: `border:1px solid var(--green)`, `padding:4px 10px`,
  `transform:rotate(-1deg)` applied; the −1deg tilt is imperceptible by design
  ("approximately").
