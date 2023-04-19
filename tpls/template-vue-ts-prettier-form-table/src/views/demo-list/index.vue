<template>
    <PageWrapper class="bg-default-white" title="demo" content-full-height>
        <BasicTable
            @register="registerTable"
            :search-info="searchInfo"
            class="relative mx-4px"
        >
            <template #form-formHeader>
                <a-button
                    type="primary"
                    ghost
                    @click="handleCreate"
                    class="!absolute right-0 items-center !flex right-16px !rounded-4px"
                >
                    <PlusOutlined />创建任务
                </a-button>
            </template>
            <template #action="{ record }">
                <a-button type="link" @click="onClick(record)">Click</a-button>
            </template>
        </BasicTable>
        <DemoModal @register="registerModal" @success="handleSuccess" />
    </PageWrapper>
</template>

<script lang="ts" setup>
    import { columns, searchFormSchema } from './demo.data';
    import { BasicTable, useTable } from '@/components/Table';
    import { getDemoList } from '@/api/demo';
    import { PageWrapper } from '@/components/Page';
    import { reactive } from 'vue';
    import { useModal } from '@/components/Modal';
    import DemoModal from './DemoModal.vue';
    import { PlusOutlined } from '@ant-design/icons-vue';

    const searchInfo = reactive<Recordable>({});

    const [registerTable, { reload }] = useTable({
        api: getDemoList,
        rowKey: 'id',
        columns,
        beforeFetch(info) {
            return info;
        },
        formConfig: {
            schemas: searchFormSchema,
            showResetButton: false,
            autoSubmitOnEnter: true,
            showAdvancedButton: true,
            layout: 'horizontal',
            labelAlign: 'left',
            submitButtonOptions: {
                preIcon: 'ant-design:search-outlined',
                iconSize: 14,
            },
            baseColProps: {
                span: 8,
            },
            colon: true,
            actionColOptions: {
                span: 2,
            },
        },
        useSearchForm: true,
        showTableSetting: false,
        showIndexColumn: false,
        canResize: false,
        size: 'small',
        bordered: false,
        striped: false,
        actionColumn: {
            width: 140,
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            slots: { customRender: 'action' },
        },
        sortFn({ order, field }) {
            return {
                field,
                order: order === 'ascend' ? 'asc' : 'desc',
            };
        },
    });
    const onClick = (record) => {
        console.log('record', record)
    };
    const [registerModal, { openModal }] = useModal();
    function handleCreate() {
        openModal(true, {});
    }
    function handleSuccess() {
        reload();
    }
</script>
