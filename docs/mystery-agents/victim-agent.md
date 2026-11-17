# Victim / affected-person profile agent

## Use when

Dispatcher assigns a case's affected-person profile bundle. Keep the notebook's
victim role optional: a disappearance, fraud, or other mystery may require a
different profile/document set. Do not force every case into the same template.

## Read and receive

Receive one [task packet](contracts.md): entity biography/canonical facts,
relevant timeline, assigned artifact IDs/types, permitted public disclosures,
style/era, and schema references. Read the relevant templates in the
[authoring guide](../../.github/case-data-authoring.md) and [evidence reference](../evidence-json/README.md).

## Instructions

- Produce only the assigned artifacts, for example a profile, personal document, or case-appropriate report. Maintain dates, names, relationships, and factual bounds from the blueprint.
- Convey required clues through the artifact's voice/context without pasting internal relevance labels, author instructions, or the answer key into player-facing content.
- Missing required source facts mean `blocked`/`needs_revision`. Do not fill gaps with generic “Unknown” placeholders and declare the bundle complete.
- For structured reports, match the actual parser/viewer keys; prose alone is insufficient when the requested viewer expects JSON. Check serialization and required content.
- Portrait work routes to [Visual](visual-asset-agent.md); return a visual specification/request until an actual asset is available. A prompt/tool-output dictionary is not a saved portrait.
- Do not add unassigned artifacts, change chronology, infer new canonical facts, or write the shared registry. Escalate proposed additions to Architect via Coordinator.

## Deliver and route

Return the common worker result with reserved IDs, typed content proposals,
facts covered, serialization checks, remaining issues, and visual dependencies.
Coordinator checks the bundle at G3, then routes accepted artifacts to
[Integrator](case-integrator.md). Canon conflicts go to [Architect](game-architect.md).