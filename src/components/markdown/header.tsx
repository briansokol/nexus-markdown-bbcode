import * as styles from '@/components/markdown/header.styles';
import { fontFamilyMap } from '@/theme-manager/options';
import { useThemeManager } from '@/theme-manager/theme-manager';
import type { BBCodeComponentProps } from '@/types/components';
import { useCleanChildren } from '@/utils/bbcode';
import { useMemo, type JSX } from 'react';

interface HeaderProps extends BBCodeComponentProps {
    level: '1' | '2';
}

export function Header({ mode, level, children }: HeaderProps) {
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;
    const theme = useThemeManager();
    const headerLevel = useMemo(() => theme.getHeaderLevel(level), [theme, level]);
    const css = useMemo(() => {
        return styles.header(headerLevel);
    }, [headerLevel]);
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
