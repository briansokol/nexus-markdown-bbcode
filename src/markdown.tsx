/* eslint-disable @typescript-eslint/no-unused-vars */
import { Anchor } from '@/components/anchor';
import { Break } from '@/components/break';
import { Emphasized } from '@/components/emphasized';
import { Header } from '@/components/header';
import { Image } from '@/components/image';
import { ListItem } from '@/components/list-item';
import { OrderedList } from '@/components/ordered-list';
import { Paragraph } from '@/components/paragraph';
import { Strikethrough } from '@/components/strikethrough';
import { Strong } from '@/components/strong';
import { Underline } from '@/components/underline';
import { UnorderedList } from '@/components/unordered-list';
import ReactMarkdown from 'react-markdown';
import remarkDirective from 'remark-directive';
import remarkDirectiveRehype from 'remark-directive-rehype';
import remarkGfm from 'remark-gfm';

interface MarkdownProps {
    markdownInput: string;
    mode: 'html' | 'bbcode';
}

export function Markdown({ markdownInput, mode }: MarkdownProps) {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkDirective, remarkDirectiveRehype]}
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
                ul({ node, ...props }) {
                    return <UnorderedList mode={mode} {...props} />;
                },
                ol({ node, ...props }) {
                    return <OrderedList mode={mode} {...props} />;
                },
                li({ node, ...props }) {
                    return <ListItem mode={mode} {...props} />;
                },
                strong({ node, ...props }) {
                    return <Strong mode={mode} {...props} />;
                },
                em({ node, ...props }) {
                    return <Emphasized mode={mode} {...props} />;
                },
                del({ node, ...props }) {
                    return <Strikethrough mode={mode} {...props} />;
                },
                ins({ node, ...props }) {
                    return <Underline mode={mode} {...props} />;
                },
                img({ node, ...props }) {
                    return <Image mode={mode} {...props} />;
                },
            }}
        >
            {markdownInput}
        </ReactMarkdown>
    );
}
