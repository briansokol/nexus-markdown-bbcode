import type { BBCodeComponentProps } from '@/types/components';
import { useCleanChildren } from '@/utils/bbcode';

export const Strong = ({ mode, children }: BBCodeComponentProps) => {
    const cleanChildren = useCleanChildren(children);

    return mode === 'bbcode' ? <>[b]{cleanChildren}[/b]</> : <strong>{cleanChildren}</strong>;
};
