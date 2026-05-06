# State

## Current Position

Phase: 1 — Chat Widget  
Plan: Not yet planned  
Status: Ready to plan  
Last activity: 2026-05-06 — Milestone v1.1 started

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
