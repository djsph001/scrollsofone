import React from "react"; // eslint-disable-line no-unused-vars -- required by SSG JSX transform
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import data from "./entries.json";
import { whoToCharacterKey } from "./characters";

const ARC_NAMES = {
  1: "Reality is Editable",
  2: "Pregnancy Flashpoint",
  3: "Refusal Doctrine",
  4: "Baptist Abduction",
  5: "Verification Culture",
  6: "Regime Countermoves",
  7: "Haiti / Departure",
  8: "Narrative and Contempt War",
};

const ARC_COLORS = {
  1: "#c9a227",
  2: "#b96a6a",
  3: "#c07f3f",
  4: "#a8935a",
  5: "#7a9472",
  6: "#6a7f9a",
  7: "#5f908a",
  8: "#8a72a0",
};

// The diegetic spine: numbered scenes 08–67, resolved by `order` (not ID), so
// the three legacy `cene_` IDs land at their correct positions.
const SPINE = data.entries
  .filter((e) => e.kind === "scene" && Number.isInteger(e.order) && e.order >= 8 && e.order <= 67)
  .sort((a, b) => a.order - b.order);

// Consecutive same-arc runs, strictly in spine order.
const runs = [];
for (const e of SPINE) {
  const last = runs[runs.length - 1];
  if (!last || last.arc !== e.arc) runs.push({ arc: e.arc, scenes: [e] });
  else last.scenes.push(e);
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Newsreader:opsz,wght@6..72,400;6..72,500&family=Spline+Sans+Mono:wght@400;500&display=swap');
:root{background:#11100c;color:#eee6d5;color-scheme:dark}*{box-sizing:border-box}body{margin:0;background:#11100c}a{color:inherit}
.tl{--paper:#eee6d5;--dim:#b9af98;--line:#383225;--amber:#dda63b;min-height:100vh;background:radial-gradient(circle at 18% 6%,rgba(221,166,59,.07),transparent 26%),linear-gradient(180deg,#15130e,#0f0e0b 72%);color:var(--paper);font-family:'Newsreader',Georgia,serif}
.tl-nav{display:flex;align-items:center;justify-content:space-between;gap:24px;padding:20px clamp(22px,5vw,72px);border-bottom:1px solid var(--line);font-family:'Spline Sans Mono',monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase}
.tl-mark{text-decoration:none}.tl-mark span{color:var(--amber)}
.tl-navlinks{display:flex;gap:20px;flex-wrap:wrap}.tl-navlinks a{color:var(--dim);text-decoration:none}.tl-navlinks a:hover{color:var(--amber)}
.tl-hero{padding:clamp(52px,8vw,96px) clamp(22px,7vw,110px) clamp(28px,4vw,44px)}
.tl-kicker{font-family:'Spline Sans Mono',monospace;font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:var(--amber)}
.tl-title{font-family:'Fraunces',serif;font-weight:500;font-size:clamp(46px,8vw,96px);line-height:.92;letter-spacing:-.03em;margin:16px 0 14px}
.tl-lead{color:var(--dim);font-size:clamp(18px,2vw,23px);max-width:720px;line-height:1.45;margin:0}
.tl-notice{margin:0 clamp(22px,7vw,110px);padding:14px 18px;border:1px solid #4d3f22;border-left:3px solid var(--amber);background:rgba(221,166,59,.06);color:var(--dim);font-size:15px;line-height:1.5;max-width:720px}
.tl-spine{list-style:none;margin:0;padding:clamp(28px,4vw,48px) clamp(22px,5vw,72px) clamp(60px,8vw,110px)}
.tl-run{padding:0 0 0 0;margin:0 0 22px}
.tl-arc{font-family:'Spline Sans Mono',monospace;font-size:10px;letter-spacing:.2em;text-transform:uppercase;display:flex;align-items:center;gap:12px;padding:10px 0 12px;color:var(--dim)}
.tl-arc:before{content:"";width:9px;height:9px;border-radius:50%;background:currentColor;flex:none}
.tl-scenes{display:grid;gap:1px;border:1px solid var(--line);border-radius:4px;overflow:hidden}
.tl-node{display:grid;grid-template-columns:64px 1fr;gap:0;background:rgba(24,22,16,.5);text-decoration:none;transition:background .2s}
.tl-node:hover{background:#211d14}
.tl-num{font-family:'Spline Sans Mono',monospace;font-size:12px;color:var(--amber);padding:18px 0 0 16px;border-right:1px solid var(--line)}
.tl-body{padding:16px 18px 16px 20px}
.tl-node h3{font-family:'Fraunces',serif;font-weight:500;font-size:clamp(18px,2vw,22px);line-height:1.15;margin:0 0 6px;color:var(--paper)}
.tl-summary{color:var(--dim);font-size:15px;line-height:1.45;margin:0}
.tl-chips{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}
.tl-chip{font-family:'Spline Sans Mono',monospace;font-size:9px;letter-spacing:.1em;text-transform:uppercase;text-decoration:none;color:var(--dim);border:1px solid var(--line);padding:4px 9px;border-radius:99px;transition:border-color .2s,color .2s}
.tl-chip:hover{color:var(--amber);border-color:var(--amber)}
.tl-foot{padding:26px clamp(22px,7vw,110px);border-top:1px solid var(--line);font-family:'Spline Sans Mono',monospace;font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:#847d6c;display:flex;justify-content:space-between;gap:20px}.tl-foot a{color:var(--dim);text-decoration:none}
@media(max-width:640px){.tl-nav{flex-wrap:wrap;gap:12px}.tl-navlinks{gap:14px}.tl-node{grid-template-columns:46px 1fr}.tl-num{padding:16px 0 0 12px;font-size:10px}.tl-body{padding:14px 14px 14px 14px}.tl-summary{font-size:14px}.tl-hero{padding-top:44px}.tl-title{font-size:44px}}
`;

export default function TimelinePage() {
  return (
    <>
      <Helmet>
        <title>Timeline — Scrolls of One</title>
        <meta
          name="description"
          content="The complete story sequence of the Voice of One universe — scenes 08 through 67 in diegetic order, grouped by narrative arc."
        />
        <link rel="canonical" href="https://scrollsofone.com/timeline" />
        <style>{CSS}</style>
      </Helmet>

      <main className="tl">
        <nav className="tl-nav" aria-label="Primary navigation">
          <Link className="tl-mark" to="/">
            <span>●</span> Scrolls of One
          </Link>
          <div className="tl-navlinks">
            <Link to="/canon">The Canon</Link>
            <Link to="/characters/one">Characters</Link>
            <Link to="/timeline">Timeline</Link>
          </div>
        </nav>

        <header className="tl-hero">
          <div className="tl-kicker">The Voice of One</div>
          <h1 className="tl-title">The Timeline</h1>
          <p className="tl-lead">
            The story in order — sixty numbered scenes, from the first counsel to the terms of silence. Arcs mark the
            theme each scene serves, not its place in time; the numbers are the sequence.
          </p>
        </header>

        <p className="tl-notice">This page presents the complete story sequence and contains structural spoilers.</p>

        <ol className="tl-spine">
          {runs.map((run, i) => {
            const color = ARC_COLORS[run.arc] || "#8a8070";
            return (
              <li className="tl-run" key={i}>
                <div className="tl-arc" style={{ color }}>
                  Arc {run.arc} — {ARC_NAMES[run.arc] || "—"}
                </div>
                <div className="tl-scenes">
                  {run.scenes.map((e) => (
                    <div className="tl-node" key={e.id} style={{ borderLeft: `3px solid ${color}` }}>
                      <span className="tl-num">{String(e.order).padStart(2, "0")}</span>
                      <div className="tl-body">
                        <Link to={`/scroll/${e.id}`}>
                          <h3>{e.title}</h3>
                        </Link>
                        <p className="tl-summary">{e.summary}</p>
                        <div className="tl-chips">
                          {(e.who || [])
                            .filter((w) => whoToCharacterKey[w])
                            .map((w) => (
                              <Link className="tl-chip" to={`/characters/${whoToCharacterKey[w]}`} key={w}>
                                {w}
                              </Link>
                            ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </li>
            );
          })}
        </ol>

        <footer className="tl-foot">
          <span>Scrolls of One · Timeline</span>
          <a href="https://emergenceinstitute.live">A project of the Emergence Institute ↗</a>
        </footer>
      </main>
    </>
  );
}
