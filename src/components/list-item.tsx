import type { BBCodeComponentProps } from '@/types/components';
import { useCleanChildren } from '@/utils/bbcode';

export const ListItem = ({ mode, children }: BBCodeComponentProps) => {
    const cleanChildren = useCleanChildren(children);

    return mode === 'bbcode' ? (
        <>
            [*][size=3]{cleanChildren}[/size]{'\n'}
        </>
    ) : (
        <li>{cleanChildren}</li>
    );
};
