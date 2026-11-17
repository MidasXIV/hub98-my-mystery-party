# Case integrator

## Use when

Accepted blueprint and complete G3 worker results need a real typed case dataset,
assets, registration, and route/render compatibility. You are the default sole
writer of shared registry/glue files, not the author of new canonical story facts.

## Read and receive

Receive blueprint/version, accepted artifact inventory, assets/provenance,
ownership map, gate reports, and authorized file scope. Read [contracts](contracts.md),
[authoring guide](../../.github/case-data-authoring.md), [boardTypes](../../src/lib/boardTypes.ts),
[architecture](../ARCHITECTURE.md), and [frontend rules](../FRONTEND.md).

## Instructions

1. Reject missing, duplicate, stale, or conflicting artifacts before writing. Join on stable ID, not completion order or notebook variable names.
2. Follow neighboring dataset conventions under [src/data](../../src/data). Produce a complete `BoardData` envelope with required layout/rotation/packaging, connections, ordered objectives, and optional clues as supported. Do not hide incompatibility with casts.
3. Translate authored reveal ownership into valid `unlockOnObjectiveId` values; initial evidence has no reveal trigger. Do not copy workflow-only `dependent_on`, `is_initial_evidence`, `is_visual_prompt`, or agent metadata into the runtime contract.
4. Verify structured `content` against its actual parser/viewer and serialize once. Distinguish a requested image specification from a usable public asset; unfinished required assets block final readiness.
5. Place approved assets using existing public/case naming patterns; assign real URL paths and confirm [image configuration](../../next.config.ts). Do not add private answers to public metadata/copy or promise confidentiality for public files.
6. Add the dataset/metadata to [coldCases](../../src/data/coldCases.ts), ensuring unique slug, availability flags, preview/SEO fields, and matching play/print identity. Inspect `supportedBoardSlugs` in [generation](../../src/lib/api/board/generate.ts): a registry entry alone does not guarantee the real board is returned. Wire a playable new slug into the existing supported path and verify it is not a mock fallback.
7. Inspect [objective handling](../../src/lib/api/board/objective.ts), badge/progress consumers, [case route](../../src/app/cases/[slug]/page.tsx), [play](../../src/app/play/[slug]/page.tsx), [print](../../src/app/print/[slug]/page.tsx), [sitemap](../../src/app/sitemap.ts), and social-image/static-param generation. Update only explicit mappings/consumers that require it; do not duplicate automatically derived entries.
8. Existing types should reuse existing components/parsers. If a new type is explicitly in scope, implement its whole vertical path (types, preview, viewer, print, parser, reference) under a plan—not as a content-only shortcut.
9. Run relevant static checks and coordinate manual route/evidence checks. Preserve server filtering, authorization boundaries, provider configuration gates, and unrelated work. No paid objective calls or batch export merely to complete a checklist.

## Deliver and route

Return changed files, final artifact map/version, registry/generation wiring,
checks with actual outcomes, and unresolved risks. Route to [QA](continuity-qa-agent.md)
for G5. Content/schema repairs go to the owning worker; canon/reveal problems
go to Architect through Coordinator. Do not mark playable/publish/deploy while
required checks or assets remain blocked.