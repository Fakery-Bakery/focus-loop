# Feature F‑05 – Task Metadata (Name & Focus)
*Last updated 26 Apr 2025 by OpenAI o3*

## 1 Overview
Allows users to label each timer session with a **Task Name** and a **Focus** phrase that will be surfaced during breaks.

## 2 Functional Spec
| Field | Validation | Storage |
|-------|------------|---------|
| Task Name | 1‑60 chars | IndexedDB → `sessions.name` |
| Focus | 0‑120 chars | `sessions.focus` |

## 3 Dependencies
- UI form on session setup wizard
- Break Timer focus prompt display

## 4 Tests
- Empty task name disallowed

## 5 Progress Log
| 26 Apr 2025 | *init* | Spec drafted | o3 |

