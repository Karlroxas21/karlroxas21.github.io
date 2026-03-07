# Personal Website v2

A creative personal website inspired by **Ubuntu OS**, built with React, TypeScript, and Vite. This project showcases a desktop-like interface where visitors can interact with draggable windows and explore various sections of the portfolio.

## ✨ Features

- **Ubuntu-Inspired Desktop UI** - A familiar desktop environment with a taskbar dock and draggable windows
- **Interactive Windows** - Multiple resizable, draggable windows including:
    - **Terminal** - Command-line interface
    - **Firefox Browser** - Web browsing window
    - **Resume** - Professional resume viewer
    - **File Explorer** - Document and file browser
    - **Text Editor** - Document viewer and editor
    - **Image Viewer** - Portfolio and image gallery
    - **Contact Form** - Direct contact window
- **Smooth Animations** - GSAP-powered animations and transitions
- **Blog Section** - Markdown-based articles with syntax highlighting
- **Responsive Design** - Tailwind CSS for modern, responsive styling
- **Code Quality** - ESLint, Prettier, and Husky for code consistency

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animation**: GSAP (GreenSock Animation Platform)
- **Markdown**: React Markdown with rehype and remark plugins
- **PDF Rendering**: React PDF
- **State Management**: Zustand
- **Code Quality**: ESLint, Prettier, Husky
- **Routing**: React Router

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd personal-website-v2

# Install dependencies
npm install

# Setup git hooks (for Husky)
npm run prepare
```

### Development

```bash
# Start development server with HMR
npm run dev

# Format code with Prettier
npm run format

# Check formatting without modifying files
npm run format:check

# Run ESLint
npm run lint
```

### Build

```bash
# Build for production
npm build

# Preview production build locally
npm run preview
```

## 📁 Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── Dock.tsx      # Taskbar dock component
│   ├── Navbar.tsx    # Navigation bar
│   ├── Welcome.tsx   # Welcome section
│   └── ...
├── windows/          # Draggable window components
│   ├── Terminal.tsx
│   ├── Firefox.tsx
│   ├── Resume.tsx
│   ├── Files.tsx
│   ├── Text.tsx
│   ├── Image.tsx
│   └── Contact.tsx
├── pages/            # Route pages
│   ├── Blog.tsx
│   └── Fallback.tsx
├── store/            # Zustand state management
├── hoc/              # Higher-order components
├── constants/        # Application constants
├── App.tsx           # Main app component
└── main.tsx          # Entry point
```

## 📝 Articles

Blog articles are stored as Markdown files in `public/files/articles/`:

- `react-hooks.md` - React Hooks guide
- `spring-boot-di.md` - Spring Boot dependency injection
- `zustand.md` - State management with Zustand
- `is-a-dev-domain.md` - About .dev domains

Articles are rendered with syntax highlighting powered by highlight.js.

## 🎨 Customization

### Prettier Configuration

Code formatting is configured via `.prettierrc`:

```json
{
    "singleQuote": true,
    "trailingComma": "es5",
    "semi": true,
    "printWidth": 120,
    "tabWidth": 4
}
```

### Husky Pre-commit Hook

Husky automatically runs Prettier on staged files before each commit via lint-staged configuration.

### Tailwind CSS

Styling uses Tailwind CSS with the official Vite plugin for optimal performance.

## 🔧 Available Scripts

| Command                | Description               |
| ---------------------- | ------------------------- |
| `npm run dev`          | Start development server  |
| `npm run build`        | Build for production      |
| `npm run preview`      | Preview production build  |
| `npm run lint`         | Run ESLint checks         |
| `npm run format`       | Format code with Prettier |
| `npm run format:check` | Check code formatting     |

## 📦 Dependencies

### Key Dependencies

- `react` & `react-dom` - UI library
- `react-router` - Client-side routing
- `tailwindcss` - Utility-first CSS framework
- `zustand` - Lightweight state management
- `gsap` - Animation library
- `react-markdown` - Markdown rendering
- `lucide-react` - Icon library

### Dev Dependencies

- `typescript` - Type checking
- `vite` - Build tool
- `eslint` - Code linting
- `prettier` - Code formatting
- `husky` - Git hooks
- `lint-staged` - Run linters on staged files

## 🎯 Browser Support

Works best on modern browsers that support:

- ES2020
- CSS Grid
- CSS Custom Properties
- Flexbox

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

To contribute to this project:

1. Make your changes
2. Run `npm run format` to format your code
3. Run `npm run lint` to check for issues
4. Commit your changes (Husky will automatically run Prettier)

## 📧 Contact

- karlm.roxas@gmail.com
