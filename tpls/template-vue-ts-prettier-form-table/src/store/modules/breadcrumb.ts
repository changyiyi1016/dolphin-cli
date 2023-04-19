import { defineStore } from 'pinia';
import { store } from '@/store';

export const useBreadCrumbStore = defineStore({
    id: 'breadcrumb',
    state: () => ({
        breadCrumbs: [],
    }),
    actions: {
        setBreadCrumbs(breadcrumbs) {
            this.breadCrumbs = breadcrumbs;
        },
    },
});

export function useBreadCrumbStoreWithOut() {
    return useBreadCrumbStore(store);
}
