import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import data from '../entries.json';

const ENTRIES = data.entries;

const STATUS_LABEL = { canon: 'Canon', draft: 'Draft', seed: 'Seed', repair: 'Needs repair' };

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Newsreader:opsz,wght@6..72,400;6..72,500&family=Spline+Sans+Mono:wght@400;500&display=swap');`;

const CSS = `
*,*:before,*:after{box-sizing:border-box;margin:0;padding:0}
html{background:#15130d;color:#ebe3d1;font-family:'Newsreader',Georgia,serif;font-size:18px;line-height:1.75;-webkit-font-smoothing:antialiased}
body{min-height:100vh}
a{color:#e0a838;text-decoration:none}
a:hover{text-decoration:underline;text-underline-offset:3px}
h1,h2,h3{font-family:'Fraunces',serif;font-weight:500;line-height:1.2;color:#ebe3d1}
h1{font-size:clamp(1.8rem,4vw,2.6rem)}
.page{max-width:740px;margin:0 auto;padding:44px 32px 60px}
.back{margin-bottom:24px;display:inline-block;font-family:'Spline Sans Mono',monospace;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#8b8470}
.back:hover{color:#e0a838}
.meta{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:16px;font-family:'Spline Sans Mono',monospace;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#8b8470}
.status-canon{color:#e0a838}.status-draft{color:#8aa0ad}.status-seed{color:#7fa07c}.status-repair{color:#c87e57}
.tags{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:22px}
.tag{font-family:'Spline Sans Mono',monospace;font-size:10px;letter-spacing:.06em;color:#b4ab93;border:1px solid #3f3826;padding:4px 9px;border-radius:2px}
.summary{font-size:19px;line-height:1.5;color:#ebe3d1;margin-bottom:26px;padding-bottom:22px;border-bottom:1px solid #322c1f}
.body{font-size:16px;line-height:1.65;color:#d4ccbf}
.body p{margin-bottom:0.75rem}
.not-found{text-align:center;padding:80px 0}
.not-found h2{color:#c87e57;margin-bottom:12px}
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
          <Link to="/" className="back">← Back to the Canon Explorer</Link>
        </div>
      </>
    );
  }

  const pageTitle = `${entry.title} — Scrolls of One`;

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
      <div className="page">
        <Link to="/" className="back">← Back to Canon Explorer</Link>

        <div className="meta">
          <span>{entry.kind}</span>
          <span className={`status-${entry.status}`}>{STATUS_LABEL[entry.status]}</span>
        </div>

        <h1>{entry.title}</h1>

        <div className="tags">
          <span className="tag">{entry.series}</span>
          {entry.who.map(w => (
            <span key={w} className="tag">{w}</span>
          ))}
        </div>

        <p className="summary">{entry.summary}</p>

        <div className="body">
          {entry.body ? (
            entry.body.split('\n').map((line, i) => <p key={i}>{line}</p>)
          ) : (
            <p className="visually-hidden">Full text available in published editions.</p>
          )}
        </div>
      </div>
    </>
  );
}
