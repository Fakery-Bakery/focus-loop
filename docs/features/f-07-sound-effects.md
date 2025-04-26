# Feature F-07 – Sound Effects for Timer Transitions
*Last updated 26 Apr 2025 by OpenAI o3*

## 1 Overview
Play gentle auditory cues when timers start or end (Task, Pause, Break) to keep users informed without looking at the screen.

## 2 Functional Spec
| Event | Default SFX | User Control |
|-------|-------------|-------------|
| Task start | subtle chime | volume & mute toggle |
| Pause start | soft click | choose alternate sound |
| Break start | bell ding | – |
| Break end | whoosh | – |

Format: small OGG files (<50 kB) pre‑cached for offline use.

## 3 Dependencies
- Service Worker (precaching)
- Settings panel (future F‑XX) for volume

## 4 Tests
- Audio plays exactly once per event
- Respects global mute flag

## 5 Progress Log
| 26 Apr 2025 | *init* | Spec drafted | o3 |

## 6 Outstanding
- Source royalty‑free sounds under MIT‑compatible license

