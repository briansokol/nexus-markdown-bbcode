import { render, screen } from '@/test/test-utils';
import { describe, expect, it } from 'vitest';
import { YouTube } from '../youtube';

describe('YouTube', () => {
    /**
     * Test that YouTube component renders as iframe in html mode
     */
    it('should render as iframe in html mode', () => {
        render(<YouTube mode="html" v="dQw4w9WgXcQ" />);

        const iframe = screen.getByTitle('YouTube video player');
        expect(iframe).toBeInTheDocument();
        expect(iframe.tagName).toBe('IFRAME');
        expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/embed/dQw4w9WgXcQ');
        expect(iframe).toHaveAttribute('width', '560');
        expect(iframe).toHaveAttribute('height', '315');
        expect(iframe).toHaveAttribute('allowfullscreen');
    });

    /**
     * Test that YouTube component renders BBCode in bbcode mode
     */
    it('should render BBCode in bbcode mode', () => {
        render(<YouTube mode="bbcode" v="dQw4w9WgXcQ" />);

        expect(screen.getByText('[youtube]dQw4w9WgXcQ[/youtube]')).toBeInTheDocument();
    });

    /**
     * Test that YouTube component handles different video IDs
     */
    it('should handle different video IDs', () => {
        render(<YouTube mode="html" v="abc123XYZ" />);

        const iframe = screen.getByTitle('YouTube video player');
        expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/embed/abc123XYZ');
    });

    /**
     * Test that YouTube component renders correct BBCode with different video IDs
     */
    it('should render correct BBCode with different video IDs', () => {
        render(<YouTube mode="bbcode" v="xyz789ABC" />);

        expect(screen.getByText('[youtube]xyz789ABC[/youtube]')).toBeInTheDocument();
    });

    /**
     * Test that YouTube component has proper iframe attributes for accessibility
     */
    it('should have proper iframe attributes for accessibility', () => {
        render(<YouTube mode="html" v="testVideo123" />);

        const iframe = screen.getByTitle('YouTube video player');
        expect(iframe).toHaveAttribute('title', 'YouTube video player');
        expect(iframe).toHaveAttribute(
            'allow',
            'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
        );
        expect(iframe).toHaveAttribute('allowfullscreen');
    });

    /**
     * Test that YouTube component handles empty video ID in html mode
     */
    it('should handle empty video ID in html mode', () => {
        render(<YouTube mode="html" v="" />);

        const iframe = screen.getByTitle('YouTube video player');
        expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/embed/');
    });

    /**
     * Test that YouTube component handles empty video ID in bbcode mode
     */
    it('should handle empty video ID in bbcode mode', () => {
        render(<YouTube mode="bbcode" v="" />);

        expect(screen.getByText('[youtube][/youtube]')).toBeInTheDocument();
    });

    /**
     * Test that YouTube component sets correct iframe dimensions
     */
    it('should set correct iframe dimensions', () => {
        render(<YouTube mode="html" v="testVideo" />);

        const iframe = screen.getByTitle('YouTube video player');
        expect(iframe).toHaveAttribute('width', '560');
        expect(iframe).toHaveAttribute('height', '315');
        // These dimensions maintain a 16:9 aspect ratio (560/315 ≈ 1.78)
    });

    /**
     * Test that YouTube component has no children prop
     */
    it('should not accept children prop', () => {
        // The YouTube component interface doesn't extend children from BBCodeComponentProps
        render(<YouTube mode="html" v="testVideo" />);

        const iframe = screen.getByTitle('YouTube video player');
        expect(iframe).toBeInTheDocument();
        expect(iframe.textContent).toBe('');
    });

    /**
     * Test that YouTube component doesn't render extra content
     */
    it('should not render extra content in bbcode mode', () => {
        const { container } = render(<YouTube mode="bbcode" v="testVideo" />);

        expect(container.textContent).toBe('[youtube]testVideo[/youtube]');
        // Should not have any extra whitespace or newlines
    });
});
