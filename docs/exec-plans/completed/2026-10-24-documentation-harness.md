# Documentation harness revamp

Status: completed. Started/completed: 2026-10-24.

## Goal and acceptance criteria

Replace overlapping instructions with a discoverable root map, architecture
reference, focused topic guides, indexed design/spec documents, and plan lifecycle.
Links must resolve; current limitations must not be described as implemented guarantees.

## Scope and non-goals

Documentation only. Preserve the discovery playbook, evidence reference, and
unrelated working-tree changes. No runtime changes, external calls, invented
database schema, fabricated numerical quality score, or enforcement-hook claims.

## Sources and approach

Inspected existing docs, package scripts, board dispatcher/handlers, Clerk
progress model, UI/theme patterns, and repository CI/test configuration.
The root [AGENTS](../../../AGENTS.md) retains discovery; [architecture](../../ARCHITECTURE.md)
owns boundaries. Topic guides own detailed rules. The docs compatibility
entrypoint now points to the root, eliminating its accidental self-reference.

## Progress

- [x] Audit moved docs and current source; identify broken paths.
- [x] Write focused guides, indices, specs, references, and evidence-based debt notes.
- [x] Validate local links, whitespace, scope, and entrypoint editor diagnostics; obtain independent source review.
- [x] Archive this plan and update both indices; preserve relative link depth.

## Decisions and discoveries

- Root discovery files initially followed the user's example. Subsequently, both detailed guides were relocated under docs, leaving only the root agent discovery pointer.
- No relational database schema exists in the inspected model. The generated directory explains provenance requirements instead of providing a fictitious schema.
- References cover actual project tooling, not Nixpacks/uv from the example.
- Quality is qualitative and source-reviewed; application runtime checks were not executed for this docs-only change.
- Known authorization, in-memory limiting, dependency alignment, prototype persistence, and client webhook concerns are recorded as gaps/review items, not silently remediated or claimed secure.

## Validation and outcome

- Local Markdown target checks passed across 32 files (root guidance, Copilot entrypoint, and docs tree), including literal bracketed route paths.
- `git diff --check` passed. Root/Copilot entrypoint editor diagnostics reported no errors.
- Independent read-only review checked architecture/security/reliability claims and confirmed the root/docs instruction chain is not circular.
- Application lint/build, browser tests, paid provider calls, webhooks, and PDF exports were not run: no runtime code changed.
- External reference URLs were not fetched; they are destinations, not a verified upstream documentation snapshot.

## Handoff

Use the [knowledge map](../../index.md) for focused loading and the
[debt tracker](../tech-debt-tracker.md) for deferred review candidates. These
documents guide agents; automation, CI, generators, and enforcement hooks remain
out of scope. Existing unrelated application edits were left untouched.