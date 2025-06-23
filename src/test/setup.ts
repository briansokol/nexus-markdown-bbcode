import '@testing-library/jest-dom';

/**
 * Global test setup file for Vitest and React Testing Library.
 * This file is automatically executed before running tests.
 */

// Mock ResizeObserver which is not available in jsdom
global.ResizeObserver = class ResizeObserver {
    observe(): void {
        // Mock implementation
    }
    unobserve(): void {
        // Mock implementation
    }
    disconnect(): void {
        // Mock implementation
    }
};

// Mock matchMedia which is not available in jsdom
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: (): void => {
            // Mock implementation
        },
        removeListener: (): void => {
            // Mock implementation
        },
        addEventListener: (): void => {
            // Mock implementation
        },
        removeEventListener: (): void => {
            // Mock implementation
        },
        dispatchEvent: (): boolean => {
            // Mock implementation
            return false;
        },
    }),
});
