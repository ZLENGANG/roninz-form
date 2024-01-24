import { createApp } from 'vue';
import 'element-plus/dist/index.css';
import App from './App.vue';
import RoninzForm from '../src/components';
import ElementPlus from 'element-plus';

const app = createApp(App);

app.use(RoninzForm).use(ElementPlus).mount('#app');
