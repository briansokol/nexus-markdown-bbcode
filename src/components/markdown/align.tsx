import '@/components/markdown/align.css';
import type { BBCodeComponentProps } from '@/types/components';
import { useCleanChildren } from '@/utils/bbcode';

interface AlignProps extends BBCodeComponentProps {
    alignment: 'center' | 'right';
}

export function Align({ mode, alignment, children }: AlignProps) {
    const cleanChildren = useCleanChildren(children);

    return mode === 'bbcode' ? (
        <>
            [{alignment}]{cleanChildren}[/{alignment}]
        </>
    ) : (
        <div className={`align-${alignment}`}>{children}</div>
    );
}
