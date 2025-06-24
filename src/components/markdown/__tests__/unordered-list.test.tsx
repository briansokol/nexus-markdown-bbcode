import { render, screen } from '@/test/test-utils';
import { describe, expect, it } from 'vitest';
import { UnorderedList } from '../unordered-list';

describe('UnorderedList', () => {
    /**
     * Test that UnorderedList component renders as ul element in html mode
     */
    it('should render as ul element in html mode', () => {
        render(
            <UnorderedList mode="html">
                <li>Item 1</li>
                <li>Item 2</li>
            </UnorderedList>,
        );

        const listElement = screen.getByText('Item 1').closest('ul');
        expect(listElement).toBeInTheDocument();
        expect(listElement?.tagName).toBe('UL');
        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    /**
     * Test that UnorderedList component renders BBCode in bbcode mode
     */
    it('should render BBCode in bbcode mode', () => {
        render(
            <UnorderedList mode="bbcode">
                <span>Item 1</span>
                <span>Item 2</span>
            </UnorderedList>,
        );

        const text = screen.getByText(/\[list\].*\[\/list\]/);
        expect(text).toBeInTheDocument();
        expect(text.textContent).toContain('[list]');
        expect(text.textContent).toContain('[/list]');
        expect(text.textContent).toContain('\n');
        expect(text.textContent).toContain('Item 1');
        expect(text.textContent).toContain('Item 2');
    });

    /**
     * Test that UnorderedList component handles empty children
     */
    it('should handle empty children', () => {
        const { container } = render(<UnorderedList mode="html"></UnorderedList>);

        const listElement = container.querySelector('ul');
        expect(listElement).toBeInTheDocument();
        expect(listElement).toBeEmptyDOMElement();
    });

    /**
     * Test that UnorderedList component handles single item
     */
    it('should handle single item', () => {
        render(
            <UnorderedList mode="html">
                <li>Single item</li>
            </UnorderedList>,
        );

        const listElement = screen.getByText('Single item').closest('ul');
        expect(listElement).toBeInTheDocument();
        expect(screen.getByText('Single item')).toBeInTheDocument();
    });

    /**
     * Test that UnorderedList component cleans whitespace in bbcode mode
     */
    it('should clean whitespace in bbcode mode', () => {
        render(<UnorderedList mode="bbcode">{'  Item  with   spaces  '}</UnorderedList>);

        const text = screen.getByText(/\[list\].*\[\/list\]/);
        expect(text.textContent).toMatch(/\[list\]\s*Item with spaces\s*\[\/list\]/);
    });

    /**
     * Test that UnorderedList component handles nested elements
     */
    it('should handle nested elements in html mode', () => {
        render(
            <UnorderedList mode="html">
                <li>
                    <strong>Bold</strong> item
                </li>
                <li>
                    <em>Italic</em> item
                </li>
            </UnorderedList>,
        );

        const listElement = screen.getAllByText(/item/)[0].closest('ul');
        expect(listElement).toBeInTheDocument();
        expect(screen.getByText('Bold')).toBeInTheDocument();
        expect(screen.getByText('Italic')).toBeInTheDocument();
    });

    /**
     * Test that UnorderedList component handles line breaks in bbcode mode
     */
    it('should handle line breaks in bbcode mode', () => {
        render(<UnorderedList mode="bbcode">{'Item 1\nItem 2'}</UnorderedList>);

        const text = screen.getByText(/\[list\].*\[\/list\]/);
        expect(text.textContent).toContain('[list]');
        expect(text.textContent).toContain('Item 1 Item 2'); // Line breaks should be converted to spaces
        expect(text.textContent).toContain('[/list]');
    });

    /**
     * Test difference between ordered and unordered list BBCode
     */
    it('should render different BBCode than ordered list', () => {
        render(<UnorderedList mode="bbcode">Item content</UnorderedList>);

        const text = screen.getByText(/\[list\].*\[\/list\]/);
        expect(text.textContent).toMatch(/\[list\]\s*Item content\s*\[\/list\]/);
        // Should NOT contain [list=1] like ordered lists
        expect(text.textContent).not.toContain('[list=1]');
    });
});
