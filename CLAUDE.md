# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Start development server:**
```bash
npm run dev
```

**Build for production:**
```bash
npm run build
```

**Run all tests (watch mode):**
```bash
npm run test
```

**Run tests once (CI mode):**
```bash
npm run test:run
```

**Run tests with coverage:**
```bash
npm run test:coverage
```

**Run tests with UI:**
```bash
npm run test:ui
```

**Lint code (ESLint + Stylelint):**
```bash
npm run lint
```

**Format code with Prettier:**
```bash
npm run format
```

**Preview production build:**
```bash
npm run preview
```

## Project Architecture

This is a **Nexus Markdown to BBCode Editor** - a React-based single-page web application that converts Markdown to BBCode format for Nexus Mods forum. The project builds to a single, self-contained HTML file.

### Core Architecture Pattern

The application uses a **dual-mode rendering system** where every markdown component can render in two modes:
- `html` mode: Standard HTML output for preview
- `bbcode` mode: BBCode markup for forum posting

All components accept a `mode` prop of type `'html' | 'bbcode'` and implement both rendering paths.

### Key Files

- **`src/app.tsx`**: Main application with file upload/download, localStorage persistence, and dual-view toggle
- **`src/markdown.tsx`**: Central component mapping standard markdown elements to custom dual-mode components
- **`src/bbcode.tsx`**: Renders markdown to BBCode using a virtual DOM approach with `flushSync`
- **`src/components/markdown/`**: Individual components handling both HTML and BBCode output modes

### State Management

- Uses React hooks (useState, useEffect, useCallback) for local state
- Persists markdown content and filename to localStorage
- No external state management library needed

### Build System

- **Vite** with `vite-plugin-singlefile` creates a single HTML file output
- **TypeScript** with strict configuration and path aliases (`@/` → `src/`)
- **SWC** for fast React compilation
- Output filename includes version: `markdown-to-bbcode-v0.0.0.html`

## Testing Guidelines

### Test Structure
- Place tests in `__tests__` folders next to the files they test
- Use `.test.ts` or `.test.tsx` extensions
- Example: `src/utils/bbcode.ts` → `src/utils/__tests__/bbcode.test.ts`

### Testing Tools
- **Vitest** as test runner
- **@testing-library/react** for component testing
- **@testing-library/user-event** for user interactions
- **jsdom** environment for DOM APIs

### Test Requirements
- Test both `html` and `bbcode` rendering modes for dual-mode components
- Focus on component behavior over implementation details
- Test file operations, localStorage persistence, and user interactions
- Use `@/test/test-utils` for common testing utilities

## Development Guidelines

### Component Patterns
All markdown components follow this interface:
```typescript
interface ComponentProps extends BBCodeComponentProps {
    mode: 'html' | 'bbcode';
    children?: ReactNode;
}
```

### Dependency Management
- **Always use `--save-exact`** when installing npm dependencies
- Example: `npm install --save-exact package-name`
- This ensures reproducible builds and prevents version conflicts

### JSDoc Requirements
Add JSDoc comments to all functions and classes:
```typescript
/**
 * Description of what the function does
 * @param mode - Whether to render as HTML or BBCode
 * @param children - The content to render
 * @returns The rendered component
 */
```

### Import/Export Conventions
- Use named exports for components and utilities
- Import React types with `type` keyword: `import type { ReactNode } from 'react'`
- Use absolute imports with `@/` alias for src directory
- Organize imports with prettier-plugin-organize-imports

### File Naming
- Components: camelCase (e.g., `header.tsx`)
- CSS files: match component name (e.g., `header.css`)
- Co-locate CSS files with components

### Code Quality Tools
- **ESLint**: Strict TypeScript + React rules with Prettier integration
- **Stylelint**: CSS linting with standard configuration
- **Prettier**: Code formatting with import organization
- **Husky + lint-staged**: Pre-commit hooks for quality checks

## Key Dependencies

**Core:**
- React 19 + TypeScript
- react-markdown with remark-gfm and remark-directive for markdown processing
- Vite with vite-plugin-singlefile for building

**Development:**
- Vitest + @testing-library/react for testing
- ESLint + Prettier + Stylelint for code quality
- Husky for git hooks

## Performance Considerations

- Use `useMemo` for expensive markdown processing operations
- Memoize callbacks with `useCallback` to prevent unnecessary re-renders
- The BBCode rendering uses `flushSync` to ensure synchronous DOM updates
- Single-file build optimizes for distribution and loading speed