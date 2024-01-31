import { createApp } from "vue";
import "element-plus/dist/index.css";
import App from "./App.vue";
import RoninzForm from "../src/components";
import ElementPlus from "element-plus";
import MySelect from "./MySelect.vue";

const app = createApp(App);

app.use(RoninzForm, { "m-select": MySelect }).use(ElementPlus).mount("#app");
