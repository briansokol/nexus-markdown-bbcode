import '@/components/markdown/strong.css';
import type { BBCodeComponentProps } from '@/types/components';
import { useCleanChildren } from '@/utils/bbcode';

export function Strong({ mode, children }: BBCodeComponentProps) {
    const cleanChildren = useCleanChildren(children);

    return mode === 'bbcode' ? <>[b]{cleanChildren}[/b]</> : <strong>{cleanChildren}</strong>;
}
