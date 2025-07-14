import { ThemeForm } from '@/components/settings/theme-form';
import { fireEvent, render, screen } from '@/test/test-utils';
import { defaultTheme } from '@/theme-manager/defaults';
import { useThemeManager } from '@/theme-manager/theme-manager';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock the theme manager
vi.mock('@/theme-manager/theme-manager', () => ({
    useThemeManager: vi.fn(),
}));

// Mock the close handler
const mockCloseHandler = vi.fn();

// Mock window.confirm
const mockConfirm = vi.fn().mockReturnValue(true);
Object.defineProperty(window, 'confirm', {
    writable: true,
    value: mockConfirm,
});

describe('ThemeForm', () => {
    const mockThemeManager = {
        getConfig: vi.fn(),
        setConfig: vi.fn(),
        getHeaderLevel: vi.fn(),
        resetConfigToDefaults: vi.fn(),
    };

    beforeEach(() => {
        vi.clearAllMocks();
        mockThemeManager.getConfig.mockReturnValue(defaultTheme);
        mockThemeManager.getHeaderLevel.mockReturnValue(defaultTheme.header.level1);
        (useThemeManager as ReturnType<typeof vi.fn>).mockReturnValue(mockThemeManager);
    });

    it('renders the theme form with all sections', () => {
        render(<ThemeForm closeHandler={mockCloseHandler} />);

        expect(screen.getByText('Theme Settings')).toBeInTheDocument();
        expect(screen.getByText('Text Sizes')).toBeInTheDocument();
        expect(screen.getByText('Colors')).toBeInTheDocument();
        expect(screen.getByText('Save Settings')).toBeInTheDocument();
        expect(screen.getByText('Reset to Defaults')).toBeInTheDocument();
    });

    it('renders header level configurations', () => {
        render(<ThemeForm closeHandler={mockCloseHandler} />);

        expect(screen.getByText('Header Level 1 (H1)')).toBeInTheDocument();
        expect(screen.getByText('Header Level 2 (H2)')).toBeInTheDocument();

        // Check for header configuration options
        expect(screen.getAllByText('Size:')).toHaveLength(2); // 2 headers only
        expect(screen.getAllByText('Font Family:')).toHaveLength(2);
        expect(screen.getAllByText('Color:')).toHaveLength(2);
        expect(screen.getAllByText('Bold')).toHaveLength(2);
        expect(screen.getAllByText('Italic')).toHaveLength(2);
        expect(screen.getAllByText('Underline')).toHaveLength(2);
        expect(screen.getAllByText('Uppercase')).toHaveLength(2);
    });

    it('renders text size configurations', () => {
        render(<ThemeForm closeHandler={mockCloseHandler} />);

        expect(screen.getByText('Paragraph Size:')).toBeInTheDocument();
        expect(screen.getByText('Caption Size:')).toBeInTheDocument();
    });

    it('renders color configurations', () => {
        render(<ThemeForm closeHandler={mockCloseHandler} />);

        // Check that all color names from defaultTheme are rendered
        Object.keys(defaultTheme.colors).forEach((colorName) => {
            const capitalizedName = colorName.charAt(0).toUpperCase() + colorName.slice(1);
            expect(screen.getByText(`${capitalizedName}:`)).toBeInTheDocument();
        });
    });

    it('loads initial values from theme manager', () => {
        render(<ThemeForm closeHandler={mockCloseHandler} />);

        expect(mockThemeManager.getConfig).toHaveBeenCalledOnce();
    });

    it('saves configuration when save button is clicked', () => {
        render(<ThemeForm closeHandler={mockCloseHandler} />);

        const saveButton = screen.getByText('Save Settings');
        fireEvent.click(saveButton);

        expect(mockThemeManager.setConfig).toHaveBeenCalledOnce();
        expect(mockCloseHandler).toHaveBeenCalled();
    });

    it('resets configuration when reset button is clicked', () => {
        render(<ThemeForm closeHandler={mockCloseHandler} />);

        const resetButton = screen.getByText('Reset to Defaults');
        fireEvent.click(resetButton);

        expect(mockConfirm).toHaveBeenCalledOnce();
        expect(mockThemeManager.resetConfigToDefaults).toHaveBeenCalledOnce();
        expect(mockThemeManager.getConfig).toHaveBeenCalledTimes(2); // Initial load + after reset
    });

    it('updates header configuration when form inputs change', () => {
        render(<ThemeForm closeHandler={mockCloseHandler} />);

        // Find all select elements and use the first one (header level 1 size)
        const selects = screen.getAllByRole('combobox');
        const headerSizeSelect = selects[0]; // First select should be header level 1 size

        fireEvent.change(headerSizeSelect, { target: { value: '6' } });

        // The configuration should be updated locally (this would be tested by checking
        // if the save button would save the correct config)
        const saveButton = screen.getByText('Save Settings');
        fireEvent.click(saveButton);

        expect(mockThemeManager.setConfig).toHaveBeenCalledWith(
            expect.objectContaining({
                header: expect.objectContaining({
                    level1: expect.objectContaining({
                        size: '6',
                    }),
                }),
            }),
        );
    });

    it('updates color configuration when color inputs change', () => {
        render(<ThemeForm closeHandler={mockCloseHandler} />);

        // Find color inputs for red
        const colorInputs = screen.getAllByDisplayValue(defaultTheme.colors.red);
        const colorPicker = colorInputs.find(
            (input) => (input as HTMLInputElement).type === 'color',
        ) as HTMLInputElement;

        fireEvent.change(colorPicker, { target: { value: '#ff0000' } });

        const saveButton = screen.getByText('Save Settings');
        fireEvent.click(saveButton);

        expect(mockThemeManager.setConfig).toHaveBeenCalledWith(
            expect.objectContaining({
                colors: expect.objectContaining({
                    red: '#ff0000',
                }),
            }),
        );
    });
});
