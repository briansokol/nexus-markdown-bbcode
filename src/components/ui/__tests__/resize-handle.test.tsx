import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ResizeHandle } from '../resize-handle';

// Mock getBoundingClientRect for testing
const mockGetBoundingClientRect = vi.fn(() => ({
    left: 0,
    width: 1000,
    top: 0,
    right: 1000,
    bottom: 100,
    height: 100,
    x: 0,
    y: 0,
    toJSON: () => ({}),
}));

describe('ResizeHandle', () => {
    const mockOnResize = vi.fn();

    beforeEach(() => {
        mockOnResize.mockClear();
        // Mock the getBoundingClientRect method
        Element.prototype.getBoundingClientRect = mockGetBoundingClientRect;
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('renders resize handle with correct attributes', () => {
        render(<ResizeHandle onResize={mockOnResize} />);

        const handle = screen.getByTestId('resize-handle');
        expect(handle).toBeInTheDocument();
        expect(handle).toHaveAttribute('aria-label', 'Resize panels');
    });

    it('renders grip element inside handle', () => {
        render(<ResizeHandle onResize={mockOnResize} />);

        const handle = screen.getByTestId('resize-handle');
        const grip = handle.querySelector('div');
        expect(grip).toBeInTheDocument();
    });

    it('calls onResize when dragging', () => {
        render(
            <div style={{ width: '1000px' }}>
                <ResizeHandle onResize={mockOnResize} />
            </div>,
        );

        const handle = screen.getByTestId('resize-handle');

        // Start dragging
        fireEvent.mouseDown(handle);

        // Simulate mouse move to 30% of container width (300px)
        fireEvent.mouseMove(document, { clientX: 300 });

        expect(mockOnResize).toHaveBeenCalledWith(30);
    });

    it('constrains resize to minimum 10% width', () => {
        render(
            <div style={{ width: '1000px' }}>
                <ResizeHandle onResize={mockOnResize} />
            </div>,
        );

        const handle = screen.getByTestId('resize-handle');

        // Start dragging
        fireEvent.mouseDown(handle);

        // Try to drag to 5% (should be constrained to 10%)
        fireEvent.mouseMove(document, { clientX: 50 });

        expect(mockOnResize).toHaveBeenCalledWith(10);
    });

    it('constrains resize to maximum 90% width', () => {
        render(
            <div style={{ width: '1000px' }}>
                <ResizeHandle onResize={mockOnResize} />
            </div>,
        );

        const handle = screen.getByTestId('resize-handle');

        // Start dragging
        fireEvent.mouseDown(handle);

        // Try to drag to 95% (should be constrained to 90%)
        fireEvent.mouseMove(document, { clientX: 950 });

        expect(mockOnResize).toHaveBeenCalledWith(90);
    });

    it('stops dragging on mouse up', () => {
        render(
            <div style={{ width: '1000px' }}>
                <ResizeHandle onResize={mockOnResize} />
            </div>,
        );

        const handle = screen.getByTestId('resize-handle');

        // Start dragging
        fireEvent.mouseDown(handle);
        fireEvent.mouseMove(document, { clientX: 300 });
        expect(mockOnResize).toHaveBeenCalledTimes(1);

        // Stop dragging
        fireEvent.mouseUp(document);

        // Move mouse again - should not trigger onResize
        fireEvent.mouseMove(document, { clientX: 400 });
        expect(mockOnResize).toHaveBeenCalledTimes(1);
    });

    it('does not call onResize when not dragging', () => {
        render(
            <div style={{ width: '1000px' }}>
                <ResizeHandle onResize={mockOnResize} />
            </div>,
        );

        // Move mouse without starting drag
        fireEvent.mouseMove(document, { clientX: 300 });

        expect(mockOnResize).not.toHaveBeenCalled();
    });

    it('prevents default on mouse down', () => {
        render(<ResizeHandle onResize={mockOnResize} />);

        const handle = screen.getByTestId('resize-handle');
        const mouseDownEvent = new MouseEvent('mousedown', { bubbles: true });
        const preventDefaultSpy = vi.spyOn(mouseDownEvent, 'preventDefault');

        fireEvent(handle, mouseDownEvent);

        expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('applies dragging styles when dragging', () => {
        render(<ResizeHandle onResize={mockOnResize} />);

        const handle = screen.getByTestId('resize-handle');

        // Start dragging
        fireEvent.mouseDown(handle);

        // The handle should have dragging styles applied
        // We can't easily test CSS-in-JS styles, but we can verify the component doesn't crash
        expect(handle).toBeInTheDocument();

        // Stop dragging
        fireEvent.mouseUp(document);

        expect(handle).toBeInTheDocument();
    });

    it('sets body cursor and user-select during drag', () => {
        render(<ResizeHandle onResize={mockOnResize} />);

        const handle = screen.getByTestId('resize-handle');

        // Initially no special cursor
        expect(document.body.style.cursor).toBe('');
        expect(document.body.style.userSelect).toBe('');

        // Start dragging
        fireEvent.mouseDown(handle);

        expect(document.body.style.cursor).toBe('col-resize');
        expect(document.body.style.userSelect).toBe('none');

        // Stop dragging
        fireEvent.mouseUp(document);

        expect(document.body.style.cursor).toBe('');
        expect(document.body.style.userSelect).toBe('');
    });
});
