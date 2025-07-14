import { defaultTheme } from '@/theme-manager/defaults';
import type {
    ColorConfig,
    HeaderLevelConfig,
    SizeOption,
    ThemeConfig,
} from '@/theme-manager/types';

const THEME_STORAGE_KEY = 'nexus-markdown-theme';

/**
 * Manages theme configuration for the Nexus Markdown to BBCode Editor.
 * Handles loading, saving, and updating theme settings in localStorage.
 */
export class ThemeManager {
    private themeConfig: ThemeConfig;

    /**
     * Creates a new ThemeManager instance.
     * Loads saved theme configuration from localStorage or uses default theme.
     */
    constructor(theme?: ThemeConfig) {
        if (theme) {
            this.themeConfig = theme;
        } else {
            const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
            if (savedTheme) {
                const parsedTheme = JSON.parse(savedTheme);
                this.themeConfig = parsedTheme;
            } else {
                this.themeConfig = defaultTheme;
                this.saveConfig();
            }
        }
    }

    /**
     * Saves the current theme configuration to localStorage.
     */
    saveConfig(): void {
        localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(this.themeConfig));
    }

    /**
     * Resets the theme configuration to default values and saves it.
     */
    resetConfigToDefaults(): void {
        this.themeConfig = defaultTheme;
        this.saveConfig();
    }

    /**
     * Gets the configuration for a specific header level.
     * @param level - The header level ('1' or '2')
     * @returns The header level configuration
     */
    getHeaderLevel(level: '1' | '2'): HeaderLevelConfig {
        return this.themeConfig.header[`level${level}`];
    }

    /**
     * Gets the current paragraph size configuration.
     * @returns The paragraph size option
     */
    getParagraphSize(): SizeOption {
        return this.themeConfig.paragraph.size;
    }

    /**
     * Gets the current caption size configuration.
     * @returns The caption size option
     */
    getCaptionSize(): SizeOption {
        return this.themeConfig.caption.size;
    }

    /**
     * Gets a color value by its name.
     * @param colorName - The name of the color to retrieve
     * @returns The color value as a string
     */
    getColor(colorName: keyof ColorConfig): string {
        return this.themeConfig.colors[colorName];
    }

    /**
     * Update a header level configuration
     * @param level - The header level to update
     * @param config - The new configuration for the header level
     */
    setHeaderLevel(level: '1' | '2', config: HeaderLevelConfig): void {
        this.themeConfig.header[`level${level}`] = config;
        this.saveConfig();
    }

    /**
     * Update paragraph size
     * @param size - The new paragraph size
     */
    setParagraphSize(size: SizeOption): void {
        this.themeConfig.paragraph.size = size;
        this.saveConfig();
    }

    /**
     * Update caption size
     * @param size - The new caption size
     */
    setCaptionSize(size: SizeOption): void {
        this.themeConfig.caption.size = size;
        this.saveConfig();
    }

    /**
     * Update a color value
     * @param colorName - The name of the color to update
     * @param value - The new color value
     */
    setColor(colorName: keyof ColorConfig, value: string): void {
        this.themeConfig.colors[colorName] = value;
        this.saveConfig();
    }

    /**
     * Get the complete theme configuration
     * @returns The current theme configuration
     */
    getConfig(): ThemeConfig {
        return this.themeConfig;
    }

    /**
     * Update the entire theme configuration
     * @param config - The new theme configuration
     */
    setConfig(config: ThemeConfig): void {
        this.themeConfig = config;
        this.saveConfig();
    }
}

const themeManagerSingleton = new ThemeManager();

/**
 * Gets the singleton instance of ThemeManager.
 * @returns The ThemeManager singleton instance
 */
export function getThemeManager(): ThemeManager {
    return themeManagerSingleton;
}

/**
 * React hook to get the ThemeManager instance.
 * Provides access to theme configuration and methods in React components.
 * @returns The ThemeManager singleton instance
 */
export function useThemeManager(theme?: ThemeConfig): ThemeManager {
    if (theme) {
        return new ThemeManager(theme);
    }
    return getThemeManager();
}
