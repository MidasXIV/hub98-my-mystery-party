# Mystery-authoring agent instructions

Status: completed. Started/completed: 2026-10-24.

## Goal and scope

Document the notebook-inspired research/concept/architecture/dispatch/worker
workflow as separate authoring roles, with a discoverable index, routing rules,
handoff contracts, ownership, and acceptance gates. Documentation only; no
notebook edits/execution, paid generation, new mysteries, or executable agent configuration.

## Sources and decisions

The user-supplied notebook informed role sequencing, not production schemas.
Contracts were checked against [board types](../../../src/lib/boardTypes.ts),
[authoring guide](../../../.github/case-data-authoring.md), registry, generation,
and objective handlers. Existing project safety/planning rules remain in force.
Internal fictional answers belong in scoped case authoring artifacts, not plans
or reusable instructions; these are distinct from prohibited real secrets/data.

## Acceptance criteria and progress

- [x] Inspect existing docs, supplied notebook, and canonical contracts.
- [x] Write index, 11 role docs, routing and shared contracts, with bounded rework and validation gates.
- [x] Link from root/docs/authoring entrypoints without duplicating full schemas.
- [x] Check links, whitespace, editor diagnostics, and independent contract/workflow review.
- [x] Archive with actual results; preserve unrelated work.

## Validation and outcome

- Local target checks passed across 48 Markdown files, including new workflow docs and existing evidence guidance.
- `git diff --check` passed. Editor diagnostics for index, routing, contracts, root agent entrypoint, and evidence guide reported no errors.
- Independent read-only review found no material contract/routing contradictions across all 11 roles and the relevant board handlers/types.
- No application lint/build, notebook execution, provider calls, image generation, browser/PDF checks, or deployments: only documentation changed.
- No private example case solutions were copied from the notebook. No new runtime tools, classes, schema fields, or named executable agents were installed.

## Handoff

Start at the [mystery-agent index](../../mystery-agents/index.md), then load
[routing](../../mystery-agents/routing.md), [contracts](../../mystery-agents/contracts.md),
and the selected role. Future case creation requires its own plan and checks;
this task did not author or validate a playable mystery.