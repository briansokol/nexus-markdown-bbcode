import { type BBCodeComponentProps, Colors } from '@/types/components';

interface ColorProps extends BBCodeComponentProps {
    textColor: Colors;
}

const colorMap: Record<Colors, string> = {
    [Colors.Red]: '#e06666',
    [Colors.Green]: '#93c47d',
    [Colors.Blue]: '#6fa8dc',
    [Colors.Yellow]: '#ffd966',
};

export function Color({ mode, textColor, children }: ColorProps) {
    return mode === 'bbcode' ? (
        <>
            [color={colorMap[textColor]}]{children}[/color]
        </>
    ) : (
        <span style={{ color: colorMap[textColor] }}>{children}</span>
    );
}
