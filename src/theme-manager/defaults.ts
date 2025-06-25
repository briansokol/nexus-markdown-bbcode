import type { ThemeConfig } from '@/theme-manager/types';

export const defaultTheme: ThemeConfig = {
    header: {
        level1: {
            size: '5',
            color: '#a5c4f3',
            bold: true,
            italic: false,
            underline: false,
            uppercase: true,
            fontFamily: 'trebuchet',
        },
        level2: {
            size: '4',
            color: '#a5c4f3',
            bold: false,
            italic: true,
            underline: false,
            uppercase: true,
            fontFamily: 'trebuchet',
        },
    },
    colors: {
        red: '#ff0000',
        green: '#00ff00',
        blue: '#0000ff',
        yellow: '#ffff00',
        purple: '#800080',
        orange: '#ffa500',
        pink: '#ffc0cb',
    },
    paragraph: {
        size: '3',
    },
    caption: {
        size: '2',
    },
};
