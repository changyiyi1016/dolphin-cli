import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { wrapperEnv } from './build/utils';
import { createProxy } from './build/proxy';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const root = process.cwd();
    const env = loadEnv(mode, root);
    const viteEnv = wrapperEnv(env);
    const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv;

    return {
        base: VITE_PUBLIC_PATH,
        root,
        plugins: [reactRefresh()],
        esbuild: {
            jsxInject: `import React from 'react'`, // automatically import React in jsx files
        },
        server: {
            // Listening on all local IPs
            host: true,
            open: true,
            port: VITE_PORT,
            // Load proxy configuration from .env
            proxy: createProxy(VITE_PROXY),
        },
        resolve: {
            alias: {
                '@/': `${path.resolve(__dirname, 'src')}/`,
            },
        },
        build: {
            target: 'es2015',
            outDir: 'dist',
            terserOptions: {
                compress: {
                    keep_infinity: true,
                    // Used to delete console in production environment
                    drop_console: VITE_DROP_CONSOLE,
                },
            },
            // Turning off brotliSize display can slightly reduce packaging time
            brotliSize: false,
            chunkSizeWarningLimit: 2000,
        },
    };
});
