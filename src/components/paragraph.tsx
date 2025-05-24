import '@/components/paragraph.css';
import type { BBCodeComponentProps } from '@/types/components';
import { useCleanChildren } from '@/utils/bbcode';

export function Paragraph({ mode, children = '' }: BBCodeComponentProps) {
    const cleanChildren = useCleanChildren(children);

    return mode === 'bbcode' ? (
        <>
            [size=3]{cleanChildren}[/size]{'\n'}
        </>
    ) : (
        <p className="paragraph">{children}</p>
    );
}
