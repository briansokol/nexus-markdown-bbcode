import { css } from '@emotion/react';

export const globalStyles = css`
    :root {
        font-family: Inter, sans-serif;
        line-height: 1.5;
        font-weight: 400;
        color: rgb(255 255 255);
        background-color: #242424;
        font-synthesis: none;
        text-rendering: optimizelegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    body {
        margin: 0;
        padding: 0;
        min-width: 320px;
        min-height: 100vh;
        overflow: hidden;
    }

    button {
        border-radius: 8px;
        border: 1px solid transparent;
        padding: 0.6em 1.2em;
        font-size: 1em;
        font-weight: 500;
        font-family: inherit;
        background-color: #1a1a1a;
        cursor: pointer;
        transition: border-color 0.25s;

        &:hover {
            border-color: #646cff;
        }

        &:focus,
        &:focus-visible {
            outline: 4px auto -webkit-focus-ring-color;
        }
    }

    #root {
        width: 100%;
        height: 100vh;
        margin: 0;
        padding: 0;
    }
`;
