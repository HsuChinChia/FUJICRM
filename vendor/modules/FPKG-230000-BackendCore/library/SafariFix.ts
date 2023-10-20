import { options } from '../prototypes/axios';

/** 檢查是否為ios裝置 */
const checkiOSversion = () => {
  let d;
  let v: any;
  if (/iP(hone|od|ad)/.test(navigator.platform)) {
    v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
    d = {
      status: true,
      version: parseInt(v[1], 10),
      info: `${parseInt(v[1], 10)}.${parseInt(v[2], 10)}.${parseInt(v[3] || 0, 10)}`,
    };
  } else {
    d = { status: false, version: false, info: '' };
  }
  return d;
};

/**
 * 為safari進行API驗證
 * 將使用者送至API網址，接著再送回原處
*/
const SafariFix = () => {
  const iosVer = checkiOSversion();
  // 手機執行
  if (iosVer.status) {
    const first = localStorage.getItem('firstLogin2');
    if (first === null) {
      localStorage.setItem('firstLogin2', 'true');
      window.location.href = `${options.baseURL}/util/cookie/get?url=${window.location.href}`;
    }
    // 否則電腦版執行 然後再判斷safari
  } else {
    const userAgent = navigator.userAgent.toLowerCase();
    const isSafari = userAgent.indexOf('safari') !== -1 && userAgent.indexOf('chrome') === -1;
    if (isSafari) {
      const first = localStorage.getItem('firstLogin2');
      if (first === null) {
        localStorage.setItem('firstLogin2', 'true');
        window.location.href = `${options.baseURL}/util/cookie/get?url=${window.location.href}`;
      }
    }
  }
};

export default SafariFix;
