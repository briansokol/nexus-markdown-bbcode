import '@/components/header.css';
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
    '2': '#ebebeb',
};

export function Header({ mode, level, children }: HeaderProps) {
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;
    const cleanChildren = useCleanChildren(children, true);

    return mode === 'bbcode' ? (
        <>
            {`[size=${headerLevel[level]}][b]${level === '2' ? '[i]' : ''}${headerColor[level] ? `[color=${headerColor[level]}]` : ''}`}
            {cleanChildren}
            {`${headerColor[level] ? '[/color]' : ''}${level === '2' ? '[/i]' : ''}[/b][/size]\n`}
        </>
    ) : (
        <Tag className={`header header-${level}`}>{children}</Tag>
    );
}
