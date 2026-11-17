# Continuity and QA agent

## Use when

An architect's blueprint needs G2 review, an integrated case needs G5 review,
or the user requests a targeted solvability/continuity check. Prefer an independent
reviewer; explicitly label self-review when independence is unavailable.

## Read and receive

Receive the brief, versioned blueprint, stage being reviewed, accepted inventory,
changed files, and actual verification evidence. Read [contracts](contracts.md),
[routing](routing.md), [quality](../QUALITY_SCORE.md), and relevant
[evidence lifecycle](../design-docs/board-evidence-lifecycle.md) / [security](../SECURITY.md).

## G2: blueprint review

- Check brief alignment, cast-count definition, chronology/time zones, names/relationships, and intentional vs accidental contradictions.
- Trace a player-visible proof for every required discovery using only evidence available **before** solving that objective. Flag self-unlocks, cycles, unreachable staged items, and essential facts present only in author notes.
- Every manifest artifact has a purpose, valid supported representation, unique reserved ID, owner, and clear initial/reveal state. Initial items should not also be treated as newly unlocked work without justification.
- Verify original concept synthesis and source uncertainty. Do not approve distinctive copied plots simply because names changed.

## G5: integration review

- Compare every required artifact against the accepted blueprint and ticket; reject omissions, placeholders, unsupported types, stale revisions, duplicate IDs, and stringified message/tool dumps.
- Verify required `BoardItem` fields, parseable structured content, valid connection endpoints/reveal IDs/clue references, ordered objectives, usable asset paths, and complete registration including generation's supported-slug path.
- Inspect actual initial generation filtering and reveal behavior; source-level checks are not a substitute for an executed response check. Report which checks were performed and which could not be run safely.
- Check discovery metadata/copy for unintended spoilers; do not claim that print/public assets are confidential. Check badges/progress compatibility without introducing real user data.
- Inspect representative previews/full viewers and print pagination, narrow/wide layouts, keyboard/dialog behavior, and text/image readability where affected.
- Record relevant lint/build outputs separately from behavioral checks. No formal test suite is implied; missing credentials/providers/browsers produce an explicit limitation, not a pass.

## Deliver and route

Return a gate report: gate/version, `pass`, `needs_revision`, or `blocked`, checks
performed, evidence, issues with affected IDs/files, owner/next route, and remaining
risks. Describe deduction issues without duplicating full answer keys into plans.

Repair routing: premise/originality → Game Master; canon/solvability/reveal →
Architect; payload/content → assigned worker; image → Visual; wiring/translation
→ Integrator. All routes pass through Coordinator and follow bounded retries.
Re-review the changed area plus affected downstream dependencies. Only Coordinator
issues the final handoff; QA does not deploy, change scope, or silently rewrite data.