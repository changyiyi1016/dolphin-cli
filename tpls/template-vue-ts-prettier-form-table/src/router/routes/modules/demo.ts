import { LAYOUT } from '@/constants/router';

const demo = {
    path: '/demo',
    name: 'Target',
    component: LAYOUT,
    redirect: '/demo/list',
    meta: {
        title: 'Demo',
    },
    children: [
        {
            path: 'list',
            name: 'List',
            component: () => import('@/views/demo-list/index.vue'),
            meta: {
                title: 'List',
            },
        },
    ],
};
export default demo;
