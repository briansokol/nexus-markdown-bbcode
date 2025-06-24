import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import packageJson from './package.json';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react({
            jsxImportSource: '@emotion/react',
            plugins: [['@swc/plugin-emotion', {}]],
        }),
        viteSingleFile({ removeViteModuleLoader: true }),
        {
            name: 'rename',
            enforce: 'post',
            generateBundle(_, bundle) {
                bundle['markdown-to-bbcode.html'].fileName = bundle[
                    'markdown-to-bbcode.html'
                ].fileName.replace('.html', `-v${packageJson.version}.html`);
            },
        },
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        rollupOptions: {
            input: {
                app: './markdown-to-bbcode.html',
            },
        },
    },
    server: {
        open: '/markdown-to-bbcode.html',
    },
});
