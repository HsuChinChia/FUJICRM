/* eslint-disable no-use-before-define, camelcase */
import errorCode from '../../errorCode'; // 進行後端error code提示
import $http from '@/modules/FPKG-230000-BackendCore/prototypes/axios'; // 後端溝通
import { timeFormater } from './Lists';

const API = 'longways/account-system/modify';
/* http://redmine.mirfak.tw/projects/pkg-30000-account/repository/3/revisions/master/show/_md/api/%E5%B8%B3%E8%99%9F */
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace typeModify {
  export type request = {
    p3_ant_id: number;
  };

  export type response = {
    p3_account: p3_account;
    p5_role: p5_role[];
    profile: profile;
  };

  type p3_account = {
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
    /** 最後登入 */
    p3_ant_last_login_time: number;
    /* 電話 */
    cp9_cape_tel: string | string[];
    /* email */
    cp9_cape_email: string | string[];
  };

  type p5_role = {
    p5_role_id: number;
    /** 角色名稱 */
    p5_role_name: string;
    /** 角色狀態 3.啟用 -2.停用 */
    p5_role_status: status;
  };

  type profile = {
    p3_account_profile: p3_account_profile;
  };

  /** 個人資訊 */
  export type p3_account_profile = {
    cp9_cape_p3_ant_id: number;
    /* 姓名 */
    cp9_cape_name: string;
    /* 生日 */
    cp9_cape_birthday?: number;
    /* 性別	1.男 2.女 3.其他 */
    cp9_cape_gender?: '1' | '2' | '3';
    /* 電話 */
    cp9_cape_tel: string;
    /* email */
    cp9_cape_email: string;
  };
}

export default async (
  params: typeModify.request,
): Promise<typeModify.response> => {
  return $http
    .get(API, { params })
    .then(d => {
      if (d.data.code === 0) {
        const result = formater(d.data.response);
        return result as any;
      }
      throw d;
    })
    .catch(d => {
      errorCode(d.data);
    });
};

function formater(result: typeModify.response) {
  const cp9_cape_email = result.profile.p3_account_profile.cp9_cape_email;
  const cp9_cape_tel = result.profile.p3_account_profile.cp9_cape_tel;
  return {
    ...result,
    p3_account: {
      ...result.p3_account,
      p3_ant_created_at: timeFormater(result.p3_account.p3_ant_created_at),
      cp9_cape_name: result.profile?.p3_account_profile?.cp9_cape_name,
      cp9_cape_birthday:
        timeFormater(result.profile?.p3_account_profile?.cp9_cape_birthday) ||
        undefined,
      cp9_cape_gender: result.profile?.p3_account_profile?.cp9_cape_gender || undefined,
      cp9_cape_email: cp9_cape_email ? JSON.parse(cp9_cape_email) : [],
      cp9_cape_tel: cp9_cape_tel ? JSON.parse(cp9_cape_tel) : []
    },
    p5_role_f: result.p5_role.map(x => x.p5_role_id),
  };
}
