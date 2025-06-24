import * as styles from '@/components/markdown/spoiler.styles';
import type { BBCodeComponentProps } from '@/types/components';
import { useCleanChildren } from '@/utils/bbcode';

export function Spoiler({ mode, children }: BBCodeComponentProps) {
    const cleanChildren = useCleanChildren(children);

    return mode === 'bbcode' ? (
        <>[spoiler]{cleanChildren}[/spoiler]</>
    ) : (
        <div css={styles.spoiler}>{cleanChildren}</div>
    );
}
