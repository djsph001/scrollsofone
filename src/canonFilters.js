// Vite-side data layer for the Canon Explorer filters. Derives the series/who
// sets and their slug maps from publicEntries.json (a Vite JSON import — this module
// is only imported by browser components, never by node scripts).

import data from "./publicEntries.json";
import { deriveSeries, deriveWho, buildSlugMaps, PATHS } from "./canonFilterParams";

export const ENTRIES = data.entries;
export const STATS = data.stats;
export const SERIES = deriveSeries(ENTRIES);
export const WHO = deriveWho(ENTRIES);
export const SLUG_MAPS = buildSlugMaps({ series: SERIES, who: WHO, paths: Object.keys(PATHS) });

export { PATHS };
