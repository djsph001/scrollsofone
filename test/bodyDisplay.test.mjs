import { test } from "node:test";
import assert from "node:assert/strict";
import { titleKey, bodyBlocks, stripDuplicateTitle } from "../src/bodyDisplay.js";

test("titleKey normalizes punctuation and whitespace but preserves case", () => {
  assert.equal(
    titleKey("Scroll of Leadership VII — The Means Are the Message"),
    titleKey("Scroll of Leadership VII: The Means Are the Message"),
  );
  assert.equal(titleKey("Love Series — Letter to Sandi VII: The Kitchen Light"),
    titleKey("Love Series – Letter to Sandi VII: The Kitchen Light"));
  // Curly vs straight quotes are equivalent
  assert.equal(titleKey("The Artist Who Didn\u2019t Want a Throne"),
    titleKey("The Artist Who Didn't Want a Throne"));
  // Case is NOT folded
  assert.notEqual(titleKey("the lonely heart"), titleKey("The Lonely Heart"));
  // Hyphen is a title separator, not a word difference
  assert.equal(titleKey("Scene — The Counter Move"), titleKey("Scene: The Counter-Move"));
});

test("bodyBlocks splits on blank lines and preserves internal line breaks", () => {
  assert.deepEqual(
    bodyBlocks("line one\nline two\nline three\n\nstanza two\nmore lines"),
    ["line one\nline two\nline three", "stanza two\nmore lines"],
  );
});

test("bodyBlocks treats a single prose paragraph as one block", () => {
  assert.deepEqual(bodyBlocks("Just one paragraph of prose."), ["Just one paragraph of prose."]);
});

test("bodyBlocks normalizes Unicode line separators and CRLF", () => {
  assert.deepEqual(bodyBlocks("a\u2028b\u2028c"), ["a\nb\nc"]);
  assert.deepEqual(bodyBlocks("a\r\nb"), ["a\nb"]);
});

test("bodyBlocks collapses multiple blank lines and drops empties", () => {
  assert.deepEqual(bodyBlocks("a\n\n\n\nb"), ["a", "b"]);
  assert.deepEqual(bodyBlocks("   \n\n  "), []);
  assert.deepEqual(bodyBlocks(""), []);
});

test("stripDuplicateTitle removes an exact single-line duplicate title", () => {
  const body = "Scroll of One: On Spectacle and Power\n\nHere is the body.";
  assert.equal(
    stripDuplicateTitle(body, "Scroll of One: On Spectacle and Power"),
    "Here is the body.",
  );
});

test("stripDuplicateTitle removes a punctuation-variant single-line title", () => {
  const body = "Scroll of Leadership VII: The Means Are the Message\n\nIf I become what I hate\u2026";
  assert.equal(
    stripDuplicateTitle(body, "Scroll of Leadership VII — The Means Are the Message"),
    "If I become what I hate\u2026",
  );
});

test("stripDuplicateTitle removes a markdown single-line heading", () => {
  const body = "# The Lonely Heart of the Prophet\n\nBody text.";
  assert.equal(
    stripDuplicateTitle(body, "The Lonely Heart of the Prophet"),
    "Body text.",
  );
});

test("stripDuplicateTitle removes a two-line series + subtitle heading", () => {
  const body = "# Scroll of Origins I  \n## Basis of My Art\n\nI did not begin as a prophet.";
  assert.equal(
    stripDuplicateTitle(body, "Scroll of Origins I — Basis of My Art"),
    "I did not begin as a prophet.",
  );
});

test("stripDuplicateTitle leaves an unrelated leading heading visible", () => {
  const body = "Some other heading\n\nBody text.";
  assert.equal(stripDuplicateTitle(body, "Scroll of X — Y"), body);
});

test("stripDuplicateTitle leaves a partial/numbered-scene heading visible (not fuzzy)", () => {
  // Body heading omits the scene number — not a verified exact duplicate.
  const body = "SCENE_09_THE_APPROACH.md\n\nScene: The Approach\n\nBody text.";
  assert.equal(stripDuplicateTitle(body, "Scene 09 — The Approach"), body);
});

test("stripDuplicateTitle leaves an empty title or empty body unchanged", () => {
  assert.equal(stripDuplicateTitle("", "Some Title"), "");
  assert.equal(stripDuplicateTitle("Body text.", ""), "Body text.");
});
