import { render, screen } from '@/test/test-utils';
import { describe, expect, it } from 'vitest';
import { ListItem } from '../list-item';

describe('ListItem', () => {
    /**
     * Test that ListItem component renders as li element in html mode
     */
    it('should render as li element in html mode', () => {
        render(<ListItem mode="html">List item text</ListItem>);

        const listItemElement = screen.getByText('List item text');
        expect(listItemElement).toBeInTheDocument();
        expect(listItemElement.tagName).toBe('LI');
    });

    /**
     * Test that ListItem component renders BBCode in bbcode mode
     */
    it('should render BBCode in bbcode mode', () => {
        render(<ListItem mode="bbcode">List item text</ListItem>);

        const text = screen.getByText(/\[\*\]\[size=3\].*\[\/size\]/);
        expect(text).toBeInTheDocument();
        expect(text.textContent).toContain('[*][size=3]List item text[/size]');
        expect(text.textContent).toContain('\n');
    });

    /**
     * Test that ListItem component handles empty children
     */
    it('should handle empty children', () => {
        const { container } = render(<ListItem mode="html"></ListItem>);

        const listItemElement = container.querySelector('li');
        expect(listItemElement).toBeInTheDocument();
        expect(listItemElement).toBeEmptyDOMElement();
    });

    /**
     * Test that ListItem component handles nested elements in html mode
     */
    it('should handle nested elements in html mode', () => {
        render(
            <ListItem mode="html">
                <strong>Bold</strong> list item
            </ListItem>,
        );

        const listItemElement = screen.getByText('list item').closest('li');
        expect(listItemElement).toBeInTheDocument();
        expect(screen.getByText('Bold')).toBeInTheDocument();
    });

    /**
     * Test that ListItem component handles nested elements in bbcode mode
     */
    it('should handle nested elements in bbcode mode', () => {
        render(
            <ListItem mode="bbcode">
                <strong>Bold</strong> list item
            </ListItem>,
        );

        const text = screen.getByText(/\[\*\]\[size=3\].*\[\/size\]/);
        expect(text).toBeInTheDocument();
        expect(text.textContent).toContain('Bold');
        expect(text.textContent).toContain('list item');
    });

    /**
     * Test that ListItem component cleans whitespace properly
     */
    it('should clean whitespace in children', () => {
        render(<ListItem mode="bbcode">{'  Text  with   spaces  '}</ListItem>);

        const text = screen.getByText(/\[\*\]\[size=3\].*\[\/size\]/);
        expect(text.textContent).toMatch(/\[\*\]\[size=3\]\s*Text with spaces\s*\[\/size\]/);
    });

    /**
     * Test that ListItem component handles line breaks
     */
    it('should handle line breaks in children', () => {
        render(<ListItem mode="bbcode">{'Text\nwith\nbreaks'}</ListItem>);

        const text = screen.getByText(/\[\*\]\[size=3\].*\[\/size\]/);
        expect(text.textContent).toContain('[*][size=3]Text with breaks[/size]');
    });
});
