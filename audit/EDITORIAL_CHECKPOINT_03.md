# Editorial Checkpoint 03 — Homepage Identity & Stats (F11 + F14), Sandi "complicity" correction

Date: 2026-08-18
Author: Lumen (agent), per Dale's rulings.
Status: CLOSED (2026-08-18). Deployed to scrollsofone.com at commit e8ca4de; all
live verifications passed.

Scope: three rulings — (1) remove "complicity" from Sandi's synthesis copy, folded
in from the CP02 closure; (2) make the homepage governing description exact and
singular (F11); (3) replace the redundant 118/118 stat pair with two distinct facts
(F14). No canon changes; reader-facing synthesis and the homepage only.

---

## Rulings (authoritative)

### Sandi — "complicity" → "entanglement" (folded from CP02 closure)
In ordinary usage "complicity" means participation in wrongdoing; it cannot serve
as a synonym for proximity or entanglement. Remove it from both locations:
- Role line: "a political actor with knowledge, entanglement, and agency."
- Role-in-conflict: "a political actor shaped by proximity to power, with
  knowledge and agency of her own."

### F11 — Homepage governing description (exact, singular)
Governing description:
> A literary archive from a world where truth can be manufactured, and
> verification has become an act of conscience.

Keep "Who can you believe?" as the headline. Remove or subordinate competing
descriptions rather than repeating the same premise three ways (the old hero lead
"conscience is no longer an abstraction…", the meta description "…knowing whom to
believe", and the title-tag tagline "A Universe of Conscience and Contested Truth").

### F14 — Distinct homepage stats
Replace the redundant 118/118 pair with two genuinely different facts:
- 118 canonical works
- 60 scenes in sequence

## Execution (mechanical changes)

1. `src/characters.js`: Sandi role line and roleInConflict — "complicity" removed,
   replaced with "entanglement" (role) and "shaped by proximity to power, with
   knowledge and agency of her own" (roleInConflict).
2. `src/LandingPage.jsx`: hero lead → identity line (exact); meta description →
   identity line; `<title>` simplified to "Scrolls of One — Who Can You Believe?";
   stats → "Canonical works" (118) + "Scenes in sequence" (60, computed from the
   numbered scene spine 08–67).

Expected gate result: public heads stay 118; check:canon/test/lint/build green;
homepage stats render 118 / 60; identity line present exactly once as the
governing description.

## Execution results (2026-08-18 — CLOSED: pushed & deployed)

- Deploy commit: e8ca4de (origin/master). Live fingerprint: app-Bh-rXcui.js
  (content-hash matches local build — Netlify serving the new commit).
- Gates: check:canon PASS (118 heads, 0 warnings); 31/31 tests; lint clean;
  build 126 URLs; sitemap 126.
- Live verification passed: title "Scrolls of One — Who Can You Believe?";
  identity line once visible (lead) + once in metadata; old premise language gone;
  stats 118 canonical works + 60 scenes in sequence (both derived from data, not
  hardcoded); "complicity" and "morally implicated" absent from bundle; Sandi's
  revised role + roleInConflict live; working tree clean.

## Open items (carried forward)
- None in this checkpoint's scope. Fiction/real-world colophon (from F9) remains a
  future site-level task.
