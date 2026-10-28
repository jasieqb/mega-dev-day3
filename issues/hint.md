## Problem and scope
33 unique reports in #4471 belong to the booking-v3 date hint cause, across 3 tenants (Alder Physio, Copper Studio, Pale Harbour), received 2026-04-17 through 2026-09-22. This is an export snapshot through October 4, not a live count. One report ID counts once, even when overlapping export pages repeat it.

## Evidence and reproduction
The tenant directory supplies locale and form version. `causeOf` in `src/lib/kb/causes.ts` identifies day-first tenants using channel=form and form=booking-v3. The form displays MM/DD/YYYY, so people type month first; the form interprets the input in the tenant's day-first order. This differs from the shared parser issue (#1).

Reproduce with Alder Physio (de-DE, booking-v3), form channel: enter 04/07/2026 following the displayed MM/DD/YYYY hint for April 7. The tenant-order interpretation treats this as July 4. Expect the visible format instructions and interpretation to agree. App/email from the same tenant remain on the parser path; form channel alone is insufficient because booking-v2 differs.

Intake labeled 18 of these hint and 15 parser. Do not count by intakeTag, browser locale, or subject. `npm run analyze` computes the exact membership in `evidence/analysis.json` using the supplied executable rules.

## Acceptance
Make booking-v3's displayed hint consistent with its date interpretation for each tenant locale. Test ambiguous dates, day > 12, all three affected tenants, and booking-v2 controls. Keep shared-parser remediation and counts separate. All 33 currently lack their own cause-specific ticket in the exported desk view; split them out of #4471.

## Context
Together #1 and #2 account for 412 distinct reports, not 427 export rows or 371 parser-tagged / 41 hint-tagged reports. Subject-only merging conflated the causes. See `src/routes/kb/incidents/4471-review/+page.svx` and the rendered page under `rendered/`.
