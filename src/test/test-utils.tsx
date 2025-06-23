import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';

/**
 * Custom render function that wraps React Testing Library's render
 * with any providers or global setup needed for testing components.
 *
 * @param ui - The React component to render
 * @param options - Additional render options
 * @returns The render result from React Testing Library
 */
function customRender(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
    return render(ui, {
        // Add any providers here if needed in the future
        // wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
        ...options,
    });
}

// Re-export commonly used testing utilities
export {
    cleanup,
    findByLabelText,
    findByRole,
    findByTestId,
    findByText,
    fireEvent,
    getByLabelText,
    getByRole,
    getByTestId,
    getByText,
    queryByLabelText,
    queryByRole,
    queryByTestId,
    queryByText,
    screen,
    waitFor,
    waitForElementToBeRemoved,
    within,
} from '@testing-library/react';

// Override render method
export { customRender as render };
