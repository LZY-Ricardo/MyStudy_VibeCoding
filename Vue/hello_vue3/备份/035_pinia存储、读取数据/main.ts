import { createApp } from 'vue';
import App from './App.vue';
// 第一步:引入 pinia
import { createPinia } from 'pinia';

// 第二步:创建 pinia 实例
const pinia = createPinia();

// 第三步:将 pinia 注入到应用中 安装pinia
const app = createApp(App).use(pinia);
app.mount('#app');