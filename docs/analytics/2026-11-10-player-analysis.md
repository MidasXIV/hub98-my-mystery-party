# Player analysis: 2026-11-10

Status: historical baseline and investigation handoff. No tracking fixes or new
analytics events were implemented as part of this report.

## Summary

Most exported accounts have a recorded case/kit start, but few have a recorded
objective solve. The largest observed gap is between starting and solving the
first objective. This is a reason to investigate, not proof that the puzzles
are too hard or that every account without a solve abandoned the game.

Completion flags are inconsistent with saved objectives for Station Zero.
Validate tracking before using completion rates to judge content. Then focus
on The Final Rehearsal, which has the most recorded starts.

Optimization order: reliable tracking -> first objective solved -> case
completion -> next-case conversion. Case Completion Rate remains the north
star defined in the [analytics guide](../product-specs/analytics.md).

## Source and reproducibility

- Environment: Clerk production; read-only user export.
- Snapshot cutoff: **2026-11-10T10:56:38.754Z**. All trailing windows below end
  at this timestamp and use UTC.
- Private source: `clerk-public-metadata-production-2026-11-10T10-56-38-754Z.json`
  in the operator's Downloads folder. It is not stored in this repository.
- Export shape: `exportedAt`, `instance`, `userCount`, and `users`. Each account
  has `userId`, `createdAt`, `lastSignInAt`, `lastActiveAt`, and `publicMetadata`.
- Analyze `users[].publicMetadata.playerProgress.cases` and `.kits` separately,
  combining them only for the explicitly labeled account-level totals below.
- Refresh instructions: [fetching user data](../product-specs/analytics.md#fetching-user-data-for-analysis).
  A fresh export is a new snapshot, not an exact reproduction of this report.

The original CSV was used for earlier signup analysis, but the JSON contains
the creation timestamps needed to reproduce monthly counts. Keep both exports
private. Neither credentials nor user-level rows belong in this document.
If the private JSON is lost, the aggregate report survives, but exact row-level
reproduction may no longer be possible.

## Account-level baseline

Count each account once per behavior, regardless of how many cases it opened.
Starts here mean saved progress entries, not verified usable-board events.

| Recorded behavior | Accounts | Denominator | Rate |
| --- | ---: | --- | ---: |
| Present in export | 240 | All exported accounts | 100% |
| At least one case/kit entry | 189 | 240 accounts | 78.8% |
| No case/kit entries | 51 | 240 accounts | 21.3% |
| At least one saved objective solve | 16 | 240 accounts | 6.7% |
| A solve among recorded starters | 16 | 189 starters | 8.5% |
| Started, with no saved solve | 173 | 189 starters | 91.5% |
| At least two case/kit entries | 30 | 240 accounts | 12.5% |
| At least one completed-status entry | 2 | 240 accounts | 0.8% |

There are **227 case entries**, **1 kit entry**, and **55 saved objective
records**. Multiple case starts do not prove that the player returned later,
finished a case, or played for a particular duration.

Seven-day activation is **16 / 237 eligible accounts = 6.8%**. Eligibility means
the account was created at least seven days before the snapshot. Activation
means a saved objective `solvedAt` falls between creation and seven days later.
This is a recorded-progress proxy, not a fully validated event-based baseline.

## Case-level baseline

Each start is one saved account-case entry. Rates use all recorded starts,
without a five-minute engagement requirement or a mature completion window.

| Collection / case | Starts | Accounts with a solve | Solve rate | Completed flags |
| --- | ---: | ---: | ---: | ---: |
| Cases: The Final Rehearsal | 144 | 10 | 6.9% | 0 |
| Cases: Station Zero | 35 | 5 | 14.3% | 0 |
| Cases: The Final Bench-Off | 22 | 1 | 4.5% | 0 |
| Cases: The Murder at Kismet Casino | 13 | 5 | 38.5% | 2 |
| Cases: Sins of Saint Lazarus | 11 | 0 | 0% | 0 |
| Cases: Zero Sum | 1 | 0 | 0% | 0 |
| Cases: The Last Check-In | 1 | 0 | 0% | 0 |
| Kits: Valentines Mixer Swipe for Murder | 1 | 0 | 0% | 0 |

Do not sum case-level solving accounts to obtain unique players: an account
can solve objectives in more than one case. Do not rank cases as better or
worse from these small, differently exposed audiences. Kismet's observed solve
rate is promising, but its 13 starts are not enough to establish superiority.

## Activity and demand

- Clerk activity in the trailing seven days: **3 accounts**.
- Clerk activity in the trailing 30 days: **12 accounts**.
- Accounts with a saved objective solve in those windows: **0** and **1**.
- Accounts with a saved new-case notification preference set to true: **1**.
  This is not a measured prompt conversion or confirmed email subscription.
- Of two recorded completers with 30 days of follow-up, one started a different
  case within 30 days after completion. This sample is too small to guide
  retention decisions and is not the guide's seven-day next-case metric.

Clerk `lastActiveAt` is authentication-provider activity, not active gameplay.
These are not session counts, DAU targets, or historical retention cohorts.
Saved objective dates may reflect synchronization rather than exact play time.

## Signup trend

Counts describe accounts still present in the export, not all historical
registrations. Deleted accounts are not represented.

| Month in 2026 | Accounts created |
| --- | ---: |
| March, partial | 31 |
| April | 23 |
| May | 29 |
| June | 32 |
| July | 38 |
| August | 32 |
| September | 35 |
| October | 16 |
| November, partial | 4 |

October was **54.3% below September**. Compare traffic with visitor-to-signup
conversion to distinguish fewer visitors from registration friction. This
snapshot has neither traffic sources nor visitor counts. Do not compare partial
November with a full month or assume a cause for the decline.

## Metrics we cannot yet judge

| Metric from the guide | Assessment at this snapshot |
| --- | --- |
| Case Completion Rate | Not reliable: status/objective mismatch; active-time eligibility unavailable |
| Time to First Action | Clue-open events and active time missing |
| Drop-off milestones | Only partial start/solve records; clue views and attempts missing |
| Time to Solve / session duration | First/last saved dates are not active play time |
| Hint / solution reveal use | Exposure and usage events missing |
| Seven-day next-case conversion | Not established; tiny, unreliable completion base |
| Waitlist / email capture | No prompt exposure or confirmed-signup history |
| Content exhaustion | Historical availability/version/access data missing |
| End-of-game sharing | No share exposure, action, or referral events in this export |
| Direct / word-of-mouth traffic | No attribution; direct traffic would not prove word of mouth |
| Co-op / invited players | Account/device activity cannot identify group participants |
| Offer click-through | No offer exposure/click history |
| Free-to-paid conversion | No offer exposure or verified purchase history |

The proposed **40-60% engaged-player completion target** cannot be assessed
from this export. It is an internal hypothesis, not a validated benchmark.

## Data quality and source evidence

Checks on the snapshot found no duplicate account-case entries, invalid
first/last-play dates, last-play dates before first-play dates, or completed
statuses without a completion date. Five starts predate their account creation;
check their timing and identity history before interpreting activation gaps.
Known staff/test accounts have not been excluded.

Five Station Zero entries each contain all five current objective IDs but
remain marked started. The
[current case objectives](../../src/data/station-zero-data.ts) confirm the
five-objective set; historical case versions are not included in the export.
The discrepancy proves the two stored signals disagree, not why they disagree.

The [client tracker](../../src/components/player-progress-tracker.tsx) does not
check HTTP success and marks an objective synced before acknowledgement. The
[progress handler](../../src/lib/api/board/player-progress.ts) and
[merge model](../../src/lib/player-progress.ts) should be checked together.
These are code-level risks, not proof that all missing solves were lost saves.
`attempts` counts saved successful-solve events, not failed guesses.

Offline groups and print/PDF play are not fully represented. A single account
may represent multiple people. Unobserved activity is unknown, not zero.

## Psychological interpretations to investigate

These hypotheses came from the user's interpretation of the results. Keep them
as inputs for research and design, not as measured player feelings or proven
causes. The export has no evidence about the first three or five minutes,
emotions, failed guesses, or why a person stopped.

The 78.8% figure uses all accounts; the 8.5% figure uses recorded starters.
They are different funnel denominators. The 91.5% without a saved solve is not
a measured bounce rate. Missing saves, browsing, offline play, test accounts,
and a plan to return later remain alternative explanations. The proposed
reward/effort equation and "dopamine drought" are metaphors, not a validated
engagement formula or evidence about players' brain chemistry.

### H1: Detective fantasy meets too much mental work

**Hypothesis:** someone expecting an enjoyable investigation may instead meet
dense evidence and unclear controls. Learning the interface could cost more
effort than the opening story gives back. This is the suggested "unpaid
homework" effect, not a finding about every starter.

**Test:** ask a new player what they expect before opening The Final Rehearsal.
Observe what they read first and ask what they think they should do next. If
they can explain the task and navigate easily, initial overload becomes a less
likely explanation, even if they later stop.

**Possible follow-up:** reduce competing starting choices or show a small set
of relevant evidence first. Example: the first question points to two files,
while the remaining evidence stays available for later investigation.

### H2: Early confusion weakens confidence

**Hypothesis:** players may want to feel capable, but unclear questions or blunt
incorrect-answer feedback may make them reluctant to continue. This relates to
the proposed competence explanation from Self-Determination Theory; it is not
a diagnosis or evidence that players felt foolish.

**Test:** ask players to explain what the first objective requires before they
submit. Observe whether an incorrect answer leads to another attempt. Separate
answer rejection from scoring errors and failed saves. Confident retries would
weaken the claim that rejection itself drives disengagement.

**Possible follow-up:** explain answer expectations and give useful, respectful
feedback without exposing the solution. Example: distinguish a missing reason
in an answer from a service failure rather than showing the same generic error.

### H3: The opening lacks a meaningful payoff

**Hypothesis:** players may read several files without noticing progress or
making a satisfying deduction. The issue could be delayed feedback rather than
the amount of reading or the difficulty of the full case.

**Test:** observe when a player first explains a connection in their own words
and whether the game acknowledges it. Ask whether they feel they have made
progress. Visible early deductions followed by stopping would weaken this
explanation and suggest looking at later pacing or other causes.

**Possible follow-up:** add a short, story-relevant opening deduction and clear
progress feedback. Example: compare a timestamp with a statement, then explain
what that discovery changes. Do not equate clicking an obvious answer with
understanding, or assume a reward animation fixes weak puzzle logic.

### H4: Ambiguity is mistaken for challenge

**Hypothesis:** players may not know where to look, what an objective asks, or
how to format an answer. Those uncertainties differ from a difficult deduction
with clear rules. Too many unexplained options could prevent a first attempt.

**Test:** without coaching, ask what evidence the player expects to use and
what a valid response would contain. If they understand both but cannot make
the deduction, investigate the puzzle itself rather than only adding UI help.

**Possible follow-up:** clarify the current question, relevant controls, and
answer format. Example: say whether the response needs a person, a time, and
supporting reasoning. Keep optional help available without revealing the answer.

### H5: Group hosts feel pressure during setup

**Hypothesis:** a host may feel responsible for keeping a partner or group
engaged. A slow or confusing start could lead the group to choose something
else. Date-night positioning makes this worth testing, but account records
cannot identify couples, groups, embarrassment, or competing activities.

**Test:** observe a couple or small group starting together, as well as solo
players. Ask the host and others how setup felt. Look for actual trouble
sharing context or taking a first action rather than inferring it from silence.

**Possible follow-up:** make the opening question and next action easy to
understand together. Example: a short shared briefing gives everyone the same
starting context. This does not require adding co-op sync or a new group system.

### Design direction and success checks

The original proposal called this a "guided illusion of genius": an easy first
win followed by earned difficulty. Use it as a prompt to support real player
confidence, not to trick players or make the first objective childish.

Prefer an **early, meaningful deduction** with a clear question, manageable
evidence, understandable answer expectations, and useful feedback. Make extra
guidance optional and skippable for experienced players. Do not replace every
case's opening or simplify its logic before observing the problem.

After save tracking is reliable, test one small change in The Final Rehearsal.
Measure first-action time, first-solve rate, progression into the next
objective, and observed understanding/confidence. Then inspect mature case
completion and hint/reveal use. A higher first-solve rate with no later progress
could mean the opening became trivial, not that the experience improved.
For this low-volume audience, start with observed sessions; a small numerical
change or an underpowered A/B test is not strong causal evidence.

## Resume checklist

These are proposed next tasks, not completed implementation or approval to add
a provider, database, or paid feature. Use an execution plan for a multi-area
tracking change under the [planning workflow](../PLANS.md).

- [ ] **First task: reproduce the completion mismatch.** Use synthetic data
  containing every required Station Zero objective with started status. Check
  completion on the final solve, hydration, reload, delayed board data, and
  repeated events. Do not modify real account metadata to run tests.
- [ ] **Validate save reliability.** Test successful saves, HTTP rejection,
  network failure, retries, and concurrent progress events. Only acknowledge
  durable progress after success; preserve existing case/kit contracts.
- [ ] **Define a minimal event funnel.** Board ready -> first clue -> three
  distinct clues -> answer submitted -> result -> progress saved -> completion.
  Keep incorrect answers separate from scoring and storage failures. Resolve
  storage, consent, retention, deduplication, and staff exclusions before launch.
- [ ] **Investigate The Final Rehearsal.** Observe new mobile/desktop players
  finding evidence, understanding the first objective, and submitting an answer.
  Its 144 starts make it the highest-volume place to investigate friction.
- [ ] **Test the psychological hypotheses.** Use H1-H5 above to observe solo
  and couple/group starts. Record evidence that supports or weakens each
  explanation, including technical and offline alternatives. Do not infer
  feelings from missing progress records.
- [ ] **Prototype one supported opening change.** If observation supports it,
  test a meaningful first deduction, clearer answer expectations, or optional
  guidance. Compare first solves and next-objective progress together; retain
  challenge and player choice rather than adding a forced tutorial.
- [ ] **Check acquisition separately.** Compare September/October traffic and
  signup conversion using the site's traffic data, if available.
- [ ] **Rebaseline after validation.** Mark the tracking release date, compare
  first-solve rates, and wait for mature 30-day completion cohorts. Do not mix
  new reliable events with old partial records without labeling the difference.

Next session should start with the first checklist item and the source files
above, not a new export or a puzzle rewrite. Preserve this report as the dated
snapshot; add later reports for new observations and link them from the
[knowledge map](../index.md).