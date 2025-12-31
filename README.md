This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Cases Directory

An index page listing all available cold case games now lives at `src/app/cases/page.tsx` and is served at `/cases`. Each case card links to its detailed page under `/cases/[slug]`.

Reusable card component: `src/components/case-card.tsx`.

Data source: `src/data/coldCases.ts`.

To add a new case:
1. Append an object to the `coldCases` array with a unique `slug`.
2. Add any referenced images under `public/cold_cases/thumbnails/`.
3. Visit `/cases` to verify it appears.

Optional: Add Open Graph / Twitter images similar to existing dynamic case routes if needed.

## Roadmap Voting Prototype

A local-only community roadmap voting UI is available at `/roadmap`.

Source files:
- `src/data/roadmapFeatures.ts` – Hard-coded feature list (replace with DB later).
- `src/components/roadmap-voting.tsx` – Interactive voting/filter/sort component.
- `src/app/roadmap/page.tsx` – Page that renders the component.

Features:
- Filter by category and status.
- Sort modes: Trending (votes), Newest (created date), A–Z.
- Search across title, description, and tags.
- Local voting with persistence in `localStorage` (keys `roadmapVotes_v1` & `roadmapVoted_v1`).
- Basic status badges and tag chips.

Limitations (until backend integration):
- Votes are per-browser and not shared.
- No authentication or fraud prevention.
- No pagination (list is small for now).

Planned backend integration steps:
1. Create an API route (e.g. `src/app/api/roadmap/[id]/vote/route.ts`).
2. Store votes & feature metadata in a database (Postgres / PlanetScale / Supabase).
3. Add optimistic UI + server reconciliation.
4. Implement auth & per-user vote limits (e.g. 1 per feature, ability to revoke).
5. Rate limiting (IP + user) and minimal bot protection.
6. Add real-time updates via WebSockets or Server-Sent Events.

You can safely modify the feature list in `roadmapFeatures.ts` to experiment—IDs should remain unique.

## Referral Interest (Quiet Exploratory Form)

There is a low-key interest form at `src/app/affiliates/page.tsx` (`/affiliates`). It is NOT a formal affiliate launch and should not be marketed as such.

Purpose:
1. Gauge authentic creator/community interest around investigative puzzle content.
2. Provide a private list we may contact if/when referral experiments begin.
3. Collect preferred code ideas (not guaranteed or reserved).

Current mechanics:
- Form collects basic details (name, email, site/channel, preferred code, payout preference placeholder, notes).
- Client-side validation for required fields & simple format checks.
- Server action (`src/app/affiliates/actions.ts`) only logs payloads – no persistence, no commitments.
- All language intentionally avoids promises: no guaranteed payouts, codes, dashboards, or timelines.

If formalization happens later we would add:
- Database persistence & uniqueness checks.
- Private onboarding emails (opt-in only).
- Metrics dashboard & tracked referral events.
- Explicit commission schedule & payout mechanics.

Extending the server action (future):
```ts
// Replace console.log with DB insert
// await db.insert(applicationsTable).values(payload)
```

Homepage contains an understated `AffiliatePromo` section (`src/components/affiliate-promo.tsx`) describing this as a quiet interest list to avoid hype.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Export evidence to PDF (batch)

You can export all evidence for any case (in their full “viewer” format) as a single print‑ready PDF using a built‑in print page and a small headless browser script.

What was added:
- New route: `/print/[slug]` (e.g. `/print/station-zero`) renders every evidence item using the same viewer components used in play modals, with page breaks between items.
- Script `scripts/export-pdfs.mjs` that opens the print page and saves to `exported-pdfs/<slug>.pdf`.

### One‑time setup

If PowerShell blocks Yarn on Windows, either use cmd.exe or temporarily bypass just for this session.

Option A (cmd.exe):

```bat
cmd /c yarn add -D puppeteer
```

Option B (PowerShell bypass, current process only):

```powershell
PowerShell -ExecutionPolicy Bypass -Command "yarn add -D puppeteer"
```

### Run the exporter

1) Start the dev server (in a separate terminal):

```powershell
yarn dev
```

2) Export Station Zero (default example):

```powershell
yarn export:pdf:case
```

Or export any case by slug and optionally choose output dir or base URL:

```powershell
yarn export:pdf --base=http://localhost:3000 --out=exported-pdfs station-zero palazzo-of-bones her-shadows-name
```

Output files will be written under `exported-pdfs/`. The print pages include print CSS so background colors and textures render correctly.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Blog & Guides (Markdown)

We added a simple, SEO‑friendly blog system using Markdown files.

- Content lives under `content/blog/<category>/<slug>.md`
- Categories are simple folders, e.g. `party-planning-tips`, `top-costumes`, `mystery-party-guides`
- Each post includes frontmatter:

```
---
slug: how-to-host-an-epic-mystery-party
title: How to Host an Epic Mystery Party
description: A step‑by‑step guide to planning an unforgettable mystery party—theme, clues, pacing, and reveal.
date: 2025-12-20
author: Hub98 Editorial
category: party-planning-tips
tags:
	- planning
	- hosting
heroImage: /opengraph/hero.png
---
```

Routes:
- `/blog` – index with categories + latest posts
- `/blog/category/<category>` – list posts by category
- `/blog/<slug>` – single article
- `/rss.xml` – RSS feed
- `/sitemap.xml` – Sitemap including blog URLs

SEO features:
- Per‑page metadata + canonical URLs
- OpenGraph/Twitter cards (uses `heroImage` if provided)
- JSON‑LD Article schema on post pages
- Internal links to categories and index

Writing guidelines:
- Keep titles concise (55–65 chars); include a focus keyword early
- Use a clear meta description (120–160 chars)
- Structure with H2/H3 headings; add lists and short paragraphs
- Add 1–2 internal links to relevant cases or categories

Styling:
- Basic Tailwind card styles are included; you can enhance with components
- If you want richer typography, consider adding `@tailwindcss/typography`

Adding a new post:
1. Create the Markdown file under `content/blog/<category>/<slug>.md`
2. Fill out frontmatter; set `date` to ISO (YYYY-MM-DD)
3. Commit and deploy; pages are statically generated

