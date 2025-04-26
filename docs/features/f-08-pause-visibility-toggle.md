# Feature F-08 – Pause Timer Visibility Toggle
*Last updated 26 Apr 2025 by OpenAI o3*

## 1 Overview
Allow users to hide the Pause Timer countdown to reduce distraction/anticipation.

## 2 Functional Spec
| UI | Details |
|----|---------|
| Toggle switch | Label: “Show Mini‑Break Countdown” |
| Behaviour | When off, PauseTimer continues invisibly; Task pauses at zero as usual |

## 3 Dependencies
- Requires F‑02 rendering logic decoupled from core timer state

## 4 Tests
- Toggle persists per‑session in `settings` store
- Hidden state still triggers pause

## 5 Progress Log
| 26 Apr 2025 | *init* | Spec drafted | o3 |

