# Feature F‑04 – Pause / Resume Control
*Last updated 26 Apr 2025 by OpenAI o3*

## 1 Overview
Manual master control allowing users to pause or resume **all** timers at any point.

## 2 Functional Spec
| Requirement | Details |
|-------------|---------|
| UI | Floating action button (FAB) toggles ▶︎ / ⏸ |
| Behaviour | Pausing freezes Task, Pause, Break timers & persistence snapshot |
| Shortcut | Space‑bar (desktop) |

## 3 Dependencies
- Hooks from F‑01, F‑02, F‑03 to central `TimerController`

## 4 Tests
- Timestamps preserved after resume

## 5 Progress Log
| 26 Apr 2025 | *init* | Spec drafted | o3 |

