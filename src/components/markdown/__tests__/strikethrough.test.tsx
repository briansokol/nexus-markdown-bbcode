import { render, screen } from '@/test/test-utils';
import { describe, expect, it } from 'vitest';
import { Strikethrough } from '../strikethrough';

describe('Strikethrough', () => {
    /**
     * Test that Strikethrough component renders as del element in html mode
     */
    it('should render as del element in html mode', () => {
        render(<Strikethrough mode="html">Struck text</Strikethrough>);

        const strikethroughElement = screen.getByText('Struck text');
        expect(strikethroughElement).toBeInTheDocument();
        expect(strikethroughElement.tagName).toBe('DEL');
    });

    /**
     * Test that Strikethrough component renders BBCode in bbcode mode
     */
    it('should render BBCode in bbcode mode', () => {
        render(<Strikethrough mode="bbcode">Struck text</Strikethrough>);

        expect(screen.getByText('[s]Struck text[/s]')).toBeInTheDocument();
    });

    /**
     * Test that Strikethrough component handles empty children
     */
    it('should handle empty children', () => {
        const { container } = render(<Strikethrough mode="html"></Strikethrough>);

        const strikethroughElement = container.querySelector('del');
        expect(strikethroughElement).toBeInTheDocument();
        expect(strikethroughElement).toBeEmptyDOMElement();
    });

    /**
     * Test that Strikethrough component handles nested elements in html mode
     */
    it('should handle nested elements in html mode', () => {
        render(
            <Strikethrough mode="html">
                <span>Nested</span> content
            </Strikethrough>,
        );

        const strikethroughElement = screen.getByText('content').closest('del');
        expect(strikethroughElement).toBeInTheDocument();
        expect(screen.getByText('Nested')).toBeInTheDocument();
    });

    /**
     * Test that Strikethrough component handles nested elements in bbcode mode
     */
    it('should handle nested elements in bbcode mode', () => {
        render(
            <Strikethrough mode="bbcode">
                <span>Nested</span> content
            </Strikethrough>,
        );

        const text = screen.getByText(/\[s\].*\[\/s\]/);
        expect(text).toBeInTheDocument();
        expect(text.textContent).toContain('[s]');
        expect(text.textContent).toContain('[/s]');
        expect(text.textContent).toContain('Nested');
        expect(text.textContent).toContain('content');
    });

    /**
     * Test that Strikethrough component cleans whitespace properly
     */
    it('should clean whitespace in children', () => {
        render(<Strikethrough mode="bbcode">{'  Text  with   spaces  '}</Strikethrough>);

        const text = screen.getByText(/\[s\].*\[\/s\]/);
        expect(text.textContent).toMatch(/\[s\]\s*Text with spaces\s*\[\/s\]/);
    });

    /**
     * Test that Strikethrough component handles line breaks
     */
    it('should handle line breaks in children', () => {
        render(<Strikethrough mode="bbcode">{'Text\nwith\nbreaks'}</Strikethrough>);

        const text = screen.getByText(/\[s\].*\[\/s\]/);
        expect(text.textContent).toContain('[s]Text with breaks[/s]');
    });

    /**
     * Test that Strikethrough component handles combination with other formatting
     */
    it('should handle combination with other formatting in html mode', () => {
        render(
            <Strikethrough mode="html">
                <strong>Bold struck</strong> text
            </Strikethrough>,
        );

        const strikethroughElement = screen.getByText('text').closest('del');
        const boldElement = screen.getByText('Bold struck');
        expect(strikethroughElement).toBeInTheDocument();
        expect(boldElement).toBeInTheDocument();
        expect(boldElement.tagName).toBe('STRONG');
    });
});
