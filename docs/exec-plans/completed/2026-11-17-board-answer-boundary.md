# Keep board answers server-only

Status: completed 2026-11-17. Scope: audit finding 2 only.

## Goal and acceptance criteria

- Generation returns objective IDs/descriptions, never canonical solutions.
- Public case metadata imports cannot pull evidence datasets into client code.
- Server scoring, print, badge awards, catalog objective counts, promotional badges,
  and the completed finding 1 resume behavior keep working.
- No dependencies or changes to public print access, scoring rules, or save behavior.

## Context and inspected sources

Read [agent guidance](../../AGENTS.md), [planning](../../PLANS.md),
[security boundaries](../../SECURITY.md), and [architecture](../../ARCHITECTURE.md).
Sources: [registry](../../../src/data/coldCases.ts),
[generation](../../../src/lib/api/board/generate.ts),
[scoring](../../../src/lib/api/board/objective.ts),
[discovery](../../../src/lib/case-discovery.ts), and their callers.

## Approach and risks

Keep the existing public registry path metadata-only. Move dataset assembly to a
server-only registry used by generation/scoring/badges/print. Keep public badge
image URLs in metadata; derive catalog counts on the server and exclude evidence
before passing catalog objects to client components.

Security review: allowlist generated objective fields, guard the full registry
with `server-only`, check public metadata and serialized catalog objects for
evidence/solutions, and retain server canonical solutions for scoring.
This does not make public assets, intentional previews, or print confidential.

## Steps and progress

- [x] Trace registry, API, print, catalog, and client imports.
- [x] Add failing answer-disclosure regressions.
- [x] Split public metadata/server evidence and update dependent surfaces.
- [x] Run regression, lint, type, and client dependency/bundle checks.
- [x] Update architecture/audit status and archive this plan.

## Validation and handoff

The API disclosure test failed before implementation, then all 13 Node tests
passed. The tests cover finding 1 compatibility, answer projection, registry and
badge parity, catalog counts, and recursive client dependency boundaries.
Targeted lint, `yarn.cmd tsc --noEmit --incremental false`, and
`yarn.cmd build` passed; all 124 static pages were generated.

Production inspection found none of the 16 full canonical explanations in 44
client JavaScript chunks. Two name-only answers were excluded from string matching
because public character names are intentional; dependency checks still exclude
all full datasets.

No live provider/scoring request or signed-in browser check was performed.
Existing public print/assets, authored previews, and unrelated worktree edits
were preserved. No dependencies or credentials were changed.
