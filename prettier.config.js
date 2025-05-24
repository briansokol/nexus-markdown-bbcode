/**
 * Prettier configuration for the Nexus Markdown to BBCode Editor project
 * @type {import('prettier').Config}
 */
export default {
    plugins: ['prettier-plugin-organize-imports'],
    trailingComma: 'all',
    tabWidth: 4,
    semi: true,
    singleQuote: true,
    printWidth: 100,
    bracketSpacing: true,
    overrides: [
        {
            files: '*.json',
            options: {
                tabWidth: 2,
            },
        },
    ],
};
