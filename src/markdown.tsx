/* eslint-disable @typescript-eslint/no-unused-vars */
import { Anchor } from '@/components/anchor';
import { Break } from '@/components/break';
import { Header } from '@/components/header';
import { Paragraph } from '@/components/paragraph';
import ReactMarkdown from 'react-markdown';

interface MarkdownProps {
    markdownInput: string;
    mode: 'html' | 'bbcode';
}

export function Markdown({ markdownInput, mode }: MarkdownProps) {
    return (
        <ReactMarkdown
            components={{
                h1({ node, ...props }) {
                    return <Header level="1" mode={mode} {...props} />;
                },
                h2({ node, ...props }) {
                    return <Header level="2" mode={mode} {...props} />;
                },
                h3({ node, ...props }) {
                    return <Header level="2" mode={mode} {...props} />;
                },
                h4({ node, ...props }) {
                    return <Header level="2" mode={mode} {...props} />;
                },
                h5({ node, ...props }) {
                    return <Header level="2" mode={mode} {...props} />;
                },
                h6({ node, ...props }) {
                    return <Header level="2" mode={mode} {...props} />;
                },
                p({ node, ...props }) {
                    return <Paragraph mode={mode} {...props} />;
                },
                a({ node, ...props }) {
                    return <Anchor mode={mode} {...props} />;
                },
                br({ node, ...props }) {
                    return <Break mode={mode} {...props} />;
                },
            }}
        >
            {markdownInput}
        </ReactMarkdown>
    );
}
