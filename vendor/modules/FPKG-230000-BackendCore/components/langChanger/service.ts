/* eslint-disable max-len, camelcase */
// import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
// import { ElMessage  as $message } from 'element-plus'; // 取得警告標籤
// import $i18n from '@/modules/modules/FPKG-230000-BackendCore/lang';
import $http from '../../../FPKG-230000-BackendCore/prototypes/axios'; // 後端溝通

/** 修改語言 */
class doModify {
  private request: any;

  constructor(request: number) {
    this.request = request;
  }

  public async put(): Promise<Boolean> {
    return $http.put('locale/cutover/doModify', {
      p11_lle_id: this.request,
    }).then((d) => {
      if (d.data.code === 0) {
        // const msg: any = $i18n.global.tc('Util.modifyComplete');
        // $message.success(msg);
        return true;
      }
      return false;
    });
  }
}


export default doModify;
