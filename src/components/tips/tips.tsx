import * as styles from '@/components/tips/tips.styles';
import { MdExample } from './md-example';

interface TipsProps {
    closeHandler: () => void;
}

/**
 * Tips component that displays markdown formatting help with a fixed header and scrollable content
 * @param closeHandler - Function to call when the close button is clicked
 */
export function Tips({ closeHandler }: TipsProps) {
    return (
        <div css={styles.tipsContainer}>
            <div css={styles.tipsHeader}>
                <h1>Tips</h1>
                <button type="button" css={styles.tipsClose} onClick={closeHandler}>
                    &times;
                </button>
            </div>
            <div css={styles.tipsContent}>
                <p>
                    This tools supports CommonMark, Github-Flavored Markdown, and some custom
                    directives.
                </p>

                <h2>Typography</h2>

                <h3>Headers</h3>
                <p>Headers are defined using hash symbols. This tool supports h1 and h2 levels.</p>
                <MdExample># Header Level 1</MdExample>
                <MdExample>## Header Level 2</MdExample>

                <h3>Paragraphs</h3>
                <p>
                    Paragraphs need no special tags. They are any text not surrounded by other tags.
                    At least 2 newlines between lines are needed in order to split a paragraph.
                </p>
                <MdExample>This is a paragraph.{'\n\n'}This is another paragraph.</MdExample>

                <p>Smaller paragraphs can be used for captions for images and videos.</p>
                <MdExample>:small[This is a caption]</MdExample>

                <h3>Formatting</h3>
                <p>
                    Certain inline styles can be applied to text. The following styles are
                    supported:
                </p>

                <MdExample>This is *italic* text</MdExample>
                <MdExample>This is ~~strikethrough~~ text</MdExample>
                <MdExample>This is :ins[underline] text</MdExample>
                <MdExample>This is `inline code` text</MdExample>

                <h3>Links</h3>
                <p>
                    Links are defined using square brackets for the text and parentheses for the
                    URL. The following format is supported for text only:
                </p>
                <MdExample>This is [Link Text](https://example.com)</MdExample>

                <h3>Colors</h3>
                <p>
                    Several text colors are supported through custom directives. The following
                    colors are supported:
                </p>
                <MdExample>This is :red[red text]</MdExample>
                <MdExample>This is :yellow[yellow text]</MdExample>
                <MdExample>This is :green[green text]</MdExample>
                <MdExample>This is :blue[blue text]</MdExample>

                <h3>Alignment</h3>
                <p>
                    Text alignment can be set using custom directives. The following alignments are
                    supported (with left alignment being the default):
                </p>
                <MdExample>:center[Centered text]</MdExample>
                <MdExample>:right[Right-aligned text]</MdExample>
                <p>
                    Multiple lines can be centered in a group. This can also include images and
                    other markdown tags.
                </p>
                <MdExample>
                    :::center{'\n'}![Official Addon](https://i.imgur.com/1FSEwwP.png){'\n\n'}
                    :small[Official Addon Banner]
                    {'\n'}:::
                </MdExample>

                <h2>Lists</h2>
                <p>
                    Lists can be created using either unordered or ordered formats. The following
                    formats are supported:
                </p>

                <h3>Unordered Lists</h3>
                <p>Unordered lists are defined using asterisks, pluses, or hyphens.</p>
                <MdExample>- Item 1</MdExample>

                <h3>Ordered Lists</h3>
                <p>Ordered lists are defined using numbers followed by a period.</p>
                <MdExample>1. Item 1</MdExample>

                <h2>Media</h2>

                <h3>Images</h3>
                <p>
                    Images are defined using an exclamation mark followed by square brackets for the
                    alt text and parentheses for the URL. BBCode doesn't use the alt text, but it is
                    still useful for remembering which images are which when reading the markdown.
                </p>
                <MdExample>![Official Addon](https://i.imgur.com/1FSEwwP.png)</MdExample>

                <h3>YouTube Embeds</h3>
                <p>
                    YouTube videos can be embedded using a custom directive. Take the "v" value (the
                    video ID) from the URL and provide it to the directive.
                </p>
                <MdExample>{':youtube{v=tKWPfMLw3r8}'}</MdExample>

                <h2>Spoilers</h2>
                <p>
                    Spoilers are defined using a custom directive. Content within the spoiler must
                    be wrapped in triple-colons. Spoilers will not be collapsable in the HTML
                    preview.
                </p>
                <MdExample>
                    :::spoiler{'\n'}This is a spoiler.{'\n\n'}Anything can go inside a spoiler.
                    {'\n'}
                    :::
                </MdExample>

                <h2>Code</h2>
                <p>
                    Code blocks can be created using multiple methods. They all create the same
                    BBCode.
                </p>

                <h3>Single Line Code Block</h3>
                <p>Surround your code with single back-ticks.</p>
                <MdExample>`This is a single line code block`</MdExample>

                <h3>Multi-Line Code Block</h3>
                <p>Add triple back-ticks on the lines before and after the code block.</p>
                <MdExample>
                    {`\`\`\``}
                    This is a multi-line code block{'\n'}This is a multi-line code block
                    {`\`\`\``}
                </MdExample>
            </div>
        </div>
    );
}
