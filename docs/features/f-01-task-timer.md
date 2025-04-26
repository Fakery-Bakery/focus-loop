# Feature F‑01 – Task Timer
*Last updated 26 Apr 2025 by OpenAI o3*

## 1 Overview
Enables users to start a **Task Timer** for a fixed duration. Acts as the primary countdown that will be *paused* whenever the Pause Timer elapses and *resumed* after each Break.

## 2 Functional Spec
| Requirement | Details |
|-------------|---------|
| Input | Duration (mm:ss) chosen on session setup |
| Output | Live countdown UI, end‑of‑task event |
| Behaviour | Decrements every second (1 Hz) while active; emits `task:pause` when Pause Timer expires; emits `task:complete` when reaches 00:00 |
| Edge Cases | Duration = 0 → disallowed; max = 23 h 59 m |

## 3 Dependencies
- *core‑timers* library
- React Context provider (`TimerProvider`)
- UI component `TaskCountdown` (Tailwind + shadcn `Card`)

## 4 Tests
- **unit:** countdown ticks & stops at zero
- **integration:** triggers pause when PauseTimer sends event

## 5 Progress Log
| Date | Commit | Change | AI |
|------|--------|--------|----|
| 26 Apr 2025 | *init* | Spec drafted | o3 |

## 6 Outstanding
- Implement reducer & hook `useTaskTimer`

