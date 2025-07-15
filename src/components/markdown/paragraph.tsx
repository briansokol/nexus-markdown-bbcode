import * as styles from '@/components/markdown/paragraph.styles';
import { ThemeContext } from '@/theme/theme-context';
import type { BBCodeComponentProps } from '@/types/components';
import { useCleanChildren } from '@/utils/bbcode';
import { use, useMemo } from 'react';

interface ParagraphProps extends BBCodeComponentProps {
    caption?: boolean;
}

export function Paragraph({ mode, children = '', caption, tempTheme }: ParagraphProps) {
    const cleanChildren = useCleanChildren(children);
    const theme = use(ThemeContext);
    const css = useMemo(() => {
        return styles.paragraph(theme.getParagraphSize(tempTheme), caption ?? false);
    }, [caption, tempTheme, theme]);
    const size = useMemo(() => {
        return caption ? theme.getCaptionSize(tempTheme) : theme.getParagraphSize(tempTheme);
    }, [caption, tempTheme, theme]);

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
