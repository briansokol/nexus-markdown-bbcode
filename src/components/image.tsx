import type { BBCodeComponentProps } from '@/types/components';

interface ImageProps extends BBCodeComponentProps {
    src?: string;
    alt?: string;
}

export const Image = ({ mode, src, alt }: ImageProps) => {
    return mode === 'bbcode' ? <>[img]{src}[/img]</> : <img src={src} alt={alt} />;
};
