import type { AppRouteModule } from '@/models/router';

import { PAGE_NOT_FOUND_ROUTE, RootRoute, REDIRECT_ROUTE } from '@/router/routes/basic';

const modules = import.meta.globEager('./modules/**/*.ts');
const routeModuleList: AppRouteModule[] = [];

Object.keys(modules).forEach((key) => {
    const mod = modules[key].default || {};
    const modList = Array.isArray(mod) ? [...mod] : [mod];
    routeModuleList.push(...modList);
});

// Basic routing without permission
export const basicRoutes = [RootRoute, PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE, ...routeModuleList];

export {
    routeModuleList
}
