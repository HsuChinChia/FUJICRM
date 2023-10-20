import { createApp, computed } from 'vue'
import ElementPlus from 'element-plus';
// import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './vueRouter'
import store from '@/modules/FPKG-50000-Vuex';
import http from '@/modules/FPKG-230000-BackendCore/prototypes/axios';
import $i18n from './lang';
import Icon from '@/modules/FPKG-20000-Util/components/b-icon.vue'; // icon 顯示
import status from '@/modules/FPKG-20000-Util/components/b-status-option/index.vue'; // 狀態顯示
import { AxiosInstance } from 'axios';
import bus from '@/modules/FPKG-20000-Util/prototypes/bus';
import { PrototypesCrud } from "@/modules/FPKG-20000-Util/prototypes/crud";
import formatNumber from './prototypes/Format_Number';
import errorHandler from "./errorHandler";
import i18n from './lang';
import Socket from "@/modules/FPKG-80000-Socket/hud/index";



const app = createApp(App);
app.config.globalProperties.$http = http;
app.config.globalProperties.$i18n = $i18n;
app.config.globalProperties.$bus = bus;
app.config.globalProperties.$Format_Number = formatNumber;
app.config.globalProperties.$socket = Socket();


// 隱藏console的warnging 可以移除警告的提示
app.config.warnHandler = function (msg, vm, trace) {
  return null
}



app.config.errorHandler = errorHandler;

app.component('icon', Icon)
app.component('status', status);


app.use(router);
app.use(store);
// app.use($i18n);
// app.use(ElementPlus);
app.use(ElementPlus, {
  i18n: i18n.global.t,
})
app.use(i18n)
app.mount('#app');

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $http: AxiosInstance;
    // i18n: any;
  }
}

