import React from "react"; // eslint-disable-line no-unused-vars -- required by SSG JSX transform
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { characters, characterKeys } from "./characters";
import SiteNav from "./SiteNav";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Newsreader:opsz,wght@6..72,400;6..72,500&family=Spline+Sans+Mono:wght@400;500&display=swap');
:root{background:#11100c;color:#eee6d5;color-scheme:dark}*{box-sizing:border-box}body{margin:0;background:#11100c}a{color:inherit}
.chub{--paper:#eee6d5;--dim:#b9af98;--line:#383225;--amber:#dda63b;min-height:100vh;background:radial-gradient(circle at 20% 6%,rgba(221,166,59,.07),transparent 28%),linear-gradient(180deg,#15130e,#0f0e0b 72%);color:var(--paper);font-family:'Newsreader',Georgia,serif}
.chub-hero{padding:clamp(52px,8vw,96px) clamp(22px,7vw,110px) clamp(28px,4vw,44px)}
.chub-kicker{font-family:'Spline Sans Mono',monospace;font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:var(--amber)}
.chub-title{font-family:'Fraunces',serif;font-weight:500;font-size:clamp(46px,8vw,96px);line-height:.92;letter-spacing:-.03em;margin:16px 0 14px}
.chub-lead{color:var(--dim);font-size:clamp(18px,2vw,23px);max-width:720px;line-height:1.45;margin:0}
.chub-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;padding:clamp(28px,4vw,48px) clamp(22px,5vw,72px) clamp(60px,8vw,110px)}
@media(max-width:720px){.chub-grid{grid-template-columns:1fr}}
.chub-card{display:flex;flex-direction:column;gap:12px;padding:28px 24px 24px;border:1px solid var(--line);background:rgba(24,22,16,.5);text-decoration:none;transition:border-color .2s,background .2s}
.chub-card:hover{background:#201c14;border-color:var(--amber)}
.chub-card:focus-visible{outline:2px solid var(--amber);outline-offset:2px}
.chub-role{font-family:'Spline Sans Mono',monospace;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--amber)}
.chub-name{font-family:'Fraunces',serif;font-weight:500;font-size:clamp(26px,3vw,36px);line-height:1.05;margin:0;color:var(--paper)}
.chub-intro{color:var(--dim);font-size:16px;line-height:1.5;margin:0;flex:1}
.chub-enter{font-family:'Spline Sans Mono',monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--dim);margin-top:8px}
.chub-card:hover .chub-enter{color:var(--amber)}
.chub-foot{padding:26px clamp(22px,7vw,110px);border-top:1px solid var(--line);font-family:'Spline Sans Mono',monospace;font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:#847d6c;display:flex;justify-content:space-between;gap:20px}.chub-foot a{color:var(--dim);text-decoration:none}
`;

export default function CharactersPage() {
  return (
    <>
      <Helmet>
        <title>Characters — Scrolls of One</title>
        <meta
          name="description"
          content="The four central characters of the Voice of One universe — who they are, where they stand, and where to begin reading."
        />
        <link rel="canonical" href="https://scrollsofone.com/characters" />
        <style>{CSS}</style>
      </Helmet>

      <main className="chub">
        <SiteNav active="characters" />

        <header className="chub-hero">
          <div className="chub-kicker">The Voice of One · Characters</div>
          <h1 className="chub-title">The Characters</h1>
          <p className="chub-lead">
            Four people hold the story together. Enter through any of them — each page carries an introduction, a role,
            and a spoiler-aware reading path.
          </p>
        </header>

        <div className="chub-grid">
          {characterKeys.map((key) => {
            const c = characters[key];
            return (
              <Link to={`/characters/${key}`} className="chub-card" key={key}>
                <span className="chub-role">{c.role}</span>
                <h2 className="chub-name">{c.name}</h2>
                <p className="chub-intro">{c.intro}</p>
                <span className="chub-enter">Read {c.shortName}'s record →</span>
              </Link>
            );
          })}
        </div>

        <footer className="chub-foot">
          <span>Scrolls of One · Characters</span>
          <a href="https://emergenceinstitute.live">A project of the Emergence Institute ↗</a>
        </footer>
      </main>
    </>
  );
}
