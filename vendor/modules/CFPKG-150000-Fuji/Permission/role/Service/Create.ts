/* eslint-disable camelcase, no-use-before-define */
import { ElMessage as $message } from 'element-plus';

import $i18n from '@/modules/FPKG-230000-BackendCore/lang';
import $http from '@/modules/FPKG-230000-BackendCore/prototypes/axios'; // 後端溝通
import errorCode from '../../../errorCode'; // 進行後端error code提示



// validate
class Create {
  private request: any;

  constructor(request: Record<string, any>) {
    this.request = request;
  }

  public async post(): Promise<Record<string, any>> {
    const d = await $http.post('permission/role/doCreate', this.request);
    if (d.data.code === 0) {
      const msg: any = $i18n.global.t('Util.createComplete');
      $message.success(msg);
      return d;
    }
    try {
      throw errorCode(d.data);
    } catch (error) {
      return {};
    }
  }
}


export default Create;
