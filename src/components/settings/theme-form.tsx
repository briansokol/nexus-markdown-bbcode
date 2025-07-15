import { Header } from '@/components/markdown/header';
import * as styles from '@/components/settings/theme-form.styles';
import { fontFamilyList, sizeList } from '@/theme/options';
import { ThemeContext } from '@/theme/theme-context';
import type { ColorConfig, HeaderLevelConfig, SizeOption, fontFamily } from '@/theme/types';
import { type ReactElement, use, useCallback, useState } from 'react';

interface ThemeFormProps {
    closeHandler: () => void;
}

/**
 * Form component for editing theme configuration
 * Allows users to customize header styles, colors, and text sizes
 */
export function ThemeForm({ closeHandler }: ThemeFormProps) {
    const theme = use(ThemeContext);
    const [config, setConfig] = useState(() => theme.getConfig());

    /**
     * Handle changes to header level configuration
     * @param level - The header level being updated
     * @param field - The field being changed
     * @param value - The new value
     */
    const handleHeaderChange = useCallback(
        (level: '1' | '2', field: keyof HeaderLevelConfig, value: string | boolean): void => {
            setConfig((prev) => ({
                ...prev,
                header: {
                    ...prev.header,
                    [`level${level}`]: {
                        ...prev.header[`level${level}`],
                        [field]: value,
                    },
                },
            }));
        },
        [setConfig],
    );

    /**
     * Handle changes to color configuration
     * @param colorName - The color being updated
     * @param value - The new color value
     */
    const handleColorChange = useCallback(
        (colorName: keyof ColorConfig, value: string): void => {
            setConfig((prev) => ({
                ...prev,
                colors: {
                    ...prev.colors,
                    [colorName]: value,
                },
            }));
        },
        [setConfig],
    );

    /**
     * Handle changes to text size configuration
     * @param textType - The text type being updated (paragraph or caption)
     * @param size - The new size value
     */
    const handleTextSizeChange = useCallback(
        (textType: 'paragraph' | 'caption', size: SizeOption): void => {
            setConfig((prev) => ({
                ...prev,
                [textType]: {
                    ...prev[textType],
                    size,
                },
            }));
        },
        [setConfig],
    );

    /**
     * Save the current configuration to the theme manager
     */
    const handleSave = useCallback((): void => {
        theme.setConfig(config);
        closeHandler();
    }, [closeHandler, config, theme]);

    /**
     * Reset configuration to default values
     */
    const handleReset = useCallback((): void => {
        if (confirm('Are you sure you want to reset theme settings? This cannot be undone.')) {
            theme.resetConfigToDefaults();
            setConfig(theme.getConfig());
        }
    }, [theme]);

    /**
     * Render a header level configuration section
     * @param level - The header level to render
     * @param title - The display title for this section
     */
    const renderHeaderSection = useCallback(
        (level: '1' | '2', title: string): ReactElement => {
            const headerConfig = config.header[`level${level}`];

            return (
                <div css={styles.formSection}>
                    <h3>{title}</h3>

                    <div css={styles.formGroup}>
                        <label css={styles.formLabel}>Preview:</label>
                        <div>
                            <Header level={level} mode="html" tempTheme={config}>
                                Example Header
                            </Header>
                        </div>
                    </div>

                    <div css={styles.formGroup}>
                        <label css={styles.formLabel}>Size:</label>
                        <select
                            css={styles.formSelect}
                            value={headerConfig.size}
                            onChange={(e) => {
                                handleHeaderChange(level, 'size', e.target.value as SizeOption);
                            }}
                        >
                            {sizeList.map((size) => (
                                <option key={size.value} value={size.value}>
                                    {size.displayName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div css={styles.formGroup}>
                        <label css={styles.formLabel}>Font Family:</label>
                        <select
                            css={styles.formSelect}
                            value={headerConfig.fontFamily}
                            onChange={(e) => {
                                handleHeaderChange(
                                    level,
                                    'fontFamily',
                                    e.target.value as fontFamily,
                                );
                            }}
                        >
                            {fontFamilyList.map((font) => (
                                <option key={font.value} value={font.value}>
                                    {font.displayName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div css={styles.formGroup}>
                        <label css={styles.formLabel}>Color:</label>
                        <input
                            css={styles.colorInput}
                            type="color"
                            value={headerConfig.color}
                            onChange={(e) => {
                                handleHeaderChange(level, 'color', e.target.value);
                            }}
                        />
                        <input
                            css={styles.formInput}
                            type="text"
                            value={headerConfig.color}
                            onChange={(e) => {
                                handleHeaderChange(level, 'color', e.target.value);
                            }}
                            placeholder="#000000"
                        />
                    </div>

                    <div css={styles.formGroup}>
                        <label css={styles.formCheckbox}>
                            <input
                                type="checkbox"
                                checked={headerConfig.bold}
                                onChange={(e) => {
                                    handleHeaderChange(level, 'bold', e.target.checked);
                                }}
                            />
                            Bold
                        </label>
                    </div>

                    <div css={styles.formGroup}>
                        <label css={styles.formCheckbox}>
                            <input
                                type="checkbox"
                                checked={headerConfig.italic}
                                onChange={(e) => {
                                    handleHeaderChange(level, 'italic', e.target.checked);
                                }}
                            />
                            Italic
                        </label>
                    </div>

                    <div css={styles.formGroup}>
                        <label css={styles.formCheckbox}>
                            <input
                                type="checkbox"
                                checked={headerConfig.underline}
                                onChange={(e) => {
                                    handleHeaderChange(level, 'underline', e.target.checked);
                                }}
                            />
                            Underline
                        </label>
                    </div>

                    <div css={styles.formGroup}>
                        <label css={styles.formCheckbox}>
                            <input
                                type="checkbox"
                                checked={headerConfig.uppercase}
                                onChange={(e) => {
                                    handleHeaderChange(level, 'uppercase', e.target.checked);
                                }}
                            />
                            Uppercase
                        </label>
                    </div>
                </div>
            );
        },
        [config, handleHeaderChange],
    );

    return (
        <div css={styles.formContainer}>
            <h2>Theme Settings</h2>

            {/* Header Settings */}
            <div css={styles.formSection}>
                {renderHeaderSection('1', 'Header Level 1 (H1)')}
                {renderHeaderSection('2', 'Header Level 2 (H2)')}
            </div>

            {/* Text Size Settings */}
            <div css={styles.formSection}>
                <h3>Text Sizes</h3>

                <div css={styles.formGroup}>
                    <label css={styles.formLabel}>Paragraph Size:</label>
                    <select
                        css={styles.formSelect}
                        value={config.paragraph.size}
                        onChange={(e) => {
                            handleTextSizeChange('paragraph', e.target.value as SizeOption);
                        }}
                    >
                        {sizeList.map((size) => (
                            <option key={size.value} value={size.value}>
                                {size.displayName}
                            </option>
                        ))}
                    </select>
                </div>

                <div css={styles.formGroup}>
                    <label css={styles.formLabel}>Caption Size:</label>
                    <select
                        css={styles.formSelect}
                        value={config.caption.size}
                        onChange={(e) => {
                            handleTextSizeChange('caption', e.target.value as SizeOption);
                        }}
                    >
                        {sizeList.map((size) => (
                            <option key={size.value} value={size.value}>
                                {size.displayName}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Color Settings */}
            <div css={styles.formSection}>
                <h3>Colors</h3>
                {Object.entries(config.colors).map(([colorName, colorValue]) => (
                    <div key={colorName} css={styles.formGroup}>
                        <label css={styles.formLabel}>
                            {colorName.charAt(0).toUpperCase() + colorName.slice(1)}:
                        </label>
                        <input
                            css={styles.colorInput}
                            type="color"
                            value={colorValue}
                            onChange={(e) => {
                                handleColorChange(colorName as keyof ColorConfig, e.target.value);
                            }}
                        />
                        <input
                            css={styles.formInput}
                            type="text"
                            value={colorValue}
                            onChange={(e) => {
                                handleColorChange(colorName as keyof ColorConfig, e.target.value);
                            }}
                            placeholder="#000000"
                        />
                    </div>
                ))}
            </div>

            {/* Action Buttons */}
            <div css={styles.buttonGroup}>
                <button type="button" css={styles.primaryButton} onClick={handleSave}>
                    Save Settings
                </button>
                <button type="button" css={styles.secondaryButton} onClick={handleReset}>
                    Reset to Defaults
                </button>
            </div>
        </div>
    );
}
