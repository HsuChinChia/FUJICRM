/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
// import { ElMessageBox as $message } from 'element-plus'; // 取得警告標籤
// import $t from '@/modules/modules/FPKG-230000-BackendCore/lang';
import RPC from '../../RPC/login/API';


// validate
class captcha {
  private request: any;

  public async get() {
    const getter = RPC.captcha(this.request);
    /* render to view */
    return getter
      .then((res: any) => res);
  }
}


export default captcha;
