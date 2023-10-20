/* eslint-disable import/no-cycle */
/* eslint-disable no-use-before-define, global-require */
import $i18n from './lang';
import { createRouter, createWebHistory, RouteRecordRaw, Router } from 'vue-router'

import $store from '@/modules/FPKG-50000-Vuex/index'; // lists 與axios溝通


/** 自動引入路徑 */
let myModules = [];
const Modules = requireAll(require.context('@/modules', true, /router.ts$/));


myModules = Modules;

const error404 = {
  path: '/error404',
  // redirect: '/login',
  component: () => import('@/modules/FPKG-20000-Util/components/error404.vue'),
  name: 'error404',
  meta: {
    url: '/',
  },
};

const AllModules = [...myModules, error404];


const Myrouter = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: AllModules,
});

Myrouter.beforeEach((to: any, from: any, next) => {
  /** 路徑有變化 初始化分頁數 */
  if (from.name !== to.name) {
    const data = {
      paginator: {
        count: 1,
        page_num: 1,
        page: 1,
        perpage: 100,
      },
    };
    $store.dispatch('initPaginator', data);
  }
  /** 修改Title */
  const path: string | undefined = to.meta.title;
  setTitle(path);
  next();
});

export default Myrouter;

/** 依據條件讓程式自動引入可使用的模組 */
function requireAll(requireContext: any) {
  const rawArray: [] = requireContext.keys().map((path: string) => requireContext(path).default);
  const result = rawArray.reduce((acc, cur) => acc.concat(cur), []);
  return result;
}

/** 設定網頁Title */
export function setTitle(path: string | undefined) {
  if (!path) return;
  let i18nPath: any = path;
  /** 判斷是否為內建的NODE系列節點名稱，若是，簡化向Branch取得名稱 */
  if (i18nPath.indexOf('NODE') !== -1) { i18nPath = `Permission.${i18nPath}`; }
  const title: any = $i18n.global.t(i18nPath);
  document.title = title;
}
