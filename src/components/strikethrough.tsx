import type { BBCodeComponentProps } from '@/types/components';
import { useCleanChildren } from '@/utils/bbcode';

export const Strikethrough = ({ mode, children }: BBCodeComponentProps) => {
    const cleanChildren = useCleanChildren(children);

    return mode === 'bbcode' ? <>[s]{cleanChildren}[/s]</> : <del>{cleanChildren}</del>;
};
