/* eslint-disable no-case-declarations, guard-for-in, consistent-return, no-use-before-define, no-restricted-syntax, max-len */
import axios, { AxiosResponse } from 'axios';
import { ElMessageBox as Message } from 'element-plus';
import $i18n from '../lang'; // 取得多國文本
import { getRandomCode } from "@/modules/FPKG-20000-Util/prototypes/TokenCode";
import utilErrorCodes from '@/modules/FPKG-20000-Util/const/utilErrorCodes';
import store from '@/modules/FPKG-50000-Vuex';
import router from '../vueRouter';

/** 初始化的 Domain 指向測試機 */
let rawDomain = 'default.tw';
/** 是否接到正式機 API，若是，source 指向目前網址 */
if (process.env.VUE_APP_URL) rawDomain = window.location.hostname;
/** 是否有自訂 SOURCE ，若是 則覆蓋自訂 SOURCE 進入正式檔案 DEV 模式(正式機救火模式) */
if (process.env.VUE_APP_SOURCE) rawDomain = process.env.VUE_APP_SOURCE;

export const domain = rawDomain;

export const options = {
  timeout: 100000,
  headers: {
    // 'X-Branch-Source': domain,
  },
  /** 環境變數偵測 */
  baseURL: process.env.VUE_APP_URL || 'https://fujiapi.goldman88.cc/',
  // baseURL: process.env.VUE_APP_URL || 'https://api.dt2862.com/',
  // baseURL: process.env.VUE_APP_URL || 'http://fed-point-api.mirfak.tw',
  // baseURL: process.env.VUE_APP_URL || 'http://notfi.hackfbg.net',
};

axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers.put['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8';

const Axios = axios.create(options);

Axios.interceptors.request.use(
  (config: any) => {
    const configData = config;
    const authorisation = checkToken();
    configData.headers['x-authorisation'] = authorisation;
    const APIurl = [
      'frontendAdapter/common/backstage',
      'account/auth/refresh',
    ]
    if (!APIurl.includes(configData.url)) {
      store.dispatch('openLoading');
    }
    // 紀錄當前時間
    const now = new Date().getTime();
    const timestamp = Math.floor(now / 1000);
    localStorage.setItem('timestamp', String(timestamp));

    return configData;
  },
  (error: object) => Promise.reject(error),
);

Axios.interceptors.response.use(
  (response: any) => {
    const noHud =
      response.config.url !==
      `${response.config.baseURL}/frontendAdapter/common/backstage`;
    store.dispatch('closeLoading');

    if (response.status !== 200) {
      return;
    }

    /** 例外的處理，不包含alert */
    exceptionHandle(response);

    /** 共用錯誤alerter */
    alerter(response.data.code);

    return response;
  },
  (error: object) => Promise.reject(error),
);

export default Axios;

/*
 * 此處引入 router 會報 Maximum call stack size exceeded
 * 所以使用window.location.href
 */
/** 進行例外處理動作 */
function exceptionHandle(response: AxiosResponse) {
  switch (response.data.code) {
    // case 10015:
    //   store.dispatch('setLogin', false);
    //   break;
    case 10012:
      store.dispatch('setLogin', false);
      router.push({ name: 'login' });
      break;
    case 30002:
      store.dispatch('setLogin', false);
      router.push({ name: 'login' });
      break;
    case 20001:
      const data = [];
      for (const res in response.data.response) {
        data.push(response.data.response[res][0]);
      }
      Message.alert(`${data[0]}`);
      inputFocusout();
      break;
    default:
      break;
  }
}

/** 警告器 */
export function alerter(code: number) {
  if (!utilErrorCodes.includes(code)) {
    return;
  }
  let msg: any = $i18n.global.t('Util.error', { code });
  const errorMsg: any = $i18n.global.t(`Util.${code}`);
  /** 判斷沒有多語言對應時，回傳普通警示 */
  if (errorMsg !== `Util.${code}`) {
    msg = errorMsg;
  }
  Message.alert(msg);
  inputFocusout();
}

/**
 * 解除 input 的 focus 狀態
 * 先產生一個input，將其focus，再移除*/
function inputFocusout() {
  const body = document.querySelector('body');
  const gameWrap = document.createElement('input');
  gameWrap.classList.add('no-show');
  body?.prepend(gameWrap);
  const myForm = gameWrap;
  myForm?.focus();
  body?.removeChild(gameWrap);
}

/** 檢查token的生命週期 */
function checkToken(): string {
  /** token碼 */
  let auth = localStorage.getItem("x-authorisation");
  /** token誕生日 */
  const token = localStorage.getItem("token");
  if (!auth) {
    auth = getRandomCode(60);
    localStorage.setItem("x-authorisation", auth);
  }
  if (token) {
    const newTime = Date.now() + 30 * 60 * 1000;
    localStorage.setItem("token", `${newTime}`);
  }

  return auth;
}