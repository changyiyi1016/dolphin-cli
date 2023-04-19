import type { App } from 'vue';
import Antd from 'ant-design-vue';

export function registerGlobComp(app: App) {
    app.use(Antd);
}
