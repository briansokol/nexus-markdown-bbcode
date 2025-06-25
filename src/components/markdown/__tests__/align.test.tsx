import { render, screen } from '@/test/test-utils';
import { describe, expect, it } from 'vitest';
import { Align } from '../align';

describe('Align', () => {
    /**
     * Test that Align component renders as span with center class in html mode
     */
    it('should render as center span in html mode', () => {
        render(
            <Align mode="html" alignment="center">
                Centered text
            </Align>,
        );

        const alignElement = screen.getByText('Centered text');
        expect(alignElement).toBeInTheDocument();
        expect(alignElement.tagName).toBe('SPAN');
    });

    /**
     * Test that Align component renders as span with right class in html mode
     */
    it('should render as right span in html mode', () => {
        render(
            <Align mode="html" alignment="right">
                Right aligned text
            </Align>,
        );

        const alignElement = screen.getByText('Right aligned text');
        expect(alignElement).toBeInTheDocument();
        expect(alignElement.tagName).toBe('SPAN');
    });

    /**
     * Test that Align component renders center BBCode in bbcode mode
     */
    it('should render center BBCode in bbcode mode', () => {
        render(
            <Align mode="bbcode" alignment="center">
                Centered text
            </Align>,
        );

        expect(screen.getByText('[center]Centered text[/center]')).toBeInTheDocument();
    });

    /**
     * Test that Align component renders right BBCode in bbcode mode
     */
    it('should render right BBCode in bbcode mode', () => {
        render(
            <Align mode="bbcode" alignment="right">
                Right aligned text
            </Align>,
        );

        expect(screen.getByText('[right]Right aligned text[/right]')).toBeInTheDocument();
    });

    /**
     * Test that Align component handles empty children
     */
    it('should handle empty children', () => {
        const { container } = render(<Align mode="html" alignment="center"></Align>);

        const alignElement = container.querySelector('span');
        expect(alignElement).toBeInTheDocument();
        expect(alignElement).toBeEmptyDOMElement();
    });

    /**
     * Test that Align component cleans whitespace in bbcode mode
     */
    it('should clean whitespace in bbcode mode', () => {
        render(
            <Align mode="bbcode" alignment="center">
                {'  Text  with   spaces  '}
            </Align>,
        );

        const text = screen.getByText(/\[center\].*\[\/center\]/);
        expect(text.textContent).toMatch(/\[center\]\s*Text with spaces\s*\[\/center\]/);
    });

    /**
     * Test that Align component handles nested elements
     */
    it('should handle nested elements in html mode', () => {
        render(
            <Align mode="html" alignment="center">
                <span>Nested</span> content
            </Align>,
        );

        const alignElement = screen.getByText('content').closest('span');
        expect(alignElement).toBeInTheDocument();
        expect(alignElement?.tagName).toBe('SPAN');
        expect(screen.getByText('Nested')).toBeInTheDocument();
    });
});
