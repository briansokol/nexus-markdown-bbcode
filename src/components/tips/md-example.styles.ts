import { css } from '@emotion/react';

export const mdExample = css`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 1rem 0;
    border: 1px solid rgb(255 255 255 / 20%);
    background-color: rgb(0 0 0 / 10%);
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;

    > div {
        margin-left: 1.5rem;
    }
`;

export const mdExampleHeader = css`
    margin-top: 0.5rem;
    margin-bottom: 0.25rem;
`;

export const mdExampleTitle = css`
    margin: 0.5rem 0 0;
    font-size: 1rem;
    font-weight: bold;
`;

export const mdExampleInput = css`
    margin: 0;
    font-size: 1rem;
`;

export const mdExampleOutput = css`
    margin: 0;
    font-size: 1rem;
`;
