import type { Router } from 'vue-router';
import nProgress from 'nprogress';
import { useAppStoreWithOut } from '@/store/modules/app';

export function setupRouterGuard(router: Router) {
    fixMicro(router);
    fixParams(router);
    createPageGuard(router);
    createPageLoadingGuard(router);
    createProgressGuard(router);
    createProgressGuard(router);
}


export function fixMicro(router: Router) {
    if (window.__MICRO_APP_BASE_APPLICATION__) {
        let actived = true;
        router.beforeEach((_to, _from, next) => {
            if (!actived) {
                return;
            }
            next();
        });
        // 监听keep-alive模式下的应用状态
        window.addEventListener('appstate-change-<%= appName %>', (e: any) => {
            if (e.detail.appState === 'afterhidden') {
                actived = false;
            } else if (e.detail.appState === 'beforeshow') {
                actived = true;
                router.replace({ ...router.currentRoute.value, force: true });
            } else if (e.detail.appState === 'aftershow') {
                actived = true;
            }
        });
    }
    // FIXME: 微前端环境下浏览器回退问题
    router.afterEach(() => {
        history.pushState(null, '', document.URL);
    });
}

export function fixParams(router: Router) {
    router.beforeEach((_from, _to, next) => {
        next();
    });
}

export function createProgressGuard(router: Router) {
    router.beforeEach(async (to) => {
        if (to.meta.loaded) {
            return true;
        }
        nProgress.start();
        return true;
    });

    router.afterEach(async () => {
        nProgress.done();
        return true;
    });
}


function createPageGuard(router: Router) {
    const loadedPageMap = new Map<string, boolean>();

    router.beforeEach(async (to) => {
        to.meta.loaded = !!loadedPageMap.get(to.path);

        return true;
    });

    router.afterEach((to) => {
        loadedPageMap.set(to.path, true);
    });
}


function createPageLoadingGuard(router: Router) {
    const appStore = useAppStoreWithOut();
    router.beforeEach(async (to) => {
        if (to.meta.loaded) {
            return true;
        }
        appStore.setPageLoading(true);
        return true;
    });

    router.afterEach(async () => {
        appStore.setPageLoading(false);
        return true;
    });
}