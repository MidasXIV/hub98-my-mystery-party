# Design guide

This owns product/interaction design guardrails. System boundaries belong to
[ARCHITECTURE](ARCHITECTURE.md); implementation conventions to
[FRONTEND](FRONTEND.md). Read [core beliefs](design-docs/core-beliefs.md)
for rationale and the [design index](design-docs/index.md) for deeper topics.

## Product surfaces

- **Discovery:** listings/detail pages help players choose a case without revealing solutions.
- **Play:** a spatial board presents evidence, connections, objectives, and progressive unlocks.
- **Print:** readable, paginated evidence documents support offline play/PDF export.
- **Content:** Markdown articles, invitations, and kits support discovery and party planning.

Keep discovery spoiler-safe, play state understandable, and print output usable
without interactive controls.

## Evidence lifecycle

Read [board/evidence lifecycle](design-docs/board-evidence-lifecycle.md) before
changing unlocks or representations. Follow the [authoring guide](../.github/case-data-authoring.md)
instead of inventing a competing schema. Preview, viewer, and print must agree.

## Visual language

The site combines a contemporary discovery shell with case-specific,
investigative document styling. Maintain those distinct roles rather than
applying a generic dashboard style everywhere.

- **Tokens:** [src/app/globals.css](../src/app/globals.css) defines semantic OKLCH light/dark colors, radius, and fluid typography/spacing. Prefer existing semantic utilities (`bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`) for shared UI.
- **Typography:** the root layout loads Geist, Geist Mono, Blinker, Special Elite, Staatliches, and Kalam; global CSS also defines Mori and Fraktion Mono. Reuse the edited surface's existing font assignments rather than adding a family. Avoid decorative faces in long functional copy unless already established.
- **Navigation:** preserve the fixed, pill-style, translucent header in [src/components/header.tsx](../src/components/header.tsx). Check content offsets and overlays when changing nearby layouts.
- **Evidence:** case-specific paper, handwriting, photos, and document colors may differ from shell tokens. Preserve legibility/artifact identity rather than forcing all viewers into uniform cards.
- **Components:** reuse [src/components](../src/components). Keep previews compact and viewers readable; extract focused helpers instead of expanding the board page unnecessarily.

## Interaction and accessibility guardrails

- Verify narrow mobile and wide desktop layouts; do not assume a spatial board scales automatically.
- Preserve keyboard controls, visible focus, semantic headings, meaningful image alternatives, and named icon buttons.
- Preserve dialog focus management and dismissal behavior in viewers/overlays.
- Distinguish loading, empty, error, locked, and success states without relying only on color.
- Respect reduced-motion preferences in new animation; reuse existing animation tooling.
- Check light/dark shells and document contrast independently, including print output/page breaks.

## Content and metadata

Blog content lives under [content/blog](../content/blog); frontmatter and Markdown
headings feed route generation, rendering, and TOC anchors. Preserve descriptive
links and stable anchors. Localize metadata to the relevant route, retaining
case-specific Open Graph/Twitter images instead of overriding them at the root.
Keep discovery copy free of unintended solutions or locked evidence.

## Review checklist

- Is the next player action clear without exposing the solution?
- Do narrow/wide layouts and accessible controls preserve the same task?
- Do previews, viewers, and print retain readable artifact identity?
- Are loading/failure/retry states honest about what was saved or unlocked?
- Does a material decision have rationale in a linked design doc and validation in the task plan?