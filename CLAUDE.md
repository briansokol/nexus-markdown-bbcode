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

**Lint code (ESLint only - no CSS files):**
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
- Style files: match component name with `.styles.ts` suffix (e.g., `header.styles.ts`)
- **Always co-locate style files** next to their most relevant component file

### Styling with Emotion CSS-in-JS
- **@emotion/react**: CSS-in-JS library for component styling
- Style files use `.styles.ts` extension and export `css` objects
- Use `css` prop on elements instead of `className`
- Add `/** @jsxImportSource @emotion/react */` pragma to components using styles
- Global styles are applied via `<Global styles={globalStyles} />` in main.tsx
- **File placement**: Always place `.styles.ts` files next to the component that uses them most

**Style file organization examples:**
```
src/
├── app.tsx
├── app.styles.ts                    # App-specific styles
├── components/
│   ├── ui/
│   │   ├── action-button.tsx
│   │   └── action-button.styles.ts  # ActionButton-specific styles
│   └── markdown/
│       ├── header.tsx
│       └── header.styles.ts         # Header-specific styles
└── global.styles.ts                 # Global/shared styles
```

Example style file (`component.styles.ts`):
```typescript
import { css } from '@emotion/react';

export const container = css`
  display: flex;
  padding: 1rem;
  background-color: #fff;
`;

export const title = css`
  font-size: 1.5rem;
  color: #333;
`;
```

Example component usage:
```typescript
/** @jsxImportSource @emotion/react */
import * as styles from './component.styles';

export function Component() {
  return (
    <div css={styles.container}>
      <h1 css={styles.title}>Title</h1>
    </div>
  );
}
```

### Code Quality Tools
- **ESLint**: Strict TypeScript + React rules with Prettier integration
- **Prettier**: Code formatting with import organization
- **Husky + lint-staged**: Pre-commit hooks for quality checks

## Key Dependencies

**Core:**
- React 19 + TypeScript
- @emotion/react for CSS-in-JS styling
- react-markdown with remark-gfm and remark-directive for markdown processing
- Vite with vite-plugin-singlefile for building

**Development:**
- Vitest + @testing-library/react for testing
- ESLint + Prettier for code quality
- Husky for git hooks

## Performance Considerations

- Use `useMemo` for expensive markdown processing operations
- Memoize callbacks with `useCallback` to prevent unnecessary re-renders
- The BBCode rendering uses `flushSync` to ensure synchronous DOM updates
- Single-file build optimizes for distribution and loading speed