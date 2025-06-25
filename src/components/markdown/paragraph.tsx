import * as styles from '@/components/markdown/paragraph.styles';
import { useThemeManager } from '@/theme-manager/theme-manager';
import type { BBCodeComponentProps } from '@/types/components';
import { useCleanChildren } from '@/utils/bbcode';
import { useMemo } from 'react';

interface ParagraphProps extends BBCodeComponentProps {
    caption?: boolean;
}

export function Paragraph({ mode, children = '', caption }: ParagraphProps) {
    const cleanChildren = useCleanChildren(children);
    const theme = useThemeManager();
    const css = useMemo(() => {
        return styles.paragraph(theme.getParagraphSize(), caption ?? false);
    }, [caption, theme]);
    const size = useMemo(() => {
        return caption ? theme.getCaptionSize() : theme.getParagraphSize();
    }, [caption, theme]);

    return mode === 'bbcode' ? (
        <>
            [size={size}]{cleanChildren}[/size]{'\n'}
        </>
    ) : caption ? (
        <span css={css}>{children}</span>
    ) : (
        <p css={css}>{children}</p>
    );
}
