// Canon Explorer filter state <-> URL serialization.
//
// Pure (no React, no DOM, no JSON import) so it can be unit-tested under
// node:test and shared by CanonExplorer (read/write the address bar) and
// EntryPage (rebuild a validated /canon return link). Consumers supply the
// slug maps built from their own data source; see canonFilters.js for the
// Vite-side data layer.

export const Q_MAX = 120;
export const EXPLORER_MAX = 512;
export const FILTER_KEYS = ["q", "series", "who", "path"];

// Reading paths — single source of truth (previously inline in
// CanonExplorer.jsx and duplicated in scripts/check-site-data.mjs).
export const PATHS = {
  "Start here": ["bio_one", "scroll_origins_i_basis_of_my_art", "scroll_of_sandi_ii_the_file_on_one", "scroll_of_the_baptist_ii", "scroll_of_one_on_spectacle_and_power", "the_root_of_the_myth"],
  "One & Sandi": ["love_series_letter_to_sandi_i_the_quiet_lobby", "love_kitchen_light", "love_letter_to_sandi_viii_newsstand", "scroll_of_sandi_ii_the_file_on_one", "scene_the_dagger_point", "scene_the_inaugural_ballroom"],
  "The Baptist & the synthetic voice": ["bio_baptist", "scroll_of_the_baptist_ii", "scroll_of_the_baptist_iv", "scroll_of_carmichael_iv", "scroll_conscience_04_decoy_detection"],
  "Carmichael's descent": ["scroll_of_carmichael_i", "scroll_of_carmichael_ii", "scroll_of_carmichael_iii", "scroll_of_carmichael_iv", "scroll_of_one_on_spectacle_and_power"],
  "Power & method": ["scroll_leadership_servant_test", "scroll_of_leadership_vii_the_means_are_the_message", "scroll_on_naming_without_becoming_the_play", "scroll_of_one_the_scapegoat_ledger", "scroll_governance_01_the_fourth_branch"],
};

const SERIES_ORDER = ["Foundation", "Characters", "Origins", "Conscience", "Leadership", "Love", "Baptist", "Sandi", "Carmichael", "AI & Power", "Governance", "Scenes", "Pandemic Papers", "Framing"];

// Lowercase, collapse every run of non-[a-z0-9] to a single dash, trim.
export function toSlug(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function deriveSeries(entries) {
  return [...new Set(entries.map((e) => e.series).filter(Boolean))].sort(
    (a, b) => SERIES_ORDER.indexOf(a) - SERIES_ORDER.indexOf(b),
  );
}

export function deriveWho(entries) {
  return [...new Set(entries.flatMap((e) => e.who || []))].sort();
}

// Build slug -> value maps for series, who, and path. `paths` is the array of
// reading-path keys (names), not the entry IDs.
export function buildSlugMaps({ series, who, paths }) {
  const mk = (values) => new Map(values.map((v) => [toSlug(v), v]));
  return {
    seriesBySlug: mk(series),
    whoBySlug: mk(who),
    pathBySlug: mk(paths),
  };
}

// Return a param value only if it occurs exactly once; duplicates are invalid
// and treated as absent.
function getUnique(params, key) {
  const all = params.getAll(key);
  return all.length === 1 ? all[0] : undefined;
}

// Parse the /canon filter params into a validated state. Invalid or stale
// slugs and duplicate keys are dropped (callers normalize the URL).
export function parseCanonParams(searchParams, maps) {
  const qRaw = getUnique(searchParams, "q");
  const q = typeof qRaw === "string" && qRaw.trim() ? qRaw.trim().slice(0, Q_MAX) : "";

  const seriesSlug = getUnique(searchParams, "series");
  const whoSlug = getUnique(searchParams, "who");
  const pathSlug = getUnique(searchParams, "path");

  return {
    q,
    series: seriesSlug && maps.seriesBySlug.has(seriesSlug) ? maps.seriesBySlug.get(seriesSlug) : null,
    who: whoSlug && maps.whoBySlug.has(whoSlug) ? maps.whoBySlug.get(whoSlug) : null,
    path: pathSlug && maps.pathBySlug.has(pathSlug) ? maps.pathBySlug.get(pathSlug) : null,
  };
}

// Plain-object form for react-router setSearchParams.
export function stateToParams(state) {
  const p = {};
  if (state.q) p.q = state.q;
  if (state.series) p.series = toSlug(state.series);
  if (state.who) p.who = toSlug(state.who);
  if (state.path) p.path = toSlug(state.path);
  return p;
}

// Canonical query string ("series=baptist&who=one"); empty string when no filters.
export function serializeCanonParams(state) {
  return new URLSearchParams(stateToParams(state)).toString();
}

// The explorer payload carried on entry permalinks (?from=canon&explorer=...).
export function buildExplorerParam(state) {
  return serializeCanonParams(state);
}

// Strictly validate a decoded explorer payload. Returns a validated state, or
// null on any violation (unknown/duplicate key, invalid slug, oversized q, or
// an encoded size over EXPLORER_MAX). A null result means "return to plain /canon".
export function parseExplorerPayload(decoded, maps) {
  if (typeof decoded !== "string" || decoded.length === 0) return null;

  let encodedLength;
  try {
    encodedLength = encodeURIComponent(decoded).length;
  } catch {
    return null;
  }
  if (encodedLength > EXPLORER_MAX) return null;

  let params;
  try {
    params = new URLSearchParams(decoded);
  } catch {
    return null;
  }

  for (const key of params.keys()) {
    if (!FILTER_KEYS.includes(key)) return null; // unknown key
  }
  for (const key of FILTER_KEYS) {
    if (params.getAll(key).length > 1) return null; // duplicate key
  }

  const q = params.get("q");
  if (q !== null && q.trim().length > Q_MAX) return null; // oversized search text

  const seriesSlug = params.get("series");
  const whoSlug = params.get("who");
  const pathSlug = params.get("path");
  if (seriesSlug !== null && !maps.seriesBySlug.has(seriesSlug)) return null;
  if (whoSlug !== null && !maps.whoBySlug.has(whoSlug)) return null;
  if (pathSlug !== null && !maps.pathBySlug.has(pathSlug)) return null;

  return parseCanonParams(params, maps);
}

// Extract the still-encoded value of `key` from a raw search string, rejecting
// malformed percent-encoding and duplicate keys. Returns the decoded value, or
// null when absent/duplicate/malformed.
function rawParam(rawSearch, key) {
  const s = rawSearch.startsWith("?") ? rawSearch.slice(1) : rawSearch;
  const parts = s.split("&").filter(Boolean);
  let found;
  for (const part of parts) {
    const eq = part.indexOf("=");
    const k = eq === -1 ? part : part.slice(0, eq);
    if (k !== key) continue;
    if (found !== undefined) return null; // duplicate key
    const rawVal = eq === -1 ? "" : part.slice(eq + 1);
    try {
      found = decodeURIComponent(rawVal);
    } catch {
      return null; // malformed percent-encoding
    }
  }
  return found === undefined ? null : found;
}

const EMPTY_MAPS = { seriesBySlug: new Map(), whoBySlug: new Map(), pathBySlug: new Map() };

// Build a safe /canon return URL from a raw entry-page search string. Only the
// validated filter state ever reaches the path; `from` itself is still handled
// by the whitelist in navigation.js. No open-redirect surface.
export function canonReturnUrlFromSearch(rawSearch, maps = EMPTY_MAPS) {
  const explorer = rawParam(rawSearch, "explorer");
  if (explorer === null || explorer.length === 0) return "/canon";
  const state = parseExplorerPayload(explorer, maps);
  if (!state) return "/canon";
  const qs = serializeCanonParams(state);
  return qs ? `/canon?${qs}` : "/canon";
}
