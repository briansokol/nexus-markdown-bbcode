import { render, screen, waitFor } from '@/test/test-utils';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from '../app';

// Mock localStorage
const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
};

// Mock FileReader
const fileReaderMock = {
    readAsText: vi.fn(),
    result: '',
    onload: null as FileReader['onload'],
};

// Mock dialog methods which are not implemented in JSDOM
HTMLDialogElement.prototype.showModal = vi.fn();
HTMLDialogElement.prototype.close = vi.fn();

Object.defineProperty(global, 'localStorage', {
    value: localStorageMock,
});

Object.defineProperty(global, 'FileReader', {
    value: vi.fn(() => fileReaderMock),
});

describe('App', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorageMock.getItem.mockReturnValue(null);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    /**
     * Test that the App component renders all main elements
     */
    it('should render main interface elements', () => {
        render(<App />);

        // Check for editor and preview containers
        expect(document.querySelector('.editor-container')).toBeInTheDocument();
        expect(document.querySelector('.preview-container')).toBeInTheDocument();
        expect(screen.getByTestId('html-preview')).toBeInTheDocument();

        // Check for action buttons
        expect(screen.getByRole('button', { name: /^load markdown file/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /download markdown file/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /show tips/i })).toBeInTheDocument();

        // Check for textarea
        expect(screen.getByPlaceholderText('Type markdown here...')).toBeInTheDocument();
    });

    /**
     * Test that markdown input updates the textarea
     */
    it('should allow typing in the markdown textarea', async () => {
        const user = userEvent.setup();
        render(<App />);

        const textarea = screen.getByPlaceholderText('Type markdown here...');
        await user.type(textarea, '# Hello World');

        expect(textarea).toHaveValue('# Hello World');
    });

    /**
     * Test that the BBCode toggle button switches modes
     */
    it('should toggle between HTML and BBCode modes', async () => {
        const user = userEvent.setup();
        render(<App />);

        // HTML mode should show the HTML preview container
        expect(screen.getByTestId('html-preview')).toBeInTheDocument();

        // Find and click the toggle button (should have text "Show BBCode")
        const toggleButton = screen.getByRole('button', { name: /show bbcode/i });
        await user.click(toggleButton);

        // Should now show BBCode mode with a textarea
        expect(
            screen.getByPlaceholderText('Write some Markdown to see the BBCode...'),
        ).toBeInTheDocument();

        // Click again to toggle back (now labeled "Show HTML")
        const htmlToggleButton = screen.getByRole('button', { name: /show html/i });
        await user.click(htmlToggleButton);

        // Should be back to HTML preview
        expect(screen.getByTestId('html-preview')).toBeInTheDocument();
    });

    /**
     * Test that localStorage is used to persist markdown content
     */
    it('should save and load markdown content from localStorage', async () => {
        const user = userEvent.setup();

        // Mock localStorage to return saved content
        localStorageMock.getItem.mockImplementation((key) => {
            if (key === 'nexus-markdown-content') return '# Saved Content';
            if (key === 'nexus-markdown-filename') return 'test.md';
            return null;
        });

        render(<App />);

        // Should load content from localStorage
        const textarea = screen.getByPlaceholderText('Type markdown here...');
        await waitFor(() => {
            expect(textarea).toHaveValue('# Saved Content');
        });

        // Type new content
        await user.clear(textarea);
        await user.type(textarea, '# New Content');

        // Should save to localStorage
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
            'nexus-markdown-content',
            '# New Content',
        );
    });

    /**
     * Test that tips dialog can be opened and closed
     */
    it('should open and close tips dialog', async () => {
        const user = userEvent.setup();

        // Setup mocks for dialog methods
        const showModalMock = vi.fn();
        const closeMock = vi.fn();

        // Override prototype methods with fresh mocks for this test
        HTMLDialogElement.prototype.showModal = showModalMock;
        HTMLDialogElement.prototype.close = closeMock;

        render(<App />);

        // Get the tips button and click it
        const tipsButton = screen.getByRole('button', { name: /show tips/i });
        await user.click(tipsButton);

        // Check if showModal was called
        expect(showModalMock).toHaveBeenCalled();

        // For this test, we'll just verify the dialog methods were called properly
        // since JSDOM doesn't fully support dialog elements
    });

    /**
     * Test that file upload trigger works
     */
    it('should trigger file input when upload button is clicked', async () => {
        const user = userEvent.setup();
        render(<App />);

        // Mock the click method on the file input
        const fileInput = screen.getByLabelText('Select markdown file to load');
        const clickSpy = vi.spyOn(fileInput, 'click');

        // Find by icon and text content together to uniquely identify the button
        const uploadButtons = screen.getAllByRole('button');
        const uploadButton = uploadButtons.find((button) =>
            button.textContent?.includes('Load Markdown File'),
        );

        if (!uploadButton) {
            throw new Error('Upload button not found');
        }

        await user.click(uploadButton);

        expect(clickSpy).toHaveBeenCalled();
    });

    /**
     * Test that the component handles empty states gracefully
     */
    it('should handle empty markdown input gracefully', () => {
        render(<App />);

        const textarea = screen.getByPlaceholderText('Type markdown here...');
        expect(textarea).toHaveValue('');

        // Check that the preview container is present
        const previewContainer = screen.getByTestId('html-preview');
        expect(previewContainer).toBeInTheDocument();
    });

    /**
     * Test that markdown content renders in preview
     */
    it('should render markdown content in preview mode', async () => {
        const user = userEvent.setup();
        render(<App />);

        const textarea = screen.getByPlaceholderText('Type markdown here...');
        await user.type(textarea, '# Hello World\\n\\nThis is **bold** text.');

        // Check that the markdown is rendered (H1 should be present)
        await waitFor(() => {
            expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Hello World');
        });
    });

    /**
     * Test that BBCode is generated correctly
     */
    it('should generate BBCode when in BBCode mode', async () => {
        const user = userEvent.setup();
        render(<App />);

        const textarea = screen.getByPlaceholderText('Type markdown here...');
        await user.type(textarea, '**bold text**');

        // Switch to BBCode mode
        const toggleButton = screen.getByRole('button', { name: /show bbcode/i });
        await user.click(toggleButton);

        // Should show BBCode in a textarea (the BBCode view uses a textarea)
        await waitFor(() => {
            const bbcodeElement = screen.getByPlaceholderText(
                'Write some Markdown to see the BBCode...',
            );
            expect(bbcodeElement).toBeInTheDocument();
            expect(bbcodeElement).toHaveTextContent('[size=3][b]bold text[/b][/size]');
        });
    });

    /**
     * Test localStorage error handling
     */
    it('should handle localStorage errors gracefully', () => {
        // Mock localStorage to throw errors
        localStorageMock.getItem.mockImplementation(() => {
            throw new Error('localStorage error');
        });
        localStorageMock.setItem.mockImplementation(() => {
            throw new Error('localStorage error');
        });

        // eslint-disable-next-line @typescript-eslint/no-empty-function
        const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

        render(<App />);

        // Should handle getItem error
        expect(consoleSpy).toHaveBeenCalledWith(
            'Failed to load content from localStorage:',
            expect.any(Error),
        );

        consoleSpy.mockRestore();
    });

    /**
     * Test filename input change
     */
    it('should update filename when input changes', async () => {
        const user = userEvent.setup();
        render(<App />);

        const filenameInput = screen.getByPlaceholderText('Name your file');
        await user.type(filenameInput, 'test-file.md');

        expect(filenameInput).toHaveValue('test-file.md');
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
            'nexus-markdown-filename',
            'test-file.md',
        );
    });

    /**
     * Test file upload functionality - testing the FileReader setup
     */
    it('should set up FileReader correctly for file upload', () => {
        // This test verifies that the component attempts to use FileReader
        // when a file is selected, without actually testing the file upload
        // due to JSDOM limitations with FileReader

        render(<App />);
        const fileInput = screen.getByLabelText('Select markdown file to load');

        // Verify the file input exists and has correct attributes
        expect(fileInput).toHaveAttribute('type', 'file');
        expect(fileInput).toHaveAttribute('accept', '.md,.markdown,.txt');

        // This tests that the component is properly set up for file handling
        // The actual FileReader functionality is tested through integration tests
    });

    /**
     * Test file upload with no file selected
     */
    it('should handle file upload with no file selected', async () => {
        const user = userEvent.setup();
        render(<App />);

        const fileInput = screen.getByLabelText('Select markdown file to load');

        // Simulate change event with no files
        await user.upload(fileInput, []);

        // Should not throw any errors and not call any localStorage methods for file operations
        // (the localStorage calls for typing would still happen, but not for file operations)
    });

    /**
     * Test validExtensions memoization
     */
    it('should have valid file extensions defined', () => {
        render(<App />);

        // Test that the component has valid extensions for validation
        // This tests the validExtensions useMemo functionality indirectly
        const fileInput = screen.getByLabelText('Select markdown file to load');
        expect(fileInput).toHaveAttribute('accept', '.md,.markdown,.txt');
    });

    /**
     * Test download functionality with no content
     */
    it('should show alert when trying to download with no content', async () => {
        const user = userEvent.setup();

        // Mock alert
        global.alert = vi.fn();

        render(<App />);

        // Set filename but no content
        const filenameInput = screen.getByPlaceholderText('Name your file');
        await user.type(filenameInput, 'test-file');

        // Click download button
        const downloadButton = screen.getByRole('button', { name: /download markdown file/i });
        await user.click(downloadButton);

        expect(global.alert).toHaveBeenCalledWith('No content to download');
    });

    /**
     * Test download functionality with no filename
     */
    it('should show alert when trying to download with no filename', async () => {
        const user = userEvent.setup();

        // Mock alert
        global.alert = vi.fn();

        render(<App />);

        // Add content but no filename
        const textarea = screen.getByPlaceholderText('Type markdown here...');
        await user.type(textarea, '# Test Content');

        // Click download button
        const downloadButton = screen.getByRole('button', { name: /download markdown file/i });
        await user.click(downloadButton);

        expect(global.alert).toHaveBeenCalledWith('Please enter a filename');
    });

    /**
     * Test tips dialog closing
     */
    it('should close tips dialog when already open', async () => {
        const user = userEvent.setup();

        const showModalMock = vi.fn();
        const closeMock = vi.fn();

        HTMLDialogElement.prototype.showModal = showModalMock;
        HTMLDialogElement.prototype.close = closeMock;

        render(<App />);

        const tipsButton = screen.getByRole('button', { name: /show tips/i });

        // Open tips dialog first
        await user.click(tipsButton);
        expect(showModalMock).toHaveBeenCalled();

        // Click again to close
        await user.click(tipsButton);
        expect(closeMock).toHaveBeenCalled();
    });

    /**
     * Test localStorage saving error handling
     */
    it('should handle localStorage saving errors gracefully', async () => {
        const user = userEvent.setup();

        // Mock localStorage setItem to throw error
        localStorageMock.setItem.mockImplementation(() => {
            throw new Error('localStorage save error');
        });

        // eslint-disable-next-line @typescript-eslint/no-empty-function
        const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

        render(<App />);

        const textarea = screen.getByPlaceholderText('Type markdown here...');
        await user.type(textarea, 'test content');

        // Should handle the error gracefully
        expect(consoleSpy).toHaveBeenCalledWith(
            'Failed to save markdown content to localStorage:',
            expect.any(Error),
        );

        consoleSpy.mockRestore();
    });

    /**
     * Test filename localStorage saving error handling
     */
    it('should handle filename localStorage saving errors gracefully', async () => {
        const user = userEvent.setup();

        // Mock localStorage setItem to throw error only for filename
        localStorageMock.setItem.mockImplementation((key) => {
            if (key === 'nexus-markdown-filename') {
                throw new Error('localStorage filename save error');
            }
        });

        // eslint-disable-next-line @typescript-eslint/no-empty-function
        const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

        render(<App />);

        const filenameInput = screen.getByPlaceholderText('Name your file');
        await user.type(filenameInput, 'test.md');

        // Should handle the error gracefully
        expect(consoleSpy).toHaveBeenCalledWith(
            'Failed to save filename to localStorage:',
            expect.any(Error),
        );

        consoleSpy.mockRestore();
    });
});
