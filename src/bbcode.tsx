import { Markdown } from '@/markdown';
import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';

interface BbcodeProps {
    markdownInput: string;
}

const div = document.createElement('div');
const root = createRoot(div);

export function Bbcode({ markdownInput }: BbcodeProps) {
    const [bbcode, setBbcode] = useState<string>('');

    useEffect(() => {
        queueMicrotask(() => {
            // eslint-disable-next-line react-dom/no-flush-sync
            flushSync(() => {
                root.render(<Markdown mode={'bbcode'} markdownInput={markdownInput} />);
            });

            setBbcode(div.innerHTML);
        });
    }, [markdownInput]);

    return (
        <textarea
            className="markdown-input"
            value={bbcode}
            readOnly
            placeholder="Write some Markdown to see the BBCode..."
        />
    );
}
