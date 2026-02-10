// 引入
import { createApp } from 'vue';
// 根组件
import App from './App.vue';
// 路由器
import router from './router/index';

// 创建应用实例
const app = createApp(App);
// 使用路由器
app.use(router);
// 挂载
app.mount('#app');