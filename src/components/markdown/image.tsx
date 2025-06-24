/** @jsxImportSource @emotion/react */
import * as styles from '@/components/markdown/image.styles';
import type { BBCodeComponentProps } from '@/types/components';

interface ImageProps extends BBCodeComponentProps {
    src?: string;
    alt?: string;
}

export function Image({ mode, src, alt }: ImageProps) {
    return mode === 'bbcode' ? (
        <>[img]{src}[/img]</>
    ) : (
        <img css={styles.inlineImage} src={src} alt={alt} />
    );
}
