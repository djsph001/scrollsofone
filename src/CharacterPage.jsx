import React from "react"; // eslint-disable-line no-unused-vars -- required by SSG JSX transform
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import data from "./entries.json";
import { characters, characterKeys } from "./characters";
import { fromForCharacter } from "./navigation";
import SiteNav from "./SiteNav";

const ENTRIES = data.entries;
const byId = Object.fromEntries(ENTRIES.map((e) => [e.id, e]));

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Newsreader:opsz,wght@6..72,400;6..72,500&family=Spline+Sans+Mono:wght@400;500&display=swap');
:root{background:#11100c;color:#eee6d5;color-scheme:dark}*{box-sizing:border-box}body{margin:0;background:#11100c}a{color:inherit}
.chars{--paper:#eee6d5;--dim:#b9af98;--line:#383225;--amber:#dda63b;--green:#829a7a;min-height:100vh;background:radial-gradient(circle at 82% 9%,rgba(221,166,59,.08),transparent 28%),linear-gradient(180deg,#15130e,#0f0e0b 72%);color:var(--paper);font-family:'Newsreader',Georgia,serif}
.chars-mark{text-decoration:none}.chars-mark span{color:var(--amber)}
.chars-subnav{display:flex;flex-wrap:wrap;gap:14px;padding:14px clamp(22px,5vw,72px);border-bottom:1px solid var(--line);font-family:'Spline Sans Mono',monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase}
.chars-tabs{display:flex;gap:18px;flex-wrap:wrap}.chars-tabs a{color:var(--dim);text-decoration:none}.chars-tabs a:hover{color:var(--amber)}.chars-tabs a.on{color:var(--amber)}
.chars-hero{padding:clamp(56px,9vw,110px) clamp(22px,7vw,110px) clamp(40px,6vw,70px);border-bottom:1px solid var(--line)}
.chars-kicker{font-family:'Spline Sans Mono',monospace;font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:var(--amber)}
.chars-name{font-family:'Fraunces',serif;font-weight:500;font-size:clamp(52px,9vw,118px);line-height:.9;letter-spacing:-.03em;margin:16px 0 12px}
.chars-role{color:var(--dim);font-size:clamp(18px,2vw,23px);max-width:760px;margin:0 0 26px}
.chars-intro{font-size:clamp(19px,2.2vw,26px);line-height:1.5;max-width:860px;color:var(--paper)}
.chars-grid{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(280px,.9fr);gap:clamp(30px,6vw,90px);padding:clamp(48px,7vw,90px) clamp(22px,7vw,110px)}
@media(max-width:880px){.chars-grid{grid-template-columns:1fr}}
.chars-section{margin-bottom:44px}
.chars-label{font-family:'Spline Sans Mono',monospace;font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:var(--amber);margin-bottom:16px}
.chars-section h2{font-family:'Fraunces',serif;font-weight:500;font-size:clamp(28px,3.4vw,42px);line-height:1.05;margin:0 0 18px;max-width:18ch}
.chars-body{color:var(--dim);font-size:18px;line-height:1.55;max-width:640px;margin:0}
.rel{display:grid;gap:14px}.rel-item{border-left:2px solid var(--line);padding:2px 0 2px 18px}.rel-item b{color:var(--paper);font-weight:600;font-family:'Fraunces',serif;font-size:19px}.rel-item p{color:var(--dim);margin:4px 0 0;font-size:16px;line-height:1.5}
.entry-list{display:grid;gap:2px}.entry-link{text-decoration:none;padding:14px 16px;border:1px solid var(--line);background:rgba(31,28,20,.4);transition:background .2s,border-color .2s}.entry-link:hover{background:#201c14;border-color:var(--amber)}.entry-link b{display:block;font-family:'Fraunces',serif;font-weight:500;font-size:19px;color:var(--paper)}.entry-link span{display:block;color:var(--dim);font-size:15px;margin-top:4px;line-height:1.45}
.path{list-style:none;margin:0;padding:0;counter-reset:p}.path li{counter-increment:p;display:flex;gap:16px;padding:13px 0;border-bottom:1px solid var(--line)}.path li:last-child{border-bottom:0}.path .n{font-family:'Spline Sans Mono',monospace;color:var(--amber);font-size:11px;padding-top:5px}.path .n:after{content:counter(p,decimal-leading-zero)}.path .tx a{color:var(--paper);text-decoration:none;font-family:'Fraunces',serif;font-size:19px;font-weight:500}.path .tx a:hover{color:var(--amber)}.path .tx .note{display:block;color:var(--dim);font-size:14px;margin-top:3px;font-family:'Newsreader',serif}
.chars-foot{padding:26px clamp(22px,7vw,110px);border-top:1px solid var(--line);font-family:'Spline Sans Mono',monospace;font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:#847d6c;display:flex;justify-content:space-between;gap:20px}.chars-foot a{color:var(--dim);text-decoration:none}
`;

export default function CharacterPage({ char }) {
  const c = characters[char];
  if (!c) {
    return (
      <>
        <Helmet>
          <title>Not in the record — Scrolls of One</title>
        </Helmet>
        <div className="chars">
          <div className="chars-hero">
            <p className="chars-kicker">Character</p>
            <h1 className="chars-name">Not in the record</h1>
            <p className="chars-intro">No character matches that name.</p>
            <p className="chars-body" style={{ marginTop: 22 }}>
              <Link to="/canon" className="chars-mark">← Back to the Canon</Link>
            </p>
          </div>
        </div>
      </>
    );
  }

  const resolve = (id) => byId[id] || { id, title: id, summary: "" };
  const pageTitle = `${c.name} — Scrolls of One`;
  const essentials = c.essentials.map(resolve).filter((e) => e.summary || e.title !== e.id);
  const path = c.readingPath.map((s) => ({ ...s, entry: resolve(s.id) }));

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content={`${c.name}: ${c.role}. A character guide from the Voice of One universe — introduction, role, relationships, and a spoiler-aware reading path.`}
        />
        <link rel="canonical" href={`https://scrollsofone.com/characters/${c.key}`} />
        <style>{CSS}</style>
      </Helmet>

      <main className="chars">
        <SiteNav active="characters" />
        <div className="chars-subnav" aria-label="Characters">
          <div className="chars-tabs">
            {characterKeys.map((k) => (
              <Link key={k} to={`/characters/${k}`} className={k === c.key ? "on" : ""}>
                {characters[k].shortName}
              </Link>
            ))}
          </div>
        </div>

        <section className="chars-hero">
          <div className="chars-kicker">Character · The Voice of One</div>
          <h1 className="chars-name">{c.name}</h1>
          <p className="chars-role">{c.role}</p>
          <p className="chars-intro">{c.intro}</p>
        </section>

        <div className="chars-grid">
          <div>
            <section className="chars-section">
              <div className="chars-label">Role in the conflict</div>
              <h2>Where {c.name.split(" ")[0]} stands</h2>
              <p className="chars-body">{c.roleInConflict}</p>
            </section>

            <section className="chars-section">
              <div className="chars-label">Relationships</div>
              <h2>Who {c.name.split(" ")[0]} is tied to</h2>
              <div className="rel">
                {c.relationships.map((r) => (
                  <div className="rel-item" key={r.name}>
                    <b>{r.name}</b>
                    <p>{r.text}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div>
            <section className="chars-section">
              <div className="chars-label">Essential scrolls &amp; scenes</div>
              <div className="entry-list">
                {essentials.map((e) => (
                  <Link className="entry-link" to={`/scroll/${e.id}?from=${fromForCharacter(c.key)}`} key={e.id}>
                    <b>{e.title}</b>
                    <span>{e.summary}</span>
                  </Link>
                ))}
              </div>
            </section>

            <section className="chars-section">
              <div className="chars-label">Spoiler-aware reading path</div>
              <ol className="path">
                {path.map((s) => (
                  <li key={s.id}>
                    <span className="n" />
                    <span className="tx">
                      <Link to={`/scroll/${s.id}?from=${fromForCharacter(c.key)}`}>{s.entry.title}</Link>
                      <span className="note">{s.note}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </div>

        <footer className="chars-foot">
          <span>Scrolls of One · {c.name}</span>
          <a href="https://emergenceinstitute.live">A project of the Emergence Institute ↗</a>
        </footer>
      </main>
    </>
  );
}
