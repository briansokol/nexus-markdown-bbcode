import { render, screen } from '@/test/test-utils';
import { describe, expect, it } from 'vitest';
import { Underline } from '../underline';

describe('Underline', () => {
    /**
     * Test that Underline component renders as ins element in html mode
     */
    it('should render as ins element in html mode', () => {
        render(<Underline mode="html">Underlined text</Underline>);

        const underlineElement = screen.getByText('Underlined text');
        expect(underlineElement).toBeInTheDocument();
        expect(underlineElement.tagName).toBe('INS');
    });

    /**
     * Test that Underline component renders BBCode in bbcode mode
     */
    it('should render BBCode in bbcode mode', () => {
        render(<Underline mode="bbcode">Underlined text</Underline>);

        expect(screen.getByText('[u]Underlined text[/u]')).toBeInTheDocument();
    });

    /**
     * Test that Underline component handles empty children
     */
    it('should handle empty children', () => {
        const { container } = render(<Underline mode="html"></Underline>);

        const underlineElement = container.querySelector('ins');
        expect(underlineElement).toBeInTheDocument();
        expect(underlineElement).toBeEmptyDOMElement();
    });

    /**
     * Test that Underline component handles nested elements in html mode
     */
    it('should handle nested elements in html mode', () => {
        render(
            <Underline mode="html">
                <span>Nested</span> content
            </Underline>,
        );

        const underlineElement = screen.getByText('content').closest('ins');
        expect(underlineElement).toBeInTheDocument();
        expect(screen.getByText('Nested')).toBeInTheDocument();
    });

    /**
     * Test that Underline component handles nested elements in bbcode mode
     */
    it('should handle nested elements in bbcode mode', () => {
        render(
            <Underline mode="bbcode">
                <span>Nested</span> content
            </Underline>,
        );

        const text = screen.getByText(/\[u\].*\[\/u\]/);
        expect(text).toBeInTheDocument();
        expect(text.textContent).toContain('[u]');
        expect(text.textContent).toContain('[/u]');
        expect(text.textContent).toContain('Nested');
        expect(text.textContent).toContain('content');
    });

    /**
     * Test that Underline component cleans whitespace properly
     */
    it('should clean whitespace in children', () => {
        render(<Underline mode="bbcode">{'  Text  with   spaces  '}</Underline>);

        const text = screen.getByText(/\[u\].*\[\/u\]/);
        expect(text.textContent).toMatch(/\[u\]\s*Text with spaces\s*\[\/u\]/);
    });

    /**
     * Test that Underline component handles line breaks
     */
    it('should handle line breaks in children', () => {
        render(<Underline mode="bbcode">{'Text\nwith\nbreaks'}</Underline>);

        const text = screen.getByText(/\[u\].*\[\/u\]/);
        expect(text.textContent).toContain('[u]Text with breaks[/u]');
    });

    /**
     * Test that Underline component handles combination with other formatting
     */
    it('should handle combination with other formatting in html mode', () => {
        render(
            <Underline mode="html">
                <strong>Bold underlined</strong> text
            </Underline>,
        );

        const underlineElement = screen.getByText('text').closest('ins');
        const boldElement = screen.getByText('Bold underlined');
        expect(underlineElement).toBeInTheDocument();
        expect(boldElement).toBeInTheDocument();
        expect(boldElement.tagName).toBe('STRONG');
    });

    /**
     * Test semantic meaning of ins element
     */
    it('should use ins element for semantic underline', () => {
        render(<Underline mode="html">Added text</Underline>);

        const insElement = screen.getByText('Added text');
        expect(insElement.tagName).toBe('INS');
        // The ins element represents inserted/added content semantically
    });
});
