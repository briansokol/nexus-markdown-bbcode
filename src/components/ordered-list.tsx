import type { BBCodeComponentProps } from '@/types/components';
import { useCleanChildren } from '@/utils/bbcode';

export const OrderedList = ({ mode, children }: BBCodeComponentProps) => {
    const cleanChildren = useCleanChildren(children);

    return mode === 'bbcode' ? (
        <>
            [list=1]{'\n'}
            {cleanChildren}[/list]
        </>
    ) : (
        <ol>{cleanChildren}</ol>
    );
};
