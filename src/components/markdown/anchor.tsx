/** @jsxImportSource @emotion/react */
import * as styles from '@/components/markdown/anchor.styles';
import type { BBCodeComponentProps } from '@/types/components';
import { useCleanChildren } from '@/utils/bbcode';

interface AnchorProps extends BBCodeComponentProps {
    href?: string;
}

export function Anchor({ mode, href, children }: AnchorProps) {
    const cleanChildren = useCleanChildren(children);

    return mode === 'bbcode' ? (
        <>
            [url={href}]{cleanChildren}[/url]
        </>
    ) : (
        <a href={href} css={styles.anchor}>
            {children}
        </a>
    );
}
