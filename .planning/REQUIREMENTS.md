# Requirements: Personal Website v2 — v1.1 AI Chatbot

**Defined:** 2026-05-06  
**Core Value:** A living, high-craft portfolio that reflects Karl's taste and work

## v1.1 Requirements

### Chatbot Widget

- [x] **CHAT-01**: Visitor can open a chat panel via a fixed floating button on the portfolio
- [x] **CHAT-02**: Visitor can type a question and receive a response about Karl from Gemini AI
- [x] **CHAT-03**: Bot response is grounded in Karl's actual resume data (experience, skills, projects, posts)
- [x] **CHAT-04**: Conversation history is maintained within the session (multi-turn context)
- [x] **CHAT-05**: Chat panel displays a welcome message and suggested prompt chips on open
- [x] **CHAT-06**: Visitor can close the chat panel
- [x] **CHAT-07**: Loading state is shown while awaiting API response
- [x] **CHAT-08**: Friendly error message shown if API call fails
- [x] **CHAT-09**: Input is cleared after sending; cannot send empty messages
- [x] **CHAT-10**: Chat widget follows the existing editorial monochrome design system
- [ ] **CHAT-11**: API key is loaded via VITE_GEMINI_API_KEY env var (not hardcoded)
- [ ] **CHAT-12**: GitHub Actions build passes VITE_GEMINI_API_KEY secret to Vite build step

## Out of Scope

| Feature                                   | Reason                                                                    |
| ----------------------------------------- | ------------------------------------------------------------------------- |
| Server-side API proxy                     | GitHub Pages is static-only                                               |
| Streaming responses                       | Adds complexity; non-streaming is sufficient for MVP                      |
| Persistent chat history (across sessions) | No server; localStorage adds marginal value                               |
| Mobile-optimized chat panel               | Site has ScreenGuard for mobile; desktop-only acceptable for v1.1         |
| Rate limiting UI                          | Free tier (15 RPM) is natural ceiling; client-side throttle is sufficient |

## Traceability

| Requirement | Phase   | Status   |
| ----------- | ------- | -------- |
| CHAT-01     | Phase 1 | Complete |
| CHAT-02     | Phase 1 | Complete |
| CHAT-03     | Phase 1 | Complete |
| CHAT-04     | Phase 1 | Complete |
| CHAT-05     | Phase 1 | Complete |
| CHAT-06     | Phase 1 | Complete |
| CHAT-07     | Phase 1 | Complete |
| CHAT-08     | Phase 1 | Complete |
| CHAT-09     | Phase 1 | Complete |
| CHAT-10     | Phase 1 | Complete |
| CHAT-11     | Phase 2 | Pending  |
| CHAT-12     | Phase 2 | Pending  |

**Coverage:**

- v1.1 requirements: 12 total
- Mapped to phases: 12
- Unmapped: 0 ✓

---

_Requirements defined: 2026-05-06_
_Last updated: 2026-05-06 after initial definition_
