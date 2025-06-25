import { defaultTheme } from '@/theme-manager/defaults';
import type { HeaderLevelConfig, SizeOption, ThemeConfig } from '@/theme-manager/types';

const THEME_STORAGE_KEY = 'nexus-markdown-theme';

export class ThemeManager {
    private themeConfig: ThemeConfig;

    constructor() {
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme) {
            const parsedTheme = JSON.parse(savedTheme);
            this.themeConfig = parsedTheme;
        } else {
            this.themeConfig = defaultTheme;
            this.saveConfig();
        }
    }

    saveConfig(): void {
        // localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(this.themeConfig));
    }

    resetConfig(): void {
        this.themeConfig = defaultTheme;
        this.saveConfig();
    }

    getHeaderLevel(level: '1' | '2'): HeaderLevelConfig {
        return this.themeConfig.header[`level${level}`];
    }

    getParagraphSize(): SizeOption {
        return this.themeConfig.paragraph.size;
    }

    getCaptionSize(): SizeOption {
        return this.themeConfig.caption.size;
    }
}

const themeManager = new ThemeManager();

export function getThemeManager(): ThemeManager {
    return themeManager;
}

export function useThemeManager(): ThemeManager {
    return getThemeManager();
}
