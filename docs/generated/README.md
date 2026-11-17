# Generated artifacts

No generated database schema is committed here: the current inspected data
model is static case datasets plus Clerk account metadata, not a relational
application database. See [architecture](../ARCHITECTURE.md) and the
[progress model](../../src/lib/player-progress.ts).

Reserve this directory for reproducible, derived documentation. Each future
artifact must identify its source, exact generation command/tool, generation
date/version, and regeneration rules. Keep generators in version control and
exclude secrets/user records from output. Never label a hand-authored snapshot
as generated or invent a schema to fill this directory.

No documentation generator is configured by this revamp. If one is introduced,
document how to reproduce and check drift before committing its output.