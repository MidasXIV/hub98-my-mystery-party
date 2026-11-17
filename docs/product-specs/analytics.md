# Player analytics

Status: measurement specification, written 2026-11-10. Event names and targets
below are proposed, not proof of working tracking. This guide does not approve
new product features, pricing tests, or an analytics provider.

## Purpose and priorities

My Mystery Party is a content-driven puzzle game for solo players, couples, and
groups. People may play for a long evening, then return when another case is
available. Daily Active Users (DAU) is supporting context, not our main goal.

We want players to finish a satisfying mystery and choose another one. Optimize
in this order:

1. Make progress and completion tracking reliable.
2. Increase **Case Completion Rate**, our north star.
3. Reduce friction before the first useful action and first solved objective.
4. Increase next-case starts and confirmed new-case notification signups.
5. Improve sharing and measure demand before making paid-content decisions.

Do not raise completion by making every answer trivial, hiding difficult cases,
or pushing solution reveals. Check solve time, hint use, and assisted finishes
alongside completion. A higher percentage with far fewer starters is not
automatically an improvement; always show counts too.

## Current data and limits

The [progress model](../../src/lib/player-progress.ts) stores account-level
case/kit starts, last recorded play, solved objectives, and completion fields
under Clerk `publicMetadata.playerProgress`. It also supports a new-case
notification preference. The normal user CSV does not include that metadata.

The [progress tracker](../../src/components/player-progress-tracker.tsx) sends
case-open and objective-solved updates. Its save helper does not check HTTP
success. It records an objective as synced before a successful response is
confirmed. The [handler](../../src/lib/api/board/player-progress.ts) saves these
updates, but the client data is not an authoritative analytics event history.

The production snapshot reviewed on 2026-11-10 contains five Station Zero
records with all five current objectives solved but no completed status. Until
this difference is explained, report all-objectives-solved and completion status
separately. Do not silently rewrite old records or count every old starter as
someone who abandoned the game.

Saved progress cannot reconstruct clue views, failed guesses, hints, active play
time, past sessions, or complete retention history. `attempts` currently counts
saved objective-solved events, not all guesses. `lastPlayedAt` is the latest
saved progress event, not continuous activity. A notification preference is not
proof of email delivery or a working subscription. See
[product scope](../PRODUCT_SENSE.md) and [architecture](../ARCHITECTURE.md).

## Fetching user data for analysis

### Read-only production export

Run the following PowerShell command from the repository root after installing
the existing project dependencies with `yarn install --frozen-lockfile`.
It uses Node.js, the project's existing `@next/env` loader, and Clerk's
[list-users API](https://clerk.com/docs/reference/backend/user/get-user-list).
No running application server is needed.

The authorized operator must have `CLERK_SECRET_KEY_PROD` set in the local
environment or the root `.env.local` file. Obtain it from the correct Clerk
production instance's API Keys page. The command deliberately does not fall
back to `CLERK_SECRET_KEY`, which this project uses for development. A
publishable key cannot read backend user data.

Never paste keys into chat, terminal commands, documentation, or committed
files. The command loads the existing local value without printing it. Rotate
any secret previously exposed through chat or shared logs; do not copy it here.

```powershell
@'
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const assert = require('node:assert/strict');
require('@next/env').loadEnvConfig(process.cwd(), false, { info() {}, error() {} });

async function main() {
  const key = process.env.CLERK_SECRET_KEY_PROD;
  if (!key?.startsWith('sk_live_')) throw new Error('Production Clerk key is missing or is not live.');
  const users = [];
  const seen = new Set();
  let offset = 0;
  while (true) {
    const query = new URLSearchParams({ limit: '100', offset: String(offset), order_by: '+created_at' });
    const response = await fetch(`https://api.clerk.com/v1/users?${query}`, {
      headers: { Authorization: `Bearer ${key}` },
      signal: AbortSignal.timeout(30000),
    });
    if (!response.ok) throw new Error(`Clerk HTTP ${response.status}; no export written.`);
    const page = await response.json();
    if (!Array.isArray(page)) throw new Error('Unexpected Clerk response; no export written.');
    for (const account of page) {
      if (typeof account.id !== 'string' || seen.has(account.id)) {
        throw new Error('Missing or duplicate account ID; no export written.');
      }
      seen.add(account.id);
      users.push({
        userId: account.id,
        createdAt: account.created_at,
        lastSignInAt: account.last_sign_in_at ?? null,
        lastActiveAt: account.last_active_at ?? null,
        publicMetadata: account.public_metadata ?? {},
      });
    }
    offset += page.length;
    if (page.length < 100) break;
    if (offset >= 100000) throw new Error('Pagination limit reached; no export written.');
  }
  const exportedAt = new Date().toISOString();
  const output = path.join(os.homedir(), 'Downloads', `clerk-public-metadata-production-${exportedAt.replace(/[:.]/g, '-')}.json`);
  const payload = { exportedAt, instance: 'production', userCount: users.length, users };
  fs.writeFileSync(output, JSON.stringify(payload, null, 2), { encoding: 'utf8', flag: 'wx' });
  const saved = JSON.parse(fs.readFileSync(output, 'utf8'));
  assert.equal(saved.userCount, users.length);
  assert.equal(saved.users.length, users.length);
  console.log(JSON.stringify({ output, users: users.length, validated: true }, null, 2));
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
'@ | node -
```

This issues only `GET /v1/users` requests, with 100 accounts per page and an
increasing offset. It exports account IDs, Clerk millisecond timestamps, and
`public_metadata` as `publicMetadata`; it excludes email and credential fields
from the account object. The timestamped JSON goes in the operator's Downloads
folder, outside the repository, and does not overwrite an existing file.
Public metadata itself can contain personal data, so keep the export private.

An HTTP error, malformed response, duplicate ID, or timeout stops collection
before writing an export. For 401/403, check the key and its access to the
intended instance. For 429, rerun later after the provider's rate-limit window.
Do not analyze a failed run as a zero-user result. The final JSON-readback check
confirms it parses and the user count matches; it does not prove atomic capture
of a changing account list. Prefer a quiet period and rerun if counts differ.

### Analysis handoff and checks

Give the analyst the generated file path, not credentials. A local analysis
can read `users[].publicMetadata.playerProgress.cases` and `.kits` separately.
For example, a record with `caseSlug: "the-final-rehearsal"`, `status: "started"`,
and `objectives: []` is a recorded start with no saved objective solve, not
proof of no interaction. Treat missing progress as unknown history, not a
completed case or a known abandonment. Empty case/kit arrays mean no entries
were saved in that collection.

Before interpreting metrics, confirm the production instance and export date,
compare account totals with Clerk, check duplicate IDs and invalid timestamps,
and exclude known staff/test accounts under explicit rules. Check each case's
required objectives against its recorded completions. Preserve the export's
timestamp so seven-day and 30-day observation windows use a fixed cutoff.

This snapshot supports signup trends and recorded starts, solves, completions,
and cross-case activity. Use `lastActiveAt` only as Clerk activity, not gameplay
or active session duration. Historical case versions and availability are not
included. Funnel views, hints, shares, attribution, purchases, and full retention
need the separate event data described below; this export cannot create them.

## Shared counting rules

- **Player:** one account, or a consent-allowed anonymous identifier before
  sign-in. An account can represent a couple or group; it is not a headcount.
  Merge anonymous and signed-in activity only through a supported identity link.
  Never infer that two devices belong to one person.
- **Case run:** one player's first recorded start of one case version. Reloads,
  tabs, and devices do not create extra starts. Report deliberate replays
  separately. Keep printable kits separate from interactive cases.
- **Start:** the playable board is ready and usable, not a discovery-page view,
  sign-in click, or failed load. Record failed loads separately.
- **Completion:** the server accepts the final required solution. A final-screen
  view is a separate UX check, not a substitute for accepted completion. A page
  reload must not count twice. Use a case-specific rule for cases without a
  verdict step, such as solving all required objectives.
- **Time window:** use UTC for storage and state the reporting timezone. Group
  conversion by the date of the start, not the date of the finish. Exclude
  cohorts whose full observation window has not passed.
- **Case version:** store a stable version and the required objective IDs for
  that version. A content edit must not change an old player's denominator.
- **Segments:** compare case/version, new/returning players, mobile/desktop,
  traffic source, and assisted/unassisted play. Exclude known staff/test/bot
  traffic using explicit rules. Display sample sizes; avoid ranking tiny groups.
- **Active play time:** proposed rule: count intervals with visible gameplay
  and recent player interaction, using a five-minute idle cutoff. Exclude
  background tabs and idle gaps; combine overlapping devices without doubling
  time. Publish this rule with the dashboard and revise it only with a version.
- **Active player:** at least one meaningful gameplay action in the last 30
  days, such as opening evidence or submitting an answer. Sign-in alone does
  not count. A saved-progress snapshot is only a partial proxy.

## 1. North star: Case Completion Rate

**What:** the share of started case runs completed within 30 days of starting.

**Formula:** runs completed within 30 days / eligible started runs. A start is
eligible only after its full 30-day observation window has passed. Show the
count still in progress separately; do not treat it as a final failure.

Show two versions side by side:

- **All-starter completion:** all eligible runs. This keeps onboarding problems
  visible.
- **Engaged-player completion:** eligible runs that reach five minutes of active
  play, plus any runs completed sooner. Report what share of starters qualifies.

**Track:** `case_started`, active-time intervals, `case_completed`, and
`final_solution_viewed`, with case version, run ID, and assistance state.

**Optimize:** increase completion without reducing access, meaningful challenge,
or unassisted satisfaction. An initial hypothesis is **40-60% or higher for
engaged players**. This is a proposed internal target, not a verified industry
benchmark. Establish a reliable baseline before using it as a release gate.

**Example:** 100 runs are old enough to observe; 60 qualify as engaged and 30
finish. All-starter completion is 30%; engaged completion is 50%. Both numbers
matter. A solution-revealed finish is labeled assisted, not an unassisted solve.

## 2. Gameplay and UX

### Time to First Action

**What:** active time from the first usable board to the first suspect file,
timeline item, or evidence card opened. Measure new players separately.

**Track:** `case_started` and `clue_opened`, including stable clue ID/type.
Deduplicate repeated opens of the same clue when counting distinct clues.

**Optimize:** reduce time to a useful action. Start with a **median below two
minutes**; also show the 75th percentile and the share taking no action within
two minutes. Do not exclude no-action players and report only fast players.

**Example:** the board becomes usable at 20:00 and a suspect file opens at
20:01:10. Time to first action is 70 seconds. Loading time is measured separately.

### Drop-off Funnel Milestones

**What:** progression through this proposed journey:

`Case started -> 3 distinct clues opened -> midpoint -> first verdict attempt -> case solved`

**Track:** `case_started`, `clue_opened`, `midpoint_reached`,
`verdict_submitted`, and `case_completed`. Define the midpoint using explicit
required objective IDs for each case version. It is not half of elapsed time.
Keep the first solved objective as an additional early-activation checkpoint.

**Optimize:** reduce the largest meaningful step loss. Show the share reaching
each step from all eligible starts, and conversion between ordered steps within
30 days. Mark not-yet-mature runs separately. If a case allows another order,
show its actual path too; do not label a valid shortcut as abandonment.

**Example:** of 100 mature starts, 70 open three clues and 20 reach the midpoint.
Investigate the gap between clue inspection and progress before changing the
ending. A lost session or service error is not proof of puzzle difficulty.

### Time to Solve and Session Duration

**What:** total active play time across sessions until accepted completion.
Report session duration and wall-clock time from start to finish separately.
They answer different questions.

**Track:** active-time intervals, gameplay actions, session boundaries, and
`case_completed`. Proposed session rule: start a new session after 30 minutes
without gameplay interaction. The five-minute active-time cutoff still applies
inside a session. Do not depend only on a browser-close event being delivered.

**Optimize:** match the intended pace for each case, not minimum time. For a
case designed for **60-90 minutes**, finishes below **20 minutes** or above
**three active hours** are review signals, not automatic failures. Segment
revealed solutions, returning experts, and group play where known.

**Example:** 45 minutes on Friday plus 30 minutes on Sunday is 75 active minutes,
not two days of play. Show median and 75th-percentile solve time among finishers,
plus unfinished-run counts so slow or blocked players do not disappear.

### Hint and Solution Reveal Usage

**What:** the share of players reaching a hint opportunity who request a hint,
and the share who reveal a solution. Count hint levels and repeats separately.

**Track:** `hint_requested` and `solution_revealed`, with clue/objective ID and
hint level, only if those controls exist. Record whether the player progresses
after help. A full solution reveal changes the run's assistance label.

**Optimize:** help players recover without making help mandatory. Do not aim
for zero hints: optional help can improve satisfaction. **80% hint use at one
clue** is a proposed review trigger, not proof that its logic is broken.

**Example:** 40 of 50 players who reach an objective ask for its hint: 80%.
Compare later solves and errors before deciding whether to rewrite it. If no
hint feature exists, show not available, not 0% usage.

## 3. Retention and content

### Next-Case Conversion Rate

**What:** the share of first-case completers who start a different case within
seven days after completion. Count each account once and exclude replays.

**Track:** first accepted completion and later `case_started` events. Use only
completers with seven full days of follow-up. Report same-session starts as a
separate slice rather than treating them as proof of a later return.

**Optimize:** increase voluntary cross-case play. Show all eligible completers
and a separate group who had another playable, unfinished case available.
This separates weak demand from a lack of new content. Set a numeric target
after a reliable baseline, not from the current tiny completion sample.

**Example:** 8 of 20 eligible first-case completers start another case within
seven days: 40%. Yesterday's completers are not yet in the denominator.

### Waitlist / Email Capture Rate

**What:** confirmed new-case notification signups after a completion prompt /
unique completers shown that prompt who were not already subscribed.
Count confirmation within seven days and wait for that window to pass. If
double opt-in is required, a click or unconfirmed submission is not confirmation.

**Track:** `notification_prompt_viewed`, `notification_signup_submitted`, and
`notification_signup_confirmed`. Record delivery failures and existing
subscribers separately. Do not send email addresses to the analytics stream.

**Optimize:** increase confirmed, voluntary demand for the next release. Check
unsubscribe and delivery-failure rates too. The current saved preference alone
cannot establish this rate or promise an email will be sent.

**Example:** 10 of 40 eligible prompt viewers confirm: 25%. Another five people
click but fail to subscribe; those are not five more captured emails.

### Content Exhaustion

**What:** the share of active accounts that have solved every interactive case
available to them at the report date. Require at least one available case; an
empty catalog must not count as fully solved.

**Track:** completion history and a dated catalog of playable case versions and
access rules. Separate all-case exhaustion from free-catalog exhaustion, and
show assisted completion separately. Do not mix printable kits into this rate.

**Optimize:** use this as a release-planning signal, not a number to maximize or
minimize. High exhaustion with strong demand may justify more content. Low
exhaustion can mean plenty to play or poor activation.

**Example:** 6 of 30 active accounts have finished all available cases: 20%.
Publish the catalog size alongside the rate; one short case is not ten cases.

## 4. Organic growth and sharing

### End-of-Game Share Rate

**What:** unique completers who initiate a share or successfully copy a share
link / unique completers shown the share control. Observe seven days after
exposure and use mature cohorts. Report clicks, copy success, and supported
share-sheet outcomes separately.

**Track:** `share_prompt_viewed`, `share_clicked`, `share_link_copied`, and
attributed visits/starts from a non-personal referral token where supported.

**Optimize:** increase willing recommendations and the new case starts they
bring. A share click is not proof a message was sent or a friend played.

**Example:** 5 of 25 completers copy a link: 20% copy rate. Two later referred
case starts are a separate result, not five guaranteed referrals.

### Direct / Word-of-Mouth Traffic Ratio

**What:** direct or unattributed entry sessions / all entry sessions, plus
separate measured referral and self-reported word-of-mouth shares.

**Track:** privacy-safe source/medium and campaign labels, referral tokens, and
an optional source question. Store no raw URLs with personal query parameters.
Search traffic without a keyword is still organic search when its source is
known; missing keywords do not make it direct traffic.

**Optimize:** increase qualified referred visits and their case starts, not
direct traffic percentage alone. Direct traffic can come from bookmarks,
missing referrers, privacy tools, or broken attribution. It does not prove
word of mouth, and no universal high-ratio target is justified.

**Example:** 40 of 100 visits are direct/unknown, but only 8 report a friend's
recommendation. Report 40% direct/unknown and 8% reported recommendation, not
40% proven word of mouth.

### Co-op / Multi-device Activity

**What:** if shared sessions are built, unique invitees who actually join /
eligible group sessions. Also show invite acceptance: unique joined invitees /
valid unique invited people where that denominator can be measured.

**Track:** `group_session_created`, `invite_created`, and `invite_joined`, with
group-session and anonymous member identifiers. Exclude the host and reconnects.
Shared links without named recipients cannot measure invited-person counts.

**Optimize:** increase successful joins without adding friction to solo play.
This is a future metric, not evidence that group sync is currently supported.

**Example:** two invitees join one host: two invited players per session and
three total participants. The host opening a phone and laptop is not co-op.

## 5. Monetization readiness

### Paywall / Unlock Case Click-Through Rate

**What:** unique eligible viewers clicking an unlock, get-notified, or preorder
offer / unique eligible viewers shown that same offer. Measure within seven
days of first exposure and wait for the full window. Keep each action separate.

**Track:** `case_offer_viewed` and `case_offer_clicked`, including offer version,
CTA type, and displayed price/currency if any. Record only real visible
impressions, not cards rendered off-screen.

**Optimize:** learn which case and price offers generate qualified interest.
A notification click is weaker evidence than a completed purchase. Any future
locked-case test must clearly say what exists and what the action does; do not
imply checkout or availability when neither exists.

**Example:** 12 of 100 viewers click a get-notified offer: 12% interest CTR,
not 12 purchases. This guide does not authorize adding a fake paywall.

### Free-to-Paid Conversion

**What:** unique eligible free players making a first confirmed purchase within
30 days of their first paid-offer exposure / unique eligible free players shown
a purchasable paid offer. Use only fully observed cohorts and exclude prior
buyers. Also report conversion from all eligible free players so offer
placement cannot hide low reach.

**Track:** `case_offer_viewed` and server-verified `purchase_completed`, with
order deduplication, amount/currency, refunds, and chargebacks. Never use a
checkout-success page view alone as payment proof.

**Optimize:** increase genuine purchases and net revenue without harming the
free experience. **2-5% and 10%+** are unverified planning scenarios from the
initial proposal, not established indie-game benchmarks or project commitments.
Set targets after a real paid offer, price, audience, and baseline exist.

**Example:** 3 of 100 mature free-player offer viewers buy: 3% conversion.
Show later refunds separately and report net revenue. A preorder signup is
not a purchase. Before paid offers exist, this metric is not applicable.

## Event contract and data quality

These are requirements for a future implementation, not instructions to store
an ever-growing event log in Clerk metadata. Choose storage in a separate
implementation plan. Keep existing account progress compatible.

Every event needs a unique `eventId`, schema version, event name, occurrence
and receipt timestamps, source (client/server), pseudonymous player ID, and
app/environment version. Add case slug/version, run ID, session ID, and object
ID when relevant. Group, offer, and referral events need their matching IDs.
Catalog availability and experiment exposure need dated snapshots.

- Deduplicate event retries and repeated UI mounts. Repeated clue opens remain
  activity but do not inflate distinct-clue milestones.
- Treat client events as untrusted. Validate access and accepted game outcomes
  on the server. Separate answer rejection, scoring-service failure, and save
  failure; never count a technical error as an incorrect guess.
- Record submission, result, and save acknowledgement separately. Retry safely;
  do not label a failed or missing save as durable progress.
- Check missing events, late/offline delivery, clock skew, duplicate IDs, and
  consent-related coverage before publishing rates. Five starts in the reviewed
  snapshot predate account creation; identity and timestamp rules need checking.
- Exclude private evidence text, full answers, names, email addresses, tokens,
  credentials, and raw IP addresses. Public metadata can still contain personal
  data. Restrict raw-data access and decide consent, retention, and deletion
  rules before collection. See [security](../SECURITY.md).
- Do not infer offline completion from print/PDF opens. Report print use as a
  separate path; online completion metrics do not describe the whole audience.

## Dashboard and review order

Review weekly, with monthly start cohorts for slow outcomes. Always display
numerator, denominator, window, case/version, and tracking coverage.

| Priority | Measure | Decision |
| --- | --- | --- |
| Gate | Save failures, completion mismatches, event coverage | Is the data trustworthy? |
| North star | All-starter and engaged 30-day completion | Are players finishing a satisfying case? |
| Activation | First-action time, first solve, milestone losses | Where should UX or puzzle work start? |
| Pacing | Active solve time, hints, reveals | Is challenge appropriate without forced help? |
| Demand | Seven-day next-case starts and notification capture | Do players want more content? |
| Supply | Content exhaustion | Is the catalog limiting further play? |
| Growth | Sharing, referrals, source-to-start conversion | Which channels bring players who engage? |
| Future business | Offer CTR, purchases, refunds | Is there demonstrated paid demand? |

Use the 2026-11-10 export only as a historical progress snapshot, not an event
baseline for all these metrics. Future implementation is accepted when event
contracts are tested, duplicate/error paths are checked, staff traffic can be
excluded, and sample funnels reconcile with saved progress. No new tracking,
provider calls, paid features, or database changes are part of this document.