import { useThemeManager } from '@/theme-manager/theme-manager';
import type { ColorConfig } from '@/theme-manager/types';
import { type BBCodeComponentProps } from '@/types/components';
import { useMemo } from 'react';

interface ColorProps extends BBCodeComponentProps {
    textColor: keyof ColorConfig;
}

export function Color({ mode, textColor, children }: ColorProps) {
    const themeManager = useThemeManager();
    const color = useMemo(() => themeManager.getColor(textColor), [themeManager, textColor]);

    return mode === 'bbcode' ? (
        <>
            [color={color}]{children}[/color]
        </>
    ) : (
        <span style={{ color }}>{children}</span>
    );
}
