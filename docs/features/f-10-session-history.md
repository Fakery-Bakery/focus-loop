# Feature F-10 – Session History & JSON Export
*Last updated 26 Apr 2025 by OpenAI o3*

## 1 Overview
Display past sessions with metadata and allow export as JSON for personal analysis.

## 2 Functional Spec
| View | Columns |
|------|---------|
| Table | Date, Task Name, Focus, Total Time, Feedback rating |

Export button downloads `focus-loop-sessions-yyyy-mm-dd.json`.

## 3 Dependencies
- Uses same `sessions` store as F‑06 feedback
- Utilises FileSaver API for download

## 4 Tests
- Exported JSON validates against schema
- Table paginates after 50 rows

## 5 Progress Log
| 26 Apr 2025 | *init* | Spec drafted | o3 |

