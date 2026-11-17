# Planning workflow

## When to write a plan

Use a written execution plan for features spanning multiple areas, migrations,
new evidence types, board/auth changes, or work with meaningful uncertainty.
Small isolated fixes and copy edits need only a brief task checklist.

This file defines the workflow, not a permanent backlog. Product notes in
[todo.md](../todo.md) and [CASE_DISCOVERY_PLAYBOOK.md](CASE_DISCOVERY_PLAYBOOK.md)
remain separate; do not treat every idea there as approved scope.

For substantial work, create a dated task plan under [active plans](exec-plans/active/index.md)
and add it to that index. Keep one plan per cohesive change. Plans are ordinary
documents, not automatically executed automation. Never store credentials,
private user data, or full evidence solutions in a plan.

## Lifecycle

1. Start with status, goal, acceptance criteria, non-goals, inspected sources, and a validation approach.
2. Update checkboxes, discoveries, and next action as work proceeds. Mark blocked work explicitly; do not silently archive it as successful.
3. On completion, record actual outcomes, checks, and remaining gaps; move the plan into [completed plans](exec-plans/completed/index.md).
4. Remove its active-index entry and add its completed-index entry. Recheck relative links after moving it.
5. Track deferred issues in the [debt tracker](exec-plans/tech-debt-tracker.md), with source evidence and no implied implementation approval.

## Required plan sections

### Goal and acceptance criteria

Describe the user-visible outcome and observable conditions for completion.
Specify non-goals/constraints; separate requested behavior from suggestions.

### Context and inspected sources

Link relevant routes, components, data contracts, and existing patterns using
repository-relative paths. Record verified facts and remaining unknowns.
Read [AGENTS.md](AGENTS.md) and relevant sections of [DESIGN.md](DESIGN.md).

### Approach and risks

Describe the smallest viable change, affected contracts, compatibility needs,
and why it fits existing patterns. Note security, spoiler exposure, SEO,
accessibility, persistence, external-service, and print risks where applicable.
Ask only when an unresolved choice materially changes scope, data safety, or
expected behavior; otherwise document a reasonable assumption.

### Steps and progress

Use ordered milestones with checkboxes. Each step identifies the area to
change and how to verify it. Mark progress during work, not just at the end.
Delegate only independent work and reconcile findings before integration.

### Validation

List actual checks appropriate to the change, not just “run tests”:

| Change | Checks to consider |
| --- | --- |
| Application logic | Relevant lint checks, `yarn lint`, `yarn build`, affected route behavior |
| Cases/evidence | Unique slugs/IDs, references, preview/viewer parity, locks/unlocks, print output |
| Board API | Request/response compatibility, authorization, moderation/fallback, unlock payloads |
| UI | Narrow/wide layouts, light/dark themes, keyboard/focus, loading/empty/error states |
| Content/SEO | Frontmatter, heading anchors, descriptive links, metadata, route/sitemap coverage |
| Documentation | Relative links, existing paths, claims checked against source |

Record commands, observed results, and manual checks. If blocked by credentials,
network access, or a pre-existing failure, state the remaining uncertainty.
Do not weaken validation or remove security gates to make a build pass.

### Decisions and discoveries

Record material discoveries, changes to the approach, and rationale. Keep this
factual; update superseded assumptions rather than retaining contradictory instructions.

### Completion and handoff

Summarize delivered behavior, checks performed, unresolved issues, and follow-up
outside scope. If interrupted, record the next concrete action and blockers.
Update architecture/instruction docs if implementation changed their claims.
Leave commits and deployment to an explicit user request.

## Definition of done

- Acceptance criteria are satisfied and unrelated work is preserved.
- Relevant validation has evidence, or limitations are stated explicitly.
- No new secret exposure, premature evidence unlock, or authorization bypass.
- All affected contract consumers are updated, including print/SEO where relevant.
- The plan and final handoff reflect actual work; no fabricated test results.