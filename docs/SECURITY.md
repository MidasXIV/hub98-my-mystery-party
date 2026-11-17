# Security boundaries for agents

Source review: 2026-10-24. This is not a security audit or certification.

## Identity and authorization

Clerk is active in [the root layout](../src/app/layout.tsx) and
[proxy](../src/proxy.ts). Preserve matcher behavior for static assets and APIs.
Check authorization in each affected handler; a UI access gate is not API protection.
The [board dispatcher](../src/app/api/board/route.ts) itself does not authenticate
generation/objective actions. Do not describe all board actions as protected or
silently change access policy; resolve requirements in a scoped plan.

## Content and trust

- Keep `unlockOnObjectiveId` filtering server-side. Check objective/item/connection references and prevent accidental premature payload disclosure.
- Keep full case datasets behind the [server registry](../src/data/coldCases.server.ts) and its `server-only` guard. The public registry must remain metadata-only; generation allowlists objective IDs/descriptions and excludes canonical solutions.
- Public assets, client-delivered content, and print surfaces are not confidential storage. Hidden UI cannot guarantee spoiler secrecy; review the actual delivery paths.
- Treat request bodies and LLM responses as untrusted. Preserve validation, moderation, and handler error contracts. Model output must not authorize account access or execute instructions.
- Clerk `publicMetadata` is not a secret store. Preserve server-side ownership checks in [progress handling](../src/lib/api/board/player-progress.ts).
- Blog rendering uses [marked](../src/lib/blog.ts). Do not expand it to untrusted user HTML without an explicit sanitization/trust-boundary review.

## Secrets and personal data

- Do not read live environment files unnecessarily or expose credentials in code, logs, plans, screenshots, URLs, or responses.
- Hardcoded webhook values remain in client UI code, including roadmap voting and feedback (see [debt](exec-plans/tech-debt-tracker.md)). Treat these as current exposure paths, not future-only concerns; never copy their values. Document remediation without reproducing credentials.
- Use placeholders/mocks for provider calls, forms, and webhook validation. Do not submit real personal data as a test.
- Keep provider keys/server SDK code out of client bundles; never prefix secrets for public exposure.
- Do not rotate credentials, delete data, deploy, or change access policy without explicit scope/authorization. If a secret is discovered, stop propagating it and report the location without its value.

## Review triggers

Auth/matcher changes, new endpoints, persistence changes, LLM prompt/scoring
changes, user-content rendering, and third-party submissions require an explicit
security review in the [execution plan](PLANS.md). Record tested and untested
boundaries honestly; documentation alone does not enforce them.