import { computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router';

/** 換頁管理 */
export default () => {
  const $router = useRouter();
  const $route = useRoute();
  const $store = useStore();
  const paginator = ref(1);
  const perpage = ref(100);

  onBeforeRouteUpdate((to, from) => {
    const perpage_init = to.meta.perpage_init ? Number(to.meta.perpage_init) : 100;
    perpage.value = to.query.perpage ? Number(to.query.perpage) : perpage_init;
    paginator.value = to.query.page ? Number(to.query.page) : 1;
  });

  onMounted(() => {
    const to = $route;
    perpage.value = to.query.perpage ? Number(to.query.perpage) : 100;
    paginator.value = to.query.page ? Number(to.query.page) : 1;
  });

  const page_num = computed(() => {
    const store = $store.state;
    if (
      store &&
      store.getList &&
      store.getList.paginator &&
      store.getList.paginator.page_num
    ) {
      return store.getList.paginator.page_num;
    }
    return 1;
  });

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
    submitPage,
    submitPerpage,
  };
};
