import { useI18n } from '@/hooks/web/useI18n';

debugger;
const { t } = useI18n();

export const menuConfig = {
    title: t('sider.title'),
    children: [
        {
            title: t('sider.children.demoList'),
            name: 'DemoList',
        },
    ],
};
