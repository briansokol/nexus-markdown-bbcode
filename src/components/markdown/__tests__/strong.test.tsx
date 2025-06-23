import { render, screen } from '@/test/test-utils';
import { describe, expect, it } from 'vitest';
import { Strong } from '../strong';

describe('Strong', () => {
    /**
     * Test that Strong component renders as HTML strong element in html mode
     */
    it('should render as strong element in html mode', () => {
        render(<Strong mode="html">Bold text</Strong>);

        const strongElement = screen.getByText('Bold text');
        expect(strongElement).toBeInTheDocument();
        expect(strongElement.tagName).toBe('STRONG');
    });

    /**
     * Test that Strong component renders BBCode in bbcode mode
     */
    it('should render BBCode in bbcode mode', () => {
        render(<Strong mode="bbcode">Bold text</Strong>);

        expect(screen.getByText('[b]Bold text[/b]')).toBeInTheDocument();
    });

    /**
     * Test that Strong component handles empty children
     */
    it('should handle empty children', () => {
        const { container } = render(<Strong mode="html"></Strong>);

        const strongElement = container.querySelector('strong');
        expect(strongElement).toBeInTheDocument();
        expect(strongElement).toBeEmptyDOMElement();
    });

    /**
     * Test that Strong component handles nested elements in html mode
     */
    it('should handle nested elements in html mode', () => {
        render(
            <Strong mode="html">
                <span>Nested</span> content
            </Strong>,
        );

        const strongElement = screen.getByText('content').closest('strong');
        expect(strongElement).toBeInTheDocument();
        expect(screen.getByText('Nested')).toBeInTheDocument();
    });

    /**
     * Test that Strong component handles nested elements in bbcode mode
     */
    it('should handle nested elements in bbcode mode', () => {
        render(
            <Strong mode="bbcode">
                <span>Nested</span> content
            </Strong>,
        );

        // The component should flatten nested content in BBCode mode
        const text = screen.getByText(/\[b\].*\[\/b\]/);
        expect(text).toBeInTheDocument();
        expect(text.textContent).toContain('[b]');
        expect(text.textContent).toContain('[/b]');
        expect(text.textContent).toContain('Nested');
        expect(text.textContent).toContain('content');
    });

    /**
     * Test that Strong component cleans whitespace properly
     */
    it('should clean whitespace in children', () => {
        render(<Strong mode="bbcode">{'  Text  with   spaces  '}</Strong>);

        const text = screen.getByText(/\[b\].*\[\/b\]/);
        // The useCleanChildren hook should normalize whitespace
        expect(text.textContent).toMatch(/\[b\]\s*Text with spaces\s*\[\/b\]/);
    });

    /**
     * Test that Strong component handles line breaks
     */
    it('should handle line breaks in children', () => {
        render(<Strong mode="bbcode">{'Text\nwith\nbreaks'}</Strong>);

        const text = screen.getByText(/\[b\].*\[\/b\]/);
        // Line breaks should be replaced with spaces
        expect(text.textContent).toContain('[b]Text with breaks[/b]');
    });
});
