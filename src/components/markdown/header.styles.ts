import { css } from '@emotion/react';

export const header = css`
    font-weight: 700;
    letter-spacing: 0.3px;
    margin: 0 0 1rem;
    font-family: Trebuchet, 'Trebuchet MS', sans-serif;
    text-transform: uppercase;
`;

export const header1 = css`
    ${header}
    font-size: 24px;
    line-height: 31.2px;
    color: #a5c4f3;
`;

export const header2 = css`
    ${header}
    font-size: 18px;
    line-height: 23.4px;
    font-style: italic;
    color: #a5c4f3;
`;
