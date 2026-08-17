import { test } from "node:test";
import assert from "node:assert/strict";
import {
  Q_MAX,
  EXPLORER_MAX,
  FILTER_KEYS,
  PATHS,
  toSlug,
  deriveSeries,
  deriveWho,
  buildSlugMaps,
  parseCanonParams,
  stateToParams,
  serializeCanonParams,
  buildExplorerParam,
  parseExplorerPayload,
  canonReturnUrlFromSearch,
} from "../src/canonFilterParams.js";

// Small deterministic fixture — deliberately overlapping slugs across the
// series/who namespaces to prove per-key slug maps stay independent.
const FIXTURE = {
  series: ["Foundation", "Baptist", "AI & Power", "Pandemic Papers"],
  who: ["One", "Baptist", "Carmichael", "Universal"],
  paths: ["Start here", "Carmichael's descent"],
};
const maps = buildSlugMaps(FIXTURE);

test("toSlug lowercases and collapses non-alphanumerics", () => {
  assert.equal(toSlug("AI & Power"), "ai-power");
  assert.equal(toSlug("Pandemic Papers"), "pandemic-papers");
  assert.equal(toSlug("Carmichael's descent"), "carmichael-s-descent");
  assert.equal(toSlug("Start here"), "start-here");
  assert.equal(toSlug("One"), "one");
  assert.equal(toSlug("  Trim  Me  "), "trim-me");
});

test("deriveSeries dedupes and preserves the editorial order", () => {
  const entries = [
    { series: "Scenes" },
    { series: "Foundation" },
    { series: "Scenes" },
    { series: "AI & Power" },
  ];
  assert.deepEqual(deriveSeries(entries), ["Foundation", "AI & Power", "Scenes"]);
});

test("deriveWho dedupes and sorts alphabetically", () => {
  const entries = [{ who: ["One", "Baptist"] }, { who: ["Baptist", "Carmichael"] }];
  assert.deepEqual(deriveWho(entries), ["Baptist", "Carmichael", "One"]);
});

test("slug maps are independent per namespace", () => {
  // "baptist" is a valid series slug AND a valid who slug — distinct keys.
  assert.equal(maps.seriesBySlug.get("baptist"), "Baptist");
  assert.equal(maps.whoBySlug.get("baptist"), "Baptist");
  assert.equal(maps.pathBySlug.get("carmichael-s-descent"), "Carmichael's descent");
});

test("parseCanonParams: /canon?series=baptist&who=one", () => {
  const state = parseCanonParams(new URLSearchParams("series=baptist&who=one"), maps);
  assert.deepEqual(state, { q: "", series: "Baptist", who: "One", path: null });
});

test("parseCanonParams: /canon?q=synthetic%20voice preserves spaces", () => {
  const state = parseCanonParams(new URLSearchParams("q=synthetic%20voice"), maps);
  assert.equal(state.q, "synthetic voice");
});

test("parseCanonParams: + also decodes to a space", () => {
  const state = parseCanonParams(new URLSearchParams("q=synthetic+voice"), maps);
  assert.equal(state.q, "synthetic voice");
});

test("parseCanonParams: empty/whitespace q is omitted", () => {
  assert.equal(parseCanonParams(new URLSearchParams("q="), maps).q, "");
  assert.equal(parseCanonParams(new URLSearchParams("q=%20%20"), maps).q, "");
  assert.equal(parseCanonParams(new URLSearchParams(""), maps).q, "");
});

test("parseCanonParams: q is capped at Q_MAX characters", () => {
  const big = "a".repeat(Q_MAX + 50);
  const state = parseCanonParams(new URLSearchParams(`q=${big}`), maps);
  assert.equal(state.q.length, Q_MAX);
});

test("parseCanonParams: duplicate keys are dropped", () => {
  const state = parseCanonParams(new URLSearchParams("series=baptist&series=foundation"), maps);
  assert.equal(state.series, null);
});

test("parseCanonParams: unknown keys are ignored, valid keys survive", () => {
  const state = parseCanonParams(new URLSearchParams("series=baptist&foo=bar"), maps);
  assert.equal(state.series, "Baptist");
});

test("parseCanonParams: stale slug is dropped", () => {
  const state = parseCanonParams(new URLSearchParams("series=no-such-series"), maps);
  assert.equal(state.series, null);
});

test("serializeCanonParams round-trips and omits empty fields", () => {
  assert.equal(serializeCanonParams({ q: "", series: null, who: null, path: null }), "");
  assert.equal(
    serializeCanonParams({ q: "synthetic voice", series: "Baptist", who: "One", path: null }),
    "q=synthetic+voice&series=baptist&who=one",
  );
});

test("buildExplorerParam + parseExplorerPayload round-trip", () => {
  const state = { q: "synthetic voice", series: "Baptist", who: "One", path: "Carmichael's descent" };
  const payload = buildExplorerParam(state);
  const parsed = parseExplorerPayload(payload, maps);
  assert.deepEqual(parsed, { q: "synthetic voice", series: "Baptist", who: "One", path: "Carmichael's descent" });
});

test("parseExplorerPayload: empty payload is rejected", () => {
  assert.equal(parseExplorerPayload("", maps), null);
  assert.equal(parseExplorerPayload(undefined, maps), null);
  assert.equal(parseExplorerPayload(123, maps), null);
});

test("parseExplorerPayload: unknown key is rejected", () => {
  assert.equal(parseExplorerPayload("series=baptist&redirect=https://evil.example", maps), null);
});

test("parseExplorerPayload: duplicate key is rejected", () => {
  assert.equal(parseExplorerPayload("series=baptist&series=foundation", maps), null);
});

test("parseExplorerPayload: stale slug is rejected", () => {
  assert.equal(parseExplorerPayload("series=no-such-series", maps), null);
  assert.equal(parseExplorerPayload("who=Zod", maps), null);
  assert.equal(parseExplorerPayload("path=not-a-path", maps), null);
});

test("parseExplorerPayload: oversized search text is rejected", () => {
  const q = "x".repeat(Q_MAX + 1);
  assert.equal(parseExplorerPayload(`q=${q}`, maps), null);
});

test("parseExplorerPayload: oversized encoded payload is rejected", () => {
  const q = "a".repeat(600);
  assert.equal(parseExplorerPayload(`q=${q}`, maps), null);
});

test("parseExplorerPayload: payload over EXPLORER_MAX encoded chars is rejected", () => {
  // A non-q payload can still exceed the encoded cap via many distinct params is
  // impossible (keys are limited to q/series/who/path), so use a long q and
  // assert the guard fires regardless of which internal check triggers it.
  const q = "b".repeat(EXPLORER_MAX);
  assert.equal(parseExplorerPayload(`q=${q}`, maps), null);
});

test("canonReturnUrlFromSearch: valid explorer rebuilds /canon with filters", () => {
  const url = canonReturnUrlFromSearch(
    "?from=canon&explorer=series%3Dbaptist%26who%3Done",
    maps,
  );
  assert.equal(url, "/canon?series=baptist&who=one");
});

test("canonReturnUrlFromSearch: no explorer falls back to /canon", () => {
  assert.equal(canonReturnUrlFromSearch("?from=canon", maps), "/canon");
  assert.equal(canonReturnUrlFromSearch("", maps), "/canon");
  assert.equal(canonReturnUrlFromSearch("?from=timeline", maps), "/canon");
});

test("canonReturnUrlFromSearch: empty explorer falls back to /canon", () => {
  assert.equal(canonReturnUrlFromSearch("?from=canon&explorer=", maps), "/canon");
});

test("canonReturnUrlFromSearch: malformed percent-encoding is rejected", () => {
  assert.equal(canonReturnUrlFromSearch("?from=canon&explorer=series%3Dbaptist%ZZ", maps), "/canon");
  assert.equal(canonReturnUrlFromSearch("?from=canon&explorer=%E0%A4%A", maps), "/canon");
});

test("canonReturnUrlFromSearch: duplicate explorer keys are rejected", () => {
  const url = canonReturnUrlFromSearch(
    "?from=canon&explorer=series%3Dbaptist&explorer=who%3Done",
    maps,
  );
  assert.equal(url, "/canon");
});

test("canonReturnUrlFromSearch: oversized explorer is rejected", () => {
  const q = "c".repeat(EXPLORER_MAX);
  const explorer = encodeURIComponent(`q=${q}`);
  assert.equal(canonReturnUrlFromSearch(`?from=canon&explorer=${explorer}`, maps), "/canon");
});

test("canonReturnUrlFromSearch: never emits an arbitrary/unvalidated URL", () => {
  // A hostile explorer value must not leak through as a redirect target.
  const hostile = "?from=canon&explorer=https%3A%2F%2Fevil.example%2Fsteal";
  const url = canonReturnUrlFromSearch(hostile, maps);
  assert.ok(url === "/canon" || url.startsWith("/canon?"), `unexpected url: ${url}`);
  assert.ok(!url.includes("evil.example"), "arbitrary host leaked into return URL");
});

test("stateToParams produces the object form for setSearchParams", () => {
  assert.deepEqual(stateToParams({ q: "hi", series: "Baptist", who: null, path: null }), {
    q: "hi",
    series: "baptist",
  });
  assert.deepEqual(stateToParams({ q: "", series: null, who: null, path: null }), {});
});

test("PATHS keys are the live reading paths", () => {
  assert.deepEqual(Object.keys(PATHS), [
    "Start here",
    "One & Sandi",
    "The Baptist & the synthetic voice",
    "Carmichael's descent",
    "Power & method",
  ]);
});

test("FILTER_KEYS is the closed set for /canon and explorer", () => {
  assert.deepEqual(FILTER_KEYS, ["q", "series", "who", "path"]);
});
