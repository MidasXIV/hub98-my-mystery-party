# Vercel function tracing

Status: implementation completed and locally verified; deployment acceptance pending.

## Goal and acceptance criteria

Reduce generated Node function groups to at most 12 without removing analytics,
changing authorization, or breaking social-image filesystem reads. Preserve public
asset URLs and page behavior. A successful deployment remains a separate check;
do not deploy without permission.

## Context and inspected sources

Read [agent guidance](../../AGENTS.md), [design](../../DESIGN.md),
[architecture](../../ARCHITECTURE.md), and [reliability](../../RELIABILITY.md).
The user's deployment of `a6f6b21` still fails with
`exceeded_serverless_functions_per_deployment`.

The [Twitter image](../../../src/app/twitter-image.tsx) and two kit image handlers
read images from `public`. Their broad traces propagate to page bundles, including
analytics. Before the fix, affected traces contained all 197 public files
(219.8 MiB). The [config](../../../next.config.ts) now excludes three unused
directories; public hosting and server filesystem dependencies are preserved.

## Approach and risks

Exclude only three unrelated public directories from function traces:
`cold_case_data`, `hero`, and `features_section` (about 152.8 MiB combined).
No application server filesystem reader uses them; they remain public deployment
assets. Keep the complete directories used by existing filesystem readers:
`cold_cases`, `hero_wideshot`, and `mystery_kits`.
Future filesystem readers must be checked against these exclusions.

## Steps and validation

- [x] Reproduce successful Next production compilation locally.
- [x] Inspect adapter grouping: 15 Node groups and 3 Edge groups locally before
  exclusions. Windows trace lookup required separator normalization in temporary
  tooling; an initial unnormalized count was invalid and is not evidence.
- [x] Apply narrow exclusions and regress filesystem image coverage.
- [x] Rebuild and compare actual traces and adapter groups, targeting at most 12.
- [x] Check social-image generation with bundled filesystem assets, tests,
  lint, and types; document remaining deployed verification.

## Decisions and discoveries

Google Fonts downloads fail under concurrent build fetches here. Temporary
local-only tooling prefetched the actual CSS/font bytes with curl and served those
bytes over loopback via Next's font-response test hook. No fallback or fake font
bytes were used. This permits bundle analysis but is not a normal network build.

The local Vercel CLI build fails before packaging with "Request failed".
Temporary external `@vercel/next` tooling packages the completed Next build;
it must be identified as local evidence, not the rejected deployment's inventory.

The before adapter run used its default Node runtime; the final run explicitly
packages `nodejs22.x` to match the project. Local execution uses Node 24 and
`@vercel/next` 31.0.0, with temporary Windows trace-key normalization.

## Validation results

- Full Turbopack production build passed, including TypeScript and 125 static
  pages, using the real cached fonts described above.
- All 18 focused regressions passed with
  `node --test scripts\board-resume.test.mjs`.
- Targeted ESLint passed for config, regression suite, and kit registry.
- Final trace-aware adapter inventory: 5 Node groups and 3 Edge groups,
  below 12 even when combined.
- Analytics/cases traces fell from 225.59 to 72.75 MiB; kit image trace from
  223.76 to 70.92 MiB. Board API stayed 2.60 MiB. Public traced assets fell
  from 197 files / 219.77 MiB to 85 files / 66.93 MiB.
- The regression checks existence, Linux filename case, and exclusion coverage
  for all 42 authored filesystem social images. A trace-aware PNG probe caught
  the Rocco image's mismatched filename case; the registry now matches the asset
  and the regression guards against recurrence.
- Five compiled image handlers returned real PNGs: Twitter, both kit images,
  and the first character image per kit. Each probe enforced that every public
  filesystem read was present in that handler's dependency trace.

## Completion and handoff

Delivered the three tracing exclusions, exact image-path correction, regression,
and updated [operational workflow](../../RELIABILITY.md#when-the-12-function-error-returns).
No route, authorization rule, or public asset was removed. Local diagnostic
tooling/font caches were external to the repository and are not project tooling.

The user must commit and redeploy source through the normal Vercel build, then
confirm acceptance, generated inventory, and deployed social images. No deployment,
retention change, live gameplay/Clerk exercise, or paid-provider call was performed.
Do not claim remote counts or billed storage savings from local measurements;
do not deploy the local diagnostic build artifacts.
