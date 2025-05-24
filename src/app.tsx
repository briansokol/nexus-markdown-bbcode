import '@/app.css';
import { Bbcode } from '@/bbcode';
import { Markdown } from '@/markdown';
import { useRef, useState } from 'react';

export function App() {
    const [markdownInput, setMarkdownInput] = useState<string>('');
    const [showBBCode, setShowBBCode] = useState<boolean>(false);
    const [fileName, setFileName] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = () => {
        fileInputRef.current?.click();
    };

    const handleFileRead = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setFileName(file.name);
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result as string;
            setMarkdownInput(content);
        };
        reader.readAsText(file);
    };

    const handleDownload = () => {
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
        const validExtensions = ['.md', '.markdown', '.txt'];
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
    };

    return (
        <main className="app-container">
            <input
                type="file"
                accept=".md,.markdown,.txt"
                ref={fileInputRef}
                onChange={handleFileRead}
                className="hidden-file-input"
                aria-label="Select markdown file to load"
            />
            <div className="buttons-container">
                <button type="button" className="action-button" onClick={handleFileSelect}>
                    Load Markdown File
                </button>
                <input
                    type="text"
                    className="filename-input"
                    value={fileName}
                    onChange={(e) => {
                        setFileName(e.target.value);
                    }}
                    placeholder="Name your file"
                    aria-label="Uploaded file name"
                />
                <button type="button" className="action-button" onClick={handleDownload}>
                    Download Markdown
                </button>
                <button
                    type="button"
                    className="action-button"
                    onClick={() => {
                        setShowBBCode(!showBBCode);
                    }}
                >
                    {showBBCode ? 'Show HTML' : 'Show BBCode'}
                </button>
            </div>
            <div className="content-area">
                <div className="editor-container">
                    <textarea
                        className="markdown-input"
                        value={markdownInput}
                        onChange={(e) => {
                            setMarkdownInput(e.target.value);
                        }}
                        placeholder="Type markdown here..."
                    />
                </div>
                <div className="preview-container">
                    {showBBCode ? (
                        <Bbcode markdownInput={markdownInput} />
                    ) : (
                        <div className="html-preview">
                            <Markdown mode={'html'} markdownInput={markdownInput} />
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
