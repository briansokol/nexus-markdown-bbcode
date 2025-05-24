import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), viteSingleFile({ removeViteModuleLoader: true })],
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
