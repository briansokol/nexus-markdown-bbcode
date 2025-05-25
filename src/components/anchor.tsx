import '@/components/anchor.css';
import type { BBCodeComponentProps } from '@/types/components';
import { useCleanChildren } from '@/utils/bbcode';

interface AnchorProps extends BBCodeComponentProps {
    href?: string;
}

export function Anchor({ mode, href, children }: AnchorProps) {
    const cleanChildren = useCleanChildren(children);

    return mode === 'bbcode' ? (
        <>
            [url={href}]{cleanChildren}[/url]
        </>
    ) : (
        <a href={href} className="anchor">
            {children}
        </a>
    );
}
