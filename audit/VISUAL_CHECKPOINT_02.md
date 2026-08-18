# Visual Checkpoint 02 — Design-Token Centralization (V2)

Date: 2026-08-18
Author: Lumen (agent), per Dale's V2 rulings (see "Rulings" below).
Status: CLOSED (2026-08-18). Deployed to scrollsofone.com at commit 5261cde; all
live verifications passed. Closure commit held locally, not pushed.

Scope: collapse the two drifted palettes into ONE centralized token source using
the homepage palette as the controlling family; remove verified dead navigation
CSS and the orphaned Vite scaffold. This is centralization + drift removal, NOT
a redesign. No typography, spacing, layout, breakpoint, footer, motion, or
texture changes. No imagery.

---

## Rulings (authorial — recorded verbatim in effect)

1. Verse body `#d4ccbf` stays a distinct `--text` token (long-form reading tier;
   NOT collapsed into `--dim`).
2. Seed status moves OFF green. New muted earth/ochre `--status-seed: #a48b67`
   (contrast vs `--bg` = 5.86:1, AA). Green stays reserved for verified/confirmed.
3. `--faint` = `#8b8470` (higher contrast). Homepage footer faint is RAISED to
   this shared value rather than lowering explorer metadata to the 4.65 floor.
4. Tokens live in `src/index.css`, the single global source imported once by
   `main.jsx`. No `tokens.css`.
5. Delete orphaned Vite scaffold: `src/App.jsx`, `src/App.css`, and unused
   `src/assets/vite.svg` + `src/assets/react.svg` (confirmed 0 references).

## Controlling token set (`src/index.css` `:root`)

Neutrals:
- `--bg` #11100c · `--bg-top` #15130e · `--bg-bottom` #0f0e0b
- `--paper` #eee6d5 (ivory) · `--text` #d4ccbf (verse) · `--dim` #b9af98 · `--faint` #8b8470

Lines & surfaces:
- `--line` #383225 · `--line-2` #3f3826
- `--surface` #201c14 · `--surface-2` #262115 · `--surface-input` #1d1a12
- `--veil` rgba(31,28,20,.4) · `--veil-strong` rgba(31,28,20,.6) · `--veil-node` rgba(24,22,16,.5)
- `--scrim` rgba(8,7,4,.72)

Accent:
- `--amber` #dda63b · `--amber-dim` #c79a4a
- `--amber-glow` rgba(221,166,59,.08) (standardizes the .07/.08 drift to .08)
- `--amber-veil` rgba(221,166,59,.06) · `--amber-border` #4d3f22 · `--on-amber` #17140d

Semantic (reserved):
- `--green` #829a7a (verification/confirmed ONLY)
- `--rust` #c87e57 (warning/repair/conflict ONLY)
- `--slate` #8aa0ad (draft status) · `--status-seed` #a48b67 (seed status)

## Old → new mapping (drift collapsed)

- amber `#e0a838` → `#dda63b`
- ivory `#ebe3d1` → `#eee6d5`
- background `#15130d` → `#11100c`
- dim `#b4ab93` → `#b9af98`
- faint `#847d6c` → `#8b8470`  (raised, not lowered — ruling 3)
- line `#322c1f` → `#383225`
- hover `#211d14` → `#201c14`
- glow `rgba(221,166,59,.07)` → `rgba(221,166,59,.08)`
- seed `#7fa07c` → `#a48b67`  (off-green — ruling 2)

Preserved as distinct (not drift): `--text` #d4ccbf, `--surface-input` #1d1a12,
Timeline 8 arc colors + fallback #8a8070, `--amber-dim` #c79a4a, `--line-2`
#3f3826, the two veil opacities, `--scrim`, `--amber-veil`, `--amber-border`,
`--on-amber`, `--surface-2` #262115.

## Files changed

- `src/index.css` — replaced Vite boilerplate with tokens + minimal reset.
- `src/SiteNav.jsx`, `src/LandingPage.jsx`, `src/TimelinePage.jsx`,
  `src/CharacterPage.jsx`, `src/CharactersPage.jsx`, `src/CanonExplorer.jsx`,
  `src/pages/EntryPage.jsx` — raw hex → `var(--token)`; component-local `--*`
  blocks removed; dead nav CSS removed.
- Deleted: `src/App.jsx`, `src/App.css`, `src/assets/vite.svg`, `src/assets/react.svg`.

## Dead CSS removed

- LandingPage: `.one-nav`, `.one-mark`, `.one-mark span`, `.one-navlinks`,
  `.one-navlinks a`, `.one-navlinks a:hover` + responsive
  `.one-navlinks a:first-child{display:none}`.
- TimelinePage: `.tl-nav`, `.tl-mark`, `.tl-mark span`, `.tl-navlinks`,
  `.tl-navlinks a`, `.tl-navlinks a:hover`.
- CharacterPage: `.chars-mark span{color:var(--amber)}` (span child never rendered).

## Verification (executed — results)

- Gates: `npm test` 50/50 PASS; `check:canon` PASS (139 entries, 119 public
  heads, 0 editorial warnings, boundary clean); `lint` clean; `build` PASS
  (127 URLs, sitemap 127, bundle-boundary clean).
- Contrast (recomputed): `--status-seed #a48b67` vs `--bg` = 5.86:1 (AA);
  `--faint #8b8470` vs `--bg` = 5.11:1 (raised from 4.65); all other pairs
  remain ≥ AA.
- Token completeness: 26 tokens defined in `index.css`, 26 referenced in
  components — 1:1, ZERO dangling references, ZERO unused tokens.
- Bundle sanity scan (grep `dist/assets/*`): 8/8 old drifted literals ABSENT
  (#e0a838, #ebe3d1, #15130d, #b4ab93, #322c1f, #847d6c, #211d14, #7fa07c);
  6/6 dead selectors ABSENT (.one-nav/.one-mark/.one-navlinks/.tl-nav/.tl-mark/
  .tl-navlinks); key token values present exactly once each (in `index.css`).
- Visual: local `dist/` served and screenshot-verified — homepage renders the
  intended warm near-black / aged-ivory / muted-amber palette with no broken
  styles; pre-rendered /canon and /timeline HTML carry the tokenized `var(--…)`
  CSS and zero old hex.

## Notes / flags

- `--faint` raising (4.65→5.11) is a deliberate, authorial contrast improvement
  that slightly brightens footer/meta text vs the pre-V2 homepage.
- Seed moves off-green; seed entries are currently absent from the public
  projection, so no visible change today — token is correct before future use.
- The 1%-opacity glow standardization (.07→.08) is visually imperceptible.

## Deployment & live verification (2026-08-18 — CLOSED: pushed & deployed)

- Deploy commit: 5261cde (origin/master). Live fingerprint: app-CoXIsYut.js /
  app-CAcd_RxW.css (content-hash matches local build — Netlify serving V2).
- Live checks: homepage renders the warm near-black / aged-ivory / muted-amber
  palette with no broken styles and no horizontal overflow (1536px viewport);
  /canon reports 119 public works · 119 canonical heads; sitemap 127 URLs; all
  sampled routes return 200 (/ /canon /timeline /characters /characters/one
  /scroll/…); zero old drifted hex in the live JS/CSS bundle.
- Breakpoints verified present in served HTML (850/520/640/820/880/720px); the
  removed `#root{width:1126px;…}` Vite rule was confirmed inert (vite-react-ssg
  mounts to no `#root` element) — its deletion is scaffold cleanup, not layout.
- Mobile: V2 changed zero layout/breakpoint/typography values (diff shows only
  color swaps + dead-selector removal + inert scaffold deletion); a true
  mobile-viewport screenshot was not achievable in the headless browser
  (`resizeTo` set outerWidth but not innerWidth), so mobile parity is established
  by the zero-layout-diff proof rather than a pixel screenshot.
