import { css } from '@emotion/react';

export const globalStyles = css`
    #root {
        width: 100%;
        height: 100vh;
        margin: 0;
        padding: 0;
    }
`;

export const appContainer = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    overflow: hidden;
`;

export const buttonsContainer = css`
    padding: 1rem;
    background-color: #2c2c2c;
    border-bottom: 1px solid #444;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
`;

export const leftButtons = css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

export const hiddenFileInput = css`
    display: none;
`;

export const filenameInput = css`
    padding: 0.5rem;
    background-color: #3a3a3a;
    color: white;
    border: 1px solid #555;
    border-radius: 4px;
    font-size: 14px;
    min-width: 200px;
    transition: border-color 0.2s;

    &:focus {
        outline: none;
        border-color: #007acc;
        background-color: #2a2a2a;
    }

    &::placeholder {
        color: #999;
    }
`;

export const contentArea = css`
    display: flex;
    flex: 1;
    width: 100%;
    overflow: hidden;
`;

export const editorContainer = css`
    width: 50%;
    height: 100%;
    padding: 1rem;
    box-sizing: border-box;
    padding-right: 0.5rem;
`;

export const previewContainer = css`
    width: 50%;
    height: 100%;
    padding: 1rem;
    box-sizing: border-box;
    padding-left: 0.5rem;
`;

export const markdownInput = css`
    width: 100%;
    height: 100%;
    padding: 1rem;
    box-sizing: border-box;
    resize: none;
    font-family: monospace;
    font-size: 16px;
    line-height: 1.5;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #1e1e1e;
    color: #e0e0e0;
`;

export const htmlPreview = css`
    width: 100%;
    height: 100%;
    padding: 1rem;
    box-sizing: border-box;
    overflow: auto;
    border: 1px solid #666;
    border-radius: 4px;
    background-color: rgb(41 41 46);
    color: #f1f1f1;
    text-align: left;
`;

export const tipsDialog = css`
    background-color: rgb(41 41 46);
    color: #f1f1f1;
    border-radius: 1rem;
    border: 1px solid #555;
    box-shadow: 0 10px 25px rgb(0 0 0 / 50%);

    &::backdrop {
        background-color: rgb(0 0 0 / 50%);
        backdrop-filter: blur(10px);
    }
`;
