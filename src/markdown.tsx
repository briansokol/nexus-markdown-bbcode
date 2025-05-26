/* eslint-disable @typescript-eslint/no-unused-vars */
import { Align } from '@/components/align';
import { Anchor } from '@/components/anchor';
import { Break } from '@/components/break';
import { Color } from '@/components/color';
import { Emphasized } from '@/components/emphasized';
import { Header } from '@/components/header';
import { Image } from '@/components/image';
import { ListItem } from '@/components/list-item';
import { OrderedList } from '@/components/ordered-list';
import { Paragraph } from '@/components/paragraph';
import { Spoiler } from '@/components/spoiler';
import { Strikethrough } from '@/components/strikethrough';
import { Strong } from '@/components/strong';
import { Underline } from '@/components/underline';
import { UnorderedList } from '@/components/unordered-list';
import { YouTube, type YouTubeProps } from '@/components/youtube';
import { Colors, type CustomDirective } from '@/types/components';
import { useMemo } from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkDirective from 'remark-directive';
import remarkDirectiveRehype from 'remark-directive-rehype';
import remarkGfm from 'remark-gfm';
import { Line } from './components/line';

interface MarkdownProps {
    markdownInput: string;
    mode: 'html' | 'bbcode';
}

interface ExtendedComponents extends Components {
    red: Components['span'];
    green: Components['span'];
    blue: Components['span'];
    yellow: Components['span'];
    spoiler: Components['div'];
    right: Components['div'];
    youtube: CustomDirective<'div', YouTubeProps>;
}

export function Markdown({ markdownInput, mode }: MarkdownProps) {
    const components: ExtendedComponents = useMemo(
        () => ({
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
            hr({ node, ...props }) {
                return <Line mode={mode} {...props} />;
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
            red({ node, ...props }) {
                return <Color mode={mode} textColor={Colors.Red} {...props} />;
            },
            green({ node, ...props }) {
                return <Color mode={mode} textColor={Colors.Green} {...props} />;
            },
            blue({ node, ...props }) {
                return <Color mode={mode} textColor={Colors.Blue} {...props} />;
            },
            yellow({ node, ...props }) {
                return <Color mode={mode} textColor={Colors.Yellow} {...props} />;
            },
            spoiler({ node, ...props }) {
                return <Spoiler mode={mode} {...props} />;
            },
            right({ node, ...props }) {
                return <Align mode={mode} alignment="right" {...props} />;
            },
            center({ node, ...props }) {
                return <Align mode={mode} alignment="center" {...props} />;
            },
            youtube({ node, ...props }) {
                return <YouTube mode={mode} {...props} />;
            },
            small({ node, ...props }) {
                return <Paragraph size={2} mode={mode} {...props} />;
            },
        }),
        [mode],
    );

    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkDirective, remarkDirectiveRehype]}
            components={components}
        >
            {markdownInput}
        </ReactMarkdown>
    );
}
