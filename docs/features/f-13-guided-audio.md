# Feature F-13 – Guided Audio Breaks
*Last updated 26 Apr 2025 by OpenAI o3*

## 1 Overview
In future versions, play a short TTS or pre‑recorded audio track during Break Timer, personalised to the user’s chosen **Focus**.

## 2 Functional Spec
| Stage | Details |
|-------|---------|
| MVP POC | Concatenate SSML → call TTS API → cache OGG locally |
| Full | Real‑time streaming if Break > 60 s |

## 3 Dependencies
- Builds on F‑12 AI prompt generation
- Requires MediaSession API for background audio controls

## 4 Tests
- Verify audio length ≤ Break duration (fade out)
- Ensure unavailable voices fall back gracefully

## 5 Progress Log
| 26 Apr 2025 | *init* | Spec drafted | o3 |

## 6 Outstanding
- Evaluate latency of TTS providers vs Break length

