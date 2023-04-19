// windi
import 'virtual:windi-base.css';
import 'virtual:windi-components.css';
import 'virtual:windi-utilities.css';
// ant-design
import 'ant-design-vue/dist/antd.less';
import '@/design/index.less';

import App from './App.vue';
import { createApp } from 'vue';
import { setupRouter } from '@/router';
import { setupStore } from '@/store';
import { setupGlobDirectives } from '@/directives';
import { registerGlobComp } from '@/components/registerGlobComp';
import { setupI18n } from '@/locales/setupI18n';

async function bootstrap() {
    const app = createApp(App);

    await setupI18n(app);
    // Configure store
    setupStore(app);

    // Register global components
    registerGlobComp(app);

    // Configure routing
    setupRouter(app);

    // Register global directive
    setupGlobDirectives(app);

    app.mount('#<%= projectName %>');
}

bootstrap();
