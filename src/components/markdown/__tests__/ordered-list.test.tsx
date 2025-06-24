import { render, screen } from '@/test/test-utils';
import { describe, expect, it } from 'vitest';
import { OrderedList } from '../ordered-list';

describe('OrderedList', () => {
    /**
     * Test that OrderedList component renders as ol element in html mode
     */
    it('should render as ol element in html mode', () => {
        render(
            <OrderedList mode="html">
                <li>Item 1</li>
                <li>Item 2</li>
            </OrderedList>,
        );

        const listElement = screen.getByText('Item 1').closest('ol');
        expect(listElement).toBeInTheDocument();
        expect(listElement?.tagName).toBe('OL');
        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    /**
     * Test that OrderedList component renders BBCode in bbcode mode
     */
    it('should render BBCode in bbcode mode', () => {
        render(
            <OrderedList mode="bbcode">
                <span>Item 1</span>
                <span>Item 2</span>
            </OrderedList>,
        );

        const text = screen.getByText(/\[list=1\].*\[\/list\]/);
        expect(text).toBeInTheDocument();
        expect(text.textContent).toContain('[list=1]');
        expect(text.textContent).toContain('[/list]');
        expect(text.textContent).toContain('\n');
        expect(text.textContent).toContain('Item 1');
        expect(text.textContent).toContain('Item 2');
    });

    /**
     * Test that OrderedList component handles empty children
     */
    it('should handle empty children', () => {
        const { container } = render(<OrderedList mode="html"></OrderedList>);

        const listElement = container.querySelector('ol');
        expect(listElement).toBeInTheDocument();
        expect(listElement).toBeEmptyDOMElement();
    });

    /**
     * Test that OrderedList component handles single item
     */
    it('should handle single item', () => {
        render(
            <OrderedList mode="html">
                <li>Single item</li>
            </OrderedList>,
        );

        const listElement = screen.getByText('Single item').closest('ol');
        expect(listElement).toBeInTheDocument();
        expect(screen.getByText('Single item')).toBeInTheDocument();
    });

    /**
     * Test that OrderedList component cleans whitespace in bbcode mode
     */
    it('should clean whitespace in bbcode mode', () => {
        render(<OrderedList mode="bbcode">{'  Item  with   spaces  '}</OrderedList>);

        const text = screen.getByText(/\[list=1\].*\[\/list\]/);
        expect(text.textContent).toMatch(/\[list=1\]\s*Item with spaces\s*\[\/list\]/);
    });

    /**
     * Test that OrderedList component handles nested elements
     */
    it('should handle nested elements in html mode', () => {
        render(
            <OrderedList mode="html">
                <li>
                    <strong>Bold</strong> item
                </li>
                <li>
                    <em>Italic</em> item
                </li>
            </OrderedList>,
        );

        const listElement = screen.getAllByText(/item/)[0].closest('ol');
        expect(listElement).toBeInTheDocument();
        expect(screen.getByText('Bold')).toBeInTheDocument();
        expect(screen.getByText('Italic')).toBeInTheDocument();
    });

    /**
     * Test that OrderedList component handles line breaks in bbcode mode
     */
    it('should handle line breaks in bbcode mode', () => {
        render(<OrderedList mode="bbcode">{'Item 1\nItem 2'}</OrderedList>);

        const text = screen.getByText(/\[list=1\].*\[\/list\]/);
        expect(text.textContent).toContain('[list=1]');
        expect(text.textContent).toContain('Item 1 Item 2'); // Line breaks should be converted to spaces
        expect(text.textContent).toContain('[/list]');
    });
});
