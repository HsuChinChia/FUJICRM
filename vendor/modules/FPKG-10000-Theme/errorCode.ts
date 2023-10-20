import { ElMessageBox as $message } from 'element-plus';

import $i18n from '@/modules/FPKG-230000-BackendCore/lang'; // 取得多國文本
import utilErrorCodes from '@/modules/FPKG-20000-Util/const/utilErrorCodes';


const alerter = (data: backendResponse): void => {
  /** 如果有找到共用的錯誤code則別不往下執行 */
  if (data.code === 20001 || utilErrorCodes.includes(data.code)) { return; }
  let msg: any = $i18n.global.t('Util.error', { code: data.code }) + ` ${data.response}`;
  const errorMsg: any = $i18n.global.t(`Theme.${data.code}`);
  /** 判斷沒有多語言對應時，回傳普通警示 */
  if (errorMsg !== `Theme.${data.code}`) { msg = errorMsg; }
  $message.alert(msg);
};

export default alerter;
