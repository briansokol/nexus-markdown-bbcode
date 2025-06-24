import { render, screen } from '@/test/test-utils';
import { describe, expect, it } from 'vitest';
import { Paragraph } from '../paragraph';

describe('Paragraph', () => {
    /**
     * Test that Paragraph component renders as p element with default size in html mode
     */
    it('should render as p element with default size in html mode', () => {
        render(<Paragraph mode="html">Paragraph text</Paragraph>);

        const paragraphElement = screen.getByText('Paragraph text');
        expect(paragraphElement).toBeInTheDocument();
        expect(paragraphElement.tagName).toBe('P');
        expect(paragraphElement).toHaveClass('paragraph');
    });

    /**
     * Test that Paragraph component renders as p element with caption class for size 2
     */
    it('should render as p element with caption class for size 2', () => {
        render(
            <Paragraph mode="html" size={2}>
                Caption text
            </Paragraph>,
        );

        const paragraphElement = screen.getByText('Caption text');
        expect(paragraphElement).toBeInTheDocument();
        expect(paragraphElement.tagName).toBe('P');
        expect(paragraphElement).toHaveClass('caption');
    });

    /**
     * Test that Paragraph component renders as p element with paragraph class for size 3
     */
    it('should render as p element with paragraph class for size 3', () => {
        render(
            <Paragraph mode="html" size={3}>
                Paragraph text
            </Paragraph>,
        );

        const paragraphElement = screen.getByText('Paragraph text');
        expect(paragraphElement).toBeInTheDocument();
        expect(paragraphElement.tagName).toBe('P');
        expect(paragraphElement).toHaveClass('paragraph');
    });

    /**
     * Test that Paragraph component renders default size BBCode in bbcode mode
     */
    it('should render default size BBCode in bbcode mode', () => {
        render(<Paragraph mode="bbcode">Paragraph text</Paragraph>);

        const text = screen.getByText(/\[size=3\].*\[\/size\]/);
        expect(text).toBeInTheDocument();
        expect(text.textContent).toContain('[size=3]Paragraph text[/size]');
        expect(text.textContent).toContain('\n');
    });

    /**
     * Test that Paragraph component renders size 2 BBCode in bbcode mode
     */
    it('should render size 2 BBCode in bbcode mode', () => {
        render(
            <Paragraph mode="bbcode" size={2}>
                Caption text
            </Paragraph>,
        );

        const text = screen.getByText(/\[size=2\].*\[\/size\]/);
        expect(text).toBeInTheDocument();
        expect(text.textContent).toContain('[size=2]Caption text[/size]');
        expect(text.textContent).toContain('\n');
    });

    /**
     * Test that Paragraph component renders size 3 BBCode in bbcode mode
     */
    it('should render size 3 BBCode in bbcode mode', () => {
        render(
            <Paragraph mode="bbcode" size={3}>
                Paragraph text
            </Paragraph>,
        );

        const text = screen.getByText(/\[size=3\].*\[\/size\]/);
        expect(text).toBeInTheDocument();
        expect(text.textContent).toContain('[size=3]Paragraph text[/size]');
        expect(text.textContent).toContain('\n');
    });

    /**
     * Test that Paragraph component handles empty children
     */
    it('should handle empty children', () => {
        const { container } = render(<Paragraph mode="html"></Paragraph>);

        const paragraphElement = container.querySelector('p');
        expect(paragraphElement).toBeInTheDocument();
        expect(paragraphElement).toHaveClass('paragraph');
    });

    /**
     * Test that Paragraph component handles default empty string children
     */
    it('should handle default empty string children', () => {
        const { container } = render(<Paragraph mode="html" />);

        const paragraphElement = container.querySelector('p');
        expect(paragraphElement).toBeInTheDocument();
        expect(paragraphElement).toHaveClass('paragraph');
        expect(paragraphElement?.textContent).toBe('');
    });

    /**
     * Test that Paragraph component handles nested elements in html mode
     */
    it('should handle nested elements in html mode', () => {
        render(
            <Paragraph mode="html">
                <strong>Bold</strong> paragraph text
            </Paragraph>,
        );

        const paragraphElement = screen.getByText('paragraph text').closest('p');
        expect(paragraphElement).toBeInTheDocument();
        expect(paragraphElement).toHaveClass('paragraph');
        expect(screen.getByText('Bold')).toBeInTheDocument();
    });

    /**
     * Test that Paragraph component cleans whitespace in bbcode mode
     */
    it('should clean whitespace in bbcode mode', () => {
        render(<Paragraph mode="bbcode">{'  Text  with   spaces  '}</Paragraph>);

        const text = screen.getByText(/\[size=3\].*\[\/size\]/);
        expect(text.textContent).toMatch(/\[size=3\]\s*Text with spaces\s*\[\/size\]/);
    });
});
