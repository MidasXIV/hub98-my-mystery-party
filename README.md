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

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
