import React from "react"; // eslint-disable-line no-unused-vars -- required by SSG JSX transform
import { Link } from "react-router-dom";

const CSS = `
.site-nav{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:16px clamp(22px,5vw,72px);border-bottom:1px solid #322c1f;font-family:'Spline Sans Mono',monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;flex-wrap:wrap}
.site-mark{color:#ebe3d1;text-decoration:none;white-space:nowrap}
.site-mark:hover{color:#e0a838;text-decoration:none}
.site-mark span{color:#e0a838}
.site-links{display:flex;gap:18px;flex-wrap:wrap}
.site-links a{color:#b4ab93;text-decoration:none;transition:color .15s}
.site-links a:hover{color:#e0a838;text-decoration:none}
.site-links a.on{color:#e0a838}
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
          <Link to="/canon" className={active === "canon" ? "on" : ""}>Canon</Link>
          <Link to="/timeline" className={active === "timeline" ? "on" : ""}>Timeline</Link>
        </div>
      </nav>
    </>
  );
}
