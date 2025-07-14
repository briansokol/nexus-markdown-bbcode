import { css } from '@emotion/react';

export const formContainer = css`
    margin: 0 auto;
    font-family: Inter, sans-serif;

    & > h2 {
        border-bottom: 1px solid #f1f1f1;
    }

    & > h3 {
        font-style: italic;
    }
`;

export const formSection = css`
    margin: 1rem 0.5rem;
    margin-bottom: 2rem;
    max-width: 30rem;

    & > h3 {
        font-style: italic;
    }
`;

export const formGroup = css`
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    gap: 1rem;

    &:last-child {
        margin-bottom: 0;
    }
`;

export const formLabel = css`
    min-width: 7.5rem;
    font-weight: 500;
    color: #f1f1f1;
    text-align: right;
`;

export const formInput = css`
    flex: 1;
    padding: 0.5rem 0.75rem;
    color: #f1f1f1;
    border: 1px solid hsl(240, 6%, 40%);
    background-color: hsl(240, 6%, 15%);
    border-radius: 4px;
    font-size: 0.9rem;
    font-family: inherit;

    &:focus {
        outline: none;
        border-color: #80bdff;
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }
`;

export const formSelect = css`
    flex: 1;
    padding: 0.5rem 2rem 0.5rem 0.75rem;
    border-radius: 4px;
    font-size: 0.9rem;
    font-family: inherit;
    color: #f1f1f1;
    border: 1px solid hsl(240, 6%, 40%);
    background-color: hsl(240, 6%, 15%);
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23f1f1f1' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 1rem;
    appearance: none;
    cursor: pointer;

    &:focus {
        outline: none;
        border-color: #80bdff;
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }
`;

export const formCheckbox = css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    margin-left: 7.5rem;

    input[type='checkbox'] {
        margin: 0;
        cursor: pointer;
        width: 1rem;
        height: 1rem;
        appearance: none;
        border: 1px solid hsl(240, 6%, 40%);
        border-radius: 2px;
        background-color: hsl(240, 6%, 25%);
        position: relative;

        &:checked {
            background-color: #007bff;
            border-color: #007bff;
        }

        &:checked::after {
            content: '';
            position: absolute;
            left: 0.25rem;
            top: 0.05rem;
            width: 0.25rem;
            height: 0.5rem;
            border: solid white;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
        }

        &:focus {
            outline: none;
            box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
        }
    }
`;

export const colorInput = css`
    width: 50px;
    height: 38px;
    border: 1px solid hsl(240, 6%, 40%);
    background-color: hsl(240, 6%, 15%);
    border-radius: 4px;
    cursor: pointer;
    padding: 2px;

    &::-webkit-color-swatch-wrapper {
        padding: 0;
    }

    &::-webkit-color-swatch {
        border: none;
        border-radius: 2px;
    }
`;

export const buttonGroup = css`
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #e9ecef;
`;

export const primaryButton = css`
    padding: 0.75rem 2rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #0056b3;
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
    }
`;

export const secondaryButton = css`
    padding: 0.75rem 2rem;
    background-color: #6c757d;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #545b62;
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 0.2rem rgba(108, 117, 125, 0.5);
    }
`;
