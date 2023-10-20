import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';

/** FUTURE: 若後端因為 perpage 有限制，導致出現奇怪數字 ex: 64, 77
 * 此時需要將固定的頁碼做替換，在數字初始化時，將目前頁碼寫入
 * 例如 all_perpage.includes(now_perpage) ? doNothing : all_perpage.unshift(now_perpage)
 */

/** 換頁管理 */
export default () => {
  const $router = useRouter();
  const $route = useRoute();
  const $store = useStore();
  const paginator = ref(0);
  const perpage = ref(0);

  /** 後端的頁碼設定 */
  const page = computed(() => $store.state.getList?.paginator || {});
  /** 後端回傳的真實 perpage 沒有值則回傳 100 */
  const back_perpage = computed(() => page.value.perpage);

  /** 更新 perpage */
  watch(
    back_perpage,
    (n) => {
      if (n) perpage.value = n;
    },
    { immediate: true }
  );

  /** 後端回傳的真實頁碼 */
  const back_page = computed(() => page.value.page);
  watch(
    back_page,
    (n) => {
      if (n) paginator.value = n;
    },
    { immediate: true }
  );
  const page_num = computed(() => page.value.page_num || 1);
  // 數量
  const page_count = computed(() => page.value.count || 1);
  /**
   * 傳送頁數 (未完)
   */
  const submitPage = (feature: string) => {
    let page: any = Number(paginator.value);
    const num = Number(page_num.value);
    let query: any = { ...$route.query, page };
    switch (feature) {
      case 'goPage':
        query = { ...$route.query, page };
        break;
      case 'firstPage':
        page = 1;
        query = { ...$route.query, page };
        break;
      case 'prevPage':
        page = page - 1 > 1 ? page - 1 : 1;
        query = { ...$route.query, page };
        break;
      case 'nextPage':
        page = Number(page) + 1 > num ? num : Number(page) + 1;
        query = { ...$route.query, page };
        break;
      case 'lastPage':
        page = page_num.value;
        query = { ...$route.query, page: page_num.value };
        break;
      default:
        break;
    }
    $router.push({ query });
  };

  /** 每頁筆數 */
  const submitPerpage = (N: number) => {
    /** 20210707 記錄使用者當前是一頁幾筆下次進來就一頁幾筆 */
    // localStorage.setItem('perpage', JSON.stringify(N));
    /** END */
    let query = {
      ...$route.query,
      page: 1,
      perpage: undefined as number | undefined,
    };
    if (N) query = { ...query, perpage: N };
    $router.push({ query });
  };

  return {
    paginator,
    perpage,
    page_num,
    page_count,
    submitPage,
    submitPerpage,
  };
};
