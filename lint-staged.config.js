export default {
    'src/**/*.{js,ts,tsx,json}': ['prettier --write', 'eslint --fix'],
    'src/**/*.css': ['prettier --write', 'stylelint --fix'],
    'src/**/*.{js,jsx,ts,tsx}': ['vitest related --run'],
};
