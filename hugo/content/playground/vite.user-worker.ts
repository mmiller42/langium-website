import path from 'path';
import { defineConfig } from 'vite';

const config = defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'user-worker.ts'),
            name: 'userServerWorker',
            fileName: () => 'userServerWorker.js',
            formats: ['iife']            
        },
        outDir: path.resolve(__dirname, '../../static/playground/libs/worker/'),
        emptyOutDir: false
    }
});

export default config;
