import { useRouter, useRoute } from 'vue-router';

/** 基本設置 */
type options = path;

/** 指定離場路徑 */
type path = string | -1;

/** 模式選擇: 上一頁，或是 meta.path */

/** 回到列表頁 */
export default () => {
  const $route = useRoute();
  const $router = useRouter();
  /** 上一頁的連結 */
  const BACK_URL = window.history.state?.back;

  const active = (options?: options) => {
    /** 確定是內部連結跳轉 */
    if (BACK_URL) {
      $router.push(exitPath(options));
      return;
    }

    /** 來自外部連結的直連訪問 */
    foreignerExit();
  };

  /** 判定離開的目的地，預設是自訂的列表頁連結 */
  const exitPath = (options?: options) => {
    const PATH = options;
    /** 指定路徑 */
    if (PATH && typeof PATH === 'string') {
      return PATH;
    }

    /** 回上一頁 */
    if (PATH && PATH === -1) {
      return BACK_URL;
    }

    /** 預設，回到列表頁，須注意的是路徑為 meta.url */
    return `/${$route.meta.url}`;
  };

  /** 轉至當頁的總表，若剛好沒設定 meta.url，原地裝死 */
  const foreignerExit = () => {
    const BASE_URL = $route.meta.url;
    if (BASE_URL) {
      $router.push(`/${BASE_URL}`);
    }
  };
  return { active };
};
