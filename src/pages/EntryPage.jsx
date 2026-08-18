import React, { useState, useEffect } from 'react'; // eslint-disable-line no-unused-vars -- required by SSG JSX transform
import { useLocation, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import data from '../publicEntries.json';
import { whoToCharacterKey } from '../characters';
import { backLinkFor } from '../navigation';
import { SLUG_MAPS } from '../canonFilters';
import SiteNav from '../SiteNav';
import { bodyBlocks, stripDuplicateTitle } from '../bodyDisplay';

const ENTRIES = data.entries;

const STATUS_LABEL = { canon: 'Canon', draft: 'Draft', seed: 'Seed', repair: 'Needs repair' };

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Newsreader:opsz,wght@6..72,400;6..72,500&family=Spline+Sans+Mono:wght@400;500&display=swap');`;

const CSS = `
*,*:before,*:after{box-sizing:border-box;margin:0;padding:0}
html{background:var(--bg);color:var(--paper);font-family:'Newsreader',Georgia,serif;font-size:18px;line-height:1.75;-webkit-font-smoothing:antialiased}
body{min-height:100vh}
a{color:var(--amber);text-decoration:none}
a:hover{text-decoration:underline;text-underline-offset:3px}
h1,h2,h3{font-family:'Fraunces',serif;font-weight:500;line-height:1.2;color:var(--paper)}
h1{font-size:clamp(1.8rem,4vw,2.6rem)}
.page{max-width:740px;margin:0 auto;padding:44px 32px 60px}
.back{margin-bottom:24px;display:inline-block;font-family:'Spline Sans Mono',monospace;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--faint)}
.back:hover{color:var(--amber)}
.meta{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:16px;font-family:'Spline Sans Mono',monospace;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--faint)}
.status-canon{color:var(--amber)}.status-draft{color:var(--slate)}.status-seed{color:var(--status-seed)}.status-repair{color:var(--rust)}
.tags{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:22px}
.tag{font-family:'Spline Sans Mono',monospace;font-size:10px;letter-spacing:.06em;color:var(--dim);border:1px solid var(--line-2);padding:4px 9px;border-radius:2px}
a.tag{text-decoration:none}
a.tag:hover{text-decoration:none;border-color:var(--amber);color:var(--amber)}
.summary{font-size:19px;line-height:1.5;color:var(--paper);margin-bottom:26px;padding-bottom:22px;border-bottom:1px solid var(--line)}
.body{font-size:16px;line-height:1.65;color:var(--text);position:relative}.body:before{content:'';position:absolute;inset:0;pointer-events:none;opacity:.015;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")}
.body p{margin-bottom:0.75rem;white-space:pre-line}
.entry-next{margin-top:44px;padding-top:20px;border-top:1px solid var(--line);font-family:'Spline Sans Mono',monospace;font-size:11px;letter-spacing:.08em;text-transform:uppercase}
.entry-next-label{color:var(--faint);display:block;margin-bottom:12px}
.entry-next-links{display:flex;flex-wrap:wrap;gap:16px}
.entry-next-links a{color:var(--dim);text-decoration:none}
.entry-next-links a:hover{color:var(--amber);text-decoration:none}
.not-found{text-align:center;padding:80px 0}
.not-found h2{color:var(--rust);margin-bottom:12px}
.visually-hidden{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)}
`;

function getEntryIdFromPath(pathname) {
  const parts = pathname.replace(/\/+$/, '').split('/');
  return parts[parts.length - 1];
}

export default function EntryPage() {
  const location = useLocation();
  const entryId = getEntryIdFromPath(location.pathname);
  const entry = ENTRIES.find(e => e.id === entryId);
  const [back, setBack] = useState(() => ({ label: "Canon", to: "/canon" }));

  // Hydration-safe: the return link depends on query params that are absent
  // from the statically-rendered HTML, so resolve it once after mount.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const from = new URLSearchParams(location.search).get("from");
    setBack(backLinkFor(from, location.search, SLUG_MAPS));
  }, [location.search]);
  /* eslint-enable react-hooks/set-state-in-effect */

  if (!entry) {
    return (
      <>
        <Helmet>
          <title>Entry Not Found — Scrolls of One</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="page not-found">
          <h2>Not in the record</h2>
          <p>No scroll matches that ID.</p>
          <Link to="/canon" className="back">← Back to the Canon Explorer</Link>
        </div>
      </>
    );
  }

  const pageTitle = `${entry.title} — Scrolls of One`;

  const charLinks = (entry.who || [])
    .map((w) => ({ who: w, key: whoToCharacterKey[w] }))
    .filter((x) => x.key);

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={entry.summary} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={entry.summary} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://scrollsofone.com/scroll/${entry.id}`} />
        <link rel="canonical" href={`https://scrollsofone.com/scroll/${entry.id}`} />
        <style>{FONTS + CSS}</style>
      </Helmet>

      <SiteNav />

      <div className="page">
        <Link to={back.to} className="back">← Back to {back.label}</Link>

        <div className="meta">
          <span>{entry.kind}</span>
          <span className={`status-${entry.status}`}>{STATUS_LABEL[entry.status]}</span>
        </div>

        <h1>{entry.title}</h1>

        <div className="tags">
          <span className="tag">{entry.series}</span>
          {entry.who.map((w) => {
            const key = whoToCharacterKey[w];
            return key ? (
              <Link key={w} className="tag" to={`/characters/${key}`}>{w}</Link>
            ) : (
              <span key={w} className="tag">{w}</span>
            );
          })}
        </div>

        <p className="summary">{entry.summary}</p>

        <div className="body">
          {entry.body ? (
            bodyBlocks(stripDuplicateTitle(entry.body, entry.title)).map((block, i) => (
              <p key={i}>{block}</p>
            ))
          ) : (
            <p className="visually-hidden">Full text available in published editions.</p>
          )}
        </div>

        <footer className="entry-next">
          <span className="entry-next-label">Continue</span>
          <div className="entry-next-links">
            <Link to="/">Home</Link>
            <Link to="/canon">Canon</Link>
            <Link to="/timeline">Timeline</Link>
            {charLinks.map(({ who, key }) => (
              <Link key={key} to={`/characters/${key}`}>{who}</Link>
            ))}
          </div>
        </footer>
      </div>
    </>
  );
}
