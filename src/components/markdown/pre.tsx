import type { BBCodeComponentProps } from '@/types/components';

export function Pre({ mode, children }: BBCodeComponentProps) {
    return mode === 'bbcode' ? <>{children}</> : <pre className="pre-block">{children}</pre>;
}
