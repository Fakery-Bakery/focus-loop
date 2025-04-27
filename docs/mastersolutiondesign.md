# Master Solution Design – Focus-Loop Timer PWA

> **Product Name (working):** *Focus-Loop* **Version:** 0.1 (Initial Architecture & Planning) **Authoring AI:** OpenAI o3 – 26 Apr 2025 **License:** MIT\
> **Status:** DRAFT – awaiting stakeholder review

---

## 1 Purpose & Vision

Focus-Loop helps users work in rhythmic, distraction-resistant bursts by interleaving a **Task Timer**, a **randomised Pause Timer**, and a **Break Timer** accompanied by personalised focus prompts. The app is a *Progressive Web App* (PWA) that works offline, syncs sessions when online, and scales from mobile phones to desktops.\
Ultimately it becomes a mindful productivity companion with optional audio guidance, analytics, and cloud backup.

## 2 Key User Stories (Feature-Driven Development IDs)

|  ID   | Title                            | Priority | MVP? |
| ----- | -------------------------------- | -------- | ---- |
|  F-01 | Create & start Task Timer        | P0       | ✅    |
|  F-02 | Randomised Pause Timer range     | P0       | ✅    |
|  F-03 | Break Timer with static duration | P0       | ✅    |
|  F-04 | Pause/Resume all timers + UI     | P0       | ✅    |
|  F-05 | Name Task & set Focus note       | P0       | ✅    |
|  F-06 | End-of-task feedback prompt      | P1       | ➖    |
|  F-07 | Sound effects for transitions    | P1       | ➖    |
|  F-08 | Toggle show/hide Pause Timer     | P1       | ➖    |
|  F-09 | Preset templates                 | P2       | ➖    |
|  F-10 | Session history saved to JSON    | P1       | ➖    |
|  F-11 | Cloud backup & JWT auth          | P2       | ➖    |
|  F-12 | Focus message AI API             | P3       | ➖    |
|  F-13 | Guided audio break (TTS)         | P4       | ➖    |

> **Legend:** P0 = must-have, P1 = important, P2 = nice-to-have, P3 = stretch, P4 = future research.

Each feature will have its own markdown spec: `f-01-task-timer.md`, `f-02-pause-timer.md`, …

## 3 Technical Architecture

### 3.1 Frontend

- **Framework:** **Next.js 14** with the `app/` router for file-based routing.
- **Language:** TypeScript 5.x.
- **State management:** React Context + *zustand* for lightweight stores.
- **Styling:** Tailwind CSS ("dark" theme class) + shadcn/ui components.
- **PWA:** next-pwa plugin → service-worker with precache / runtime caching for offline.
- **UI Components:** Custom-built timer display and controls using React and Tailwind (implemented in F-04).

### 3.2 Backend / Edge

- **Platform:** Cloudflare Workers (Edge Functions) – ultra-low cold-start.
- **Auth:** JWT (access/refresh).  Initial local-only mode will stub this out.
- **Data:**
  - MVP ⇒ *IndexedDB* (via *Dexie.js*) for offline-first session storage.
  - Post-MVP ⇒ Cloudflare D1 SQLite for backup ↔︎ Workers KV for document blobs.

### 3.3 Build & Tooling

- **Runtime:** **bun** – fast dev server & test runner.
- **Testing:** Vitest + React Testing Library (unit), Cypress (e2e).
- **CI/CD:** GitHub Actions → push → lint, test, build, deploy to Cloudflare Pages.
- **Lint/Format:** ESLint (Airbnb TS), Prettier, commitlint + semantic-release.

### 3.4 PWA Features

| Capability                 | How                                                        |
| -------------------------- | ---------------------------------------------------------- |
| Offline UX                 | Service Worker precaches shell, IndexedDB queues mutations |
| Push / Local notifications | Web Push API + Notifications API                           |
| Installability             | `manifest.webmanifest` w/ icons, theme-color               |

### 3.5 Justification & Risks

| Choice             | Pros                              | Cons / Mitigation                                        |
| ------------------ | --------------------------------- | -------------------------------------------------------- |
| Next.js 14         | Built-in routing, React ecosystem | Slightly heavier than Vite – acceptable                  |
| Cloudflare Workers | Global edge, generous free tier   | 10 ms CPU limit – heavy AI calls proxied to external API |
| IndexedDB first    | No signup required                | Need migration later – use repository pattern            |
| JWT                | Standard                          | Secure storage – use HTTP-only cookies when available    |

If any of these choices prove unsuitable, update **issues.md** and prepare RFC.

## 4 Folder & File Structure (initial)

```text
focus-loop/
  ├─ .gitignore
  ├─ README.md
  ├─ package.json
  ├─ package-lock.json
  ├─ docs/
  │    ├─ mastersolutiondesign.md  ← **you are here**
  │    ├─ projectplan.md
  │    ├─ rules.xml
  │    ├─ issues.md
  │    └─ features/
  │         ├─ f-01-task-timer.md
  │         ├─ f-02-pause-timer.md
  │         ├─ f-03-break-timer.md
  │         ├─ f-04-pause-resume.md
  │         ├─ f-05-task-metadata.md
  │         ├─ f-06-feedback-prompt.md
  │         ├─ f-07-sound-effects.md
  │         ├─ f-08-pause-visibility-toggle.md
  │         ├─ f-09-presets.md
  │         ├─ f-10-session-history.md
  │         ├─ f-11-cloud-backup-auth.md
  │         ├─ f-12-focus-ai-messages.md
  │         ├─ f-13-guided-audio.md
  │         └─ timer-ui.md
  ├─ apps/
  │    └─ web/
  │         ├─ .gitignore
  │         ├─ package.json
  │         ├─ package-lock.json
  │         ├─ tsconfig.json
  │         ├─ next.config.ts
  │         ├─ vitest.config.ts
  │         ├─ vitest.setup.ts
  │         ├─ eslint.config.mjs
  │         ├─ next-env.d.ts
  │         ├─ public/
  │         └─ src/
  │              ├─ app/
  │              └─ components/
  │                   ├─ TimerDisplay.tsx
  │                   ├─ TimerControls.tsx
  │                   └─ TimerContainer.tsx
  ├─ packages/
  │    ├─ core-timers/
  │    └─ ui-components/
  ├─ cf-workers/
  └─ tests/
```

## 5 Coding Conventions

1. **Feature-Driven Development (FDD):** Each branch = `feature/F-xx-slug`.  Merge via PR after tests green.
2. **Test-Driven Development (TDD):** Red → Green → Refactor; minimum 80 % coverage.
3. **Commits:** Conventional Commits (`feat:`, `fix:`, `docs:` …) + reference F-ID.
4. **Docs:** Update corresponding `docs/features/f-xx-*.md` on every change (Who + When + AI model).
5. **Error Handling:** Throw typed Errors in `core-timers`, surface toast in UI; recurrent issues logged to `issues.md`.
6. **Accessibility:** WCAG 2.2 AA, prefers-reduced-motion respected.

## 6 MVP Scope

> Sprint 0 → 4 weeks

### Functional

- F-01 to F-05 inclusive.

### Non-Functional

- Offline PWA, responsive layout, basic IndexedDB persistence.
- Unit + e2e tests for core timer logic & happy path UX.

### Exclusions

- Cloud sync, audio guidance, AI focus messages – stub only.

## 7 Testing Strategy

| Level       | Tool         | Target                                             |
| ----------- | ------------ | -------------------------------------------------- |
| Unit        | Vitest       | `core-timers` functions (timer loop, random range) |
| Component   | RTL          | Timer widgets, forms                               |
| Integration | Vitest + msw | API proxy calls                                    |
| E2E         | Cypress      | User creates session, timers run, pause/resume     |

CI fails build if any test fails or coverage < 80 %.

## 8 Deployment Pipeline

1. **PR merged →** GitHub Actions 🡒 lint + test.
2. `main` branch build → Cloudflare Pages preview.
3. Tag vX.Y.Z → semantic-release publishes & deploys production.

## 9 Security & Privacy

- No personal data beyond optional task notes.
- JWT stored in Secure HTTP-Only cookie when online.
- CSP headers via next-secure-headers.

## 10 Next Documents to Create

| File             | Purpose                                                     |
| ---------------- | ----------------------------------------------------------- |
| `rules.xml`      | Canonical rules reference for all contributors & AIs        |
| `projectplan.md` | Day-by-day roadmap (Gantt-like table)                       |
| `issues.md`      | Living log of risks, bugs, blockers                         |
| `features/*.md`  | One per feature with definition, progress, dependency graph |

> **Action:** After this master doc is accepted, generate the above docs with initial placeholders.

## 11 . gitignore (root)

```gitignore
# Node/Bun
node_modules
bun.lockb
# Next.js
.next
out
# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
# Tests
coverage

# OS
.DS_Store
Thumbs.db
# Env
.env*
```

## 12 Limitations & Open Questions

- **Database choice:** will switch to Cloudflare D1 or Turso; decision tracked in `issues.md`.
- **Push notifications on iOS Safari:** limited background execution; test early.
- **Authoring AIs:** hand-offs between o3, Claude 3.7, o4-mini must follow commit template.
- **Knowledge Gaps:** The human stakeholder self-reports no coding experience → docs will include beginner-friendly setup notes.

---

### Appendix A – Timer Algorithm Sketch (pseudo-code)

```ts
while (taskRemaining > 0) {
  const pause = random(minPause, maxPause);
  startCountdown(pause, onPauseEnd);
  await wait(pause);
  startCountdown(breakDuration, onBreakEnd, {type: 'BREAK'});
  await wait(breakDuration);
}
```

---

*End of Master Solution Design v0.1*

*Last updated 3 May 2025 by Claude 3.7*

## UI Components

### Timer UI Components (F-04)
The timer UI components provide a complete interface for users to interact with the different timer types. These include:

- **TimerDisplay**: Shows remaining time in MM:SS format
- **TimerControls**: Provides Start/Pause/Resume/Reset buttons based on timer state
- **TimerContainer**: Integrates the timer logic with the UI components

*Updated on 4 May 2025 (Claude 3.7): Added accessibility features including ARIA attributes, semantic HTML, focus states, and keyboard navigation. Status information and title display were also added to improve the user experience.* 