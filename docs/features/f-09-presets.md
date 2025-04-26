# Feature F-09 – Session Presets
*Last updated 26 Apr 2025 by OpenAI o3*

## 1 Overview
Save and re‑apply frequently used combinations of Task duration, Pause range, Break length, and Focus.

## 2 Functional Spec
| Action | Details |
|--------|---------|
| Save Preset | Button in setup wizard; prompts for preset name |
| Apply Preset | Dropdown list on dashboard |
| Data Model | `{ id, name, task, minPause, maxPause, breakDur, focus }` |

## 3 Dependencies
- Relies on F‑01…F‑05 configuration UI
- IndexedDB store `presets`

## 4 Tests
- Saving duplicates warns user
- Selecting preset populates form fields correctly

## 5 Progress Log
| 26 Apr 2025 | *init* | Spec drafted | o3 |

