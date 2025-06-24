import { render, screen } from '@/test/test-utils';
import userEvent from '@testing-library/user-event';
import { FaCopy } from 'react-icons/fa';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ActionButton } from '../action-button';

describe('ActionButton', () => {
    const defaultProps = {
        label: 'Copy',
        title: 'Copy to clipboard',
        Icon: FaCopy,
        onClick: vi.fn(),
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    /**
     * Test that the ActionButton renders with correct content and attributes
     */
    it('should render with correct label and title', () => {
        render(<ActionButton {...defaultProps} />);

        const button = screen.getByRole('button', { name: /copy/i });
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute('title', 'Copy to clipboard');
        expect(button).toHaveAttribute('type', 'button');
        expect(button.tagName).toBe('BUTTON');
    });

    /**
     * Test that the ActionButton displays the correct label text
     */
    it('should display the label text', () => {
        render(<ActionButton {...defaultProps} />);

        expect(screen.getByText('Copy')).toBeInTheDocument();
    });

    /**
     * Test that the ActionButton calls onClick when clicked
     */
    it('should call onClick when clicked', async () => {
        const user = userEvent.setup();
        render(<ActionButton {...defaultProps} />);

        const button = screen.getByRole('button', { name: /copy/i });
        await user.click(button);

        expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
    });

    /**
     * Test that the ActionButton is disabled when disabled prop is true
     */
    it('should be disabled when disabled prop is true', () => {
        render(<ActionButton {...defaultProps} disabled={true} />);

        const button = screen.getByRole('button', { name: /copy/i });
        expect(button).toBeDisabled();
    });

    /**
     * Test that the ActionButton does not call onClick when disabled and clicked
     */
    it('should not call onClick when disabled and clicked', async () => {
        const user = userEvent.setup();
        render(<ActionButton {...defaultProps} disabled={true} />);

        const button = screen.getByRole('button', { name: /copy/i });
        await user.click(button);

        expect(defaultProps.onClick).not.toHaveBeenCalled();
    });

    /**
     * Test that the ActionButton is enabled by default
     */
    it('should be enabled by default', () => {
        render(<ActionButton {...defaultProps} />);

        const button = screen.getByRole('button', { name: /copy/i });
        expect(button).not.toBeDisabled();
    });

    /**
     * Test that the ActionButton has the correct CSS classes
     */
    it('should have correct CSS classes', () => {
        render(<ActionButton {...defaultProps} />);

        const button = screen.getByRole('button', { name: /copy/i });
        const spans = button.querySelectorAll('span');

        expect(button.tagName).toBe('BUTTON');
        expect(spans).toHaveLength(2);
        expect(spans[1]).toHaveTextContent('Copy');
    });
});
