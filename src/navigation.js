// Shared navigation constants and helpers for the reader journey.
// The `from` query parameter identifies where a reader entered an entry from,
// so the entry page can render an origin-aware return link. Values are
// whitelisted here to avoid open redirects and to survive reloads / sharing.

export const FROM = {
  timeline: { label: "Timeline", to: "/timeline" },
  canon: { label: "Canon", to: "/canon" },
  "character-one": { label: "One", to: "/characters/one" },
  "character-sandi": { label: "Sandi", to: "/characters/sandi" },
  "character-baptist": { label: "The Baptist", to: "/characters/baptist" },
  "character-carmichael": { label: "Carmichael", to: "/characters/carmichael" },
};

// Build the `from` value for a character page (e.g. "one" -> "character-one").
export function fromForCharacter(key) {
  return `character-${key}`;
}

// Resolve a `from` value to a return target. Unknown or missing values fall
// back to the Canon explorer.
export function backLinkFor(from) {
  if (from && FROM[from]) return FROM[from];
  return { label: "Canon", to: "/canon" };
}
