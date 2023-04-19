import { BasicColumn } from '@/components/Table';
import { FormSchema } from '@/components/Table';
import { formatToDate } from '@/utils/dateUtil';
import { h } from 'vue';

export const columns: BasicColumn[] = [
    {
        title: '靶点名',
        dataIndex: 'target',
        width: 120,
    },
    {
        title: '来源',
        dataIndex: 'source',
        width: 120,
    },
    {
        title: '疾病',
        dataIndex: 'annotation',
        width: 120,
    },
    {
        title: '分数',
        dataIndex: 'model_score_eval',
        width: 120,
    },
    {
        title: '时间',
        dataIndex: 'update_time',
        width: 120,
        customRender: ({ record }) => {
            return h('span', formatToDate(record.update_time));
        },
    },
    {
        title: '录入人',
        dataIndex: 'creator',
        width: 120,
    },
];

export const searchFormSchema: FormSchema[] = [
    {
        field: 'target',
        label: '',
        component: 'Input',
        componentProps: {
            placeholder: '请输入靶点名',
        },
    },
];

export const formSchema: FormSchema[] = [
    {
        field: 'target',
        label: '靶点名',
        component: 'Input',
        required: true,
        colProps: {
            span: 20,
        },
    },
    {
        field: 'source',
        label: '来源',
        component: 'Input',
        required: true,
        colProps: {
            span: 20,
        },
    },
    {
        field: 'annotation',
        label: '疾病',
        component: 'Select',
        componentProps: {
            options: [
                { label: 'STAD', value: 'STAD' },
                { label: 'LIHC', value: 'LIHC' },
            ],
        },
        required: true,
        colProps: {
            span: 20,
        },
    },
];
