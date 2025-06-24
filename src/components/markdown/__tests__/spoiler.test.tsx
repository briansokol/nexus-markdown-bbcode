import { render, screen } from '@/test/test-utils';
import { describe, expect, it } from 'vitest';
import { Spoiler } from '../spoiler';

describe('Spoiler', () => {
    /**
     * Test that Spoiler component renders as div with spoiler class in html mode
     */
    it('should render as div with spoiler class in html mode', () => {
        render(<Spoiler mode="html">Spoiler content</Spoiler>);

        const spoilerElement = screen.getByText('Spoiler content');
        expect(spoilerElement).toBeInTheDocument();
        expect(spoilerElement.tagName).toBe('DIV');
        expect(spoilerElement).toHaveClass('spoiler');
    });

    /**
     * Test that Spoiler component renders BBCode in bbcode mode
     */
    it('should render BBCode in bbcode mode', () => {
        render(<Spoiler mode="bbcode">Spoiler content</Spoiler>);

        expect(screen.getByText('[spoiler]Spoiler content[/spoiler]')).toBeInTheDocument();
    });

    /**
     * Test that Spoiler component handles empty children
     */
    it('should handle empty children', () => {
        const { container } = render(<Spoiler mode="html"></Spoiler>);

        const spoilerElement = container.querySelector('div.spoiler');
        expect(spoilerElement).toBeInTheDocument();
        expect(spoilerElement).toBeEmptyDOMElement();
    });

    /**
     * Test that Spoiler component handles nested elements in html mode
     */
    it('should handle nested elements in html mode', () => {
        render(
            <Spoiler mode="html">
                <p>Hidden paragraph</p>
                <span>Hidden span</span>
            </Spoiler>,
        );

        const spoilerElement = screen.getByText('Hidden paragraph').closest('div');
        expect(spoilerElement).toBeInTheDocument();
        expect(spoilerElement).toHaveClass('spoiler');
        expect(screen.getByText('Hidden paragraph')).toBeInTheDocument();
        expect(screen.getByText('Hidden span')).toBeInTheDocument();
    });

    /**
     * Test that Spoiler component handles nested elements in bbcode mode
     */
    it('should handle nested elements in bbcode mode', () => {
        render(
            <Spoiler mode="bbcode">
                <span>Hidden</span> content
            </Spoiler>,
        );

        const text = screen.getByText(/\[spoiler\].*\[\/spoiler\]/);
        expect(text).toBeInTheDocument();
        expect(text.textContent).toContain('[spoiler]');
        expect(text.textContent).toContain('[/spoiler]');
        expect(text.textContent).toContain('Hidden');
        expect(text.textContent).toContain('content');
    });

    /**
     * Test that Spoiler component cleans whitespace properly
     */
    it('should clean whitespace in children', () => {
        render(<Spoiler mode="bbcode">{'  Text  with   spaces  '}</Spoiler>);

        const text = screen.getByText(/\[spoiler\].*\[\/spoiler\]/);
        expect(text.textContent).toMatch(/\[spoiler\]\s*Text with spaces\s*\[\/spoiler\]/);
    });

    /**
     * Test that Spoiler component handles line breaks
     */
    it('should handle line breaks in children', () => {
        render(<Spoiler mode="bbcode">{'Text\nwith\nbreaks'}</Spoiler>);

        const text = screen.getByText(/\[spoiler\].*\[\/spoiler\]/);
        expect(text.textContent).toContain('[spoiler]Text with breaks[/spoiler]');
    });

    /**
     * Test that Spoiler component handles multi-line content
     */
    it('should handle multi-line content', () => {
        render(
            <Spoiler mode="html">
                Line 1{'\n'}Line 2{'\n'}Line 3
            </Spoiler>,
        );

        const spoilerElement = screen.getByText(/Line 1.*Line 2.*Line 3/);
        expect(spoilerElement).toBeInTheDocument();
        expect(spoilerElement).toHaveClass('spoiler');
    });
});
