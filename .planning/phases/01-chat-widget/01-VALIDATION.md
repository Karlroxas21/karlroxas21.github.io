---
phase: 1
slug: chat-widget
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-05-06
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property               | Value            |
| ---------------------- | ---------------- |
| **Framework**          | vitest           |
| **Config file**        | vite.config.ts   |
| **Quick run command**  | `npx vitest run` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime**  | ~5 seconds       |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run`
- **After every plan wave:** Run `npx vitest run`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status     |
| ------- | ---- | ---- | ----------- | --------- | ----------------- | ----------- | ---------- |
| 1-01-01 | 01   | 1    | CHAT-01     | unit      | `npx vitest run`  | ❌ W0       | ⬜ pending |
| 1-01-02 | 01   | 1    | CHAT-02     | unit      | `npx vitest run`  | ❌ W0       | ⬜ pending |
| 1-01-03 | 01   | 1    | CHAT-03     | unit      | `npx vitest run`  | ❌ W0       | ⬜ pending |
| 1-01-04 | 01   | 1    | CHAT-04     | unit      | `npx vitest run`  | ❌ W0       | ⬜ pending |
| 1-01-05 | 01   | 1    | CHAT-05     | unit      | `npx vitest run`  | ❌ W0       | ⬜ pending |
| 1-01-06 | 01   | 1    | CHAT-06     | unit      | `npx vitest run`  | ❌ W0       | ⬜ pending |
| 1-01-07 | 01   | 1    | CHAT-07     | unit      | `npx vitest run`  | ❌ W0       | ⬜ pending |
| 1-01-08 | 01   | 1    | CHAT-08     | unit      | `npx vitest run`  | ❌ W0       | ⬜ pending |
| 1-01-09 | 01   | 1    | CHAT-09     | unit      | `npx vitest run`  | ❌ W0       | ⬜ pending |
| 1-01-10 | 01   | 1    | CHAT-10     | unit      | `npx vitest run`  | ❌ W0       | ⬜ pending |

_Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky_

---

## Wave 0 Requirements

- [ ] `src/components/__tests__/ChatBot.test.tsx` — stubs for CHAT-01 through CHAT-10
- [ ] Vitest already in devDependencies — no install needed

_If none: "Existing infrastructure covers all phase requirements."_

---

## Manual-Only Verifications

| Behavior                          | Requirement | Why Manual                       | Test Instructions                                               |
| --------------------------------- | ----------- | -------------------------------- | --------------------------------------------------------------- |
| Floating button visible on page   | CHAT-01     | Visual presence requires browser | Open app, confirm chat button fixed bottom-right                |
| Chat panel opens/closes on click  | CHAT-02     | DOM animation requires browser   | Click button, confirm panel slides up                           |
| AI response grounded in resume    | CHAT-06     | LLM output quality check         | Ask "What is Karl's job title?", verify answer uses resume data |
| Chips pre-fill and send on click  | CHAT-05     | Interaction requires browser     | Open panel, click chip, verify message sent                     |
| Loading indicator during API call | CHAT-07     | Timing requires browser          | Submit message, verify 3-dot animation appears                  |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 10s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
