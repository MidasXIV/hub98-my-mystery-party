# Case investigation

Status: current journey with regression criteria, reviewed 2026-10-24.

## User outcome

A player chooses a mystery, inspects evidence, submits an objective answer,
understands the result, and continues with newly available evidence. Offline
groups can use readable print artifacts.

## Current model

- [Registry](../../src/data/coldCases.ts) supplies case metadata/evidence and slug lookup.
- [Dispatcher](../../src/app/api/board/route.ts) routes generate/objective/badge/progress actions.
- [Play](../../src/app/play/[slug]/page.tsx) uses evidence previews/viewers and objective unlocks.
- [Progress model](../../src/lib/player-progress.ts) records case/kit and objective progress in Clerk metadata; this does not imply every board interaction is synchronized.
- [Print](../../src/app/print/[slug]/page.tsx) renders evidence with viewer components for offline/PDF use.

## Acceptance criteria for related changes

1. Slugs, IDs, and connections resolve consistently across discovery, play, print, and progress.
2. Initial generation excludes locked evidence from its response, not just from the visible canvas.
3. Preview and full viewer content agree; print has usable text and page breaks without interactive controls.
4. Submission results distinguish an unsuccessful answer from service failure where applicable; preserve moderation/fallback behavior.
5. Unlocks target the correct objective and integrate items/connections consistently, including repeated submissions.
6. Progress failures are not labeled saved. Signed-out behavior and authenticated updates respect current handler ownership checks.
7. Discovery copy, metadata, and general errors do not introduce accidental solutions.

## Limits and verification

Do not infer strong spoiler confidentiality from public content/print surfaces,
durable cross-instance limiting from memory caches, or full synchronization from
account metadata. See [architecture](../ARCHITECTURE.md) and [known debt](../exec-plans/tech-debt-tracker.md).
Use representative cases with initial/locked evidence and print artifacts; note
provider/account checks that could not be run. No additional paid integrations
or access-policy changes are implied by this spec.