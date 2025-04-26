# Feature F-06 – End‑of‑Task Feedback Prompt
*Last updated 26 Apr 2025 by OpenAI o3*

## 1 Overview
After the Task Timer completes, solicit user feedback (text or quick‑emoji) to assess whether the **Task** and **Focus** pairing was effective.

## 2 Functional Spec
| Requirement | Details |
|-------------|---------|
| Trigger | Event `task:complete` |
| Modal | Shows Task name, Focus phrase, rating control (👍 / 👎 + optional notes) |
| Storage | `sessions.feedback` array `{ rating, note, timestamp }` |
| Accessibility | Escape to dismiss, voiceover labels |

## 3 Dependencies
- Relies on F‑05 metadata fields
- Persists via IndexedDB (MVP) → Cloud sync (F‑11)

## 4 Tests
- Feedback saved on submit
- Skip leaves no entry

## 5 Progress Log
| Date | Commit | Change | AI |
|------|--------|--------|----|
| 26 Apr 2025 | *init* | Spec drafted | o3 |

## 6 Outstanding
- Decide emoji set vs 5‑star scale

