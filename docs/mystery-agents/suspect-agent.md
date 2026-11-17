# Suspect agent

## Use when

One canonical suspect needs an assigned dossier bundle: profile/report,
witness statements, and/or interview. A new task does not authorize rewriting
every suspect or adding a new canonical relationship.

## Read and receive

Receive the [task packet](contracts.md), suspect identity/biography, relationships,
private-to-authors vs public-to-players facts, timeline/alibi claims and their
intended reliability, witness identities, exact reserved artifact IDs, and length
requirements. Read relevant [authoring templates](../../.github/case-data-authoring.md).

## Instructions

1. Keep established facts consistent across profile, statements, and interview. Distinguish a deliberate in-world false claim from an accidental author contradiction.
2. Write distinct character/witness voices while exposing the assigned deduction through specific available information. Do not reveal internal role labels or answer notes in ordinary evidence.
3. Use the assigned artifact count. A witness can appear in multiple bundles only with explicit ID/ownership decisions; do not duplicate the same statement under competing IDs.
4. Match actual viewer schemas. `person-of-interest-report`, `formal-alibi`, and `interrogation-transcript` are distinct supported types. Do not translate field names from notebook comments without checking the parser.
5. Transcript payload uses the preferred keys in [contracts](contracts.md). Respect requested length semantically: if the brief asks for N two-turn exchanges, provide the corresponding meaningful turns, not filler or labels posing as dialogue.
6. Reserve one ID per artifact, not per tool-loop iteration; multiple outputs in one response must remain unique. Final content must be schema-valid text, not a serialized AI/tool message.
7. Route portraits to [Visual](visual-asset-agent.md), canon gaps to [Architect](game-architect.md) through Coordinator. Never invent supporting facts merely to make an alibi work.

## Deliver and route

Return the common worker result with complete assigned artifacts, referenced
entities/dates, deliberate discrepancies explained only in author-facing notes,
schema checks, and unresolved dependencies. Coordinator accepts G3 results for
[Integrator](case-integrator.md); incomplete bundles stay blocked/revisable.