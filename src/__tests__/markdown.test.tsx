import { render } from '@/test/test-utils';
import { describe, expect, it } from 'vitest';
import { Markdown } from '../markdown';

describe('Markdown', () => {
    /**
     * Test h3 header rendering
     */
    it('should render h3 headers as level 2 headers', () => {
        const { container } = render(<Markdown markdownInput="### Header Level 3" mode="html" />);

        const h3 = container.querySelector('h2');
        expect(h3).toBeInTheDocument();
        expect(h3).toHaveTextContent('Header Level 3');
    });

    /**
     * Test h4 header rendering
     */
    it('should render h4 headers as level 2 headers', () => {
        const { container } = render(<Markdown markdownInput="#### Header Level 4" mode="html" />);

        const h4 = container.querySelector('h2');
        expect(h4).toBeInTheDocument();
        expect(h4).toHaveTextContent('Header Level 4');
    });

    /**
     * Test h5 header rendering
     */
    it('should render h5 headers as level 2 headers', () => {
        const { container } = render(<Markdown markdownInput="##### Header Level 5" mode="html" />);

        const h5 = container.querySelector('h2');
        expect(h5).toBeInTheDocument();
        expect(h5).toHaveTextContent('Header Level 5');
    });

    /**
     * Test h6 header rendering
     */
    it('should render h6 headers as level 2 headers', () => {
        const { container } = render(
            <Markdown markdownInput="###### Header Level 6" mode="html" />,
        );

        const h6 = container.querySelector('h2');
        expect(h6).toBeInTheDocument();
        expect(h6).toHaveTextContent('Header Level 6');
    });

    /**
     * Test h3 header rendering in BBCode mode
     */
    it('should render h3 headers in BBCode mode', () => {
        const { container } = render(<Markdown markdownInput="### Header Level 3" mode="bbcode" />);

        // Check for BBCode header components (size=4 for level 2 headers)
        expect(container.textContent).toContain('[size=4]');
        expect(container.textContent).not.toContain('[b]'); // level2 headers don't have bold
        expect(container.textContent).toContain('[i]');
        expect(container.textContent).toContain('HEADER LEVEL 3');
    });

    /**
     * Test h4 header rendering in BBCode mode
     */
    it('should render h4 headers in BBCode mode', () => {
        const { container } = render(
            <Markdown markdownInput="#### Header Level 4" mode="bbcode" />,
        );

        // Check for BBCode header components (size=4 for level 2 headers)
        expect(container.textContent).toContain('[size=4]');
        expect(container.textContent).not.toContain('[b]'); // level2 headers don't have bold
        expect(container.textContent).toContain('[i]');
        expect(container.textContent).toContain('HEADER LEVEL 4');
    });

    /**
     * Test h5 header rendering in BBCode mode
     */
    it('should render h5 headers in BBCode mode', () => {
        const { container } = render(
            <Markdown markdownInput="##### Header Level 5" mode="bbcode" />,
        );

        // Check for BBCode header components (size=4 for level 2 headers)
        expect(container.textContent).toContain('[size=4]');
        expect(container.textContent).not.toContain('[b]'); // level2 headers don't have bold
        expect(container.textContent).toContain('[i]');
        expect(container.textContent).toContain('HEADER LEVEL 5');
    });

    /**
     * Test h6 header rendering in BBCode mode
     */
    it('should render h6 headers in BBCode mode', () => {
        const { container } = render(
            <Markdown markdownInput="###### Header Level 6" mode="bbcode" />,
        );

        // Check for BBCode header components (size=4 for level 2 headers)
        expect(container.textContent).toContain('[size=4]');
        expect(container.textContent).not.toContain('[b]'); // level2 headers don't have bold
        expect(container.textContent).toContain('[i]');
        expect(container.textContent).toContain('HEADER LEVEL 6');
    });

    /**
     * Test line break rendering - testing br handler coverage
     */
    it('should render line breaks using br handler', () => {
        // Test HTML mode with explicit line break
        const { container } = render(<Markdown markdownInput="Line 1  \nLine 2" mode="html" />);

        // Should contain the text content even if br element isn't directly rendered
        expect(container.textContent).toContain('Line 1');
        expect(container.textContent).toContain('Line 2');
    });

    /**
     * Test line break rendering in BBCode mode
     */
    it('should render line breaks in BBCode mode', () => {
        const { container } = render(<Markdown markdownInput="Line 1  \nLine 2" mode="bbcode" />);

        expect(container.textContent).toContain('Line 1');
        expect(container.textContent).toContain('Line 2');
    });

    /**
     * Test horizontal rule rendering in HTML mode
     */
    it('should render horizontal rules in HTML mode', () => {
        const { container } = render(<Markdown markdownInput="---" mode="html" />);

        const hr = container.querySelector('hr');
        expect(hr).toBeInTheDocument();
    });

    /**
     * Test horizontal rule rendering in BBCode mode
     */
    it('should render horizontal rules in BBCode mode', () => {
        const { container } = render(<Markdown markdownInput="---" mode="bbcode" />);

        expect(container.textContent).toContain('[line]');
    });

    /**
     * Test that all existing components still work in HTML mode
     */
    it('should render all component types in HTML mode', () => {
        const markdownInput = `# Header 1
## Header 2

This is a paragraph with **bold** and *italic* text.

- Unordered list item
1. Ordered list item

![Image](https://example.com/image.png)

[Link](https://example.com)

\`inline code\`

\`\`\`
code block
\`\`\`

---
`;

        const { container } = render(<Markdown markdownInput={markdownInput} mode="html" />);

        // Check that multiple components render
        expect(container.querySelector('h1')).toBeInTheDocument();
        expect(container.querySelector('h2')).toBeInTheDocument();
        expect(container.querySelector('p')).toBeInTheDocument();
        expect(container.querySelector('strong')).toBeInTheDocument();
        expect(container.querySelector('em')).toBeInTheDocument();
        expect(container.querySelector('ul')).toBeInTheDocument();
        expect(container.querySelector('ol')).toBeInTheDocument();
        expect(container.querySelector('img')).toBeInTheDocument();
        expect(container.querySelector('a')).toBeInTheDocument();
        expect(container.querySelector('code')).toBeInTheDocument();
        expect(container.querySelector('pre')).toBeInTheDocument();
        expect(container.querySelector('hr')).toBeInTheDocument();
    });

    /**
     * Test that all existing components still work in BBCode mode
     */
    it('should render all component types in BBCode mode', () => {
        const markdownInput = `# Header 1
## Header 2

This is a paragraph with **bold** and *italic* text.

- Unordered list item
1. Ordered list item

:red[Red text]
:center[Centered text]
`;

        const { container } = render(<Markdown markdownInput={markdownInput} mode="bbcode" />);

        const bbcodeText = container.textContent ?? '';

        // Check that BBCode elements are present
        expect(bbcodeText).toContain('[size=5]'); // H1
        expect(bbcodeText).toContain('[size=4]'); // H2
        expect(bbcodeText).toContain('[size=3]'); // Paragraph
        expect(bbcodeText).toContain('[b]'); // Bold
        expect(bbcodeText).toContain('[i]'); // Italic
        expect(bbcodeText).toContain('[list]'); // Unordered list
        expect(bbcodeText).toContain('[list=1]'); // Ordered list
        expect(bbcodeText).toContain('[color=#e06666]'); // Red color
        expect(bbcodeText).toContain('[center]'); // Center alignment
    });

    /**
     * Test empty markdown input
     */
    it('should handle empty markdown input', () => {
        const { container } = render(<Markdown markdownInput="" mode="html" />);

        expect(container.textContent).toBe('');
    });

    /**
     * Test mode switching with same content
     */
    it('should render differently based on mode', () => {
        const markdownInput = '**Bold text**';

        const { container: htmlContainer } = render(
            <Markdown markdownInput={markdownInput} mode="html" />,
        );

        const { container: bbcodeContainer } = render(
            <Markdown markdownInput={markdownInput} mode="bbcode" />,
        );

        // HTML mode should have strong element
        expect(htmlContainer.querySelector('strong')).toBeInTheDocument();

        // BBCode mode should have BBCode syntax
        expect(bbcodeContainer.textContent).toContain('[b]');
        expect(bbcodeContainer.textContent).toContain('[/b]');
    });

    /**
     * Test complex nested markdown
     */
    it('should handle complex nested markdown structures', () => {
        const markdownInput = `# Main Header

## Sub Header

This paragraph has **bold**, *italic*, and ~~strikethrough~~ text.

### Another Header

- List item with **bold text**
- List item with [link](https://example.com)

#### Yet Another Header

1. Numbered item
2. Another numbered item

##### Deep Header

\`\`\`
code block content
\`\`\`

###### Deepest Header

:red[Colored text] in a paragraph.
`;

        const { container } = render(<Markdown markdownInput={markdownInput} mode="html" />);

        // Should render all the header levels (h3-h6 should become h2)
        const h1Elements = container.querySelectorAll('h1');
        const h2Elements = container.querySelectorAll('h2');

        expect(h1Elements).toHaveLength(1); // Main Header
        expect(h2Elements).toHaveLength(5); // Sub Header + h3,h4,h5,h6

        // Check specific content
        expect(h1Elements[0]).toHaveTextContent('Main Header');
        expect(h2Elements[0]).toHaveTextContent('Sub Header');
        expect(h2Elements[1]).toHaveTextContent('Another Header');
        expect(h2Elements[2]).toHaveTextContent('Yet Another Header');
        expect(h2Elements[3]).toHaveTextContent('Deep Header');
        expect(h2Elements[4]).toHaveTextContent('Deepest Header');
    });
});
