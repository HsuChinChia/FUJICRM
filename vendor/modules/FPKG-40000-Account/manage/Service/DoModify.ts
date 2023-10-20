/* eslint-disable no-use-before-define, camelcase */
import { ElMessage as $message } from 'element-plus'; // 取得警告標籤
import errorCode from '../../errorCode'; // 進行後端error code提示
import $http from '@/modules/FPKG-230000-BackendCore/prototypes/axios'; // 後端溝通
import $i18n from '@/modules/FPKG-230000-BackendCore/lang';

const API = 'account/manage/doModify';
/* http://redmine.mirfak.tw/projects/pkg-30000-account/repository/3/revisions/master/entry/_md/api/%E5%B8%B3%E8%99%9F/%E7%B7%A8%E8%BC%AF(%E7%A8%8B%E5%BA%8F).md */

export namespace typeDoModify {
  export type request = request_full | request_simple;

  type _request = {
    p3_ant_id: number;
    /** 密碼 必填  */
    p3_ant_password: string;
    /** 狀態 in{3,-2} 3.啟用 -2.停用 */
    p3_ant_status: status;
    /** 備註 max:255  */
    p3_ant_memo?: string;
    /** 角色ID 須為陣列、整數、不重複  */
    p5_role_id: number[];
    /**姓名 必填  */
    p3_ape_name: string;
  };

  /** 基礎版 */
  export type request_simple = _request & {
    /** 電話  */
    p3_ape_tel: string;
    /** email  */
    p3_ape_email: string;
  };

  /** 全功能版 */
  export type request_full = _request & {
    /** 生日 需為日期格式  */
    p3_ape_birthday: string;
    /** 性別 in{1,2,3} 1.男 2.女 3.其他 */
    p3_ape_gender: '1' | '2' | '3';
    /** 電話 需為陣列、不重複  */
    p3_ape_tel: string[];
    /** email 需為陣列、需為email格式、不重複  */
    p3_ape_email: string[];
  };
}
export default async (request: typeDoModify.request) => {
  return $http
    .put(API, preformater(request))
    .then(d => {
      if (d.data.code === 0) {
        $message.success($i18n.global.t('Util.modifyComplete'));
        return d;
      }
      throw d;
    })
    .catch(d => {
      errorCode(d.data);
    });
};

function preformater(req: typeDoModify.request) {
  /** 完全版的判斷 */
  if (Array.isArray(req.p3_ape_email) || Array.isArray(req.p3_ape_tel)) {
    return setFull(req as typeDoModify.request_full);
  }
  /** 簡單版 */
  return setSimple(req as typeDoModify.request_simple);
}

function setSimple(
  req: typeDoModify.request_simple,
): typeDoModify.request_simple {
  return {
    p3_ant_id: req.p3_ant_id,
    p3_ant_password: req.p3_ant_password,
    p3_ant_status: req.p3_ant_status,
    p3_ant_memo: req.p3_ant_memo ? req.p3_ant_memo : undefined,
    p3_ape_name: req.p3_ape_name,
    p5_role_id: req.p5_role_id ? req.p5_role_id.filter(R => R) : [],
    p3_ape_tel: req.p3_ape_tel ? req.p3_ape_tel : '',
    p3_ape_email: req.p3_ape_email ? req.p3_ape_email : '',
  };
}

function setFull(req: typeDoModify.request_full): typeDoModify.request_full {
  return {
    p3_ant_id: req.p3_ant_id,
    p3_ant_password: req.p3_ant_password,
    p3_ant_status: req.p3_ant_status,
    p3_ape_birthday: req.p3_ape_birthday ? req.p3_ape_birthday : '',
    p3_ape_gender: req.p3_ape_gender,
    p3_ant_memo: req.p3_ant_memo ? req.p3_ant_memo : undefined,
    p3_ape_name: req.p3_ape_name,
    p5_role_id: req.p5_role_id ? req.p5_role_id.filter(R => R) : [],
    p3_ape_tel: req.p3_ape_tel ? req.p3_ape_tel.filter(R => R) : [],
    p3_ape_email: req.p3_ape_email ? req.p3_ape_email.filter(R => R) : [],
  };
}
