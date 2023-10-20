import { ElMessage as $message } from 'element-plus'; // 取得警告標籤
import { ElMessageBox } from 'element-plus'; // 取得警告標籤
import $i18n from '@/modules/FPKG-230000-BackendCore/lang';
import errorCode from '../../errorCode'; // 進行後端error code提示
import $http from '@/modules/FPKG-230000-BackendCore/prototypes/axios'; // 後端溝通
import { typeLists } from './Lists';

const nothingDelete = { message: 'Got nothing to Kick' };

type item = {
  p3_ant_id: string;
  p3_ant_account: string;
  profile: any;
};

// validate
class Delete {
  private request: any;

  constructor(request: typeLists.item_f | typeLists.item_f[]) {
    this.request = request;
  }

  public async kick(): Promise<object> {
    if (this.noSelected) {
      throw nothingDelete;
    }
    return this.confirm().then(async () => {
      const guids = getGuid(this.request);
      const params = { p3_ant_id: guids };
      const d = await $http.put('longways/account-system/kick', params);
      // const getter = await RPC.delete({ p3_ant_id: guids });
      if (d.data.code === 0) {
        const msg: any = $i18n.global.t('Account.manage.kickComplete');
        $message.success(msg);
        return d;
      }
      try {
        throw errorCode(d.data);
      } catch (error) {
        return {};
      }
    });
  }

  private get noSelected(): boolean {
    if (
      !this.request ||
      (Array.isArray(this.request) && !this.request.length)
    ) {
      const msg: any = $i18n.global.t('Util.pleaseSelectItem');
      $message.warning(msg);
      return true;
    }
    return false;
  }

  public async confirm(): Promise<boolean> {
    const $confirm = ElMessageBox.confirm;
    const confirmMsg: any = $i18n.global.t('Account.manage.kickConfirm');
    const selected: string = getName(this.request);
    return $confirm(selected, confirmMsg)
      .then(() => true)
      .catch(() => {
        const msg: any = $i18n.global.t('Theme.cancel');
        $message.warning(msg);
        const Exception = { message: 'Cancel' };
        throw Exception;
      });
  }
}

export default Delete;

/** 從物件或物件陣列中分離出guid */
const getGuid = (selected: item | item[]): string | string[] => {
  if (Array.isArray(selected)) {
    return selected.map((x: item) => x.p3_ant_id);
  }
  return [selected.p3_ant_id];
};

/** 從物件或物件陣列中分離出名稱 */
const getName = (selected: item | item[]): string => {
  if (Array.isArray(selected)) {
    const result: string[] = selected.map((x: item) =>
      x.profile ? x.profile.cp9_cape_name : '',
    );
    return result.join(', ');
  }
  return selected.profile ? selected.profile.cp9_cape_name : '';
};
