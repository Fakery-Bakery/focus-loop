# Feature F-12 – AI‑Generated Focus Messages
*Last updated 26 Apr 2025 by OpenAI o3*

## 1 Overview
Surface short tailored mindfulness prompts during Breaks, pulled from either a curated list or generated on‑demand via external AI API (OpenAI / Claude).

## 2 Functional Spec
| Mode | Behaviour |
|------|-----------|
| Offline | Random pick from local list `focusPrompts.json` |
| Online | POST Focus text → AI endpoint → receive concise prompt (≤120 chars) |

## 3 Dependencies
- Requires F‑03 Break Timer placeholder area
- API key stored encrypted in Worker KV

## 4 Tests
- Fallback to offline list on fetch error
- Prompt text fits container (ellipsis if overflow)

## 5 Progress Log
| 26 Apr 2025 | *init* | Spec drafted | o3 |

## 6 Outstanding
- Prompt tone guidelines to avoid generic clichés

