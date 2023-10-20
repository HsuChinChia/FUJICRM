import { onMounted, ref } from 'vue';
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router';

/** 關鍵字搜尋 */
export default () => {
  const $router = useRouter();
  const $route = useRoute();
  /**搜尋用關鍵字 */
  const keyword = ref('');

  /** 關鍵字搜尋 */
  const search = (search_complex: string) => {
    // 針對庫存維護如果這兩個值則繼續保留
    const query = {
      search_complex,
      page: 1,
    };
    $router.push({ query });
  };

  /** 不在當前權限路徑下清空模糊搜尋 */
  onBeforeRouteUpdate((to, from) => {
    if (from && to.meta.url !== from.meta.url) {
      keyword.value = '';
      return;
    }

    const { search_complex } = to.query;
    keyword.value = search_complex ? (search_complex as string) : '';
  });

  onMounted(async () => {
    const key = $route.query.search_complex as string;
    keyword.value = key;
  });

  return {
    search,
    keyword,
  };
};
