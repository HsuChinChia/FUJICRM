import { ElMessage as $message } from 'element-plus'; // 取得警告標籤
import $http from '@/modules/FPKG-230000-BackendCore/prototypes/axios'; // 後端溝通
import $i18n from '@/modules/FPKG-230000-BackendCore/lang';
import errorCode from '../../errorCode'; // 進行後端error code提示

const API = 'account/auth/password';

export namespace typeDoModify {
  export type request = {
    p3_ant_password: string;
  };
}

export default async (request: typeDoModify.request) => {
  return $http
    .put(API, request)
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
