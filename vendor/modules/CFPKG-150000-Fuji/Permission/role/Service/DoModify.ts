/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
import { ElMessage as $message } from 'element-plus';

import Qs from 'qs';

import $http from '@/modules/FPKG-230000-BackendCore/prototypes/axios'; // 後端溝通
import errorCode from '../../../errorCode'; // 進行後端error code提示
import $i18n from '@/modules/FPKG-230000-BackendCore/lang';



/** 由modify頁輸入的值 */
interface MODIFY_OUTPUT {
  p3_bre_guid: string,
  role_node_f: number[][]
}

// validate
class Lists {
  private request: any;

  constructor(request?: object) {
    this.request = request;
  }

  public async put(): Promise<object> {
    const { request } = this;
    const req: any = {};
    req.p5_role_id = request.role.p5_role_id;
    req.p5_role_name = request.role.p5_role_name;
    req.p5_role_status = request.role.p5_role_status;
    req.p5_role_memo = request.role.p5_role_memo;
    req.role_node = formatter(request);

    const d = await $http.put('permission/role/doModify', Qs.stringify(req));


    if (d.data.code === 0) {
      const msg: any = $i18n.global.t('Util.modifyComplete');
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


export default Lists;

function formatter(req: MODIFY_OUTPUT) {
  const result: any = req;
  const newNode = req.role_node_f.map((x) => {
    if (x.length) {
      const reduce = x.reduce((pre = 0, cur = 0) => pre + cur, 0);
      return reduce !== 0 ? reduce : undefined;
    }
    return null;
  });

  newNode.forEach((node, index) => {
    if (typeof node !== 'number') { delete newNode[index]; }
  });

  // delete result.role_node_f;
  result.p4_node_id = newNode;
  return result.p4_node_id;
}
