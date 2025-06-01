import '@/components/spoiler.css';
import type { BBCodeComponentProps } from '@/types/components';
import { useCleanChildren } from '@/utils/bbcode';

export function Spoiler({ mode, children }: BBCodeComponentProps) {
    const cleanChildren = useCleanChildren(children);

    return mode === 'bbcode' ? (
        <>[spoiler]{cleanChildren}[/spoiler]</>
    ) : (
        <div className="spoiler">{cleanChildren}</div>
    );
}
