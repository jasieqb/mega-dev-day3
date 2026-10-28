# #4471 investigation

- Parser ticket: https://github.com/jasieqb/mega-dev-day3/issues/1 — 379 unique reports.
- Form-hint ticket: https://github.com/jasieqb/mega-dev-day3/issues/2 — 33 unique reports.
- Signed review source: [SVX](src/routes/kb/incidents/4471-review/+page.svx).
- Desk-visible review: [rendered HTML](rendered/kb/incidents/4471-review/index.html). Download and open it directly; no server is needed.
- [Rendered kb index](rendered/kb/index.html), [proposed replacement decision](rendered/kb/decisions/0002-dedupe-by-cause/index.html).
- [Exact memberships and analysis](evidence/analysis.json).

The HTML is actual Svelte server output from the exported components and tenant directory, with CSS included. It is a static snapshot: select controls are illustrative, not hydrated. Read their computed example table; rerun the build when data changes. Source pages retain their normal kb routes. The build makes their links relative so the downloaded rendered directory is navigable.

## Reproduce

Node 24 (the analysis uses native TypeScript stripping):

```
npm ci
npm run analyze
npm run build
npm run verify
```

The export's existing pages and accepted decision 0001 remain intact. The new review distinguishes authoritative classification from unresolved report wording, receipt from merge time, and historical data from current production status. The proposed decision is explicitly pending desk adoption.
