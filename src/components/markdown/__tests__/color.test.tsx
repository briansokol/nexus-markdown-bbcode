import { render, screen } from '@/test/test-utils';
import { Colors } from '@/types/components';
import { describe, expect, it } from 'vitest';
import { Color } from '../color';

describe('Color', () => {
    /**
     * Test that Color component renders as span with red color in html mode
     */
    it('should render red colored span in html mode', () => {
        render(
            <Color mode="html" textColor={Colors.Red}>
                Red text
            </Color>,
        );

        const colorElement = screen.getByText('Red text');
        expect(colorElement).toBeInTheDocument();
        expect(colorElement.tagName).toBe('SPAN');
        expect(colorElement).toHaveStyle({ color: '#e06666' });
    });

    /**
     * Test that Color component renders as span with green color in html mode
     */
    it('should render green colored span in html mode', () => {
        render(
            <Color mode="html" textColor={Colors.Green}>
                Green text
            </Color>,
        );

        const colorElement = screen.getByText('Green text');
        expect(colorElement).toBeInTheDocument();
        expect(colorElement.tagName).toBe('SPAN');
        expect(colorElement).toHaveStyle({ color: '#93c47d' });
    });

    /**
     * Test that Color component renders as span with blue color in html mode
     */
    it('should render blue colored span in html mode', () => {
        render(
            <Color mode="html" textColor={Colors.Blue}>
                Blue text
            </Color>,
        );

        const colorElement = screen.getByText('Blue text');
        expect(colorElement).toBeInTheDocument();
        expect(colorElement.tagName).toBe('SPAN');
        expect(colorElement).toHaveStyle({ color: '#6fa8dc' });
    });

    /**
     * Test that Color component renders as span with yellow color in html mode
     */
    it('should render yellow colored span in html mode', () => {
        render(
            <Color mode="html" textColor={Colors.Yellow}>
                Yellow text
            </Color>,
        );

        const colorElement = screen.getByText('Yellow text');
        expect(colorElement).toBeInTheDocument();
        expect(colorElement.tagName).toBe('SPAN');
        expect(colorElement).toHaveStyle({ color: '#ffd966' });
    });

    /**
     * Test that Color component renders red BBCode in bbcode mode
     */
    it('should render red BBCode in bbcode mode', () => {
        render(
            <Color mode="bbcode" textColor={Colors.Red}>
                Red text
            </Color>,
        );

        expect(screen.getByText('[color=#e06666]Red text[/color]')).toBeInTheDocument();
    });

    /**
     * Test that Color component renders green BBCode in bbcode mode
     */
    it('should render green BBCode in bbcode mode', () => {
        render(
            <Color mode="bbcode" textColor={Colors.Green}>
                Green text
            </Color>,
        );

        expect(screen.getByText('[color=#93c47d]Green text[/color]')).toBeInTheDocument();
    });

    /**
     * Test that Color component renders blue BBCode in bbcode mode
     */
    it('should render blue BBCode in bbcode mode', () => {
        render(
            <Color mode="bbcode" textColor={Colors.Blue}>
                Blue text
            </Color>,
        );

        expect(screen.getByText('[color=#6fa8dc]Blue text[/color]')).toBeInTheDocument();
    });

    /**
     * Test that Color component renders yellow BBCode in bbcode mode
     */
    it('should render yellow BBCode in bbcode mode', () => {
        render(
            <Color mode="bbcode" textColor={Colors.Yellow}>
                Yellow text
            </Color>,
        );

        expect(screen.getByText('[color=#ffd966]Yellow text[/color]')).toBeInTheDocument();
    });

    /**
     * Test that Color component handles empty children
     */
    it('should handle empty children', () => {
        const { container } = render(<Color mode="html" textColor={Colors.Red}></Color>);

        const colorElement = container.querySelector('span');
        expect(colorElement).toBeInTheDocument();
        expect(colorElement).toBeEmptyDOMElement();
        expect(colorElement).toHaveStyle({ color: '#e06666' });
    });

    /**
     * Test that Color component handles nested elements
     */
    it('should handle nested elements', () => {
        render(
            <Color mode="html" textColor={Colors.Blue}>
                <strong>Bold</strong> blue text
            </Color>,
        );

        const colorElement = screen.getByText('blue text').closest('span');
        expect(colorElement).toBeInTheDocument();
        expect(colorElement).toHaveStyle({ color: '#6fa8dc' });
        expect(screen.getByText('Bold')).toBeInTheDocument();
    });
});
