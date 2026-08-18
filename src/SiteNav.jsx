import React from "react"; // eslint-disable-line no-unused-vars -- required by SSG JSX transform
import { Link } from "react-router-dom";

const CSS = `
.site-nav{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:16px clamp(22px,5vw,72px);border-bottom:1px solid var(--line);font-family:'Spline Sans Mono',monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;flex-wrap:wrap}
.site-mark{color:var(--paper);text-decoration:none;white-space:nowrap}
.site-mark:hover{color:var(--amber);text-decoration:none}
.site-mark span{color:var(--amber)}
.site-links{display:flex;gap:18px;flex-wrap:wrap}
.site-links a{color:var(--dim);text-decoration:none;transition:color .15s}
.site-links a:hover{color:var(--amber);text-decoration:none}
.site-links a.on{color:var(--amber)}
`;

export default function SiteNav({ active }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <nav className="site-nav" aria-label="Primary navigation">
        <Link className="site-mark" to="/">
          <span>●</span> Scrolls of One
        </Link>
        <div className="site-links">
          <Link to="/" className={active === "home" ? "on" : ""}>Home</Link>
          <Link to="/characters" className={active === "characters" ? "on" : ""}>Characters</Link>
          <Link to="/canon" className={active === "canon" ? "on" : ""}>Canon</Link>
          <Link to="/timeline" className={active === "timeline" ? "on" : ""}>Timeline</Link>
        </div>
      </nav>
    </>
  );
}
