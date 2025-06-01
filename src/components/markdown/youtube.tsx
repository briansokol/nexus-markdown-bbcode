/* eslint-disable react-dom/no-missing-iframe-sandbox */
import type { BBCodeComponentProps } from '@/types/components';

export interface YouTubeProps extends BBCodeComponentProps {
    v: string;
}

export function YouTube({ mode, v }: YouTubeProps) {
    return mode === 'bbcode' ? (
        <>[youtube]{v}[/youtube]</>
    ) : (
        <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${v}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
        ></iframe>
    );
}
