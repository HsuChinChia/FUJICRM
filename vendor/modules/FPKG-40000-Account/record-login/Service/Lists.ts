import errorCode from '../../errorCode'; // 進行後端error code提示
import $http from '@/modules/FPKG-230000-BackendCore/prototypes/axios'; // 後端溝通
import $store from '@/modules/FPKG-50000-Vuex/index'; // lists 與axios溝通
import DAY from 'dayjs';

const API = 'account/record-login/lists';

export namespace typeLists {
  export type request = pageinator & {
    /** 複合搜尋 */
    search_complex?: string;
  };

  export type response = { list: item[] };

  export type item = {
    p3_ant_id: number;
    /** 帳號ID 必填,字串,max:124 必填 */
    /** 名稱 必填,字串,max:124 必填 */
    p3_ant_account: string;
    /** IP 必填,字串,max:124 必填 */
    p3_llg_ip: string;
    /** 帳號建立時間,max:124  選填 */
    p3_ant_created_at?: string;
    /** 登入時間,max:124  選填 */
    p3_llg_login_at?: string;
  };
}

export default async (req?: typeLists.request): Promise<typeLists.response> => {
  const params = preFormater(req);
  return $http
    .get(API, { params })
    .then(d => {
      if (d.data.code === 0) {
        const result = d.data.response;
        $store.dispatch('getList', result);
        if (result.list !== null && result.list.length) {
          result.list = result.list.map((item: any) => {
            item.p3_ant_created_at = DAY(item.p3_ant_created_at * 1000).format('YYYY-MM-DD HH:mm:ss');
            item.p3_llg_created_at = DAY(item.p3_llg_created_at * 1000).format('YYYY-MM-DD HH:mm:ss');
            item.profile = result.profile.p3_account_profile.find((accoumt: { p3_ape_p3_ant_id: number }) => accoumt.p3_ape_p3_ant_id === item.p3_ant_id);
            item.p3_llg_device_f = JSON.parse(item.p3_llg_device || '{}');
            return item;
          });


          return result;
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
    ...req,
  };
}
