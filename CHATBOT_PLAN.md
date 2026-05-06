# Chatbot Implementation Plan

## Overview

Add an AI-powered chatbot widget to the personal website that answers questions about Karl's resume, experience, skills, and projects. The chatbot uses Google Gemini API (free tier) and follows the existing editorial monochrome design system.

> **Updated 2026-05-06:** Previous version referenced a "Ubuntu desktop window" pattern (WindowWrapper HOC, dockApps, WINDOW_CONFIG, Zustand window store). That architecture does not exist in this codebase. This plan reflects the actual architecture: a React portfolio with section-based layout and no window management system.

---

## Architecture

```
User clicks floating chat button (bottom-right, fixed position)
        |
        v
Chat panel opens (overlay/slide-in)
        |
        v
ChatBot component (React, local useState)
        |
        v
Google Gemini API (native fetch, client-side)
  - System prompt: Karl's resume data (from chatbot-context.ts)
  - User message + conversation history
        |
        v
Response rendered in chat panel
```

**API Choice:** Google AI Studio free tier (Gemini 2.0 Flash)

- 15 RPM / 1M TPM free
- No billing required
- API key restricted by HTTP referrer in Google Cloud Console

**Security:** GitHub Pages is static-only — the API key is exposed in the client bundle. Mitigations:

1. Restrict the API key by HTTP referrer (only `karl.is-a.dev/*`)
2. Free tier rate limits prevent abuse (15 requests/minute)
3. Use Vite env var (`VITE_GEMINI_API_KEY`) so the key isn't hardcoded in source

---

## Files to Create / Modify

### New Files

| File                               | Purpose                                |
| ---------------------------------- | -------------------------------------- |
| `src/components/ChatBot.tsx`       | Floating button + chat panel component |
| `src/constants/chatbot-context.ts` | System prompt with resume data         |

### Files to Modify

| File                           | Change                                          |
| ------------------------------ | ----------------------------------------------- |
| `src/App.tsx`                  | Import and render `<ChatBot />`                 |
| `.env.example`                 | Document the `VITE_GEMINI_API_KEY` variable     |
| `.github/workflows/deploy.yml` | Pass `VITE_GEMINI_API_KEY` secret to build step |

---

## Step-by-Step Implementation

### Step 1: Create the System Prompt Context

**`src/constants/chatbot-context.ts`**

Build a system prompt string from all the existing resume data (import from `data.tsx` or inline):

```typescript
export const SYSTEM_PROMPT = `You are an AI assistant on Karl's personal portfolio website.
Answer questions ONLY about Karl based on the following resume data.
If asked about anything unrelated to Karl, politely redirect.
Keep responses concise and friendly. Use markdown for structure when helpful.

## About Karl
Software engineer, two years in. Builds calm, durable systems.
TypeScript, Java, React, React Native. Detours into infra.
Based in Taguig, PH. Gym, running, cycling outside work.

## Current Role
Associate Application Support Engineer & Software Engineer
Amihan Global Strategies | Oct 2024 - Present (Hybrid)
- Led migration of BDO Internal System Angular 7 → Angular 18 (~30% page load improvement)
- Engineer for Bahai Deals and Chemlink (Next.js, ExpressJS, TypeScript) — $12M+ gross revenue
- AWS exposure, Clean Architecture enforcement
- L3 full-stack support for BDO and SMDC (99% uptime)

## Tech Stack
Frontend: React + Vite, Angular, Next.js, TypeScript
Mobile: React Native, Expo
AI: Prompt Engineering, Agentic AI Development
Styling: Tailwind CSS, shadcn
Backend: Node.js, Express.js, Spring Boot, Java
Database: PostgreSQL, Neo4J, Redis, NoSQL
Testing: Karma, Jest, Playwright, JUnit
Dev Tools: Git, GitHub, Docker, Kubernetes

## Projects
RainyDays — offline-first mobile savings tracker (React Native + Expo). Track personal savings, manage group funds, sync peer-to-peer via QR codes.

## Blog Posts
- React Hooks: Stop Writing Class Components, Start Writing Functions
- Spring Boot DI: Stop Wiring Everything Yourself
- Zustand: Stop Passing Props Through 10 Components
- How to Set Up an .is-a.dev Domain with GitHub Pages

## Contact
Email: karlm.roxas@gmail.com
GitHub: github.com/Karlroxas21
LinkedIn: linkedin.com/in/km-roxas
`;
```

### Step 2: Create the ChatBot Component

**`src/components/ChatBot.tsx`**

Structure:

```
[Fixed bottom-right button: chat icon]
        |
        v (on click)
[Chat panel — fixed overlay, right side]
+------------------------------------------+
| Ask Karl AI                    [×]       |
+------------------------------------------+
|                                          |
|  [Welcome message + suggested chips]     |
|                                          |
|  User: What tech stack does Karl use?   |
|                                          |
|  Bot: Karl specializes in...            |
|                                          |
+------------------------------------------+
| [Type your question...]      [→ Send]   |
+------------------------------------------+
```

**Key implementation details:**

1. **State (local useState):**
    - `isOpen: boolean` — panel visibility
    - `messages: { role: 'user' | 'assistant'; content: string }[]`
    - `input: string`
    - `isLoading: boolean`
    - `error: string | null`

2. **API call:**

    ```typescript
    const sendMessage = async (userMessage: string) => {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
                    contents: [
                        ...messages.map(m => ({
                            role: m.role === 'assistant' ? 'model' : 'user',
                            parts: [{ text: m.content }],
                        })),
                        { role: 'user', parts: [{ text: userMessage }] },
                    ],
                }),
            }
        );
        const data = await response.json();
        return data.candidates[0].content.parts[0].text as string;
    };
    ```

3. **Design tokens to use:**
    - Background: `var(--color-bg)` / `var(--color-fg)`
    - Hairline border: `var(--color-hairline)`
    - Muted text: `var(--color-fg-3)`
    - Font label: `var(--font-label)` (IBM Plex Mono)
    - Font body: `var(--font-body)` (Fraunces)
    - User bubble: subtle fg-2 bg, right-aligned
    - Bot bubble: hairline border, left-aligned

4. **Auto-scroll:** `useRef` + `scrollIntoView` on new messages

5. **Suggested prompts:**
    - "What's Karl's tech stack?"
    - "Tell me about Karl's experience"
    - "What projects has Karl built?"
    - "How can I contact Karl?"

### Step 3: Add to App.tsx

```typescript
import ChatBot from './components/ChatBot';

// In JSX, before closing fragment:
<ChatBot />
```

### Step 4: Environment Variable Setup

**`.env.example`:**

```
VITE_GEMINI_API_KEY=your_google_ai_studio_api_key_here
```

**`.env` (local, gitignored):**

```
VITE_GEMINI_API_KEY=actual_key_here
```

**GitHub Actions build step:**

```yaml
- name: Build
  run: npm run build
  env:
      VITE_GEMINI_API_KEY: ${{ secrets.VITE_GEMINI_API_KEY }}
```

---

## Risk Mitigation (Required Before Deploy)

### Risk 1: API Key Exposed in JS Bundle

1. [ ] Get API key from https://aistudio.google.com/apikey
2. [ ] Go to Google Cloud Console → APIs & Services → Credentials → select the key
3. [ ] Under "Application restrictions" → set HTTP referrers:
    - `https://karl.is-a.dev/*`
    - `http://localhost:5173/*` (local dev)
4. [ ] Without this, anyone who finds the key can use it freely

### Risk 2: Key Not Available in GitHub Actions Build

5. [ ] Repo → Settings → Secrets and variables → Actions → New secret: `VITE_GEMINI_API_KEY`
6. [ ] Verify deploy workflow passes it to the build step (see Step 4 above)

---

## API Key Security Checklist

- [ ] Get API key from https://aistudio.google.com/apikey
- [ ] Restrict key by HTTP referrer in Google Cloud Console
- [ ] Add key to GitHub repository secrets as `VITE_GEMINI_API_KEY`
- [ ] Verify `.env` is in `.gitignore`
- [ ] Confirm `gemini-2.0-flash` is valid model ID before implementation

---

## UX Considerations

- **Welcome message:** Bot greets with brief intro and 4 suggested prompt chips
- **Rate limiting:** Disable send button while `isLoading` to prevent spam
- **Error handling:** "Sorry, I'm having trouble connecting. Try again in a moment."
- **Empty state guard:** Don't send empty messages
- **Max input:** Cap at ~500 characters
- **Mobile:** Acceptable to be desktop-only for v1.1 (site uses ScreenGuard for mobile)

---

## Dependencies

No new npm packages needed. Uses:

- Native `fetch` for Gemini calls
- Local `useState`/`useRef` — no global state
- Existing Tailwind CSS + CSS custom properties for styling

---

## Testing Checklist

- [ ] Chatbot button visible on portfolio page
- [ ] Panel opens/closes correctly
- [ ] Messages send and responses render
- [ ] Conversation history maintained within session
- [ ] Suggested prompt chips work
- [ ] Error state displays on API failure
- [ ] Auto-scrolls to latest message
- [ ] Input clears after sending
- [ ] Loading state shows while waiting for response
- [ ] Cannot send empty messages
- [ ] Works with referrer-restricted API key in production
