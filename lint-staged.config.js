export default {
    'src/**/*.{js,ts,tsx,json}': ['prettier --write', 'eslint --fix'],
    'src/**/*.css': ['prettier --write', 'stylelint --fix'],
};
