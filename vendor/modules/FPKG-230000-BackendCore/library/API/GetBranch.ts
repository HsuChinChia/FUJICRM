/* eslint-disable max-len, camelcase */

import $http from '../../../FPKG-230000-BackendCore/prototypes/axios'; // 後端溝通
import $store from '@/modules/FPKG-50000-Vuex/index'; // lists 與axios溝通

/** 取得站台資料 */
class INFO {
  public async get() {
    const res: any = await $http.get('entertainmentBranch/common/getBranch');
    // 存在vuex
    $store.dispatch('getBranch', res.data.response);
    localStorage.setItem('locale', res.data.response.region);
    /** 後台閒置時間 */
    localStorage.setItem(
      'locale_list',
      JSON.stringify(res.data.response.locale_list),
    );

    const myLang = localStorage.getItem('lang');
    /** 若沒有本地語言 */
    if (!myLang) {
      // 站台預設語系
      const lang = res.data.response.branch_extend_setting.p17_bes_default_p11_lle_code !== null ? res.data.response.branch_extend_setting.p17_bes_default_p11_lle_code : res.data.response.locale;
      localStorage.setItem('lang', lang);
    }
    return res.data.response;
  }
}

export default INFO;
