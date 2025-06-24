import * as styles from '@/components/markdown/code.styles';
import type { BBCodeComponentProps } from '@/types/components';
export function Code({ mode, children }: BBCodeComponentProps) {
    return mode === 'bbcode' ? (
        <>
            [code]{children}[/code]{'\n'}
        </>
    ) : (
        <code css={styles.codeBlock}>{children}</code>
    );
}
