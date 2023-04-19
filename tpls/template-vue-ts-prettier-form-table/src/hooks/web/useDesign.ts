
import { useAppProviderContext } from '@/hooks/web/useAppContext';

export function useDesign(scope: string) {
    const values = useAppProviderContext();
    return {
        prefixCls: `${values.prefixCls}-${scope}`,
        prefixVar: values.prefixCls,
    };
}
