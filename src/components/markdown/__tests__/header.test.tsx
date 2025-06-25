import { render, screen } from '@/test/test-utils';
import { describe, expect, it } from 'vitest';
import { Header } from '../header';

describe('Header', () => {
    /**
     * Test that Header component renders as h1 element in html mode
     */
    it('should render as h1 element for level 1 in html mode', () => {
        render(
            <Header mode="html" level="1">
                Header text
            </Header>,
        );

        const headerElement = screen.getByText('Header text');
        expect(headerElement).toBeInTheDocument();
        expect(headerElement.tagName).toBe('H1');
        expect(headerElement.tagName).toBe('H1');
    });

    /**
     * Test that Header component renders as h2 element in html mode
     */
    it('should render as h2 element for level 2 in html mode', () => {
        render(
            <Header mode="html" level="2">
                Header text
            </Header>,
        );

        const headerElement = screen.getByText('Header text');
        expect(headerElement).toBeInTheDocument();
        expect(headerElement.tagName).toBe('H2');
        expect(headerElement.tagName).toBe('H2');
    });

    /**
     * Test that Header component renders level 1 BBCode in bbcode mode
     */
    it('should render level 1 BBCode in bbcode mode', () => {
        render(
            <Header mode="bbcode" level="1">
                Header text
            </Header>,
        );

        const text = screen.getByText(
            /\[size=5\]\[font=Trebuchet MS\]\[b\]\[color=#a5c4f3\].*\[\/color\]\[\/b\]\[\/font\]\[\/size\]/,
        );
        expect(text).toBeInTheDocument();
        expect(text.textContent).toContain(
            '[size=5][font=Trebuchet MS][b][color=#a5c4f3]HEADER TEXT[/color][/b][/font][/size]',
        );
        expect(text.textContent).toContain('\n');
    });

    /**
     * Test that Header component renders level 2 BBCode in bbcode mode
     */
    it('should render level 2 BBCode in bbcode mode', () => {
        render(
            <Header mode="bbcode" level="2">
                Header text
            </Header>,
        );

        const text = screen.getByText(
            /\[size=4\]\[font=Trebuchet MS\]\[b\]\[i\]\[color=#a5c4f3\].*\[\/color\]\[\/i\]\[\/b\]\[\/font\]\[\/size\]/,
        );
        expect(text).toBeInTheDocument();
        expect(text.textContent).toContain(
            '[size=4][font=Trebuchet MS][b][i][color=#a5c4f3]HEADER TEXT[/color][/i][/b][/font][/size]',
        );
        expect(text.textContent).toContain('\n');
    });

    /**
     * Test that Header component handles empty children
     */
    it('should handle empty children', () => {
        const { container } = render(<Header mode="html" level="1"></Header>);

        const headerElement = container.querySelector('h1');
        expect(headerElement).toBeInTheDocument();
        expect(headerElement?.tagName).toBe('H1');
    });

    /**
     * Test that Header component converts text to uppercase in bbcode mode
     */
    it('should convert text to uppercase in bbcode mode', () => {
        render(
            <Header mode="bbcode" level="1">
                lowercase header
            </Header>,
        );

        const text = screen.getByText(
            /\[size=5\]\[font=Trebuchet MS\]\[b\]\[color=#a5c4f3\].*\[\/color\]\[\/b\]\[\/font\]\[\/size\]/,
        );
        expect(text.textContent).toContain('LOWERCASE HEADER');
    });

    /**
     * Test that Header component handles nested elements in html mode
     */
    it('should handle nested elements in html mode', () => {
        render(
            <Header mode="html" level="1">
                <span>Nested</span> content
            </Header>,
        );

        const headerElement = screen.getByText('content').closest('h1');
        expect(headerElement).toBeInTheDocument();
        expect(headerElement?.tagName).toBe('H1');
        expect(screen.getByText('Nested')).toBeInTheDocument();
    });

    /**
     * Test that Header component cleans and uppercases nested content in bbcode mode
     */
    it('should clean and uppercase nested content in bbcode mode', () => {
        render(
            <Header mode="bbcode" level="2">
                <span>nested</span> header content
            </Header>,
        );

        const text = screen.getByText(
            /\[size=4\]\[font=Trebuchet MS\]\[b\]\[i\]\[color=#a5c4f3\].*\[\/color\]\[\/i\]\[\/b\]\[\/font\]\[\/size\]/,
        );
        expect(text.textContent).toContain('NESTED HEADER CONTENT');
    });
});
