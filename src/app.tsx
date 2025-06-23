import '@/app.css';
import { Bbcode } from '@/bbcode';
import { Tips } from '@/components/tips/tips';
import { Markdown } from '@/markdown';
import { useCallback, useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react';
import { FaDownload, FaUpload } from 'react-icons/fa6';
import { HiMiniCodeBracket } from 'react-icons/hi2';
import { MdOutlineTipsAndUpdates } from 'react-icons/md';
import { RiBracketsFill } from 'react-icons/ri';
import { ActionButton } from './components/ui/action-button';
/**
 * localStorage key for storing markdown content
 */
const MARKDOWN_STORAGE_KEY = 'nexus-markdown-content';

/**
 * localStorage key for storing file name
 */
const FILENAME_STORAGE_KEY = 'nexus-markdown-filename';

export function App() {
    const [markdownInput, setMarkdownInput] = useState<string>('');
    const [showBBCode, setShowBBCode] = useState<boolean>(false);
    const [fileName, setFileName] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const tipsDialogRef = useRef<HTMLDialogElement>(null);
    const [tipsShown, setTipsShown] = useState<boolean>(false);

    /**
     * Load markdown content from localStorage on component mount
     */
    useEffect(() => {
        try {
            const savedContent = localStorage.getItem(MARKDOWN_STORAGE_KEY);
            if (savedContent) {
                setMarkdownInput(savedContent);
            }

            const savedFileName = localStorage.getItem(FILENAME_STORAGE_KEY);
            if (savedFileName) {
                setFileName(savedFileName);
            }
        } catch (error) {
            console.warn('Failed to load content from localStorage:', error);
        }
    }, []);

    /**
     * Save markdown content to localStorage whenever it changes
     * @param content - The markdown content to save
     */
    const saveToLocalStorage = useCallback((content: string) => {
        try {
            localStorage.setItem(MARKDOWN_STORAGE_KEY, content);
        } catch (error) {
            console.warn('Failed to save markdown content to localStorage:', error);
        }
    }, []);

    /**
     * Save filename to localStorage
     * @param name - The filename to save
     */
    const saveFileNameToLocalStorage = useCallback((name: string) => {
        try {
            localStorage.setItem(FILENAME_STORAGE_KEY, name);
        } catch (error) {
            console.warn('Failed to save filename to localStorage:', error);
        }
    }, []);

    /**
     * Handler for file selection button click - triggers the hidden file input
     */
    const handleFileSelect = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    /**
     * Handler for file input change - reads the selected file and sets markdown content
     * @param event - File input change event
     */
    const handleFileRead = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (!file) return;

            setFileName(file.name);
            saveFileNameToLocalStorage(file.name);
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target?.result as string;
                setMarkdownInput(content);
                saveToLocalStorage(content);
            };
            reader.readAsText(file);
        },
        [saveToLocalStorage, saveFileNameToLocalStorage],
    );

    /**
     * Valid file extensions for markdown files
     */
    const validExtensions = useMemo(() => ['.md', '.markdown', '.txt'], []);

    /**
     * Handler for download button - creates and downloads markdown file
     */
    const handleDownload = useCallback(() => {
        if (!markdownInput.trim()) {
            alert('No content to download');
            return;
        }

        if (!fileName.trim()) {
            alert('Please enter a filename');
            return;
        }

        let downloadFileName = fileName.trim();

        // Check if filename ends with valid extensions, if not add .md
        const hasValidExtension = validExtensions.some((ext) =>
            downloadFileName.toLowerCase().endsWith(ext),
        );

        if (!hasValidExtension) {
            downloadFileName += '.md';
        }

        const blob = new Blob([markdownInput], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = downloadFileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, [markdownInput, fileName, validExtensions]);

    /**
     * Handler for filename input change
     */
    const handleFileNameChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const name = e.target.value;
            setFileName(name);
            saveFileNameToLocalStorage(name);
        },
        [saveFileNameToLocalStorage],
    );

    /**
     * Handler for markdown textarea change
     */
    const handleMarkdownChange = useCallback(
        (e: ChangeEvent<HTMLTextAreaElement>) => {
            const content = e.target.value;
            setMarkdownInput(content);
            saveToLocalStorage(content);
        },
        [saveToLocalStorage],
    );

    /**
     * Handler for toggle button - switches between HTML and BBCode view
     */
    const handleToggleView = useCallback(() => {
        setShowBBCode(!showBBCode);
    }, [showBBCode]);

    /**
     * Handler for file selection button click - triggers the hidden file input
     */
    const handleToggleTips = useCallback(() => {
        if (tipsShown) {
            tipsDialogRef.current?.close();
            setTipsShown(false);
            return;
        }
        tipsDialogRef.current?.showModal();
        setTipsShown(true);
    }, [tipsShown]);

    return (
        <main className="app-container">
            <dialog className="tips-dialog" ref={tipsDialogRef}>
                {tipsShown ? <Tips closeHandler={handleToggleTips} /> : null}
            </dialog>
            <input
                type="file"
                accept=".md,.markdown,.txt"
                ref={fileInputRef}
                onChange={handleFileRead}
                className="hidden-file-input"
                aria-label="Select markdown file to load"
            />
            <div className="buttons-container">
                <div className="left-buttons">
                    <ActionButton
                        label="Load Markdown File"
                        title="Load a markdown file from your computer"
                        Icon={FaUpload}
                        onClick={handleFileSelect}
                    />
                    <input
                        type="text"
                        className="filename-input"
                        value={fileName}
                        onChange={handleFileNameChange}
                        placeholder="Name your file"
                        aria-label="Uploaded file name"
                    />
                    <ActionButton
                        label="Download Markdown File"
                        title="Download the current markdown file"
                        Icon={FaDownload}
                        onClick={handleDownload}
                    />
                    <ActionButton
                        label={showBBCode ? 'Show HTML' : 'Show BBCode'}
                        title={
                            showBBCode ? 'Switch to rendered HTML view' : 'Switch to BBCode view'
                        }
                        Icon={showBBCode ? HiMiniCodeBracket : RiBracketsFill}
                        onClick={handleToggleView}
                    />
                </div>
                <ActionButton
                    label="Show Tips"
                    title="Show markdown formatting tips"
                    Icon={MdOutlineTipsAndUpdates}
                    onClick={handleToggleTips}
                />
            </div>
            <div className="content-area">
                <div className="editor-container">
                    <textarea
                        className="markdown-input"
                        value={markdownInput}
                        onChange={handleMarkdownChange}
                        placeholder="Type markdown here..."
                    />
                </div>
                <div className="preview-container">
                    {showBBCode ? (
                        <Bbcode markdownInput={markdownInput} />
                    ) : (
                        <div className="html-preview" data-testid="html-preview">
                            <Markdown mode={'html'} markdownInput={markdownInput} />
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
