import errorCode from '../../errorCode'; // 進行後端error code提示
import $http from '@/modules/FPKG-230000-BackendCore/prototypes/axios'; // 後端溝通
import $store from '@/modules/FPKG-50000-Vuex/index'; // lists 與axios溝通
import { typeLists as typeProto } from '@/modules/FPKG-30000-Permission/role/Service/Lists';

const API = 'account/manage/create';
// http://redmine.mirfak.tw/projects/pkg-30000-account/repository/3/revisions/master/entry/_md/api/%E5%B8%B3%E8%99%9F/%E6%96%B0%E5%A2%9E(VIEW).md

export namespace typeCreate {
  export type response = {
    list: item[];
  };

  /** 列表 */
  export type item = typeProto.item;
}

export default async (): Promise<typeCreate.response> => {
  return $http
    .get(API)
    .then(d => {
      if (d.data.code === 0) {
        const result = d.data.response;
        $store.dispatch('getList', result);

        if (result.list !== null && result.list.length) {
          return result;
        }
        return { list: [] };
      }
      throw d;
    })
    .catch(d => {
      errorCode(d.data);
    });
};
