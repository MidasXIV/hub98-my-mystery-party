# Shared authoring and handoff contracts

All [roles](index.md) follow this contract. Authoring records below are a
**proposed collaboration convention**, not fields accepted by the application or
a newly implemented Python/Pydantic schema. Canonical runtime contracts remain
in [boardTypes](../../src/lib/boardTypes.ts) and the [authoring guide](../../.github/case-data-authoring.md).

## Brief and canonical blueprint

Coordinator captures: working case ID/slug, theme, era, setting, tone, case type,
difficulty, cast count **and what it counts**, twist preference, audience/content
boundaries, desired artifact count/length, target play/print surfaces, existing
material, external-service budget/permission, and definition of done. Record
defaults/unknowns rather than silently interpreting hardcoded notebook values.

Game Architect owns a versioned blueprint containing:

- Public premise and separately marked internal fictional answer/rationale.
- Entity IDs, names/aliases, relationships, claims, established facts, dated timeline, and uncertainties.
- Evidence manifest: item ID, owner, supported type, purpose, exact fact conveyed, source, initial/reveal status, rendering/schema reference, and visual need.
- Objective map: stable ID, description, expected discovery/answer, prerequisite **available item IDs**, planned unlock item IDs, and authored order.
- Connection map and a player-visible deduction path showing how every objective can be solved using evidence available before it is completed.

Internal fictional answers are needed by assigned authors/reviewers. Keep them
in the designated case authoring artifact or scoped task context, not general
instruction docs, discovery copy, execution plans, or logs. These labels limit
accidental spoilers, not access: committed data/public assets/print may expose
answers. Do not store real personal data or credentials in any authoring packet.

## Task packet (Dispatcher → worker)

Every task must specify these fields, as structured JSON or a clearly labeled
record; do not rely on ambient notebook globals:

| Field | Meaning |
| --- | --- |
| `task_id`, `case_id`, `case_slug`, `blueprint_version` | Stable routing identity and exact canon revision |
| `role`, `target_id`, `artifact_ids` | Assigned role/entity and explicitly reserved output IDs |
| `depends_on_task_ids` | Prerequisites; empty means ready once blueprint is approved |
| `required_context` | Relevant canon, dates, relationships, exact permitted facts, disclosure boundaries |
| `instructions`, `acceptance_criteria` | Deliverable content, schema reference, length and semantic requirements |
| `output_scope` | Authorized files/artifacts; default return-only unless file writes are explicitly assigned |
| `asset_requirements`, `provider_permission` | Needed images, mode (spec-only/existing/authorized generation), budget/limits |

Task types such as character/evidence/visual are **workflow labels**, not new
`BoardItem.type` values. Give workers only relevant canon, but enough to maintain
consistency. Shared entity/style facts use the same blueprint revision.

## Worker result (worker → coordinator/integrator)

Return `task_id`, `blueprint_version`, `status` (`ready`, `blocked`, or
`needs_revision`), `artifacts` with reserved IDs/types/content or asset references,
`checks_performed`, `issues`, and `next_route`. Include provenance/uncertainty for
research and asset work. A missing file, failed tool, invented fact, or placeholder
is not `ready`. Check all required deliverables, not a “MISSION ACCOMPLISHED” string.

Results are isolated proposals until accepted. Workers do not append full shared
conversation histories or mutate the registry. Retries replace results for the
same task/artifact identity; they do not append duplicate IDs. Reject stale
blueprint versions and report conflicting content instead of last-write-wins.

## App translation (Integrator only)

`BoardData` contains `items`, `connections`, `objectives`, and optional `clues`.
Every `BoardItem` requires `id`, supported `type`, string `content`, `position`,
`size`, `rotation`, and `packIn`; title/image path/reveal ID are optional as typed.
`packIn` slots are `suspect`, `evidence`, `bonus`, or `clues`.

- Runtime objectives have `id`, `description`, optional `solution`. Authoring `dependent_on`/unlock lists are not runtime fields; preserve objective array order and translate reveal ownership to each item's `unlockOnObjectiveId`.
- A single item has at most one reveal objective under the current schema. Flag many-to-many or branching requirements for design rather than inventing unsupported fields.
- Connections reference actual item IDs. Optional clues reference existing objectives using `forObjective`.
- Structured viewer content is serialized once as JSON text, then checked with the real parser/viewer; do not stringify an entire message/tool response or model object into evidence.
- `imageUrl` must resolve to a usable asset. A prompt, local absolute path, bytes dump, or stringified success dictionary is not an image URL.
- Layout/packaging is an explicit integration responsibility, not an LLM guess. Check practical readability and valid numeric dimensions.

## Notebook pitfalls to avoid

- Repeated class names overwrite schemas (notably scene data vs investigation metadata); use one unambiguous canonical definition per concept if implementing automation later.
- Normalize typed task objects/JSON once at the boundary; do not mix arbitrary dict/object accesses or serialize an AI message wrapper as the story text.
- Tool names must match real available tools. The notebook's portrait-tool name mismatch can lose generated assets; docs do not install those tools.
- Reserve IDs per artifact, not loop iteration: multiple tool calls in one iteration must not share the same ID. Refer to entities by stable IDs, not fragile list indices.
- Parser names/keys come from current app sources, not notebook comments. For example transcript JSON uses `department`, `title`, `caseNumber`, `date`, `interviewer`, `subject`, `bodyRaw`; do not substitute the notebook's later alias list blindly.
- Do not substitute “Unknown”, zero-value receipts, generic draft text, or ungenerated image prompts for required final content. Missing canon blocks/revises the task.
- A LangGraph `Send` requires all necessary context; it is not an implicit shared global. Runtime orchestration/reducers/tool loops are outside this docs-only workflow.