import type { LocaleSetting, LocaleType } from '/#/config';

import { defineStore } from 'pinia';
import { store } from '@/store';

import { LOCALE_KEY } from '@/enums/cacheEnum';
import { createLocalStorage } from '@/utils/cache';
import { localeSetting } from '@/settings/localeSetting';

const ls = createLocalStorage();
const sysLocale = navigator.language;

// 读取浏览器当前语言作为默认语言
if (sysLocale.indexOf('en') === 0) {
    localeSetting.locale = 'en_US';
} else {
    localeSetting.locale = 'zh_CN';
}

// 读取 cookie 中的 locale
const lsLocaleSetting = (ls.get(LOCALE_KEY) || localeSetting) as LocaleSetting;

interface LocaleState {
    localInfo: LocaleSetting;
}

export const useLocaleStore = defineStore({
    id: 'locale-locale',
    state: (): LocaleState => ({
        localInfo: lsLocaleSetting,
    }),
    getters: {
        getShowPicker(): boolean {
            return !!this.localInfo?.showPicker;
        },
        getLocale(): LocaleType {
            return this.localInfo?.locale ?? 'zh_CN';
        },
    },
    actions: {
        /**
         * Set up multilingual information and cache
         * @param info multilingual info
         */
        setLocaleInfo(info: Partial<LocaleSetting>) {
            this.localInfo = { ...this.localInfo, ...info };
            ls.set(LOCALE_KEY, this.localInfo);
        },
        /**
         * Initialize multilingual information and load the existing configuration from the local cache
         */
        initLocale() {
            this.setLocaleInfo({
                ...localeSetting,
                ...this.localInfo,
            });
        },
    },
});

// Need to be used outside the setup
export function useLocaleStoreWithOut() {
    return useLocaleStore(store);
}
