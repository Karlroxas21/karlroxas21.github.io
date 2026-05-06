# State

## Current Position

Phase: 1 — Chat Widget  
Plan: 02 of N (01-02 complete)
Status: In progress  
Last activity: 2026-05-06 — Plan 01-02 complete (ChatBot.tsx widget + chatDotPulse keyframe)

## Project Reference

See: .planning/PROJECT.md (updated 2026-05-06)

**Core value:** A living, high-craft portfolio that reflects Karl's taste and work  
**Current focus:** Phase 1 — Chat Widget

## Accumulated Context

- Site hosted on GitHub Pages (static). No server-side code possible.
- Gemini API key must be restricted by HTTP referrer in Google Cloud Console to mitigate exposure in JS bundle.
- Design system is editorial/monochrome — cream light bg (#f7f3ec), dark (#14110d), Fraunces + IBM Plex Mono fonts. Chat widget must match this aesthetic, NOT dark Ubuntu theme.
- No window manager or dock system exists. CHATBOT_PLAN.md references were outdated.
- Chat widget = fixed floating button (bottom-right) + slide-in/overlay panel. Local useState only. Native fetch for API calls.

## Decisions (01-01)

- Used `@google/genai` not `@google/generative-ai` — newer package for Gemini 2.0 API
- `PROFILE.tagline` and `ABOUT.lede` excluded from SYSTEM_PROMPT (ReactNode, not plain strings)
- Off-topic guard phrase: "I can only answer questions about Karl. Try asking about his experience, projects, or skills."
- `src/constants/` directory established for non-component shared exports

## Decisions (01-02)

- Panel always in DOM (not conditional render) — CSS transitions require element to persist in both open/close directions
- chatRef.current stores Gemini chat session in useRef for multi-turn conversation persistence
- handleSend accepts optional overrideText — enables chip clicks to send without input field typing
- headerCloseHover state added for × close button hover color transition (onMouseEnter/Leave pattern)
- Zero hardcoded hex values — all colors use var(--color-\*) CSS tokens

## Performance Metrics

| Phase | Plan | Duration | Tasks | Files |
| ----- | ---- | -------- | ----- | ----- |
| 01    | 01   | 2min     | 3     | 4     |
| 01    | 02   | 2min     | 2     | 2     |
