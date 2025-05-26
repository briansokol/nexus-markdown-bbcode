export function Line({ mode }: { mode: 'html' | 'bbcode' }) {
    return mode === 'bbcode' ? <>[line]</> : <hr />;
}
