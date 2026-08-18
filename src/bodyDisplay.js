// Display-layer helpers for canon entry bodies.
// Pure (no React, no DOM) so they can be unit-tested under node:test and shared
// by the entry page. These transform how a body is *displayed* — they never
// alter the underlying canon text.

// Normalize a title for exact-duplication comparison: collapse whitespace, map
// curly quotes to straight, and treat title separators (colon, em/en dash,
// hyphen) as equivalent. Case is intentionally NOT folded — a duplicate must
// match on its words, not merely sound alike. Never use for fuzzy matching.
export function titleKey(s) {
  return String(s)
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[:\u2014\u2013\u2012-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Split a body into blocks at blank lines. Normalizes CRLF and Unicode line
// separators to \n first. Each block keeps its internal single line breaks
// (intended to render under white-space: pre-line).
export function bodyBlocks(body) {
  return String(body ?? '')
    .replace(/\r\n/g, '\n')
    .replace(/\u2028/g, '\n')
    .split(/\n[ \t]*\n/)
    .map((b) => b.trim())
    .filter((b) => b.length > 0);
}

// Strip a leading markdown heading marker (#, ##, ### …) from a line.
function stripHeading(line) {
  return String(line ?? '').replace(/^#{1,6}\s*/, '').trim();
}

// Drop the first `n` lines plus any immediately-following blank lines, then
// rejoin the remainder.
function dropLeading(lines, n) {
  let i = n;
  while (i < lines.length && lines[i].trim() === '') i += 1;
  return lines.slice(i).join('\n');
}

// Remove a verified leading title block ONLY when it duplicates the frontmatter
// title (which the entry page already renders as its H1). Two forms are
// recognized:
//   1. exact single-line title, and
//   2. a two-line series/title followed by a subtitle.
// Matching is exact modulo punctuation/whitespace normalization — never fuzzy.
// Returns the ORIGINAL body unchanged when the leading block is not a verified
// duplicate (i.e. leave it visible rather than risk deleting real content).
export function stripDuplicateTitle(body, title) {
  const text = String(body ?? '');
  const target = titleKey(title);
  if (!target || !text) return body ?? '';

  const lines = text.replace(/\r\n/g, '\n').replace(/\u2028/g, '\n').split('\n');

  const first = stripHeading(lines[0]);
  if (first && titleKey(first) === target) {
    return dropLeading(lines, 1);
  }

  const second = stripHeading(lines[1]);
  if (second && titleKey(`${first} ${second}`) === target) {
    return dropLeading(lines, 2);
  }

  return body; // uncertain — leave visible and report
}
