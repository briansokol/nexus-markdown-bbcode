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
