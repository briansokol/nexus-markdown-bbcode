import { ThemeContext } from '@/theme/theme-context';
import type { ColorConfig } from '@/theme/types';
import { type BBCodeComponentProps } from '@/types/components';
import { use, useMemo } from 'react';

interface ColorProps extends BBCodeComponentProps {
    textColor: keyof ColorConfig;
}

export function Color({ mode, textColor, children }: ColorProps) {
    const theme = use(ThemeContext);
    const color = useMemo(() => theme.getColor(textColor), [theme, textColor]);

    return mode === 'bbcode' ? (
        <>
            [color={color}]{children}[/color]
        </>
    ) : (
        <span style={{ color }}>{children}</span>
    );
}
