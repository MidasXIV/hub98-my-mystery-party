# New-user entry and onboarding

Status: existing journey with regression criteria, reviewed 2026-10-24.
This does not propose or claim a dedicated onboarding wizard.

## Audience and outcome

A first-time visitor needs to understand the case, availability, and how to
start playing without seeing solutions or mistaking a prototype for a promise.

## Current surface

- [Case listing](../../src/app/cases/page.tsx) and [detail](../../src/app/cases/[slug]/page.tsx) use registry metadata.
- [Play access gate](../../src/components/play-access-gate.tsx) and Clerk account controls govern the visible entry experience.
- The [play route](../../src/app/play/[slug]/page.tsx) presents the investigation board; [progress handler](../../src/lib/api/board/player-progress.ts) handles account progress.

UI gating is not proof of API authorization. See [SECURITY](../SECURITY.md).

## Acceptance criteria for related changes

- Case identity and availability remain consistent between listing and detail.
- Signed-out/signed-in entry states have clear next actions and no misleading access/saved-state claims.
- Missing or unavailable case handling is explicit; do not invent a playable board for an invalid slug.
- The first board view makes the objective and evidence inspection discoverable without exposing locked payloads.
- Narrow layouts and keyboard operation retain the entry task; account dialogs preserve focus behavior.
- Failure to initialize or save is not presented as success; provide a meaningful recoverable state where supported.

## Non-goals and verification

No new auth provider, marketing funnel, automatic email opt-in, or additional
onboarding steps without a separate request. Verify listing/detail/entry for
signed-out and signed-in contexts using scoped checks; record any untested
Clerk/network dependencies in the plan instead of claiming a completed audit.