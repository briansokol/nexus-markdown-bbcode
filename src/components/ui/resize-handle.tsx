/** @jsxImportSource @emotion/react */
import { useCallback, useEffect, useRef, useState } from 'react';
import * as styles from './resize-handle.styles';

interface ResizeHandleProps {
    /**
     * Callback fired when the resize handle is dragged
     * @param leftWidth - The new width percentage for the left panel (0-100)
     */
    onResize: (leftWidth: number) => void;
}

/**
 * A draggable resize handle component that allows users to adjust the width
 * of two adjacent panels horizontally
 */
export function ResizeHandle({ onResize }: ResizeHandleProps) {
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    /**
     * Handle mouse down event to start dragging
     */
    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    /**
     * Handle mouse move event during dragging
     */
    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (!isDragging || !containerRef.current) return;

            const container = containerRef.current.parentElement;
            if (!container) return;

            const containerRect = container.getBoundingClientRect();
            const mouseX = e.clientX - containerRect.left;
            const newLeftWidth = Math.min(Math.max((mouseX / containerRect.width) * 100, 10), 90);

            onResize(newLeftWidth);
        },
        [isDragging, onResize],
    );

    /**
     * Handle mouse up event to stop dragging
     */
    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    /**
     * Add/remove global mouse event listeners for dragging
     */
    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = 'col-resize';
            document.body.style.userSelect = 'none';
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        };
    }, [isDragging, handleMouseMove, handleMouseUp]);

    return (
        <div
            ref={containerRef}
            css={[styles.resizeHandle, isDragging && styles.resizeHandleDragging]}
            onMouseDown={handleMouseDown}
            data-testid="resize-handle"
            aria-label="Resize panels"
        >
            <div css={styles.resizeHandleGrip} />
        </div>
    );
}
