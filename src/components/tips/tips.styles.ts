import { css } from '@emotion/react';

export const tipsContainer = css`
    height: 75vh;
    width: 75vw;
    display: flex;
    flex-direction: column;
`;

export const tipsHeader = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #ddd;
    flex-shrink: 0;

    h1 {
        margin: 0;
    }
`;

export const tipsClose = css`
    padding: 0.5rem 0.75rem;
    cursor: pointer;
    background-color: rgb(41 41 46);
    color: white;
    border-radius: 1rem;
    font-size: 1.5rem;
    line-height: 1;
    border: none;
`;

export const tipsContent = css`
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
