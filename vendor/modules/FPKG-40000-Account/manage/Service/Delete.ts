import { ElMessage as $message } from 'element-plus'; // 取得警告標籤
import { ElMessageBox } from 'element-plus'; // 取得警告標籤
import $i18n from '@/modules/FPKG-230000-BackendCore/lang';
import $http from '@/modules/FPKG-230000-BackendCore/prototypes/axios'; // 後端溝通
import errorCode from '../../errorCode'; // 進行後端error code提示
import { typeLists } from './Lists';
const API = 'account/manage/delete';
// http://redmine.mirfak.tw/projects/cpkg-20000-vtaecitembank/repository/68/revisions/master/show/_md/api/VtaecItemBank%20%E9%A1%8C%E5%BA%AB

const nothingDelete = { message: 'Got nothing to delete' };

namespace typeDelete {
  export type request = {
    p3_ant_id: number[];
  };
}

/** 從 vue 注入的項目 */
export type input = typeLists.item | typeLists.item[];

export default async (input: input) => {
  if (!checkItemOK(input)) {
    throw nothingDelete;
  }
  return confirm(input).then(async () => {
    const guids = getGuid(input);
    const params: typeDelete.request = { p3_ant_id: guids };
    return $http
      .delete(API, { params })
      .then(d => {
        if (d.data.code === 0) {
          $message.success($i18n.global.t('Util.deleteComplete'));
          return d;
        }
        throw d;
      })
      .catch(d => {
        errorCode(d.data);
      });
  });
};

/**
 * 檢查欲刪除的物件
 * @param n 欲刪除的項目
 * @returns true: 項目存在 false: 項目不存在
 */
function checkItemOK(request: input) {
  if (!request || (Array.isArray(request) && !request.length)) {
    $message.warning($i18n.global.t('Util.pleaseSelectItem'));
    return false;
  }
  return true;
}
/**
 * 確認是否刪除項目
 */
function confirm(request: input): Promise<boolean> {
  const $confirm = ElMessageBox.confirm;
  const selected: string = getName(request);
  return $confirm(selected, $i18n.global.t('Util.deleteConfirm'))
    .then(() => true)
    .catch(() => {
      $message.warning($i18n.global.t('Theme.cancel'));
      const Exception = { message: 'Cancel' };
      throw Exception;
    });
}
/** 從物件或物件陣列中分離出名稱 */
function getName(selected: input) {
  if (Array.isArray(selected)) {
    const result: string[] = selected.map(x => (x ? x.p3_ant_account : ''));
    return result.join(', ');
  }
  return selected ? selected.p3_ant_account : '';
}
/** 從物件或物件陣列中分離出guid */
function getGuid(selected: input): number[] {
  if (Array.isArray(selected)) {
    return selected.map(x => x.p3_ant_id);
  }
  return [selected.p3_ant_id];
}
