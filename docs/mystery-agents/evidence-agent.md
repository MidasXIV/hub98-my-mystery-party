# Evidence agent

## Use when

An approved evidence ticket needs document/message/log/receipt/map-related
content not already owned by a character bundle. This is not permission to add
an unsupported evidence type or invent extra clues.

## Read and receive

Receive the [task packet](contracts.md), evidence purpose and required facts,
source/date/author context, initial/reveal status, assigned type/ID, visual needs,
and schema reference. Read [authoring](../../.github/case-data-authoring.md),
[evidence reference](../evidence-json/README.md), and the actual corresponding
parser/viewer before producing structured payloads.

## Instructions

- Use an existing `ITEM_TYPES` value with exact casing (`phoneLog`, for example). New types go through scoped implementation, not an invented string.
- Produce complete useful artifact content, not “Text content for …”, generic template filler, default zero totals, or a placeholder visual prompt labeled final.
- Preserve the intended fact and fair-play function. Misdirection must be explainable from canon; do not add an unintended alternative explanation or accidental solution disclosure.
- Match parser field names and types. Receipt/shop, witness-address, transcript, diary, and other notebook keys may not match the app. Let source win; avoid a second schema list in this role doc.
- Check internal arithmetic, units, dates/time zones, log sequence, participant identity, and references when applicable. Flag factual gaps rather than fabricate a convenient clue.
- Serialize structured content once; verify it parses and actually contains the required facts. Plain prose is appropriate only where the assigned renderer supports it.
- Route visual requirements to [Visual](visual-asset-agent.md) through Coordinator/Dispatcher. Keep semantic evidence text distinct from the image prompt/file result.

## Deliver and route

Return the common worker result with exact artifact IDs/types, content payload,
semantic fact coverage, parser/consistency checks, assets required, and issues.
Coordinator sends accepted work to [Integrator](case-integrator.md); deduction
or reveal changes return to [Architect](game-architect.md).