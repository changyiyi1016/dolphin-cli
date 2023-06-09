import type { UserConfig, ConfigEnv } from 'vite';
import { loadEnv } from 'vite';
import { resolve } from 'path';
import { createProxy } from './build/vite/proxy';
import { wrapperEnv } from './build/utils';
import { createVitePlugins } from './build/vite/plugin';
import { OUTPUT_DIR } from './build/constant';
import { generateModifyVars } from './build/generate/generateModifyVars';

function pathResolve(dir: string) {
    return resolve(process.cwd(), '.', dir);
}

export default ({ command, mode }: ConfigEnv): UserConfig => {
    const root = process.cwd();

    const env = loadEnv(mode, root);

    // The boolean type read by loadEnv is a string. This function can be converted to boolean type
    const viteEnv = wrapperEnv(env);

    const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv;

    const isBuild = command === 'build';

    return {
        base: VITE_PUBLIC_PATH,
        root,
        resolve: {
            alias: [
                {
                    find: /@\//,
                    replacement: pathResolve('src') + '/',
                },
                {
                    find: /\/#\//,
                    replacement: pathResolve('types') + '/',
                },
            ],
        },
        server: {
            // Listening on all local IPs
            host: 'local.biomap-test.com',
            port: VITE_PORT,
            // Load proxy configuration from .env
            proxy: createProxy(VITE_PROXY),
            cors: {
                origin: 'http://local.biomap-test.com:3000',
                credentials: true,
            },
        },
        build: {
            target: 'es2015',
            outDir: OUTPUT_DIR,
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
        define: {
            // define something
        },

        css: {
            preprocessorOptions: {
                less: {
                    modifyVars: generateModifyVars(),
                    javascriptEnabled: true,
                },
            },
        },

        // The vite plugin used by the project.
        plugins: createVitePlugins(viteEnv, isBuild),

        optimizeDeps: {
            include: ['ant-design-vue/es/locale/zh_CN', 'ant-design-vue/es/locale/en_US'],
            exclude: ['vue-demi'],
        },
    };
};
