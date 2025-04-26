# Feature F‑04 – Pause / Resume Control + Timer UI
*Last updated 3 May 2025 by Claude 3.7*

## 1 Overview
- Part 1: Manual master control allowing users to pause or resume **all** timers at any point.
- Part 2: UI components for displaying and controlling timers (implemented May 3, 2025).

## 2 Functional Spec
### 2.1 Pause/Resume Control
| Requirement | Details |
|-------------|---------|
| UI | Floating action button (FAB) toggles ▶︎ / ⏸ |
| Behaviour | Pausing freezes Task, Pause, Break timers & persistence snapshot |
| Shortcut | Space‑bar (desktop) |

### 2.2 Timer UI Components
| Component | Details |
|-------------|---------|
| TimerDisplay | Shows timer in MM:SS format (e.g., "25:00") |
| TimerControls | Context-aware buttons (Start, Pause, Resume, Reset) |
| TimerContainer | Integrates core timer logic with UI components |

## 3 Dependencies
- Hooks from F‑01, F‑02, F‑03 to central `TimerController`
- `@focus-loop/core-timers` for timer functionality

## 4 Tests
- Timestamps preserved after resume
- Unit tests for UI components:
  - `TimerDisplay.test.tsx`: Tests time formatting and display
  - `TimerControls.test.tsx`: Tests button rendering based on state
  - `TimerContainer.test.tsx`: Tests integration with timer logic

## 5 Progress Log
| 26 Apr 2025 | *init* | Spec drafted | o3 |
| 3 May 2025 | *update* | Implemented Timer UI components | Claude 3.7 |

