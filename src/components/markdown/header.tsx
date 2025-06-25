import * as styles from '@/components/markdown/header.styles';
import type { BBCodeComponentProps } from '@/types/components';
import { useCleanChildren } from '@/utils/bbcode';
import type { JSX } from 'react';

interface HeaderProps extends BBCodeComponentProps {
    level: '1' | '2';
}

const headerLevel = {
    '1': '5',
    '2': '4',
};

const headerColor = {
    '1': '#a5c4f3',
    '2': '#a5c4f3',
};

export function Header({ mode, level, children }: HeaderProps) {
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;
    const cleanChildren = useCleanChildren(children, true);

    return mode === 'bbcode' ? (
        <>
            {`[size=${headerLevel[level]}][font=Trebuchet MS][b]${level === '2' ? '[i]' : ''}${headerColor[level] ? `[color=${headerColor[level]}]` : ''}`}
            {cleanChildren}
            {`${headerColor[level] ? '[/color]' : ''}${level === '2' ? '[/i]' : ''}[/b][/font][/size]\n`}
        </>
    ) : (
        <Tag css={level === '1' ? styles.header1 : styles.header2}>{children}</Tag>
    );
}
