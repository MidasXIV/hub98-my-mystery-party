# Reliability

Source review: 2026-10-24. This is an operational checklist, not an uptime claim.

## Current constraints

- [Objective evaluation](../src/lib/api/board/objective.ts) uses in-memory caches/rate limits. Process restart/recycle clears them; multiple instances do not share a single budget.
- LLM scoring has heuristic fallback. Preserve moderation and distinguish provider failure from a valid player outcome when modifying this path.
- [Generation](../src/lib/api/board/generate.ts) is case-data-backed but currently requires `API_KEY`; do not remove the gate as unrelated cleanup.
- [Progress](../src/lib/api/board/player-progress.ts) depends on Clerk; normalization/merge rules live in [the model](../src/lib/player-progress.ts). Do not invent database durability, concurrency, or capacity guarantees.
- Board generation reads saved progress before returning resumed evidence and completion IDs together. If that read fails, generation returns an error rather than silently loading an incomplete board.
- [PDF export](../scripts/export-pdfs.mjs) depends on a reachable print route and Puppeteer. Inspect arguments before running; avoid bulk exports for routine changes.
- No configured application test script or GitHub Actions workflow was found in the source review. See [quality](QUALITY_SCORE.md).

Run the focused, service-mocked resume regressions with
`node --test scripts\board-resume.test.mjs`; see [the tests](../scripts/board-resume.test.mjs).
They do not require live Clerk or AI provider access.

## Configuration boundaries

`LLM_PROVIDER` selects `cloudflare` (default) or `gemini`. Cloudflare uses
`CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_API_TOKEN`, and optional
`CLOUDFLARE_AI_MODEL`; Gemini uses `API_KEY`. Clerk configuration is required
for account features. Waitlist notification optionally uses
`DISCORD_WAITLIST_WEBHOOK_URL`. Check variable names in source/example config;
never copy real values into troubleshooting notes.

## Vercel Hobby function-count budget (2026-11-18)

Deployment constraint: keep this project's generated deployment at **no more
than 12 Serverless Functions** while using the current Hobby configuration.
The deployment was rejected with that limit on 2026-11-18. This is separate
from the Function Storage allowance discussed below; deleting old deployments
or shrinking bundles does not reduce the new deployment's function count.

Count generated Vercel functions, not source files or API endpoints. Dynamic
pages and generated social-image handlers can also contribute; Next.js/Vercel
may group routes, so a source-route count is not an authoritative total.
Before adding or changing request-time rendering, API routes, server actions,
or image handlers, inspect the generated deployment's function inventory and
verify that the total stays within 12. Preserve the existing
[board dispatcher](../src/app/api/board/route.ts) rather than recreating
per-action endpoints. Prefer static output where behavior permits, or reuse
existing server entrypoints without weakening authorization or exposing answers.

Source investigation:

- Commit `c72b6de` introduced [the analytics page](../src/app/analytics/page.tsx),
  which calls Clerk `auth()` and loads account data at request time. This is a
  newly added dynamic route and the leading candidate for crossing the budget.
- Commit `a859b5c` only corrected analytics registry/type usage; it added no route.
  [The server-only case registry](../src/data/coldCases.server.ts) is a library,
  not a function entrypoint. Its imports can affect bundle size, not independently
  create a function.
- Earlier board API consolidation remains intact. No per-action board endpoints
  were reintroduced.

Exact generated count and grouping remain unverified. The failed deployment
does not expose a retained function file tree, and local builds have been
blocked by Google Fonts downloads. Compare generated output with the last successful deployment
before claiming the budget is met. Do not remove analytics, make private data
public/static, change runtimes blindly, or upgrade the plan without approval.

### Function reduction implemented (2026-11-20)

- [Blog-card JSON](../src/app/api/blog/cards/route.ts) and
  [RSS](../src/app/rss.xml/route.ts) now use `dynamic = "force-static"`.
  Both depend only on repository Markdown and build configuration, not the
  current request. Their content now refreshes on deployment, like the blog
  itself; URLs and response bodies are unchanged.
- `/admin/analytics` previously re-exported the analytics page as another
  request-time page entrypoint. It is now a
  [rewrite](../next.config.ts) to `/analytics`. Both URLs still reach the same
  server-side authentication and allowlist checks; account data stays dynamic
  and private.
- No gameplay endpoints, authorization checks, or social-image behavior changed.

Verification: all 16 [focused regressions](../scripts/board-resume.test.mjs),
targeted ESLint, `next typegen`, and `tsc --noEmit --incremental false` passed.
Full Turbopack builds remain blocked by external Google Fonts downloads.
An alternative webpack build compiled but found pre-existing generated route
parameter type errors; split build generation also stalled. Neither is counted
as a successful production build. Vercel tooling was tried outside the repository
without changing dependencies or deploying; no complete function inventory was
produced. The user's redeploy of commit `b094f57` subsequently passed the full
Next.js build but was still rejected by the function cap. Its route summary
confirmed that both feeds were static and the duplicate analytics page was gone.
These changes were insufficient and are not evidence of an exact function count.

### Static case/print fallback reduction (2026-11-20)

[Case details](../src/app/cases/[slug]/page.tsx) and
[print pages](../src/app/print/[slug]/page.tsx) now export
`dynamicParams = false`. Both already enumerate all registry slugs using
`generateStaticParams`. Known pages remain prebuilt; unlisted slugs return 404
without on-demand page generation. New cases require a deployment, as their
repository datasets already do. This targets unnecessary fallback functions;
the exact packaging reduction and deployment acceptance still need verification.
Scoring, progress, analytics authentication, and social images are unchanged.

Validation: all 17 focused regressions passed, including registry slug coverage
and disabled fallback for both routes. Targeted ESLint, route type generation,
TypeScript, and whitespace checks passed. The local production build still failed
downloading Google Fonts; generated function counts and deployed 404 behavior
have not yet been verified. No deployment was triggered.

### When the 12-function error returns

Follow this workflow before making more route changes:

1. Use the existing authenticated CLI first: `vercel.cmd whoami`. If necessary,
   ask the user to finish `vercel.cmd login`. Do not install plugins or configure
   MCP merely to inspect a deployment; CLI authentication is sufficient.
2. Obtain the deployment ID from the dashboard URL (prefix its final ID with
   `dpl_`). Read the build logs with:

   ```powershell
   vercel.cmd inspect <deployment-id> --scope midasxivs-projects --logs
   ```

3. If compilation succeeds but "Deploying outputs" fails, read the actual
   deployment error, not just the build log:

   ```powershell
   $raw = vercel.cmd api /v13/deployments/<deployment-id> --scope midasxivs-projects --method GET
   $deployment = ($raw -join "`n") | ConvertFrom-Json
   $deployment | Select-Object id, readyState, errorCode, errorMessage
   ```

   Confirm `exceeded_serverless_functions_per_deployment`. Do not print the full
   deployment object: it can contain environment and other sensitive metadata.
   The rejected deployment `dpl_8juDPP2bywbuK5jbGH1U5KQjC2Gd` confirmed this
   exact error. This is not a TypeScript failure or the separate storage quota.
4. Compare the deployed commit with the last successful deployment. The last
   confirmed successful commit before this failure was `ddca898`; `/analytics`
   was the only new page route by `b094f57`. This identifies a likely trigger,
   not an authoritative function-count delta.
5. Inspect **Resources > Functions** when available. API file-tree requests may
   return 404 for rejected/Git deployments. The `Route (app)` table's `ƒ`, `●`,
   and `○` symbols describe rendering, not the exact counted function inventory.
   SSG routes can retain runtime fallback functions. Edge handlers, middleware,
   grouped routes, and internal function aliases require separate interpretation;
   do not count raw `lambdas.output` aliases as distinct quota-consuming functions.
6. If remote inventory is unavailable, run `vercel.cmd build --prod` locally
   using existing project settings (build only, not deploy), then inspect
   `.vercel/output/functions` and `.vc-config.json` files. Resolve links/grouping
   and classify runtimes before counting. Never commit pulled environment files.
   If build/network access blocks this, record the missing inventory explicitly.
7. Prefer disabling unnecessary fallback for fully enumerated repository content,
   static output for request-independent handlers, or existing dispatchers.
   Preserve unknown-slug 404s, public URLs, authentication, and server-only answers.
   Do not delete features, change runtimes blindly, or change the plan/compute
   settings without approval. Fluid Compute was already enabled during this
   investigation; enabling it is not an outstanding fix.
8. Run focused regressions, lint, type-check, and a production build. Verify the
   final generated inventory is at most 12 and confirm deployment acceptance
   before declaring the blocker resolved. Deploy/push only when requested.

## Vercel Function Storage investigation (2026-11-18)

Status: open; local production build inspected, deployed usage not verified.
The user reported reaching the team's included Function Storage allowance.
This concerns retained deployment function bundles, not player progress or
runtime memory. Preview/production deployment history and configured regions
can multiply retained storage; other projects in the team can contribute.

Local Next.js dependency trace measurements:

| Route | Traced files, approximately | Included public assets |
| --- | --- | --- |
| `/api/board` | 2.6 MiB | None |
| `/play/[slug]` | 225.6 MiB | 219.8 MiB, all 197 public files |
| `/cases` | 225.6 MiB | 219.8 MiB, all 197 public files |
| `/twitter-image` | 223.7 MiB | 219.8 MiB, all 197 public files |
| Kit play/character social-image routes | 223.8 MiB each | 219.8 MiB, all 197 public files |

These are sums of files listed in local `.next/server/**/*.nft.json` traces,
not final Vercel Function bundle sizes or billed totals. Do not add them together:
files overlap, Vercel may group functions, and deployed output can differ.
The tagged objective handler was not the main local size contributor.

Likely trigger to investigate: dynamically constructed filesystem reads under
`public` in the [Twitter image generator](../src/app/twitter-image.tsx),
[kit image generator](../src/app/kits/[slug]/play/opengraph-image.tsx), and
[character image generator](../src/app/kits/[slug]/play/characters/[characterSlug]/opengraph-image.tsx).
Their traces included the entire public directory; the same assets also appeared
in page traces. The exact tracing propagation and deployed cost are not yet proven.

Next steps:

1. In Vercel team **Usage > Deployment Storage > Functions Storage > Projects**,
   confirm this project's contribution. Inspect a deployment's
   **Resources > Functions** for actual bundle sizes and regions.
2. Review deployment retention and stale preview history, preserving the required
   rollback window. Do not delete deployments or change retention without approval.
3. Scope a fix for broad filesystem tracing, such as precise image dependencies or
   URL-based image loading where suitable. Do not blindly exclude `public`:
   filesystem-based image generators still need their referenced files.
4. Rebuild, compare traces and deployed bundles, and verify social-image routes
   before claiming savings. Smaller new bundles do not shrink retained old ones.

References: [Vercel storage accounting](https://vercel.com/docs/deployment-storage),
[optimization](https://vercel.com/docs/deployment-storage/optimize), and
[retention](https://vercel.com/docs/deployment-retention).
No application code, Vercel settings, or deployments were changed in this investigation.

## Verification by change

| Area | Checks |
| --- | --- |
| Dispatcher | Valid/invalid JSON, unsupported actions, allowed GET/POST contracts |
| Generation | Existing/missing slug behavior, initial evidence filtering, connection references |
| Objectives | Normal success/failure, provider error/fallback, moderation path, unlock consistency |
| Progress | Signed-out behavior, malformed events, repeated events, metadata normalization/save failure |
| UI | Honest loading/error/retry states; no false saved/success messages |
| Print | Readable viewer content, page breaks, no dependence on interactive controls |

Use mocks or explicitly scoped checks for external services. Report unverified
cases rather than making live requests merely to fill a checklist. Record
failures with sanitized context and reproduction steps; do not log submissions,
tokens, or personal data by default. Deferred fixes belong in the [tracker](exec-plans/tech-debt-tracker.md).