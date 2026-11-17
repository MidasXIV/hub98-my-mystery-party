# Frontend conventions

## Implementation map

- App Router routes/layouts: [src/app](../src/app). Default to server components; isolate browser state, events, and client hooks in focused client components.
- Shared UI/evidence: [src/components](../src/components). Reuse existing primitives and parser utilities before adding another abstraction.
- Contracts: [boardTypes](../src/lib/boardTypes.ts). Use the `@/*` alias and strict types; do not mask contract errors with casts or broad `any`.
- Theme/fonts/providers: [globals](../src/app/globals.css), [layout](../src/app/layout.tsx). See [design reference](references/design-system.md).

## Change checklist

1. Inspect neighboring code and the relevant [product spec](product-specs/index.md).
2. Keep secrets, provider SDK calls, and server authorization outside browser code.
3. Avoid broad rewrites of the [play page](../src/app/play/[slug]/page.tsx); extract small helpers with explicit inputs/outputs.
4. For a new evidence type, update `ITEM_TYPES`, play preview/viewer handling, [print dispatch](../src/app/print/[slug]/page.tsx), and relevant parsers. Follow the [authoring guide](../.github/case-data-authoring.md).
5. Check keyboard/focus, named controls, dialogs, reduced motion, narrow/wide layouts, both themes, and loading/error/empty states.
6. For asset changes inspect [image configuration](../next.config.ts), public paths, alternatives, and layout sizing.
7. Preserve route metadata/static parameters and blog heading/TOC behavior in [blog parsing](../src/lib/blog.ts). Use descriptive links, not bare URL list entries.

## Verification

Use relevant lint checks, `yarn lint`, and `yarn build` as appropriate. Record
manual browser checks separately; successful compilation is not proof of usable
drag/zoom, correct unlocks, accessible focus, or printable pagination.
Do not use this document to imply those checks have already passed.