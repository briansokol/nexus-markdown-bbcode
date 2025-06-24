import { render, screen } from '@/test/test-utils';
import { describe, expect, it } from 'vitest';
import { Pre } from '../pre';

describe('Pre', () => {
    /**
     * Test that Pre component renders as pre element in html mode
     */
    it('should render as pre element in html mode', () => {
        render(<Pre mode="html">Preformatted text</Pre>);

        const preElement = screen.getByText('Preformatted text');
        expect(preElement).toBeInTheDocument();
        expect(preElement.tagName).toBe('PRE');
        expect(preElement).toHaveClass('pre-block');
    });

    /**
     * Test that Pre component renders children directly in bbcode mode
     */
    it('should render children directly in bbcode mode', () => {
        render(<Pre mode="bbcode">Raw text content</Pre>);

        expect(screen.getByText('Raw text content')).toBeInTheDocument();
        // Should not have any BBCode tags around it
        expect(screen.queryByText(/\[.*\]/)).not.toBeInTheDocument();
    });

    /**
     * Test that Pre component handles empty children
     */
    it('should handle empty children', () => {
        const { container } = render(<Pre mode="html"></Pre>);

        const preElement = container.querySelector('pre');
        expect(preElement).toBeInTheDocument();
        expect(preElement).toHaveClass('pre-block');
        expect(preElement).toBeEmptyDOMElement();
    });

    /**
     * Test that Pre component preserves whitespace and formatting in html mode
     */
    it('should preserve whitespace and formatting in html mode', () => {
        const preformattedText = '  Line 1\n    Line 2\n      Line 3';
        render(<Pre mode="html">{preformattedText}</Pre>);

        const preElement = screen.getByText(/Line 1/);
        expect(preElement).toBeInTheDocument();
        expect(preElement.tagName).toBe('PRE');
        expect(preElement.textContent).toBe(preformattedText);
        expect(preElement).toHaveClass('pre-block');
    });

    /**
     * Test that Pre component preserves content in bbcode mode
     */
    it('should preserve content in bbcode mode', () => {
        const preformattedText = '  Line 1\n    Line 2\n      Line 3';
        const { container } = render(<Pre mode="bbcode">{preformattedText}</Pre>);

        // The text is rendered as-is with preserved whitespace and line breaks
        expect(container.textContent).toBe(preformattedText);
    });

    /**
     * Test that Pre component handles nested elements in html mode
     */
    it('should handle nested elements in html mode', () => {
        render(
            <Pre mode="html">
                <code>console.log('hello');</code>
                {'\n'}
                <span>More code</span>
            </Pre>,
        );

        const preElement = screen.getByText('More code').closest('pre');
        expect(preElement).toBeInTheDocument();
        expect(preElement).toHaveClass('pre-block');
        expect(screen.getByText("console.log('hello');")).toBeInTheDocument();
        expect(screen.getByText('More code')).toBeInTheDocument();
    });

    /**
     * Test that Pre component passes through nested elements in bbcode mode
     */
    it('should pass through nested elements in bbcode mode', () => {
        render(
            <Pre mode="bbcode">
                <span>Some</span> nested content
            </Pre>,
        );

        // Should render the React elements directly without modification
        expect(screen.getByText('Some')).toBeInTheDocument();
        expect(screen.getByText('nested content')).toBeInTheDocument();
    });

    /**
     * Test that Pre component handles code blocks
     */
    it('should handle code blocks in html mode', () => {
        const codeContent = 'function test() {\n  return "hello";\n}';
        render(<Pre mode="html">{codeContent}</Pre>);

        const preElement = screen.getByText(/function test/);
        expect(preElement).toBeInTheDocument();
        expect(preElement.tagName).toBe('PRE');
        expect(preElement.textContent).toContain('function test()');
        expect(preElement.textContent).toContain('return "hello";');
    });

    /**
     * Test that Pre component doesn't use useCleanChildren
     */
    it('should not clean children content', () => {
        // Unlike other components, Pre should preserve all whitespace exactly
        const textWithSpaces = '  Multiple   spaces   preserved  ';
        render(<Pre mode="html">{textWithSpaces}</Pre>);

        const preElement = screen.getByText(/Multiple/);
        expect(preElement.textContent).toBe(textWithSpaces);
        // Should preserve all the extra spaces
        expect(preElement.textContent).toContain('  Multiple   spaces   preserved  ');
    });
});
