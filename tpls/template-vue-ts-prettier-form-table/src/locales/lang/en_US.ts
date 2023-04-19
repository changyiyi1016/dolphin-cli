import { genMessage } from '../helper';
import antdLocale from 'ant-design-vue/es/locale/en_US';

const modules = import.meta.globEager('./en_US/**/*.ts');
export default {
    message: {
        ...genMessage(modules, 'en_US'),
        antdLocale,
    },
    dateLocale: null,
    dateLocaleName: 'en_US',
};
