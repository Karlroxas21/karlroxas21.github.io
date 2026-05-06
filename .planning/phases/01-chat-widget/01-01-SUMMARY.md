---
phase: 01-chat-widget
plan: 01
subsystem: ui
tags: [gemini, google-genai, chatbot, system-prompt, env]

# Dependency graph
requires: []
provides:
    - '@google/genai SDK installed and available for import'
    - 'VITE_GEMINI_API_KEY documented in .env.example'
    - "SYSTEM_PROMPT constant grounding chatbot in Karl's resume data"
affects: [01-chat-widget]

# Tech tracking
tech-stack:
    added: ['@google/genai ^1.52.0']
    patterns: ['system prompt as exported TS constant', 'plain-string-only data extraction from JSX data file']

key-files:
    created:
        - src/constants/chatbot-context.ts
        - .env.example
    modified:
        - package.json
        - package-lock.json

key-decisions:
    - 'Used @google/genai (not deprecated @google/generative-ai) — official SDK for Gemini 2.0'
    - 'SYSTEM_PROMPT imports only plain-string fields from data.tsx — PROFILE.tagline and ABOUT.lede excluded as ReactNode'
    - "Off-topic guard phrase locked: 'I can only answer questions about Karl. Try asking about his experience, projects, or skills.'"

patterns-established:
    - 'Pattern 1: src/constants/ directory for shared non-component exports'
    - 'Pattern 2: Template literal system prompt referencing data.tsx constants directly'

requirements-completed: [CHAT-02, CHAT-03, CHAT-04]

# Metrics
duration: 2min
completed: 2026-05-06
---

# Phase 1 Plan 01: Gemini SDK + SYSTEM_PROMPT Summary

**@google/genai SDK installed and SYSTEM_PROMPT constant built from data.tsx resume data with off-topic rejection guard**

## Performance

- **Duration:** 2 min
- **Started:** 2026-05-06T02:16:16Z
- **Completed:** 2026-05-06T02:18:02Z
- **Tasks:** 3
- **Files modified:** 4

## Accomplishments

- Installed `@google/genai ^1.52.0` — the official Gemini SDK replacing deprecated `@google/generative-ai`
- Created `.env.example` documenting `VITE_GEMINI_API_KEY` alongside existing `VITE_G_ID` with setup instructions
- Created `src/constants/chatbot-context.ts` exporting `SYSTEM_PROMPT` covering profile, experience, projects, writing, now, and links sections — TypeScript clean

## Task Commits

Each task was committed atomically:

1. **Task 1: Install @google/genai SDK** - `2bc5cdb` (chore)
2. **Task 2: Create .env.example with VITE_GEMINI_API_KEY** - `1a57355` (chore)
3. **Task 3: Create src/constants/chatbot-context.ts with SYSTEM_PROMPT** - `47a12ea` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified

- `package.json` - Added `@google/genai ^1.52.0` to dependencies
- `package-lock.json` - Lockfile updated with 37 new packages
- `.env.example` - Documents VITE_G_ID and VITE_GEMINI_API_KEY with comments
- `src/constants/chatbot-context.ts` - Exports SYSTEM_PROMPT constant built from data.tsx

## Decisions Made

- Used `@google/genai` not `@google/generative-ai` — the newer package replaces the deprecated one for Gemini 2.0 API
- Excluded `PROFILE.tagline` and `ABOUT.lede` from SYSTEM_PROMPT — both are ReactNode (JSX with `<em>` tags), incompatible with template strings
- Used `PROFILE.sub` as the personality/about text — plain string describing Karl's focus
- Off-topic guard phrase matches CONTEXT.md locked decision exactly

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None. Prettier reformatted arrow function parameters in template literal callbacks (added/removed parentheses) via lint-staged — expected behavior, no functional change.

## User Setup Required

**VITE_GEMINI_API_KEY must be added to `.env` before the chatbot will function.**

1. Get API key from https://aistudio.google.com/app/apikey
2. Add `VITE_GEMINI_API_KEY=your_key_here` to your `.env` file
3. In Google Cloud Console, restrict the key by HTTP Referrer to limit exposure in the JS bundle

## Next Phase Readiness

- `SYSTEM_PROMPT` is ready for import into `ChatBot.tsx` in Plan 02
- `@google/genai` SDK importable from any `src/` file
- TypeScript clean — `npx tsc --noEmit` passes with zero errors

---

_Phase: 01-chat-widget_
_Completed: 2026-05-06_
