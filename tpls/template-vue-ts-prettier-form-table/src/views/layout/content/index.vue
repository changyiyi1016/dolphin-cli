<template>
    <div :class="prefixCls" v-loading="getPageLoading">
        <RouterView>
            <template #default="{ Component, route }">
                <transition name="fade-slide" mode="out-in" appear>
                    <keep-alive>
                        <component :is="Component" :key="route.fullPath" />
                    </keep-alive>
                </transition>
            </template>
        </RouterView>
    </div>
</template>
<script lang="ts" setup>
    import { useDesign } from '@/hooks/web/useDesign';
    import { useAppStore } from '@/store/modules/app';
    import { computed } from 'vue';

    const appStore = useAppStore();
    const { prefixCls } = useDesign('layout');

    const getPageLoading = computed(() => appStore.getPageLoading);
</script>

<script lang="ts">
    export default {
        name: 'Layout',
    };
</script>
<style lang="less">
    @prefix-cls: ~'@{namespace}-layout';

    .@{prefix-cls} {
        position: relative;
        flex: 1 1 auto;
        min-height: 0;

        &.fixed {
            width: 1200px;
            margin: 0 auto;
        }

        &-loading {
            position: absolute;
            top: 200px;
            z-index: @page-loading-z-index;
        }
    }
</style>
