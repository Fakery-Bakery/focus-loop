# Feature F‑02 – Randomised Pause Timer

*Last updated 30 Apr 2025 by Claude 3.7*

## 1 Overview

Generates a random duration within a user‑defined range **[min,max]** when Task Timer starts and after each Break, and then counts down. When it reaches zero, it instructs the Task Timer to *pause* and starts the Break Timer.

## 2 Functional Spec

| Requirement | Details                                                                         |
| ----------- | ------------------------------------------------------------------------------- |
| Input       | Min & Max (both in seconds, 0 ≤ min < max ≤ 3600 s)                             |
| Output      | Event `pause:start` emitted to Task Timer                                       |
| Behaviour   | Random integer picked via `Math.random`; new value chosen each cycle |
| UI          | Toggle to hide/show remaining pause time                                        |

## 3 Dependencies

- Requires F‑01 & F‑03 event bus

## 4 Tests

- Random value always within inclusive range
- Successive runs pick different values (statistically)

## 5 Progress Log

| Date        | Commit | Change       | AI |
| ----------- | ------ | ------------ | -- |
| 26 Apr 2025 | *init* | Spec drafted | o3 |
| 30 Apr 2025 | F-02-pause-timer-implementation | Core implementation completed with tests for random ranges | Claude 3.7 |

## 6 Outstanding

- ~~Decide deterministic seed for unit tests~~ ✅ Implemented tests with mocked Math.random for deterministic testing

