import { css } from '@emotion/react';

export const modalContainer = css`
    height: 75vh;
    width: 75vw;
    display: flex;
    flex-direction: column;
    padding: 0;
`;

export const modalHeader = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem;
    background-color: hsl(240, 6%, 25%);
    flex-shrink: 0;

    h1 {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 400;
    }
`;

export const modalClose = css`
    padding: 0.25rem 0.5rem;
    cursor: pointer;
    color: #f1f1f1;
    background-color: transparent;
    border-radius: 1rem;
    font-size: 1.5rem;
    line-height: 1;
    border: none;
`;

export const modalContent = css`
    flex: 1;
    scroll-behavior: smooth;
    overflow-y: auto;
    padding: 1rem;

    & > h2 {
        border-bottom: 1px solid #ddd;
    }

    & > h3 {
        font-style: italic;
    }
`;
