import { render, screen } from '@/test/test-utils';
import { describe, expect, it } from 'vitest';
import { Image } from '../image';

describe('Image', () => {
    /**
     * Test that Image component renders as img element in html mode
     */
    it('should render as img element in html mode', () => {
        render(<Image mode="html" src="https://example.com/image.jpg" alt="Test image" />);

        const imgElement = screen.getByAltText('Test image');
        expect(imgElement).toBeInTheDocument();
        expect(imgElement.tagName).toBe('IMG');
        expect(imgElement).toHaveAttribute('src', 'https://example.com/image.jpg');
        expect(imgElement).toHaveAttribute('alt', 'Test image');
        expect(imgElement).toHaveClass('inline-image');
    });

    /**
     * Test that Image component renders BBCode in bbcode mode
     */
    it('should render BBCode in bbcode mode', () => {
        render(<Image mode="bbcode" src="https://example.com/image.jpg" alt="Test image" />);

        expect(screen.getByText('[img]https://example.com/image.jpg[/img]')).toBeInTheDocument();
    });

    /**
     * Test that Image component handles missing src attribute
     */
    it('should handle missing src attribute', () => {
        render(<Image mode="html" alt="Test image" />);

        const imgElement = screen.getByAltText('Test image');
        expect(imgElement).toBeInTheDocument();
        expect(imgElement).not.toHaveAttribute('src');
    });

    /**
     * Test that Image component handles missing alt attribute
     */
    it('should handle missing alt attribute', () => {
        render(<Image mode="html" src="https://example.com/image.jpg" />);

        const imgElement = screen.getByRole('img');
        expect(imgElement).toBeInTheDocument();
        expect(imgElement).toHaveAttribute('src', 'https://example.com/image.jpg');
        expect(imgElement).not.toHaveAttribute('alt');
    });

    /**
     * Test that Image component renders undefined src in bbcode mode
     */
    it('should handle undefined src in bbcode mode', () => {
        render(<Image mode="bbcode" alt="Test image" />);

        expect(screen.getByText('[img][/img]')).toBeInTheDocument();
    });

    /**
     * Test that Image component ignores alt attribute in bbcode mode
     */
    it('should ignore alt attribute in bbcode mode', () => {
        render(
            <Image mode="bbcode" src="https://example.com/image.jpg" alt="This alt is ignored" />,
        );

        expect(screen.getByText('[img]https://example.com/image.jpg[/img]')).toBeInTheDocument();
        expect(screen.queryByText('This alt is ignored')).not.toBeInTheDocument();
    });

    /**
     * Test that Image component renders with empty src and alt
     */
    it('should render with empty src and alt', () => {
        render(<Image mode="html" src="" alt="" />);

        const imgElement = screen.getByAltText('');
        expect(imgElement).toBeInTheDocument();
        // React doesn't render empty string attributes, so they won't be present
        expect(imgElement).not.toHaveAttribute('src');
        expect(imgElement).toHaveAttribute('alt', '');
        expect(imgElement).toHaveClass('inline-image');
    });
});
