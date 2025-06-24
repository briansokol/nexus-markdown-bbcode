import { render, screen } from '@/test/test-utils';
import { describe, expect, it } from 'vitest';
import { Code } from '../code';

describe('Code', () => {
    /**
     * Test that Code component renders as code element in html mode
     */
    it('should render as code element in html mode', () => {
        render(<Code mode="html">console.log('hello');</Code>);

        const codeElement = screen.getByText("console.log('hello');");
        expect(codeElement).toBeInTheDocument();
        expect(codeElement.tagName).toBe('CODE');
        expect(codeElement.tagName).toBe('CODE');
    });

    /**
     * Test that Code component renders BBCode in bbcode mode
     */
    it('should render BBCode in bbcode mode', () => {
        render(<Code mode="bbcode">console.log('hello');</Code>);

        const text = screen.getByText(/\[code\].*\[\/code\]/);
        expect(text).toBeInTheDocument();
        expect(text.textContent).toContain("[code]console.log('hello');[/code]");
        expect(text.textContent).toContain('\n');
    });

    /**
     * Test that Code component handles empty children
     */
    it('should handle empty children', () => {
        const { container } = render(<Code mode="html"></Code>);

        const codeElement = container.querySelector('code');
        expect(codeElement).toBeInTheDocument();
        expect(codeElement?.tagName).toBe('CODE');
        expect(codeElement).toBeEmptyDOMElement();
    });

    /**
     * Test that Code component handles multi-line code in html mode
     */
    it('should handle multi-line code in html mode', () => {
        const multiLineCode = 'function test() {\n  return true;\n}';
        render(<Code mode="html">{multiLineCode}</Code>);

        const codeElement = screen.getByText(/function test\(\)/);
        expect(codeElement).toBeInTheDocument();
        expect(codeElement.tagName).toBe('CODE');
        expect(codeElement.tagName).toBe('CODE');
        expect(codeElement.textContent).toContain('function test()');
        expect(codeElement.textContent).toContain('return true;');
    });

    /**
     * Test that Code component handles multi-line code in bbcode mode
     */
    it('should handle multi-line code in bbcode mode', () => {
        const multiLineCode = 'function test() {\n  return true;\n}';
        render(<Code mode="bbcode">{multiLineCode}</Code>);

        const text = screen.getByText(/\[code\].*\[\/code\]/);
        expect(text).toBeInTheDocument();
        expect(text.textContent).toContain('[code]');
        expect(text.textContent).toContain('[/code]');
        expect(text.textContent).toContain('function test()');
        expect(text.textContent).toContain('return true;');
        expect(text.textContent).toContain('\n');
    });

    /**
     * Test that Code component preserves whitespace and indentation
     */
    it('should preserve whitespace and indentation', () => {
        const indentedCode = '  const x = 1;\n    const y = 2;';
        render(<Code mode="html">{indentedCode}</Code>);

        const codeElement = screen.getByText(/const x = 1;/);
        expect(codeElement).toBeInTheDocument();
        expect(codeElement.textContent).toBe(indentedCode);
    });

    /**
     * Test that Code component handles special characters
     */
    it('should handle special characters', () => {
        const specialChars = '<script>alert("xss")</script>';
        render(<Code mode="html">{specialChars}</Code>);

        const codeElement = screen.getByText(/script.*alert.*xss.*script/);
        expect(codeElement).toBeInTheDocument();
        expect(codeElement.textContent).toBe(specialChars);
    });

    /**
     * Test that Code component handles nested elements
     */
    it('should handle nested elements', () => {
        render(
            <Code mode="html">
                <span>const</span> x = 1;
            </Code>,
        );

        const codeElement = screen.getByText('x = 1;').closest('code');
        expect(codeElement).toBeInTheDocument();
        expect(codeElement?.tagName).toBe('CODE');
        expect(screen.getByText('const')).toBeInTheDocument();
    });
});
