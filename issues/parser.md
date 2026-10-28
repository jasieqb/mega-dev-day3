## Problem and scope
379 unique reports in #4471 belong to the shared month-first parser cause, across 11 tenants, received 2026-04-01 through 2026-10-04. This is an export snapshot through October 4, not a live count. The export has 427 rows but 412 unique IDs overall; overlapping export pages must not inflate counts.

## Evidence and reproduction
The tenant directory supplies the actual locale and booking form. `causeOf` in `src/lib/kb/causes.ts` assigns day-first tenants to parser unless the report comes via a booking-v3 form. The shared parser reads dates month first. For example, Harbour Dental / en-GB / app, R-41200: 7 April became 4 July. R-41203: 2 December became 12 February. Reproduce with a day-first tenant and an ambiguous DD/MM input through app, email, or booking-v2 form; expect the intended date to survive, but the parser swaps month and day.

Intake labeled 356 of these parser and 23 hint; browser locale and intakeTag are guesses, not the grouping authority. Compute with `npm run analyze`; exact report IDs are in `evidence/analysis.json`.

## Unresolved evidence
Five reports are filed here by the supplied tenant/channel rules but describe apparent one-day shifts or other anomalies: R-41202, R-41209, R-41236, R-41344, R-41620. They are included in 379, not counted again as a confirmed third cause. Preserve their original bodies and investigate timestamps, time zones, and original input before claiming a mechanism. Parser repair alone cannot be assumed to resolve them.

## Acceptance
Respect the tenant's intended date order on the shared parser path; cover ambiguous dates and day > 12 without silent reinterpretation. Check regressions across tenant locales and channels. Keep booking-v3 hint behavior separate (#2). Independently investigate the five anomalies.

## Context
#4471 incorrectly says one issue and one fix. 184 reports were merged on July 2; that is processing time, not an onset spike. This issue counts reports, not unique users or appointments. See the signed knowledge page in `src/routes/kb/incidents/4471-review/+page.svx` and its rendered HTML under `rendered/`.
