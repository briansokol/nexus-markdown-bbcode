import type { ComponentType, JSX, ReactNode } from 'react';
import type { ExtraProps } from 'react-markdown';

export interface BBCodeComponentProps {
    mode: 'html' | 'bbcode';
    children?: ReactNode;
}

export enum Colors {
    Red,
    Green,
    Blue,
    Yellow,
}

export type CustomDirective<
    E extends keyof JSX.IntrinsicElements,
    P extends BBCodeComponentProps,
> = ComponentType<JSX.IntrinsicElements[E] & ExtraProps & Omit<P, keyof BBCodeComponentProps>>;
