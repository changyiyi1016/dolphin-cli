<template>
    <div :class="prefixCls" v-if="routes.length > 1">
        <a-breadcrumb :routes="routes" separator=">">
            <template #itemRender="{ route, routes: routesMatched, paths }">
                <span v-if="!hasRedirect(routesMatched, route)">
                    {{ route.meta.title || route.name }}
                </span>
                <router-link v-else to="" @click="handleClick(route, paths, $event)">
                    {{ route.meta.title || route.name }}
                </router-link>
            </template>
        </a-breadcrumb>
    </div>
</template>
<script lang="ts">
    import type { RouteLocationMatched } from 'vue-router';
    import { useRouter, useRoute } from 'vue-router';
    import { computed, defineComponent, watchEffect } from 'vue';
    import { Breadcrumb } from 'ant-design-vue';
    import { propTypes } from '@/utils/propTypes';
    import { isString } from '@/utils/is';
    import { useGo } from '@/hooks/web/usePage';
    import { REDIRECT_NAME } from '@/constants/router';
    import { useBreadCrumbStoreWithOut } from '@/store/modules/breadcrumb';

    export default defineComponent({
        name: 'LayoutBreadcrumb',
        components: { [Breadcrumb.name]: Breadcrumb },
        props: {
            theme: propTypes.oneOf(['dark', 'light']),
        },
        setup() {
            const router = useRouter();
            // const routes = ref<RouteLocationMatched[]>([]);
            const prefixCls = 'layout-breadcrumb';
            const go = useGo();
            const route = useRoute();
            const breadcrumbStore = useBreadCrumbStoreWithOut();

            const routes = computed<RouteLocationMatched[]>(() => breadcrumbStore.breadCrumbs);

            watchEffect(async () => {
                let matchedArr = route.matched.filter((item) => {
                    return item.meta.showInbreadcrumb;
                });
                if (router.currentRoute.value.name === REDIRECT_NAME || !matchedArr.length) {
                    breadcrumbStore.setBreadCrumbs([]);
                } else {
                    breadcrumbStore.setBreadCrumbs(matchedArr);
                }
            });

            function handleClick(route: RouteLocationMatched, paths: string[], e: Event) {
                e?.preventDefault();
                const { redirect } = route;

                if (redirect && isString(redirect)) {
                    go(redirect);
                } else {
                    let goPath = '';
                    if (paths.length === 1) {
                        goPath = paths[0];
                    } else {
                        const ps = paths.slice(1);
                        const lastPath = ps.pop() || '';
                        goPath = `${lastPath}`;
                    }
                    goPath = /^\//.test(goPath) ? goPath : `/${goPath}`;
                    go(goPath);
                }
            }

            function hasRedirect(routes: RouteLocationMatched[], route: RouteLocationMatched) {
                return routes.indexOf(route) !== routes.length - 1;
            }

            return {
                routes,
                prefixCls,
                handleClick,
                hasRedirect,
            };
        },
    });
</script>
<style lang="less">
    @prefix-cls: ~'layout-breadcrumb';

    @breadcrumb-normal-text-color: #4a4b5b;

    .@{prefix-cls} {
        display: flex;
        padding: 0 8px;
        align-items: center;
        margin-bottom: 18px;

        .ant-breadcrumb-link {
            color: @primary-color;

            .anticon {
                margin-right: 4px;
                margin-bottom: 2px;
            }

            a {
                color: @primary-color;
            }
        }

        .ant-breadcrumb-separator {
            color: @breadcrumb-normal-text-color;
        }

        .ant-breadcrumb > span:last-child {
            .ant-breadcrumb-link {
                color: @breadcrumb-normal-text-color;
            }
        }
    }
</style>
