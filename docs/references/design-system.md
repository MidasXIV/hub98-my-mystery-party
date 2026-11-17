# Design-system reference

Source pointers reviewed 2026-10-24. This is a local reference, not a separate
design system or a generated LLM text dump.

| Concern | Source |
| --- | --- |
| Semantic OKLCH light/dark tokens, radius, fluid spacing/type | [globals](../../src/app/globals.css) |
| Font variables/providers | [layout](../../src/app/layout.tsx) |
| Primitive conventions | [components configuration](../../components.json), [shared components](../../src/components) |
| Navigation shell | [header](../../src/components/header.tsx) |
| Asset loading constraints | [Next config](../../next.config.ts) |

Use existing semantic utilities such as `bg-background`, `text-foreground`,
`text-muted-foreground`, and `border-border` for shell UI. Document/paper colors
may intentionally differ. Existing font families include Geist, Geist Mono,
Blinker, Special Elite, Staatliches, Kalam, Mori, and Fraktion Mono; inspect the
surface's assignment before changing it.

Do not introduce a new font, token layer, primitive library, or animation system
incidentally. Behavior/accessibility expectations live in [DESIGN](../DESIGN.md)
and implementation rules in [FRONTEND](../FRONTEND.md).