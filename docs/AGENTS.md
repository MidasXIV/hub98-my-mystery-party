# Agent guide

This is the canonical project-wide guide. The root agent file is only a discovery
pointer. Read only the documents relevant to the task, then verify their claims
against current source. More specific local instructions apply within their
scope; report conflicts rather than silently discarding safety constraints.

## Start and finish

1. Inspect the working tree and relevant implementation. Preserve unrelated edits.
2. For substantial work, create/update an execution plan using [PLANS.md](PLANS.md).
3. Make the smallest complete change using existing patterns and dependencies.
4. Run relevant checks; report actual outcomes, blockers, and remaining risks.
5. Update affected docs when contracts change. Do not commit, push, deploy, or reset work unless requested.

## Where to look

| Task | Read |
| --- | --- |
| Boundaries, data flow, integrations | [ARCHITECTURE.md](ARCHITECTURE.md) |
| UI or interaction | [DESIGN.md](DESIGN.md), [FRONTEND.md](FRONTEND.md) |
| Product behavior or scope | [PRODUCT_SENSE.md](PRODUCT_SENSE.md), [product specs](product-specs/index.md) |
| Board, API, persistence | [RELIABILITY.md](RELIABILITY.md), [SECURITY.md](SECURITY.md) |
| New mysteries, authoring roles, handoffs | [mystery-agent index](mystery-agents/index.md), [routing](mystery-agents/routing.md) |
| Evidence authoring | [authoring guide](../.github/case-data-authoring.md), [evidence reference](evidence-json/README.md) |
| Verification and known gaps | [QUALITY_SCORE.md](QUALITY_SCORE.md), [debt tracker](exec-plans/tech-debt-tracker.md) |
| Design rationale and external docs | [design index](design-docs/index.md), [references](references/index.md) |

## Commands

Use Yarn 1 as pinned in [package.json](../package.json); do not introduce another lockfile.

| Command | Purpose |
| --- | --- |
| `yarn install --frozen-lockfile` | Install existing dependencies |
| `yarn dev` | Run development server |
| `yarn lint` | Run ESLint |
| `yarn build` | Production build |
| `yarn start` | Serve completed production build |
| `yarn export:pdf` / `yarn export:pdf:case` | Puppeteer export; inspect [exporter](../scripts/export-pdfs.mjs) before invoking |

No test script is configured. Lint/build are not behavioral tests. Docs-only
changes require link/path and factual checks, not an application build.

## Non-negotiable guardrails

- Preserve stable slugs, evidence/objective IDs, and references across discovery, play, print, metadata, and progress.
- Keep locked-evidence filtering on the server. Treat spoiler protection as a goal to verify, not a blanket confidentiality guarantee for public assets or print routes.
- Authentication is Clerk. UI access gates are not server authorization; inspect each affected handler.
- Keep secrets and server-only code out of client bundles. Never copy credentials or webhook values into docs or output.
- Do not submit real personal data, call paid providers, send webhooks, or run batch exports merely to validate unrelated changes.
- Read the existing large play runtime narrowly; prefer focused extractions over broad rewrites.
- Keep instructions concise, link to their owner document, and distinguish current behavior from proposed work. These docs guide agents; they are not enforcement hooks.