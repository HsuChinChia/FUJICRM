/* eslint-disable camelcase */
import { createApp } from 'vue'
import { createI18n } from "vue-i18n";
import ElementPlus from 'element-plus';
// import App from './App.vue'

import { ref, provide } from "vue";

import setElementLang from '@/modules/FPKG-20000-Util/library/setElementLocale'; // 設定element的語言
import { options } from './prototypes/axios';

// const elementLocale = require('element-ui/lib/locale/index').default;

/**
 * 進行掃描，將所有語言檔進行整合，並且依 i18n messages 的格式輸出
 * @param requireContext 掃描modules內所有語言檔 (/locale/{lang}.json)
 */
function allLocale(requireContext: any) {
  const fileNames = requireContext.keys();
  return fileNames.reduce((acc: any, cur: any) => {
    /** 留下模組名稱 */
    const modulePath: string[] = cur.split('/'); // 資料夾路徑轉為array
    /** 透過API路徑尋找不同專案的語系 */
    const API_URL = options.baseURL.replace('http://', '').replace('https://', '').replace('.', '_').replace('.', '_')
    /** 尋找特規語系不存在FPKG裡面的語系 將.切換成_ */
    /** 找到locale後再往前找資料夾，接著用-轉化並且取得資料夾名稱 */
    const module = modulePath[modulePath.findIndex(x => x === 'locale') - 1].split('-')[2] === undefined ? API_URL : modulePath[modulePath.findIndex(x => x === 'locale') - 1].split('-')[2];

    const locale: string = cur.match(/locale\/(\S*).json/)[1]; // 去除路徑與副檔名，留下區域代表字

    if (typeof (acc[locale]) !== 'object') { acc[locale] = {}; } // 類型判斷，若無則擴充物件

    acc[locale][module] = requireContext(cur); // 將物件格式化，依照[國家][模組簡寫]做設定
    return acc;
  }, {});
}

/**
 * 將語言包依i18n messages格式輸出
*/
const messagesG = allLocale(require.context('@/modules', true, /\/locale\/[\w]+.json$/));

/** 設定element多國語言 */
const messages: any = setElementLang(messagesG);

const defaultLocale = 'zh_TW';
const VUE_APP_LOCALE = process.env.VUE_APP_LOCALE;
const localLocale: string = VUE_APP_LOCALE || localStorage.getItem('lang') || defaultLocale; // 取得local儲存的語言設定

const i18n = createI18n({
  legacy: false,
  locale: localLocale, // 语言标识
  fallbackLocale: defaultLocale, // 沒有可用語言時，使用該回退語言
  messages,
  silentTranslationWarn: true, // 停止找不到語言路徑時的錯誤警告
  silentFallbackWarn: true, // 停止回退語言所產生的錯誤警告
  missingWarn: false, //錯誤警告
  fallbackWarn: false, //錯誤警告
});


// setTimeout(() => {
//   i18n.locale = localStorage.getItem('lang') || '';
// }, 2000);

export default i18n;
/** 重要: 假如後台回傳的語言又變動(例: US => en_US)，需要修改的項目包含 {lang}.json,以及 elementLocale內的項目 */

// elementLocale.i18n((key: any, value: any) => i18n.t(key, value)); // element修改語言
// const app = createApp(App)

// app.use(ElementPlus, {
//   i18n: i18n.global.t,
// })
// app.use(i18n)


export const changeHtmlLang = (lang: string) => {
  const html = document.documentElement; // returns the html tag
  html.setAttribute('lang', lang);
};

changeHtmlLang(localLocale);
