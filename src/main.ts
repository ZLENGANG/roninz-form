import { createApp } from 'vue';
import 'element-plus/dist/index.css';
import App from './App.vue';
import components from './components/index';

const app = createApp(App);

app.use(components).mount('#app');
