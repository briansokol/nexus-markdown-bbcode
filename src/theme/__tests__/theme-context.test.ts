import { defaultTheme } from '@/theme/defaults';
import { getSavedTheme, makeThemeFunctions } from '@/theme/theme-context';
import type { HeaderLevelConfig, ThemeConfig } from '@/theme/types';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock localStorage
const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
});

describe('getSavedTheme', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should return default theme when localStorage is empty', () => {
        localStorageMock.getItem.mockReturnValue(null);

        const result = getSavedTheme();

        expect(result).toEqual(defaultTheme);
        expect(localStorageMock.getItem).toHaveBeenCalledWith('nexus-markdown-theme');
    });

    it('should return parsed theme from localStorage when available', () => {
        const mockTheme: ThemeConfig = {
            ...defaultTheme,
            paragraph: { size: '4' },
        };
        localStorageMock.getItem.mockReturnValue(JSON.stringify(mockTheme));

        const result = getSavedTheme();

        expect(result).toEqual(mockTheme);
        expect(localStorageMock.getItem).toHaveBeenCalledWith('nexus-markdown-theme');
    });
});

describe('makeThemeFunctions', () => {
    let setThemeMock: ReturnType<typeof vi.fn>;
    let themeFunctions: ReturnType<typeof makeThemeFunctions>;
    const mockTheme: ThemeConfig = { ...defaultTheme };

    beforeEach(() => {
        vi.clearAllMocks();
        setThemeMock = vi.fn();
        themeFunctions = makeThemeFunctions(mockTheme, setThemeMock);
    });

    describe('theme property', () => {
        it('should return the current theme', () => {
            expect(themeFunctions.theme).toEqual(mockTheme);
        });
    });

    describe('loadConfig', () => {
        it('should load theme from localStorage and call setTheme', () => {
            const savedTheme: ThemeConfig = {
                ...defaultTheme,
                paragraph: { size: '5' },
            };
            localStorageMock.getItem.mockReturnValue(JSON.stringify(savedTheme));

            themeFunctions.loadConfig();

            expect(localStorageMock.getItem).toHaveBeenCalledWith('nexus-markdown-theme');
            expect(setThemeMock).toHaveBeenCalledWith(savedTheme);
        });

        it('should reset to defaults when no saved theme exists', () => {
            localStorageMock.getItem.mockReturnValue(null);
            const resetSpy = vi.spyOn(themeFunctions, 'resetConfigToDefaults');

            themeFunctions.loadConfig();

            expect(resetSpy).toHaveBeenCalled();
        });

        it('should handle case when setTheme is not provided', () => {
            const functionsWithoutSetTheme = makeThemeFunctions(mockTheme);
            localStorageMock.getItem.mockReturnValue(JSON.stringify(mockTheme));

            expect(() => {
                functionsWithoutSetTheme.loadConfig();
            }).not.toThrow();
        });
    });

    describe('saveConfig', () => {
        it('should save theme to localStorage and call setTheme', () => {
            const newTheme: ThemeConfig = {
                ...mockTheme,
                paragraph: { size: '6' },
            };

            themeFunctions.saveConfig(newTheme);

            expect(localStorageMock.setItem).toHaveBeenCalledWith(
                'nexus-markdown-theme',
                JSON.stringify(newTheme),
            );
            expect(setThemeMock).toHaveBeenCalledWith(newTheme);
        });

        it('should handle case when setTheme is not provided', () => {
            const functionsWithoutSetTheme = makeThemeFunctions(mockTheme);
            const newTheme = { ...mockTheme };

            expect(() => {
                functionsWithoutSetTheme.saveConfig(newTheme);
            }).not.toThrow();
            expect(localStorageMock.setItem).toHaveBeenCalled();
        });
    });

    describe('resetConfigToDefaults', () => {
        it('should save default theme', () => {
            const saveConfigSpy = vi.spyOn(themeFunctions, 'saveConfig');

            themeFunctions.resetConfigToDefaults();

            expect(saveConfigSpy).toHaveBeenCalledWith(defaultTheme);
        });
    });

    describe('getHeaderLevel', () => {
        it('should return header level config from current theme', () => {
            const result = themeFunctions.getHeaderLevel('1');

            expect(result).toEqual(mockTheme.header.level1);
        });

        it('should return header level config from temp theme when provided', () => {
            const tempTheme: ThemeConfig = {
                ...mockTheme,
                header: {
                    ...mockTheme.header,
                    level1: { ...mockTheme.header.level1, size: '6' },
                },
            };

            const result = themeFunctions.getHeaderLevel('1', tempTheme);

            expect(result).toEqual(tempTheme.header.level1);
        });

        it('should work with level 2', () => {
            const result = themeFunctions.getHeaderLevel('2');

            expect(result).toEqual(mockTheme.header.level2);
        });
    });

    describe('getParagraphSize', () => {
        it('should return paragraph size from current theme', () => {
            const result = themeFunctions.getParagraphSize();

            expect(result).toBe(mockTheme.paragraph.size);
        });

        it('should return paragraph size from temp theme when provided', () => {
            const tempTheme: ThemeConfig = {
                ...mockTheme,
                paragraph: { size: '6' },
            };

            const result = themeFunctions.getParagraphSize(tempTheme);

            expect(result).toBe('6');
        });
    });

    describe('getCaptionSize', () => {
        it('should return caption size from current theme', () => {
            const result = themeFunctions.getCaptionSize();

            expect(result).toBe(mockTheme.caption.size);
        });

        it('should return caption size from temp theme when provided', () => {
            const tempTheme: ThemeConfig = {
                ...mockTheme,
                caption: { size: '5' },
            };

            const result = themeFunctions.getCaptionSize(tempTheme);

            expect(result).toBe('5');
        });
    });

    describe('getColor', () => {
        it('should return color value by name', () => {
            const result = themeFunctions.getColor('red');

            expect(result).toBe(mockTheme.colors.red);
        });

        it('should work with different color names', () => {
            expect(themeFunctions.getColor('blue')).toBe(mockTheme.colors.blue);
            expect(themeFunctions.getColor('green')).toBe(mockTheme.colors.green);
        });
    });

    describe('setHeaderLevel', () => {
        it('should update header level 1 config', () => {
            const newConfig: HeaderLevelConfig = {
                ...mockTheme.header.level1,
                size: '6',
                bold: false,
            };
            const saveConfigSpy = vi.spyOn(themeFunctions, 'saveConfig');

            themeFunctions.setHeaderLevel('1', newConfig);

            expect(saveConfigSpy).toHaveBeenCalledWith({
                ...mockTheme,
                header: {
                    ...mockTheme.header,
                    level1: newConfig,
                },
            });
        });

        it('should update header level 2 config', () => {
            const newConfig: HeaderLevelConfig = {
                ...mockTheme.header.level2,
                size: '1',
                italic: false,
            };
            const saveConfigSpy = vi.spyOn(themeFunctions, 'saveConfig');

            themeFunctions.setHeaderLevel('2', newConfig);

            expect(saveConfigSpy).toHaveBeenCalledWith({
                ...mockTheme,
                header: {
                    ...mockTheme.header,
                    level2: newConfig,
                },
            });
        });
    });

    describe('setParagraphSize', () => {
        it('should update paragraph size', () => {
            const saveConfigSpy = vi.spyOn(themeFunctions, 'saveConfig');

            themeFunctions.setParagraphSize('5');

            expect(saveConfigSpy).toHaveBeenCalledWith({
                ...mockTheme,
                paragraph: {
                    ...mockTheme.paragraph,
                    size: '5',
                },
            });
        });
    });

    describe('setCaptionSize', () => {
        it('should update caption size', () => {
            const saveConfigSpy = vi.spyOn(themeFunctions, 'saveConfig');

            themeFunctions.setCaptionSize('4');

            expect(saveConfigSpy).toHaveBeenCalledWith({
                ...mockTheme,
                caption: {
                    ...mockTheme.caption,
                    size: '4',
                },
            });
        });
    });

    describe('setColor', () => {
        it('should update color value', () => {
            const saveConfigSpy = vi.spyOn(themeFunctions, 'saveConfig');

            themeFunctions.setColor('red', '#ff0000');

            expect(saveConfigSpy).toHaveBeenCalledWith({
                ...mockTheme,
                colors: {
                    ...mockTheme.colors,
                    red: '#ff0000',
                },
            });
        });

        it('should work with different colors', () => {
            const saveConfigSpy = vi.spyOn(themeFunctions, 'saveConfig');

            themeFunctions.setColor('blue', '#0000ff');

            expect(saveConfigSpy).toHaveBeenCalledWith({
                ...mockTheme,
                colors: {
                    ...mockTheme.colors,
                    blue: '#0000ff',
                },
            });
        });
    });

    describe('getConfig', () => {
        it('should return the current theme configuration', () => {
            const result = themeFunctions.getConfig();

            expect(result).toEqual(mockTheme);
        });
    });

    describe('setConfig', () => {
        it('should update the entire theme configuration', () => {
            const newTheme: ThemeConfig = {
                ...mockTheme,
                paragraph: { size: '6' },
                caption: { size: '1' },
            };
            const saveConfigSpy = vi.spyOn(themeFunctions, 'saveConfig');

            themeFunctions.setConfig(newTheme);

            expect(saveConfigSpy).toHaveBeenCalledWith(newTheme);
        });
    });
});
