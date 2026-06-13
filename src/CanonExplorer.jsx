import { useState, useMemo, useEffect } from "react";
import data from "./entries.json";

const ENTRIES = data.entries;
const STATS = data.stats;

// Derive series and people from the data
const SERIES = [...new Set(ENTRIES.map((e) => e.series))].sort(
  (a, b) => ["Foundation","Characters","Origins","Conscience","Leadership",
    "Love","Baptist","Sandi","Carmichael","AI & Power","Governance",
    "Scenes","Pandemic Papers","Framing"].indexOf(a) - 
    ["Foundation","Characters","Origins","Conscience","Leadership",
    "Love","Baptist","Sandi","Carmichael","AI & Power","Governance",
    "Scenes","Pandemic Papers","Framing"].indexOf(b)
);

const PEOPLE = [...new Set(ENTRIES.flatMap((e) => e.who))].sort();

const PATHS = {
  "Start here": ["core_lore_summary","the_voice_of_one_universe_overview","bio_one","the_root_of_the_myth"],
  "One & Sandi": ["love_series_letter_to_sandi_i_the_quiet_lobby","love_kitchen_light","love_letter_to_sandi_viii_newsstand","scroll_of_sandi_ii_the_file_on_one","scene_the_dagger_point","scene_the_inaugural_ballroom"],
  "The Baptist & the synthetic voice": ["bio_baptist","scroll_of_the_baptist_ii","scroll_of_the_baptist_iv","scroll_of_carmichael_iv","scroll_conscience_04_decoy_detection"],
  "Carmichael's descent": ["scroll_of_carmichael_i","scroll_of_carmichael_ii","scroll_of_carmichael_iii","scroll_of_carmichael_iv","scroll_of_one_on_spectacle_and_power"],
  "Power & method": ["scroll_leadership_servant_test","scroll_of_leadership_vii_the_means_are_the_message","scroll_on_naming_without_becoming_the_play","scroll_of_one_the_scapegoat_ledger","scroll_governance_01_the_fourth_branch"],
};

const STATUS_LABEL = { canon: "Canon", draft: "Draft", seed: "Seed", repair: "Needs repair" };

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Newsreader:opsz,wght@6..72,400;6..72,500&family=Spline+Sans+Mono:wght@400;500&display=swap');`;

const CSS = `
.voc-root{
  --ink:#15130d; --ink2:#1d1a12; --raise:#201c14; --raise2:#262115;
  --line:#322c1f; --line2:#3f3826;
  --bone:#ebe3d1; --bone-dim:#b4ab93; --bone-faint:#8b8470;
  --amber:#e0a838; --amber-dim:#c79a4a;
  --green:#7fa07c; --rust:#c87e57; --slate:#8aa0ad;
  background:var(--ink); color:var(--bone);
  font-family:'Newsreader',Georgia,serif; line-height:1.5;
  min-height:100vh; -webkit-font-smoothing:antialiased;
}
.voc-root *{box-sizing:border-box;}
.voc-root button{font-family:'Spline Sans Mono',ui-monospace,monospace; cursor:pointer;}
.voc-head{position:relative; padding:0;}
.voc-head-rule{height:3px; background:linear-gradient(90deg,var(--amber),transparent 70%);}
.voc-head-inner{max-width:none; margin:0 auto; padding:44px 32px 30px;}
.voc-eyebrow{font-family:'Spline Sans Mono',monospace; font-size:11px; letter-spacing:.22em;
  text-transform:uppercase; color:var(--amber-dim); margin:0 0 14px;}
.voc-title{font-family:'Fraunces',serif; font-optical-sizing:auto; font-weight:500;
  font-size:clamp(40px,7vw,72px); line-height:.96; letter-spacing:-.01em; margin:0 0 16px; color:var(--bone);}
.voc-sub{max-width:60ch; font-size:17px; color:var(--bone-dim); margin:0 0 22px;}
.voc-stat{display:flex; flex-wrap:wrap; gap:18px; font-family:'Spline Sans Mono',monospace;
  font-size:12px; color:var(--bone-faint);}
.voc-stat b{color:var(--bone);}
.voc-dot-canon{color:var(--amber);} .voc-dot-draft{color:var(--slate);}
.voc-dot-seed{color:var(--green);} .voc-dot-repair{color:var(--rust);}
.voc-controls{max-width:none; margin:0 auto; padding:0 32px 8px;
  display:flex; flex-wrap:wrap; gap:18px 28px; align-items:center; justify-content:space-between;}
.voc-search{flex:1; min-width:240px; background:var(--ink2); border:1px solid var(--line);
  color:var(--bone); font-family:'Newsreader',serif; font-size:16px; padding:12px 16px; border-radius:2px;}
.voc-search::placeholder{color:var(--bone-faint);}
.voc-search:focus{outline:none; border-color:var(--amber-dim); box-shadow:0 0 0 1px var(--amber-dim);}
.voc-paths{display:flex; flex-wrap:wrap; gap:8px; align-items:center;}
.voc-paths-label{font-family:'Spline Sans Mono',monospace; font-size:10px; letter-spacing:.18em;
  text-transform:uppercase; color:var(--bone-faint); margin-right:2px;}
.voc-chip{background:transparent; border:1px solid var(--line2); color:var(--bone-dim);
  font-size:12px; padding:6px 11px; border-radius:999px; transition:all .15s;}
.voc-chip:hover{border-color:var(--amber-dim); color:var(--bone);}
.voc-chip.is-on{background:var(--amber); border-color:var(--amber); color:var(--ink); font-weight:500;}
.voc-body{max-width:none; margin:0 auto; padding:18px 32px 60px; display:grid;
  grid-template-columns:220px 1fr; gap:36px;}
.voc-rail{position:sticky; top:18px; align-self:start; display:flex; flex-direction:column; gap:26px;}
.voc-rail-head{font-family:'Spline Sans Mono',monospace; font-size:10px; letter-spacing:.2em;
  text-transform:uppercase; color:var(--bone-faint); margin:0 0 10px; padding-bottom:8px; border-bottom:1px solid var(--line);}
.voc-rail-list{display:flex; flex-direction:column;}
.voc-railbtn{display:flex; justify-content:space-between; align-items:center; gap:10px;
  background:transparent; border:none; color:var(--bone-dim); text-align:left;
  font-size:12.5px; padding:7px 0; border-bottom:1px solid transparent; transition:color .14s;}
.voc-railbtn:hover{color:var(--bone);}
.voc-railbtn.is-on{color:var(--amber);}
.voc-count{font-size:11px; color:var(--bone-faint);}
.voc-railbtn.is-on .voc-count{color:var(--amber-dim);}
.voc-pills{display:flex; flex-wrap:wrap; gap:7px;}
.voc-pill{background:transparent; border:1px solid var(--line2); color:var(--bone-dim);
  font-size:11.5px; padding:5px 10px; border-radius:2px; transition:all .14s;}
.voc-pill:hover{border-color:var(--amber-dim); color:var(--bone);}
.voc-pill.is-on{background:var(--amber); border-color:var(--amber); color:var(--ink); font-weight:500;}
.voc-main{min-width:0;}
.voc-mainbar{display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;
  font-family:'Spline Sans Mono',monospace; font-size:11px; letter-spacing:.05em;}
.voc-resultcount{color:var(--bone-faint); text-transform:uppercase;}
.voc-clear{background:none; border:none; color:var(--amber-dim); font-size:11px; text-transform:uppercase; letter-spacing:.08em;}
.voc-clear:hover{color:var(--amber);}
.voc-grid{list-style:none; margin:0; padding:0; display:grid;
  grid-template-columns:repeat(auto-fill,minmax(264px,1fr)); gap:14px;}
.voc-card{animation:vocfade .5s ease both;}
@keyframes vocfade{from{opacity:0; transform:translateY(8px);} to{opacity:1; transform:none;}}
.voc-card-btn{width:100%; height:100%; text-align:left; background:var(--raise);
  border:1px solid var(--line); border-radius:3px; padding:16px 16px 14px; transition:border-color .16s, transform .16s, background .16s;
  display:flex; flex-direction:column; gap:9px; font-family:'Newsreader',serif;}
.voc-card-btn:hover{border-color:var(--line2); background:var(--raise2); transform:translateY(-2px);}
.voc-card-btn:focus-visible{outline:2px solid var(--amber); outline-offset:2px;}
.voc-card-meta{display:flex; justify-content:space-between; align-items:center;}
.voc-kind{font-family:'Spline Sans Mono',monospace; font-size:9.5px; letter-spacing:.16em;
  text-transform:uppercase; color:var(--bone-faint);}
.voc-status{font-family:'Spline Sans Mono',monospace; font-size:9.5px; letter-spacing:.1em; text-transform:uppercase;}
.voc-status-canon{color:var(--amber);} .voc-status-draft{color:var(--slate);}
.voc-status-seed{color:var(--green);} .voc-status-repair{color:var(--rust);}
.voc-card-title{font-family:'Fraunces',serif; font-weight:500; font-size:19px; line-height:1.12;
  margin:0; color:var(--bone); letter-spacing:-.005em;}
.voc-card-sum{font-size:14px; line-height:1.45; color:var(--bone-dim); margin:0; flex:1;}
.voc-card-foot{display:flex; justify-content:space-between; align-items:center; gap:8px;
  padding-top:9px; border-top:1px solid var(--line); margin-top:2px;}
.voc-series-tag{font-family:'Spline Sans Mono',monospace; font-size:10px; letter-spacing:.08em;
  text-transform:uppercase; color:var(--amber-dim);}
.voc-who{font-family:'Spline Sans Mono',monospace; font-size:10px; color:var(--bone-faint); text-align:right;}
.voc-empty{padding:60px 0; text-align:center; color:var(--bone-dim); display:flex; flex-direction:column; gap:14px; align-items:center;}
.voc-overlay{position:fixed; inset:0; background:rgba(8,7,4,.72); backdrop-filter:blur(3px);
  display:flex; justify-content:flex-end; z-index:50; animation:vocfade .2s ease both;}
.voc-drawer{position:relative; width:min(520px,100%); height:100%; overflow-y:auto;
  background:var(--ink2); border-left:1px solid var(--line2); padding:54px 38px 48px;
  animation:vocslide .26s cubic-bezier(.2,.7,.2,1) both;}
@keyframes vocslide{from{transform:translateX(28px); opacity:.5;} to{transform:none; opacity:1;}}
.voc-close{position:absolute; top:20px; right:22px; background:none; border:none; color:var(--bone-faint); font-size:15px;}
.voc-close:hover{color:var(--bone);}
.voc-drawer-meta{display:flex; gap:16px; margin-bottom:14px;}
.voc-drawer-title{font-family:'Fraunces',serif; font-weight:500; font-size:32px; line-height:1.05;
  margin:0 0 16px; color:var(--bone); letter-spacing:-.01em;}
.voc-drawer-tags{display:flex; flex-wrap:wrap; gap:8px; margin-bottom:22px;}
.voc-who-tag{font-family:'Spline Sans Mono',monospace; font-size:10px; letter-spacing:.06em;
  color:var(--bone-dim); border:1px solid var(--line2); padding:4px 9px; border-radius:2px;}
.voc-drawer-sum{font-size:18px; line-height:1.5; color:var(--bone); margin:0 0 26px;}
.voc-drawer-body{border-top:1px solid var(--line); padding-top:22px;}
.voc-placeholder{font-size:14px; line-height:1.6; color:var(--bone-faint); font-style:italic; margin:0;}
.voc-body-text{font-size:15px; line-height:1.6; color:var(--bone);}
.voc-body-text p{margin-bottom:0.75rem;}
.voc-foot{max-width:none; margin:0 auto; padding:22px 32px 40px; border-top:1px solid var(--line);
  display:flex; flex-wrap:wrap; gap:12px; justify-content:space-between;
  font-family:'Spline Sans Mono',monospace; font-size:10.5px; letter-spacing:.06em; color:var(--bone-faint);}
.voc-foot-link{color:var(--bone-dim); text-decoration:none;
  border-bottom:1px solid var(--amber-dim); transition:color .15s,border-color .15s;}
.voc-foot-link:hover{color:var(--amber); border-color:var(--amber);}
@media (max-width:820px){
  .voc-body{grid-template-columns:1fr; gap:22px;}
  .voc-rail{position:static; flex-direction:row; flex-wrap:wrap; gap:24px;}
  .voc-rail-group{flex:1; min-width:200px;}
  .voc-drawer{width:100%; padding:54px 24px 40px;}
}
@media (prefers-reduced-motion:reduce){
  .voc-root *{animation:none !important; transition:none !important;}
}
`;

export default function CanonExplorer() {
  const [query, setQuery] = useState("");
  const [series, setSeries] = useState(null);
  const [person, setPerson] = useState(null);
  const [path, setPath] = useState(null);
  const [selected, setSelected] = useState(null);
  const [openedAt, setOpenedAt] = useState(0);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setSelected(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filtered = useMemo(() => {
    let base = ENTRIES.filter(e => e.visibility !== "archive");
    if (path) {
      const order = PATHS[path];
      base = order.map((id) => ENTRIES.find((e) => e.id === id)).filter(Boolean).filter(e => e.visibility !== "archive");
    }
    return base.filter((e) => {
      if (series && e.series !== series) return false;
      if (person && !e.who.includes(person)) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        if (!(e.title.toLowerCase().includes(q) || e.summary.toLowerCase().includes(q))) return false;
      }
      return true;
    });
  }, [query, series, person, path]);

  const clearAll = () => { setSeries(null); setPerson(null); setPath(null); setQuery(""); };
  const active = series || person || path || query.trim();

  return (
    <div className="voc-root">
      <style>{FONTS + CSS}</style>

      <header className="voc-head">
        <div className="voc-head-rule" />
        <div className="voc-head-inner">
          <p className="voc-eyebrow">The Voice of One · Canon Explorer</p>
          <h1 className="voc-title">The Record</h1>
          <p className="voc-sub">
            Every scroll, scene, and person in the universe — browsable, filterable, and marked
            for what it is. A plain, verified index for a story about who you can believe.
          </p>
          <div className="voc-stat">
            <span><b>{STATS.public}</b> public entries · <b>{STATS.canon}</b> canon</span>
            <span className="voc-dot-canon">● canon</span>
            <span className="voc-dot-draft">● draft</span>
            <span className="voc-dot-seed">● seed</span>
            <span className="voc-dot-repair">● needs repair</span>
          </div>
        </div>
      </header>

      <div className="voc-controls">
        <input
          className="voc-search"
          placeholder="Search titles and summaries…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search the canon"
        />
        <div className="voc-paths" role="group" aria-label="Reading paths">
          <span className="voc-paths-label">Paths</span>
          {Object.keys(PATHS).map((p) => (
            <button
              key={p}
              className={"voc-chip" + (path === p ? " is-on" : "")}
              onClick={() => setPath(path === p ? null : p)}
            >{p}</button>
          ))}
        </div>
      </div>

      <div className="voc-body">
        <aside className="voc-rail" aria-label="Filters">
          <div className="voc-rail-group">
            <p className="voc-rail-head">Series</p>
            <div className="voc-rail-list">
              {SERIES.map((s) => {
                const n = ENTRIES.filter((e) => e.series === s && e.visibility !== "archive").length;
                if (!n) return null;
                return (
                  <button key={s} className={"voc-railbtn" + (series === s ? " is-on" : "")}
                    onClick={() => setSeries(series === s ? null : s)}>
                    <span>{s}</span><span className="voc-count">{n}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="voc-rail-group">
            <p className="voc-rail-head">Who</p>
            <div className="voc-pills">
              {PEOPLE.map((p) => (
                <button key={p} className={"voc-pill" + (person === p ? " is-on" : "")}
                  onClick={() => setPerson(person === p ? null : p)}>{p}</button>
              ))}
            </div>
          </div>
        </aside>

        <main className="voc-main">
          <div className="voc-mainbar">
            <span className="voc-resultcount">{filtered.length} {filtered.length === 1 ? "entry" : "entries"}</span>
            {active ? <button className="voc-clear" onClick={clearAll}>Clear filters</button> : <span />}
          </div>

          {filtered.length === 0 ? (
            <div className="voc-empty">
              <p>Nothing in the record matches that yet.</p>
              <button className="voc-clear" onClick={clearAll}>Clear filters</button>
            </div>
          ) : (
            <ul className="voc-grid">
              {filtered.map((e, i) => (
                <li key={e.id} className="voc-card" style={{ animationDelay: `${Math.min(i * 24, 360)}ms` }}>
                  <button className="voc-card-btn" onClick={() => { setSelected(e); setOpenedAt(Date.now()); }}>
                    <div className="voc-card-meta">
                      <span className="voc-kind">{e.kind}</span>
                      <span className={"voc-status voc-status-" + e.status}>{STATUS_LABEL[e.status]}</span>
                    </div>
                    <h3 className="voc-card-title">{e.title}</h3>
                    <p className="voc-card-sum">{e.summary}</p>
                    <div className="voc-card-foot">
                      <span className="voc-series-tag">{e.series}</span>
                      <span className="voc-who">{e.who.join(" · ")}</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </main>
      </div>

      {selected && (
        <div className="voc-overlay" onClick={() => { if (Date.now() - openedAt > 300) setSelected(null); }}>
          <div className="voc-drawer" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={selected.title}>
            <button className="voc-close" onClick={() => setSelected(null)} aria-label="Close">✕</button>
            <div className="voc-drawer-meta">
              <span className="voc-kind">{selected.kind}</span>
              <span className={"voc-status voc-status-" + selected.status}>{STATUS_LABEL[selected.status]}</span>
            </div>
            <h2 className="voc-drawer-title">{selected.title}</h2>
            <div className="voc-drawer-tags">
              <span className="voc-series-tag">{selected.series}</span>
              {selected.who.map((w) => <span key={w} className="voc-who-tag">{w}</span>)}
            </div>
            <p className="voc-drawer-sum">{selected.summary}</p>
            <div className="voc-drawer-body">
              {selected.body ? (
                <div className="voc-body-text">{selected.body.split('\n').map((line, i) => <p key={i}>{line}</p>)}</div>
              ) : (
                <p className="voc-placeholder">
                  The full text of this entry is available in the complete canon.
                  {selected.visibility === "archive" ? " This chapter is published in The Antichrist and the Prophet, available on Amazon." : ""}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <footer className="voc-foot">
        <span>Scrolls of One — canon record · {STATS.total} entries</span>
        <span>
          A project of the{" "}
          <a href="https://emergenceinstitute.live" className="voc-foot-link"
             target="_blank" rel="noopener noreferrer">Emergence Institute ↗</a>
        </span>
      </footer>
    </div>
  );
}
