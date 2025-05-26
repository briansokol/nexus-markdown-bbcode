import '@/components/tips/md-example.css';
import { Markdown } from '@/markdown';

interface MdExampleProps {
    children: string | string[];
}

export function MdExample({ children }: MdExampleProps) {
    return (
        <div className="md-example">
            <h4 className="md-example-header">Example:</h4>
            <div>
                <h5 className="md-example-title">Example Markdown Input</h5>
                <pre className="md-example-input">{children}</pre>
            </div>
            <div>
                <h5 className="md-example-title">BBCode Output</h5>
                <pre className="md-example-output">
                    <Markdown
                        markdownInput={Array.isArray(children) ? children.join('\n') : children}
                        mode="bbcode"
                    />
                </pre>
            </div>
            <div>
                <h5 className="md-example-title">HTML Output</h5>
                <Markdown
                    markdownInput={Array.isArray(children) ? children.join('\n') : children}
                    mode="html"
                />
            </div>
        </div>
    );
}
