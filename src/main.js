import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index.js";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/es/locale/lang/zh-cn'
import 'virtual:svg-icons-register'
const app = createApp(App);
app.use(router).use(ElementPlus, { locale }).mount("#app");
