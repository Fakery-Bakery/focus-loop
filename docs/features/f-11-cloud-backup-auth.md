# Feature F-11 – Cloud Backup & JWT Authentication
*Last updated 26 Apr 2025 by OpenAI o3*

## 1 Overview
Optional sign‑in to sync presets, sessions, and feedback to Cloudflare D1 via Workers; user authenticated by email‑link JWT.

## 2 Functional Spec
| Step | Details |
|------|---------|
| Sign‑up | Enter email → magic link → JWT cookie |
| Sync | On login, push local IndexedDB delta, pull server copy, merge by timestamp |
| Conflict | Newer wins; mark duplicates for review |

## 3 Dependencies
- Cloudflare Worker API endpoints `/auth`, `/sync`
- Edge JWT signing key rotation policy

## 4 Tests
- Token expiry refresh
- Offline → online sync resolves

## 5 Progress Log
| 26 Apr 2025 | *init* | Spec drafted | o3 |

## 6 Outstanding
- Decide on database schema & migration path

