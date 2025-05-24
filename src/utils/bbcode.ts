import React, { isValidElement, useMemo, type ReactNode } from 'react';

/**
 * Cleans a string by replacing line breaks with spaces and normalizing multiple spaces
 *
 * @param input - The string to clean
 * @returns The cleaned string
 */
function cleanString(input: string): string {
    // Replace line breaks with single space, then collapse multiple spaces into one
    return input.replace(/[\r\n]+/g, ' ').replace(/ +/g, ' ');
}

/**
 * Cleans BBCode from a ReactNode by traversing through the children
 * and only cleaning the string leaves.
 *
 * @param input - The ReactNode to clean BBCode from
 * @returns The cleaned ReactNode
 */
export function cleanBBCode(input: ReactNode | ReactNode[]): ReactNode | ReactNode[] {
    // If input is a string, clean it
    if (typeof input === 'string') {
        return cleanString(input);
    }

    // If input is an array, clean each element
    if (Array.isArray(input)) {
        return input.map((child: ReactNode) => cleanBBCode(child));
    }

    // If input is a React element, reconstruct it with cleaned children
    if (isValidElement(input)) {
        const props = input.props as Record<string, unknown>;
        return input.type && (typeof input.type === 'string' || typeof input.type === 'function')
            ? React.createElement(
                  input.type,
                  { ...props, key: input.key },
                  cleanBBCode(props.children as ReactNode),
              )
            : input;
    }

    // For other types (number, boolean, null, undefined), return as is
    return input;
}

export function useCleanChildren(children: ReactNode): ReactNode {
    return useMemo(() => cleanBBCode(children), [children]);
}
