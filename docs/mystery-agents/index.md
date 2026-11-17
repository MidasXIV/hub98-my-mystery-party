# Mystery-authoring agents

Use when creating a new mystery, expanding an approved concept, generating a
character/evidence bundle, or reviewing a case for fair play and app integration.
Start with [routing](routing.md) and [shared contracts](contracts.md), then load
only the assigned role. Follow the project [AGENTS](../AGENTS.md).

These are **documented authoring roles**, not installed VS Code agents, a running
LangGraph workflow, or tools. A coordinator may follow them directly or pass a
role document plus an explicit task packet to an available agent. Do not invoke
a nonexistent agent/tool merely because its role is listed here.

## Role directory

| Role | Route here when | Required output |
| --- | --- | --- |
| [Coordinator](coordinator.md) | Every new case or multi-role change | Brief, stage status, routing/ownership, handoff |
| [Researcher](researcher.md) | Originality/context needs research | Sourced notes, uncertainty, abstract inspiration |
| [Game Master](game-master.md) | Brief needs a cohesive original concept | Concept and concise design rationale |
| [Game Architect](game-architect.md) | Concept needs a playable case blueprint | Canon, stable IDs, evidence/objective/reveal map |
| [Dispatcher](dispatcher.md) | Approved blueprint needs independent work tickets | Owned, dependency-aware task queue |
| [Victim/Profile Agent](victim-agent.md) | Affected-person bundle is required | Assigned profile/document/portrait artifacts |
| [Suspect Agent](suspect-agent.md) | One suspect needs a dossier | Assigned profile, statements, interview artifacts |
| [Evidence Agent](evidence-agent.md) | Non-character evidence needs content | Parser-compatible evidence payloads |
| [Visual Asset Agent](visual-asset-agent.md) | An approved image/map/portrait task exists | Prompt/spec or verified asset, explicitly distinguished |
| [Case Integrator](case-integrator.md) | Reviewed worker results need app wiring | Complete typed dataset and registration changes |
| [Continuity & QA Agent](continuity-qa-agent.md) | Blueprint or integrated case needs independent review | Gate report, blockers, routed fixes |

## Normal route

Coordinator → optional Researcher → Game Master → Game Architect → blueprint QA
→ Dispatcher → assigned character/evidence workers (visual tasks as needed)
→ Case Integrator → final QA → Coordinator handoff.

Research is optional; bypass it when an adequate approved brief/context exists.
Do not regenerate approved stages for a small correction. Detailed branch,
retry, and failure rules live in [routing](routing.md).

## Notebook adaptation

The supplied external notebook suggests the role sequence, structured outputs,
and fan-out pattern. It is not a required dependency or a canonical app schema.
See [contracts](contracts.md) for its migration pitfalls. This documentation does
not modify/run the notebook or call its providers, and deliberately does not
copy its story solutions or hardcode its model versions.