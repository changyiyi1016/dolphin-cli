export interface GlobConfig {
    // Site title
    title: string;
    // Service interface url
    apiUrl: string;
    //  Service interface url prefix
    urlPrefix?: string;
    // Project abbreviation
    shortName: string;
}
export interface GlobEnvConfig {
    // Site title
    VITE_GLOB_APP_TITLE: string;
    // Service interface url
    VITE_GLOB_API_URL: string;
    // Service interface url prefix
    VITE_GLOB_API_URL_PREFIX?: string;
    // Project abbreviation
    VITE_GLOB_APP_SHORT_NAME: string;
    // localStorage 前缀
    VITE_GLOB_LOCALSTORAGE_PREFIX: string;
}

export type LocaleType = 'zh_CN' | 'en_US';

export interface LocaleSetting {
    showPicker: boolean;
    // Current language
    locale: LocaleType;
    // default language
    fallback: LocaleType;
    // available Locales
    availableLocales: LocaleType[];
}
