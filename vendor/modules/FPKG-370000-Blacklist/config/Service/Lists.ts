/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-use-before-define, camelcase */
import errorCode from '../../errorCode'; // 進行後端error code提示
import $http from '@/modules/FPKG-230000-BackendCore/prototypes/axios'; // 後端溝通
import $store from '@/modules/FPKG-50000-Vuex/index'; // lists 與axios溝通

const API = 'blacklist/config/lists';

// https://redmine.mirfak.tw/projects/pkg-410000-blacklist/repository/114/revisions/master/entry/_md/%E9%BB%91%E5%90%8D%E5%96%AE/%E5%88%97%E8%A1%A8.md
// https://redmine.mirfak.tw/projects/pkg-410000-blacklist/repository/114/revisions/master/entry/src/Constant/Type.php

export namespace typeList {
  export type TYPE =
    | 'IP'
    | 'PHONE_NUMBER'
    | 'TRANSACTION_ACCOUNT'
    | 'COMMUNICATION_SOFTWARE';

  export type request = {
    /** 模糊查詢 查詢對象"內容" */
    search_complex?: string;
    /** 類型 */
    search_p41_bst_type?: TYPE;
    /** 內容 */
    search_p41_bst_content?: string;
  };

  export type response = {
    list: item[];
    paginator: pageinator;
  };

  /** 物件的項目 */
  export type item = {
    /** ID */
    p41_bst_id: number;
    /** 類型參考 PKG-410000-Blacklist/src/Constant/Type.php */
    p41_bst_type: TYPE;
    /** 建立時間timestamp */
    p41_bst_created_at: number;
    /** 內容 */
    p41_bst_content: string;
    /** 備註 */
    p41_bst_memo?: string | null;
    /** 通訊軟體 */
    p41_bst_sub_type: string;
    /** 建立者 */
    creator: {
      /** 建立者帳號 */
      p3_ant_account: string;
      /** 建立者姓名 */
      p3_ape_name: string;
    };
  };
}

/** 黑名單列表 */
const List = async (params?: typeList.request): Promise<typeList.response> => {
  /** 取得搜尋參數: 從 query, params, user設定 進行整理 */
  return $http
    .get(API, { params })
    .then((d) => {
      if (d.data.code === 0) {
        const result = d.data.response;
        $store.dispatch('getList', result);
        const list = result.list;
        if (list !== null && Array.isArray(list) && list.length) {
          return result;
        }
        return [];
      }
      throw d;
    })
    .catch((d) => {
      errorCode(d.data);
    });
};

export default List;
