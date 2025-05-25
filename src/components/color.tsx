import type { BBCodeComponentProps } from '@/types/components';

type Colors = 'red' | 'green' | 'blue' | 'yellow';

interface ColorProps extends BBCodeComponentProps {
    color: Colors;
}

const colorMap: Record<Colors, string> = {
    red: '#e06666',
    green: '#93c47d',
    blue: '#6fa8dc',
    yellow: '#ffd966',
};

export const Color = ({ mode, color, children }: ColorProps) => {
    return mode === 'bbcode' ? (
        <>
            [color={color}]{children}[/color]
        </>
    ) : (
        <span style={{ color: colorMap[color] }}>{children}</span>
    );
};
