# Phase 1: Chat Widget - Context

**Gathered:** 2026-05-06
**Status:** Ready for planning

<domain>
## Phase Boundary

Implement a floating chat button and panel that lets visitors ask questions about Karl. Responses are powered by Gemini API, grounded in Karl's actual resume data from `src/components/data.tsx`. Conversation history is session-only (no persistence). This phase covers CHAT-01 through CHAT-10 only — env var and CI setup (CHAT-11, CHAT-12) are Phase 2.

</domain>

<decisions>
## Implementation Decisions

### Prompt guard

- System prompt MUST restrict Gemini to Karl's portfolio/personal information ONLY
- Off-topic questions (coding help, general knowledge, anything unrelated to Karl) get a polite rejection: something like "I can only answer questions about Karl. Try asking about his experience, projects, or skills."
- Guard is implemented in the system prompt string in `src/constants/chatbot-context.ts`, not in client-side filtering

### Button appearance

- Icon-only chat bubble (no label text)
- Medium circle: 56-64px diameter
- Color: `--color-fg` background, `--color-bg` icon — adapts automatically to dark/light theme toggle
- Fixed position: bottom-right, e.g., `bottom-6 right-6`
- Transitions to close (×) icon when panel is open

### Panel style & layout

- Position: bottom-right anchored, opens above the button
- Dimensions: ~380px wide, ~560px tall (fixed, not resizable)
- Animation: slides up from button on open, slides down on close (CSS transform + transition)
- Message layout: chat bubbles — user messages right-aligned with `--color-fg` bg, AI messages left-aligned with subtle border or muted bg
- Panel has a header row (title "Ask Karl" or similar + close button) and a footer with the text input + send button

### Suggested prompt chips

- Appear only on initial open, before any message is sent — disappear after user sends first message
- Conversational set (4 chips):
    - "Who are you?"
    - "What do you build?"
    - "What are you working on?"
    - "How can I reach you?"
- Visual style: pill buttons with border, IBM Plex Mono font, small text size — matches site's mono label aesthetic
- Clicking a chip pre-fills AND immediately sends the message (no extra submit needed)

### Message rendering

- Plain text only — no markdown parsing, no new deps
- No timestamps on messages
- Loading indicator: animated pulsing dots (3 dots) inside an AI message bubble while awaiting response (CHAT-07)
- Error message: displayed as an AI message bubble with friendly copy, e.g., "Something went wrong. Try again." (CHAT-08)

### Input behavior

- Input cleared after send (CHAT-09)
- Send button and Enter key both submit
- Empty messages blocked — send button disabled / Enter ignored when input is empty (CHAT-09)
- Input disabled while loading (prevents double-send)

### Claude's Discretion

- Exact padding, border-radius, and shadow on the panel
- Exact icon used for the chat button (any standard chat bubble SVG)
- Welcome message copy in the panel header area
- Scroll behavior when messages overflow (auto-scroll to bottom on new message)

</decisions>

<canonical_refs>

## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Resume data (system prompt source)

- `src/components/data.tsx` — All of Karl's portfolio data: PROFILE, ABOUT, PROJECTS, POSTS, EXPERIENCE, NOW_ITEMS, LINKS. The chatbot system prompt must be built from this file's exported constants.

### Design system

- `src/index.css` — All CSS custom properties: `--color-bg`, `--color-fg`, `--color-fg-2`, `--color-fg-3`, `--color-hairline`, font stacks (`--font-mono`, `--font-display`). Chat component MUST use these tokens, not hardcoded hex values.

### Requirements

- `.planning/REQUIREMENTS.md` — CHAT-01 through CHAT-10 acceptance criteria (Phase 1 scope)

### Integration point

- `src/App.tsx` — Where `<ChatBot />` will be imported and rendered (alongside `<Cursor />` at the top level, outside `<main>`)

### Env var pattern

- `src/App.tsx` line 16: `import.meta.env.VITE_G_ID` — follow this exact pattern for `VITE_GEMINI_API_KEY`

</canonical_refs>

<code_context>

## Existing Code Insights

### Reusable Assets

- `src/components/data.tsx`: exports PROFILE, ABOUT, PROJECTS, POSTS, EXPERIENCE, NOW_ITEMS — import these directly into `src/constants/chatbot-context.ts` to build the system prompt string
- `src/providers/theme-context.tsx`: `useTheme()` hook available if chat component needs to react to theme changes (though using CSS vars should be sufficient)
- `src/hooks/use-analytics.tsx`: `trackEvent()` available to fire GA events on chat interactions if desired

### Established Patterns

- Tailwind CSS v4 utility classes + `var(--color-*)` CSS custom properties for all colors — no hardcoded hex in component files
- Components are self-contained `.tsx` files in `src/components/`
- `import.meta.env.VITE_*` for env vars (see App.tsx pattern)
- `useState` only for state — no state management library

### Integration Points

- `src/App.tsx`: render `<ChatBot />` as a sibling of `<Cursor />` — both are fixed-position UI elements that sit outside `<main>`
- `src/constants/` (new dir): create `chatbot-context.ts` here for the system prompt constant

</code_context>

<specifics>
## Specific Ideas

- System prompt approach: import data constants from `data.tsx` and interpolate into a template string — keeps resume data as single source of truth
- Panel should feel like a lightweight overlay, not a full modal — no backdrop/overlay scrim needed

</specifics>

<deferred>
## Deferred Ideas

- None — discussion stayed within phase scope

</deferred>

---

_Phase: 01-chat-widget_
_Context gathered: 2026-05-06_
