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

// Recognize a structured heading: kind label ("Scene", "Scroll of <Series>",
// "Love Series"), optional Arabic or Roman number, a separator (colon or dash),
// then the descriptive title. The series label is matched non-greedily so a
// following number/title is never swallowed into the label.
const HEADING_RE = /^(?:Scene|Scroll(?: of [A-Za-z0-9 &'\u2019]+?)?|Love Series)\s*(?:(?:\d{1,3})|(?:M{0,4}(?:CM|CD|D?C{0,3})(?:XC|XL|L?X{0,3})(?:IX|IV|V?I{0,3})))?\s*[:\u2014\u2013\u2012-]\s*(.*)$/;

// Return the descriptive core of a structured heading, or null when the string
// does not begin with a recognized kind label. Used to suppress a body heading
// only when its core exactly equals the frontmatter title's core.
function headingCore(s) {
  const m = HEADING_RE.exec(String(s ?? '').trim());
  if (!m) return null;
  const core = (m[1] || '').trim();
  return core ? titleKey(core) : null;
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

  // Structured heading: strip kind + number + separator from both the body's
  // leading line and the frontmatter title, and suppress only on an exact core
  // match (e.g. "Scene: The Approach" vs "Scene 09 — The Approach"). No fuzzy.
  const bodyCore = headingCore(first);
  const titleCore = headingCore(title);
  if (bodyCore !== null && titleCore !== null && bodyCore === titleCore) {
    return dropLeading(lines, 1);
  }

  return body; // uncertain — leave visible and report
}
