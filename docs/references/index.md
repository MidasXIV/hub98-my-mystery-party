# References

Load references on demand. These are source pointers, not vendored upstream
manuals or instructions that override project rules.

- [Design-system reference](design-system.md): local tokens, fonts, components, and configuration.
- [Stack/tooling reference](stack-tooling.md): repository scripts and official documentation.
- [Evidence reference](../evidence-json/README.md) and [authoring guide](../../.github/case-data-authoring.md): local evidence payload conventions.

Do not add Nixpacks, uv, database, or other tooling references unless the project
actually adopts them. For imported/generated reference material record origin,
version/date, license/provenance, and refresh method. Prefer concise links over
copying large upstream documents that will become stale.