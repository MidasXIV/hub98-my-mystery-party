# Architecture

Last source review: 2026-10-24. This describes current code, not a target migration.

## System map

Next.js 16 App Router + React 19 + strict TypeScript + Tailwind 4. Clerk supplies
identity. Content is largely repository-owned data, not database-generated cases.

| Boundary | Sources and responsibility |
| --- | --- |
| Routes/providers | [src/app](../src/app), [layout](../src/app/layout.tsx): rendering, metadata, providers |
| Case content | [public metadata](../src/data/coldCases.ts), [server registry](../src/data/coldCases.server.ts), [datasets](../src/data): separate public slug/metadata lookup from full evidence |
| Board contracts | [boardTypes](../src/lib/boardTypes.ts): item types, board envelope, packaging |
| Play UI | [play page](../src/app/play/[slug]/page.tsx), [components](../src/components): interactions, previews/viewers |
| Print | [print page](../src/app/print/[slug]/page.tsx), [exporter](../scripts/export-pdfs.mjs): document rendering/PDF |
| API dispatch | [board route](../src/app/api/board/route.ts): request/action routing |
| Domain handlers | [board handlers](../src/lib/api/board): generation, scoring, badges, progress |
| Identity/progress | [proxy](../src/proxy.ts), [progress handler](../src/lib/api/board/player-progress.ts), [progress model](../src/lib/player-progress.ts) |
| Editorial content | [Markdown](../content/blog), [parser](../src/lib/blog.ts): frontmatter, headings, rendering |

## Board flow

1. `getCaseBySlug()` resolves the registry entry used by case/play/print routes.
2. `POST /api/board` with `action: "generate"` dispatches to the generation handler. It reads the signed-in player's saved case progress and returns valid `completedObjectiveIds` alongside evidence unlocked by that same snapshot. Server-side `unlockOnObjectiveId` filtering keeps unsolved evidence and connections to unavailable items out of the payload; signed-out players receive only initial evidence.
3. `action: "objective"` invokes moderation/scoring (Cloudflare by default, Gemini optionally), with heuristic fallback when scoring fails. Unlock responses contain `{ items, connections }`.
4. The client restores completion state and objective evidence groups from the generation response, then integrates new solve results. Badge/progress actions use the same dispatcher.

Generation projects objectives to `{ id, description }`; canonical solutions stay
in the server-only registry used by scoring, badge awards, and print. Catalog
pages derive numeric objective counts on the server and send metadata/counts, not
evidence, to client cards and filters. Public metadata contains promotional badge
image URLs so the homepage does not need full datasets.

The analytics page also reads the server registry. Its aggregator accepts
`CaseWithEvidence` and returns objective counts/labels and player statistics,
not full evidence or canonical solutions, to the analytics UI.
`/admin/analytics` rewrites to `/analytics` rather than defining a second page.
The blog-card JSON and RSS handlers are build-time static output from repository
content; their data refreshes on deployment.
Case-detail and print pages enumerate registry slugs at build time and set
`dynamicParams = false`; unlisted slugs return 404 without runtime fallback.

GET supports `badge` and `player-progress` query actions. POST supports
`generate`, `objective`, `badge`, and `player-progress`. Do not recreate older
per-action route paths documented elsewhere without checking current callers.

## Storage and external dependencies

- Cases/evidence: TypeScript datasets and public assets; Markdown for blogs.
- Account progress: Clerk user `publicMetadata.playerProgress`, versioned and normalized in the progress model. It is not a secret store or an application database.
- Objective caches/rate limits: process-local memory; not durable or shared across instances.
- Waitlist/affiliate actions: prototype logging/optional notification behavior, not a guaranteed durable application store. See [product scope](PRODUCT_SENSE.md).
- PDF: Puppeteer uses the print route; exports depend on an available server.

## Change rules

- Stay within the current Vercel Hobby budget of 12 generated Serverless Functions. Check deployment output when changing server entrypoints or rendering behavior; see the [function-count constraint](RELIABILITY.md#vercel-hobby-function-count-budget-2026-11-18).
- Route entrypoints dispatch; keep reusable logic/contracts in the existing library boundaries. Keep secrets/server SDK work out of client components.
- Evidence changes must agree across data, preview, viewer, and print dispatch. See [board design](design-docs/board-evidence-lifecycle.md).
- Preserve Clerk matcher behavior and inspect per-handler authorization. Generation/objective dispatch must not be described as protected solely because play UI is gated.
- Check slugs in route/static parameter generation, sitemap, and social images when changing case identity.
- New persistence, auth, API, or schema boundaries require a [plan](PLANS.md) and recorded rationale; they are not incidental cleanups.

See [reliability](RELIABILITY.md), [security](SECURITY.md), and
[known debt](exec-plans/tech-debt-tracker.md) for limitations rather than
assuming every intended invariant is already enforced.