# Scrolls of One

The canonical public record for **The Voice of One** universe. The site presents the literary world to readers while preserving a validated distinction between current canon, drafts, seeds, superseded material, and archives.

## Structure

- `canon/` — active source material and metadata
- `archive/` — retained superseded material
- `audit/` — controlling-version and continuity records
- `screen/` — derived screenplay material; cannot establish canon
- `src/` — reader-facing React application
- `build-canon.mjs` — canon metadata validator and data generator
- `scripts/` — static route, build, metadata, and sitemap generation
- `dist/` — generated production site

## Local development

```bash
npm ci
npm run check:canon
npm run dev
```

## Production build

```bash
npm run build
```

The build validates canon, checks the public display set and reading paths, generates static routes, builds the site, moves page metadata into the document head, and produces the sitemap and robots file.

## Canon rules

Canon metadata is validated against closed vocabularies in `build-canon.mjs`. Stable entry IDs must not be renamed casually: they are public URLs and may participate in supersession chains. Screen documents inherit from canon and cannot create new canon facts.

The controlling record for resolved forks and authorial rulings is `audit/CONTROLLING_VERSION_REGISTER.md`.
