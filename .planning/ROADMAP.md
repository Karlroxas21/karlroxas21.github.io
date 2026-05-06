# Roadmap: v1.1 — AI Chatbot

**Milestone:** v1.1  
**Phases:** 2  
**Requirements:** 12 mapped, 12 total ✓

| #   | Phase            | Goal                                                 | Requirements | Success Criteria |
| --- | ---------------- | ---------------------------------------------------- | ------------ | ---------------- |
| 1   | Chat Widget      | Build the full chatbot UI and Gemini API integration | CHAT-01–10   | 5                |
| 2   | Deployment Setup | Wire API key through env vars and GitHub Actions     | CHAT-11–12   | 2                |

---

## Phase 1: Chat Widget

**Goal:** Implement the floating chat button, panel UI, and Gemini API integration following the existing editorial design system.

**Requirements:** CHAT-01, CHAT-02, CHAT-03, CHAT-04, CHAT-05, CHAT-06, CHAT-07, CHAT-08, CHAT-09, CHAT-10

**Files to create:**

- `src/components/ChatBot.tsx` — floating button + chat panel component
- `src/constants/chatbot-context.ts` — system prompt with Karl's resume data

**Files to modify:**

- `src/App.tsx` — import and render `<ChatBot />`
- `.env.example` — document `VITE_GEMINI_API_KEY`

**Success criteria:**

1. Floating chat button visible on portfolio page; clicking opens chat panel
2. Visitor types question, submits, sees AI response grounded in Karl's resume data
3. Multi-turn conversation: follow-up questions use prior context
4. Suggested prompt chips appear on open; clicking one pre-fills and sends
5. Loading indicator shows while API call is in-flight; error message shows on failure

---

## Phase 2: Deployment Setup

**Goal:** Ensure the API key flows correctly through Vite env vars and GitHub Actions so production build works.

**Requirements:** CHAT-11, CHAT-12

**Files to modify:**

- `.github/workflows/deploy.yml` (or equivalent) — pass `VITE_GEMINI_API_KEY` from repo secret

**Success criteria:**

1. Production build inlines the API key from GitHub Actions secret; chatbot works on deployed site
2. `.env` is gitignored; API key never appears in source history

---

_Roadmap created: 2026-05-06_
