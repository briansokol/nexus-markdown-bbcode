# Contributing to Nexus Markdown to BBCode Editor

Thank you for your interest in contributing to the Nexus Markdown to BBCode Editor! This guide will help you get started and ensure that your contributions align with the project's standards.

## Table of Contents

- [Project Overview](#project-overview)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Submitting Contributions](#submitting-contributions)
- [Testing](#testing)
- [Project Architecture](#project-architecture)
- [Common Tasks](#common-tasks)

## Project Overview

This is a React-based web application that converts Markdown content to BBCode format suitable for Nexus Mods. The project builds to a single HTML file that can run independently in any browser.

### Technology Stack

- **React 19** with TypeScript
- **Vite** as the build tool with SWC for fast compilation
- **react-markdown** for parsing and rendering markdown content
- **ESLint** with TypeScript, React, and Prettier integration
- **Prettier** with organize imports plugin

## Getting Started

### Prerequisites

- **Node.js 22.x** (check `package.json` engines field for exact version)
- **npm** (comes with Node.js)

### Setup

1. **Fork and clone the repository**

    ```bash
    git clone https://github.com/your-username/nexus-markdown-bbcode.git
    cd nexus-markdown-bbcode
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Start the development server**

    ```bash
    npm run dev
    ```

4. **Open your browser** to the URL shown in the terminal (typically `http://localhost:5173`)

### Available Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (outputs to `dist/`)
- `npm run lint` - Run ESLint to check code quality
- `npm run format` - Format code with Prettier
- `npm run preview` - Preview the production build locally

## Development Workflow

### Before Making Changes

1. **Create a new branch** for your feature or bug fix:

    ```bash
    git checkout -b feature/your-feature-name
    # or
    git checkout -b fix/issue-description
    ```

2. **Run the development server** and verify everything works:
    ```bash
    npm run dev
    ```

### Making Changes

1. **Follow the code standards** outlined below
2. **Test your changes** in both HTML and BBCode preview modes
3. **Ensure your code passes linting**:
    ```bash
    npm run lint
    ```
4. **Format your code**:
    ```bash
    npm run format
    ```

### Before Committing

The project uses **Husky** and **lint-staged** for pre-commit hooks. Before each commit, the following will run automatically:

- Code formatting with Prettier
- ESLint checks
- TypeScript compilation and build

If any of these fail, the commit will be rejected. Fix the issues and try again.

## Code Standards

### TypeScript Conventions

- **Use strict TypeScript configuration** - the project has strict null checks enabled
- **Prefer `interface` over `type`** for object shapes
- **Use `type` for unions, primitives, and computed types**
- **Always provide explicit return types** for functions
- **Use `React.ReactNode`** for children props

### JSDoc Requirements

**ALWAYS add JSDoc comments** to all classes and functions:

```typescript
/**
 * Converts markdown content to BBCode format
 * @param content - The markdown content to convert
 * @param options - Conversion options
 * @returns The converted BBCode string
 */
function convertToBBCode(content: string, options: ConversionOptions): string {
    // Implementation
}
```

### Component Patterns

All components should follow the **dual-mode rendering pattern**:

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
    if (mode === 'bbcode') {
        // Return BBCode string
        return `[tag]${children}[/tag]`;
    }

    // Return JSX for HTML mode
    return <div>{children}</div>;
}
```

### Import/Export Patterns

- **Use named exports** for components and utilities
- **Import React types** with `type` keyword:
    ```typescript
    import type { ReactNode } from 'react';
    ```
- **Organize imports** - prettier-plugin-organize-imports will handle this
- **Use absolute imports** with `@/` alias for src directory

### File Organization

```
src/
├── components/          # Reusable React components
│   ├── componentName.tsx
│   └── componentName.css  # Co-located styles
├── utils/              # Utility functions and hooks
├── types/              # TypeScript type definitions
└── app.tsx             # Main application component
```

### File Naming Conventions

- **Components**: camelCase (e.g., `header.tsx`)
- **Utilities**: camelCase (e.g., `bbcode.ts`)
- **Types**: camelCase (e.g., `components.ts`)
- **CSS**: match component name (e.g., `header.css`)

### Styling Guidelines

- **Use CSS files co-located with components**
- **Write responsive designs** using flexbox/grid
- **Follow existing naming patterns** for CSS classes
- **Avoid inline styles** unless absolutely necessary

## Testing

### Manual Testing Checklist

When making changes, ensure you test:

- [ ] **Both rendering modes**: HTML preview and BBCode output
- [ ] **Markdown parsing**: Various markdown elements render correctly
- [ ] **File operations**: Import/export functionality works
- [ ] **Responsive design**: UI works on different screen sizes
- [ ] **Build process**: `npm run build` completes successfully
- [ ] **Edge cases**: Empty content, invalid markdown, large files

### Automated Checks

The project runs these checks automatically:

- **ESLint**: Code quality and React best practices
- **TypeScript**: Type checking and compilation
- **Prettier**: Code formatting
- **Build verification**: Ensures production build works

## Project Architecture

### Core Concepts

1. **Mode-based Rendering**: Components conditionally render HTML or BBCode based on `mode` prop
2. **Custom React Hooks**: Use `useCleanChildren` for processing ReactNode content
3. **Type Safety**: Strict TypeScript with comprehensive type checking
4. **Component Composition**: ReactMarkdown with custom component overrides

### Key Files

- `src/app.tsx` - Main application component
- `src/bbcode.tsx` - BBCode preview component
- `src/markdown.tsx` - Markdown input component
- `src/components/` - Custom markdown renderers
- `src/utils/bbcode.ts` - BBCode conversion utilities
- `src/types/components.ts` - TypeScript interfaces

## Common Tasks

### Adding a New Markdown Element

1. **Create the component** in `src/components/`:

    ```typescript
    // src/components/newElement.tsx
    import type { BBCodeComponentProps } from '@/types/components';

    interface NewElementProps extends BBCodeComponentProps {
        // Additional props
    }

    export function NewElement({ mode, children }: NewElementProps) {
        if (mode === 'bbcode') {
            return `[newtag]${children}[/newtag]`;
        }
        return <div className="new-element">{children}</div>;
    }
    ```

2. **Add styles** in `src/components/newElement.css`

3. **Register the component** in the markdown renderer

4. **Test both HTML and BBCode output**

### Modifying BBCode Output

1. **Update the component** that handles the element
2. **Test with various content types**
3. **Verify the output** works on Nexus Mods forums

### Adding Utility Functions

1. **Create or modify files** in `src/utils/`
2. **Add comprehensive JSDoc comments**
3. **Export the function** for use in components
4. **Add TypeScript types** as needed

## Submitting Contributions

### Pull Request Process

1. **Ensure all checks pass**:

    ```bash
    npm run lint
    npm run build
    ```

2. **Create a descriptive pull request**:

    - Clear title and description
    - Reference any related issues
    - Include screenshots for UI changes
    - List testing performed

3. **Be responsive to feedback** and make requested changes promptly

### Commit Message Guidelines

Use clear, descriptive commit messages:

- `feat: add support for strikethrough text`
- `fix: resolve BBCode output for nested lists`
- `docs: update README with new installation steps`
- `style: improve responsive layout for mobile`

### Code Review Criteria

Your code will be reviewed for:

- **Functionality**: Does it work as intended?
- **Code quality**: Follows project standards and best practices
- **TypeScript**: Proper typing and no type errors
- **Performance**: Efficient and optimized
- **Accessibility**: Follows web accessibility guidelines
- **Documentation**: Proper JSDoc comments

## Getting Help

If you need help or have questions:

1. **Check existing issues** on GitHub
2. **Create a new issue** with detailed information
3. **Ask questions** in pull request discussions

Thank you for contributing to the Nexus Markdown to BBCode Editor! Your contributions help make the tool better for the entire Community Shaders modding community.
