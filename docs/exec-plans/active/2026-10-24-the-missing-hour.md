# The Missing Hour — authoring execution plan

## Status, goal, and acceptance criteria

Status: active; G1 accepted by user on 2026-10-24. Current authorized milestone
is a canonical blueprint and G2 review, not case implementation or publication.

Produce a coherent, versioned blueprint for the accepted concept, with stable
IDs, owner inventory, chronology, and a pre-unlock proof for every objective.
Obtain independent blueprint review and record its actual result.

Author-only artifact: [blueprint TMH-1](../../case-authoring/the-missing-hour/blueprint-v1.md).
Keep fictional solutions in that scoped artifact, never in this plan.

## Context and inspected sources

- [Agent guide](../../AGENTS.md), [planning](../../PLANS.md),
  [product scope](../../PRODUCT_SENSE.md), [design](../../DESIGN.md).
- [Architect](../../mystery-agents/game-architect.md),
  [contracts](../../mystery-agents/contracts.md),
  [routing](../../mystery-agents/routing.md),
  [QA](../../mystery-agents/continuity-qa-agent.md).
- [Authoring guide](../../../.github/case-data-authoring.md),
  [board contract](../../../src/lib/boardTypes.ts),
  [evidence lifecycle](../../design-docs/board-evidence-lifecycle.md).
- Worktree inspected before edits; existing documentation and unrelated admin
  application work are preserved. No stage, commit, reset, or deployment.

## Approach and risks

Keep the approved five-person, medium-difficulty, nonviolent contemporary concept.
Use supported text documents, including clearly labelled photo descriptions,
so essential deductions require no ungenerated visual assets or paid services.
Names, duration, location, and date are proposed design defaults within the
approved concept, not externally verified historical claims.

Risks: author-only spoilers can be read in repository documents; text-first
rendering needs later usability checks; objective order is not server-enforced;
nonviolent positioning must remain accurate. No new schema or runtime behavior.

## Steps and progress

- [x] Confirm G1 acceptance and inspect authoring contracts/worktree.
- [x] Write canonical `TMH-1` blueprint and stable inventory.
- [x] Obtain independent G2 review; no blocking issues or canon revision required.
- [x] Validate new documentation links, inventory, and whitespace.
- [x] Record G2 result and the next concrete task.

Deferred, not authorized by this milestone: Dispatcher tickets, full evidence
authoring, dataset/registry integration, runtime tests, generated imagery, release.
This case plan stays active for resumption; it does not mark the whole case done.

## Validation

Completed: PowerShell checks passed for four affected documents, 21 local
links, whitespace, 15 unique manifest IDs, four unique objectives, four hint
references, 13 connection edges, all reveal references, and supported document
type. The first checker mistakenly included connection-table rows in manifest
counts; limiting it to the manifest section fixed the checker, not the case.
Independent pre-unlock solvability and chronology review passed separately.
No application build is needed for this docs-only milestone. No runtime,
browser, provider, PDF, authentication, or scoring check is implied.

## Decisions and discoveries

- 2026-10-24: user accepted the concept and requested the next step.
- `TMH-1` is the first canonical revision; no prior runtime IDs are replaced.
- Required photo-derived observations use explicit text descriptions; actual
  images are optional future enhancement, not missing required deliverables.

## Completion and handoff

G2 passed independent review and Coordinator acceptance; see the
[gate report](../../case-authoring/the-missing-hour/g2-review-v1.md). Documentation
validation passed. Next stage after this handoff: Dispatcher prepares
explicit `TMH-1` authoring tasks. No runtime files or final evidence were created.