import {defineConfig} from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig( {
    plugins: [
        tailwindcss(),
        laravel( {
            input: 'resources/js/app.tsx',
            refresh: true,
        } ),
        react(),
    ],
    server: {
        hmr: {
            host: '127.0.0.1',
        },
        host: '0.0.0.0'
    }
} );