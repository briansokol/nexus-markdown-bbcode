import { render } from '@/test/test-utils';
import { describe, expect, it } from 'vitest';
import { Line } from '../line';

describe('Line', () => {
    /**
     * Test that Line component renders as hr element in html mode
     */
    it('should render as hr element in html mode', () => {
        const { container } = render(<Line mode="html" />);

        const hrElement = container.querySelector('hr');
        expect(hrElement).toBeInTheDocument();
        expect(hrElement?.tagName).toBe('HR');
    });

    /**
     * Test that Line component renders [line] BBCode in bbcode mode
     */
    it('should render [line] BBCode in bbcode mode', () => {
        const { container } = render(<Line mode="bbcode" />);

        expect(container.textContent).toBe('[line]');
    });

    /**
     * Test that Line component renders self-closing hr in html mode
     */
    it('should render self-closing hr in html mode', () => {
        const { container } = render(<Line mode="html" />);

        const hrElement = container.querySelector('hr');
        expect(hrElement).toBeInTheDocument();
        expect(hrElement?.textContent).toBe('');
        expect(hrElement?.children.length).toBe(0);
    });

    /**
     * Test that Line component has no children or content in either mode
     */
    it('should have no children or content', () => {
        const { container: htmlContainer } = render(<Line mode="html" />);
        const { container: bbcodeContainer } = render(<Line mode="bbcode" />);

        // HTML mode should have an hr element with no content
        const hrElement = htmlContainer.querySelector('hr');
        expect(hrElement).toBeInTheDocument();
        expect(hrElement?.innerHTML).toBe('');

        // BBCode mode should have exactly the BBCode text
        expect(bbcodeContainer.textContent).toBe('[line]');
        expect(bbcodeContainer.innerHTML).toBe('[line]');
    });
});
