import { createApp } from 'vue';
import 'element-plus/dist/index.css';
import App from './App.vue';
import components from './components/index';
import ElementPlus from 'element-plus';
import Test from './components/test.vue';

const app = createApp(App);

app.use(components, { test: Test }).use(ElementPlus).mount('#app');
