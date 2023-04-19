<script lang="ts">
    import { defineComponent, toRefs, ref } from 'vue';
    import { createAppProviderContext } from '@/hooks/web/useAppContext';
    import { createBreakpointListen } from '@/hooks/event/useBreakpoint';
    import { prefixCls } from '@/hooks/setting';

    const props = {
        /**
         * class style prefix
         */
        prefixCls: { type: String, default: prefixCls },
    };

    export default defineComponent({
        name: 'AppProvider',
        inheritAttrs: false,
        props,
        setup(props, { slots }) {
            const isMobile = ref(false);

            // Monitor screen breakpoint information changes
            createBreakpointListen(({ screenMap, sizeEnum, width }) => {
                const lgWidth = screenMap.get(sizeEnum.LG);
                if (lgWidth) {
                    isMobile.value = width.value - 1 < lgWidth;
                }
            });

            const { prefixCls } = toRefs(props);

            createAppProviderContext({ prefixCls, isMobile });

            return () => slots.default?.();
        },
    });
</script>
