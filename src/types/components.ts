import type { ReactNode } from 'react';

export interface BBCodeComponentProps {
    mode: 'html' | 'bbcode';
    children?: ReactNode;
}
