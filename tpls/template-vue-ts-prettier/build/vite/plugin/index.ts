import type { Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import windiCSS from 'vite-plugin-windicss';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import { configHtmlPlugin } from './html';
import { configMockPlugin } from './mock';
import { configCompressPlugin } from './compress';
import { configVisualizerConfig } from './visualizer';
import { configHmrPlugin } from './hmr';
import { configMicroAppPlugin } from './micro';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
    const {
        VITE_USE_MOCK,
        VITE_LEGACY,
        VITE_BUILD_COMPRESS,
        VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
    } = viteEnv;

    const vitePlugins: (Plugin | Plugin[])[] = [
        // have to
        vue(),
        // have to
        vueJsx(),
        // support name
        vueSetupExtend(),
    ];

    // vite-plugin-windicss
    vitePlugins.push(windiCSS());

    // TODO
    !isBuild && vitePlugins.push(configHmrPlugin());

    // @vitejs/plugin-legacy
    VITE_LEGACY && isBuild && vitePlugins.push(legacy());

    // vite-plugin-html
    vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

    // vite-plugin-mock
    VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild));

    // rollup-plugin-visualizer
    vitePlugins.push(configVisualizerConfig());

    // The following plugins only work in the production environment
    if (isBuild) {
        // rollup-plugin-gzip
        vitePlugins.push(
            configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE),
        );
        // micro-app
        vitePlugins.push(configMicroAppPlugin());
    }

    return vitePlugins;
}
