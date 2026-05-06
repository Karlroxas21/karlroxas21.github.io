# Phase 1: Chat Widget — Research

**Researched:** 2026-05-06
**Domain:** Gemini API integration + React floating chat UI
**Confidence:** HIGH

---

<user_constraints>

## User Constraints (from CONTEXT.md)

### Locked Decisions

**Prompt guard:** System prompt restricts Gemini to Karl's portfolio/personal info only. Off-topic → polite rejection: "I can only answer questions about Karl. Try asking about his experience, projects, or skills." Guard lives in system prompt string in `src/constants/chatbot-context.ts`, not client-side filtering.

**Button appearance:** Icon-only chat bubble, 56–64px circle, `--color-fg` background with `--color-bg` icon, fixed `bottom-6 right-6`, swaps to × when panel open.

**Panel style & layout:** Fixed 380px wide × 560px tall, bottom-right anchored above button, slides up from button on open / slides down on close (CSS transform + transition), user messages right-aligned (`--color-fg` bg), AI messages left-aligned (subtle border or muted bg), header row "Ask Karl" + close button, footer with text input + send button.

**Suggested prompt chips:** Appear only on initial open before any message is sent, then disappear. Four chips: "Who are you?", "What do you build?", "What are you working on?", "How can I reach you?". Pill buttons with border, IBM Plex Mono, small text. Clicking pre-fills AND immediately sends (no extra submit).

**Message rendering:** Plain text only — no markdown parsing, no new deps. No timestamps. Loading: animated pulsing 3 dots inside AI bubble. Error: AI message bubble "Something went wrong. Try again."

**Input behavior:** Cleared after send, send + Enter both submit, empty messages blocked (send disabled / Enter ignored), input disabled while loading.

### Claude's Discretion

- Exact padding, border-radius, shadow on the panel
- Exact icon used for the chat button (any standard chat bubble SVG)
- Welcome message copy in the panel header area
- Scroll behavior when messages overflow (auto-scroll to bottom on new message)

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>

## Phase Requirements

| ID      | Description                                                  | Research Support                                                                     |
| ------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| CHAT-01 | Visitor can open a chat panel via a fixed floating button    | Button component with fixed positioning + useState(isOpen)                           |
| CHAT-02 | Visitor can type a question and receive a Gemini AI response | `@google/genai` SDK `ai.chats.sendMessage()` call                                    |
| CHAT-03 | Bot response grounded in Karl's actual resume data           | System prompt built from `src/components/data.tsx` constants                         |
| CHAT-04 | Conversation history maintained within session (multi-turn)  | `ai.chats.create()` with history array; SDK manages state                            |
| CHAT-05 | Welcome message and suggested prompt chips on open           | Chip set rendered when `messages.length === 0`, hidden after first send              |
| CHAT-06 | Visitor can close the chat panel                             | × button in header + toggle on floating button                                       |
| CHAT-07 | Loading state shown while awaiting API response              | `isLoading` state → pulsing-dot bubble in message list                               |
| CHAT-08 | Friendly error message on API failure                        | `try/catch` around `sendMessage()` → push error bubble to messages array             |
| CHAT-09 | Input cleared after send; cannot send empty messages         | `setValue('')` after send; `disabled={!value.trim() \|\| isLoading}`                 |
| CHAT-10 | Chat widget follows editorial monochrome design system       | All colors via `var(--color-*)` tokens, fonts via `var(--font-*)` — no hardcoded hex |

</phase_requirements>

---

## Summary

This phase builds a self-contained React component (`ChatBot.tsx`) with two concerns: a floating UI widget and a Gemini API client. The UI is a fixed-position button + slide-in panel; state is local `useState` only. The API layer uses the `@google/genai` SDK v1.x (the successor to `@google/generative-ai`) with `ai.chats` for multi-turn conversation management and a system instruction string for the prompt guard.

The project is already on React 19 + Tailwind v4, which removes the need for any additional animation or state library. The entire component can be written as one `.tsx` file with a handful of typed interfaces. The Gemini REST API is called from the browser with the key exposed in the JS bundle — this is acceptable because the site is GitHub Pages (static-only, no server proxy possible), and the key is restricted by HTTP referrer in Google Cloud Console per STATE.md.

**Primary recommendation:** Install `@google/genai`, initialize `GoogleGenAI` with `import.meta.env.VITE_GEMINI_API_KEY`, use `ai.chats.create()` with `config.systemInstruction` set to the constant from `chatbot-context.ts`, and `chat.sendMessage()` per user turn. Build UI entirely with existing CSS tokens and Tailwind v4 utilities — no new UI dependencies needed.

---

## Standard Stack

### Core

| Library                        | Version                  | Purpose                                                    | Why Standard                                                                                                                |
| ------------------------------ | ------------------------ | ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `@google/genai`                | ^1.0.0 (current: 1.52.0) | Gemini API client: multi-turn chat, system instructions    | Official Google SDK replacing deprecated `@google/generative-ai`; handles conversation history automatically via `ai.chats` |
| React 19 + useState            | already installed        | Local component state (isOpen, messages, value, isLoading) | Already in project; no state management lib needed per CONTEXT.md                                                           |
| Tailwind v4 + CSS custom props | already installed        | All layout, spacing, animation utilities                   | Already in project; `@theme` tokens already define all colors and fonts                                                     |

### Supporting

| Library                               | Version                      | Purpose                         | When to Use                                                                  |
| ------------------------------------- | ---------------------------- | ------------------------------- | ---------------------------------------------------------------------------- |
| `lucide-react`                        | already installed (^0.562.0) | Chat bubble + close SVG icons   | Already a dependency — use over hand-rolled inline SVGs for maintainability  |
| `import.meta.env.VITE_GEMINI_API_KEY` | Vite built-in                | API key injection at build time | Required pattern per CONTEXT.md canonical refs (see App.tsx line 16 pattern) |

### Alternatives Considered

| Instead of                       | Could Use                                             | Tradeoff                                                                                                                                 |
| -------------------------------- | ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `@google/genai` SDK              | Raw `fetch()` to REST endpoint                        | fetch works but requires manual conversation history serialization on every turn; SDK handles this automatically — no reason to avoid it |
| `ai.chats` object                | Manual contents array + `ai.models.generateContent()` | Manual is more code with no benefit; `ai.chats` maintains history internally                                                             |
| CSS transform animation (custom) | Framer Motion / AnimatePresence                       | Framer Motion is already an optional dep in ecosystem but not in this project; CSS transform is sufficient for a 220ms slide             |
| `lucide-react` icons             | Inline SVG strings                                    | Inline SVG is slightly smaller but lucide-react is already installed — prefer the import                                                 |

**Installation:**

```bash
npm install @google/genai
```

---

## Architecture Patterns

### Recommended Project Structure

```
src/
├── components/
│   └── ChatBot.tsx         # Floating button + panel + message list (all in one component)
├── constants/
│   └── chatbot-context.ts  # SYSTEM_PROMPT constant (new directory)
└── App.tsx                 # Add <ChatBot /> sibling of <Cursor />
```

### Pattern 1: Single-Component Widget

**What:** `ChatBot.tsx` contains the floating button, the panel, the message list, chips, input, and all API logic. No sub-components needed.

**When to use:** The component is small enough (< 200 lines), self-contained, and will not be reused elsewhere. Matches the existing `Cursor.tsx` pattern.

```typescript
// ChatBot.tsx skeleton — mirrors Cursor.tsx pattern
import { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { SYSTEM_PROMPT } from '../constants/chatbot-context';

type Message = { role: 'user' | 'model'; text: string };

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [value, setValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatRef = useRef<ReturnType<GoogleGenAI['chats']['create']> | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // ... implementation
};

export default ChatBot;
```

### Pattern 2: Gemini Chat Session Initialization

**What:** Create the chat session once per panel open (or once on component mount) and store it in a `useRef`. Re-use the same session for all turns.

**When to use:** Any multi-turn Gemini chat — the SDK's `ai.chats.create()` object maintains history internally, so no manual history array management is needed.

```typescript
// Source: official Gemini API docs — ai.google.dev/gemini-api/docs/text-generation
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// Create once and reuse:
const chat = ai.chats.create({
    model: 'gemini-2.0-flash',
    config: {
        systemInstruction: SYSTEM_PROMPT,
    },
    history: [], // starts empty; SDK appends each turn automatically
});

// Per user turn:
const response = await chat.sendMessage({ message: userText });
const aiText = response.text;
```

### Pattern 3: System Prompt as Constant

**What:** Import data constants from `data.tsx` and interpolate into a template string in `chatbot-context.ts`. Single source of truth — resume data never duplicated.

**When to use:** Always. Keeps the system prompt automatically in sync with Karl's data.

```typescript
// src/constants/chatbot-context.ts
import { PROFILE, ABOUT, EXPERIENCE, PROJECTS, POSTS, NOW_ITEMS, LINKS } from '../components/data';

export const SYSTEM_PROMPT = `
You are an AI assistant for Karl Marx Roxas's personal portfolio website.
Your ONLY job is to answer questions about Karl based on the information below.
If a visitor asks anything unrelated to Karl (coding help, general knowledge, other people, etc.),
respond ONLY with: "I can only answer questions about Karl. Try asking about his experience, projects, or skills."
Do not provide any other information beyond what is listed here.

=== PROFILE ===
Name: ${PROFILE.name}
Role: ${PROFILE.role}
Location: ${PROFILE.location}
Status: ${PROFILE.status}
...

=== EXPERIENCE ===
${EXPERIENCE.map(e => `${e.years} — ${e.role} at ${e.company}\n${e.note}`).join('\n\n')}

=== PROJECTS ===
${PROJECTS.map(p => `${p.title}: ${p.desc}\nTags: ${p.tags.join(', ')}`).join('\n\n')}

=== WRITING ===
${POSTS.map(p => `"${p.title}" (${p.date}) — ${p.excerpt.slice(0, 100)}...`).join('\n\n')}

=== NOW ===
${NOW_ITEMS.map(n => `${n.k}: ${n.v}${n.note ? ` (${n.note})` : ''}`).join('\n')}

=== CONTACT ===
Email: ${PROFILE.email}
${LINKS.map(l => `${l.k}: ${l.v}`).join('\n')}
`.trim();
```

**Note:** `data.tsx` exports JSX for some fields (e.g., `PROFILE.tagline`, `ABOUT.lede`). These must be accessed as plain string alternatives or skipped — do not spread JSX nodes into the template string. Use the plain string fields (`PROFILE.name`, `PROFILE.role`, `PROFILE.status`, etc.) and the non-JSX array data.

### Pattern 4: Panel Slide Animation (CSS only)

**What:** CSS `transition` on `transform` + `opacity`. Controlled by `isOpen` state toggling a class or inline style.

**When to use:** Simple show/hide with a 220ms entrance — no Framer Motion needed.

```typescript
// Panel style — controlled by isOpen boolean
const panelStyle: React.CSSProperties = {
    transform: isOpen ? 'translateY(0)' : 'translateY(16px)',
    opacity: isOpen ? 1 : 0,
    pointerEvents: isOpen ? 'auto' : 'none',
    transition: 'transform 220ms ease-out, opacity 220ms ease-out',
};
```

**Accessibility note:** Respect `prefers-reduced-motion`. The site already handles this in `src/index.css` with a global `animation-duration: 0.001ms` override — the CSS transition will be overridden automatically for reduced-motion users.

### Pattern 5: Auto-Scroll to Bottom

**What:** After each message is appended to `messages`, scroll the message container to the bottom using a `useRef` + `scrollIntoView`.

```typescript
const messagesEndRef = useRef<HTMLDivElement>(null);

useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
}, [messages]);

// In JSX — place after last message bubble:
<div ref={messagesEndRef} />
```

### Pattern 6: Pulsing Loading Dots

**What:** Three circles with staggered CSS animation, rendered inside an AI-role message bubble while `isLoading === true`.

```typescript
// Rendered as the last message when isLoading is true
const LoadingDots = () => (
    <div style={{ display: 'flex', gap: 4, padding: '8px 16px' }}>
        {[0, 150, 300].map((delay) => (
            <span
                key={delay}
                style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: 'var(--color-fg-3)',
                    animation: `chatDotPulse 800ms ${delay}ms ease-in-out infinite`,
                }}
            />
        ))}
    </div>
);
// Keyframe in index.css or as inline <style> in component
// @keyframes chatDotPulse { 0%,100% { transform: scale(0.6); } 50% { transform: scale(1); } }
```

### Anti-Patterns to Avoid

- **Don't use `@google/generative-ai`:** Deprecated as of Gemini 2.0 launch. The new package is `@google/genai`. Using the old package means using the legacy `GenerativeModel` API.
- **Don't call `ai.models.generateContent()` per turn:** This requires manually building and passing the full `contents` history array on every request. Use `ai.chats` instead.
- **Don't hardcode hex colors:** All colors must use `var(--color-*)` tokens so dark/light theme works automatically.
- **Don't add markdown parsing:** CONTEXT.md locked "plain text only — no markdown parsing, no new deps."
- **Don't render JSX from `data.tsx` in the system prompt:** `PROFILE.tagline` and `ABOUT.lede` are JSX elements, not strings. Use the plain-string fields only.
- **Don't show chips after first message:** Chips must disappear permanently once `messages.length > 0`.

---

## Don't Hand-Roll

| Problem                       | Don't Build                             | Use Instead                                | Why                                                                                                      |
| ----------------------------- | --------------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| Multi-turn history management | Custom array push/pop per turn          | `ai.chats.create()` + `chat.sendMessage()` | SDK handles alternating user/model roles, history truncation, and message parts format                   |
| API request serialization     | Manual `fetch()` + JSON body            | `@google/genai` SDK                        | REST payload structure (parts arrays, role alternation) has subtle requirements; SDK abstracts correctly |
| Theme-reactive colors         | JS theme detection + conditional styles | CSS `var(--color-*)` tokens                | `[data-theme='dark']` overrides are already in `src/index.css`; variables resolve automatically          |
| Icon SVGs                     | Hand-drawn inline SVG strings           | `lucide-react` (MessageCircle, X, Send)    | Already a project dependency; consistent sizing and accessibility attributes                             |

**Key insight:** The chat SDK's conversation management and the CSS token system handle the two hardest parts of this component. The actual implementation work is UI assembly and prompt engineering.

---

## Common Pitfalls

### Pitfall 1: JSX in System Prompt Template

**What goes wrong:** Importing `PROFILE.tagline` or `ABOUT.lede` into `chatbot-context.ts` causes TypeScript errors or renders `[object Object]` in the prompt string.

**Why it happens:** These fields are typed as `React.ReactNode` and contain JSX elements with `<em>` tags, not plain strings.

**How to avoid:** Only use the plain-string fields: `PROFILE.name`, `PROFILE.role`, `PROFILE.location`, `PROFILE.status`, `PROFILE.email`, `PROFILE.sub`. For `ABOUT`, use `ABOUT.cols` (string array) and `ABOUT.stats` instead of `ABOUT.lede`.

**Warning signs:** TypeScript error `Type 'ReactNode' is not assignable to type 'string'` in `chatbot-context.ts`.

### Pitfall 2: Missing API Key at Runtime

**What goes wrong:** `GoogleGenAI` throws on construction or on first call when `apiKey` is `undefined`.

**Why it happens:** `VITE_GEMINI_API_KEY` is not set in the local `.env` file, or `.env` was not created from `.env.example`.

**How to avoid:** Guard at construction time — check `GEMINI_API_KEY` and either skip SDK initialization or show a static error in the chat panel if undefined. The `as string | undefined` pattern from App.tsx line 16 is the correct type annotation.

**Warning signs:** Console error `API key not valid` or `GoogleGenAI: apiKey is required`.

### Pitfall 3: Double-Send on Enter

**What goes wrong:** User presses Enter while `isLoading` is true, queuing a second request.

**Why it happens:** `onKeyDown` handler not checking `isLoading` state.

**How to avoid:** Disable the input element (`disabled={isLoading}`) — browser will not fire events on disabled inputs. Also gate the submit handler: `if (!value.trim() || isLoading) return`.

### Pitfall 4: Chat Session Not Initialized When API Key Absent

**What goes wrong:** `chatRef.current` is `null` when user tries to send, causing a runtime null-dereference.

**Why it happens:** SDK initialization skipped (correctly) when key is absent, but send handler doesn't check for null ref.

**How to avoid:** In the send handler, guard: `if (!chatRef.current) return;`. Optionally show a "Chat unavailable" message in the panel when key is missing.

### Pitfall 5: Panel Visible Before Mount Animation

**What goes wrong:** Panel flashes into view without animation on first open.

**Why it happens:** CSS transition only applies to changes, not to initial render. If panel is rendered in DOM with `opacity: 0` from the start, the first `isOpen = true` triggers the transition correctly. If the panel is conditionally rendered with `{isOpen && <Panel>}`, there's no initial invisible state to transition from.

**How to avoid:** Keep the panel always in the DOM (`display: block` vs. `display: none` or pointer-events) and use `opacity` + `transform` + `pointer-events: none` to hide it. This allows CSS transitions to work in both directions.

### Pitfall 6: Stale Chat Session After Panel Close/Reopen

**What goes wrong:** History persists across panel close/reopen if the chat session is in a `useRef`. Some designs want this; CONTEXT.md says session-only (acceptable) but doesn't require reset on close.

**Why it happens:** `ai.chats.create()` called once, stored in ref, never recreated.

**How to avoid:** Decision: keep session alive across open/close (correct per requirements — history is session-only, not panel-open-only). If reset-on-close were required, recreate the chat session in the `useEffect` that watches `isOpen`.

### Pitfall 7: Gemini Free Tier Rate Limits

**What goes wrong:** 429 errors during testing or demo if rapid-firing messages.

**Why it happens:** Free tier `gemini-2.0-flash` or `gemini-2.5-flash` has low RPM limits. As of late 2025, Google reduced free tier limits 50–80%.

**How to avoid:** Per REQUIREMENTS.md "out of scope" table: "Free tier (15 RPM) is natural ceiling; client-side throttle is sufficient." Implement graceful error handling (CHAT-08) — the error bubble covers this case. Disable send button while loading (prevents rapid-fire). No additional rate limiting UI needed for v1.1.

---

## Code Examples

### Full Gemini Chat Session with System Instruction

```typescript
// Source: ai.google.dev/gemini-api/docs/text-generation + github.com/googleapis/js-genai
import { GoogleGenAI } from '@google/genai';
import { SYSTEM_PROMPT } from '../constants/chatbot-context';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;

// Initialize SDK (skip if no key)
const ai = GEMINI_API_KEY ? new GoogleGenAI({ apiKey: GEMINI_API_KEY }) : null;

// Create a chat session (call once, store in useRef)
const chat = ai?.chats.create({
    model: 'gemini-2.0-flash',
    config: {
        systemInstruction: SYSTEM_PROMPT,
    },
});

// Send a message and get response text
const sendMessage = async (userText: string): Promise<string> => {
    if (!chat) throw new Error('Chat not initialized');
    const response = await chat.sendMessage({ message: userText });
    return response.text ?? '';
};
```

### Error Handling Pattern

```typescript
// Source: github.com/googleapis/js-genai error handling docs
const handleSend = async () => {
    if (!value.trim() || isLoading || !chatRef.current) return;
    const userText = value.trim();
    setValue('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
        const response = await chatRef.current.sendMessage({ message: userText });
        const aiText = response.text ?? 'No response received.';
        setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
        // ApiError has .status and .message; plain Error also works
        setMessages(prev => [
            ...prev,
            {
                role: 'model',
                text: 'Something went wrong. Try again.',
            },
        ]);
    } finally {
        setIsLoading(false);
    }
};
```

### env var Pattern (matching App.tsx)

```typescript
// Source: src/App.tsx line 16 — exact pattern to follow
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
```

### CSS-Only Panel Slide Animation

```typescript
// No Framer Motion needed — pure CSS transition
// Works with prefers-reduced-motion via src/index.css global override
const panelClasses = `
    fixed bottom-24 right-6
    w-[380px] h-[560px]
    rounded-lg
    flex flex-col
    transition-all duration-200 ease-out
`;

const panelStyle: React.CSSProperties = {
    background: 'var(--color-bg)',
    border: '1px solid var(--color-hairline)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
    transform: isOpen ? 'translateY(0)' : 'translateY(16px)',
    opacity: isOpen ? 1 : 0,
    pointerEvents: isOpen ? 'auto' : 'none',
};
```

### Chip Click: Pre-fill and Immediately Send

```typescript
// Chip click = pre-fill value state + call handleSend immediately
const handleChipClick = (chipText: string) => {
    setValue(chipText); // not needed for display — we call send directly
    handleSend(chipText); // pass text directly to avoid async state lag
};

// handleSend should accept optional override text
const handleSend = async (overrideText?: string) => {
    const userText = (overrideText ?? value).trim();
    if (!userText || isLoading || !chatRef.current) return;
    setValue('');
    // ... rest of send logic
};
```

### Focus Management on Panel Open/Close

```typescript
const inputRef = useRef<HTMLInputElement>(null);
const buttonRef = useRef<HTMLButtonElement>(null);

useEffect(() => {
    if (isOpen) {
        // Small delay to let animation start
        setTimeout(() => inputRef.current?.focus(), 50);
    } else {
        buttonRef.current?.focus();
    }
}, [isOpen]);
```

---

## State of the Art

| Old Approach                          | Current Approach                           | When Changed                  | Impact                                                                 |
| ------------------------------------- | ------------------------------------------ | ----------------------------- | ---------------------------------------------------------------------- |
| `@google/generative-ai` SDK           | `@google/genai` SDK                        | Late 2024 (Gemini 2.0 launch) | New package name; `GenerativeModel` API → `ai.models` / `ai.chats` API |
| Manual contents array for history     | `ai.chats.create()` + `chat.sendMessage()` | Late 2024                     | SDK manages history automatically                                      |
| `gemini-1.5-flash` / `gemini-1.5-pro` | `gemini-2.0-flash` (GA)                    | 2025                          | Faster, more capable; `gemini-2.0-flash` is the current stable default |
| `NEXT_PUBLIC_` env prefix             | `VITE_` env prefix                         | Vite project convention       | This project uses Vite; pattern is already established in App.tsx      |

**Deprecated/outdated:**

- `@google/generative-ai`: Deprecated; Google recommends migrating to `@google/genai`
- `gemini-1.5-flash`, `gemini-1.5-pro`: Still functional but not the recommended models for new projects
- `gemini-2.0-flash-lite`: Deprecated as of late 2025; `gemini-2.5-flash` is the replacement, but `gemini-2.0-flash` (non-lite) remains GA and appropriate for this use case

---

## Open Questions

1. **`data.tsx` JSX field handling in system prompt**
    - What we know: `PROFILE.tagline` and `ABOUT.lede` are `React.ReactNode` — JSX with `<em>` tags
    - What's unclear: Whether `PROFILE.sub` (plain string, 150 chars) is sufficient as the "about" description, or whether a prose rewrite of `ABOUT.cols` is needed
    - Recommendation: Use `PROFILE.sub` + `ABOUT.cols` (plain string array) for the system prompt's personality section; skip JSX fields entirely

2. **`lucide-react` icon names for chat bubble**
    - What we know: `lucide-react` ^0.562.0 is installed
    - What's unclear: Exact icon name for a chat bubble (`MessageCircle`? `MessageSquare`?)
    - Recommendation: Use `MessageCircle` for the open state, `X` for close state — both are standard lucide icons available in this version range

3. **CSS keyframe location for loading dots**
    - What we know: `src/index.css` is the global stylesheet; Tailwind v4 uses `@layer` syntax
    - What's unclear: Whether to add `@keyframes chatDotPulse` to `src/index.css` or use a CSS module / inline `<style>` tag
    - Recommendation: Add `@keyframes chatDotPulse` to `src/index.css` in the existing `Animations & media queries` section — consistent with existing `pw-scroll` keyframe

---

## Validation Architecture

> `workflow.nyquist_validation` is not set in `.planning/config.json` — treating as enabled.

### Test Framework

| Property           | Value                                                                |
| ------------------ | -------------------------------------------------------------------- |
| Framework          | None detected — no jest.config, vitest.config, or test files in src/ |
| Config file        | None — Wave 0 gap                                                    |
| Quick run command  | N/A until framework installed                                        |
| Full suite command | N/A until framework installed                                        |

### Phase Requirements → Test Map

| Req ID  | Behavior                                          | Test Type                               | Automated Command                                          | File Exists?      |
| ------- | ------------------------------------------------- | --------------------------------------- | ---------------------------------------------------------- | ----------------- |
| CHAT-01 | Floating button renders fixed bottom-right        | smoke (manual)                          | —                                                          | ❌ Wave 0         |
| CHAT-02 | User message → Gemini response                    | integration (manual — requires API key) | —                                                          | ❌ Wave 0         |
| CHAT-03 | Response references Karl's resume data            | manual-only                             | —                                                          | ❌ Wave 0         |
| CHAT-04 | Follow-up question uses prior context             | manual-only                             | —                                                          | ❌ Wave 0         |
| CHAT-05 | Chips visible on open, hidden after first message | unit (if framework added)               | —                                                          | ❌ Wave 0         |
| CHAT-06 | Close button hides panel                          | unit (if framework added)               | —                                                          | ❌ Wave 0         |
| CHAT-07 | Loading dots appear while awaiting response       | unit (if framework added)               | —                                                          | ❌ Wave 0         |
| CHAT-08 | Error bubble on API failure                       | unit (if framework added)               | —                                                          | ❌ Wave 0         |
| CHAT-09 | Empty input blocked; input cleared after send     | unit (if framework added)               | —                                                          | ❌ Wave 0         |
| CHAT-10 | All colors use CSS tokens, no hardcoded hex       | code review / grep                      | `grep -r '#[0-9a-fA-F]\{3,6\}' src/components/ChatBot.tsx` | ✅ (grep command) |

### Sampling Rate

**Note:** No test framework is installed. CHAT-02 through CHAT-04 require a live API key and cannot be automated in unit tests without mocking. CHAT-10 can be verified by grep.

- **Per task commit:** `grep -r '#[0-9a-fA-F]\{3,6\}' src/components/ChatBot.tsx src/constants/chatbot-context.ts` (should return empty)
- **Per wave merge:** Manual browser verification of all 10 acceptance criteria
- **Phase gate:** All 10 CHAT requirements manually verified in browser before `/gsd:verify-work`

### Wave 0 Gaps

- [ ] No test framework installed (vitest recommended for Vite projects) — optional for this phase since most requirements require live API or browser verification
- [ ] `src/constants/` directory does not exist yet — must be created as part of Wave 0/task 1

_(All CHAT requirements are better verified manually in the browser or via API integration testing — adding vitest for this phase is optional and not blocking)_

---

## Sources

### Primary (HIGH confidence)

- `ai.google.dev/gemini-api/docs/text-generation` — generateContent API, multi-turn chat with `ai.chats`, system instructions syntax
- `ai.google.dev/gemini-api/docs/migrate` — confirms `@google/genai` as the current SDK, `gemini-2.0-flash` as stable model
- `ai.google.dev/api/generate-content` — REST API endpoint, systemInstruction field structure, contents array format
- `github.com/googleapis/js-genai` — SDK README, error handling with ApiError, browser usage warning
- `src/index.css`, `src/App.tsx`, `src/components/data.tsx`, `src/components/Cursor.tsx` — project-specific patterns verified by direct file read

### Secondary (MEDIUM confidence)

- Multiple search results confirming free tier rate limit reductions (late 2025) — consistent across multiple sources; actual RPM numbers not confirmed from official docs page (page redirects to AI Studio)
- `lucide-react` icon names — based on package version already in project; exact icon names to be confirmed at implementation time

### Tertiary (LOW confidence)

- N/A

---

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH — `@google/genai` confirmed as current official SDK via migration guide; Tailwind v4 + React 19 verified in package.json
- Architecture: HIGH — patterns derived from official SDK docs + direct inspection of existing codebase files
- Pitfalls: MEDIUM-HIGH — JSX in template string and panel animation pitfalls derived from code analysis; API error behavior confirmed from SDK docs

**Research date:** 2026-05-06
**Valid until:** 2026-06-05 (30 days — Gemini API changes slowly; SDK version may increment)
