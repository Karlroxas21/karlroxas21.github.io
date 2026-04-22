# Personal Website v2

A minimal personal portfolio site built with React, TypeScript, and Vite. Focused on grid systems, typography, and performance.

## Features

- **Single-page portfolio** — Hero, About, Work, Writing, Experience, Now/OSS, Contact sections
- **Chrome bars** — Sticky top/bottom bars with live clock, resume download, and theme toggle
- **Light/dark theme** — Persisted in `localStorage`, respects `prefers-color-scheme`
- **Blog** — Markdown-rendered posts with syntax highlighting at `/blogs/:title`
- **Custom cursor**
- **Google Analytics 4** — Page views and event tracking via `react-ga4`
- **Responsive design** — Tailwind CSS 4

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build**: Vite 7
- **Styling**: Tailwind CSS 4
- **Routing**: React Router 7
- **Markdown**: react-markdown + rehype-highlight + remark-gfm
- **Analytics**: react-ga4
- **Icons**: lucide-react
- **Code quality**: ESLint, Prettier, Husky, lint-staged
- **React Compiler**: babel-plugin-react-compiler

## Getting Started

### Prerequisites

- Node.js v18+
- npm

### Installation

```bash
git clone <repository-url>
cd personal-website-v2

npm install

# Setup git hooks
npm run prepare
```

### Environment Variables

Create a `.env` file:

```env
VITE_G_ID=G-XXXXXXXXXX   # Google Analytics 4 measurement ID (optional)
```

### Development

```bash
# Start dev server with HMR
npm run dev

# Format code
npm run format

# Check formatting
npm run format:check

# Run ESLint
npm run lint
```

### Build

```bash
# Type-check + build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/         # Section and UI components
│   ├── Chrome.tsx      # Sticky header + footer bars
│   ├── Cursor.tsx      # Custom cursor
│   ├── Hero.tsx        # Hero section
│   ├── About.tsx       # About section
│   ├── Work.tsx        # Projects section
│   ├── Writing.tsx     # Blog posts section
│   ├── Experience.tsx  # Work experience section
│   ├── NowOss.tsx      # Now + OSS repos section
│   ├── Contact.tsx     # Contact section
│   ├── FootEnd.tsx     # Footer content
│   ├── SectionHead.tsx # Shared section heading
│   ├── data.tsx        # All site content and data
│   └── types.ts        # TypeScript types
├── pages/
│   ├── Blog.tsx        # Individual blog post page
│   └── NotFound.tsx    # 404 page
├── providers/
│   ├── ThemeProvider.tsx   # Light/dark theme provider
│   └── theme-context.ts    # Theme context + hook
├── hooks/
│   └── use-analytics.tsx   # GA4 analytics hook
├── utils/
│   └── ScrollToHash.tsx    # Scroll-to-hash utility
├── routes.tsx          # Route definitions
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles and CSS variables
```

## Blog Articles

Markdown files in `public/files/articles/`:

| File                 | Title                                              |
| -------------------- | -------------------------------------------------- |
| `react-hooks.md`     | React Hooks: Stop Writing Class Components         |
| `spring-boot-di.md`  | Spring Boot Dependency Injection                   |
| `zustand.md`         | Zustand: Stop Passing Props Through 10 Components  |
| `is-a-dev-domain.md` | How to Setup an .is-a.dev domain with GitHub Pages |

Articles use syntax highlighting via highlight.js + rehype-highlight.

## Available Scripts

| Command                | Description                       |
| ---------------------- | --------------------------------- |
| `npm run dev`          | Start development server          |
| `npm run build`        | Type-check + build for production |
| `npm run preview`      | Preview production build          |
| `npm run lint`         | Run ESLint                        |
| `npm run format`       | Format code with Prettier         |
| `npm run format:check` | Check code formatting             |

## Configuration

**Prettier** (`.prettierrc`):

```json
{
    "singleQuote": true,
    "trailingComma": "es5",
    "semi": true,
    "printWidth": 120,
    "tabWidth": 4
}
```

**Husky** runs Prettier on staged files (`*.js, *.jsx, *.ts, *.tsx, *.json, *.css, *.md`) before each commit via lint-staged.

## License

MIT

## Contact

karlm.roxas@gmail.com
