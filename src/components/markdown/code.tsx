import '@/components/markdown/code.css';
import type { BBCodeComponentProps } from '@/types/components';
export function Code({ mode, children }: BBCodeComponentProps) {
    return mode === 'bbcode' ? (
        <>
            [code]{children}[/code]{'\n'}
        </>
    ) : (
        <code className="code-block">{children}</code>
    );
}
