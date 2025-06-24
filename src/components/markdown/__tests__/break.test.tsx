import { render } from '@/test/test-utils';
import { describe, expect, it } from 'vitest';
import { Break } from '../break';

describe('Break', () => {
    /**
     * Test that Break component renders as br element in html mode
     */
    it('should render as br element in html mode', () => {
        const { container } = render(<Break mode="html" />);

        const brElement = container.querySelector('br');
        expect(brElement).toBeInTheDocument();
    });

    /**
     * Test that Break component renders newline in bbcode mode
     */
    it('should render newline in bbcode mode', () => {
        const { container } = render(<Break mode="bbcode" />);

        expect(container.textContent).toBe('\n');
    });

    /**
     * Test that Break component renders self-closing br in html mode
     */
    it('should render self-closing br in html mode', () => {
        const { container } = render(<Break mode="html" />);

        const brElement = container.querySelector('br');
        expect(brElement).toBeInTheDocument();
        expect(brElement?.tagName).toBe('BR');
        expect(brElement?.textContent).toBe('');
    });
});
