import { css } from '@emotion/react';

export const actionButton = css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: #4a4a4a;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s;

    &:hover {
        background-color: #5a5a5a;
    }
`;

export const actionButtonIcon = css`
    display: flex;
    align-items: center;
    font-size: 16px;
`;

export const actionButtonLabel = css`
    white-space: nowrap;
`;
