# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Vite dev server with HMR
npm run build        # tsc type-check + Vite production build
npm run lint         # ESLint
npm run format       # Prettier (auto-fix)
npm run format:check # Prettier (check only)
npm run preview      # Preview production build locally
npm run deploy-worker # Deploy Cloudflare Worker (AI proxy)
```

No test suite exists. Husky runs Prettier on staged files before each commit via lint-staged.

## Architecture

**Stack**: React 19 + TypeScript + Vite 7 + Tailwind CSS 4 + React Router 7 (HashRouter)

HashRouter is intentional — GitHub Pages static hosting can't handle history API, hashes avoid 404s.

### Content Architecture

All site content lives in a single file: `src/components/data.tsx` — exports `PROFILE`, `ABOUT`, `EXPERIENCE`, `PROJECTS`, `POSTS`, `NOW_ITEMS`, `LINKS`. No CMS or database. The AI chatbot system prompt at `src/constants/chatbot-context.ts` compiles this data into natural language.

### Routing

```
/                   → App.tsx (portfolio home, all sections)
/blogs/:title       → Blog.tsx (markdown post, fetched from public/files/articles/)
*                   → NotFound.tsx
```

### Theme

`src/providers/ThemeProvider.tsx` + `src/providers/theme-context.ts` — Context API, localStorage persistence, respects `prefers-color-scheme`. Sets `data-theme` on `<html>` + `dark` class. Use `useTheme()` hook.

### AI Chatbot

Two providers in `src/lib/ai-chat.ts`: Gemini (direct) or OpenRouter (via Cloudflare Worker proxy in production). Worker at `withered-shape-02b5/` proxies OpenRouter so the API key never ships in frontend JS.

Env vars:

- `VITE_G_ID` — Google Analytics 4 measurement ID
- `VITE_AI_ENDPOINT` — Cloudflare Worker URL (proxies OpenRouter)
- `VITE_OPENROUTER_MODEL` — model string, defaults to `anthropic/claude-haiku-4-5`

### Cloudflare Worker

Lives in `withered-shape-02b5/`. Deploy with Wrangler: `wrangler secret put OPENROUTER_API_KEY`, then `wrangler deploy`. CORS origin allowlist is hardcoded in `withered-shape-02b5/src/worker.js`.

## Project Structure (Bullet Proof React)

Strict feature-sliced architecture. No exceptions.

### Directory Layout

```
src/
  assets/           # global static assets
  components/       # shared UI only — no feature-specific code
  constants/        # global constants
  features/         # feature modules (self-contained)
    <feature>/
      components/   # feature-local components
      hooks/        # feature-local hooks
      types/        # feature-local types
      utils/        # feature-local utils
      index.ts      # public API — ONLY export from here
  hooks/            # shared hooks (used by 2+ features)
  lib/              # 3rd-party configs and wrappers
  pages/            # route-level components (thin — orchestrate features only)
  providers/        # React context providers
  routes/           # route config
  types/            # global types
  utils/            # shared utils (used by 2+ features)
```

### Strict Rules

**1. No cross-feature imports.**
`features/foo` MUST NOT import from `features/bar`. Shared code → extract to `src/components/`, `src/hooks/`, `src/utils/`, or `src/lib/`.

**2. Barrel exports only.**
All external imports from a feature MUST go through `features/<name>/index.ts`. Never import internal paths like `features/foo/components/Bar` from outside that feature. Internals are private.

**3. Colocate feature code.**
Feature-specific components, hooks, types, and utils live inside `features/<name>/`. Do NOT place feature-specific code in shared directories.

**4. Pages are thin.**
`src/pages/` components contain no business logic, no API calls, no state management. They only compose and arrange feature exports.

**5. Shared dirs are strictly shared.**
`src/components/`, `src/hooks/`, `src/utils/` contain ONLY code used by 2+ features or pages. If only one feature uses it → colocate inside that feature directory.

**6. No implicit public APIs.**
Never import from a feature's internal file from outside its directory. If something must be shared externally, add it explicitly to that feature's `index.ts`.

### Current Feature Mapping

| Feature     | Current (legacy)            | Target                    |
| ----------- | --------------------------- | ------------------------- |
| `mmg`       | `src/components/mmg/`       | `src/features/mmg/`       |
| `rainydays` | `src/components/rainydays/` | `src/features/rainydays/` |

Migrate from legacy paths to `src/features/` on next touch. Do not create new code in `src/components/<feature>/`.

## Code Style

Prettier config (`.prettierrc`): single quotes, trailing commas (es5), `printWidth: 120`, `tabWidth: 4`.

Path alias `@components/*` maps to `src/components/` (configured in `tsconfig.app.json` + `vite.config.ts`).

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) deploys on push to `main` → `gh-pages` branch → `karlroxas.is-a.dev`.
