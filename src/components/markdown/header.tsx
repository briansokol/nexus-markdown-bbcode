import * as styles from '@/components/markdown/header.styles';
import { fontFamilyMap } from '@/theme/options';
import { ThemeContext } from '@/theme/theme-context';
import type { BBCodeComponentProps } from '@/types/components';
import { useCleanChildren } from '@/utils/bbcode';
import { use, useMemo, type JSX } from 'react';

interface HeaderProps extends BBCodeComponentProps {
    level: '1' | '2';
}

export function Header({ mode, level, children, tempTheme }: HeaderProps) {
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;
    const theme = use(ThemeContext);
    const headerLevel = useMemo(
        () => theme.getHeaderLevel(level, tempTheme),
        [theme, level, tempTheme],
    );
    const css = useMemo(() => {
        return styles.header(headerLevel, !tempTheme);
    }, [headerLevel, tempTheme]);
    const fontFamily = useMemo(() => {
        return fontFamilyMap[headerLevel.fontFamily].bbcode;
    }, [headerLevel.fontFamily]);
    const cleanChildren = useCleanChildren(children, headerLevel.uppercase);

    return mode === 'bbcode' ? (
        <>
            {`[size=${headerLevel.size}]`}
            {fontFamily ? `[font=${fontFamily}]` : ''}
            {headerLevel.bold ? '[b]' : ''}
            {headerLevel.italic ? '[i]' : ''}
            {headerLevel.underline ? '[u]' : ''}
            {headerLevel.color ? `[color=${headerLevel.color}]` : ''}
            {cleanChildren}
            {headerLevel.color ? '[/color]' : ''}
            {headerLevel.underline ? '[/u]' : ''}
            {headerLevel.italic ? '[/i]' : ''}
            {headerLevel.bold ? '[/b]' : ''}
            {fontFamily ? `[/font]` : ''}
            {`[/size]`}
            {`\n`}
        </>
    ) : (
        <Tag css={css}>{children}</Tag>
    );
}
