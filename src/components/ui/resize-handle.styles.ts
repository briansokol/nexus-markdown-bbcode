import { css } from '@emotion/react';

export const resizeHandle = css`
    width: 8px;
    height: 100%;
    background-color: #444;
    cursor: col-resize;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #555;
    }
`;

export const resizeHandleDragging = css`
    background-color: #007acc;
`;

export const resizeHandleGrip = css`
    width: 2px;
    height: 24px;
    background-color: #666;
    border-radius: 1px;
    position: relative;

    &::before,
    &::after {
        content: '';
        position: absolute;
        width: 2px;
        height: 24px;
        background-color: #666;
        border-radius: 1px;
    }

    &::before {
        left: -3px;
    }

    &::after {
        left: 3px;
    }
`;
