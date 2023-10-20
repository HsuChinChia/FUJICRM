/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable camelcase, no-use-before-define */
import { ElMessage as $message } from 'element-plus'; // 取得警告標籤
import $i18n from '@/modules/FPKG-230000-BackendCore/lang';
import $http from '@/modules/FPKG-230000-BackendCore/prototypes/axios'; // 後端溝通
import errorCode from '../../errorCode'; // 進行後端error code提示
import { typeList } from './Lists';
const API = 'blacklist/config/create';

export namespace typeCreate {
  export type request = {
    /** 類型 必填、參考 PKG-410000-Blacklist/src/Constant/Type.php  */
    p41_bst_type: typeList.TYPE;
    /** 通訊軟體 */
    p41_bst_sub_type?: string;
    /** 內容 必填  */
    p41_bst_content: string;
    /** 特徵(hidden) 必填 欄位不可顯示在UI上，值為{類型#內容}e.g. IP#1.2.3.4，若為通訊軟體則{類型#通訊軟體#內容}e.g. COMMUNICATION_SOFTWARE#LINE_ID#@abc123 */
    p41_bst_feature: string;
    /** 備註 max:200 */
    p41_bst_memo?: string;
  };
}

/** 新增黑名單 */
const Create = async (request: typeCreate.request) => {
  return $http
    .post(API, request)
    .then((d) => {
      if (d.data.code === 0) {
        $message.success($i18n.global.t('Util.createComplete'));
        return d;
      }
      throw d;
    })
    .catch((d) => {
      errorCode(d.data);
    });
};

export default Create;
