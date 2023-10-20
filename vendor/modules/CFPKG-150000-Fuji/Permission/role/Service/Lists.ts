/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
import $http from '@/modules/FPKG-230000-BackendCore/prototypes/axios'; // 後端溝通
import $store from '@/modules/FPKG-50000-Vuex/index'; // lists 與axios溝通
import errorCode from '../../../errorCode'; // 進行後端error code提示
// http://redmine.mirfak.tw/projects/pkg-50000-permission/repository/5/revisions/master/entry/_md/api/%E8%A7%92%E8%89%B2/%E5%88%97%E8%A1%A8.md

export namespace typeLists {
  export type request = pageinator & {
    /**  角色名稱  */
    search_p5_role_name?: string;
    /**  狀態 in:3,-2   */
    search_p5_role_status?: status;
  };

  export type response = {
    list: item[];
  };

  /** 列表 */
  export type item = {
    /** ID  */
    p5_role_id: number;
    /** 建立時間  */
    p5_role_created_at: number;
    /** 角色名稱  */
    p5_role_name: string;
    /** 狀態  */
    p5_role_status: status;
    /** 備註 */
    p5_role_memo: string | null;
  };
}

// validate
class Lists {
  private request: any;

  constructor(request?: {}) {
    this.request = request;
  }

  public async get() {
    /** 取得搜尋參數: 從 query, params, user設定 進行整理 */
    const params = {
      ...this.request,
    };
    const d = await $http.get('permission/role/lists', { params });
    if (d.data.code === 0) {
      const result = d.data.response;
      $store.dispatch('getList', result);
      return result;
    }
    try {
      throw errorCode(d.data);
    } catch (error) {
      return {};
    }
  }
}

export default Lists;
