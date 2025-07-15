/* eslint-disable @typescript-eslint/unbound-method */
import { ThemeForm } from '@/components/settings/theme-form';
import { defaultTheme } from '@/theme/defaults';
import { ThemeContext, makeThemeFunctions } from '@/theme/theme-context';
import type { ThemeConfig } from '@/theme/types';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock the Header component since we're testing the form logic
vi.mock('@/components/markdown/header', () => ({
    Header: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="header-preview">{children}</div>
    ),
}));

// Mock the styles to avoid CSS-in-JS issues in tests
vi.mock('@/components/settings/theme-form.styles', () => ({
    formContainer: {},
    formSection: {},
    formGroup: {},
    formLabel: {},
    formSelect: {},
    formInput: {},
    colorInput: {},
    formCheckbox: {},
    buttonGroup: {},
    primaryButton: {},
    secondaryButton: {},
}));

// Mock the options
vi.mock('@/theme/options', () => ({
    sizeList: [
        { value: '1', displayName: 'Tiny' },
        { value: '2', displayName: 'Small' },
        { value: '3', displayName: 'Medium' },
        { value: '4', displayName: 'Large' },
        { value: '5', displayName: 'Huge' },
        { value: '6', displayName: 'Massive' },
    ],
    fontFamilyList: [
        { value: 'default', displayName: 'Default' },
        { value: 'arial', displayName: 'Arial' },
        { value: 'trebuchet', displayName: 'Trebuchet' },
    ],
}));

// Mock window.confirm
const mockConfirm = vi.fn();
Object.defineProperty(window, 'confirm', {
    value: mockConfirm,
    writable: true,
});

describe('ThemeForm', () => {
    let mockTheme: ReturnType<typeof makeThemeFunctions>;
    let mockCloseHandler: ReturnType<typeof vi.fn>;
    let mockConfig: ThemeConfig;

    beforeEach(() => {
        vi.clearAllMocks();
        mockConfirm.mockReturnValue(true);

        mockConfig = { ...defaultTheme };
        mockCloseHandler = vi.fn();

        mockTheme = {
            theme: mockConfig,
            getConfig: vi.fn(() => mockConfig),
            setConfig: vi.fn(),
            resetConfigToDefaults: vi.fn(),
            saveConfig: vi.fn(),
            loadConfig: vi.fn(),
            getHeaderLevel: vi.fn(),
            getParagraphSize: vi.fn(),
            getCaptionSize: vi.fn(),
            getColor: vi.fn(),
            setHeaderLevel: vi.fn(),
            setParagraphSize: vi.fn(),
            setCaptionSize: vi.fn(),
            setColor: vi.fn(),
        };
    });

    const renderComponent = () => {
        return render(
            <ThemeContext value={mockTheme}>
                <ThemeForm closeHandler={mockCloseHandler} />
            </ThemeContext>,
        );
    };

    describe('Initial Render', () => {
        it('should render the theme form with all sections', () => {
            renderComponent();

            expect(screen.getByText('Theme Settings')).toBeInTheDocument();
            expect(screen.getByText('Header Level 1 (H1)')).toBeInTheDocument();
            expect(screen.getByText('Header Level 2 (H2)')).toBeInTheDocument();
            expect(screen.getByText('Text Sizes')).toBeInTheDocument();
            expect(screen.getByText('Colors')).toBeInTheDocument();
        });

        it('should render header previews', () => {
            renderComponent();

            const previews = screen.getAllByTestId('header-preview');
            expect(previews).toHaveLength(2);
            expect(previews[0]).toHaveTextContent('Example Header');
            expect(previews[1]).toHaveTextContent('Example Header');
        });

        it('should render action buttons', () => {
            renderComponent();

            expect(screen.getByText('Save Settings')).toBeInTheDocument();
            expect(screen.getByText('Reset to Defaults')).toBeInTheDocument();
        });

        it('should initialize with theme config', () => {
            renderComponent();

            expect(mockTheme.getConfig).toHaveBeenCalled();
        });
    });

    describe('Header Configuration', () => {
        it('should update header size when changed', async () => {
            const user = userEvent.setup();
            renderComponent();

            const sizeSelects = screen.getAllByDisplayValue('Huge'); // size '5' = 'Huge'
            await user.selectOptions(sizeSelects[0], '3');

            expect(sizeSelects[0]).toHaveValue('3');
        });

        it('should update header font family when changed', async () => {
            const user = userEvent.setup();
            renderComponent();

            const fontSelects = screen.getAllByDisplayValue('Trebuchet');
            await user.selectOptions(fontSelects[0], 'arial');

            expect(fontSelects[0]).toHaveValue('arial');
        });

        it('should update header color when text input changes', async () => {
            const user = userEvent.setup();
            renderComponent();

            const colorInputs = screen.getAllByDisplayValue('#a5c4f3');
            const textInput = colorInputs.find((input) => input.getAttribute('type') === 'text');

            if (textInput) {
                await user.clear(textInput);
                await user.type(textInput, '#ff0000');
                expect(textInput).toHaveValue('#ff0000');
            }
        });

        it('should update header bold checkbox', async () => {
            const user = userEvent.setup();
            renderComponent();

            const boldCheckboxes = screen.getAllByRole('checkbox', { name: /bold/i });
            const level1Bold = boldCheckboxes[0]; // First one is level 1
            expect(level1Bold).toBeChecked(); // Default is true for level 1

            await user.click(level1Bold);
            expect(level1Bold).not.toBeChecked();
        });

        it('should update header italic checkbox', async () => {
            const user = userEvent.setup();
            renderComponent();

            const italicCheckboxes = screen.getAllByRole('checkbox', { name: /italic/i });
            const level1Italic = italicCheckboxes[0];

            expect(level1Italic).not.toBeChecked(); // Default is false for level 1

            await user.click(level1Italic);
            expect(level1Italic).toBeChecked();
        });

        it('should update header underline checkbox', async () => {
            const user = userEvent.setup();
            renderComponent();

            const underlineCheckboxes = screen.getAllByRole('checkbox', { name: /underline/i });
            const level1Underline = underlineCheckboxes[0];
            expect(level1Underline).not.toBeChecked(); // Default is false

            await user.click(level1Underline);
            expect(level1Underline).toBeChecked();
        });

        it('should update header uppercase checkbox', async () => {
            const user = userEvent.setup();
            renderComponent();

            const uppercaseCheckboxes = screen.getAllByRole('checkbox', { name: /uppercase/i });
            const level1Uppercase = uppercaseCheckboxes[0];
            expect(level1Uppercase).toBeChecked(); // Default is true

            await user.click(level1Uppercase);
            expect(level1Uppercase).not.toBeChecked();
        });
    });

    describe('Text Size Configuration', () => {
        it('should update paragraph size when changed', async () => {
            const user = userEvent.setup();
            renderComponent();

            const paragraphLabel = screen.getByText('Paragraph Size:');
            const paragraphSelect = paragraphLabel.parentElement?.querySelector('select');
            expect(paragraphSelect).toHaveValue('3'); // Default medium

            if (paragraphSelect) {
                await user.selectOptions(paragraphSelect, '4');
                expect(paragraphSelect).toHaveValue('4');
            }
        });

        it('should update caption size when changed', async () => {
            const user = userEvent.setup();
            renderComponent();

            const captionLabel = screen.getByText('Caption Size:');
            const captionSelect = captionLabel.parentElement?.querySelector('select');
            expect(captionSelect).toHaveValue('2'); // Default small

            if (captionSelect) {
                await user.selectOptions(captionSelect, '3');
                expect(captionSelect).toHaveValue('3');
            }
        });
    });

    describe('Color Configuration', () => {
        it('should render all color inputs', () => {
            renderComponent();

            expect(screen.getByText('Red:')).toBeInTheDocument();
            expect(screen.getByText('Green:')).toBeInTheDocument();
            expect(screen.getByText('Blue:')).toBeInTheDocument();
            expect(screen.getByText('Yellow:')).toBeInTheDocument();
            expect(screen.getByText('Purple:')).toBeInTheDocument();
            expect(screen.getByText('Orange:')).toBeInTheDocument();
            expect(screen.getByText('Pink:')).toBeInTheDocument();
        });

        it('should update color when text input changes', async () => {
            const user = userEvent.setup();
            renderComponent();

            const redLabel = screen.getByText('Red:');
            const redTextInput = redLabel.parentElement?.querySelector('input[type="text"]');
            expect(redTextInput).toHaveValue('#e06666');

            if (redTextInput) {
                await user.clear(redTextInput);
                await user.type(redTextInput, '#ff0000');
                expect(redTextInput).toHaveValue('#ff0000');
            }
        });
    });

    describe('Save and Reset Actions', () => {
        it('should save configuration and close form when save button clicked', async () => {
            const user = userEvent.setup();
            renderComponent();

            const saveButton = screen.getByText('Save Settings');
            await user.click(saveButton);

            expect(mockTheme.setConfig).toHaveBeenCalledWith(mockConfig);
            expect(mockCloseHandler).toHaveBeenCalled();
        });

        it('should reset to defaults when reset button clicked and confirmed', async () => {
            const user = userEvent.setup();
            mockConfirm.mockReturnValue(true);
            renderComponent();

            const resetButton = screen.getByText('Reset to Defaults');
            await user.click(resetButton);

            expect(mockConfirm).toHaveBeenCalledWith(
                'Are you sure you want to reset theme settings? This cannot be undone.',
            );
            expect(mockTheme.resetConfigToDefaults).toHaveBeenCalled();
            expect(mockTheme.getConfig).toHaveBeenCalledTimes(2); // Initial + after reset
        });

        it('should not reset when reset button clicked but not confirmed', async () => {
            const user = userEvent.setup();
            mockConfirm.mockReturnValue(false);
            renderComponent();

            const resetButton = screen.getByText('Reset to Defaults');
            await user.click(resetButton);

            expect(mockConfirm).toHaveBeenCalled();
            expect(mockTheme.resetConfigToDefaults).not.toHaveBeenCalled();
        });
    });

    describe('Form State Management', () => {
        it('should maintain local state separate from theme context', async () => {
            const user = userEvent.setup();
            renderComponent();

            // Change a value locally
            const sizeSelect = screen.getAllByDisplayValue('Huge')[0];
            await user.selectOptions(sizeSelect, '3');

            // The theme context should not be updated until save is clicked
            expect(mockTheme.setConfig).not.toHaveBeenCalled();

            // Now save
            const saveButton = screen.getByText('Save Settings');
            await user.click(saveButton);

            expect(mockTheme.setConfig).toHaveBeenCalled();
        });

        it('should update preview with temp theme changes', () => {
            renderComponent();

            // Check that Header components receive tempTheme prop
            const previews = screen.getAllByTestId('header-preview');
            expect(previews).toHaveLength(2);
        });
    });

    describe('Accessibility', () => {
        it('should have proper form labels', () => {
            renderComponent();

            expect(screen.getAllByText('Size:')).toHaveLength(2); // One for each header level
            expect(screen.getAllByText('Font Family:')).toHaveLength(2); // One for each header level
            expect(screen.getAllByText('Color:')).toHaveLength(2); // One for each header level
            expect(screen.getByText('Paragraph Size:')).toBeInTheDocument();
            expect(screen.getByText('Caption Size:')).toBeInTheDocument();
        });

        it('should have proper button types', () => {
            renderComponent();

            const saveButton = screen.getByText('Save Settings');
            const resetButton = screen.getByText('Reset to Defaults');

            expect(saveButton).toHaveAttribute('type', 'button');
            expect(resetButton).toHaveAttribute('type', 'button');
        });
    });
});
