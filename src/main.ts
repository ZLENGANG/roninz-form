import { createApp } from 'vue';
import 'element-plus/dist/index.css';
import App from './App.vue';
import components from './components/index';
import ElementPlus from 'element-plus'
const app = createApp(App);

app.use(components).use(ElementPlus).mount('#app');
