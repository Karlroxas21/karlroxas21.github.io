# Personal Website v2

## What This Is

Karl's personal portfolio website — an editorial, typography-first site built in React + Vite. Showcases work, experience, writing, and contact. Design language: monochrome, tight grid, Fraunces + IBM Plex Mono, dark/light theme.

## Core Value

A living, high-craft portfolio that reflects Karl's taste and work — distinct from AI-generated templates.

## Requirements

### Validated

- ✓ Hero section with tagline and profile — v1.0
- ✓ About section with bio and stats — v1.0
- ✓ Work/projects section — v1.0
- ✓ Writing/blog section with individual blog pages — v1.0
- ✓ Experience timeline — v1.0
- ✓ NowOss section (current OSS / what I'm on now) — v1.0
- ✓ Contact section — v1.0
- ✓ Dark/light theme toggle — v1.0
- ✓ RainyDays project page — v1.0
- ✓ PowerFlex project page — v1.0
- ✓ Custom cursor — v1.0
- ✓ Google Analytics integration — v1.0
- ✓ Responsive layout — v1.0

### Active

- [ ] AI chatbot widget — answers questions about Karl using Gemini API (v1.1)

### Out of Scope

- CMS / dynamic content — static site on GitHub Pages, keep it simple
- Server-side rendering — GitHub Pages is static-only
- Authentication — portfolio, no user accounts needed

## Context

- Hosted on GitHub Pages (static only — no server)
- React 19 + Vite 7 + TypeScript + Tailwind CSS v4
- No state management library (useState/context only)
- Design: editorial monochrome — cream (#f7f3ec) light, dark (#14110d) dark, Fraunces + IBM Plex Mono
- Existing env var pattern: VITE_G_ID for Google Analytics
- API key security: Vite inlines VITE\_\* at build time; restrict by HTTP referrer in Google Cloud Console

## Constraints

- **Hosting**: GitHub Pages static-only — no server-side code
- **API key exposure**: Any VITE\_\* key is public in JS bundle — must restrict by HTTP referrer
- **No new npm packages**: Prefer native fetch, existing deps

## Key Decisions

| Decision                      | Rationale                                   | Outcome   |
| ----------------------------- | ------------------------------------------- | --------- |
| React + Vite (no Next.js)     | GitHub Pages static hosting                 | ✓ Good    |
| Tailwind CSS v4               | Latest, no config file needed               | ✓ Good    |
| No state management lib       | Site is simple enough, avoids bundle weight | ✓ Good    |
| Google Gemini API (free tier) | No billing required, sufficient rate limits | — Pending |

---

_Last updated: 2026-05-06 after v1.1 milestone start_
