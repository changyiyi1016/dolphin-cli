import type { AppRouteRecordRaw } from '@/models/router';
import {
    LAYOUT,
    EXCEPTION_COMPONENT,
    PAGE_NOT_FOUND_NAME,
    REDIRECT_NAME,
} from '@/constants/router';
import { PageEnum } from '@/enums/pageEnum';

export const PAGE_NOT_FOUND_ROUTE: AppRouteRecordRaw = {
    path: '/:path(.*)*',
    name: PAGE_NOT_FOUND_NAME,
    component: LAYOUT,
    meta: {
        title: 'ErrorPage',
        hideBreadcrumb: true,
        hideMenu: true,
    },
    children: [
        {
            path: '/:path(.*)*',
            name: PAGE_NOT_FOUND_NAME,
            component: EXCEPTION_COMPONENT,
            meta: {
                title: 'ErrorPage',
                hideBreadcrumb: true,
                hideMenu: true,
            },
        },
    ],
};

export const REDIRECT_ROUTE: AppRouteRecordRaw = {
    path: '/redirect',
    component: LAYOUT,
    name: 'RedirectTo',
    meta: {
        title: REDIRECT_NAME,
        hideBreadcrumb: true,
        hideMenu: true,
    },
    children: [
        {
            path: '/redirect/:path(.*)',
            name: REDIRECT_NAME,
            component: () => import('/@/views/sys/redirect/index.vue'),
            meta: {
                title: REDIRECT_NAME,
                hideBreadcrumb: true,
            },
        },
    ],
};

export const RootRoute: AppRouteRecordRaw = {
    path: '/',
    name: 'Root',
    redirect: PageEnum.BASE_HOME,
    meta: {
        title: 'Root',
    },
};
