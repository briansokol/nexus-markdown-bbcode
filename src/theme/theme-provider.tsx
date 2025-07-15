import { getSavedTheme, makeThemeFunctions, ThemeContext } from '@/theme/theme-context';
import type { ThemeConfig } from '@/theme/types';
import { type FC, type ReactNode, useMemo, useState } from 'react';

interface ThemeProviderProps {
    children: ReactNode;
}

/**
 * Provider component for the Theme Context
 * Manages the state of the theme and provides it to child components
 *
 * @param props - The component props
 * @returns A context provider component
 */
export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<ThemeConfig>(getSavedTheme());

    const value = useMemo(() => makeThemeFunctions(theme, setTheme), [theme, setTheme]);

    return <ThemeContext value={value}>{children}</ThemeContext>;
};
