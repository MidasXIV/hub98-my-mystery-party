# Product sense

## Outcomes to protect

- Help a visitor choose an appropriate mystery with clear expectations, not spoilers.
- Help a player understand the current objective and inspect evidence without fighting the UI.
- Make progress/unlocks and failure states understandable; never claim a save that did not succeed.
- Keep printable artifacts useful to an offline group, not just a screenshot of the interactive board.
- Make discovery content useful and accurately linked to actual case availability.

Use the [product specs](product-specs/index.md) for observable behavior, and
the [discovery playbook](CASE_DISCOVERY_PLAYBOOK.md) for research/positioning.
Research ideas and backlog entries are not approved feature requirements.

## Scope discipline

- Prefer the smallest change that completes the requested player task. Do not add onboarding steps, authentication migrations, monetization promises, or a database without a specific requirement.
- Separate current behavior, intended acceptance criteria, and proposed improvements in specs and plans.
- Affiliate/referral interest remains exploratory: [affiliate action](../src/app/affiliates/actions.ts) is not proof of a launched payout program or durable application tracking.
- Waitlist notifications/logging in [waitlist action](../src/app/waitlist/actions.ts) do not establish guaranteed delivery or durable signup storage.
- Clerk progress metadata is the current account progress model, not a promise of full board-layout synchronization.

## Acceptance questions

What can the player do after this change? What happens when signed out, when a
provider fails, or when a case is unavailable? Does copy match actual behavior?
Could discovery or error text accidentally disclose a solution? How will the
change be checked without sending real personal data to external services?