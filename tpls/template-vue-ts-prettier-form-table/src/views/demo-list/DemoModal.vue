<template>
    <BasicModal v-bind="$attrs" @register="registerModal" title="新增候选靶点" @ok="handleSubmit">
        <BasicForm @register="registerForm" />
    </BasicModal>
</template>
<script lang="ts">
    import { defineComponent } from 'vue';
    import { BasicModal, useModalInner } from '@/components/Modal';
    import { BasicForm, useForm } from '@/components/Form/index';
    import { formSchema } from './demo.data';
    import { createDemo } from '@/api/demo';

    export default defineComponent({
        name: 'DeptModal',
        components: { BasicModal, BasicForm },
        emits: ['success', 'register'],
        setup(_, { emit }) {
            const [registerForm, { resetFields, validate }] = useForm({
                labelWidth: 100,
                schemas: formSchema,
                showActionButtonGroup: false,
            });

            const [registerModal, { setModalProps, closeModal }] = useModalInner(async () => {
                setModalProps({ loading: true });
                resetFields();
                setModalProps({ loading: false });
            });

            async function handleSubmit() {
                try {
                    const values = await validate();
                    setModalProps({ confirmLoading: true });
                    await createDemo({
                        targets: [values],
                    });
                    closeModal();
                    emit('success');
                } finally {
                    setModalProps({ confirmLoading: false });
                }
            }

            return { registerModal, registerForm, handleSubmit };
        },
    });
</script>
