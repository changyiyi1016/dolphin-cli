<template>
    <PageWrapper class="os-sider" content-full-height v-if="showSider">
        <a-layout-sider
            v-model:collapsed="collapsed"
            collapsible
            theme="dark"
            style="height: calc(100vh - 32px)"
            collapsed-width="0px"
            width="187px"
            :trigger="null"
        >
            <div class="sider-title">{{ sideInfo.title }}</div>
            <a-menu v-model:selectedKeys="selectedKeys" mode="inline">
                <a-menu-item v-for="item in sideInfo.sideList" :key="item.key" @click="item.go">
                    {{ item.title }}
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <div class="sider-trigger" @click="() => (collapsed = !collapsed)">
            <CaretRightFilled class="trigger" v-if="collapsed" />
            <CaretLeftFilled class="trigger" v-else />
        </div>
    </PageWrapper>
</template>

<script lang="ts" setup>
    import { ref, watch } from 'vue';
    import { CaretRightFilled, CaretLeftFilled } from '@ant-design/icons-vue';
    import { PageWrapper } from '@/components/Page';
    import { useRoute, useRouter } from 'vue-router';
    import { menuConfig } from './menu.config';
    import { error } from '@/utils/log';
    const route = useRoute();
    const router = useRouter();

    const collapsed = ref(false);
    const selectedKeys = ref<string[]>([]);

    const sideInfo = {
        title: menuConfig.title,
        sideList: menuConfig.children.map((config) => {
            return {
                title: config.title,
                name: config.name,
                key: config.name,
                go: () => {
                    router.push({ name: config.name });
                },
            };
        }),
    };

    const isMicroApp = ref(window.__MICRO_APP_BASE_APPLICATION__);
    const showSider = import.meta.env.VITE_SUB_APP_SIDE === 'true';

    try {
        if (isMicroApp.value && showSider) {
            const eventCenter = window['eventCenterFor<%= appName %>'].getData();
            eventCenter.getData().setSideBar({
                title: sideInfo.title,
                selectedKey: sideInfo.sideList[0].name,
                sideList: sideInfo.sideList,
            });
            watch(
                () => route.name,
                (name: string) => {
                    if (route.meta.currentActiveMenu) {
                        eventCenter.setSelected([route.meta.currentActiveMenu]);
                    } else {
                        eventCenter.setSelected([name]);
                    }
                },
                {
                    immediate: true,
                },
            );
        } else {
            watch(
                () => route.name,
                (name: string) => {
                    if (route.meta.currentActiveMenu) {
                        selectedKeys.value = [route.meta.currentActiveMenu];
                    } else {
                        selectedKeys.value = [name];
                    }
                },
                {
                    immediate: true,
                },
            );
        }
    } catch (e) {
        error((e as Error).message);
    }
</script>

<script lang="ts">
    export default {
        name: 'Sidebar',
        inheritAttrs: false,
    };
</script>

<style lang="less" scoped>
    @sider-text-active-color: #3180f6;
    @os-sider: 187px;
    @os-sider-collase: 55px;
    @os-sub-sider-width: 132px;
    @os-sider-bg-color: #fff;
    @os-sider-text-color: #898b8f;

    .os-sider {
        max-width: @os-sider;
        display: flex;
        position: relative;
        box-shadow: 0px 0px 10px 1px #ececec;
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        margin-right: 16px;
        margin-left: 16px;

        :deep(.ant-layout-sider) {
            background-color: @os-sider-bg-color;
            border-radius: 0px 8px 8px 0px;
            margin-top: 12px;

            .sider-title {
                color: @title-text-color;
                font-size: 16px;
                font-weight: 600;
                padding-left: 16px;
                line-height: 1;
                margin-bottom: 16px;
                margin-top: 16px;
            }

            .ant-menu {
                font-size: 14px;
                padding: 0 5px;
                background-color: @os-sider-bg-color;
                border-right: none;

                &.ant-menu-inline-collapsed {
                    .ant-menu-item {
                        padding: 0 calc(50% - 16px / 2) !important;
                        margin: 8px 0;
                        display: flex;
                        align-items: center;
                    }

                    .ant-menu-item-icon {
                        font-size: 14px;
                    }
                }

                .ant-menu-item {
                    padding-left: 11px !important;
                    height: 42px;
                    line-height: 42px;
                    border-radius: 8px;

                    transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

                    a {
                        font-weight: 600;
                        color: @os-sider-text-color;
                    }

                    .ant-menu-item-icon {
                        font-size: 20px !important;
                        min-width: 20px;
                        color: @os-sider-text-color;
                    }

                    .ant-menu-title-content {
                        margin-left: 20px;
                    }
                }

                .ant-menu-item-selected,
                .ant-menu-item-active {
                    background-color: @sider-text-active-color;
                    color: white;

                    .ant-menu-title-content {
                        margin-left: 20px;
                    }

                    a {
                        color: white;
                    }

                    .ant-menu-item-icon {
                        color: white;
                    }

                    &::after {
                        display: none;
                    }
                }
            }
        }

        .sider-trigger {
            position: absolute;
            top: 0;
            bottom: 0;
            right: -12px;
            color: @os-sider-text-color;
            width: 12px;
            cursor: pointer;

            &:hover {
                background: rgba(0, 0, 0, 0.1);
            }

            .trigger {
                position: absolute;
                top: 40%;
                transform: translateY(-70%);
                font-size: 12px;
                height: 32px;
                line-height: 32px;
                border-radius: 8px;
                color: #fff;
                background: @primary-color;
                transition: color 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

                :hover {
                    color: @sider-text-active-color;
                }
            }
        }
    }

    .placeholder {
        width: @os-sider;
    }
</style>
