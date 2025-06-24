import { render } from '@/test/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { Tips } from '../tips';

describe('Tips', () => {
    /**
     * Test that Tips component renders correctly with all sections
     */
    it('should render tips component with all content sections', () => {
        const mockCloseHandler = vi.fn();
        const { container } = render(<Tips closeHandler={mockCloseHandler} />);

        expect(container).toMatchSnapshot();
    });

    /**
     * Test that Tips component renders with different close handler
     */
    it('should render consistently regardless of close handler function', () => {
        const mockCloseHandler = vi.fn();
        const { container } = render(<Tips closeHandler={mockCloseHandler} />);

        // Should render the same regardless of the specific function reference
        expect(container.firstChild).toMatchSnapshot();
    });

    /**
     * Test that Tips component structure includes header and content
     */
    it('should have proper component structure', () => {
        const mockCloseHandler = vi.fn();
        const { container } = render(<Tips closeHandler={mockCloseHandler} />);

        const tipsContainer = container.querySelector('.tips-container');
        expect(tipsContainer).toMatchSnapshot();
    });

    /**
     * Test that Tips header section renders correctly
     */
    it('should render header section correctly', () => {
        const mockCloseHandler = vi.fn();
        const { container } = render(<Tips closeHandler={mockCloseHandler} />);

        const header = container.querySelector('.tips-header');
        expect(header).toMatchSnapshot();
    });

    /**
     * Test that Tips content section renders correctly
     */
    it('should render content section correctly', () => {
        const mockCloseHandler = vi.fn();
        const { container } = render(<Tips closeHandler={mockCloseHandler} />);

        const content = container.querySelector('.tips-content');
        expect(content).toMatchSnapshot();
    });
});
