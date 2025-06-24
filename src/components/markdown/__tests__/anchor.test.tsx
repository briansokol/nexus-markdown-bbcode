import { render, screen } from '@/test/test-utils';
import { describe, expect, it } from 'vitest';
import { Anchor } from '../anchor';

describe('Anchor', () => {
    /**
     * Test that Anchor component renders as a element with href in html mode
     */
    it('should render as a element with href in html mode', () => {
        render(
            <Anchor mode="html" href="https://example.com">
                Link text
            </Anchor>,
        );

        const anchorElement = screen.getByText('Link text');
        expect(anchorElement).toBeInTheDocument();
        expect(anchorElement.tagName).toBe('A');
        expect(anchorElement).toHaveAttribute('href', 'https://example.com');
        expect(anchorElement.tagName).toBe('A');
    });

    /**
     * Test that Anchor component renders BBCode in bbcode mode
     */
    it('should render BBCode in bbcode mode', () => {
        render(
            <Anchor mode="bbcode" href="https://example.com">
                Link text
            </Anchor>,
        );

        expect(screen.getByText('[url=https://example.com]Link text[/url]')).toBeInTheDocument();
    });

    /**
     * Test that Anchor component handles missing href attribute
     */
    it('should handle missing href attribute in html mode', () => {
        render(<Anchor mode="html">Link text</Anchor>);

        const anchorElement = screen.getByText('Link text');
        expect(anchorElement).toBeInTheDocument();
        expect(anchorElement.tagName).toBe('A');
        expect(anchorElement).not.toHaveAttribute('href');
        expect(anchorElement.tagName).toBe('A');
    });

    /**
     * Test that Anchor component handles undefined href in bbcode mode
     */
    it('should handle undefined href in bbcode mode', () => {
        render(<Anchor mode="bbcode">Link text</Anchor>);

        expect(screen.getByText('[url=]Link text[/url]')).toBeInTheDocument();
    });

    /**
     * Test that Anchor component handles empty children
     */
    it('should handle empty children', () => {
        const { container } = render(<Anchor mode="html" href="https://example.com"></Anchor>);

        const anchorElement = container.querySelector('a');
        expect(anchorElement).toBeInTheDocument();
        expect(anchorElement).toHaveAttribute('href', 'https://example.com');
        expect(anchorElement?.tagName).toBe('A');
        expect(anchorElement).toBeEmptyDOMElement();
    });

    /**
     * Test that Anchor component handles nested elements in html mode
     */
    it('should handle nested elements in html mode', () => {
        render(
            <Anchor mode="html" href="https://example.com">
                <strong>Bold</strong> link text
            </Anchor>,
        );

        const anchorElement = screen.getByText('link text').closest('a');
        expect(anchorElement).toBeInTheDocument();
        expect(anchorElement).toHaveAttribute('href', 'https://example.com');
        expect(anchorElement?.tagName).toBe('A');
        expect(screen.getByText('Bold')).toBeInTheDocument();
    });

    /**
     * Test that Anchor component handles nested elements in bbcode mode
     */
    it('should handle nested elements in bbcode mode', () => {
        render(
            <Anchor mode="bbcode" href="https://example.com">
                <strong>Bold</strong> link text
            </Anchor>,
        );

        const text = screen.getByText(/\[url=https:\/\/example\.com\].*\[\/url\]/);
        expect(text).toBeInTheDocument();
        expect(text.textContent).toContain('[url=https://example.com]');
        expect(text.textContent).toContain('[/url]');
        expect(text.textContent).toContain('Bold');
        expect(text.textContent).toContain('link text');
    });

    /**
     * Test that Anchor component cleans whitespace in bbcode mode
     */
    it('should clean whitespace in bbcode mode', () => {
        render(
            <Anchor mode="bbcode" href="https://example.com">
                {'  Link  with   spaces  '}
            </Anchor>,
        );

        const text = screen.getByText(/\[url=https:\/\/example\.com\].*\[\/url\]/);
        expect(text.textContent).toMatch(
            /\[url=https:\/\/example\.com\]\s*Link with spaces\s*\[\/url\]/,
        );
    });

    /**
     * Test that Anchor component handles relative URLs
     */
    it('should handle relative URLs', () => {
        render(
            <Anchor mode="html" href="/relative/path">
                Relative link
            </Anchor>,
        );

        const anchorElement = screen.getByText('Relative link');
        expect(anchorElement).toBeInTheDocument();
        expect(anchorElement).toHaveAttribute('href', '/relative/path');
    });
});
