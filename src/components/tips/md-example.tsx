/** @jsxImportSource @emotion/react */
import * as styles from '@/components/tips/md-example.styles';
import { Markdown } from '@/markdown';

interface MdExampleProps {
    children: string | string[];
}

function addLineBreaks(children: string | string[]): string {
    if (Array.isArray(children)) {
        let newChildren = '';

        for (let i = 0; i < children.length; i++) {
            if (i > 0 && !children[i - 1].endsWith('\n') && !children[i].includes('\n')) {
                newChildren += '\n';
            }
            newChildren += children[i];
        }
        return newChildren;
    }
    return children;
}

export function MdExample({ children }: MdExampleProps) {
    console.log(addLineBreaks(children));
    return (
        <div css={styles.mdExample}>
            <h4 css={styles.mdExampleHeader}>Example:</h4>
            <div>
                <h5 css={styles.mdExampleTitle}>Example Markdown Input</h5>
                <pre css={styles.mdExampleInput}>{addLineBreaks(children)}</pre>
            </div>
            <div>
                <h5 css={styles.mdExampleTitle}>BBCode Output</h5>
                <pre css={styles.mdExampleOutput}>
                    <Markdown markdownInput={addLineBreaks(children)} mode="bbcode" />
                </pre>
            </div>
            <div>
                <h5 css={styles.mdExampleTitle}>HTML Output</h5>
                <Markdown markdownInput={addLineBreaks(children)} mode="html" />
            </div>
        </div>
    );
}
