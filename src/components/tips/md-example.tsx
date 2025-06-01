import '@/components/tips/md-example.css';
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
        <div className="md-example">
            <h4 className="md-example-header">Example:</h4>
            <div>
                <h5 className="md-example-title">Example Markdown Input</h5>
                <pre className="md-example-input">{addLineBreaks(children)}</pre>
            </div>
            <div>
                <h5 className="md-example-title">BBCode Output</h5>
                <pre className="md-example-output">
                    <Markdown markdownInput={addLineBreaks(children)} mode="bbcode" />
                </pre>
            </div>
            <div>
                <h5 className="md-example-title">HTML Output</h5>
                <Markdown markdownInput={addLineBreaks(children)} mode="html" />
            </div>
        </div>
    );
}
