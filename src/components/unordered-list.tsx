import type { BBCodeComponentProps } from '@/types/components';
import { useCleanChildren } from '@/utils/bbcode';

export function UnorderedList({ mode, children }: BBCodeComponentProps) {
    const cleanChildren = useCleanChildren(children);

    return mode === 'bbcode' ? (
        <>
            [list]{'\n'}
            {cleanChildren}[/list]
        </>
    ) : (
        <ul>{cleanChildren}</ul>
    );
}
