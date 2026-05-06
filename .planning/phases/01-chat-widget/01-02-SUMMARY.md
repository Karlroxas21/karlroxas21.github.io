---
phase: 01-chat-widget
plan: 02
subsystem: ui
tags: [react, gemini, google-genai, chat, accessibility, css-animations, tailwind]

# Dependency graph
requires:
    - phase: 01-01
      provides: '@google/genai SDK installed, SYSTEM_PROMPT export from src/constants/chatbot-context.ts'
provides:
    - 'src/components/ChatBot.tsx — complete floating chat widget covering CHAT-01 through CHAT-10'
    - '@keyframes chatDotPulse in src/index.css — staggered loading dot animation'
affects: [App.tsx consumer, any future chat feature additions]

# Tech tracking
tech-stack:
    added: []
    patterns:
        - 'Panel always in DOM — visibility via opacity+transform+pointer-events (not conditional rendering)'
        - 'Module-scope SDK init — ai const at file level, null-safe when key absent'
        - 'chatRef.current for chat session — useRef keeps multi-turn session persistent across renders'
        - 'CSS token-only styling — all colors via var(--color-*), zero hardcoded hex'
        - 'Inline SVG icons — no icon library imports, per UI-SPEC mandate'
        - 'headerCloseHover state for hover color on icon-only button (no CSS class needed)'

key-files:
    created:
        - src/components/ChatBot.tsx
    modified:
        - src/index.css

key-decisions:
    - 'Panel kept always in DOM (not conditional render) so CSS transitions work in both open and close directions'
    - 'chatRef.current initialized in useEffect on mount so chat session persists across user messages (multi-turn)'
    - 'handleSend accepts optional overrideText parameter — enables chip clicks to send without typing in input'
    - 'headerCloseHover boolean state used for hover color on close button (inline onMouseEnter/Leave)'
    - 'Right-arrow SVG used for send button (line + polyline) matching editorial aesthetic'

patterns-established:
    - 'ChatBot pattern: fixed-position self-contained component, no external state, local useState only'
    - 'AI bubble: bg=color-bg with hairline border, radius 8px 8px 8px 2px (chat tail bottom-left)'
    - 'User bubble: bg=color-fg with color-bg text (hard inversion), radius 8px 8px 2px 8px (chat tail bottom-right)'

requirements-completed: [CHAT-01, CHAT-02, CHAT-03, CHAT-04, CHAT-05, CHAT-06, CHAT-07, CHAT-08, CHAT-09, CHAT-10]

# Metrics
duration: 2min
completed: 2026-05-06
---

# Phase 1 Plan 02: Chat Widget Component Summary

**Self-contained floating chat widget with Gemini 2.0 Flash integration — animated panel, chip prompts, multi-turn AI, and full WCAG accessibility via CSS token-only styling**

## Performance

- **Duration:** ~2 min
- **Started:** 2026-05-06T02:19:59Z
- **Completed:** 2026-05-06T02:22:00Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments

- Added `@keyframes chatDotPulse` to `src/index.css` for staggered 3-dot loading animation (scale 0.6→1→0.6, 800ms, three delays: 0/150/300ms)
- Built complete `src/components/ChatBot.tsx` — floating button, animated slide-up panel, chip prompts, message bubbles, Gemini 2.0 Flash multi-turn chat, loading/error states
- Covered all 10 CHAT requirements (CHAT-01 through CHAT-10) in a single self-contained component with zero hardcoded hex values and full accessibility attributes

## Task Commits

Each task was committed atomically:

1. **Task 1: Add @keyframes chatDotPulse to src/index.css** - `04ae4ce` (feat)
2. **Task 2: Build src/components/ChatBot.tsx — complete widget** - `614b76e` (feat)

## Files Created/Modified

- `src/components/ChatBot.tsx` - Complete floating chat widget: button, animated panel, chips, bubbles, Gemini API integration
- `src/index.css` - Added `@keyframes chatDotPulse` (loading dot animation) in Animations section

## Decisions Made

- Panel is always in DOM — visibility controlled by `opacity`, `transform`, and `pointer-events` (not `{isOpen && <Panel />}`) so CSS transitions work in both open and close directions
- `chatRef.current` stores the chat session in a `useRef` so multi-turn conversation context persists across re-renders without triggering re-initialization
- `handleSend` accepts an optional `overrideText` parameter so chip buttons can submit without requiring the user to type in the input field first
- `headerCloseHover` boolean state was added (not in plan spec) to enable the × close button's `var(--color-fg-3)` → `var(--color-fg)` hover transition via `onMouseEnter`/`onMouseLeave` — the plan referenced this pattern but left implementation approach open

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Added `border: 'none'` to button elements**

- **Found during:** Task 2 (ChatBot.tsx build)
- **Issue:** Header close button and send button had no explicit `border: none` — browsers add default borders to `<button>` elements
- **Fix:** Added `border: 'none'` to both button inline styles to prevent unexpected rendering
- **Files modified:** src/components/ChatBot.tsx
- **Verification:** TypeScript compiles clean, no hardcoded hex check passes
- **Committed in:** 614b76e (Task 2 commit)

**2. [Rule 2 - Missing Critical] Added `background: 'transparent'` to header close button**

- **Found during:** Task 2 (ChatBot.tsx build)
- **Issue:** Header close button needed explicit transparent background to prevent browser default button styling
- **Fix:** Added `background: 'transparent'` to header close button inline style
- **Files modified:** src/components/ChatBot.tsx
- **Verification:** Matches editorial aesthetic, no white box appears around close button
- **Committed in:** 614b76e (Task 2 commit)

---

**Total deviations:** 2 auto-fixed (both Rule 2 - missing critical browser default resets)
**Impact on plan:** Both necessary for correct visual rendering. No scope creep.

## Issues Encountered

None — plan executed without blocking issues. TypeScript compiled cleanly on first attempt.

## User Setup Required

`VITE_GEMINI_API_KEY` must be set in `.env.local` for the chat integration to work. Without the key, `ai` is `null` and `chatRef.current` remains uninitialized — clicking send has no effect. The component handles this gracefully (guard in `handleSend`: `if (!chatRef.current) return`).

## Next Phase Readiness

- `ChatBot.tsx` is complete and ready to mount in `App.tsx` (or wherever the host component lives)
- Component exports `default ChatBot` — add `<ChatBot />` to the root render tree to activate
- All 10 CHAT requirements covered — Phase 1 chat widget is feature-complete

---

## Self-Check: PASSED

- `src/components/ChatBot.tsx` — FOUND
- `src/index.css` — FOUND
- Commit `04ae4ce` — FOUND
- Commit `614b76e` — FOUND
- `npx tsc --noEmit` — PASS (zero errors)
- Zero hardcoded hex in ChatBot.tsx — PASS
- All four chip labels present — PASS
- `role="dialog"`, `aria-modal="true"`, `aria-live="polite"` — PASS

---

_Phase: 01-chat-widget_
_Completed: 2026-05-06_
