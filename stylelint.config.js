/**
 * Stylelint configuration for the Nexus Markdown to BBCode Editor project
 * @type {import('stylelint').Config}
 */
export default {
    extends: ['stylelint-config-standard', 'stylelint-prettier/recommended'],
    ignoreFiles: ['dist/**/*', 'node_modules/**/*'],
};
