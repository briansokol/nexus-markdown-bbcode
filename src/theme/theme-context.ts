import { defaultTheme } from '@/theme/defaults';
import type { ColorConfig, HeaderLevelConfig, SizeOption, ThemeConfig } from '@/theme/types';
import { createContext, type Dispatch, type SetStateAction } from 'react';

const THEME_STORAGE_KEY = 'nexus-markdown-theme';

/**
 * Retrieves the saved theme configuration from localStorage.
 * @returns The saved theme configuration or the default theme if not found.
 */
export function getSavedTheme(): ThemeConfig {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme) {
        return JSON.parse(savedTheme);
    }
    return defaultTheme;
}

export function makeThemeFunctions(
    theme: ThemeConfig,
    setTheme?: Dispatch<SetStateAction<ThemeConfig>>,
) {
    return {
        /**
         * Current theme configuration
         */
        theme,

        /**
         * Loads saved theme configuration from localStorage or uses default theme.
         */
        loadConfig() {
            const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
            if (savedTheme) {
                const parsedTheme = JSON.parse(savedTheme);
                setTheme?.(parsedTheme);
            } else {
                this.resetConfigToDefaults();
            }
        },

        /**
         * Saves the current theme configuration to localStorage.
         */
        saveConfig(theme: ThemeConfig) {
            localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
            setTheme?.(theme);
        },

        /**
         * Resets the theme configuration to default values and saves it.
         */
        resetConfigToDefaults() {
            this.saveConfig(defaultTheme);
        },

        /**
         * Gets the configuration for a specific header level.
         * @param level - The header level ('1' or '2')
         * @param tempTheme - An optional temporary theme configuration to use
         * @returns The header level configuration
         */
        getHeaderLevel(level: '1' | '2', tempTheme?: ThemeConfig): HeaderLevelConfig {
            return (tempTheme ?? this.theme).header[`level${level}`];
        },

        /**
         * Gets the current paragraph size configuration.
         * @param tempTheme - An optional temporary theme configuration to use
         * @returns The paragraph size option
         */
        getParagraphSize(tempTheme?: ThemeConfig): SizeOption {
            return (tempTheme ?? this.theme).paragraph.size;
        },

        /**
         * Gets the current caption size configuration.
         * @param tempTheme - An optional temporary theme configuration to use
         * @returns The caption size option
         */
        getCaptionSize(tempTheme?: ThemeConfig): SizeOption {
            return (tempTheme ?? this.theme).caption.size;
        },

        /**
         * Gets a color value by its name.
         * @param colorName - The name of the color to retrieve
         * @returns The color value as a string
         */
        getColor(colorName: keyof ColorConfig): string {
            return this.theme.colors[colorName];
        },

        /**
         * Update a header level configuration
         * @param level - The header level to update
         * @param config - The new configuration for the header level
         */
        setHeaderLevel(level: '1' | '2', config: HeaderLevelConfig) {
            this.saveConfig({
                ...this.theme,
                header: {
                    ...this.theme.header,
                    [`level${level}`]: config,
                },
            });
        },

        /**
         * Update paragraph size
         * @param size - The new paragraph size
         */
        setParagraphSize(size: SizeOption) {
            this.saveConfig({
                ...this.theme,
                paragraph: {
                    ...this.theme.paragraph,
                    size,
                },
            });
        },

        /**
         * Update caption size
         * @param size - The new caption size
         */
        setCaptionSize(size: SizeOption) {
            this.saveConfig({
                ...this.theme,
                caption: {
                    ...this.theme.caption,
                    size,
                },
            });
        },

        /**
         * Update a color value
         * @param colorName - The name of the color to update
         * @param value - The new color value
         */
        setColor(colorName: keyof ColorConfig, value: string) {
            this.saveConfig({
                ...this.theme,
                colors: {
                    ...this.theme.colors,
                    [colorName]: value,
                },
            });
        },

        /**
         * Get the complete theme configuration
         * @returns The current theme configuration
         */
        getConfig(): ThemeConfig {
            return this.theme;
        },

        /**
         * Update the entire theme configuration
         * @param config - The new theme configuration
         */
        setConfig(theme: ThemeConfig) {
            this.saveConfig(theme);
        },
    };
}

/**
 * Context for tracking winners that have been removed from consideration
 */
export const ThemeContext = createContext<ReturnType<typeof makeThemeFunctions>>(
    makeThemeFunctions(getSavedTheme()),
);
