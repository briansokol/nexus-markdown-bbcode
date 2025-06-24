import * as styles from '@/components/markdown/paragraph.styles';
import type { BBCodeComponentProps } from '@/types/components';
import { useCleanChildren } from '@/utils/bbcode';

interface ParagraphProps extends BBCodeComponentProps {
    size?: 2 | 3;
}

export function Paragraph({ mode, children = '', size }: ParagraphProps) {
    const cleanChildren = useCleanChildren(children);

    return mode === 'bbcode' ? (
        <>
            [size={size ?? 3}]{cleanChildren}[/size]{'\n'}
        </>
    ) : (
        <p css={size === 2 ? styles.caption : styles.paragraph}>{children}</p>
    );
}
