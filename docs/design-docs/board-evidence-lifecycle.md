# Board and evidence lifecycle

Status: current model and change guardrails. Reviewed 2026-10-24.

## Context and sources

Case identity comes from the [registry](../../src/data/coldCases.ts); the shared
envelope and item types live in [boardTypes](../../src/lib/boardTypes.ts).
Play is interactive; print must work without the interactive shell.

## Representation decision

Evidence is authored once in case datasets and interpreted by dedicated
preview/viewer components and print dispatch. Keep those representations aligned
rather than inventing a second print-only evidence schema. Structured `content`
uses the existing parsers/templates; see [authoring](../../.github/case-data-authoring.md).

Changing a type requires reviewing `ITEM_TYPES`, the [play dispatch](../../src/app/play/[slug]/page.tsx),
the [print dispatch](../../src/app/print/[slug]/page.tsx), and any relevant utility parser.
Maintain unique item/objective IDs, valid connection endpoints, and valid
`unlockOnObjectiveId` references.

## Unlock decision

The [generation handler](../../src/lib/api/board/generate.ts) filters locked
evidence on the server. The [objective handler](../../src/lib/api/board/objective.ts)
evaluates answers and returns objective-linked items/connections to integrate.
Do not replace this with CSS/client hiding or send locked payloads early.

The [public registry](../../src/data/coldCases.ts) contains metadata only. Full
datasets are assembled behind the `server-only` guard in the
[server registry](../../src/data/coldCases.server.ts). Generation sends objective
IDs/descriptions, not canonical solutions; scoring and print use the server registry.

Tradeoff: these mechanics support staged play; they are not a guarantee that
repository data, public assets, or print routes hide every solution. New
confidentiality requirements need a separate delivery/access-policy design.

## Verification implications

- Check generated payloads, not just visible cards.
- Check valid IDs and connection references before/after unlocking.
- Check repeated submissions/unlock integration without duplicated artifacts.
- Review moderation and scoring fallback when changing evaluation.
- Compare representative preview, full viewer, and printed content.
- Review progress merges without assuming a full board-layout sync model.

See [reliability](../RELIABILITY.md), [security](../SECURITY.md), and
[the player journey](../product-specs/case-investigation.md) for related checks.