# GitHub Copilot Instructions

## Project Overview

This is a **Nexus Markdown to BBCode Editor** - a React-based web application that converts Markdown content to BBCode format suitable for Nexus Mods. The project builds to a single HTML file that can run independently in any browser.

## Technology Stack

### Core Technologies

- **React 19** with TypeScript
- **Vite** as the build tool with SWC for fast compilation
- **react-markdown** for parsing and rendering markdown content

### Development Tools

- **TypeScript** with strict configuration
- **ESLint** with TypeScript, React, and Prettier integration
- **Prettier** with organize imports plugin
- **Node.js** as the runtime requirement

## Project Architecture

### File Structure Patterns

- `/src/components/` - Reusable React components with co-located CSS
- `/src/utils/` - Utility functions and hooks
- `/src/types/` - TypeScript type definitions
- Root level contains configuration files (tsconfig, eslint, vite, etc.)

### Component Architecture

- Components follow a **dual-mode rendering pattern** (HTML vs BBCode output)
- All components accept a `mode` prop of type `'html' | 'bbcode'`
- Components use the `BBCodeComponentProps` interface for consistency
- CSS modules are co-located with components using `.css` files

### Key Patterns

1. **Mode-based Rendering**: Components conditionally render HTML or BBCode based on mode
2. **Custom React Hooks**: Use `useCleanChildren` for processing ReactNode content
3. **Type Safety**: Strict TypeScript configuration with comprehensive type checking
4. **Component Composition**: Use ReactMarkdown with custom component overrides

## Coding Standards

### JSDoc Requirements

**ALWAYS add JSDoc comments to all classes and functions**, including:

- Function purpose and behavior
- Parameter descriptions with types
- Return value descriptions
- Usage examples when helpful

### TypeScript Conventions

- Use strict TypeScript configuration
- Prefer `interface` over `type` for object shapes
- Use `type` for unions, primitives, and computed types
- Always provide explicit return types for functions
- Use `React.ReactNode` for children props

### Import/Export Patterns

- Use named exports for components and utilities
- Import React types with `type` keyword: `import type { ReactNode } from 'react'`
- Organize imports with prettier-plugin-organize-imports
- Use absolute imports with `@/` alias for src directory

### Component Patterns

```typescript
interface ComponentProps extends BBCodeComponentProps {
    // Additional props here
}

/**
 * Description of what the component does
 * @param mode - Whether to render as HTML or BBCode
 * @param children - The content to render
 */
export function ComponentName({ mode, children }: ComponentProps) {
    // Implementation
}
```

### Styling Conventions

- Use CSS files co-located with components
- Responsive design with flexbox/grid

### File Naming

- Components: camelCase (e.g., `header.tsx`)
- Utilities: camelCase (e.g., `bbcode.ts`)
- Types: camelCase (e.g., `components.ts`)
- CSS: match component name (e.g., `header.css`)

## Development Guidelines

### Code Quality

- Follow ESLint rules strictly
- Use Prettier for consistent formatting
- Prefer functional components with hooks
- Use `useMemo` for expensive computations
- Handle edge cases explicitly (null, undefined, empty arrays)

### Dependency Management

- **Always use `--save-exact`** when installing npm dependencies to ensure exact version pinning
- Example: `npm install --save-exact package-name` or `npm install --save-exact --save-dev package-name`
- This ensures reproducible builds and prevents unexpected issues from minor version updates

### Performance Considerations

- Use React.memo for expensive components when appropriate
- Memoize callbacks and computed values
- Avoid inline object creation in render
- Use proper dependency arrays for hooks

### Error Handling

- Handle file operations with proper error states
- Validate user inputs
- Provide meaningful error messages
- Use TypeScript's strict null checks

### Testing Approach

- Focus on component behavior over implementation
- Test both HTML and BBCode rendering modes
- Verify accessibility and user interactions
- Test file operations and edge cases

## Testing Setup and Conventions

### Testing Tools

- **Vitest** is used as the test runner and assertion library.
- **@testing-library/react** and **@testing-library/user-event** are used for React component testing and user interaction simulation.
- **jsdom** is used as the test environment for DOM APIs.

### Test File Structure

- All test files must be placed in a `__tests__` folder located in the same directory as the file being tested.
- Test files should use the `.test.ts` or `.test.tsx` extension, matching the file type they test.
- Example: To test `src/utils/bbcode.ts`, place the test in `src/utils/__tests__/bbcode.test.ts`.

### Running Tests

- Use the following npm scripts:
    - `npm test` or `npm run test` — Run all tests in watch mode.
    - `npm run test:ui` — Run tests with the Vitest UI.
    - `npm run test:run` — Run all tests once (CI mode).
    - `npm run test:coverage` — Run tests and generate a coverage report.

### Testing Best Practices

- Focus on component behavior, not implementation details.
- Test both HTML and BBCode rendering modes for all dual-mode components.
- Use `@testing-library/react` for rendering and querying components.
- Use `@testing-library/user-event` for simulating user interactions.
- Use `renderHook` from `@testing-library/react` for testing custom hooks.
- Always clean up after tests and avoid global side effects.
- Prefer colocating test files with the code they test for maintainability.

### Example Test File Structure

```
src/utils/bbcode.ts
src/utils/__tests__/bbcode.test.ts
src/components/ui/action-button.tsx
src/components/ui/__tests__/action-button.test.tsx
```

### Example Test (for a utility function)

```typescript
import { describe, it, expect } from 'vitest';
import { cleanBBCode } from '../bbcode';

describe('cleanBBCode', () => {
    it('should clean simple strings', () => {
        expect(cleanBBCode('  hello   world  ', false)).toBe(' hello world ');
    });
});
```

### Example Test (for a React component)

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/test-utils';
import { ActionButton } from '../action-button';

describe('ActionButton', () => {
  it('renders with correct label', () => {
    render(<ActionButton label="Copy" title="Copy" Icon={SomeIcon} onClick={() => {}} />);
    expect(screen.getByText('Copy')).toBeInTheDocument();
  });
});
```

### Coverage

- Coverage reports are generated in the `coverage/` directory when running `npm run test:coverage`.
- Ensure new code is covered by tests and aim for high coverage, especially for core logic and rendering modes.

## Build Configuration

### Vite Setup

- Path alias `@/` points to `src/` directory

### TypeScript Configuration

- Strict mode enabled with comprehensive checks
- Separate configs for app and node environments
- Modern ES2020+ target with DOM libraries
- Verbatim module syntax for better tree-shaking

### ESLint Rules

- Extends strict TypeScript recommended rules
- React-specific rules for hooks and patterns
- Prettier integration for consistent formatting
- Custom rules for React refresh and accessibility

Remember: This project prioritizes code quality, type safety, and maintainability while providing a seamless user experience for Markdown to BBCode conversion.
