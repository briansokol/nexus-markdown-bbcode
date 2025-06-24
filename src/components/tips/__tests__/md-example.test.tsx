import { render } from '@/test/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MdExample } from '../md-example';

// Mock console.log to avoid output in tests
const mockConsoleLog = vi.fn();
vi.spyOn(console, 'log').mockImplementation(mockConsoleLog);

describe('MdExample', () => {
    afterEach(() => {
        mockConsoleLog.mockClear();
    });

    /**
     * Test MdExample with simple string content
     */
    it('should render with simple string content', () => {
        const { container } = render(<MdExample>This is **bold** text</MdExample>);

        expect(container).toMatchSnapshot();
    });

    /**
     * Test MdExample with header markdown
     */
    it('should render with header markdown', () => {
        const { container } = render(<MdExample># Header Level 1</MdExample>);

        expect(container).toMatchSnapshot();
    });

    /**
     * Test MdExample with multiple paragraphs
     */
    it('should render with multiple paragraphs', () => {
        const { container } = render(
            <MdExample>This is a paragraph.{'\n\n'}This is another paragraph.</MdExample>,
        );

        expect(container).toMatchSnapshot();
    });

    /**
     * Test MdExample with color directive
     */
    it('should render with color directive', () => {
        const { container } = render(<MdExample>This is :red[red text]</MdExample>);

        expect(container).toMatchSnapshot();
    });

    /**
     * Test MdExample with alignment directive
     */
    it('should render with alignment directive', () => {
        const { container } = render(<MdExample>:center[Centered text]</MdExample>);

        expect(container).toMatchSnapshot();
    });

    /**
     * Test MdExample with list items
     */
    it('should render with unordered list', () => {
        const { container } = render(<MdExample>- Item 1</MdExample>);

        expect(container).toMatchSnapshot();
    });

    /**
     * Test MdExample with ordered list
     */
    it('should render with ordered list', () => {
        const { container } = render(<MdExample>1. Item 1</MdExample>);

        expect(container).toMatchSnapshot();
    });

    /**
     * Test MdExample with image markdown
     */
    it('should render with image markdown', () => {
        const { container } = render(
            <MdExample>![Official Addon](https://i.imgur.com/1FSEwwP.png)</MdExample>,
        );

        expect(container).toMatchSnapshot();
    });

    /**
     * Test MdExample with YouTube directive
     */
    it('should render with YouTube directive', () => {
        const { container } = render(<MdExample>{':youtube{v=tKWPfMLw3r8}'}</MdExample>);

        expect(container).toMatchSnapshot();
    });

    /**
     * Test MdExample with spoiler directive
     */
    it('should render with spoiler directive', () => {
        const { container } = render(
            <MdExample>
                :::spoiler{'\n'}This is a spoiler.{'\n\n'}Anything can go inside a spoiler.{'\n'}:::
            </MdExample>,
        );

        expect(container).toMatchSnapshot();
    });

    /**
     * Test MdExample with inline code
     */
    it('should render with inline code', () => {
        const { container } = render(<MdExample>`This is inline code`</MdExample>);

        expect(container).toMatchSnapshot();
    });

    /**
     * Test MdExample with code block
     */
    it('should render with code block', () => {
        const { container } = render(
            <MdExample>
                {`\`\`\``}
                This is a multi-line code block{'\n'}This is a multi-line code block
                {`\`\`\``}
            </MdExample>,
        );

        expect(container).toMatchSnapshot();
    });

    /**
     * Test MdExample with formatting styles
     */
    it('should render with various formatting styles', () => {
        const { container } = render(
            <MdExample>This is *italic* and ~~strikethrough~~ text</MdExample>,
        );

        expect(container).toMatchSnapshot();
    });

    /**
     * Test MdExample with link
     */
    it('should render with link', () => {
        const { container } = render(<MdExample>[Link Text](https://example.com)</MdExample>);

        expect(container).toMatchSnapshot();
    });

    /**
     * Test MdExample with underline directive
     */
    it('should render with underline directive', () => {
        const { container } = render(<MdExample>This is :ins[underline] text</MdExample>);

        expect(container).toMatchSnapshot();
    });

    /**
     * Test MdExample with caption directive
     */
    it('should render with caption directive', () => {
        const { container } = render(<MdExample>:small[This is a caption]</MdExample>);

        expect(container).toMatchSnapshot();
    });

    /**
     * Test MdExample with complex nested alignment
     */
    it('should render with complex nested alignment', () => {
        const { container } = render(
            <MdExample>
                :::center{'\n'}![Official Addon](https://i.imgur.com/1FSEwwP.png){'\n\n'}
                :small[Official Addon Banner]
                {'\n'}:::
            </MdExample>,
        );

        expect(container).toMatchSnapshot();
    });

    /**
     * Test MdExample with array of strings
     */
    it('should render with array of strings', () => {
        const { container } = render(<MdExample>{['Line 1', 'Line 2', 'Line 3']}</MdExample>);

        expect(container).toMatchSnapshot();
    });

    /**
     * Test MdExample with mixed array content
     */
    it('should render with mixed array content including newlines', () => {
        const { container } = render(<MdExample>{['Line 1\n', 'Line 2', '\nLine 3']}</MdExample>);

        expect(container).toMatchSnapshot();
    });

    /**
     * Test MdExample with empty content
     */
    it('should render with empty content', () => {
        const { container } = render(<MdExample> </MdExample>);

        expect(container).toMatchSnapshot();
    });

    /**
     * Test that MdExample logs the processed content
     */
    it('should log the processed content to console', () => {
        render(<MdExample>Test content</MdExample>);

        expect(mockConsoleLog).toHaveBeenCalledWith('Test content');
    });

    /**
     * Test that MdExample logs array content correctly
     */
    it('should log array content with proper line breaks', () => {
        render(<MdExample>{['Line 1', 'Line 2']}</MdExample>);

        expect(mockConsoleLog).toHaveBeenCalledWith('Line 1\nLine 2');
    });
});
