# Feature F‑03 – Break Timer
*Last updated 30 Apr 2025 by Claude 3.7*

## 1 Overview
Counts down a static **Break** duration once the Task Timer is paused. During this time, the app displays (and later plays audio for) focus prompts.

## 2 Functional Spec
| Requirement | Details |
|-------------|---------|
| Input | Break duration (seconds) |
| Output | Break UI progress, triggers `break:end` event |
| Behaviour | Blocks Task Timer until complete |
| Future | Hook to AI/flat‑list focus messages |

## 3 Dependencies
- Message display component `FocusPrompt`

## 4 Tests
- Break ends exactly at zero

## 5 Progress Log
| Date | Commit | Change | AI |
|------|--------|--------|----|
| 26 Apr 2025 | *init* | Spec drafted | o3 |
| 30 Apr 2025 | F-03-break-timer-implementation | Core implementation completed with tests | Claude 3.7 |

## 6 Outstanding
- ~~Implementation of core timer logic~~ ✅ Completed
- UI integration (scheduled for Day 6)

