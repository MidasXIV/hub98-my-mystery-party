# Play board audit

Recorded: 2026-11-17. Findings 1 and 2 are fixed; findings 3-11 remain open, with partial
test coverage added toward finding 10. The findings describe the original
read-only audit; follow-up status is recorded below. This report is not an
implementation plan or approval to change other behavior. Finding numbers match
the original report so follow-up work can refer to them.

## Scope and assumptions

The application runs mystery games where players inspect evidence, connect clues,
and solve objectives. The audit covered the
[play page](../src/app/play/[slug]/page.tsx) and its supporting generation,
unlock, progress, and layout flows.

Expected use: individual players and small groups, including the same account
open in multiple tabs or devices. This was not a whole-repository audit.
Source links identify the audited locations; line numbers may move.

## Must fix

### 1. Returning players lose evidence they already unlocked

**Status:** Fixed 2026-11-17. See [resolution and verification](#finding-1-resolution-2026-11-17).

Sources: [play initialization](../src/app/play/[slug]/page.tsx),
[generation filtering](../src/lib/api/board/generate.ts),
[saved progress reader](../src/lib/api/board/player-progress.ts).

- **What this is:** The page restores completed objective IDs when a player returns.
- **Problem:** Generation still removes all locked evidence. Restoring completion
  IDs does not restore the matching evidence, and completed objectives cannot be
  attempted again. A local mocked check reproduced a completed objective whose
  unlocked evidence was absent after remount.
- **Fix:** Generate the resumed board using saved completion IDs, including the
  matching unlocked items and connections.
- **If we skip it:** Players resume an incomplete board with no normal way to
  recover the missing evidence.

### 2. The browser receives the answers

**Status:** Fixed 2026-11-17. See [resolution and verification](#finding-2-resolution-2026-11-17).

Sources: [generation response](../src/lib/api/board/generate.ts),
[client registry import](../src/app/play/[slug]/page.tsx#L10),
[server dataset registry](../src/data/coldCases.server.ts).

- **What this is:** The server filters locked items before returning a board.
- **Problem:** It leaves objective `solution` fields intact; the tested initial
  payload contained three answers. The client also imports the full case registry,
  which imports the evidence datasets. The import path was source-reviewed;
  production bundle contents were not measured.
- **Fix:** Keep full datasets server-only. Send the client case metadata and public
  objective fields without solutions.
- **If we skip it:** Players can read answers from network responses, and server-side
  item filtering does not keep the full case out of client code.

### 3. Concurrent saves overwrite each other

Source: [progress handler](../src/lib/api/board/player-progress.ts#L120).

- **What this is:** Each progress request reads account metadata, changes it, then
  writes it back.
- **Problem:** Two requests can read the same old value and overwrite each other's
  changes. Two actual handler calls with mocked Clerk storage reproduced a lost
  objective.
- **Fix:** Use shared storage that can merge and save progress as one indivisible
  operation. A lock inside one server process will not protect multiple instances.
- **If we skip it:** Playing in two tabs or devices can erase saved progress.

Related existing tracker entry: [TD-07](exec-plans/tech-debt-tracker.md).

### 4. Failed progress saves are treated as finished

Sources: [request handling](../src/components/player-progress-tracker.tsx#L14),
[sync bookkeeping](../src/components/player-progress-tracker.tsx#L72).

- **What this is:** The tracker sends newly completed objectives to the server.
- **Problem:** It marks an objective synced before saving and never checks the HTTP
  response. A mocked HTTP 500 produced no retry on the next render.
- **Fix:** Mark objectives synced only after a successful response. Keep failed
  events pending and show a save-failed state with retry.
- **If we skip it:** A temporary server failure silently loses a player's completion.

### 5. Opening a case erases notification preferences

Source: [progress merge return values](../src/lib/player-progress.ts#L217).

- **What this is:** The progress model stores gameplay and new-case notification
  preferences together.
- **Problem:** Ordinary progress updates return a new object without
  `notificationPreferences`. Setting a preference and then opening a case reproduced
  its removal.
- **Fix:** Preserve the normalized existing metadata when replacing the cases or
  kits collection.
- **If we skip it:** Gameplay silently resets a preference the player already chose.

### 6. Player notes disappear after refresh

Source: [board note creation](../src/app/play/[slug]/page.tsx#L1399).

- **What this is:** Players can add notes, edit the board, and draw connections.
- **Problem:** Those changes exist only in React memory. Adding a note and remounting
  the page reproduced its loss.
- **Fix:** Save board edits per user and case; browser storage is enough if
  cross-device restoration is not promised. Clearly distinguish local board saves
  from account progress.
- **If we skip it:** Closing or refreshing a multi-hour investigation loses the
  player's working notes.

### 7. Hints describe a different mystery

Sources: [hint selection fallback](../src/app/play/[slug]/page.tsx#L582),
[fallback clue definitions](../src/app/play/[slug]/page.tsx#L33).

- **What this is:** The hint button supplies evidence intended to help solve the
  current case.
- **Problem:** Missing or empty authored clues activate generic hints about almonds,
  a stopped watch, and a sedative. All six cases marked playable at audit time lacked
  authored clues; a local check reproduced spawning a fallback clue.
- **Fix:** Remove the fallback story clues. Disable the hint button when the current
  case has none.
- **If we skip it:** Players receive false leads presented as genuine case information.

### 8. Cloudflare-only configuration cannot load a board

Source: [generation configuration gate](../src/lib/api/board/generate.ts#L440).

- **What this is:** Board generation currently reads static case data.
- **Problem:** It first requires the Google `API_KEY`, even though generation does
  not call Google. With an isolated empty environment, the handler returned HTTP
  500 before reading the requested case.
- **Fix:** Remove the unused generation gate, or explicitly require and document it
  as intentional policy. Resolve the existing compatibility constraint before
  changing the gate.
- **If we skip it:** An installation configured for the documented default
  Cloudflare provider can fail before play begins.

Related existing tracker entry: [TD-06](exec-plans/tech-debt-tracker.md).

## Should fix

### 9. Declutter fits the old layout, not the new one

Sources: [declutter fitting](../src/app/play/[slug]/page.tsx#L1395),
[undo fitting](../src/app/play/[slug]/page.tsx#L1371).

- **What this is:** Declutter rearranges evidence and then fits it into view.
- **Problem:** The delayed reset retains the previous render's item positions.
  With the mocked viewport, its calculated zoom was approximately `0.718`;
  resetting against the new layout produced `0.5`.
- **Fix:** Fit the newly computed layout directly, or trigger fitting after that
  layout is committed. Apply the same correction to undo.
- **If we skip it:** Decluttering can leave evidence outside the fitted view.

### 10. Critical resume and save behavior has no regression tests

Source: [configured commands](../package.json#L5).

- **What this is:** Automated regression tests catch previously fixed failures.
- **Problem:** No application test files or test command were found. Targeted lint
  passed despite the reproduced resume and persistence bugs.
- **Fix:** Add small mocked tests for reload-after-unlock, failed saves, and
  overlapping progress writes, with one command to run them.
- **If we skip it:** These failures can return unnoticed after routine changes.

Related existing tracker entry: [TD-01](exec-plans/tech-debt-tracker.md).

**Follow-up:** Finding 1 added focused resume and API compatibility regressions.
Broader failed-save and concurrent-write regression coverage remains open.

## Nice to have

### 11. Completion fetches the same badge twice

Sources: [badge effect](../src/app/play/[slug]/page.tsx#L712),
[solve callback](../src/app/play/[slug]/page.tsx#L2351).

- **What this is:** Both an effect and the solve callback fetch and insert the
  completion badge.
- **Problem:** Completing the final objective reproduced two badge requests. Both
  paths maintain nearly identical insertion and filter logic.
- **Fix:** Keep one badge-loading path and move the reward notification there.
- **If we skip it:** Every completed case makes an unnecessary request, and future
  fixes must update both copies.

Estimated simplification: about 40 fewer lines, with no dependency removal claimed.

## Validation evidence and limits

These are results from the preceding audit, not checks rerun when this document
was created:

- Local, isolated checks exercised the existing TypeScript code with mocked React
  hooks, viewport measurements, network responses, and Clerk storage.
- Checks reproduced missing resumed evidence, answer fields in the initial payload,
  note loss after remount, stale declutter fitting, unrelated fallback clues,
  duplicate badge requests, failed-save bookkeeping, concurrent handler write loss,
  preference removal, and the unused configuration gate.
- No live Clerk, AI provider, or webhook was called. The temporary audit harness
  was removed; it is not a committed regression suite.
- Targeted lint passed:

  ```powershell
  yarn.cmd eslint 'src\app\play\[slug]\page.tsx' src\components\objective-solver.tsx src\components\player-progress-tracker.tsx src\lib\api\board\generate.ts src\lib\api\board\player-progress.ts src\lib\declutter.ts src\lib\player-progress.ts
  ```

- `yarn.cmd tsc --noEmit --incremental false` failed because the generated
  route validator referenced missing `src/app/admin/analytics/page.js` and
  `src/app/analytics/page.js` modules.
  A separate TypeScript API check using the existing compiler settings while
  excluding generated `.next` files reported zero source diagnostics. That is not
  a passing normal project type-check.
- No repository code was changed during the audit.

**Original verdict:** Fix resumed evidence and progress durability first, then
remove answer exposure and false hints.

**Not checked:** Unrelated repository features, production builds or bundle
inspection, live services, browser rendering, accessibility, and measured
performance under load.

## Finding 1 resolution (2026-11-17)

- Generation now uses the authenticated player's saved progress for the requested
  case. Saved IDs are checked against that board's objectives; client-supplied user
  IDs or claimed completions do not control this read.
- Initial evidence, previously unlocked evidence, valid connections, and completion
  IDs are returned together. Unsolved evidence remains excluded. The completion
  badge still follows the existing dynamic badge path.
- The client consumes this one response instead of a separate progress request.
  It preserves item unlock metadata so objective evidence filters work after
  returning to a case as well as after a fresh solve.
- Progress-read failures use the existing generation error response and mission
  error screen rather than returning an incomplete fresh board.
- No dependencies were added. Progress writes, scoring, the `API_KEY` gate, note
  persistence, and the other audit findings were not changed.

Verification:

- The new resume regression was run before the fix and failed because unlocked
  evidence was missing.
- `node --test scripts\board-resume.test.mjs`: 10 tests passed. Coverage includes
  partial/full completion, connections with available endpoints, signed-out/new
  players, case/kit isolation, ignored client claims, stale/duplicate saved IDs,
  legacy placeholder boards, storage errors, and the existing progress GET contract.
- A separate isolated smoke check of the actual play page with mocked React hooks
  verified restored evidence, objective grouping, completion/sync IDs, no separate
  progress GET, and integration of a fresh solve. This was not a browser test.
- Targeted ESLint passed for the three changed source files and the regression file.
- `yarn.cmd next typegen` refreshed stale generated route types, after which
  `yarn.cmd tsc --noEmit --incremental false` passed normally.
- No production build or live-service/browser check was run.

## Finding 2 resolution (2026-11-17)

- Generation now projects objectives to `{ id, description }` for both initial
  and resumed boards without modifying the server's canonical solutions.
- The existing public registry path is metadata-only. Full datasets moved behind
  a `server-only` guard in the server registry, used by scoring, generation,
  badge awards, and print. Client imports keep their existing metadata lookup API.
- Catalog pages derive objective counts on the server without passing evidence
  through card/filter props. Homepage badge artwork uses public image metadata,
  checked against the authored awards by the regression suite.
- No dependencies were added. Print access, intentional previews, public assets,
  scoring rules, and the other open audit findings are unchanged.

Verification:

- The new API projection regression failed before the fix because `solution`
  fields were returned, then passed after the fix.
- `node --test scripts\board-resume.test.mjs`: 13 tests passed, including all
  finding 1 regressions, public/server metadata and badge parity, numeric-count
  badge progress, and recursive dependency checks from every client component.
- Targeted ESLint, TypeScript, and `yarn.cmd build` passed. The build generated
  all 124 static pages, including every print route.
- An inspection of 44 production client JavaScript chunks found none of the 16
  complete canonical explanations. Two short answers were excluded from string
  matching because public character names also appear in intentional previews;
  the dependency test covers all full evidence datasets regardless of string length.
- No live scoring or signed-in browser session was exercised. This closes the
  API/client dataset leaks, not the broader question of public print/asset spoilers.
