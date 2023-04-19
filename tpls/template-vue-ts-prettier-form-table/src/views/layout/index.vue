<template>
    <a-layout>
        <LayoutSideBar />
        <a-layout>
            <LayoutBreadcrumb />
            <LayoutContent />
        </a-layout>
    </a-layout>
</template>
<script lang="ts" setup>
    import LayoutSideBar from '../layout/sider/index.vue';
    import LayoutBreadcrumb from '../layout/breadcrumb/index.vue';
    import LayoutContent from '../layout/content/index.vue';
</script>

<script lang="ts">
    export default {
        name: 'Layout',
    };
</script>
