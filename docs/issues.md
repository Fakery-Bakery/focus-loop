# Issues & Risk Log – Focus‑Loop PWA
*Created 26 Apr 2025 by OpenAI o3*

---

## 1 Open Issues
| ID | Date | Title | Description | Severity | Owner | Status |
|----|------|-------|-------------|----------|-------|--------|

## 2 In Progress
| ID | Date | Title | Notes | Target Fix |
|----|------|-------|-------|-----------|

## 3 Resolved / Closed
| ID | Date | Title | Resolution |
|----|------|-------|-----------|
| 1 | 2025-07-10 | Module not found: Can't resolve '@focus-loop/core-timers' | Added proper module resolution configurations in tsconfig.json, next.config.ts, and vitest.config.ts to correctly resolve the workspace package. Fixed on 2025-07-22. |
| 2 | 2025-07-21 | Import resolution misconfiguration breaking dev server and tests | Created root tsconfig.json with proper paths mapping. Ensured consistent alias configuration across Next.js webpack config and Vitest config. Fixed on 2025-07-22. |
| 3 | 2025-07-27 | ESM/CommonJS module system inconsistencies | Standardized core-timers package to use ESM syntax, removed CommonJS compatibility layer, and updated package.json exports configuration. Fixed on 2025-07-27. |
| 4 | 2025-07-27 | Timer method name inconsistency | Fixed method name mismatch between implementation (getRemaining) and tests (getTimeRemaining). Updated tests to use correct method names. Fixed on 2025-07-27. |

## 4 Known Risks & Mitigations
| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Cloudflare Workers CPU limit for long AI calls | M | H | Offload to external API, stream back |
| Monorepo workspace package resolution | M | H | Ensure consistent path mapping in tsconfig.json, next.config.ts, and vitest.config.ts whenever adding new workspace packages |
| Module system inconsistencies | M | M | Standardize on ESM for all packages, maintain consistent export patterns, and ensure proper TypeScript configuration |

---

> **Update protocol:** when a bug recurs, add an entry here and reference commit + PR. Include *Root Cause*, *Fix*, *Tests* added.

