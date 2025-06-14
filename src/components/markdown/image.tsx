import '@/components/markdown/image.css';
import type { BBCodeComponentProps } from '@/types/components';

interface ImageProps extends BBCodeComponentProps {
    src?: string;
    alt?: string;
}

export function Image({ mode, src, alt }: ImageProps) {
    return mode === 'bbcode' ? (
        <>[img]{src}[/img]</>
    ) : (
        <img className="inline-image" src={src} alt={alt} />
    );
}
