/* eslint-disable max-len, camelcase */
import ExpError from '@/modules/FPKG-20000-Util/library/ExpError';
import $store from '@/modules/FPKG-50000-Vuex/index'; // lists 與axios溝通
import router from '@/modules/FPKG-230000-BackendCore/vueRouter'; // lists 使用的router
import $http from '@/modules/FPKG-230000-BackendCore/prototypes/axios'; // 後端溝通


import {
  CAPTCHA,
} from './declare';

export {
  CAPTCHA,
};

/**
 * 發出請求，向後端送資料 並回傳非同步資料
 */
const Getter = {

  async captcha(userParams?: CAPTCHA.request): Promise<CAPTCHA.response> {
    const { currentRoute }:any = router;
    /** 取得搜尋參數: 從 query, params, user設定 進行整理 */
    const params = {
      ...currentRoute.query, ...currentRoute.params, ...userParams,
    };
    const config = {
    };
    return $http.post(CAPTCHA.API, { params }, config)
      // eslint-disable-next-line consistent-return
      .then((d) => {
        if (d.data.code === 0) {
          const result = d.data.response;
          return result;
        }
      });
  },


};

export default Getter;
