# Technical debt tracker

Source-reviewed 2026-10-24. Entries are observations/review candidates, not a
security audit or approved implementation queue. No owner, deadline, or numeric
severity is invented. Create a scoped plan before acting; close entries with
evidence and a link to the completed plan.

| ID | Status | Evidence and impact | Next scoped action |
| --- | --- | --- | --- |
| TD-01 | Open | [Package](../../package.json) has lint/build but no test script; focused [board resume regressions](../../scripts/board-resume.test.mjs) added 2026-11-17, with no GitHub Actions workflow configured | Expand tests to failed/concurrent progress writes and agree a CI baseline |
| TD-02 | Review needed | [Dispatcher](../../src/app/api/board/route.ts) does not authenticate generate/objective actions; UI gating is not API authorization | Confirm intended public vs account-only policy and test affected handlers before changing it |
| TD-03 | Open | [Objective handler](../../src/lib/api/board/objective.ts) has process-local caching/limiting | Assess shared limiting if deployment/abuse requirements need cross-instance guarantees |
| TD-04 | Open | [Roadmap voting](../../src/components/roadmap-voting.tsx) and [feedback](../../src/components/feedback-panel.tsx) contain hardcoded webhooks in client code: current exposure paths; do not reproduce values | Plan server-side delivery and credential remediation with explicit authorization |
| TD-05 | Product decision | [Waitlist](../../src/app/waitlist/actions.ts) and [affiliate](../../src/app/affiliates/actions.ts) are prototype logging/notification flows | Define consent, persistence, and delivery requirements before promising durable registration |
| TD-06 | Compatibility constraint | [Generation](../../src/lib/api/board/generate.ts) requires `API_KEY` despite static case generation | Decide whether the gate is intentional; change only with documented compatibility checks |
| TD-07 | Review needed | [Progress model](../../src/lib/player-progress.ts) uses Clerk public metadata | Evaluate limits/concurrent updates for actual usage before adding more state; never store secrets there |
| TD-08 | Open | [Package](../../package.json) specifies Next 16 and eslint-config-next 15.5.4 | Verify compatibility and lint baseline before a scoped dependency alignment |
| TD-09 | Open | 2026-11-18: local production traces include all 197 public files (about 219.8 MiB) in several page/social-image routes, versus about 2.6 MiB for the board API; deployed contribution to the reported Function Storage limit is unverified. See [measurements and investigation](../RELIABILITY.md#vercel-function-storage-investigation-2026-11-18) | Confirm Vercel per-project usage and deployed bundle sizes; narrow image filesystem tracing without breaking social images, then compare output. Review retention separately with approval |

For new entries include date, source, observed limitation, impact/uncertainty,
and a concrete next action. Do not record live secrets or private user data.

## Detailed audit reports

- [Play board audit, recorded 2026-11-17](../play-board-audit-2026-11-17.md):
  11 findings covering resume/unlocks, answer exposure, progress durability,
  board edits, hints, configuration, layout fitting, tests, and duplicate badge
  loading. Findings 1 and 2 are fixed, findings 3-11 remain open, and finding 10 has partial
  test coverage. Original finding numbers and validation limits are preserved.
  Findings 3, 8, and 10 expand TD-07, TD-06, and TD-01 respectively; the report
  does not approve implementation work.