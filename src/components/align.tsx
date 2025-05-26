import '@/components/align.css';
import type { BBCodeComponentProps } from '@/types/components';
import { useCleanChildren } from '@/utils/bbcode';

interface AlignProps extends BBCodeComponentProps {
    alignment: 'center' | 'right';
}

export function Align({ mode, alignment, children }: AlignProps) {
    const cleanChildren = useCleanChildren(children);

    return mode === 'bbcode' ? (
        <>
            [align={alignment}]{cleanChildren}[/align]
        </>
    ) : (
        <div className={`align-${alignment}`}>{children}</div>
    );
}
