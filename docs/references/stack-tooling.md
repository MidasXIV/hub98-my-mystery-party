# Stack and tooling reference

Repository configuration is the authority for installed versions and scripts:
[package](../../package.json), [TypeScript](../../tsconfig.json),
[Next](../../next.config.ts), [ESLint](../../eslint.config.mjs).
Use Yarn 1; commands are listed in [AGENTS](../AGENTS.md).

| Tool | Official reference | Project use |
| --- | --- | --- |
| Next.js | [App Router documentation](https://nextjs.org/docs/app) | Routes, rendering, metadata, handlers |
| React | [React documentation](https://react.dev/learn) | Components, state, effects |
| Tailwind CSS | [Tailwind documentation](https://tailwindcss.com/docs) | Version 4 CSS/tokens/utilities |
| Clerk | [Next.js SDK documentation](https://clerk.com/docs/nextjs/overview) | Identity and account metadata |
| Puppeteer | [Puppeteer documentation](https://pptr.dev/) | Print-to-PDF exporter |
| Cloudflare | [Workers AI documentation](https://developers.cloudflare.com/workers-ai/) | Default objective scoring provider |
| Google | [Gemini API documentation](https://ai.google.dev/gemini-api/docs) | Optional scoring provider |

These links are reference destinations, not evidence of a live documentation
fetch or current API compatibility. Consult the installed version and relevant
official docs before implementing version-sensitive behavior. Better Auth skill
files in the repository do not mean the application uses Better Auth.