export function Break({ mode }: { mode: 'html' | 'bbcode' }) {
    return mode === 'bbcode' ? <>{'\n'}</> : <br />;
}
