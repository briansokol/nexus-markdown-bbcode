import { render, screen } from '@/test/test-utils';
import { describe, expect, it } from 'vitest';
import { Emphasized } from '../emphasized';

describe('Emphasized', () => {
    /**
     * Test that Emphasized component renders as em element in html mode
     */
    it('should render as em element in html mode', () => {
        render(<Emphasized mode="html">Italic text</Emphasized>);

        const emphasisElement = screen.getByText('Italic text');
        expect(emphasisElement).toBeInTheDocument();
        expect(emphasisElement.tagName).toBe('EM');
    });

    /**
     * Test that Emphasized component renders BBCode in bbcode mode
     */
    it('should render BBCode in bbcode mode', () => {
        render(<Emphasized mode="bbcode">Italic text</Emphasized>);

        expect(screen.getByText('[i]Italic text[/i]')).toBeInTheDocument();
    });

    /**
     * Test that Emphasized component handles empty children
     */
    it('should handle empty children', () => {
        const { container } = render(<Emphasized mode="html"></Emphasized>);

        const emphasisElement = container.querySelector('em');
        expect(emphasisElement).toBeInTheDocument();
        expect(emphasisElement).toBeEmptyDOMElement();
    });

    /**
     * Test that Emphasized component handles nested elements in html mode
     */
    it('should handle nested elements in html mode', () => {
        render(
            <Emphasized mode="html">
                <span>Nested</span> content
            </Emphasized>,
        );

        const emphasisElement = screen.getByText('content').closest('em');
        expect(emphasisElement).toBeInTheDocument();
        expect(screen.getByText('Nested')).toBeInTheDocument();
    });

    /**
     * Test that Emphasized component handles nested elements in bbcode mode
     */
    it('should handle nested elements in bbcode mode', () => {
        render(
            <Emphasized mode="bbcode">
                <span>Nested</span> content
            </Emphasized>,
        );

        const text = screen.getByText(/\[i\].*\[\/i\]/);
        expect(text).toBeInTheDocument();
        expect(text.textContent).toContain('[i]');
        expect(text.textContent).toContain('[/i]');
        expect(text.textContent).toContain('Nested');
        expect(text.textContent).toContain('content');
    });

    /**
     * Test that Emphasized component cleans whitespace properly
     */
    it('should clean whitespace in children', () => {
        render(<Emphasized mode="bbcode">{'  Text  with   spaces  '}</Emphasized>);

        const text = screen.getByText(/\[i\].*\[\/i\]/);
        expect(text.textContent).toMatch(/\[i\]\s*Text with spaces\s*\[\/i\]/);
    });

    /**
     * Test that Emphasized component handles line breaks
     */
    it('should handle line breaks in children', () => {
        render(<Emphasized mode="bbcode">{'Text\nwith\nbreaks'}</Emphasized>);

        const text = screen.getByText(/\[i\].*\[\/i\]/);
        expect(text.textContent).toContain('[i]Text with breaks[/i]');
    });
});
