/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-use-before-define, camelcase */
import errorCode from '../../errorCode'; // 進行後端error code提示
import $http from '@/modules/FPKG-230000-BackendCore/prototypes/axios'; // 後端溝通
import $store from '@/modules/FPKG-50000-Vuex/index'; // lists 與axios溝通
import TimeFormater from '@/modules/FPKG-230000-BackendCore/converter/timeFormater';

const API = 'account/manage/lists';
// http://redmine.mirfak.tw/projects/pkg-30000-account/repository/3/revisions/master/entry/_md/api/%E5%B8%B3%E8%99%9F/%E5%88%97%E8%A1%A8.md

export namespace typeLists {
  export type request = pageinator & {
    /** 複合搜尋 */
    search_complex?: string;
    /** 帳號 */
    search_p3_ant_account?: string;
    /** 狀態 */
    search_p3_ant_status?: status;
  };

  export type response_f = { list: item_f[]; profile: profile };

  export type response = { list: item[]; profile: profile };

  export type item_f = item & {
    /* p3_ant_created_at_f: string; */
    profile: p3_account_profile;
  };

  /** 列表 */
  export type item = {
    /** ID  */
    p3_ant_id: number;
    /** 建立時間  */
    p3_ant_created_at: number;
    /** 帳號  */
    p3_ant_account: string;
    /** 狀態  */
    p3_ant_status: number;
    /** 排序 3.啟用 -2.停用 */
    p3_ant_sort: number;
    /** 備註  */
    p3_ant_memo: number;
    /** 最後登入時間  */
    p3_ant_last_login_time: number;
    p5_role: p5_role[];
  };

  type p5_role = {
    /** 角色名稱 */
    p5_role_name: string;
    /** 角色狀態 3.啟用 -2.停用 */
    p5_role_status: status;
  };

  type profile = {
    p3_account_profile: p3_account_profile[];
  };

  /** 個人資訊 */
  export type p3_account_profile = {
    p3_ape_p3_ant_id: number;
    /* 姓名 */
    p3_ape_name: string;
    /* 生日 */
    p3_ape_birthday?: number;
    /* 性別	1.男 2.女 3.其他 */
    p3_ape_gender?: '1' | '2' | '3';
    /* 電話 */
    p3_ape_tel: string | string[];
    /* email */
    p3_ape_email: string | string[];
  };
}

export default async (
  req?: typeLists.request,
): Promise<typeLists.response_f> => {
  const params = preFormater(req);
  return $http
    .get(API, { params })
    .then(d => {
      if (d.data.code === 0) {
        const result = d.data.response;
        $store.dispatch('getList', result);
        if (result.list !== null && result.list.length) {
          return postFormater(result);
        }
        return { ...d.data.response, list: [] };
      }
      throw d;
    })
    .catch(d => {
      errorCode(d.data);
    });
};

function preFormater(req?: typeLists.request): typeLists.request {
  return {
    search_complex: req ? req.search_complex : undefined,
    search_p3_ant_account: req ? req.search_p3_ant_account : undefined,
    search_p3_ant_status: req ? req.search_p3_ant_status : undefined,
    sort: req ? req.sort : undefined,
    sort_type: req ? req.sort_type : undefined,
    count: req ? req.count : undefined,
    page: req ? req.page : undefined,
    page_num: req ? req.page_num : undefined,
    perpage: req ? req.perpage : undefined,
  };
}

export function postFormater(res: typeLists.response) {
  if (res.list !== null && res.list.length) {
    const list = res.list.map(item => ({
      ...item,
      p3_ant_created_at: timeFormater(item.p3_ant_created_at),
      profile: res.profile.p3_account_profile.find(
        e => e.p3_ape_p3_ant_id === item.p3_ant_id,
      ) as typeLists.p3_account_profile,
    }));

    return {
      list,
      profile: res.profile,
    };
  }

  return {
    list: [] as typeLists.item_f[],
    profile: res.profile,
  };
}

export function timeFormater(value?: number) {
  if (!value) return '';
  const formatedDate = new TimeFormater({ value });
  return formatedDate.result;
}
