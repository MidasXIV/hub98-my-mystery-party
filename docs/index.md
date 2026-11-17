# Project knowledge map

Start with [agent instructions](AGENTS.md) and [architecture](ARCHITECTURE.md).
Use focused documents on demand rather than loading this entire tree.

| Area | Entry |
| --- | --- |
| Design rationale | [design docs](design-docs/index.md), [DESIGN](DESIGN.md) |
| Frontend conventions | [FRONTEND](FRONTEND.md) |
| Product intent/behavior | [PRODUCT_SENSE](PRODUCT_SENSE.md), [specs](product-specs/index.md) |
| Analytics baseline and next steps | [Player analysis: 2026-11-10](analytics/2026-11-10-player-analysis.md), [metric definitions](product-specs/analytics.md) |
| Execution | [PLANS](PLANS.md), [active](exec-plans/active/index.md), [completed](exec-plans/completed/index.md) |
| Quality and debt | [QUALITY_SCORE](QUALITY_SCORE.md), [tracker](exec-plans/tech-debt-tracker.md) |
| Operational constraints | [RELIABILITY](RELIABILITY.md), [SECURITY](SECURITY.md) |
| External/source references | [references](references/index.md) |
| Derived artifacts policy | [generated](generated/README.md) |
| Mystery creation and agent routing | [role index](mystery-agents/index.md), [routing](mystery-agents/routing.md), [handoff contracts](mystery-agents/contracts.md) |
| Case authoring | [authoring guide](../.github/case-data-authoring.md), [evidence reference](evidence-json/README.md) |
| Discovery research | [playbook](CASE_DISCOVERY_PLAYBOOK.md) |

## Maintenance contract

- The document that owns a rule should define it; other docs link instead of duplicating full instructions.
- Source establishes current behavior; specs describe expectations and label known gaps. Plans describe proposed work, not completed capabilities.
- Add new design/spec documents to their index. Keep dates/evidence in quality and debt entries.
- Update documentation in the same change as a contract change. Archive finished plans with outcomes; do not silently delete useful decisions.
- Review stale claims before relying on them. Do not record credentials, personal data, or private case solutions.